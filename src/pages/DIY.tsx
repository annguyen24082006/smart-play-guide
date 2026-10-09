import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Sparkles,
  FlaskConical,
} from 'lucide-react';

type Level = 'easy' | 'medium' | 'hard';

const levels: { id: Level; label: string; note: string; color: string }[] = [
  { id: 'easy', label: 'Dễ', note: 'Khởi động nhẹ nhàng, làm được ngay', color: 'bg-teal-100 text-teal-700' },
  { id: 'medium', label: 'Khá', note: 'Cần chuẩn bị một chút, vui hơn', color: 'bg-amber-100 text-amber-700' },
  { id: 'hard', label: 'Khó', note: 'Thử thách sự kiên nhẫn của cả nhà', color: 'bg-orange-100 text-orange-700' },
];

const toEmbed = (url: string) => {
  if (!url) return '';
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : '';
};

const activities = [
  {
    id: 'ban-bi-lac-carton',
    category: 'Thủ công & Trò chơi',
    level: 'medium' as Level, // Cần kéo sắc & dao rọc giấy -> Xếp nhóm Khá/Medium
    duration: '30 - 45 phút',
    age: '7-12 tuổi',
    title: 'Tự làm bàn bi lắc từ hộp carton',
    desc: 'Biến chiếc hộp giấy cũ thành bàn bi lắc mini cực kỳ thú vị, giúp bé rèn luyện phản xạ và giải trí cùng gia đình!',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800',
    icon: Scissors,
    iconColor: 'bg-amber-500',
    materials: [
      'Hộp carton (~30x20cm)',
      '6 que gỗ tròn (~35cm)',
      '12 kẹp gỗ quần áo',
      'Giấy gói quà & keo màu',
      'Keo sữa / súng bắn keo',
      'Dao rọc giấy, kéo',
      'Thước kẻ, bút marker',
      '1 viên bóng nhựa/bi',
    ],
    steps: [
      'Đo và đục lỗ: Đo đánh dấu 6 lỗ đối xứng trên 2 cạnh dài hộp carton, khoét lỗ tròn xỏ que.',
      'Cắt khung thành: Vẽ hình chữ nhật gôn bóng (12x7cm) ở 2 cạnh ngắn rồi cắt trống.',
      'Trang trí khung bàn: Bôi keo dán giấy gói quà bọc xung quanh thành hộp.',
      'Làm tay xoay: Quấn băng keo màu quanh 6 que gỗ rồi xỏ qua các lỗ trên thành hộp.',
      'Gắn cầu thủ & Hoàn thiện: Kẹp các kẹp gỗ vào que làm cầu thủ, thả bóng và bắt đầu trận đấu!',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=ZxdbvNSNTr4',
    videoQuery: 'tự làm bàn bi lắc bằng hộp carton',
  },
  {
    id: 'lam-long-den-giay',
    category: 'Thủ công & Trò chơi',
    level: 'easy' as Level,
    duration: '20 - 30 phút',
    age: '6-10 tuổi',
    title: 'Cách làm lồng đèn Trung thu bằng giấy A4',
    desc: 'Tự tay làm chiếc lồng đèn giấy xòe xinh xắn có đèn LED lung linh để bé đón Trung thu đầy niềm vui!',
    image: 'https://img.youtube.com/vi/cLbi6_xFcic/maxresdefault.jpg',
    icon: Sparkles,
    iconColor: 'bg-rose-500',
    materials: [
      'Giấy đỏ (16x28cm) & Giấy vàng (13x29.7cm)',
      'Giấy trang trí ngôi sao & dây tua rua',
      'Ống hút nhựa',
      'Đèn LED nhỏ',
      'Băng keo 2 mặt / kéo',
    ],
    steps: [
      'Làm vỏ ngoài: Dán băng keo 2 mặt dọc 2 mép giấy đỏ, gấp đôi, kẻ các đường 1cm rồi cắt dọc.',
      'Tạo hình lồng đèn: Bẻ gập ngược nếp cắt tạo độ xòe, dán cố định vào 2 mép giấy vàng rồi cuộn tròn.',
      'Làm giá đỡ đèn: Cắt ống hút xếp song song bên trong đáy lồng đèn để làm giá đỡ.',
      'Trang trí: Dán viền, gắn ngôi sao, dây tua rua, quai xách và đặt đèn LED vào bên trong.',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=cLbi6_xFcic',
    videoQuery: 'làm lồng đèn trung thu bằng giấy a4',
  },
  {
    id: 'nuoc-di-bo-bac-cau-mau-sac',
    category: 'Khoa học & Trò chơi',
    level: 'easy' as Level,
    duration: '15 - 20 phút',
    age: '3-10 tuổi',
    title: 'Nước đi bộ bắc cầu màu sắc',
    desc: 'Thí nghiệm khoa học huyền bí giúp bé quan sát hiện tượng mao dẫn khi nước màu tự "bò" qua dải giấy!',
    image: 'https://img.youtube.com/vi/hGwG--GZEfw/maxresdefault.jpg',
    icon: FlaskConical,
    iconColor: 'bg-teal-500',
    materials: [
      '5-7 ly nhựa trong suốt',
      'Khăn giấy ăn loại dai',
      'Màu thực phẩm (đỏ, vàng, xanh...)',
      'Nước lọc',
    ],
    steps: [
      'Xếp hàng ly: Xếp 5 chiếc ly nhựa thành một hàng ngang sát nhau.',
      'Đổ nước xen kẽ: Rót nước vào ly 1, 3, 5 (khoảng 2/3 ly). Giữ ly 2 và 4 hoàn toàn trống.',
      'Pha màu: Nhỏ vài giọt màu thực phẩm vào 3 ly có nước rồi khuấy đều.',
      'Làm cầu dải giấy: Gấp khăn giấy thành dải dài hình chữ U ngược, bắc từ ly có nước sang ly trống.',
      'Quan sát: Nước màu tự "bò" qua dải giấy, chảy dần sang ly trống và hòa trộn thành màu mới!',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=hGwG--GZEfw',
    videoQuery: 'thí nghiệm nước đi bộ bắc cầu màu sắc',
  },
  {
    icon: Box,
    title: 'Đồ chơi từ hộp giấy',
    level: 'medium' as Level,
    steps: [
      'Chọn hộp giấy sạch, quyết định làm gì: ô tô, nhà nhỏ hay robot.',
      'Ba mẹ cắt các chi tiết khó (cửa, bánh xe); con phụ dán và ghép.',
      'Phủ giấy màu hoặc sơn lên thân hộp, chờ khô.',
      'Vẽ chi tiết, đặt tên và chơi cùng con.',
    ],
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
    steps: [
      'Cho đất vào chậu, khoảng 3/4 chậu.',
      'Con tự tay gieo hạt và lấp một lớp đất mỏng.',
      'Tưới nước nhẹ và đặt chậu nơi có nắng.',
      'Trang trí chậu bằng sỏi; cùng con tưới và ghi lại sự phát triển mỗi ngày.',
    ],
    videoUrl: '',
    videoQuery: 'trồng cây mini trong chậu cho bé',
    desc: 'Cùng con trồng một chậu cây nhỏ, trang trí chậu và học cách chăm sóc cây mỗi ngày.',
    materials: ['Chậu nhỏ', 'Đất trồng', 'Hạt giống', 'Sỏi trang trí'],
    duration: '30 phút + chăm sóc',
    age: '4-10 tuổi',
    image: 'https://images.pexels.com/photos/23224895/pexels-photo-23224895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Star,
    title: 'Làm vòng tay friendship',
    level: 'hard' as Level,
    steps: [
      'Cắt 6 sợi chỉ dài khoảng 50 cm, buộc nút và dán đầu chỉ lên bàn.',
      'Xếp thứ tự màu như ý muốn.',
      'Đan theo kiểu nút thắt xoắn hoặc bện ba, kiên nhẫn từng hàng.',
      'Đủ độ dài quanh cổ tay thì buộc nút chắc chắn và cắt chỉ thừa.',
    ],
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
    steps: [
      'Đi dạo, cùng con nhặt lá, hoa, cành nhỏ (không hái hoa nơi công cộng).',
      'Ép lá, hoa trong sách nặng 1-2 ngày cho phẳng.',
      'Sắp bố cục lên giấy khung trước khi dán.',
      'Dán bằng keo mỏng, để khô rồi đóng khung treo tường.',
    ],
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
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero với ảnh nền DIY.png */}
      <section className="relative w-full overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/DIY.png"
            alt="Smart Play Guide - DIY Hoạt động cùng bé"
            className="w-full h-full object-cover object-right-bottom"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 text-teal-700 border border-teal-200/60 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm backdrop-blur-sm">
              <Palette className="w-4 h-4 text-teal-600" />
              Hoạt động cùng bé
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 leading-[1.15] mb-6 tracking-tight">
              DIY — Sáng tạo cùng con mỗi ngày
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium">
              Chẳng cần đồ chơi đắt tiền, chỉ cần ba mẹ cùng con tham gia vào "xưởng đồ chơi ký ức" cùng niềm vui vô ngần vậy là đủ!
            </p>
          </div>
        </div>
      </section>

      {/* Activities by level */}
      <section className="py-16 bg-white relative z-10 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {levels.map((lv) => (
            <div key={lv.id}>
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${lv.color}`}>Trò {lv.label}</span>
                <p className="text-sm text-neutral-500">{lv.note}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities
                  .filter((a) => a.level === lv.id)
                  .map((act) => (
                    <button
                      key={act.title}
                      onClick={() => setOpen(act)}
                      className="group text-left bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-neutral-100"
                    >
                      <div className="aspect-[3/2] overflow-hidden relative">
                        <img
                          src={act.image}
                          alt={act.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
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

      {/* Modal chi tiết */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  {open.duration} · {open.age}
                </p>
                <h2 className="text-2xl font-bold text-neutral-800 mt-1">{open.title}</h2>
              </div>
              <button
                onClick={() => setOpen(null)}
                className="p-2 rounded-xl hover:bg-neutral-100"
                aria-label="Đóng"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-neutral-600 leading-relaxed mb-6">{open.desc}</p>
              
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Dụng cụ cần chuẩn bị
              </p>
              <div className="flex flex-wrap gap-1.5 mb-7">
                {open.materials.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1 text-xs bg-stone-100 text-neutral-600 px-2.5 py-1 rounded-md"
                  >
                    <CheckCircle className="w-3 h-3 text-teal-500" />
                    {m}
                  </span>
                ))}
              </div>

              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Các bước thực hiện
              </p>
              <ol className="space-y-3 mb-8">
                {open.steps.map((st, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-neutral-700 leading-relaxed pt-1">{st}</p>
                  </li>
                ))}
              </ol>

              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Video hướng dẫn
              </p>
              {toEmbed(open.videoUrl) ? (
                <div className="aspect-video rounded-2xl overflow-hidden bg-neutral-100">
                  <iframe
                    className="w-full h-full"
                    src={toEmbed(open.videoUrl)}
                    title={open.title}
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                    open.videoQuery || open.title
                  )}`}
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
          <Link
            to="/challenge"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 hover:-translate-y-0.5"
          >
            Tham gia Challenge 14 ngày
          </Link>
        </div>
      </section>
    </div>
  );
}
