/*
# Create blog_posts table (single-tenant, no auth)

1. New Tables
- `blog_posts`: stores SEO blog articles written by the campaign team.
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `slug` (text, unique, not null) — URL-friendly identifier
  - `excerpt` (text, not null) — short summary for list view
  - `content` (text, not null) — full article body (markdown-style plain text with \n\n paragraphs)
  - `cover_image` (text, nullable) — optional cover image URL
  - `author` (text, not null) — author display name
  - `category` (text, not null) — e.g. "Hoạt động", "Cài đặt", "Thử thách", "Kiến thức"
  - `published` (boolean, default true) — only published posts show on the blog
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on blog_posts.
- Allow anon + authenticated SELECT (public blog) and full CRUD (single-tenant shared app).
3. Seed Data
- Insert 3 sample blog posts to populate the blog on first load.
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  cover_image text,
  author text NOT NULL,
  category text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_blog_posts" ON blog_posts;
CREATE POLICY "anon_select_blog_posts" ON blog_posts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_blog_posts" ON blog_posts;
CREATE POLICY "anon_insert_blog_posts" ON blog_posts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_blog_posts" ON blog_posts;
CREATE POLICY "anon_update_blog_posts" ON blog_posts FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_blog_posts" ON blog_posts;
CREATE POLICY "anon_delete_blog_posts" ON blog_posts FOR DELETE
  TO anon, authenticated USING (true);

INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, author, category) VALUES
(
  '5 hoạt động sáng tạo cùng con không cần màn hình',
  '5-hoat-dong-sang-tao-cung-con-khong-can-man-hinh',
  'Ba mẹ bận rộn nhưng vẫn muốn chất lượng thời gian bên con? Khám phá 5 hoạt động DIY đơn giản giúp cả nhà vui vẻ mà không cần thiết bị điện tử.',
  'Trong thời đại số, việc tìm ra những hoạt động không cần màn hình để làm cùng con trở nên quan trọng hơn bao giờ hết. Dưới đây là 5 gợi ý đơn giản mà bất kỳ ba mẹ nào cũng có thể áp dụng ngay tại nhà.

**1. Vẽ tranh tự do**

Chuẩn bị một tờ giấy lớn và màu vẽ, để con tự do sáng tạo mà không cần chủ đề cụ thể. Điều quan trọng không phải là bức tranh đẹp mà là quá trình con được biểu đạt cảm xúc.

**2. Làm đồ chơi từ hộp giấy**

Hộp giấy cũ có thể biến thành ô tô, nhà nhỏ, hoặc robot. Hoạt động này giúp con phát triển trí tưởng tượng và kỹ năng tay chân.

**3. Trồng cây mini**

Cùng con trồng một chậu cây nhỏ và học cách chăm sóc mỗi ngày. Đây là cách tuyệt vời để dạy con về trách nhiệm và kiên nhẫn.

**4. Đọc sách và kể chuyện**

Đọc sách cùng con không chỉ phát triển ngôn ngữ mà còn tạo kỷ niệm ấm áp. Hãy thử để con tự kể lại câu chuyện theo cách hiểu của con.

**5. Nấu ăn đơn giản**

Cho con tham gia vào việc chuẩn bị bữa ăn với những công việc phù hợp độ tuổi như rửa rau, trộn salad. Con sẽ cảm thấy tự hào khi được góp phần vào bữa cơm gia đình.',
  'https://images.pexels.com/photos/6962218/pexels-photo-6962218.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Nhóm Kết nối cùng con',
  'Hoạt động'
),
(
  'Hướng dẫn thiết lập Screen Time trên iPhone cho con',
  'huong-dan-thiet-lap-screen-time-tren-iphone-cho-con',
  'Screen Time là công cụ mạnh mẽ giúp ba mẹ quản lý thời gian sử dụng thiết bị của con. Bài viết hướng dẫn chi tiết từng bước.',
  'Screen Time trên iPhone và iPad là một trong những công cụ hiệu quả nhất để ba mẹ kiểm soát thời gian và nội dung mà con tiếp cận trên thiết bị.

**Bước 1: Mở Screen Time**

Vào Cài đặt > Thời gian sử dụng. Bạn sẽ thấy biểu đồ thời gian sử dụng thiết bị trong ngày.

**Bước 2: Bật giới hạn ứng dụng**

Chọn Giới hạn ứng dụng, thêm nhóm ứng dụng cần hạn chế và đặt thời gian tối đa mỗi ngày. Khi hết thời gian, ứng dụng sẽ bị khóa và hiển thị màn hình chờ.

**Bước 3: Lọc nội dung**

Vào Hạn chế nội dung & quyền riêng tư để kiểm soát nội dung web, ứng dụng và mua hàng. Bạn có thể chặn nội dung người lớn và giới hạn độ tuổi cho phim, sách, ứng dụng.

**Bước 4: Đặt mật mã**

Đặt mật mã Screen Time riêng để con không thể tự thay đổi cài đặt. Hãy chọn mật mã khác với mã mở máy.

**Lưu ý quan trọng**

Nên cùng con thảo luận về các giới hạn trước khi áp dụng. Khi con hiểu lý do, con sẽ hợp tác tốt hơn và ít phản kháng hơn.',
  'https://images.pexels.com/photos/36698020/pexels-photo-36698020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Nhóm Kết nối cùng con',
  'Cài đặt'
),
(
  'Thử thách 14 ngày: Vì sao kết nối cùng con quan trọng hơn bao giờ hết',
  'thu-thach-14-ngay-vi-sao-ket-noi-cung-con-quan-trong-hon-bao-gio-het',
  'Tham gia challenge 14 ngày cùng con không chỉ là một trò chơi — đó là hành trình xây dựng thói quen kết nối bền vững cho cả gia đình.',
  'Trong một thế giới mà màn hình ngày càng chiếm nhiều thời gian của cả người lớn và trẻ em, việc tạo ra những khoảnh khắc kết nối thật sự trở nên quan trọng hơn bao giờ hết.

**Thử thách 14 ngày là gì?**

Đây là một hành trình ngắn nhưng đủ dài để hình thành thói quen. Mỗi ngày, ba mẹ và con cùng thực hiện một hoạt động nhỏ — từ vẽ tranh, đọc sách, đến đi dạo ngoài trời.

**Vì sao 14 ngày?**

Nghiên cứu cho thấy cần khoảng 21 ngày để hình thành một thói quen mới. 14 ngày là bước đệm hoàn hảo — đủ để cảm thấy sự thay đổi, nhưng không quá dài để nản chí.

**Giải thưởng mang dấu ấn cá nhân**

Khi hoàn thành đủ 14 ngày, gia đình sẽ nhận được một giải thưởng độc đáo, được thiết kế riêng. Không phải phần thưởng vật chất đắt tiền, mà là một kỷ niệm tangible mang đậm dấu ấn của gia đình bạn.

**Cách tham gia**

Đơn giản: vào trang Challenge, chọn ngày bạn muốn bắt đầu, làm hoạt động trong ngày, và đăng tải ảnh hoàn thành. Hãy để kỷ niệm được lưu giữ và chia sẻ cùng cộng đồng.',
  'https://images.pexels.com/photos/19080464/pexels-photo-19080464.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Nhóm Kết nối cùng con',
  'Thử thách'
)
ON CONFLICT (slug) DO NOTHING;
