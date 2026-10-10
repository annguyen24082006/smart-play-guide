import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FAMILY_KEY } from '@/pages/Leaderboard';
import { dayMaterials } from '@/data/materials';
import ChallengeSignup from '@/components/ChallengeSignup';
import {
  Trophy,
  Calendar,
  Gift,
  Camera,
  Upload,
  Loader2,
  CheckCircle,
  X,
  Image as ImageIcon,
  Heart,
  Sparkles,
  Trash2,
} from 'lucide-react';

// Đường link API SheetDB của bạn
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/5mphi3brs5qb6';

type LocalPhoto = {
  id: string;
  day_number: number;
  participant_name: string;
  photo_url: string;
  caption: string | null;
  created_at: string;
};

// Cấu hình 10 thử thách chuẩn theo điểm số
const week1 = [
  { day: 1, title: 'Vương quốc côn trùng', desc: 'Cùng con khám phá thế giới côn trùng phong phú xung quanh.', points: 10 },
  { day: 2, title: 'Cá thổi bong bóng', desc: 'Sáng tạo chú cá vui nhộn biết thổi bóng bóng độc đáo.', points: 20 },
  { day: 3, title: 'Làm bó hoa bằng giấy ăn', desc: 'Khéo tay tạo nên bó hoa rực rỡ sắc màu tặng người thân.', points: 30 },
  { day: 4, title: 'Trồng cây cùng con', desc: 'Gieo mầm một chậu cây nhỏ và quan sát cây lớn mỗi ngày.', points: 10 },
  { day: 5, title: 'Nấu ăn cùng con', desc: 'Cùng con chuẩn bị một món ăn đơn giản, ấm áp gia đình.', points: 10 },
];

const week2 = [
  { day: 6, title: 'Nước đi bộ bắc cầu màu sắc', desc: 'Thí nghiệm khoa học đầy phép màu với hiện tượng mao dẫn.', points: 10 },
  { day: 7, title: 'Mê cung bi lăn', desc: 'Xây dựng đường đi mê cung thử thách sự khéo léo của bé.', points: 20 },
  { day: 8, title: 'Xe đua tên lửa bằng bóng bay', desc: 'Chế tạo xe đua phản lực bóng bay cực kỳ sôi động.', points: 30 },
  { day: 9, title: 'Viết thư cho nhau', desc: 'Ba mẹ và con trao gửi những lời yêu thương qua lá thư tay.', points: 10 },
  { day: 10, title: 'Đọc sách cùng con', desc: 'Đọc cuốn sách yêu thích và cùng trò chuyện về bài học hay.', points: 10 },
];

const allDays = [...week1, ...week2];
const TOTAL_DAYS = allDays.length;

const getPointsByDay = (dayNumber: number): number => {
  const dayInfo = allDays.find((d) => d.day === dayNumber);
  return dayInfo ? dayInfo.points : 10;
};

// Hàm nén ảnh giảm dung lượng để lưu vào Google Sheet mượt mà
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        const scaleFactor = MAX_WIDTH / img.width;
        
        if (scaleFactor < 1) {
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleFactor;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL('image/jpeg', 0.6);
        resolve(base64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function Challenge() {
  const [photos, setPhotos] = useState<LocalPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [participantName, setParticipantName] = useState(() => {
    try {
      return localStorage.getItem(FAMILY_KEY) || '';
    } catch {
      return '';
    }
  });
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Tải danh sách ảnh chung từ SheetDB
  const fetchPhotos = async () => {
    try {
      const res = await fetch(SHEETDB_API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        const formatted = data.map((item: any) => ({
          ...item,
          day_number: Number(item.day_number),
        }));
        setPhotos(formatted);
      }
    } catch (err) {
      console.error('Lỗi tải dữ liệu từ SheetDB:', err);
    } finally {
      setLoadingPhotos(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const myName = participantName.trim().toLowerCase();
  const completedDays = new Set(
    photos.filter((p) => myName && p.participant_name.trim().toLowerCase() === myName).map((p) => p.day_number)
  );
  const [earned, setEarned] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Ảnh quá lớn. Vui lòng chọn ảnh dưới 8MB.');
      return;
    }
    setSelectedFile(file);

    try {
      const compressedBase64 = await compressImage(file);
      setPreviewUrl(compressedBase64);
      setUploadError('');
    } catch (err) {
      setUploadError('Không thể xử lý ảnh này, vui lòng thử ảnh khác.');
    }
  };

  // Đăng ảnh lên Google Sheet thông qua SheetDB
  const handleUpload = async () => {
    if (!activeDay || !previewUrl || !participantName.trim()) return;
    setUploading(true);
    setUploadError('');

    const newPhoto = {
      id: `photo-${Date.now()}`,
      day_number: activeDay,
      participant_name: participantName.trim(),
      photo_url: previewUrl,
      caption: caption.trim() || '',
      created_at: new Date().toISOString(),
    };

    try {
      const res = await fetch(SHEETDB_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [newPhoto] }),
      });

      if (res.ok) {
        setEarned(!completedDays.has(activeDay));
        try {
          localStorage.setItem(FAMILY_KEY, participantName.trim());
        } catch {}
        
        setUploadSuccess(true);
        await fetchPhotos(); // Tải lại danh sách ảnh mới nhất

        setTimeout(() => {
          setUploadSuccess(false);
          closeModal();
        }, 1500);
      } else {
        setUploadError('Không thể gửi dữ liệu. Vui lòng thử lại!');
      }
    } catch (err) {
      setUploadError('Lỗi kết nối mạng!');
    } finally {
      setUploading(false);
    }
  };

  // Xóa ảnh trực tiếp trên Google Sheet
  const handleDeletePhoto = async (photoId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
      try {
        const res = await fetch(`${SHEETDB_API_URL}/id/${photoId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setPhotos(photos.filter((p) => p.id !== photoId));
        } else {
          alert('Không thể xóa bài đăng. Vui lòng thử lại!');
        }
      } catch (err) {
        alert('Lỗi kết nối khi xóa bài đăng.');
      }
    }
  };

  const closeModal = () => {
    setActiveDay(null);
    setSelectedFile(null);
    setPreviewUrl('');
    setCaption('');
    setUploadError('');
    setUploadSuccess(false);
  };

  const renderDayCard = (dayInfo: { day: number; title: string; desc: string; points: number }) => {
    const isCompleted = completedDays.has(dayInfo.day);
    const dayPhotos = photos.filter((p) => p.day_number === dayInfo.day);

    return (
      <div
        key={dayInfo.day}
        className={`relative bg-white rounded-2xl p-5 border-2 transition-all hover:shadow-lg ${
          isCompleted ? 'border-teal-300' : 'border-neutral-100'
        }`}
      >
        {isCompleted && (
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center shadow-md z-10">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        )}

        <div className="flex items-start gap-3 mb-3">
          <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg ${
            isCompleted ? 'bg-teal-100 text-teal-600' : 'bg-neutral-100 text-neutral-400'
          }`}>
            {dayInfo.day}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <h3 className="font-bold text-neutral-800 text-sm leading-snug">{dayInfo.title}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 shrink-0">
                +{dayInfo.points}đ
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">{dayInfo.desc}</p>
          </div>
        </div>

        {dayMaterials[dayInfo.day] && (
          <div className="mb-3 rounded-xl bg-amber-50 px-3 py-2">
            <p className="text-[11px] font-bold uppercase tracking-wide text-amber-700 mb-1">Chuẩn bị trước</p>
            <p className="text-xs text-neutral-600 leading-relaxed">{dayMaterials[dayInfo.day].join(' · ')}</p>
          </div>
        )}

        {dayPhotos.length > 0 && (
          <div className="flex gap-2 mb-3 overflow-x-auto py-1">
            {dayPhotos.map((photo) => (
              <div key={photo.id} className="relative group/item shrink-0">
                <img
                  src={photo.photo_url}
                  alt={`Day ${dayInfo.day}`}
                  className="w-14 h-14 rounded-lg object-cover border border-neutral-200"
                />
                {/* Chỉ hiển thị nút xóa cho người sở hữu ảnh */}
                {photo.participant_name.trim().toLowerCase() === myName && (
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    title="Xóa bài đăng này"
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center shadow hover:bg-rose-600 transition-all opacity-90 sm:opacity-0 sm:group-hover/item:opacity-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setActiveDay(dayInfo.day)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all bg-neutral-50 text-neutral-600 hover:bg-teal-50 hover:text-teal-600"
        >
          <Camera className="w-4 h-4" />
          {isCompleted ? 'Thêm ảnh' : 'Đăng tải ảnh'}
        </button>
      </div>
    );
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/challenge.png"
            alt="Smart Play Guide - Challenge"
            className="w-full h-full object-cover object-right-bottom"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl bg-transparent p-0 shadow-none border-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 text-amber-700 border border-amber-200/60 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm backdrop-blur-sm">
              <Trophy className="w-4 h-4 text-amber-500" />
              Thử thách 10 ngày đồng hành
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 leading-[1.15] mb-6 tracking-tight">
              Thử thách liền tay, <span className="text-amber-600">quà xinh</span> nhận ngay!
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium mb-6">
              10 thử thách nhỏ cùng con trong 2 tuần. Mỗi ngày trôi qua không chỉ là một kỷ niệm mới mà gia đình mình còn tích lũy điểm thưởng hấp dẫn!
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-200/60 shadow-sm text-xs sm:text-sm font-semibold text-neutral-800">
                <Calendar className="w-4 h-4 text-amber-500" />
                2 tuần — 10 thử thách
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-200/60 shadow-sm text-xs sm:text-sm font-semibold text-neutral-800">
                <Gift className="w-4 h-4 text-rose-500" />
                Điểm thưởng 10đ - 20đ - 30đ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress bar */}
      <section className="py-8 bg-white border-b border-neutral-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-neutral-700">Tiến độ của gia đình bạn</h2>
            <span className="text-sm font-bold text-teal-600">
              {completedDays.size} / {TOTAL_DAYS} ngày
            </span>
          </div>
          <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedDays.size / TOTAL_DAYS) * 100}%` }}
            />
          </div>
        </div>
      </section>

      <section className="py-4 bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-amber-800">
            Nhập <strong>tên hộ gia đình</strong> khi đăng ảnh. Tích lũy điểm thưởng theo mức độ thử thách (10đ, 20đ, 30đ).
          </p>
          <Link to="/bang-xep-hang" className="font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
            <Trophy className="w-4 h-4" /> Xem bảng xếp hạng
          </Link>
        </div>
      </section>

      {/* Week 1 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <span className="font-bold text-amber-600">1</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-800">Tuần 1</h2>
              <p className="text-sm text-neutral-500">5 thử thách đầu tiên (Thưởng 10đ - 20đ - 30đ)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {week1.map(renderDayCard)}
          </div>
        </div>
      </section>

      {/* Week 2 */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
              <span className="font-bold text-teal-600">2</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-800">Tuần 2</h2>
              <p className="text-sm text-neutral-500">5 thử thách tiếp theo (Thưởng 10đ - 20đ - 30đ)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {week2.map(renderDayCard)}
          </div>
        </div>
      </section>

      <ChallengeSignup />

      {/* Prize section */}
      <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <Gift className="w-16 h-16 text-white mx-auto mb-6 animate-float" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Giải thưởng dành cho bạn
          </h2>
          <p className="text-amber-50 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Top 1 mỗi tuần nhận 1 album lưu giữ ảnh đã gửi và 1 bộ dụng cụ học tập. Mọi gia đình tham gia
            đều nhận chứng nhận điện tử (digital certificate) khi chiến dịch kết thúc.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5">
              <Sparkles className="w-8 h-8 text-white mx-auto mb-3" />
              <p className="text-white font-semibold text-sm">Độc đáo</p>
              <p className="text-amber-50/80 text-xs mt-1">Thiết kế riêng cho bạn</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5">
              <Heart className="w-8 h-8 text-white mx-auto mb-3" />
              <p className="text-white font-semibold text-sm">Cá nhân hóa</p>
              <p className="text-amber-50/80 text-xs mt-1">Dấu ấn gia đình bạn</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5">
              <Trophy className="w-8 h-8 text-white mx-auto mb-3" />
              <p className="text-white font-semibold text-sm">Đáng nhớ</p>
              <p className="text-amber-50/80 text-xs mt-1">Kỷ niệm 10 thử thách</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery - Bức ảnh từ các gia đình */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-medium mb-4">
              <ImageIcon className="w-4 h-4" />
              Kỷ niệm chung
            </div>
            <h2 className="text-3xl font-bold text-neutral-800 mb-3">Bức ảnh từ các gia đình</h2>
            <p className="text-neutral-500">Những khoảnh khắc tuyệt đẹp từ các thử thách</p>
          </div>

          {loadingPhotos ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 rounded-3xl">
              <Camera className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-400">Chưa có ảnh nào. Hãy là người đầu tiên đăng tải!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  <img
                    src={photo.photo_url}
                    alt={`Day ${photo.day_number}`}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Nút xóa bài đăng góc trên ảnh */}
                  {photo.participant_name.trim().toLowerCase() === myName && (
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      title="Xóa bài đăng"
                      className="absolute top-2 right-2 p-2 bg-rose-600/90 text-white rounded-xl shadow hover:bg-rose-700 transition-all z-20 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-bold text-white bg-amber-500 rounded-md px-2 py-0.5">
                        Thử thách {photo.day_number}
                      </span>
                    </div>
                    <p className="text-white text-xs font-medium truncate">{photo.participant_name}</p>
                    {photo.caption && (
                      <p className="text-neutral-200 text-xs mt-0.5 line-clamp-2">{photo.caption}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upload modal */}
      {activeDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-fade-in" onClick={closeModal}>
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
                  <span className="font-bold text-amber-600 text-sm">{activeDay}</span>
                </div>
                <div>
                  <p className="font-bold text-neutral-800 text-sm">Thử thách {activeDay}</p>
                  <p className="text-xs text-neutral-500">{allDays.find(d => d.day === activeDay)?.title}</p>
                </div>
              </div>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-neutral-100">
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="text-center py-10">
                <CheckCircle className="w-14 h-14 text-teal-500 mx-auto mb-4" />
                <p className="font-semibold text-neutral-800 mb-1">Đăng tải thành công!</p>
                <p className="text-sm text-neutral-500 mb-3">Kỷ niệm của bạn đã được ghi nhận trực tuyến.</p>
                <p className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 font-bold text-sm">
                  {earned ? `+${getPointsByDay(activeDay)} điểm cho ${participantName.trim()}!` : 'Trò này đã được tính điểm trước đó'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Tên hộ gia đình <span className="text-orange-500">*</span></label>
                  <input
                    type="text"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    placeholder="VD: Gia đình bé Miu (bắt buộc)"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Ảnh hoàn thành thử thách</label>
                  {previewUrl ? (
                    <div className="relative rounded-xl overflow-hidden">
                      <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
                      <button
                        onClick={() => { setSelectedFile(null); setPreviewUrl(''); }}
                        className="absolute top-2 right-2 w-8 h-8 bg-neutral-900/60 rounded-lg flex items-center justify-center hover:bg-neutral-900/80"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-200 rounded-xl cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-6 h-6 text-neutral-400" />
                        <span className="text-sm text-neutral-500">Chọn ảnh từ thiết bị</span>
                      </div>
                      <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                    </label>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Lời nhắn (tùy chọn)</label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Chia sẻ cảm xúc của bạn..."
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
                  />
                </div>

                {uploadError && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{uploadError}</p>
                )}

                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || !participantName.trim() || uploading}
                  className="w-full py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Đang lưu lên hệ thống...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5" />
                      Đăng tải ảnh (+{getPointsByDay(activeDay)} điểm)
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
