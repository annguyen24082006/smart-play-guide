// ============================================================
//  DANH SÁCH BÀI BLOG - CHỈ CẦN SỬA FILE NÀY ĐỂ ĐĂNG / SỬA / XÓA BÀI
// ============================================================
//  - Đăng bài mới : copy nguyên 1 khối { ... }, dán vào danh sách rồi sửa nội dung.
//  - Sửa bài      : sửa trực tiếp trong khối của bài đó.
//  - Xóa bài      : xóa cả khối { ... } (nhớ xóa luôn dấu phẩy sau dấu } nếu cần).
//  - Ẩn bài tạm   : đổi published: true thành published: false.
//
//  Định dạng phần content (viết trong cặp dấu huyền ` `):
//  - Mỗi đoạn cách nhau 1 DÒNG TRỐNG.
//  - Một đoạn chỉ gồm  **Tiêu đề mục**  sẽ hiện thành tiêu đề mục.
//  - **chữ đậm** ở đầu đoạn sẽ in đậm phần đó.
//  - KHÔNG dùng dấu huyền ` và ký tự ${ bên trong nội dung bài.
// ============================================================

export type BlogPostData = {
  id: string;
  title: string;
  slug: string; // đường dẫn: viết thường, không dấu, nối bằng gạch ngang, KHÔNG trùng bài khác
  excerpt: string; // mô tả ngắn hiện ở trang danh sách
  content: string;
  cover_image: string | null; // link ảnh bìa, hoặc null
  author: string;
  category: string; // Hoạt động | Cài đặt | Thử thách | Kiến thức
  created_at: string; // ngày đăng, dạng 'YYYY-MM-DD'
  published: boolean;
};

const posts: BlogPostData[] = [
  {
    id: 'bai-1',
    title: 'Hướng Dẫn Cách Quản Lý Thời Gian Sử Dụng Máy Tính Cho Con Chi Tiết Từ A Đến Z',
    slug: 'huong-dan-quan-ly-thoi-gian-su-dung-may-tinh-cho-con',
    excerpt: 'Hướng dẫn cách quản lý thời gian sử dụng máy tính cho con một cách khoa học, an toàn thông qua tính năng Microsoft Family Safety trên Windows.',
    content: `
      Trong thời đại công nghệ số phát triển vượt bậc, máy tính và Internet đã trở thành những công cụ học tập, giải trí không thể thiếu đối với trẻ em. Việc tiếp cận sớm với thiết bị công nghệ giúp các con mở rộng tri thức, rèn luyện tư duy logic và tiếp cận với các phương pháp giáo dục hiện đại. Tuy nhiên, mặt trái của nó cũng mang lại vô vàn mối lo toan cho các bậc phụ huynh: con dễ sa đà vào các trò chơi điện tử, tiếp xúc với các nội dung độc hại hoặc ngồi trước màn hình quá nhiều giờ liền, gây ảnh hưởng nghiêm trọng đến sức khỏe thể chất lẫn tinh thần.

      Làm thế nào để trẻ vừa tận dụng được lợi ích của máy tính, vừa không rơi vào trạng thái "nghiện" thiết bị? Làm sao để cha mẹ kiểm soát được thời gian con dùng máy mà không cần phải can thiệp thô bạo hay tạo ra những xung đột căng thẳng trong gia đình? Bài viết dưới đây sẽ hướng dẫn bạn cách quản lý thời gian sử dụng máy tính cho con một cách khoa học, an toàn và cực kỳ dễ dàng thông qua tính năng Microsoft Family Safety tích hợp sẵn trên hệ điều hành Windows.

      **1. Lý Do Ba Mẹ Cần Quản Lý Thời Gian Dùng Máy Tính Của Trẻ**

      Trước khi bắt tay vào thực hiện các bước cài đặt kỹ thuật, việc hiểu rõ bản chất và tầm quan trọng của việc thiết lập ranh giới công nghệ cho con là điều rất cần thiết vì tác hại của công nghệ đối với con rất lớn. Cha mẹ không nên xem đây là hành động cấm đoán, mà là giải pháp bảo vệ toàn diện cho sự phát triển của trẻ.

      **Bảo vệ sức khỏe thể chất và thị lực**

      Khi ngồi liên tục trước màn hình máy tính nhiều giờ liền mà không nghỉ ngơi, cơ thể trẻ sẽ gặp phải rất nhiều tác động tiêu cực:

      Thị lực suy giảm: Ánh sáng xanh từ màn hình cùng việc điều tiết mắt liên tục ở khoảng cách gần dễ dẫn đến nguy cơ cận thị, loạn thị, khô mắt và mỏi mắt mãn tính.

      Sai tư thế và ảnh hưởng xương khớp: Trẻ nhỏ thường ngồi không đúng tư thế khi chơi game hoặc xem video, lâu dần dẫn đến cong quẹo cột sống, đau vai cổ.

      Nguy cơ béo phì: Việc ngồi thụ động một chỗ kết hợp với thói quen ăn vặt khi dùng máy tính làm giảm lượng calo tiêu thụ, gia tăng tỷ lệ béo phì ở lứa tuổi học đường.

      **Đảm bảo sự phát triển tâm lý và nhận thức lành mạnh**

      Không gian mạng chứa đựng vô số thông tin đa chiều. Nếu không có sự giám sát từ người lớn, trẻ rất dễ vô tình hoặc cố ý truy cập vào các trang web có nội dung bạo lực, đồi trụy hoặc lừa đảo. Điều này làm lệch lạc nhận thức, gây xáo trộn tâm lý và ảnh hưởng trực tiếp đến sự hình thành nhân cách của con.

      **Rèn luyện thói quen tự giác và quản lý thời gian**

      Một đứa trẻ được thiết lập khung giờ dùng máy rõ ràng sẽ từng bước học được cách quản lý thời gian cá nhân. Con sẽ biết cách sắp xếp thứ tự ưu tiên: hoàn thành bài tập về nhà, giúp đỡ cha mẹ việc nhà trước khi mở máy tính giải trí. Đây là kỹ năng sống cực kỳ quan trọng đồng hành cùng con trong suốt quá trình trưởng thành.

      **Duy trì tương tác xã hội thực tế**

      Khi thời gian sử dụng thiết bị điện tử được kiểm soát ở mức hợp lý, trẻ sẽ có nhiều không gian hơn để giao tiếp trực tiếp với cha mẹ, anh chị em, tham gia các hoạt động thể thao ngoài trời và kết nối với thế giới thực xung quanh.

      **2. Chuẩn Bị Trước Khi Cài Đặt Microsoft Family Safety**

      Hệ điều hành Windows (Windows 10 và Windows 11) được trang bị sẵn công cụ Microsoft Family Safety (Nhóm gia đình Microsoft). Đây là giải pháp hoàn toàn miễn phí, có độ ổn định cao và cực kỳ mạnh mẽ giúp phụ huynh quản lý thiết bị của con.

      Để quá trình thiết lập diễn ra thuận lợi, bạn cần chuẩn bị hai yếu tố cốt lõi sau:

      1. Tài khoản Microsoft của Cha mẹ (Administrator): Đóng vai trò là quản trị viên nhóm gia đình, có toàn quyền thiết lập quy tắc, mở khóa hoặc điều chỉnh thời gian.

      2. Tài khoản Microsoft của Con (Standard User): Tài khoản dành riêng cho trẻ, được phân quyền người dùng tiêu chuẩn để chịu sự quản lý từ tài khoản cha mẹ.

      Lưu ý quan trọng: Bạn tuyệt đối không cho con dùng chung tài khoản Quản trị viên (Administrator) của cha mẹ trên máy tính. Nếu dùng chung tài khoản Administrator, trẻ có thể dễ dàng tắt các tính năng giám sát hoặc thay đổi cài đặt hệ thống.

      **3. Hướng Dẫn Các Bước Cài Đặt Chi Tiết Trên Máy Tính**

      Dưới đây là quy trình từng bước giúp bạn kết nối và thiết lập tính năng quản lý thời gian cho con trên máy tính Windows.

      **Bước 1: Mở giao diện Cài đặt tài khoản trên Windows**

      Trên bàn phím máy tính, bạn nhấn tổ hợp phím Win + I để mở nhanh cửa sổ Settings (Cài đặt).

      Tại danh sách menu bên trái, nhấp chọn mục Accounts (Tài khoản).

      Tiếp theo, chọn mục Family & other users (Gia đình & người dùng khác) ở giao diện bên phải.

      **Bước 2: Thêm tài khoản của con vào Nhóm gia đình**

      Tại mục Your family (Gia đình của bạn), nhấp chọn nút Add account (hoặc Add a family member).

      Cửa sổ thiết lập tài khoản Microsoft sẽ hiện ra: Nếu con đã có email Microsoft, bạn chỉ cần nhập địa chỉ email của con (dạng @outlook.com hoặc @hotmail.com) rồi nhấn Next. Nếu con chưa có email, nhấp vào dòng chữ Create one for a child (Tạo tài khoản cho trẻ) và làm theo hướng dẫn trên màn hình để đăng ký một địa chỉ email mới dành riêng cho con.

      **Bước 3: Xác nhận lời mời gia nhập nhóm gia đình**

      Sau khi nhập email của con, hệ thống Microsoft sẽ gửi một thư mời tham gia Nhóm gia đình.

      Bạn mở trình duyệt web, đăng nhập vào hòm thư email của con và nhấn Accept Invitation (Chấp nhận lời mời) để hoàn tất việc liên kết tài khoản của con với tài khoản quản lý của cha mẹ.

      **Bước 4: Chuyển đổi loại tài khoản trên máy tính sang Standard User**

      Quay lại cửa sổ Settings - Accounts - Family & other users.

      Nhấp vào tên tài khoản của con vừa được thêm vào máy.

      Chọn Change account type (Thay đổi loại tài khoản).

      Tại mục Account type, đảm bảo chọn là Standard User (Người dùng tiêu chuẩn) thay vì Administrator, sau đó nhấn OK.

      **4. Cấu Hình Giới Hạn Thời Gian Và Lọc Nội Dung Trên Trang Quản Lý**

      Sau khi đã liên kết tài khoản thành công, cha mẹ có thể dùng điện thoại hoặc máy tính cá nhân truy cập vào trang quản lý trung tâm của Microsoft để tiến hành cài đặt các hạn mức.

      **1. Giới hạn thời gian màn hình (Screen Time)**

      Truy cập trang web family.microsoft.com và đăng nhập bằng tài khoản Microsoft của cha mẹ.

      Chọn tên tài khoản của con - tìm đến mục Screen time (Thời gian sử dụng màn hình).

      Cài đặt số giờ dùng tối đa trong ngày: Bạn có thể quy định tổng số giờ con được phép mở máy trong ngày (ví dụ: 1 giờ/ngày vào các ngày từ thứ Hai đến thứ Sáu, và 2 giờ/ngày vào thứ Bảy, Chủ Nhật).

      Cài đặt khung giờ cho phép đăng nhập: Bạn có thể đặt khoảng thời gian cố định trong ngày mà máy tính cho phép đăng nhập (ví dụ: chỉ cho mở máy từ 19:00 đến 20:30). Ngoài khung giờ này, dù chưa dùng hết số giờ quy định, máy tính vẫn sẽ tự động khóa lại.

      **2. Quản lý ứng dụng và Trò chơi (App & Game Limits)**

      Chọn mục App and game limits (Giới hạn ứng dụng và trò chơi) trên thanh menu.

      Bật tính năng giới hạn ứng dụng. Hệ thống sẽ hiển thị danh sách các phần mềm, game mà con đã mở trên máy tính.

      Bạn có thể đặt hạn mức thời gian cho riêng từng ứng dụng cụ thể (ví dụ: chỉ cho phép chơi game Roblox hoặc Minecraft 30 phút mỗi ngày) hoặc chặn hoàn toàn không cho phép khởi chạy các ứng dụng chưa phù hợp.

      **3. Lọc trang web và Nội dung không an toàn (Content Filters)**

      Truy cập mục Content filters (Bộ lọc nội dung).

      Tại phần Web and search (Web và tìm kiếm), bật tính năng Filter inappropriate websites (Lọc các trang web không phù hợp).

      Tính năng này sẽ tự động chặn các nội dung người lớn trên trình duyệt Microsoft Edge và kích hoạt chế độ tìm kiếm an toàn (SafeSearch).

      Ngoài ra, phụ huynh có thể thêm các đường link cụ thể vào danh sách Always allowed (Luôn cho phép) hoặc Never allowed (Luôn chặn) theo nhu cầu thực tế.

      **5. Những Nguyên Tắc Vàng Giúp Ba Mẹ Đồng Hành Cùng Con**

      Công cụ phần mềm dù hiện đại đến đâu cũng chỉ đóng vai trò hỗ trợ. Sự thấu hiểu, tôn trọng và hợp tác chân thành giữa cha mẹ với con cái mới là yếu tố quyết định giúp trẻ sử dụng máy tính hiệu quả.

      Thảo luận công khai: Hãy ngồi lại giải thích rõ ràng cho con hiểu lý do tại sao gia đình cần thiết lập các quy định này. Tránh thái độ cấm đoán, áp đặt tiêu cực khiến con cảm thấy bị kiểm soát hay mất tự do.

      Cùng con đặt quy tắc chung: Hãy cùng con xây dựng một "Bản hợp đồng sử dụng thiết bị". Ví dụ: Quy định rõ không sử dụng máy tính trong bữa ăn gia đình, không mang máy tính vào phòng ngủ sau 21:30.

      Khen thưởng hợp lý: Khi con thực hiện tốt các quy định và tự giác tắt máy đúng giờ, cha mẹ hãy dành những lời khen ngợi động viên hoặc thưởng thêm thời gian giải trí vào dịp cuối tuần.

      Làm gương cho con: Cha mẹ chính là tấm gương phản chiếu của con cái. Bản thân phụ huynh cũng cần hạn chế việc tập trung quá nhiều vào điện thoại, máy tính khi ở bên cạnh con.

      **Kết Luận**

      Việc quản lý thời gian sử dụng máy tính cho con không phải là rào cản ngăn con tiếp cận tri thức công nghệ, mà chính là chiếc "đai an toàn" giúp con trưởng thành một cách lành mạnh và vững vàng trên không gian mạng. Bằng việc kết hợp hài hòa giữa công cụ quản lý an toàn Microsoft Family Safety và sự đồng hành, chia sẻ từ cha mẹ, bạn hoàn toàn có thể giúp con hình thành thói quen sử dụng công nghệ văn minh, hiệu quả.

      **Để Hiểu Rõ Hơn Các Bước, Mẹ Hãy Ấn Vào Video Hướng Dẫn Chi Tiết Dưới Đây:**

      Xem Video Hướng Dẫn Quản Lý Thời Gian Dùng Máy Tính Cho Con Tại Đây: https://www.youtube.com/watch?v=X_4oqK5GEVo

      **Khám Phá Thêm Các Nội Dung Hữu Ích Khác**

      Đừng bỏ lỡ các bài viết và video hướng dẫn tiếp theo của chúng tôi để trang bị thêm nhiều kiến thức bổ ích trong việc chăm sóc và giáo dục con cái:

      - Xem tiếp: Các giải pháp bảo vệ con an toàn trên không gian mạng (https://www.youtube.com/watch?v=X_4oqK5GEVo)
      - Xem tiếp: Hướng dẫn thiết lập an toàn cho trẻ trên kênh YouTube (https://www.youtube.com/watch?v=En9pqC58ZcE)
    `,
    cover_image: null,
    author: 'Smart Play Guide',
    category: 'Cài đặt',
    created_at: '2026-10-09',
    published: true,
  },
];

// ---------------- Các hàm hỗ trợ (không cần sửa) ----------------

// Làm sạch nội dung: bỏ thụt đầu dòng, thống nhất ký tự xuống dòng
function cleanContent(content: string): string {
  return content
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim();
}

function byNewest(a: BlogPostData, b: BlogPostData) {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export function getPublishedPosts(): BlogPostData[] {
  return posts
    .filter((p) => p.published)
    .map((p) => ({ ...p, content: cleanContent(p.content) }))
    .sort(byNewest);
}

export function getPostBySlug(slug: string): BlogPostData | undefined {
  return getPublishedPosts().find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPostData, limit = 2): BlogPostData[] {
  return getPublishedPosts()
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, limit);
}
