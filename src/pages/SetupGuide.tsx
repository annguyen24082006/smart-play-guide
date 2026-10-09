import { useState } from 'react';
import {
  Smartphone,
  Apple,
  Monitor,
  Clock,
  Shield,
  Bell,
  CheckCircle,
  ListChecks,
  PlayCircle,
  ArrowRight,
  X,
  Youtube,
  Tv,
  LockKeyhole,
} from 'lucide-react';

type Guide = {
  id: string;
  category: string;
  duration: string;
  title: string;
  description: string;
  image?: string;
  icon: typeof Smartphone;
  iconColor: string;
  steps: string[];
  note: string;
};

const guides: Guide[] = [
  {
    id: 'screen-time',
    category: 'iPad & iPhone',
    duration: '5 phút',
    title: 'Giới hạn thời gian thật dễ dàng',
    description: 'Cùng đặt “giờ nghỉ” cho iPhone & iPad để con vừa xem vui, vừa không quên giờ nha!',
    image: '/screen_time.png',
    icon: Apple,
    iconColor: 'bg-neutral-800',
    steps: [
      'Mở Cài đặt → Thời gian sử dụng (Screen Time).',
      'Chọn Bật Thời gian sử dụng rồi chọn Đây là iPhone/iPad của trẻ.',
      'Mở Giới hạn ứng dụng để chọn nhóm ứng dụng và thời lượng mỗi ngày.',
      'Vào Hạn chế nội dung & quyền riêng tư để lọc nội dung theo độ tuổi.',
      'Đặt mật mã Screen Time riêng để con không tự thay đổi cài đặt.',
    ],
    note: 'Nên cùng con thống nhất thời gian sử dụng trước khi đặt giới hạn để con cảm thấy được lắng nghe.',
  },
  {
    id: 'family-link',
    category: 'Android',
    duration: '8 phút',
    title: 'Cùng bé dùng Android hiệu quả và an toàn',
    description: 'Bây giờ, bố mẹ có thể đặt giờ nghỉ, duyệt app mới và quản lý thời gian dùng máy thật dễ dàng.',
    image: 'https://images.pexels.com/photos/27177478/pexels-photo-27177478.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Monitor,
    iconColor: 'bg-teal-500',
    steps: [
      'Cài Google Family Link trên điện thoại của ba mẹ.',
      'Tạo hoặc kết nối tài khoản Google của con theo hướng dẫn trên màn hình.',
      'Mở phần Giới hạn ứng dụng để đặt thời lượng cho từng ứng dụng.',
      'Thiết lập Lịch nghỉ để máy tự khóa trong giờ ngủ hoặc giờ học.',
      'Bật phê duyệt ứng dụng để ba mẹ xem trước ứng dụng con muốn cài.',
    ],
    note: 'Family Link phù hợp khi ba mẹ muốn quản lý thiết bị từ xa nhưng vẫn trao đổi minh bạch với con.',
  },
  {
    id: 'youtube-kids',
    category: 'YouTube Kids',
    duration: '4 phút',
    title: 'YouTube Kids: 4 phút để yên tâm hơn',
    description: 'Chỉ vài bước nhỏ để bé xem đúng nội dung phù hợp - bố mẹ nhớ kiểm tra tìm kiếm và giới hạn giờ xem nhé!',
    icon: Youtube,
    iconColor: 'bg-orange-500',
    steps: [
      'Mở YouTube Kids và tạo hồ sơ riêng cho từng bé.',
      'Chọn nhóm tuổi phù hợp để hệ thống gợi ý nội dung đúng độ tuổi.',
      'Tắt tính năng Tìm kiếm nếu con còn nhỏ để hạn chế video ngoài danh sách.',
      'Dùng bộ hẹn giờ để giới hạn thời gian xem mỗi lần.',
      'Kiểm tra lịch sử xem định kỳ và chặn nội dung không phù hợp.',
    ],
    note: 'Không có bộ lọc nào thay thế hoàn toàn việc đồng hành. Hãy thỉnh thoảng xem cùng con và hỏi con về video đã xem.',
  },
  {
    id: 'netflix',
    category: 'Netflix',
    duration: '4 phút',
    title: 'Góc nhỏ của bé trên không gian Netflix',
    description: 'Tạo hồ sơ và mã PIN để mở ra một thế giới màu sắc, đáng yêu của riêng con.',
    icon: LockKeyhole,
    iconColor: 'bg-amber-600',
    steps: [
      'Mở Quản lý hồ sơ và tạo một hồ sơ riêng cho trẻ.',
      'Bật giao diện Kids để chỉ hiển thị nội dung dành cho trẻ em.',
      'Vào Tài khoản → Kiểm soát của phụ huynh để đặt giới hạn độ tuổi.',
      'Đặt mã PIN cho hồ sơ người lớn để con không chuyển hồ sơ.',
      'Kiểm tra lại danh sách nội dung con đã xem mỗi tuần.',
    ],
    note: 'Mật khẩu và mã PIN nên được cất riêng, không lưu trên thiết bị mà con thường sử dụng.',
  },
  {
    id: 'smart-tv',
    category: 'Tivi thông minh',
    duration: '6 phút',
    title: 'Hãy biến TV thành một góc nhỏ tràn ngập tiếng cười của gia đình mình',
    description: 'Một vài cài đặt nhỏ giúp bố mẹ chọn nội dung phù hợp hơn và để cả nhà cùng xem TV thật vui.',
    image: 'https://images.pexels.com/photos/20459169/pexels-photo-20459169.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Tv,
    iconColor: 'bg-teal-600',
    steps: [
      'Đặt Tivi ở không gian sinh hoạt chung thay vì trong phòng riêng của con.',
      'Tạo hồ sơ trẻ em trên ứng dụng xem video nếu thiết bị hỗ trợ.',
      'Bật chế độ hạn chế nội dung trong cài đặt YouTube hoặc ứng dụng tương ứng.',
      'Thiết lập giờ tắt Tivi cố định, nhất là trước giờ ngủ.',
      'Thống nhất với con danh sách chương trình được xem trong tuần.',
    ],
    note: 'Một quy tắc đơn giản và nhất quán thường hiệu quả hơn nhiều cài đặt phức tạp.',
  },
];

export default function SetupGuide() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const tips = [
    { icon: Clock, title: 'Thời gian hợp lý', desc: 'Khuyến nghị: không quá 1-2 giờ/ngày cho trẻ dưới 10 tuổi.' },
    { icon: Shield, title: 'Nội dung an toàn', desc: 'Kiểm duyệt nội dung theo độ tuổi, bật chế độ an toàn.' },
    { icon: Bell, title: 'Nhắc nhở', desc: 'Đặt thông báo khi sắp hết thời gian để con biết trước.' },
    { icon: CheckCircle, title: 'Tạo thỏa thuận', desc: 'Bàn bạc cùng con về quy định, giải thích lý do rõ ràng.' },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Header với ảnh nền screen_time.png */}
      <section className="relative w-full overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/screen_time.png"
            alt="Smart Play Guide - Hướng dẫn cài đặt"
            className="w-full h-full object-cover object-right-bottom"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 text-teal-700 border border-teal-200/60 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm backdrop-blur-sm">
              <Smartphone className="w-4 h-4 text-teal-600" />
              Thời gian cùng bé
            </div>

            <p className="text-xl sm:text-2xl font-semibold text-teal-700 mb-3">
              Bố mẹ cứ yên tâm, SPG chỉ từng bước 💚
            </p>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 leading-[1.15] mb-6 tracking-tight">
              Làm sao để bạn bé tự tắt thiết bị khi đến giờ?
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium">
              Giới hạn thời gian của con cùng với sự chọn lọc nội dung mà cha mẹ muốn bạn bé tiếp cận. Tất tần tật mọi thứ đều có mặt ở đây!
        
            </p>
          </div>
        </div>
      </section>

      {/* Thư viện hướng dẫn */}
      <section className="py-20 bg-white relative z-10 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-600 rounded-full text-sm font-medium mb-4">
                <ListChecks className="w-4 h-4" />
                Thư viện hướng dẫn
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800">Bố mẹ đang cần gì SPG lo</h2>
            </div>
            <p className="text-sm text-neutral-500 max-w-xs leading-relaxed">
              Mỗi thẻ gồm hướng dẫn từng bước và phần xem video chi tiết ở cuối.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <article key={guide.id} className="group bg-[#fffaf0] rounded-2xl overflow-hidden border border-[#eadfca] hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-[#fff0c9] relative overflow-hidden flex items-center justify-center">
                  {guide.image ? (
                    <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <guide.icon className="w-14 h-14 text-amber-600/70" strokeWidth={1.4} />
                  )}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-white/90 rounded-full text-xs font-medium text-amber-700">{guide.category}</span>
                    <span className="text-xs font-medium text-neutral-600 bg-white/80 rounded-full px-2 py-1">{guide.duration}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${guide.iconColor} flex items-center justify-center shrink-0`}>
                      <guide.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-800 leading-snug">{guide.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-5">{guide.description}</p>
                  <button
                    onClick={() => setSelectedGuide(guide)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-amber-600 hover:text-amber-700 group-hover:gap-2 transition-all"
                  >
                    Xem hướng dẫn <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mẹo hữu ích */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-cyan-600 rounded-full text-sm font-medium mb-4">
              <ListChecks className="w-4 h-4" />
              Mẹo hữu ích
            </div>
            <h2 className="text-3xl font-bold text-neutral-800 mb-3">Những điều nên nhớ</h2>
            <p className="text-neutral-500">Giúp việc thiết lập hiệu quả và bền vững hơn</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                  <tip.icon className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-800 mb-1">{tip.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal xem hướng dẫn chi tiết */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedGuide(null)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 z-10 bg-white border-b border-neutral-100 px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600">{selectedGuide.category} · {selectedGuide.duration}</p>
                <h2 className="text-2xl font-bold text-neutral-800 mt-1">{selectedGuide.title}</h2>
              </div>
              <button onClick={() => setSelectedGuide(null)} className="p-2 rounded-xl hover:bg-neutral-100" aria-label="Đóng hướng dẫn">
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-neutral-600 leading-relaxed mb-7">{selectedGuide.description}</p>
              <div className="space-y-4">
                {selectedGuide.steps.map((step, index) => (
                  <div key={step} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-sm font-bold shrink-0">{index + 1}</div>
                    <p className="text-neutral-700 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 rounded-2xl bg-cyan-50 border border-cyan-100 p-5 flex gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                <p className="text-sm text-cyan-900 leading-relaxed">{selectedGuide.note}</p>
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden border border-amber-200 bg-[#fffaf0]">
                <div className="aspect-video bg-[#fff0c9] flex flex-col items-center justify-center text-center px-6">
                  <PlayCircle className="w-14 h-14 text-amber-600 mb-3" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-neutral-800">Video hướng dẫn chi tiết</h3>
                  <p className="text-sm text-neutral-600 mt-2 max-w-md">Video minh họa cho phần {selectedGuide.category} sẽ được hiển thị tại đây.</p>
                </div>
                <div className="p-4 flex items-center justify-between gap-4">
                  <p className="text-xs text-neutral-500">Xem video sau khi đọc các bước hướng dẫn bên trên.</p>
                  <button disabled className="px-4 py-2 rounded-lg bg-neutral-200 text-neutral-400 text-sm font-semibold cursor-not-allowed whitespace-nowrap">Video sắp cập nhật</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
