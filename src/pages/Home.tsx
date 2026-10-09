import { Link } from 'react-router-dom';
import {
  Sparkles,
  Palette,
  Settings,
  Trophy,
  ArrowRight,
  Heart,
  Calendar,
} from 'lucide-react';
import EmailSubscribe from '@/components/EmailSubscribe';

const heroImage = '/hero-bg.jpg';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-stone-100 via-teal-50 to-cyan-50">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Smart Play Guide - Trang chủ"
            className="w-full h-full object-cover object-right-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/10 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Smart Play Guide · Chiến dịch kết nối gia đình
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 leading-[1.15] mb-6">
                 Cùng bé lớn khôn qua các hoạt động <span className="text-teal-500">sáng tạo</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed mb-8 max-w-xl">
   Cùng SPG làm chủ thời gian sử dụng thiết bị của bé, khám phá vô vàn hoạt động sáng tạo tại nhà và tham gia thử thách 14 ngày để gia đình cùng tạo nên thật nhiều kỷ niệm gắn kết nhé bố mẹ ơi!            </p>
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

      {/* Feature Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Nguồn tài nguyên phong phú dành cho cha mẹ
            </h2>
            <p className="text-neutral-600">
              Khám phá các hướng dẫn chi tiết và hoạt động thực tế được thiết kế nhằm mang lại khoảnh khắc kết nối chất lượng nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-50 rounded-2xl p-8 hover:shadow-md transition-all border border-stone-100">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">Hướng dẫn cài đặt</h3>
              <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                Từng bước thiết lập các ứng dụng, thiết bị trực tuyến an toàn và phù hợp với độ tuổi của trẻ.
              </p>
              <Link
                to="/huong-dan-cai-dat"
                className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm hover:gap-3 transition-all"
              >
                Xem chi tiết <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-stone-50 rounded-2xl p-8 hover:shadow-md transition-all border border-stone-100">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">Hoạt động cùng con</h3>
              <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                Bộ sưu tập các trò chơi, bài tập sáng tạo không màn hình giúp phát triển tư duy cho con.
              </p>
              <Link
                to="/hoat-dong-cung-con"
                className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm hover:gap-3 transition-all"
              >
                Khám phá ngay <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-stone-50 rounded-2xl p-8 hover:shadow-md transition-all border border-stone-100">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">Thử thách 14 ngày</h3>
              <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                Tham gia hành trình 14 ngày xây dựng thói quen gắn kết và nhận phần thưởng ý nghĩa.
              </p>
              <Link
                to="/challenge"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold text-sm hover:gap-3 transition-all"
              >
                Tham gia ngay <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Mission Section */}
      <section className="py-20 bg-teal-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-800 text-teal-200 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                Sứ mệnh chiến dịch
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                Đồng hành cùng con trưởng thành từng ngày
              </h2>
              <p className="text-teal-100 text-lg leading-relaxed mb-8">
                Smart Play Guide không chỉ cung cấp giải pháp công nghệ mà còn tôn vinh giá trị của thời gian gia đình thực sự bên nhau.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-teal-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Kết nối cảm xúc</h4>
                    <p className="text-xs text-teal-200 mt-1">Tạo thói quen lắng nghe và chia sẻ mỗi ngày.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-teal-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Thói quen tích cực</h4>
                    <p className="text-xs text-teal-200 mt-1">Cân bằng thời gian sử dụng thiết bị số.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              <EmailSubscribe />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
