import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Newspaper, Calendar, ArrowRight, Loader2, Tag, Search } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  author: string;
  category: string;
  created_at: string;
};

const categoryColors: Record<string, string> = {
  'Hoạt động': 'bg-teal-100 text-teal-700',
  'Cài đặt': 'bg-cyan-100 text-cyan-700',
  'Thử thách': 'bg-amber-100 text-amber-700',
  'Kiến thức': 'bg-rose-100 text-rose-700',
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
    } else if (data) {
      setPosts(data as BlogPost[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const categories = ['Tất cả', ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'Tất cả' || post.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Header thiết kế tươi sáng, dùng ảnh blog.png chuẩn phong cách About Us */}
      <section className="relative w-full overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Ảnh nền phủ tự nhiên */}
        <div className="absolute inset-0 z-0">
          <img
            src="/blog.png"
            alt="Smart Play Guide - Blog"
            className="w-full h-full object-cover object-right-bottom"
          />
        </div>

        {/* Nội dung chữ trên nền ảnh */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 text-amber-700 border border-amber-200/60 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm backdrop-blur-sm">
              <Newspaper className="w-4 h-4 text-amber-500" />
              Smart Play Guide · Blog
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 leading-[1.15] mb-6 tracking-tight">
              Bài viết từ chiến dịch
            </h1>
            
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium">
              Chia sẻ kiến thức, kinh nghiệm và câu chuyện về việc kết nối cùng con.
              Các bài viết được nhóm thực hiện nghiên cứu và biên soạn kỹ lưỡng.
            </p>
          </div>
        </div>
      </section>

      {/* Danh sách bài viết */}
      <section className="py-16 bg-white relative z-10 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tìm kiếm & Lọc category */}
          <div className="flex flex-col lg:flex-row gap-4 mb-12">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài viết..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-neutral-800 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-neutral-300 animate-spin" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 rounded-3xl">
              <Newspaper className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-400">Chưa có bài viết nào trong mục này.</p>
            </div>
          ) : (
            <>
              {/* Bài viết nổi bật (Featured Post) */}
              {featuredPost && (
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="group block mb-12 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                      {featuredPost.cover_image ? (
                        <img
                          src={featuredPost.cover_image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-100 to-teal-100 flex items-center justify-center">
                          <Newspaper className="w-16 h-16 text-amber-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center bg-white">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColors[featuredPost.category] || 'bg-neutral-100 text-neutral-600'}`}>
                          {featuredPost.category}
                        </span>
                        <span className="text-xs text-neutral-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(featuredPost.created_at)}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 leading-tight mb-4 group-hover:text-amber-600 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-neutral-600 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">Bởi {featuredPost.author}</span>
                        <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-sm group-hover:gap-2 transition-all">
                          Đọc tiếp <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Các bài viết khác */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-neutral-100"
                  >
                    <div className="aspect-[3/2] overflow-hidden">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-100 to-teal-100 flex items-center justify-center">
                          <Newspaper className="w-12 h-12 text-amber-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryColors[post.category] || 'bg-neutral-100 text-neutral-600'}`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-neutral-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-800 leading-snug mb-2 group-hover:text-amber-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        Đọc tiếp <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
