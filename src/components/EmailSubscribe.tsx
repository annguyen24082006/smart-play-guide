import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, CheckCircle, Loader2, Bell } from 'lucide-react';

export default function EmailSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setMessage('');

    const targetEmail = email.trim();

    // 1. Lưu email vào cơ sở dữ liệu Supabase
    const { error } = await supabase
      .from('email_subscriptions')
      .insert({ email: targetEmail });

    if (error) {
      if (error.code === '23505') {
        setStatus('success');
        setMessage('Email này đã được đăng ký rồi! Chúng mình sẽ sớm gửi thông báo đến bạn.');
        return;
      } else {
        setStatus('error');
        setMessage('Có lỗi xảy ra khi kết nối cơ sở dữ liệu. Vui lòng thử lại sau nhé.');
        return;
      }
    }

    // 2. Gửi Email chào mừng tự động qua EmailJS
    try {
      if ((window as any).emailjs) {
        await (window as any).emailjs.send(
          'service_33ael3b',
          'template_ketogqq',
          { user_email: targetEmail }
        );
      }
    } catch (emailError) {
      console.error('Lỗi khi gửi email qua EmailJS:', emailError);
    }

    // 3. Đánh dấu hoàn tất
    setStatus('success');
    setMessage('Đăng ký thành công! Bạn hãy kiểm tra hộp thư email chào mừng từ Smart Play Guide nhé.');
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-teal-500 to-cyan-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
            <Bell className="w-4 h-4" />
            Nhận thông báo mới nhất
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Đăng ký email để không bỏ lỡ
          </h2>
          <p className="text-teal-50 text-lg mb-8 leading-relaxed">
            Chúng mình sẽ gửi thông báo khi có bài đăng mới, hoặc khi chuẩn bị đồ dùng cho challenge mới.
            Đừng bỏ lỡ cơ hội kết nối cùng con!
          </p>
        </div>

        {status === 'success' ? (
          <div className="max-w-md mx-auto bg-white rounded-2xl p-8 text-center animate-slide-up shadow-xl">
            <CheckCircle className="w-12 h-12 text-teal-500 mx-auto mb-4" />
            <p className="text-neutral-700 font-medium leading-relaxed">{message}</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm text-teal-600 font-medium hover:underline"
            >
              Đăng ký email khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                  disabled={status === 'loading'}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-4 bg-neutral-800 text-white font-semibold rounded-xl hover:bg-neutral-900 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  'Đăng ký ngay'
                )}
              </button>
            </div>
            {status === 'error' && (
              <p className="mt-4 text-center text-red-100 text-sm bg-red-500/20 backdrop-blur-sm rounded-lg py-2 px-4">
                {message}
              </p>
            )}
            <p className="mt-4 text-center text-teal-50/70 text-xs">
              Chúng mình tôn trọng quyền riêng tư của bạn. Không spam, hủy bất cứ lúc nào.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
