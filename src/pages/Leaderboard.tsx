import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Crown, Loader2, Camera, Gift, Award, BookImage, Backpack, Target } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const FAMILY_KEY = 'spg_family_name';
const POINTS = 10; // mỗi trò, 1 lần / gia đình

type Row = { participant_name: string; day_number: number; created_at: string };
type Family = { key: string; name: string; score: number; days: number; last: string };
type Range = 'all' | 'w1' | 'w2';
const ranges: { id: Range; label: string; from: number; to: number }[] = [
  { id: 'all', label: 'Tổng', from: 1, to: 14 },
  { id: 'w1', label: 'Tuần 1', from: 1, to: 7 },
  { id: 'w2', label: 'Tuần 2', from: 8, to: 14 },
];

export default function Leaderboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<Range>('all');
  const [me, setMe] = useState(() => {
    try { return localStorage.getItem(FAMILY_KEY) || ''; } catch { return ''; }
  });

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('challenge_photos').select('participant_name, day_number, created_at');
    if (error) console.error(error);
    else setRows((data as Row[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    window.addEventListener('focus', load);
    return () => { clearInterval(t); window.removeEventListener('focus', load); };
  }, [load]);

  const rg = ranges.find((r) => r.id === range)!;

  const families: Family[] = useMemo(() => {
    const map = new Map<string, { name: string; days: Map<number, string> }>();
    for (const r of rows) {
      if (r.day_number < rg.from || r.day_number > rg.to) continue;
      const key = r.participant_name.trim().toLowerCase();
      if (!key) continue;
      const f = map.get(key) || { name: r.participant_name.trim(), days: new Map() };
      const prev = f.days.get(r.day_number);
      if (!prev || r.created_at < prev) f.days.set(r.day_number, r.created_at);
      map.set(key, f);
    }
    return [...map.entries()]
      .map(([key, f]) => ({
        key, name: f.name, days: f.days.size, score: f.days.size * POINTS,
        last: [...f.days.values()].sort().pop() || '',
      }))
      .sort((a, b) => b.score - a.score || a.last.localeCompare(b.last));
  }, [rows, rg.from, rg.to]);

  const myKey = me.trim().toLowerCase();
  const myIdx = myKey ? families.findIndex((f) => f.key === myKey) : -1;
  const mine = myIdx >= 0 ? families[myIdx] : null;
  const above = myIdx > 0 ? families[myIdx - 1] : null;
  const third = families[2];
  const gamesToPass = (gap: number) => Math.floor(gap / POINTS) + 1;
  const saveMe = (v: string) => {
    setMe(v);
    try { localStorage.setItem(FAMILY_KEY, v); } catch { /* ignore */ }
  };

  const podium = [
    { f: families[1], place: 2, h: 'h-28', bg: 'bg-gradient-to-t from-teal-300 to-teal-200', ring: 'ring-teal-300' },
    { f: families[0], place: 1, h: 'h-40', bg: 'bg-gradient-to-t from-amber-400 to-amber-300', ring: 'ring-amber-400' },
    { f: families[2], place: 3, h: 'h-20', bg: 'bg-gradient-to-t from-orange-300 to-orange-200', ring: 'ring-orange-300' },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Header thiết kế chuẩn theo phong cách trang Về chúng tôi */}
      <section className="relative w-full overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Ảnh nền phủ hợp tự nhiên */}
        <div className="absolute inset-0 z-0">
          <img
            src="/top.png"
            alt="Smart Play Guide Background"
            className="w-full h-full object-cover object-right-bottom"
          />
        </div>

        {/* Nội dung chữ trên nền ảnh */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2x1">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 text-amber-700 border border-amber-200/60 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm backdrop-blur-sm">
              <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />
              Smart Play Guide · Bảng xếp hạng
            </div>
            
            {/* Tiêu đề chính - Đã sửa lỗi đè chữ "ở đâu?" */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 leading-[1.15] mb-6 tracking-tight">
              Cùng xem nhà mình <br />
              <span className="text-[#E07A5F] inline-block mt-1"> đang ở vị trí nào nhé!</span>
            </h1>
            
            {/* Mô tả */}
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium">
              Gửi ảnh thành công là ghi nhận điểm. Mỗi trò được <strong className="text-orange-600 font-bold">{POINTS} điểm</strong>, tính 1 lần cho mỗi gia đình.
            </p>
          </div>
        </div>
      </section>

      {/* Phần Bảng Xếp Hạng Bên Dưới */}
      <section className="py-12 bg-white relative z-10 border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Điểm cá nhân */}
          <div className="rounded-3xl border border-teal-200 bg-teal-50/60 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">Điểm của gia đình bạn</p>
            <input
              value={me}
              onChange={(e) => saveMe(e.target.value)}
              placeholder="Nhập tên hộ gia đình đã dùng khi gửi ảnh"
              className="w-full px-4 py-2.5 rounded-xl border border-teal-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {mine ? (
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="bg-white rounded-2xl p-4"><p className="text-3xl font-bold text-amber-500">#{myIdx + 1}</p><p className="text-xs text-neutral-500">Hạng {range === 'all' ? 'tổng' : rg.label}</p></div>
                <div className="bg-white rounded-2xl p-4"><p className="text-3xl font-bold text-orange-500">{mine.score}</p><p className="text-xs text-neutral-500">Điểm</p></div>
                <div className="bg-white rounded-2xl p-4"><p className="text-3xl font-bold text-teal-600">{mine.days}/{rg.to - rg.from + 1}</p><p className="text-xs text-neutral-500">Trò đã chơi</p></div>
              </div>
            ) : (
              me.trim() && !loading && <p className="mt-4 text-sm text-neutral-500">Chưa thấy điểm cho "{me.trim()}" trong {rg.label.toLowerCase()}. Hãy kiểm tra đúng tên hoặc <Link to="/challenge" className="text-teal-600 font-semibold underline">gửi ảnh challenge</Link>.</p>
            )}
            {mine && (
              <div className="mt-4 flex items-start gap-2 text-sm text-neutral-700">
                <Target className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <p>
                  {myIdx === 0
                    ? 'Bạn đang đứng đầu! Hãy tiếp tục chơi để giữ vững ngôi vị.'
                    : `Cần thêm ${above!.score - mine.score + 1} điểm (khoảng ${gamesToPass(above!.score - mine.score)} trò) để vượt hạng #${myIdx}.`}
                  {myIdx > 2 && third && ` Để vào top 3 cần hơn ${third.score - mine.score} điểm nữa.`}
                </p>
              </div>
            )}
          </div>

          {/* Chọn phạm vi */}
          <div className="flex justify-center gap-2">
            {ranges.map((r) => (
              <button
                key={r.id}
                onClick={() => setRange(r.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${range === r.id ? 'bg-teal-500 text-white shadow' : 'bg-stone-100 text-neutral-600 hover:bg-teal-50'}`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-neutral-300 animate-spin" /></div>
          ) : families.length === 0 ? (
            <div className="text-center py-14 bg-stone-50 rounded-3xl">
              <Camera className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500 mb-4">Chưa có gia đình nào ghi điểm. Hãy là người đầu tiên!</p>
              <Link to="/challenge" className="inline-block px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600">Tham gia Challenge</Link>
            </div>
          ) : (
            <>
              {/* Bục vinh quang */}
              <div className="flex items-end justify-center gap-3 sm:gap-6 pt-6">
                {podium.map(({ f, place, h, bg, ring }) => (
                  <div key={place} className="flex-1 max-w-[180px] text-center">
                    {f ? (
                      <>
                        {place === 1 && <Crown className="w-8 h-8 text-amber-500 mx-auto mb-1 animate-float" fill="currentColor" />}
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-white ring-4 ${ring} flex items-center justify-center text-xl font-bold text-neutral-700 mb-2`}>
                          {f.name.charAt(0).toUpperCase()}
                        </div>
                        <p className={`text-sm font-bold truncate ${f.key === myKey ? 'text-teal-600' : 'text-neutral-800'}`}>{f.name}</p>
                        <p className="text-xs text-neutral-500 mb-2">{f.score} điểm</p>
                      </>
                    ) : (
                      <p className="text-xs text-neutral-300 mb-2 pt-16">Đang chờ</p>
                    )}
                    <div className={`${h} ${bg} rounded-t-2xl flex items-start justify-center pt-3 text-2xl font-extrabold text-white/90`}>{place}</div>
                  </div>
                ))}
              </div>

              {/* Bảng danh sách */}
              <div className="rounded-3xl border border-neutral-100 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-stone-100 text-neutral-500 text-xs uppercase">
                    <tr>
                      <th className="py-3 pl-4 text-left w-14">Hạng</th>
                      <th className="text-left">Gia đình</th>
                      <th className="text-right">Điểm</th>
                      <th className="text-right pr-4 hidden sm:table-cell">Cách hạng trên</th>
                    </tr>
                  </thead>
                  <tbody>
                    {families.map((f, i) => (
                      <tr key={f.key} className={`border-t border-neutral-100 ${f.key === myKey ? 'bg-teal-50 font-semibold' : i < 3 ? 'bg-amber-50/50' : ''}`}>
                        <td className="py-3 pl-4 font-bold text-neutral-500">{i + 1}</td>
                        <td className="truncate max-w-[180px]">{f.name}{f.key === myKey && <span className="ml-2 text-xs text-teal-600">(bạn)</span>}</td>
                        <td className="text-right font-bold text-orange-500">{f.score}</td>
                        <td className="text-right pr-4 text-neutral-400 hidden sm:table-cell">
                          {i === 0 ? '—' : `${families[i - 1].score - f.score + 1} điểm`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Quà tặng */}
          <div className="rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold text-neutral-800">Quà tặng</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <div className="bg-white/80 rounded-2xl p-4"><BookImage className="w-6 h-6 text-teal-600 mb-2" /><p className="font-bold text-neutral-800">Top 1 mỗi tuần</p><p className="text-neutral-600">1 album lưu giữ các ảnh gia đình đã gửi</p></div>
              <div className="bg-white/80 rounded-2xl p-4"><Backpack className="w-6 h-6 text-orange-600 mb-2" /><p className="font-bold text-neutral-800">Top 1 mỗi tuần</p><p className="text-neutral-600">1 bộ dụng cụ học tập</p></div>
              <div className="bg-white/80 rounded-2xl p-4"><Award className="w-6 h-6 text-amber-600 mb-2" /><p className="font-bold text-neutral-800">Mọi gia đình</p><p className="text-neutral-600">Chứng nhận điện tử khi chiến dịch kết thúc</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
