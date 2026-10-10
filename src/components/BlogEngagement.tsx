import { useCallback, useEffect, useState } from 'react';
import { MessageCircle, Send, Loader2, RefreshCw } from 'lucide-react';

// ⚠️ DÁN LINK "Web app" của Google Apps Script vào đây (link kết thúc bằng /exec).
const API_URL = 'https://script.google.com/macros/s/AKfycbwtgcPIl2E6d7DhXyu_xS-zGVt_WMnniaqFrP3Mba5oen-1F4oIzFwvBvBcgBFFl6Ef/exec';

// Các biểu tượng cảm xúc khách có thể thả (phải trùng với danh sách trong Code.gs)
const REACTIONS = [
  { emoji: '❤️', label: 'Yêu thích' },
  { emoji: '👍', label: 'Hữu ích' },
  { emoji: '👏', label: 'Tuyệt vời' },
  { emoji: '😍', label: 'Dễ thương' },
  { emoji: '🎉', label: 'Hay quá' },
];

type Comment = {
  id: number;
  author_name: string;
  content: string;
  created_at: string;
};

const MIN_SECONDS_BETWEEN_COMMENTS = 15;
const norm = (e: string) => e.replace(/\uFE0F/g, '');
const configured = API_URL.startsWith('https://');

function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* bỏ qua nếu trình duyệt chặn lưu trữ */
  }
}

// Gửi dữ liệu lên Google Apps Script an toàn, có cơ chế fallback nếu trình duyệt chặn redirect POST
async function postToSheet(payload: Record<string, string | number>): Promise<boolean> {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (data && data.ok) return true;
    } catch {
      // Nếu phản hồi bị redirect sang trang HTML, thử gửi qua GET params (nếu đã cập nhật Code.gs mới)
    }
  } catch {
    // Nếu lỗi CORS khi POST redirect, chuyển sang phương án dự phòng bên dưới
  }

  // Phương án dự phòng (Fallback): Gửi qua query params GET để không bao giờ bị mất gói tin khi 302 Redirect
  try {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([k, v]) => params.append(k, String(v)));
    const fallbackRes = await fetch(`${API_URL}?${params.toString()}`, {
      method: 'GET',
      redirect: 'follow',
    });
    const fallbackData = await fallbackRes.json();
    return !!fallbackData.ok;
  } catch {
    return false;
  }
}

export default function BlogEngagement({ slug }: { slug: string }) {
  const reactedKey = `spg_reacted_${slug}`;

  const [counts, setCounts] = useState<Record<string, number>>({});
  const [mine, setMine] = useState<string[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [trap, setTrap] = useState(''); // ô ẩn để chặn bot
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  const fetchEngagement = useCallback(async () => {
    if (!configured) return;
    setLoadingComments(true);
    try {
      // Thêm _t=Date.now() để trình duyệt không lưu cache cũ sau khi bạn vừa duyệt comment trên Sheet
      const r = await fetch(`${API_URL}?slug=${encodeURIComponent(slug)}&_t=${Date.now()}`, {
        method: 'GET',
        redirect: 'follow',
      });
      const data = await r.json();
      if (data && data.ok) {
        setCounts(data.reactions || {});
        setComments(data.comments || []);
      }
    } catch {
      // ignore
    } finally {
      setLoadingComments(false);
    }
  }, [slug]);

  useEffect(() => {
    setMine(readLocal<string[]>(reactedKey, []));
    fetchEngagement();
  }, [slug, reactedKey, fetchEngagement]);

  if (!configured) return null;

  const toggleReaction = async (emoji: string) => {
    const already = mine.includes(emoji);
    const prevMine = mine;
    const nextMine = already ? mine.filter((e) => e !== emoji) : [...mine, emoji];
    const key = norm(emoji);
    const change = already ? -1 : 1;

    setMine(nextMine);
    writeLocal(reactedKey, nextMine);
    setCounts((prev) => ({ ...prev, [key]: Math.max((prev[key] || 0) + change, 0) }));

    const ok = await postToSheet({ action: 'react', slug, emoji, delta: change });
    if (!ok) {
      // gửi lỗi thì hoàn tác lại giao diện
      setMine(prevMine);
      writeLocal(reactedKey, prevMine);
      setCounts((prev) => ({ ...prev, [key]: Math.max((prev[key] || 0) - change, 0) }));
    }
  };

  const submitComment = async () => {
    setMessage(null);
    const cleanName = name.trim();
    const cleanContent = content.trim();

    if (trap) {
      // bot điền ô ẩn: giả vờ thành công, không gửi gì
      setMessage({ type: 'ok', text: 'Cảm ơn bạn! Bình luận sẽ hiện sau khi được duyệt.' });
      setName('');
      setContent('');
      return;
    }
    if (!cleanName || !cleanContent) {
      setMessage({ type: 'error', text: 'Bạn vui lòng nhập cả tên và nội dung bình luận nhé.' });
      return;
    }
    const last = readLocal<number>('spg_last_comment_at', 0);
    const waitSeconds = Math.ceil(MIN_SECONDS_BETWEEN_COMMENTS - (Date.now() - last) / 1000);
    if (waitSeconds > 0) {
      setMessage({ type: 'error', text: `Bạn đợi khoảng ${waitSeconds} giây rồi gửi tiếp nhé.` });
      return;
    }

    setSending(true);
    const ok = await postToSheet({
      action: 'comment',
      slug,
      name: cleanName.slice(0, 50),
      content: cleanContent.slice(0, 1000),
    });
    setSending(false);

    if (!ok) {
      setMessage({ type: 'error', text: 'Chưa gửi được bình luận. Bạn thử lại sau ít phút nhé.' });
      return;
    }
    writeLocal('spg_last_comment_at', Date.now());
    setMessage({
      type: 'ok',
      text: 'Đã gửi bình luận về Google Sheet! Sau khi Quản trị viên tích duyệt vào cột E (approved), bình luận sẽ hiển thị bên dưới.',
    });
    setName('');
    setContent('');
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div className="mt-12 pt-10 border-t border-neutral-100">
      {/* Thả cảm xúc */}
      <h3 className="text-lg font-bold text-neutral-800 mb-4">Bạn thấy bài viết này thế nào?</h3>
      <div className="flex flex-wrap gap-3 mb-12">
        {REACTIONS.map(({ emoji, label }) => {
          const active = mine.includes(emoji);
          return (
            <button
              key={emoji}
              type="button"
              onClick={() => toggleReaction(emoji)}
              aria-pressed={active}
              title={label}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                active
                  ? 'bg-amber-50 border-amber-300 text-amber-700 shadow-sm'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-amber-200'
              }`}
            >
              <span className="text-xl leading-none">{emoji}</span>
              <span>{counts[norm(emoji)] || 0}</span>
            </button>
          );
        })}
      </div>

      {/* Bình luận */}
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-teal-600" />
          Gửi lời nhắn khích lệ
        </h3>
        <button
          type="button"
          onClick={fetchEngagement}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-teal-600 transition-colors"
          title="Tải lại danh sách bình luận đã duyệt"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingComments ? 'animate-spin' : ''}`} />
          Làm mới bình luận
        </button>
      </div>
      <p className="text-sm text-neutral-500 mb-5">
        Mọi lời chia sẻ của bạn là động lực rất lớn với đội ngũ Smart Play Guide. Bình luận sẽ hiện sau khi được duyệt.
      </p>

      <div className="bg-stone-50 border border-neutral-100 rounded-2xl p-5 space-y-3 mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
          placeholder="Tên của bạn"
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          rows={4}
          placeholder="Viết bình luận hoặc lời nhắn gửi đến Smart Play Guide..."
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-y"
        />
        {/* Ô ẩn chặn bot: người thật không thấy */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
          className="hidden"
          aria-hidden="true"
          name="website"
        />
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-neutral-400">{content.length}/1000</span>
          <button
            type="button"
            onClick={submitComment}
            disabled={sending}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition-all disabled:opacity-60"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Gửi bình luận
          </button>
        </div>
        {message && (
          <p className={`text-sm ${message.type === 'ok' ? 'text-teal-700' : 'text-rose-600'}`}>{message.text}</p>
        )}
      </div>

      {/* Danh sách bình luận đã duyệt */}
      {loadingComments ? (
        <p className="text-sm text-neutral-400">Đang tải bình luận...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-neutral-400">Chưa có bình luận nào. Hãy là người đầu tiên nhé!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold shrink-0">
                {c.author_name.trim().charAt(0).toUpperCase()}
              </div>
              <div className="bg-white border border-neutral-100 rounded-2xl px-4 py-3 flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-sm text-neutral-800">{c.author_name}</span>
                  <span className="text-xs text-neutral-400">{formatDate(c.created_at)}</span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">{c.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
