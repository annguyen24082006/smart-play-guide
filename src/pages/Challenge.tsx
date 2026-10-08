import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Gift, 
  Clock, 
  Award,
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark
} from 'lucide-react';

interface ChallengeDay {
  day: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  completed: boolean;
  tips: string;
}

export const Challenge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending'>('all');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // Danh sách 14 ngày thử thách
  const [days, setDays] = useState<ChallengeDay[]>([
    {
      day: 1,
      title: 'Khởi động: Ngày không màn hình',
      description: 'Dành toàn bộ thời gian buổi tối (sau 18:00) không sử dụng bất kỳ thiết bị điện tử nào cùng con.',
      category: 'Gắn kết gia đình',
      duration: '3 tiếng',
      completed: true,
      tips: 'Cùng con chuẩn bị bữa tối, trò chuyện về một ngày trôi qua hoặc đọc sách trước khi đi ngủ.'
    },
    {
      day: 2,
      title: 'Góc sáng tạo: Xây dựng thành phố đồ chơi',
      description: 'Sử dụng hộp carton, lego hoặc đồ chơi có sẵn để tạo nên một mô hình thành phố mini.',
      category: 'Tư duy & Sáng tạo',
      duration: '45 phút',
      completed: true,
      tips: 'Khuyến khích con tự phân công vai trò cho các khu vực: bệnh viện, trường học, công viên.'
    },
    {
      day: 3,
      title: 'Khám phá thiên nhiên ngay tại nhà',
      description: 'Tìm hiểu về các loại cây xanh hoặc hoa có trong nhà/ban công và ghi chép lại nhật ký cây xanh.',
      category: 'Khám phá & Học hỏi',
      duration: '30 phút',
      completed: false,
      tips: 'Hướng dẫn con quan sát hình dáng lá, màu sắc và tưới nước cho cây.'
    },
    {
      day: 4,
      title: 'Đầu bếp nhí: Làm món ăn đơn giản',
      description: 'Cùng con chuẩn bị một món ăn nhẹ như bánh sandwich, salad trái cây hoặc pha nước cam.',
      category: 'Kỹ năng sống',
      duration: '40 phút',
      completed: false,
      tips: 'Dạy con các quy tắc an toàn trong bếp và tầm quan trọng của việc rửa tay.'
    },
    {
      day: 5,
      title: 'Trò chơi vận động: Vượt bộ chướng ngại vật',
      description: 'Tạo một đường đua chướng ngại vật trong phòng khách bằng gối, ghế và thảm.',
      category: 'Vận động thể chất',
      duration: '30 phút',
      completed: false,
      tips: 'Tính thời gian hoàn thiện đường đua để tăng sự hào hứng cho bé.'
    },
    {
      day: 6,
      title: 'Đêm đọc sách và kể chuyện sáng tạo',
      description: 'Đọc một cuốn sách yêu thích và cùng con sáng tác phần kết mới cho câu chuyện.',
      category: 'Gắn kết gia đình',
      duration: '30 phút',
      completed: false,
      tips: 'Đặt các câu hỏi gợi mở như: "Nếu con là nhân vật chính, con sẽ làm gì tiếp theo?"'
    },
    {
      day: 7,
      title: 'Tổng kết tuần 1: Sơ kết hành trình',
      description: 'Nhìn lại các hoạt động đã hoàn thành, chụp ảnh lưu niệm và tự thưởng cho cả nhà.',
      category: 'Cột mốc',
      duration: '20 phút',
      completed: false,
      tips: 'Dành lời khen ngợi cụ thể cho sự nỗ lực và sáng tạo của con trong suốt tuần vừa qua.'
    },
    {
      day: 8,
      title: 'Thử thách giải đố & Trò chơi trí tuệ',
      description: 'Cùng chơi các trò chơi ô chữ, đố vui hoặc xếp hình logic phù hợp lứa tuổi.',
      category: 'Tư duy & Sáng tạo',
      duration: '45 phút',
      completed: false,
      tips: 'Hãy kiên nhẫn để con tự suy nghĩ giải pháp trước khi đưa ra gợi ý.'
    },
    {
      day: 9,
      title: 'Thế giới âm nhạc và vũ điệu',
      description: 'Mở những bản nhạc vui tươi và cùng con sáng tạo ra một điệu nhảy gia đình độc đáo.',
      category: 'Vận động thể chất',
      duration: '30 phút',
      completed: false,
      tips: 'Sử dụng thêm các dụng cụ gõ nhịp tự chế từ chai lọ hoặc muỗng gỗ.'
    },
    {
      day: 10,
      title: 'Kế hoạch tiết kiệm & Phân loại đồ cũ',
      description: 'Cùng con dọn dẹp phòng, phân loại đồ chơi/sách cũ để quyên góp hoặc tái chế.',
      category: 'Kỹ năng sống',
      duration: '50 phút',
      completed: false,
      tips: 'Giúp con hiểu về lòng nhân ái và ý thức giữ gìn môi trường sống.'
    },
    {
      day: 11,
      title: 'Thí nghiệm khoa học vui',
      description: 'Thực hiện thí nghiệm đơn giản như "Núi lửa phun trào" bằng baking soda và giấm.',
      category: 'Khám phá & Học hỏi',
      duration: '35 phút',
      completed: false,
      tips: 'Giải thích hiện tượng khoa học bằng ngôn ngữ đơn giản, dễ hiểu cho bé.'
    },
    {
      day: 12,
      title: 'Rèn luyện lòng biết ơn',
      description: 'Cùng con viết hoặc vẽ 3 điều mà con cảm thấy biết ơn hoặc hạnh phúc nhất trong ngày.',
      category: 'Gắn kết gia đình',
      duration: '20 phút',
      completed: false,
      tips: 'Tạo một "Hũ biết ơn" nhỏ để lưu giữ lại những mảnh giấy ý nghĩa này.'
    },
    {
      day: 13,
      title: 'Khai phá góc mỹ thuật',
      description: 'Vẽ tranh bằng dấu vân tay, màu nước hoặc xé dán giấy màu theo chủ đề tự do.',
      category: 'Tư duy & Sáng tạo',
      duration: '45 phút',
      completed: false,
      tips: 'Chuẩn bị không gian thoải mái và không lo ngại việc làm bẩn đồ đạc.'
    },
    {
      day: 14,
      title: 'Vinh danh & Nhận chứng nhận hoàn thành',
      description: 'Tổ chức một buổi lễ vinh danh nhỏ tại nhà và trao chứng nhận "Chuyên gia Play-Smart".',
      category: 'Cột mốc',
      duration: '30 phút',
      completed: false,
      tips: 'Lưu giữ khoảnh khắc này bằng hình ảnh gia đình rạng rỡ để làm kỷ niệm.'
    }
  ]);

  const toggleComplete = (dayNumber: number) => {
    setDays(prevDays =>
      prevDays.map(item =>
        item.day === dayNumber ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const toggleExpand = (dayNumber: number) => {
    setExpandedDay(expandedDay === dayNumber ? null : dayNumber);
  };

  const completedCount = days.filter(d => d.completed).length;
  const progressPercent = Math.round((completedCount / days.length) * 100);

  const filteredDays = days.filter(d => {
    if (activeTab === 'completed') return d.completed;
    if (activeTab === 'pending') return !d.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HERO HEADER - Đã chỉnh sửa đồng bộ với phần Blog */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-amber-900/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-white/20">
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Hành Trình 14 Ngày Đồng Hành Cùng Con</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Thử Thách Smart Play 14 Ngày
              </h1>
              
              <p className="text-amber-50 text-sm sm:text-base max-w-xl leading-relaxed">
                Rèn luyện thói quen vui chơi lành mạnh, giảm bớt thời gian sử dụng màn hình điện tử và thắt chặt tình cảm gia đình mỗi ngày qua từng hoạt động đơn giản.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4 text-amber-200" />
                  <span>14 Ngày thử thách</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Flame className="w-4 h-4 text-amber-200" />
                  <span>Dành cho trẻ 3 - 10 tuổi</span>
                </div>
              </div>
            </div>

            {/* Cột hình ảnh bên phải - Định dạng chuẩn theo phong cách Blog */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-amber-100/80 bg-white group">
                <img
                  src="/challenge.png"
                  alt="Smart Play Guide - Challenge"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* BẢNG TIẾN ĐỘ (PROGRESS DASHBOARD) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Tiến độ hành trình của bạn
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Đã hoàn thành <span className="font-semibold text-amber-600">{completedCount}</span> / {days.length} thử thách
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
                <Share2 className="w-3.5 h-3.5" />
                Chia sẻ
              </button>
              <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition">
                <Bookmark className="w-3.5 h-3.5" />
                Lưu tiến độ
              </button>
            </div>
          </div>

          {/* Thanh progress bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
              <div 
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
              <span>0%</span>
              <span className="text-amber-600 font-semibold">{progressPercent}% Hoàn thành</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* LỘ TRÌNH CHI TIẾT 14 NGÀY */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-800">
              Lộ trình chi tiết từng ngày
            </h3>

            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-200/60 p-1 rounded-xl text-xs sm:text-sm font-medium self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'all' ? 'bg-white text-slate-800 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Tất cả ({days.length})
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'pending' ? 'bg-white text-slate-800 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Cần làm ({days.length - completedCount})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'completed' ? 'bg-white text-slate-800 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Đã xong ({completedCount})
              </button>
            </div>
          </div>

          {/* Danh sách ngày */}
          <div className="space-y-3">
            {filteredDays.map((item) => {
              const isExpanded = expandedDay === item.day;

              return (
                <div 
                  key={item.day}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    item.completed 
                      ? 'border-emerald-200 bg-emerald-50/20' 
                      : 'border-slate-200/80 hover:border-amber-300'
                  }`}
                >
                  {/* Header của thẻ từng ngày */}
                  <div className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none" onClick={() => toggleExpand(item.day)}>
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      {/* Button Đánh dấu hoàn thành */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleComplete(item.day);
                        }}
                        className="text-slate-400 hover:text-emerald-500 transition focus:outline-none"
                      >
                        {item.completed ? (
                          <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500 fill-emerald-50" />
                        ) : (
                          <Circle className="w-6 h-6 sm:w-7 sm:h-7 text-slate-300 hover:text-amber-500" />
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            Ngày {item.day}
                          </span>
                          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {item.duration}
                          </span>
                        </div>
                        <h4 className={`text-sm sm:text-base font-bold transition ${
                          item.completed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}>
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <div className="text-slate-400 p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Nội dung chi tiết mở rộng */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 pt-0 border-t border-slate-100 mt-1 space-y-3 text-xs sm:text-sm text-slate-600 bg-slate-50/50">
                      <div className="pt-3">
                        <p className="font-medium text-slate-700">{item.description}</p>
                      </div>

                      <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200/50 space-y-1">
                        <span className="font-semibold text-amber-900 flex items-center gap-1 text-xs">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          Gợi ý từ chuyên gia:
                        </span>
                        <p className="text-amber-800 text-xs sm:text-sm">
                          {item.tips}
                        </p>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => toggleComplete(item.day)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold transition inline-flex items-center gap-1.5 ${
                            item.completed
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              : 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
                          }`}
                        >
                          {item.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* PHẦN PHẦN THƯỞNG KHI HOÀN THÀNH */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/70 text-center space-y-3">
          <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            Phần Thưởng Đang Chờ Đón Gia Đình Bạn!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Hoàn thành trọn vẹn 14 ngày thử thách để nhận Huy hiệu danh dự cùng Ebook độc quyền "100+ Ý Tưởng Trò Chơi Không Màn Hình Cho Bất Kỳ Dịp Nào".
          </p>
        </div>

      </div>
    </div>
  );
};

export default Challenge;
