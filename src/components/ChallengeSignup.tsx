import { useState } from 'react';
import { Bell, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ChallengeSignup() {
  const [f, setF] = useState({ family: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const valid = f.family.trim() && (f.email.trim() || f.phone.trim());

  const submit = async () => {
    if (!valid) return;
    setStatus('loading');
    const { error } = await supabase.from('challenge_signups').insert({
      family_name: f.family.trim(),
      email: f.email.trim() || null,
      phone: f.phone.trim() || null,
    });
    setStatus(error ? 'error' : 'ok');
  };

  const input = 'w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400';

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-teal-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-700 rounded-full text-sm font-bold mb-4">
            <Bell className="w-4 h-4" /> Nhận nhắc nhở challenge
          </div>
          <h2 className="text-3xl font-bold text-neutral-800 mb-3">Đăng ký để không lỡ ngày nào</h2>
          <p className="text-neutral-600">
            SPG sẽ nhắn mỗi ngày khi có challenge mới, và <strong>trước 1 ngày</strong> sẽ báo ba mẹ cần chuẩn bị
            dụng cụ gì để có sẵn đồ làm luôn.
          </p>
        </div>
        {status === 'ok' ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <CheckCircle className="w-12 h-12 text-teal-500 mx-auto mb-3" />
            <p className="font-bold text-neutral-800">Đã đăng ký thành công!</p>
            <p className="text-sm text-neutral-500 mt-1">SPG sẽ nhắn cho gia đình {f.family.trim()} sớm nhất.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
            <input className={input} placeholder="Tên hộ gia đình (VD: Gia đình bé Miu) *" value={f.family} onChange={set('family')} />
            <input className={input} type="email" placeholder="Email" value={f.email} onChange={set('email')} />
            <input className={input} placeholder="Số điện thoại / Zalo" value={f.phone} onChange={set('phone')} />
            <p className="text-xs text-neutral-400">Điền ít nhất email hoặc số điện thoại. Thông tin chỉ dùng để gửi thông báo của chiến dịch.</p>
            {status === 'error' && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">Có lỗi xảy ra, vui lòng thử lại.</p>}
            <button
              onClick={submit}
              disabled={!valid || status === 'loading'}
              className="w-full py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Bell className="w-5 h-5" />}
              Đăng ký nhận thông báo
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
