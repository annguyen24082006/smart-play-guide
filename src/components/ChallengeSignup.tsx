import { useState } from 'react';
import { Bell, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ChallengeSignup() {
  const [f, setF] = useState({ family: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const valid = f.family.trim() && (f.email.trim() || f.phone.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStatus('loading');
    setMessage('');

    const targetEmail = f.email.trim();
    const familyName = f.family.trim();
    const userPhone = f.phone.trim() || 'Không cung cấp';

    // 1. Lưu thông tin vào Supabase
    const { error } = await supabase.from('challenge_signups').insert({
      family_name: familyName,
      email: targetEmail || null,
      phone: userPhone,
    });

    if (error) {
      console.error('Lỗi Supabase:', error);
      // Nếu lỗi database vẫn cho chạy tiếp gửi mail hoặc báo lỗi
    }

    // 2. Gửi email tự động qua EmailJS (Y hệt file EmailSubscribe)
    if (targetEmail) {
      try {
        if ((window as any).emailjs) {
          await (window as any).emailjs.send(
            'service_33ael3b',     // Dùng đúng Service ID đang hoạt động
            'template_ped64qu',    // Template Challenge
            {
              user_email: targetEmail,
              family_name: familyName,
              phone: userPhone,
            }
          );
          console.log('Gửi email Challenge thành công!');
        }
      } catch (emailError) {
        console.error('Lỗi khi gửi email qua EmailJS:', emailError);
      }
    }

    // 3. Đánh dấu hoàn tất
    setStatus('success');
    setMessage(`Đã đăng ký thành công! SPG sẽ gửi thông báo cho gia đình ${familyName} sớm nhất.`);
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
            Smart Play Guide sẽ thông báo khi có challenge mới.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <CheckCircle className="w-12 h-12 text-teal-500 mx-auto mb-3" />
            <p className="font-bold text-neutral-800">Đăng ký thành công!</p>
            <p className="text-sm text-neutral-500 mt-1">{message}</p>
            <button
              onClick={() => {
                setStatus('idle');
                setF({ family: '', email: '', phone: '' });
              }}
              className="mt-6 text-sm text-teal-600 font-medium hover:underline"
            >
              Đăng ký cho gia đình khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
            <input
              className={input}
              placeholder="Tên hộ gia đình (VD: Gia đình bé Miu) *"
              value={f.family}
              onChange={set('family')}
              required
            />
            <input
              className={input}
              type="email"
              placeholder="Email"
              value={f.email}
              onChange={set('email')}
            />
            <input
              className={input}
              placeholder="Số điện thoại / Zalo"
              value={f.phone}
              onChange={set('phone')}
            />
            <p className="text-xs text-neutral-400">
              Điền ít nhất email hoặc số điện thoại. Thông tin chỉ dùng để gửi thông báo của chiến dịch.
            </p>

            {status === 'error' && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                Có lỗi xảy ra, vui lòng thử lại sau.
              </p>
            )}

            <button
              type="submit"
              disabled={!valid || status === 'loading'}
              className="w-full py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  <Bell className="w-5 h-5" />
                  Đăng ký nhận thông báo
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
