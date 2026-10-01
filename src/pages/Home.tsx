import { Link } from 'react-router-dom';
import {
  Sparkles,
  Palette,
  Settings,
  Trophy,
  ArrowRight,
  Heart,
  Calendar,
  Gift,
  Camera,
} from 'lucide-react';
import EmailSubscribe from '@/components/EmailSubscribe';

const heroImage =
  'https://images.pexels.com/photos/6962218/pexels-photo-6962218.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-stone-100 via-teal-50 to-cyan-50">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Gia đình cùng nhau sáng tạo"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Smart Play Guide · Chiến dịch kết nối gia đình
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 leading-[1.15] mb-6">
              Kết nối sâu sắc cùng con qua <span className="text-teal-500">sáng tạo</span> và <span className="text-cyan-500">thử thách</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed mb-8 max-w-xl">
              Chúng tôi giúp các gia đình xây dựng kỷ niệm đáng nhớ thông qua hoạt động sáng tạo cùng con và thử thách 14 ngày đầy ý nghĩa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/huong-dan-cai-dat"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-0.5"
              >
                <Settings className="w-5 h-5" />
                Hướng dẫn cài đặt trực tuyến
              </Link>
              <Link
                to="/hoat-dong-cung-con"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50 transition-all border border-neutral-200 hover:-translate-y-0.5"
              >
                <Palette className="w-5 h-5 text-orange-500" />
                Hoạt động cùng con
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge teaser */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold mb-6">
                <Trophy className="w-4 h-4" />
                Thử thách 14 ngày
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-neutral-800 leading-tight mb-4">
                Tham gia thử thách,
                <br />
                <span className="text-amber-500">nhận thưởng liền tay!</span>
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Cùng con tham gia challenge 14 ngày — mỗi ngày một hoạt động nhỏ, một kỷ niệm mới.
                Hoàn thành thử thách và nhận giải thưởng độc đáo, mang đậm dấu ấn cá nhân của gia đình bạn.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-4">
                  <Calendar className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">14 ngày</p>
                    <p className="text-neutral-500 text-xs">2 tuần liên tiếp</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-4">
                  <Gift className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">Giải độc đáo</p>
                    <p className="text-neutral-500 text-xs">Dấu ấn cá nhân</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-4">
                  <Camera className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">Đăng ảnh</p>
                    <p className="text-neutral-500 text-xs">Lưu giữ kỷ niệm</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-4">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">Kết nối</p>
                    <p className="text-neutral-500 text-xs">Bên con mỗi ngày</p>
                  </div>
                </div>
              </div>

              <Link
                to="/challenge"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5"
              >
                Tham gia ngay <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/19080464/pexels-photo-19080464.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Challenge 14 ngày cùng con"
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-5 animate-float">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-500">14</p>
                  <p className="text-xs text-neutral-500 font-medium">ngày thử thách</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-amber-500" />
                  <div>
                    <p className="text-sm font-bold text-neutral-800">Giải thưởng</p>
                    <p className="text-xs text-neutral-500">Độc đáo, cá nhân</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick navigation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-3">Khám phá thêm</h2>
            <p className="text-neutral-500">Tất cả những gì bạn cần để bắt đầu hành trình kết nối cùng con</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { to: '/ve-chung-toi', icon: Heart, title: 'Về chúng tôi', desc: 'Câu chuyện đằng sau chiến dịch', color: 'bg-rose-50 text-rose-500' },
              { to: '/huong-dan-cai-dat', icon: Settings, title: 'Hướng dẫn cài đặt', desc: 'Giới hạn ứng dụng cho con', color: 'bg-cyan-50 text-cyan-500' },
              { to: '/hoat-dong-cung-con', icon: Palette, title: 'Hoạt động DIY', desc: 'Sáng tạo cùng con mỗi ngày', color: 'bg-teal-50 text-teal-500' },
              { to: '/challenge', icon: Trophy, title: 'Challenge 14 ngày', desc: 'Thử thách và nhận thưởng', color: 'bg-amber-50 text-amber-500' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group p-6 bg-neutral-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-neutral-200"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-neutral-800 mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Email subscribe */}
      <EmailSubscribe />
    </div>
  );
}
