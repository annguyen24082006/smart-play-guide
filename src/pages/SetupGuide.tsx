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
    title: 'Thiết lập Screen Time từng bước',
    description: 'Đặt trần thời gian, lọc nội dung theo độ tuổi và chặn mua hàng bí mật trên iPad và iPhone.',
    image: 'https://images.pexels.com/photos/36698020/pexels-photo-36698020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    title: 'Quản lý thiết bị Android bằng Google Family Link',
    description: 'Tạo môi trường an toàn cho con, phê duyệt ứng dụng và đặt giờ tắt máy tự động.',
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
    title: 'Cài YouTube Kids an toàn trong 4 phút',
    description: 'Tạo không gian xem video phù hợp cho trẻ. Hai bước quan trọng nhất: tắt tìm kiếm và đặt bộ hẹn giờ.',
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
    title: 'Tạo không gian xem an toàn trên Netflix',
    description: 'Hồ sơ Kids và mã PIN giúp con không lướt được sang nội dung người lớn trên Netflix.',
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
    title: 'Lọc nội dung trên Tivi thông minh & YouTube',
    description: 'Tivi là màn hình cả nhà cùng xem nên dễ kiểm soát nhất — nếu biết cài hồ sơ trẻ em và đặt TV đúng chỗ.',
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
    <div>
      <section className="relative py-24 bg-gradient-to-br from-cyan-50 via-stone-50 to-blue-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 text-cyan-600 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Smartphone className="w-4 h-4" />
              Hướng dẫn cài đặt
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-teal-600 mb-3">
              Bố mẹ cứ yên tâm, SPG chỉ từng bước 💚
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-800 leading-tight mb-6">
              Hướng dẫn cài đặt ứng dụng trực tuyến
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Chọn từng chủ đề để xem hướng dẫn bằng lời và video chi tiết. Từ giới hạn thời gian trên điện thoại
              đến lọc nội dung trên các nền tảng mà con thường sử dụng.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-600 rounded-full text-sm font-medium mb-4">
                <ListChecks className="w-4 h-4" />
                Thư viện hướng dẫn
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800">Chọn chủ đề bạn cần</h2>
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

      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-cyan-600 rounded-full text-sm font-medium mb-4"><ListChecks className="w-4 h-4" />Mẹo hữu ích</div>
            <h2 className="text-3xl font-bold text-neutral-800 mb-3">Những điều nên nhớ</h2>
            <p className="text-neutral-500">Giúp việc thiết lập hiệu quả và bền vững hơn</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0"><tip.icon className="w-6 h-6 text-cyan-600" /></div>
                <div><h3 className="font-bold text-neutral-800 mb-1">{tip.title}</h3><p className="text-sm text-neutral-600 leading-relaxed">{tip.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedGuide(null)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 z-10 bg-white border-b border-neutral-100 px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600">{selectedGuide.category} · {selectedGuide.duration}</p>
                <h2 className="text-2xl font-bold text-neutral-800 mt-1">{selectedGuide.title}</h2>
              </div>
              <button onClick={() => setSelectedGuide(null)} className="p-2 rounded-xl hover:bg-neutral-100" aria-label="Đóng hướng dẫn"><X className="w-5 h-5 text-neutral-500" /></button>
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
