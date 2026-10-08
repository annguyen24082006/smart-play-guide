import { Heart, Users, Target, Monitor, Gamepad2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Đường dẫn trỏ tới file about_us.png trong thư mục public
const aboutImage = '/about_us.png';

export default function About() {
  return (
    <div>
      {/* Hero Header - Thiết kế nền sáng tự nhiên theo ảnh gốc */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-emerald-50/30 text-neutral-800">
        <div className="absolute inset-0">
          <img
            src={aboutImage}
            alt="Smart Play Guide - Về chúng tôi"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 text-emerald-700 border border-emerald-200/60 rounded-full text-sm font-medium mb-6 shadow-sm backdrop-blur-md">
              <Heart className="w-4 h-4 text-emerald-500" />
              Smart Play Guide · Về chúng tôi
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6 text-neutral-900">
              Câu chuyện đằng sau <span className="text-orange-500">chiến dịch</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-xl font-medium">
              Website đóng vai trò như một bộ lọc nội dung thông minh và cẩm nang kết nối gia đình. Chiến dịch này ra đời từ mong muốn giúp các gia đình tìm lại sự kết nối thật sự, không qua màn hình mà qua những khoảnh khắc chung tay sáng tạo.
            </p>
          </div>
        </div>
      </section>

      {/* Team intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/39190489/pexels-photo-39190489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Nhóm thực hiện chiến dịch"
                className="rounded-3xl shadow-xl w-full object-cover"
              />
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-5 hidden sm:block border border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-800">Đội ngũ</p>
                    <p className="text-sm text-neutral-500">Tâm huyết & sáng tạo</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">
                Chúng tôi là ai?
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  Chúng tôi là nhóm sinh viên Marketing của môn học Digital Marketing, Khoa Quản trị Kinh doanh và Du lịch, Trường Đại học Hà Nội, xây dựng nội dung giáo dục và kết nối gia đình. Mỗi thành viên đều mang đến góc nhìn riêng — từ thiết kế, tâm lý học trẻ em, đến truyền thông — để tạo nên một chiến dịch gần gũi và thực tế.
                </p>
                <p>
                  Chúng tôi không chỉ tạo ra hướng dẫn, mà còn đồng hành cùng các gia đình trong suốt hành trình. Mọi nội dung đều được nghiên cứu kỹ lưỡng và thử nghiệm thực tế trước khi chia sẻ.
                </p>
                <p>
                  Niềm tin cốt lõi của chúng tôi: <strong className="text-neutral-800">kết nối thật sự bắt đầu từ những điều nhỏ nhất</strong> — một phút cùng vẽ, một giờ cùng làm đồ thủ công, một buổi tối không màn hình.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl">
                  <Target className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">Sứ mệnh</p>
                    <p className="text-neutral-500 text-xs mt-1">Kết nối gia đình qua sáng tạo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl">
                  <Heart className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">Giá trị</p>
                    <p className="text-neutral-500 text-xs mt-1">Chân thành, gần gũi, thực tế</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content categories */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
              Nội dung chiến dịch gồm 2 phần
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              Chúng tôi chia nội dung thành hai phần rõ ràng, phù hợp với từng hoàn cảnh và nhu cầu của mỗi gia đình.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-neutral-100 group">
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Monitor className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-3">
                Hướng dẫn cho trực tuyến
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Những nội dung hướng dẫn ba mẹ thiết lập giới hạn ứng dụng, quản lý thời gian sử dụng thiết bị, và hướng dẫn con sử dụng các ứng dụng trực tuyến một cách an toàn, có chủ đích. Giúp con tận dụng công nghệ mà không bị phụ thuộc.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                  Cài đặt giới hạn thời gian sử dụng
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                  Quản lý ứng dụng và nội dung phù hợp
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                  Hướng dẫn sử dụng an toàn, có chủ đích
                </li>
              </ul>
              <Link
                to="/huong-dan-cai-dat"
                className="inline-flex items-center gap-1 text-cyan-600 font-semibold text-sm group-hover:gap-2 transition-all"
              >
                Xem hướng dẫn <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-neutral-100 group">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-3">
                Hoạt động sáng tạo
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Những hoạt động chơi và sáng tạo không cần màn hình — DIY, vẽ, làm đồ thủ công, trò chơi vận động và tương tác trực tiếp giữa ba mẹ và con. Mỗi hoạt động đều được thiết kế để khơi gợi trí tưởng tượng và tình cảm gia đình.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                  Hoạt động DIY với vật liệu dễ tìm
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                  Trò chơi vận động và tương tác
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                  Sáng tạo nghệ thuật và thủ công
                </li>
              </ul>
              <Link
                to="/hoat-dong-cung-con"
                className="inline-flex items-center gap-1 text-teal-600 font-semibold text-sm group-hover:gap-2 transition-all"
              >
                Khám phá hoạt động <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
