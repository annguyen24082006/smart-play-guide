import { useState } from 'react';
import {
  X,
  PlayCircle,
  ExternalLink,
  ArrowRight,
  Palette,
  Scissors,
  Paintbrush,
  Box,
  Flower2,
  Star,
  Clock,
  CheckCircle,
} from 'lucide-react';

type Level = 'easy' | 'medium' | 'hard';

const levels: { id: Level; label: string; note: string; color: string }[] = [
  { id: 'easy', label: 'Dễ', note: 'Khởi động nhẹ nhàng, làm được ngay', color: 'bg-teal-100 text-teal-700' },
  { id: 'medium', label: 'Khá', note: 'Cần chuẩn bị một chút, vui hơn', color: 'bg-amber-100 text-amber-700' },
  { id: 'hard', label: 'Khó', note: 'Thử thách sự kiên nhẫn của cả nhà', color: 'bg-orange-100 text-orange-700' },
];

// Dán link YouTube thật vào videoUrl của từng hoạt động (watch?v=..., youtu.be/... hoặc embed/...).
// Khi videoUrl còn trống, trang hiện nút "Tìm video trên YouTube" theo videoQuery.
const toEmbed = (url: string) => {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : '';
};

const activities = [
  {
    icon: Paintbrush,
    title: 'Vẽ tranh cùng con',
    level: 'easy' as Level,
    steps: ["Trải giấy, đặt màu và cọ ra bàn; cho con mặc áo cũ.", "Cùng chọn chủ đề: ngôi nhà, bữa cơm, chuyến đi chơi của cả nhà.", "Con vẽ nhân vật chính, ba mẹ vẽ thêm bối cảnh (hoặc ngược lại).", "Tô màu, ký tên cả nhà rồi đặt tên cho bức tranh."],
    videoUrl: '',
    videoQuery: 'vẽ tranh cùng con cho bé màu nước',
    desc: 'Dùng màu nước hoặc màu sáp để vẽ một bức tranh về chủ đề gia đình. Không cần vẽ đẹp, chỉ cần vẽ thật.',
    materials: ['Giấy A4', 'Màu nước / màu sáp', 'Cọ vẽ', 'Bút chì'],
    duration: '30-45 phút',
    age: '3-12 tuổi',
    image: 'https://images.pexels.com/photos/6966373/pexels-photo-6966373.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Scissors,
    title: 'Làm thiệp thủ công',
    level: 'easy' as Level,
    steps: ["Gấp đôi tờ giấy màu để làm thân thiệp.", "Cắt hình trái tim, hoa hoặc ngôi sao từ giấy màu khác.", "Dán hình lên mặt thiệp và trang trí bằng bút lông.", "Viết lời chúc bên trong và tặng người thân."],
    videoUrl: '',
    videoQuery: 'làm thiệp thủ công handmade cho bé',
    desc: 'Cùng con cắt dán và trang trí một tấm thiệp tặng người thân nhân dịp đặc biệt.',
    materials: ['Giấy màu', 'Kéo', 'Keo dán', 'Bút lông'],
    duration: '20-40 phút',
    age: '4-12 tuổi',
    image: 'https://images.pexels.com/photos/7869798/pexels-photo-7869798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Box,
    title: 'Đồ chơi từ hộp giấy',
    level: 'medium' as Level,
    steps: ["Chọn hộp giấy sạch, quyết định làm gì: ô tô, nhà nhỏ hay robot.", "Ba mẹ cắt các chi tiết khó (cửa, bánh xe); con phụ dán và ghép.", "Phủ giấy màu hoặc sơn lên thân hộp, chờ khô.", "Vẽ chi tiết, đặt tên và chơi cùng con."],
    videoUrl: '',
    videoQuery: 'làm đồ chơi từ hộp giấy carton cho bé',
    desc: 'Biến hộp giấy cũ thành ô tô, nhà nhỏ, hoặc robot. Sáng tạo không giới hạn!',
    materials: ['Hộp giấy', 'Keo dán', 'Màu vẽ', 'Bút chì'],
    duration: '40-60 phút',
    age: '5-12 tuổi',
    image: 'https://images.pexels.com/photos/8033894/pexels-photo-8033894.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Flower2,
    title: 'Trồng cây mini',
    level: 'medium' as Level,
    steps: ["Cho đất vào chậu, khoảng 3/4 chậu.", "Con tự tay gieo hạt và lấp một lớp đất mỏng.", "Tưới nước nhẹ và đặt chậu nơi có nắng.", "Trang trí chậu bằng sỏi; cùng con tưới và ghi lại sự phát triển mỗi ngày."],
    videoUrl: '',
    videoQuery: 'trồng cây mini trong chậu cho bé',
    desc: 'Cùng con trồng một chậu cây nhỏ, trang trí chậu và học cách chăm sóc cây mỗi ngày.',
    materials: ['Chậu nhỏ', 'Đất trồng', 'Hạt giống', 'Sỏi trang trí'],
    duration: '30 phút + chăm sóc hàng ngày',
    age: '4-10 tuổi',
    image: 'https://images.pexels.com/photos/23224895/pexels-photo-23224895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Star,
    title: 'Làm vòng tay friendship',
    level: 'hard' as Level,
    steps: ["Cắt 6 sợi chỉ dài khoảng 50 cm, buộc nút và dán đầu chỉ lên bàn.", "Xếp thứ tự màu như ý muốn.", "Đan theo kiểu nút thắt xoắn hoặc bện ba, kiên nhẫn từng hàng.", "Đủ độ dài quanh cổ tay thì buộc nút chắc chắn và cắt chỉ thừa."],
    videoUrl: '',
    videoQuery: 'làm vòng tay friendship đan chỉ',
    desc: 'Đan vòng tay bằng chỉ màu — hoạt động rèn luyện khéo tay và sự kiên nhẫn.',
    materials: ['Chỉ thêu nhiều màu', 'Kéo', 'Băng keo'],
    duration: '20-30 phút',
    age: '6-12 tuổi',
    image: 'https://images.pexels.com/photos/23224902/pexels-photo-23224902.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Palette,
    title: 'Tranh đóng khung tự nhiên',
    level: 'hard' as Level,
    steps: ["Đi dạo, cùng con nhặt lá, hoa, cành nhỏ (không hái hoa nơi công cộng).", "Ép lá, hoa trong sách nặng 1-2 ngày cho phẳng.", "Sắp bố cục lên giấy khung trước khi dán.", "Dán bằng keo mỏng, để khô rồi đóng khung treo tường."],
    videoUrl: '',
    videoQuery: 'làm tranh lá cây khô ép hoa cho bé',
    desc: 'Đi dạo ngoài công viên, nhặt lá cây, hoa khô rồi dán thành bức tranh tự nhiên.',
    materials: ['Lá cây, hoa khô', 'Giấy khung', 'Keo dán', 'Bút chì'],
    duration: '45-60 phút',
    age: '4-10 tuổi',
    image: 'https://images.pexels.com/photos/8033898/pexels-photo-8033898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export default function DIY() {
  const [open, setOpen] = useState<(typeof activities)[number] | null>(null);
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-teal-50 via-stone-50 to-emerald-50 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 text-teal-600 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Palette className="w-4 h-4" />
              Hoạt động cùng con
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-800 leading-tight mb-6">
              DIY — Sáng tạo cùng con mỗi ngày
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Những hoạt động thủ công đơn giản, vui vẻ và đầy ý nghĩa.
              Không cần dụng cụ phức tạp, chỉ cần ba mẹ, con, và một chút tưởng tượng.
            </p>
          </div>
        </div>
      </section>

      {/* Activities by level */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {levels.map((lv) => (
            <div key={lv.id}>
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${lv.color}`}>Trò {lv.label}</span>
                <p className="text-sm text-neutral-500">{lv.note}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.filter((a) => a.level === lv.id).map((act) => (
                  <button
                    key={act.title}
                    onClick={() => setOpen(act)}
                    className="group text-left bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-neutral-100"
                  >
                    <div className="aspect-[3/2] overflow-hidden relative">
                      <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 bg-white/90 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-500" />
                        {act.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                          <act.icon className="w-5 h-5 text-teal-600" />
                        </div>
                        <span className="text-xs text-neutral-400 font-medium">{act.age}</span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-800 mb-2">{act.title}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed mb-4">{act.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 group-hover:gap-2.5 transition-all">
                        Xem hướng dẫn & video <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{open.duration} · {open.age}</p>
                <h2 className="text-2xl font-bold text-neutral-800 mt-1">{open.title}</h2>
              </div>
              <button onClick={() => setOpen(null)} className="p-2 rounded-xl hover:bg-neutral-100" aria-label="Đóng"><X className="w-5 h-5 text-neutral-500" /></button>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-neutral-600 leading-relaxed mb-6">{open.desc}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Dụng cụ cần chuẩn bị</p>
              <div className="flex flex-wrap gap-1.5 mb-7">
                {open.materials.map((m) => (
                  <span key={m} className="inline-flex items-center gap-1 text-xs bg-stone-100 text-neutral-600 px-2.5 py-1 rounded-md">
                    <CheckCircle className="w-3 h-3 text-teal-500" />{m}
                  </span>
                ))}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Các bước thực hiện</p>
              <ol className="space-y-3 mb-8">
                {open.steps.map((st, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                    <p className="text-neutral-700 leading-relaxed pt-1">{st}</p>
                  </li>
                ))}
              </ol>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Video hướng dẫn</p>
              {toEmbed(open.videoUrl) ? (
                <div className="aspect-video rounded-2xl overflow-hidden bg-neutral-100">
                  <iframe
                    className="w-full h-full"
                    src={toEmbed(open.videoUrl)}
                    title={open.title}
                    allow="accelerometer; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(open.videoQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 aspect-video rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-semibold hover:bg-amber-100 transition-all"
                >
                  <PlayCircle className="w-8 h-8" /> Tìm video trên YouTube <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4">
            Sẵn sàng cho thử thách lớn hơn?
          </h2>
          <p className="text-neutral-600 mb-6">
            Kết hợp DIY với Challenge 14 ngày để tạo kỷ niệm đáng nhớ cùng con.
          </p>
          <a
            href="/challenge"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 hover:-translate-y-0.5"
          >
            Tham gia Challenge 14 ngày
          </a>
        </div>
      </section>
    </div>
  );
}
