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
  // ---------- BÀI MẪU (đang ẩn). Copy khối này để tạo bài mới ----------
  {
    id: 'mau-1',
    title: 'Tiêu đề bài viết SEO của em',
    slug: 'tieu-de-bai-viet-seo-cua-em',
    excerpt: 'Mô tả ngắn 1-2 câu hiện ở trang danh sách blog.',
    content: `
      Đoạn mở đầu của bài viết.

      **Tiêu đề mục 1**

      Nội dung mục 1.

      **Tiêu đề mục 2**

      Nội dung mục 2.
    `,
    cover_image: null,
    author: 'Smart Play Guide',
    category: 'Kiến thức',
    created_at: '2026-10-09',
    published: false, // đổi thành true khi muốn đăng
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
