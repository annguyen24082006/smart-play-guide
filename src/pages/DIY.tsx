import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  PlayCircle,
  ExternalLink,
  ArrowRight,
  Palette,
  Scissors,
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
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : '';
};

const activities: Activity[] = [
  // ==================== TRÒ DỄ (6 HOẠT ĐỘNG) ====================
  {
    id: 'tranh-binh-hoa-that',
    category: 'Thủ công & Sáng tạo',
    level: 'easy',
    duration: '15 - 20 phút',
    age: '3-10 tuổi',
    title: 'Làm tranh bình hoa bằng hoa thật',
    description: 'Tận dụng bìa carton và những bông hoa dại, lá cây tươi để tạo nên bức tranh thiên nhiên rực rỡ sắc màu.',
    desc: 'Tận dụng bìa carton và những bông hoa dại, lá cây tươi để tạo nên bức tranh thiên nhiên rực rỡ sắc màu.',
    image: 'https://img.youtube.com/vi/Y0HrZ31eRzE/hqdefault.jpg',
    icon: Flower2,
    iconColor: 'bg-rose-500',
    materials: [
      'Bìa carton (bìa cứng)',
      'Bút dạ / Bút lông đen (để vẽ nét)',
      'Dao rọc giấy',
      'Băng dính / Băng keo trong bản to (Băng keo dán thùng)',
      'Các loại hoa dại & lá cây tươi (như hoa xuyến chi, hoa ngũ sắc/trâm ổi...)',
    ],
    steps: [
      'Vẽ khung và thân cây: Dùng bút dạ đen vẽ một ô khung hình vuông/chữ nhật lên tấm bìa carton, ở giữa vẽ hình một thân cây với các cành chẻ ra.',
      'Cắt tạo khung rỗng: Dùng dao rọc giấy cắt bỏ phần nền giấy carton xung quanh thân cây, chỉ giữ lại phần viền khung bên ngoài và hình thân cây nối liền ở giữa.',
      'Tạo lớp nền dính: Dán các dải băng keo trong bản to phủ kín toàn bộ khoảng trống của khung hình (dán từ mặt sau để mặt dính hướng ra phía trước).',
      'Trang trí tán cây bằng hoa tươi: Hái các bông hoa dại nhỏ và lá cây tươi, sau đó đính trực tiếp lên lớp băng keo dính ở phần cành cây để tạo thành tán lá/hoa nở rộ rực rỡ. Bạn cũng có thể dán thêm hoa và lá ở dưới gốc cây để làm thảm cỏ.',
    ],
    videoUrl: 'https://youtube.com/shorts/Y0HrZ31eRzE?si=xt95rYi7S9BhX9pr',
  },
  {
    id: 'vuong-quoc-con-trung-la-kho',
    category: 'Thủ công & Sáng tạo',
    level: 'easy',
    duration: '15 - 25 phút',
    age: '4-10 tuổi',
    title: 'Biến những chiếc lá khô thành cả một "Vương quốc côn trùng"',
    description: 'Sáng tạo thế giới côn trùng ngộ nghĩnh từ những chiếc lá cây với đủ hình dáng và màu sắc khác nhau.',
    desc: 'Sáng tạo thế giới côn trùng ngộ nghĩnh từ những chiếc lá cây với đủ hình dáng và màu sắc khác nhau.',
    image: 'https://img.youtube.com/vi/OrZtXms0i2E/hqdefault.jpg',
    icon: Palette,
    iconColor: 'bg-emerald-500',
    materials: [
      'Giấy trắng (hoặc bìa carton)',
      'Lá cây hình dáng và kích thước khác nhau',
      'Keo dán hoặc băng keo',
      'Bút màu / Bút dạ đen / Bút sơn',
    ],
    steps: [
      'Bước 1 - Thu thập lá cây: Tìm và chọn các loại lá cây có hình dáng phù hợp với các loại côn trùng (ví dụ: lá dài làm thân con bọ/gián, lá ngân hạnh xòe đôi làm cánh bươm bướm, lá tròn làm bọ dừa...).',
      'Bước 2 - Cố định lá lên giấy: Dùng keo dán hoặc băng keo dán các chiếc lá lên vị trí mong muốn trên tờ giấy trắng.',
      'Bước 3 - Vẽ đầu và chân côn trùng: Dùng bút kim/bút dạ đen vẽ thêm các chi tiết như đầu, râu (mắt) và các cặp chân xung quanh mép lá để biến chiếc lá thành hình dáng con côn trùng hoàn chỉnh.',
      'Bước 4 - Trang trí hoa văn (tùy chọn): Dùng bút dạ màu/bút sơn vẽ thêm các đường nét, chấm đốm rực rỡ lên mặt lá (đặc biệt là các lá làm cánh bướm) để bức tranh thêm phần sinh động và nhiều màu sắc.',
    ],
    videoUrl: 'https://youtube.com/shorts/OrZtXms0i2E?si=pehlnk0xCVI36jO6',
  },
  {
    id: 'nuoc-di-bo-bac-cau-mau-sac',
    category: 'Khoa học & Trò chơi',
    level: 'easy',
    duration: '5 - 10 phút',
    age: '3-10 tuổi',
    title: 'Nước Đi Bộ Bắc Cầu Màu Sắc',
    description: 'Thí nghiệm khoa học thú vị giúp bé quan sát hiện tượng nước màu tự "bò" qua dải khăn giấy và pha trộn màu sắc!',
    desc: 'Thí nghiệm khoa học thú vị giúp bé quan sát hiện tượng nước màu tự "bò" qua dải khăn giấy và pha trộn màu sắc!',
    image: 'https://img.youtube.com/vi/hGwG--GZEfw/hqdefault.jpg',
    icon: FlaskConical,
    iconColor: 'bg-teal-500',
    materials: [
      '5 hoặc 7 chiếc ly nhựa/thủy tinh trong suốt',
      'Khăn giấy ăn loại dai',
      'Màu thực phẩm (đỏ, vàng, xanh dương...)',
      'Nước lọc',
    ],
    steps: [
      'Xếp hàng ly: Xếp 5 chiếc ly nhựa thành một hàng ngang sát nhau.',
      'Đổ nước xen kẽ: Rót nước vào ly số 1, ly số 3 và ly số 5 (khoảng 2/3 ly). Giữ ly số 2 và ly số 4 hoàn toàn trống.',
      'Pha màu: Nhỏ vài giọt màu thực phẩm vào 3 ly có nước (ví dụ: ly 1 màu đỏ, ly 3 màu vàng, ly 5 màu xanh dương) rồi khuấy đều.',
      'Làm cầu dải giấy: Gấp khăn giấy thành dải dài, uốn hình chữ U ngược. Bắc một đầu dải giấy vào ly có nước, đầu kia thả vào ly trống bên cạnh.',
      'Quan sát phép màu: Nước màu sẽ tự động "bò" ngược lên dải khăn giấy, chảy dần sang ly trống và hòa trộn thành các màu mới rực rỡ!',
    ],
    videoUrl: 'https://youtube.com/watch?v=hGwG--GZEfw&feature=shared',
  },
  {
    id: 'lam-cai-non-bang-giay',
    category: 'Thủ công & Trò chơi',
    level: 'easy',
    duration: '20 - 30 phút',
    age: '4-10 tuổi',
    title: 'Làm cái nón bằng giấy',
    description: 'Cùng bé tự tay cắt dán và trang trí chiếc nón lá Việt Nam xinh xắn từ giấy bìa màu.',
    desc: 'Cùng bé tự tay cắt dán và trang trí chiếc nón lá Việt Nam xinh xắn từ giấy bìa màu.',
    image: 'https://img.youtube.com/vi/QkeIaEARFsc/hqdefault.jpg',
    icon: Star,
    iconColor: 'bg-amber-500',
    materials: [
      'Giấy thủ công / Giấy bìa màu / Giấy A4/A3 (chọn loại giấy bìa cứng vừa phải để nón đứng dáng)',
      'Compa (hoặc 1 chiếc đĩa tròn, chậu tròn) để vẽ hình tròn',
      'Kéo cắt giấy (loại kéo an toàn cho bé)',
      'Thước kẻ, bút chì',
      'Keo dán / Keo sữa / Băng dính 2 mặt (hoặc súng bắn keo nến do người lớn hỗ trợ)',
      'Dây ruy-băng / Dây len / Dây vải mềm (dùng làm quai đeo nón)',
      'Đồ trang trí: Bút màu, màu nước, hình dán (sticker), hoặc giấy màu cắt nhỏ (hình cờ đỏ sao vàng, hoa lá, chữ...)',
    ],
    steps: [
      'Bước 1 - Tạo phôi nón hình tròn: Dùng compa (hoặc đĩa tròn) vẽ một hình tròn lớn lên tờ giấy bìa. Kích thước tham khảo: Đường kính khoảng 25–30 cm (cho nón đội vừa đầu bé) hoặc 15–20 cm (nếu làm nón mini trang trí). Dùng kéo cắt rời hình tròn ra khỏi tờ giấy.',
      'Bước 2 - Vẽ đường gân nón (Tạo hiệu ứng nón lá thật): Xác định vị trí tâm hình tròn. Dùng thước kẻ và bút chì/bút màu vẽ các đường thẳng từ tâm tỏa ra viền ngoài (giống như nan tre trên nón lá thật). (Tùy chọn) Dùng thước gấp nhẹ theo các đường gân để tạo nếp gấp gợn sóng sinh động.',
      'Bước 3 - Tạo hình chóp nón lá: Dùng kéo cắt một đường thẳng từ mép viền ngoài vào đúng tâm hình tròn (cắt theo bán kính). Cuộn 2 mép giấy vừa cắt chồng lên nhau để tạo thành dáng hình chóp nón (chồng mép giấy nhiều hay ít sẽ quyết định độ sâu và độ xòe rộng của chiếc nón lá). Khi đã canh chỉnh được dáng nón ưng ý, dùng keo dán hoặc băng dính 2 mặt dính chặt mép giấy lại để cố định.',
      'Bước 4 - Gắn quai nón: Dùng đục lỗ (hoặc đầu kéo) đục 2 lỗ nhỏ đối diện nhau ở sát mép vành trong nón. Cắt một đoạn dây ruy-băng/dây len (khoảng 40–50 cm). Luồn hai đầu dây qua 2 lỗ từ trong ra ngoài (hoặc từ ngoài vào trong) và thắt nút cố định ở mặt trong nón để dây không bị tuột.',
      'Bước 5 - Trang trí hoàn thiện: Hướng dẫn bé dùng bút màu vẽ hoa lá, cảnh quê hương, hoặc cắt dán hình cờ đỏ sao vàng lên mặt ngoài chiếc nón. Điều chỉnh lại quai nón cho vừa vặn với cằm của bé là hoàn thành!',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=QkeIaEARFsc',
  },
  {
    id: 'lam-long-den-giay',
    category: 'Thủ công & Trò chơi',
    level: 'easy',
    duration: '20 - 30 phút',
    age: '6-10 tuổi',
    title: 'Làm lồng đèn',
    description: 'Tự tay làm chiếc lồng đèn giấy xòe xinh xắn có đèn LED lung linh (cần người lớn hỗ trợ nếu dùng kéo và súng bắn keo).',
    desc: 'Tự tay làm chiếc lồng đèn giấy xòe xinh xắn có đèn LED lung linh (cần người lớn hỗ trợ nếu dùng kéo và súng bắn keo).',
    image: 'https://img.youtube.com/vi/cLbi6_xFcic/hqdefault.jpg',
    icon: Sparkles,
    iconColor: 'bg-rose-500',
    materials: [
      'Giấy màu (1 tờ màu đỏ 16cm x 28cm, 1 tờ màu vàng 13cm x 29.7cm)',
      'Giấy trang trí (hình ngôi sao nhỏ, dải quai xách) và dây tua rua',
      'Ống hút nhựa',
      'Đèn LED nhỏ',
      'Băng keo 2 mặt và keo dán / súng bắn keo',
      'Kéo cắt, thước kẻ, bút chì',
    ],
    steps: [
      'Làm vỏ ngoài: Dán băng keo 2 mặt dọc hai mép chiều dài của tờ giấy đỏ, gấp đôi lại, kẻ các đường song song cách nhau 1cm rồi dùng kéo cắt dọc theo nét kẻ (không cắt đứt mép băng keo).',
      'Tạo hình lồng đèn: Mở tờ giấy đỏ, bẻ gập ngược nếp cắt để tạo độ xòe. Bóc lớp băng keo 2 mặt dán cố định vào hai mép trên/dưới của tờ giấy vàng rồi cuộn tròn thành hình trụ.',
      'Làm giá đỡ đèn: Cắt các đoạn ống hút nhựa bằng đường kính đáy lồng đèn, dùng keo dán xếp song song bên trong đáy để tạo giá đỡ.',
      'Trang trí & hoàn thiện: Dán viền vành trên/dưới, dán các ngôi sao nhỏ lên thân lồng đèn, gắn dây tua rua bên dưới, thêm quai xách và đặt đèn LED vào giá đỡ bên trong.',
    ],
    videoUrl: 'https://www.youtube.com/watch?si=t52brZSyiawLuZDC&v=cLbi6_xFcic&feature=youtu.be',
  },
  {
    id: 'ban-bi-lac-carton',
    category: 'Thủ công & Trò chơi',
    level: 'easy',
    duration: '30 - 45 phút',
    age: '7-12 tuổi',
    title: 'Làm bàn bi lắc từ hộp Carton',
    description: 'Biến chiếc hộp giấy cũ thành bàn bi lắc mini cực kỳ thú vị (cần người lớn hỗ trợ bước cắt rọc thùng bằng dao rọc giấy).',
    desc: 'Biến chiếc hộp giấy cũ thành bàn bi lắc mini cực kỳ thú vị (cần người lớn hỗ trợ bước cắt rọc thùng bằng dao rọc giấy).',
    image: 'https://img.youtube.com/vi/ZxdbvNSNTr4/hqdefault.jpg',
    icon: Scissors,
    iconColor: 'bg-amber-500',
    materials: [
      'Hộp giấy carton (khoảng 30cm x 20cm)',
      '6 que gỗ tròn (dài khoảng 35cm)',
      '12 kẹp gỗ treo quần áo',
      'Giấy gói quà & băng keo màu trang trí',
      'Keo sữa',
      'Dao rọc giấy, kéo',
      'Thước kẻ, bút marker',
      '1 viên bóng nhựa/xốp nhỏ hoặc viên bi',
    ],
    steps: [
      'Đo và đục lỗ: Đo và đánh dấu các điểm đối xứng trên 2 cạnh dài của hộp (mỗi bên 6 lỗ), dùng dao rọc giấy khoét lỗ tròn để xỏ que.',
      'Cắt khung thành: Vẽ hình chữ nhật gôn bóng (12cm x 7cm) ở 2 cạnh ngắn của hộp rồi dùng dao rọc giấy cắt trống.',
      'Trang trí khung: Bôi keo sữa bọc giấy gói quà xung quanh thành hộp.',
      'Làm tay xoay: Quấn băng keo màu trang trí quanh 6 que gỗ rồi xỏ xuyên qua các lỗ đã đục trên thùng.',
      'Gắn cầu thủ & hoàn thiện: Kẹp các kẹp gỗ vào các que làm cầu thủ sau đó thả bóng vào bàn bi lắc để bắt đầu chơi.',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=ZxdbvNSNTr4',
  },

  // ==================== TRÒ KHÁ ====================
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

  // ==================== TRÒ KHÓ ====================
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
            <div className="sticky top-0 z-10 bg-white border-b border-neutral-100 px-6 py-5 flex items-center justify-between">
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

              {/* Dụng cụ cần chuẩn bị */}
              {open.materials && open.materials.length > 0 && (
                <>
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Dụng cụ cần chuẩn bị
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {open.materials.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center gap-1.5 text-xs bg-stone-100 text-neutral-700 px-3 py-1.5 rounded-lg"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        {m}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Các bước thực hiện */}
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
