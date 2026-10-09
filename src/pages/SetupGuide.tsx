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
import screenTimeCardImg from './assets/images/kids_tablet_floor_1791560303123.jpg';
import youtubeKidsCardImg from './assets/images/boy_youtube_tablet_1791560317137.jpg';
import netflixCardImg from './assets/images/baby_teddy_tv_1791560335792.jpg';

type GuideBullet = { label?: string; text: string };
type GuideStep = { label: string; text: string; bullets?: GuideBullet[] };
type GuideGroup = { title: string; steps: GuideStep[] };
type GuideSection = {
  heading: string;
  intro?: string;
  bullets?: GuideBullet[];
  groups?: GuideGroup[];
};
type GuideVideo = { id: string; title: string };

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
  sections?: GuideSection[]; // hướng dẫn chia giai đoạn (nếu có thì dùng thay cho steps)
  videos?: GuideVideo[];     // danh sách video YouTube (id + tiêu đề)
  youtubeId?: string;        // cách cũ: 1 video duy nhất
};

function getVideos(guide: Guide): GuideVideo[] {
  if (guide.videos && guide.videos.length > 0) return guide.videos;
  if (guide.youtubeId) return [{ id: guide.youtubeId, title: '' }];
  return [];
}

const guides: Guide[] = [
  {
    id: 'screen-time',
    category: 'iPad & iPhone',
    duration: '5 phút',
    title: 'Giới hạn thời gian thật dễ dàng',
    description: 'Cùng đặt “giờ nghỉ” cho iPhone & iPad để con vừa xem vui, vừa không quên giờ nha!',
    image: screenTimeCardImg,
    icon: Apple,
    iconColor: 'bg-neutral-800',
    steps: [],
    sections: [
      {
        heading: 'Chuẩn bị trước khi bắt đầu',
        intro: 'Trước khi bắt đầu, ba mẹ hãy cập nhật thiết bị nếu có thể và chuẩn bị mật mã Screen Time riêng, không trùng với mật mã mở khóa thiết bị của con.',
        bullets: [
          { text: 'Các tên mục có thể khác nhau tùy phiên bản iOS/iPadOS và cách thiết lập Family Sharing. Hướng dẫn dưới đây sử dụng những tên tính năng phổ biến trên giao diện Apple.' },
        ],
      },
      {
        heading: 'Bước 1: Bật Screen Time cho thiết bị của con',
        groups: [
          {
            title: '📱 Nếu cài đặt trực tiếp trên iPhone/iPad của con:',
            steps: [
              { label: 'Mở Cài đặt', text: 'Mở Settings (Cài đặt).' },
              { label: 'Chọn tính năng', text: 'Chọn Screen Time (Thời gian sử dụng).' },
              { label: 'Kích hoạt', text: 'Bật tính năng nếu chưa được kích hoạt.' },
              { label: 'Thiết lập cho trẻ', text: 'Làm theo hướng dẫn trên màn hình để thiết lập các tùy chọn dành cho trẻ.' },
              { label: 'Đặt mật mã', text: 'Đặt mật mã Screen Time để tránh việc con tự ý thay đổi những giới hạn đã cài đặt.' },
            ],
          },
          {
            title: '📱 Nếu ba mẹ quản lý từ thiết bị Apple của mình:',
            steps: [
              { label: 'Mở Cài đặt', text: 'Mở Settings (Cài đặt).' },
              { label: 'Truy cập Gia đình', text: 'Truy cập phần Family (Gia đình) hoặc Screen Time, tùy phiên bản hệ điều hành.' },
              { label: 'Chọn tài khoản con', text: 'Chọn tên tài khoản của con trong nhóm gia đình.' },
              { label: 'Thực hiện thiết lập', text: 'Thực hiện các thiết lập Screen Time theo hướng dẫn.' },
              { label: 'Lưu ý', text: 'Apple hỗ trợ quản lý các giới hạn dành cho trẻ thông qua Family Sharing trên những thiết bị tương thích.' },
            ],
          },
        ],
      },
      {
        heading: 'Bước 2: Cài đặt Downtime – Giới hạn khung giờ sử dụng',
        intro: 'Downtime cho phép ba mẹ thiết lập khoảng thời gian mà các ứng dụng không được phép sử dụng sẽ bị hạn chế, chẳng hạn vào giờ ăn tối hoặc trước giờ đi ngủ. Một số ứng dụng được cho phép vẫn có thể hoạt động tùy thiết lập. Cách thực hiện:',
        bullets: [
          { text: 'Vào Settings → Screen Time.' },
          { text: 'Chọn Downtime (Thời gian nghỉ).' },
          { text: 'Bật tính năng lên.' },
          { text: 'Chọn Scheduled (Theo lịch) nếu có.' },
          { text: 'Thiết lập giờ bắt đầu và kết thúc phù hợp với lịch sinh hoạt của con.' },
          { text: 'Kiểm tra mục Always Allowed (Luôn cho phép) để xác định ứng dụng nào vẫn có thể sử dụng trong khoảng thời gian nghỉ.' },
          { text: 'Ví dụ, ba mẹ có thể thiết lập khoảng thời gian hạn chế từ lúc bắt đầu chuẩn bị đi ngủ đến sáng hôm sau, đồng thời giữ các ứng dụng thiết yếu được phép hoạt động nếu cần.' },
          { label: 'Mẹo nhỏ', text: 'Hãy thông báo cho con trước khi đến giờ nghỉ và cùng chuyển sang đọc truyện, xếp hình hoặc chơi đồ chơi. Như vậy, việc dừng sử dụng thiết bị sẽ trở thành một phần tự nhiên trong lịch sinh hoạt thay vì một hình phạt.' },
        ],
      },
      {
        heading: 'Bước 3: Cài đặt App Limits – Giới hạn thời gian sử dụng ứng dụng',
        intro: 'Nếu Downtime giúp giới hạn thời gian sử dụng theo khung giờ, App Limits (Giới hạn ứng dụng) giúp ba mẹ đặt hạn mức sử dụng cho từng ứng dụng hoặc nhóm ứng dụng. Cách thực hiện:',
        bullets: [
          { text: 'Vào Settings → Screen Time.' },
          { text: 'Chọn App Limits (Giới hạn ứng dụng).' },
          { text: 'Nhấn Add Limit (Thêm giới hạn).' },
          { text: 'Chọn nhóm ứng dụng hoặc ứng dụng cần giới hạn, chẳng hạn nhóm giải trí hoặc ứng dụng xem video.' },
          { text: 'Nhấn Next (Tiếp theo).' },
          { text: 'Nhập thời lượng mong muốn và chọn lịch áp dụng nếu có tùy chọn.' },
          { text: 'Nhấn Add (Thêm) để hoàn tất.' },
          { text: 'Ba mẹ có thể ưu tiên giới hạn các ứng dụng giải trí như nền tảng xem video, đồng thời cân nhắc những ứng dụng phục vụ học tập hoặc liên lạc cần thiết.' },
          { label: 'Lưu ý', text: 'App Limits không phải lúc nào cũng bảo đảm ứng dụng sẽ bị khóa tuyệt đối trong mọi tình huống. Ba mẹ nên kiểm tra tùy chọn chặn khi hết giới hạn và bảo vệ mật mã Screen Time để hạn chế việc con tự bỏ qua quy tắc.' },
        ],
      },
      {
        heading: 'Bước 4: Bật Content & Privacy Restrictions – Lọc nội dung không phù hợp',
        intro: 'Đây là bước quan trọng giúp ba mẹ hạn chế khả năng trẻ truy cập nội dung không phù hợp, cài đặt ứng dụng ngoài ý muốn hoặc thay đổi các thiết lập quan trọng trên thiết bị. Cách thực hiện:',
        bullets: [
          { text: 'Vào Settings → Screen Time.' },
          { text: 'Chọn Content & Privacy Restrictions (Giới hạn nội dung và quyền riêng tư).' },
          { text: 'Bật tính năng này.' },
          { text: 'Tìm mục giới hạn nội dung và điều chỉnh theo nhu cầu của gia đình.' },
        ],
        groups: [
          {
            title: 'Ba mẹ nên kiểm tra các tùy chọn sau:',
            steps: [
              { label: 'App Store', text: 'Hạn chế cài đặt hoặc xóa ứng dụng, cũng như mua hàng trong ứng dụng nếu cần.' },
              { label: 'Apps', text: 'Thiết lập mức phân loại độ tuổi cho ứng dụng, tùy phiên bản hệ điều hành.' },
              { label: 'Media', text: 'Giới hạn phim, chương trình truyền hình hoặc nội dung khác theo mức phân loại được hỗ trợ.' },
              { label: 'Web Content', text: 'Hạn chế website người lớn hoặc chỉ cho phép những website đã được phê duyệt.' },
              { label: 'Lưu ý', text: 'Các tùy chọn và tên mục có thể thay đổi theo phiên bản iOS/iPadOS. Apple hướng dẫn chi tiết cách sử dụng các giới hạn này trong tài liệu hỗ trợ chính thức.' },
            ],
          },
        ],
      },
      {
        heading: 'Bước 5: Thiết lập Web Content – Giới hạn website trẻ có thể truy cập',
        intro: 'Nếu con đã biết sử dụng Safari hoặc trình duyệt web, ba mẹ có thể thiết lập bộ lọc để hạn chế khả năng truy cập những website không phù hợp.',
        bullets: [
          { text: 'Vào Settings → Screen Time.' },
          { text: 'Chọn Content & Privacy Restrictions.' },
          { text: 'Tìm phần App Store, Media, Web & Games hoặc mục có tên tương đương.' },
          { text: 'Chọn Web Content (Nội dung web).' },
        ],
        groups: [
          {
            title: 'Lựa chọn một trong các chế độ được cung cấp:',
            steps: [
              { label: 'Unrestricted', text: 'Không hạn chế website.' },
              { label: 'Limit Adult Websites', text: 'Hạn chế website dành cho người lớn.' },
              { label: 'Only Approved Websites', text: 'Chỉ cho phép các website được phê duyệt. Nếu chọn chế độ chỉ cho phép website được duyệt, hãy thêm những địa chỉ mà con được phép truy cập.' },
              { label: 'Lời khuyên cho trẻ 0–6 tuổi', text: 'Với trẻ nhỏ từ 0–6 tuổi, chế độ chỉ cho phép website được phê duyệt có thể hữu ích nếu con cần sử dụng trình duyệt. Tuy nhiên, ba mẹ vẫn nên giám sát trực tiếp vì bộ lọc không thể nhận diện hoàn hảo mọi nội dung.' },
            ],
          },
        ],
      },
    ],
    note: 'Nên cùng con thống nhất thời gian sử dụng trước khi đặt giới hạn để con cảm thấy được lắng nghe.',
    videos: [
      { id: '6HOOLnF1N_4', title: 'Hướng dẫn thiết lập Screen Time trên iPhone/iPad (Video 1)' },
      { id: 't6m6JnfF4Nw', title: 'Hướng dẫn cài đặt giới hạn thời gian và nội dung (Video 2)' },
      { id: 'g09v_3yWmV0', title: 'Hướng dẫn quản lý thiết bị của con với Screen Time (Video 3)' },
    ],
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
    steps: [],
    sections: [
      {
        heading: 'GIAI ĐOẠN 1: Chuẩn bị tài khoản',
        intro: 'Trước khi bắt đầu, hãy đảm bảo:',
        bullets: [
          { text: 'Máy cha mẹ và máy con đều đã kết nối mạng Internet (Wi-Fi hoặc 4G).' },
          { text: 'Bạn đã biết mật khẩu tài khoản Google (Gmail) của cha mẹ.' },
        ],
      },
      {
        heading: 'GIAI ĐOẠN 2: Các bước thực hiện chi tiết',
        groups: [
          {
            title: '📱 Trên điện thoại của CHA MẸ',
            steps: [
              { label: 'Tải ứng dụng', text: 'Vào App Store (nếu dùng iPhone) hoặc CH Play (nếu dùng Android), tìm và tải ứng dụng Google Family Link.' },
              { label: 'Đăng nhập', text: 'Mở ứng dụng, đăng nhập bằng tài khoản Google cá nhân của bạn.' },
              { label: 'Bắt đầu thiết lập', text: 'Hệ thống sẽ hỏi “Ai sẽ dùng tài khoản này?” → Chọn Cha mẹ.' },
              {
                label: 'Chuẩn bị liên kết',
                text: 'Nhấn tiếp tục cho đến khi ứng dụng hỏi “Con bạn có Tài khoản Google chưa?”:',
                bullets: [
                  { label: 'Nếu Chưa có', text: 'Chọn Không để tạo ngay một tài khoản Gmail mới cho con dưới sự quản lý của bạn.' },
                  { label: 'Nếu Đã có', text: 'Chọn Có → Hệ thống sẽ hiển thị một Mã thiết lập gồm 9 chữ số (giữ nguyên màn hình này để nhập sang máy của con).' },
                ],
              },
            ],
          },
          {
            title: '📱 Trên điện thoại của CON (Yêu cầu là máy Android)',
            steps: [
              { label: 'Xóa tài khoản thừa (nếu có)', text: 'Vào Cài đặt (Settings) → Tài khoản (Accounts) → Xóa bỏ tất cả các tài khoản Google khác, chỉ để lại duy nhất tài khoản Google của con (hoặc để trống nếu tí nữa tạo mới).' },
              { label: 'Kích hoạt quản lý', text: 'Vào mục Cài đặt (Settings) trên máy con → Kéo xuống chọn Google → Chọn Quản lý của cha mẹ (Parental Controls) → Nhấn Bắt đầu (Get started).' },
              { label: 'Chọn đối tượng', text: 'Chọn mục Trẻ em hoặc thanh thiếu niên (Child or teen).' },
              {
                label: 'Nhập tài khoản & liên kết',
                text: '',
                bullets: [
                  { text: 'Đăng nhập tài khoản Google của con (hoặc tài khoản vừa tạo ở bước trên).' },
                  { text: 'Hệ thống sẽ yêu cầu nhập tài khoản Google của cha mẹ để xác nhận quyền lực.' },
                ],
              },
              { label: 'Nhập mã liên kết', text: 'Nhập chính xác Mã thiết lập 9 chữ số đang hiển thị trên màn hình điện thoại của cha mẹ.' },
              { label: 'Xác nhận mật khẩu', text: 'Nhập mật khẩu tài khoản của con để đồng ý cho cha mẹ giám sát.' },
              { label: 'Cấp quyền hệ thống', text: 'Nhấn Cho phép (Allow) hoặc Kích hoạt (Activate) khi máy của con hỏi quyền truy cập ứng dụng và vị trí. Chờ vài phút để hai máy đồng bộ.' },
            ],
          },
        ],
      },
      {
        heading: 'GIAI ĐOẠN 3: Thiết lập các tính năng quản lý (Làm trên máy CHA MẸ)',
        intro: 'Sau khi máy của con báo thiết lập hoàn tất, bạn quay lại điện thoại của mình. Lúc này, tên thiết bị của con đã xuất hiện trong ứng dụng Family Link của bạn. Bạn có thể cài đặt ngay:',
        bullets: [
          { label: 'Đặt giờ giới hạn', text: 'Chọn mục Giới hạn hằng ngày để quy định con chỉ được dùng máy tối đa bao nhiêu tiếng/ngày (Ví dụ: 1 giờ 30 phút).' },
          { label: 'Đặt giờ đi ngủ', text: 'Chọn mục Giờ đi ngủ để máy tự động khóa cứng từ 22h00 đến 6h00 sáng hôm sau.' },
          { label: 'Chặn/Cho phép ứng dụng', text: 'Vào mục Giới hạn ứng dụng, bạn có thể bấm vào từng app (như TikTok, YouTube, Game) chọn Chặn hoặc Đặt giới hạn thời gian riêng cho app đó.' },
        ],
      },
    ],
    note: 'Family Link phù hợp khi ba mẹ muốn quản lý thiết bị từ xa nhưng vẫn trao đổi minh bạch với con.',
    videos: [
      { id: 'oqmALsQL73k', title: '[Family Link] Hướng dẫn kết nối thiết bị (Cha,mẹ) - Con' },
      { id: 'AQRDLBrWr0E', title: 'How To Setup Google Family Link | Google Parental Controls' },
    ],
  },
  {
    id: 'youtube-kids',
    category: 'YouTube Kids',
    duration: '4 phút',
    title: 'YouTube Kids: 4 phút để yên tâm hơn',
    description: 'Chỉ vài bước nhỏ để bé xem đúng nội dung phù hợp - bố mẹ nhớ kiểm tra tìm kiếm và giới hạn giờ xem nhé!',
    image: youtubeKidsCardImg,
    icon: Youtube,
    iconColor: 'bg-orange-500',
    steps: [],
    sections: [
      {
        heading: 'Bước 1: Thiết lập hồ sơ và độ tuổi cho trẻ',
        bullets: [
          { text: 'Mở ứng dụng YouTube Kids trên điện thoại hoặc máy tính bảng của con.' },
          { text: 'Nhấn biểu tượng ổ khóa và hoàn thành phép tính xác minh hoặc nhập mật mã phụ huynh.' },
          { text: 'Mở Settings (Cài đặt) và chọn hồ sơ của con.' },
          { text: 'Vào phần Content settings (Cài đặt nội dung) hoặc mục chỉnh sửa tương ứng.' },
          { text: 'Ba mẹ có thể chọn nhóm nội dung theo độ tuổi như Preschool (trẻ mẫu giáo, 4 tuổi trở xuống), Younger (5–8 tuổi) hoặc Older (9–12 tuổi). Với trẻ nhỏ từ 0–6 tuổi, hãy ưu tiên nhóm Preschool khi phù hợp với độ tuổi và nhu cầu của con.' },
          { label: 'Lưu ý', text: 'Cài đặt độ tuổi chỉ giúp lọc nội dung ở mức nhất định, không bảo đảm mọi video đều phù hợp với từng trẻ.' },
        ],
      },
      {
        heading: 'Bước 2: Chỉ cho phép con xem video do ba mẹ lựa chọn',
        intro: 'Đây là lựa chọn đáng cân nhắc nếu ba mẹ muốn kiểm soát chặt chẽ nội dung dành cho trẻ nhỏ.',
        bullets: [
          { text: 'Trong phần cài đặt hồ sơ của con, nhấn EDIT SETTINGS (Chỉnh sửa cài đặt).' },
          { text: 'Chọn Approve content yourself (Tự phê duyệt nội dung).' },
          { text: 'Xem và lựa chọn những bộ sưu tập, kênh hoặc video mà ba mẹ muốn cho phép.' },
          { text: 'Nhấn Done (Hoàn tất) để lưu lựa chọn.' },
          { text: 'Khi bật chế độ Approved content only (Chỉ nội dung được phê duyệt), con chỉ có thể xem nội dung ba mẹ đã chọn và không thể tự tìm kiếm video trong chế độ này.' },
        ],
        groups: [
          {
            title: 'Ba mẹ nên ưu tiên:',
            steps: [
              { label: 'Video học tập', text: 'Video học màu sắc, chữ cái, số đếm và nhận biết con vật.' },
              { label: 'Âm nhạc & Truyện kể', text: 'Truyện kể nhẹ nhàng, bài hát thiếu nhi có nội dung tích cực.' },
              { label: 'Sáng tạo & Vận động', text: 'Video hướng dẫn vẽ tranh, làm đồ thủ công hoặc vận động đơn giản.' },
              { label: 'Ngôn ngữ & Hình ảnh', text: 'Nội dung có ngôn ngữ dễ hiểu, hình ảnh phù hợp và nhịp độ vừa phải.' },
              { label: 'Cần hạn chế', text: 'Hạn chế các video có tiếng hét lớn, hình ảnh gây sợ hãi, hành vi nguy hiểm, thử thách bắt chước không an toàn hoặc nội dung lặp đi lặp lại nhằm giữ trẻ trước màn hình.' },
            ],
          },
        ],
      },
      {
        heading: 'Bước 3: Tắt tìm kiếm hoặc chặn video, kênh không phù hợp',
        intro: 'Nếu ba mẹ chưa sử dụng chế độ chỉ phê duyệt nội dung, hãy chủ động kiểm tra các lựa chọn tìm kiếm và chặn nội dung.',
        bullets: [
          { text: 'Vào Settings → hồ sơ của con để kiểm tra tùy chọn Search (Tìm kiếm) và tắt nếu muốn hạn chế việc con tự tìm video.' },
          { text: 'Khi phát hiện một video hoặc kênh không phù hợp, mở menu tùy chọn của video và chọn chức năng chặn tương ứng nếu có.' },
          { text: 'Thường xuyên kiểm tra mục video đã xem để biết con đang tiếp cận những nội dung nào.' },
          { label: 'Lưu ý', text: 'Lưu ý rằng các bộ lọc tự động không hoàn hảo. Ba mẹ vẫn cần kiểm tra nội dung thực tế, đặc biệt khi trẻ còn quá nhỏ để tự nhận biết video nào không an toàn.' },
        ],
      },
      {
        heading: 'Bước 4: Cài đặt giới hạn thời gian xem YouTube Kids',
        intro: 'Cha mẹ nên thỏa thuận và thương lượng với con trước khi cài đặt thời gian giới hạn mỗi ngày để cả cha mẹ và bé đều có một thỏa thuận rõ ràng về số giờ được xem. Con cũng sẽ ít phản kháng hơn nếu được biết trước giới hạn của mình. Hiện tại, YouTube Kids có tính năng Set Timer (Hẹn giờ) để thông báo khi hết thời gian và khóa ứng dụng sau khi phiên xem kết thúc. Cách thực hiện:',
        bullets: [
          { text: 'Mở YouTube Kids và nhấn Settings (Cài đặt).' },
          { text: 'Hoàn thành bước xác minh phụ huynh hoặc nhập mật mã.' },
          { text: 'Chọn Set Timer (Hẹn giờ).' },
          { text: 'Kéo thanh điều chỉnh hoặc sử dụng nút tăng, giảm để chọn thời lượng.' },
          { text: 'Nhấn START TIMER (Bắt đầu hẹn giờ).' },
          { label: 'Mẹo nhỏ', text: 'Hãy báo trước cho con vài phút trước khi hết giờ, sau đó chuyển sang hoạt động khác như đọc truyện, xếp hình hoặc chơi đồ chơi DIY. Điều này giúp con dễ thích nghi với việc dừng xem hơn.' },
        ],
      },
    ],
    note: 'Không có bộ lọc nào thay thế hoàn toàn việc đồng hành. Hãy thỉnh thoảng xem cùng con và hỏi con về video đã xem.',
    videos: [
      { id: 'IWXVTQEbqT4', title: 'Hướng dẫn thiết lập và sử dụng YouTube Kids an toàn (Video 1)' },
      { id: 'Q0V0nyya2JU', title: 'Hướng dẫn kiểm soát nội dung và hẹn giờ trên YouTube Kids (Video 2)' },
    ],
  },
  {
    id: 'netflix',
    category: 'Netflix',
    duration: '4 phút',
    title: 'Góc nhỏ của bé trên không gian Netflix',
    description: 'Tạo hồ sơ và mã PIN để mở ra một thế giới màu sắc, đáng yêu của riêng con.',
    image: netflixCardImg,
    icon: LockKeyhole,
    iconColor: 'bg-amber-600',
    steps: [],
    sections: [
      {
        heading: 'Bước 1: Tạo hồ sơ Netflix Kids riêng cho con',
        bullets: [
          { text: 'Mở Netflix trên thiết bị hoặc trình duyệt.' },
          { text: 'Truy cập mục quản lý hồ sơ (Manage Profiles).' },
          { text: 'Chọn thêm hồ sơ mới (Add Profile) nếu tài khoản hỗ trợ.' },
          { text: 'Đặt tên hồ sơ dễ nhận biết, sau đó bật tùy chọn hồ sơ trẻ em (Kids) hoặc trải nghiệm Netflix Kids nếu có.' },
          { text: 'Lưu thay đổi và kiểm tra lại hồ sơ vừa tạo.' },
          { label: 'Lợi ích', text: 'Hồ sơ riêng giúp ba mẹ tách trải nghiệm xem phim của con khỏi hồ sơ người lớn, đồng thời thuận tiện hơn khi quản lý nội dung.' },
        ],
      },
      {
        heading: 'Bước 2: Thiết lập mức phân loại độ tuổi',
        intro: 'Đây là bước quan trọng giúp hạn chế những chương trình không phù hợp với lứa tuổi của trẻ.',
        bullets: [
          { text: 'Mở trình duyệt và truy cập trang Tài khoản Netflix.' },
          { text: 'Vào mục quản lý hồ sơ hoặc Profiles, sau đó tìm phần điều chỉnh quyền kiểm soát phụ huynh (Adjust parental controls).' },
          { text: 'Chọn hồ sơ của con.' },
          { text: 'Mở Viewing Restrictions (Giới hạn nội dung xem) và xác thực tài khoản nếu được yêu cầu.' },
          { text: 'Chọn mức phân loại độ tuổi phù hợp, sau đó lưu thay đổi.' },
          { label: 'Lưu ý', text: 'Netflix cho biết hồ sơ được thiết lập mức phân loại sẽ chỉ hiển thị những chương trình phù hợp với giới hạn đã chọn. Tuy nhiên, ba mẹ vẫn nên kiểm tra thông tin phân loại và mô tả nội dung của từng phim trước khi cho con xem.' },
        ],
      },
      {
        heading: 'Bước 3: Chặn phim hoặc chương trình không phù hợp',
        intro: 'Ngay cả khi đã giới hạn độ tuổi, ba mẹ vẫn có thể muốn chặn một số chương trình cụ thể.',
        bullets: [
          { text: 'Trong trang quản lý hồ sơ của con, mở Viewing Restrictions.' },
          { text: 'Tìm mục Title Restrictions (Giới hạn theo tên phim) hoặc Block Titles (Chặn tiêu đề).' },
          { text: 'Nhập tên phim hoặc chương trình mà ba mẹ không muốn con xem.' },
          { text: 'Chọn đúng kết quả và lưu thay đổi.' },
          { text: 'Những phim đã được thêm vào danh sách chặn sẽ bị loại khỏi hồ sơ tương ứng. Netflix lưu ý rằng việc chặn tiêu đề trong hồ sơ Kids cần thực hiện qua trình duyệt web.' },
          { label: 'Mẹo dành cho ba mẹ', text: 'Đừng chỉ kiểm tra độ tuổi ghi trên phim. Hãy xem thêm mô tả về bạo lực, ngôn ngữ, nội dung đáng sợ hoặc những chủ đề nhạy cảm để lựa chọn phù hợp hơn với tính cách và độ tuổi thực tế của con.' },
        ],
      },
      {
        heading: 'Bước 4: Khóa hồ sơ người lớn bằng mã PIN',
        intro: 'Nếu con biết cách chuyển đổi hồ sơ, những thiết lập ở hồ sơ Kids có thể không đủ để ngăn con truy cập hồ sơ người lớn. Vì vậy, ba mẹ nên bảo vệ hồ sơ cá nhân bằng mã PIN.',
        bullets: [
          { text: 'Truy cập trang quản lý tài khoản Netflix.' },
          { text: 'Chọn hồ sơ người lớn mà ba mẹ sử dụng.' },
          { text: 'Tìm mục Profile Lock (Khóa hồ sơ).' },
          { text: 'Thiết lập mã PIN theo hướng dẫn.' },
          { text: 'Lưu lại và kiểm tra xem hồ sơ có yêu cầu mã PIN khi truy cập hay không.' },
          { label: 'Lợi ích', text: 'Tính năng khóa hồ sơ giúp hạn chế việc trẻ tự chuyển sang hồ sơ không được thiết kế dành cho mình.' },
        ],
      },
      {
        heading: 'Cách giới hạn thời gian xem Netflix cho trẻ',
        intro: 'Khác với YouTube Kids có bộ hẹn giờ tích hợp để kết thúc phiên xem, các công cụ kiểm soát phụ huynh chính của Netflix tập trung vào hồ sơ và nội dung. Vì vậy, để giới hạn thời lượng xem, ba mẹ nên kết hợp các cài đặt của Netflix với quy tắc sinh hoạt và công cụ quản lý thời gian trên thiết bị.',
        groups: [
          {
            title: 'Các cách kết hợp hiệu quả:',
            steps: [
              {
                label: 'Cách 1: Tắt tính năng tự động phát tập tiếp theo',
                text: 'Tính năng tự động phát có thể khiến trẻ tiếp tục xem tập tiếp theo ngay cả khi ban đầu chỉ định xem một tập. Ba mẹ có thể thực hiện như sau:',
                bullets: [
                  { text: 'Mở trang quản lý tài khoản Netflix trên trình duyệt.' },
                  { text: 'Chọn hồ sơ của con trong phần Profiles.' },
                  { text: 'Tìm mục Playback settings (Cài đặt phát).' },
                  { text: 'Tắt tùy chọn tự động phát tập tiếp theo (Autoplay next episode in a series on all devices) nếu có.' },
                  { text: 'Lưu thay đổi.' },
                  { label: 'Lưu ý', text: 'Tắt tự động phát giúp tạo điểm dừng tự nhiên sau mỗi tập, để ba mẹ có thể cùng con quyết định có tiếp tục xem hay chuyển sang hoạt động khác. Netflix cung cấp tùy chọn quản lý tự động phát trong hệ thống kiểm soát phụ huynh.' },
                ],
              },
              {
                label: 'Cách 2: Đặt giới hạn thời gian sử dụng thiết bị',
                text: 'Nếu con xem Netflix trên điện thoại hoặc máy tính bảng, ba mẹ có thể sử dụng công cụ quản lý thời gian màn hình của thiết bị để thiết lập lịch sử dụng hoặc giới hạn ứng dụng, tùy hệ điều hành.',
                bullets: [
                  { label: 'Trên iPhone/iPad', text: 'Tham khảo tính năng Screen Time trong phần Cài đặt.' },
                  { label: 'Trên Android', text: 'Tham khảo Google Family Link hoặc công cụ quản lý thời gian màn hình sẵn có trên thiết bị.' },
                  { label: 'Trên máy tính', text: 'Có thể sử dụng Microsoft Family Safety để quản lý thời gian sử dụng thiết bị và ứng dụng trong phạm vi được hỗ trợ.' },
                  { label: 'Trên TV', text: 'Nên thiết lập khung giờ xem trong gia đình, đồng thời sử dụng các công cụ kiểm soát của TV nếu có.' },
                  { label: 'Lưu ý', text: 'Khả năng giới hạn riêng Netflix sẽ khác nhau tùy thiết bị, phiên bản hệ điều hành và cách ứng dụng được sử dụng. Ba mẹ nên kiểm tra cài đặt thực tế trước khi áp dụng.' },
                ],
              },
              {
                label: 'Cách 3: Xây dựng lịch xem phim cùng con',
                text: 'Công cụ kỹ thuật chỉ hỗ trợ việc thiết lập ranh giới. Để con hình thành thói quen lâu dài, ba mẹ nên thống nhất quy tắc đơn giản và dễ thực hiện:',
                bullets: [
                  { text: 'Chỉ xem phim vào khung giờ đã thống nhất.' },
                  { text: 'Không xem trong bữa ăn hoặc ngay trước giờ đi ngủ.' },
                  { text: 'Dừng xem khi hết thời gian, kể cả khi con muốn xem thêm.' },
                  { text: 'Sau khi xem, khuyến khích con kể lại nội dung, vẽ tranh hoặc chơi trò chơi liên quan.' },
                  { text: 'Ưu tiên thời gian chơi ngoài trời, vận động và giao tiếp trực tiếp.' },
                ],
              },
            ],
          },
        ],
      },
    ],
    note: 'Mật khẩu và mã PIN nên được cất riêng, không lưu trên thiết bị mà con thường sử dụng.',
    videos: [
      { id: '4s8oGDxT824', title: 'Hướng dẫn thiết lập kiểm soát của phụ huynh trên Netflix' },
    ],
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
    steps: [],
    sections: [
      {
        heading: 'Giai đoạn 1: Đặt mã PIN khóa ứng dụng trên Smart TV (App Lock)',
        intro: 'Tính năng Khóa ứng dụng (App Lock) giúp bố mẹ ngăn chặn trẻ tự ý truy cập các nền tảng xem phim, giải trí dành cho người lớn hoặc duyệt web khi không có sự giám sát.',
        groups: [
          {
            title: '1. Dòng TV Samsung (Hệ điều hành Tizen OS)',
            steps: [
              { label: 'Vai trò', text: 'Mã PIN trên TV Samsung đóng vai trò như một lớp chìa khóa bảo vệ các ứng dụng như YouTube, Netflix hay Trình duyệt web.' },
              { label: 'Bước 1', text: 'Nhấn nút Home (hình ngôi nhà) trên điều khiển từ xa (Remote) ➔ Mở mục App (Kho ứng dụng).' },
              { label: 'Bước 2', text: 'Di chuyển lên góc trên bên phải màn hình và chọn biểu tượng Cài đặt (hình bánh răng).' },
              { label: 'Bước 3', text: 'Tìm ứng dụng bạn muốn khóa (YouTube, Netflix, Web Browser) ➔ Chọn Khóa (Lock) và nhập mã PIN bảo mật của gia đình.' },
              { label: 'Ghi chú', text: 'Đặt mã PIN khóa ứng dụng giúp bố mẹ kiểm soát các kênh giải trí của trẻ.' },
            ],
          },
          {
            title: '2. Dòng TV LG (Hệ điều hành webOS)',
            steps: [
              { label: 'Đặc điểm', text: 'Giao diện webOS của LG trang bị trình quản lý an toàn rất trực quan.' },
              { label: 'Bước 1', text: 'Bấm nút Cài đặt (Settings) trên Remote ➔ Chọn mục An toàn (Safety).' },
              { label: 'Bước 2', text: 'Bật trạng thái sang Bật (On) ➔ Nhập mã PIN (Mã mặc định nhà sản xuất thường là 0000).' },
              { label: 'Bước 3', text: 'Nhấn vào mục Khóa ứng dụng (Application Locks) ➔ Tích chọn tất cả ứng dụng cần giới hạn truy cập.' },
              { label: '📺 Video tham khảo', text: 'CÁCH KHÓA TRẺ EM TRÊN TIVI LG (xem ở phần video bên dưới).' },
            ],
          },
          {
            title: '3. Dòng TV Android TV / Google TV (Sony, TCL, Casper)',
            steps: [
              { label: 'Đặc điểm', text: 'Các dòng TV sử dụng hệ điều hành Android hoặc Google TV cho phép phân quyền tài khoản và cài đặt mã khóa ứng dụng linh hoạt.' },
              { label: 'Bước 1', text: 'Nhấn biểu tượng bánh răng trên remote để vào Cài đặt (Settings) ➔ Chọn Hệ thống hoặc Ứng dụng.' },
              { label: 'Bước 2', text: 'Tìm và kích hoạt tính năng Khóa trẻ em / Khóa ứng dụng ➔ Cài đặt mã PIN mới.' },
              { label: '📺 Video tham khảo', text: 'Khóa trẻ em các ứng dụng trên Smart Tivi Android (xem ở phần video bên dưới).' },
            ],
          },
        ],
      },
      {
        heading: 'Giai đoạn 2: Cài đặt hẹn giờ tắt TV (Sleep Timer & Off Timer)',
        intro: 'Thói quen xem tivi quá đà trước khi đi ngủ ảnh hưởng trực tiếp tới giấc ngủ và khả năng tập trung của trẻ. Việc thiết lập chế độ hẹn giờ giúp phụ huynh không phải căng thẳng tranh giành điều khiển với con. Cài đặt Hẹn giờ tắt TV giúp ngắt thời lượng xem đúng giờ mà không tạo cảm giác ức chế cho trẻ.',
        groups: [
          {
            title: '1. Cách hẹn giờ tắt tivi Samsung',
            steps: [
              { label: 'Bước 1', text: 'Nhấn nút Home (hình ngôi nhà) trên remote.' },
              { label: 'Bước 2', text: 'Chọn Cài đặt (Settings) > Tổng quát (General) > Trình quản lý hệ thống.' },
              {
                label: 'Bước 3',
                text: 'Chọn Thời gian (Time). Tại đây có 2 chế độ tùy chọn:',
                bullets: [
                  { label: 'Bộ định giờ ngủ (Sleep Timer)', text: 'Tự động tắt TV sau khoảng thời gian chọn trước (30 phút, 60 phút, 120 phút).' },
                  { label: 'Bộ định giờ tắt (Off Timer)', text: 'Thiết lập mốc giờ tắt cố định chính xác trong ngày (ví dụ: đúng 22h00).' },
                ],
              },
            ],
          },
          {
            title: '2. Cài đặt hẹn giờ trên Smart TV LG',
            steps: [
              { label: 'Bước 1', text: 'Bấm nút Cài đặt (bánh răng) trên điều khiển.' },
              { label: 'Bước 2', text: 'Vào Tất cả cài đặt (All Settings) > Cài đặt chung (General).' },
              { label: 'Bước 3', text: 'Chọn Hệ thống (hoặc Hẹn giờ/Time tùy phiên bản WebOS).' },
              { label: 'Bước 4', text: 'Thiết lập Hẹn giờ ngủ để đếm ngược thời gian tắt, hoặc Hẹn giờ tắt để chọn giờ cố định.' },
              { label: '📺 Xem chi tiết', text: 'Hướng dẫn cách hẹn giờ bật, tắt cho Smart tivi LG trên YouTube (xem ở phần video bên dưới).' },
            ],
          },
          {
            title: '3. Cài đặt hẹn giờ tắt tivi Sony (Android TV / Google TV)',
            steps: [
              { label: 'Bước 1', text: 'Bấm nút HOME hoặc biểu tượng bánh răng Cài đặt trên remote.' },
              { label: 'Bước 2', text: 'Chọn Cài đặt > Cài đặt hệ thống (hoặc Tùy chọn thiết bị).' },
              { label: 'Bước 3', text: 'Tìm mục Đồng hồ / Hẹn giờ (Clock / Timer).' },
              { label: 'Bước 4', text: 'Bật Hẹn giờ ngủ (Sleep Timer) và thiết lập khung thời gian mong muốn.' },
              { label: '📺 Xem chi tiết', text: 'Hướng dẫn cách hẹn giờ bật, tắt cho tivi Sony trên YouTube (xem ở phần video bên dưới).' },
            ],
          },
        ],
      },
    ],
    note: 'Một quy tắc đơn giản và nhất quán thường hiệu quả hơn nhiều cài đặt phức tạp.',
    videos: [
      { id: 'lBE8VXxq6uA', title: 'CÁCH KHÓA TRẺ EM TRÊN TIVI LG' },
      { id: 'lgv4qeyWnT8', title: 'Khóa trẻ em các ứng dụng trên Smart Tivi Android' },
      { id: '9J50rLd-N7c', title: 'Hướng dẫn cách hẹn giờ bật, tắt cho Smart tivi LG trên YouTube' },
      { id: 'Se4wUxHzPfQ', title: 'Hướng dẫn cách hẹn giờ bật, tắt cho tivi Sony trên YouTube' },
    ],
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
            alt="Smart Play Guide - Thời gian cùng bé"
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
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800">Bố mẹ đang cần gì thế?</h2>
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
              {selectedGuide.sections ? (
                <div className="space-y-8">
                  {selectedGuide.sections.map((section) => (
                    <div key={section.heading}>
                      <h3 className="text-base sm:text-lg font-bold text-cyan-700 bg-cyan-50 border border-cyan-100 rounded-xl px-4 py-2.5 mb-4">{section.heading}</h3>
                      {section.intro && <p className="text-neutral-700 leading-relaxed mb-3">{section.intro}</p>}
                      {section.bullets && (
                        <ul className="space-y-2.5">
                          {section.bullets.map((b, i) => (
                            <li key={i} className="flex gap-3 items-start text-neutral-700 leading-relaxed">
                              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                              <span>{b.label && <strong className="text-neutral-800">{b.label}: </strong>}{b.text}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.groups?.map((group) => (
                        <div key={group.title} className="mt-6 first:mt-0">
                          <h4 className="font-bold text-neutral-800 mb-4">{group.title}</h4>
                          <div className="space-y-4">
                            {group.steps.map((step, index) => (
                              <div key={step.label} className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-sm font-bold shrink-0">{index + 1}</div>
                                <div className="pt-1">
                                  <p className="text-neutral-700 leading-relaxed">
                                    <strong className="text-neutral-800">{step.label}{step.text ? ': ' : ''}</strong>{step.text}
                                  </p>
                                  {step.bullets && (
                                    <ul className="mt-2 space-y-2">
                                      {step.bullets.map((b, i) => (
                                        <li key={i} className="flex gap-3 items-start text-neutral-700 leading-relaxed">
                                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                                          <span>{b.label && <strong className="text-neutral-800">{b.label}: </strong>}{b.text}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedGuide.steps.map((step, index) => (
                    <div key={step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-sm font-bold shrink-0">{index + 1}</div>
                      <p className="text-neutral-700 leading-relaxed pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-7 rounded-2xl bg-cyan-50 border border-cyan-100 p-5 flex gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                <p className="text-sm text-cyan-900 leading-relaxed">{selectedGuide.note}</p>
              </div>

              {getVideos(selectedGuide).length > 0 ? (
                <div className="mt-8 space-y-6">
                  {getVideos(selectedGuide).map((video) => (
                    <div key={video.id} className="rounded-2xl overflow-hidden border border-amber-200 bg-[#fffaf0]">
                      <div className="aspect-video bg-black">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
                          title={video.title || selectedGuide.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      {video.title && <p className="px-4 py-3 text-sm font-medium text-neutral-700">{video.title}</p>}
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

