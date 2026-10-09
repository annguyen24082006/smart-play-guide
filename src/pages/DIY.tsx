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

interface Bullet {
  text: string;
  label?: string;
}

interface StepItem {
  label: string;
  text: string;
}

interface Group {
  title?: string;
  steps: StepItem[];
}

interface Section {
  heading: string;
  intro?: string;
  bullets?: Bullet[];
  groups?: Group[];
}

interface VideoItem {
  id: string;
  title: string;
}

interface Activity {
  id?: string;
  category?: string;
  level: Level;
  duration: string;
  age: string;
  title: string;
  description: string;
  desc?: string;
  image: string;
  icon: any;
  iconColor?: string;
  steps?: string[];
  materials?: string[];
  sections?: Section[];
  note?: string;
  videos?: VideoItem[];
  videoUrl?: string;
  videoQuery?: string;
}

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

const activities: Activity[] = [
  {
    id: 'ban-bi-lac-carton',
    category: 'Thủ công & Trò chơi',
    level: 'easy',
    duration: '30 - 45 phút',
    age: '7-12 tuổi',
    title: 'Tự làm bàn bi lắc từ hộp carton',
    description: 'Biến chiếc hộp giấy cũ thành bàn bi lắc mini cực kỳ thú vị, giúp bé rèn luyện phản xạ và có những giờ phút giải trí sôi động cùng gia đình!',
    desc: 'Biến chiếc hộp giấy cũ thành bàn bi lắc mini cực kỳ thú vị, giúp bé rèn luyện phản xạ và có những giờ phút giải trí sôi động cùng gia đình!',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800',
    icon: Scissors,
    iconColor: 'bg-amber-500',
    steps: [],
    sections: [
      {
        heading: 'Chuẩn bị dụng cụ trước khi bắt đầu',
        intro: 'Để làm được chiếc bàn bi lắc thật đẹp và chắc chắn, ba mẹ và bé hãy chuẩn bị đầy đủ các vật liệu đơn giản dưới đây nhé:',
        bullets: [
          { text: 'Hộp giấy carton (kích thước khoảng 30cm x 20cm)' },
          { text: '6 que gỗ tròn (dài khoảng 35cm)' },
          { text: '12 kẹp gỗ treo quần áo (dùng làm các cầu thủ)' },
          { text: 'Giấy gói quà & băng keo màu trang trí' },
          { text: 'Keo sữa hoặc súng bắn keo' },
          { text: 'Dao rọc giấy, kéo' },
          { text: 'Thước kẻ, bút marker' },
          { text: '1 viên bóng nhựa/xốp nhỏ hoặc viên bi' },
          { label: 'Lưu ý an toàn', text: 'Vì có sử dụng dao rọc giấy và kéo sắc nhọn, ba mẹ nên trực tiếp thực hiện hoặc hỗ trợ bé ở các bước cắt rọc.' },
        ],
      },
      {
        heading: 'Các bước thực hiện chi tiết',
        groups: [
          {
            title: '✂️ Quy trình 5 bước tạo bàn bi lắc độc đáo:',
            steps: [
              { label: 'Bước 1: Đo và đục lỗ', text: 'Đo và đánh dấu các điểm đối xứng trên 2 cạnh dài của hộp carton (mỗi bên 6 lỗ). Dùng dao rọc giấy cẩn thận khoét các lỗ tròn vừa vặn để xỏ que gỗ qua.' },
              { label: 'Bước 2: Cắt khung thành', text: 'Vẽ hình chữ nhật làm gôn bóng (kích thước 12cm x 7cm) ở chính giữa 2 cạnh ngắn của hộp, sau đó dùng dao rọc giấy cắt trống khung.' },
              { label: 'Bước 3: Trang trí khung bàn', text: 'Bôi keo sữa và dán giấy gói quà bọc xung quanh toàn bộ thành hộp để bàn bi lắc nhìn rực rỡ và bắt mắt hơn.' },
              { label: 'Bước 4: Làm tay xoay', text: 'Quấn băng keo màu trang trí quanh 6 que gỗ tròn, sau đó xỏ xuyên qua các lỗ đã đục trên thành thùng carton.' },
              { label: 'Bước 5: Gắn cầu thủ & Hoàn thiện', text: 'Kẹp các kẹp gỗ vào các que làm cầu thủ (có thể vẽ thêm mặt/áo đấu cho cầu thủ), sau đó thả bóng vào bàn bi lắc và bắt đầu trận đấu ngay thôi!' },
            ],
          },
        ],
      },
      {
        heading: 'Độ tuổi & Mức độ phù hợp',
        intro: 'Hoạt động thuộc Trò Dễ, khởi động nhẹ nhàng, hoàn toàn có thể làm xong nhanh chóng. Phù hợp cho trẻ từ 7–12 tuổi (cần người lớn hỗ trợ bước cắt rọc thùng bằng dao rọc giấy).',
        bullets: [
          { label: 'Gợi ý mở rộng', text: 'Ba mẹ và bé có thể chia kẹp gỗ thành 2 màu sơn khác nhau để phân biệt 2 đội bóng, giúp trận đấu thêm phần kịch tính!' },
        ],
      },
    ],
    note: 'Ba mẹ hãy luôn đồng hành và quan sát bé khi sử dụng dao rọc giấy hoặc kéo sắc nhé.',
    videos: [
      { id: 'ZxdbvNSNTr4', title: 'Hướng dẫn tự làm bàn bi lắc bằng hộp carton đơn giản tại nhà' },
    ],
  },
  {
    id: 'lam-long-den-giay',
    category: 'Thủ công & Trò chơi',
    level: 'easy',
    duration: '20 - 30 phút',
    age: '6-10 tuổi',
    title: 'Cách làm lồng đèn Trung thu bằng giấy A4',
    description: 'Tự tay làm chiếc lồng đèn giấy xòe xinh xắn có đèn LED lung linh!',
    desc: 'Tự tay làm chiếc lồng đèn giấy xòe xinh xắn có đèn LED lung linh!',
    image: 'https://img.youtube.com/vi/cLbi6_xFcic/hqdefault.jpg',
    icon: Sparkles,
    iconColor: 'bg-rose-500',
    steps: [],
    sections: [
      {
        heading: 'Chuẩn bị dụng cụ trước khi bắt đầu',
        intro: 'Để làm chiếc lồng đèn giấy rực rỡ, ba mẹ và bé hãy chuẩn bị các nguyên liệu đơn giản sau:',
        bullets: [
          { text: 'Giấy màu (1 tờ màu đỏ 16cm x 28cm, 1 tờ màu vàng 13cm x 29.7cm)' },
          { text: 'Giấy trang trí (ngôi sao nhỏ, dải quai xách) & dây tua rua' },
          { text: 'Ống hút nhựa' },
          { text: 'Đèn LED nhỏ' },
          { text: 'Băng keo 2 mặt, keo dán / súng bắn keo' },
          { text: 'Kéo cắt, thước kẻ, bút chì' },
          { label: 'Lưu ý an toàn', text: 'Cần người lớn hỗ trợ hoặc quan sát khi bé dùng kéo cắt và súng bắn keo.' },
        ],
      },
      {
        heading: 'Các bước thực hiện chi tiết',
        groups: [
          {
            title: '🏮 Quy trình 4 bước tạo lồng đèn lung linh:',
            steps: [
              { label: 'Bước 1: Làm vỏ ngoài', text: 'Dán băng keo 2 mặt dọc hai mép chiều dài của tờ giấy đỏ, gấp đôi lại, kẻ các đường song song cách nhau 1cm rồi dùng kéo cắt dọc theo nét kẻ (không cắt đứt mép băng keo).' },
              { label: 'Bước 2: Tạo hình lồng đèn', text: 'Mở tờ giấy đỏ, bẻ gập ngược nếp cắt để tạo độ xòe. Bóc lớp băng keo 2 mặt dán cố định vào hai mép trên/dưới của tờ giấy vàng rồi cuộn tròn thành hình trụ.' },
              { label: 'Bước 3: Làm giá đỡ đèn', text: 'Cắt các đoạn ống hút nhựa bằng đường kính đáy lồng đèn, dùng keo dán xếp song song bên trong đáy để tạo giá đỡ.' },
              { label: 'Bước 4: Trang trí & hoàn thiện', text: 'Dán viền vành trên/dưới, dán các ngôi sao nhỏ lên thân lồng đèn, gắn dây tua rua bên dưới, thêm quai xách và đặt đèn LED vào giá đỡ bên trong.' },
            ],
          },
        ],
      },
      {
        heading: 'Độ tuổi & Mức độ phù hợp',
        intro: 'Hoạt động thuộc Trò Dễ, khởi động nhẹ nhàng, hoàn toàn có thể làm xong nhanh chóng. Phù hợp cho trẻ từ 6–10 tuổi.',
      },
    ],
    note: 'Nên cẩn thận khi dùng keo nến/súng bắn keo nóng cùng trẻ.',
    videos: [
      { id: 'cLbi6_xFcic', title: 'Cách Làm Lồng Đèn Trung Thu Bằng Giấy A4 Đơn Giản' },
    ],
  },
  {
    id: 'nuoc-di-bo-bac-cau-mau-sac',
    category: 'Khoa học & Trò chơi',
    level: 'easy',
    duration: '15 - 20 phút',
    age: '3-10 tuổi',
    title: 'Nước đi bộ bắc cầu màu sắc',
    description: 'Thí nghiệm khoa học huyền bí giúp bé quan sát hiện tượng mao dẫn cực kỳ thú vị khi nước màu tự "bò" qua dải giấy!',
    desc: 'Thí nghiệm khoa học huyền bí giúp bé quan sát hiện tượng mao dẫn cực kỳ thú vị khi nước màu tự "bò" qua dải giấy!',
    image: 'https://img.youtube.com/vi/hGwG--GZEfw/hqdefault.jpg',
    icon: FlaskConical,
    iconColor: 'bg-teal-500',
    steps: [],
    sections: [
      {
        heading: 'Chuẩn bị dụng cụ trước khi bắt đầu',
        intro: 'Dụng cụ thí nghiệm rất đơn giản và dễ tìm ngay trong căn bếp nhà mình:',
        bullets: [
          { text: '5 hoặc 7 chiếc ly nhựa/thủy tinh trong suốt' },
          { text: 'Khăn giấy ăn loại dai' },
          { text: 'Màu thực phẩm (đỏ, vàng, xanh dương...)' },
          { text: 'Nước lọc' },
        ],
      },
      {
        heading: 'Các bước thực hiện chi tiết',
        groups: [
          {
            title: '🧪 Quy trình 5 bước thực hiện thí nghiệm:',
            steps: [
              { label: 'Bước 1: Xếp hàng ly', text: 'Xếp 5 chiếc ly nhựa thành một hàng ngang sát nhau.' },
              { label: 'Bước 2: Đổ nước xen kẽ', text: 'Rót nước vào ly số 1, ly số 3 và ly số 5 (khoảng 2/3 ly). Giữ ly số 2 và ly số 4 hoàn toàn trống.' },
              { label: 'Bước 3: Pha màu sắc', text: 'Nhỏ vài giọt màu thực phẩm vào 3 ly có nước (ví dụ: ly 1 màu đỏ, ly 3 màu vàng, ly 5 màu xanh dương) rồi khuấy đều.' },
              { label: 'Bước 4: Làm cầu dải giấy', text: 'Gấp khăn giấy thành dải dài, uốn hình chữ U ngược. Bắc một đầu dải giấy vào ly có nước, đầu kia thả vào ly trống bên cạnh.' },
              { label: 'Bước 5: Quan sát phép màu', text: 'Nước màu sẽ tự động "bò" ngược lên dải khăn giấy nhờ hiện tượng mao dẫn, chảy dần sang ly trống và hòa trộn thành các màu mới rực rỡ!' },
            ],
          },
        ],
      },
      {
        heading: 'Độ tuổi & Mức độ phù hợp',
        intro: 'Hoạt động thuộc Trò Dễ, cực kỳ nhẹ nhàng và an toàn, bé có thể tự làm dưới sự quan sát của ba mẹ. Phù hợp cho trẻ từ 3–10 tuổi.',
      },
    ],
    note: 'Ba mẹ có thể cùng bé kiên nhẫn chờ từ 30-60 phút để xem màu sắc pha trộn hoàn toàn trong các ly trống.',
    videos: [
      { id: 'hGwG--GZEfw', title: 'Thí nghiệm khoa học Nước đi bộ bắc cầu màu sắc cho bé' },
    ],
  },
  {
    icon: Box,
    title: 'Đồ chơi từ hộp giấy',
    level: 'medium',
    steps: [
      'Chọn hộp giấy sạch, quyết định làm gì: ô tô, nhà nhỏ hay robot.',
      'Ba mẹ cắt các chi tiết khó (cửa, bánh xe); con phụ dán và ghép.',
      'Phủ giấy màu hoặc sơn lên thân hộp, chờ khô.',
      'Vẽ chi tiết, đặt tên và chơi cùng con.',
    ],
    videoUrl: '',
    videoQuery: 'làm đồ chơi từ hộp giấy carton cho bé',
    description: 'Biến hộp giấy cũ thành ô tô, nhà nhỏ, hoặc robot. Sáng tạo không giới hạn!',
    desc: 'Biến hộp giấy cũ thành ô tô, nhà nhỏ, hoặc robot. Sáng tạo không giới hạn!',
    materials: ['Hộp giấy', 'Keo dán', 'Màu vẽ', 'Bút chì'],
    duration: '40-60 phút',
    age: '5-12 tuổi',
    image: 'https://images.pexels.com/photos/8033894/pexels-photo-8033894.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Flower2,
    title: 'Trồng cây mini',
    level: 'medium',
    steps: [
      'Cho đất vào chậu, khoảng 3/4 chậu.',
      'Con tự tay gieo hạt và lấp một lớp đất mỏng.',
      'Tưới nước nhẹ và đặt chậu nơi có nắng.',
      'Trang trí chậu bằng sỏi; cùng con tưới và ghi lại sự phát triển mỗi ngày.',
    ],
    videoUrl: '',
    videoQuery: 'trồng cây mini trong chậu cho bé',
    description: 'Cùng con trồng một chậu cây nhỏ, trang trí chậu và học cách chăm sóc cây mỗi ngày.',
    desc: 'Cùng con trồng một chậu cây nhỏ, trang trí chậu và học cách chăm sóc cây mỗi ngày.',
    materials: ['Chậu nhỏ', 'Đất trồng', 'Hạt giống', 'Sỏi trang trí'],
    duration: '30 phút + chăm sóc hàng ngày',
    age: '4-10 tuổi',
    image: 'https://images.pexels.com/photos/23224895/pexels-photo-23224895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Star,
    title: 'Làm vòng tay friendship',
    level: 'hard',
    steps: [
      'Cắt 6 sợi chỉ dài khoảng 50 cm, buộc nút và dán đầu chỉ lên bàn.',
      'Xếp thứ tự màu như ý muốn.',
      'Đan theo kiểu nút thắt xoắn hoặc bện ba, kiên nhẫn từng hàng.',
      'Đủ độ dài quanh cổ tay thì buộc nút chắc chắn và cắt chỉ thừa.',
    ],
    videoUrl: '',
    videoQuery: 'làm vòng tay friendship đan chỉ',
    description: 'Đan vòng tay bằng chỉ màu — hoạt động rèn luyện khéo tay và sự kiên nhẫn.',
    desc: 'Đan vòng tay bằng chỉ màu — hoạt động rèn luyện khéo tay và sự kiên nhẫn.',
    materials: ['Chỉ thêu nhiều màu', 'Kéo', 'Băng keo'],
    duration: '20-30 phút',
    age: '6-12 tuổi',
    image: 'https://images.pexels.com/photos/23224902/pexels-photo-23224902.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Palette,
    title: 'Tranh đóng khung tự nhiên',
    level: 'hard',
    steps: [
      'Đi dạo, cùng con nhặt lá, hoa, cành nhỏ (không hái hoa nơi công cộng).',
      'Ép lá, hoa trong sách nặng 1-2 ngày cho phẳng.',
      'Sắp bố cục lên giấy khung trước khi dán.',
      'Dán bằng keo mỏng, để khô rồi đóng khung treo tường.',
    ],
    videoUrl: '',
    videoQuery: 'làm tranh lá cây khô ép hoa cho bé',
    description: 'Đi dạo ngoài công viên, nhặt lá cây, hoa khô rồi dán thành bức tranh tự nhiên.',
    desc: 'Đi dạo ngoài công viên, nhặt lá cây, hoa khô rồi dán thành bức tranh tự nhiên.',
    materials: ['Lá cây, hoa khô', 'Giấy khung', 'Keo dán', 'Bút chì'],
    duration: '45-60 phút',
    age: '4-10 tuổi',
    image: 'https://images.pexels.com/photos/8033898/pexels-photo-8033898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export default function DIY() {
  const [open, setOpen] = useState<Activity | null>(null);

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
              Chẳng cần đồ chơi đắt tiền, chỉ cần ba mẹ cùng con tham gia vào "xưởng đồ chơi ký ức" cùng niềm vui
              vô ngần vậy là đủ!
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
                        <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                          {act.desc || act.description}
                        </p>
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
              <p className="text-neutral-600 leading-relaxed mb-6">{open.desc || open.description}</p>

              {open.materials && open.materials.length > 0 && (
                <>
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
                </>
              )}

              {open.steps && open.steps.length > 0 && (
                <>
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
                </>
              )}

              {/* Video Hướng Dẫn */}
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Video hướng dẫn</p>
              {open.videoUrl && toEmbed(open.videoUrl) ? (
                <div className="aspect-video rounded-2xl overflow-hidden bg-neutral-100">
                  <iframe
                    className="w-full h-full"
                    src={toEmbed(open.videoUrl)}
                    title={open.title}
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : open.videos && open.videos[0] ? (
                <div className="aspect-video rounded-2xl overflow-hidden bg-neutral-100">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${open.videos[0].id}`}
                    title={open.videos[0].title}
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
