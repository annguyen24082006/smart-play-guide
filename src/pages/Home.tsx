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

const heroImage = '/hero-bg.jpg';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-stone-100 via-teal-50 to-cyan-50">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Smart Play Guide - những chú cún cùng nhau đi trên đồi cỏ"
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
