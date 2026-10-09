import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '@/data/blogPosts';
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Tag,
  Newspaper,
  Heart,
  Share2,
} from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
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

function renderContent(content: string) {
  const paragraphs = content.split('\n\n');
  return paragraphs.map((para, i) => {
    const trimmed = para.trim();
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      const text = trimmed.slice(2, -2);
      return (
        <h3 key={i} className="text-xl font-bold text-neutral-800 mt-8 mb-3">
          {text}
        </h3>
      );
    }
    if (trimmed.startsWith('**') && trimmed.includes('**')) {
      const parts = trimmed.split('**');
      return (
        <p key={i} className="text-neutral-700 leading-relaxed mb-4">
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="font-bold text-neutral-800">{part}</strong> : part
          )}
        </p>
      );
    }
    return (
      <p key={i} className="text-neutral-700 leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts: BlogPost[] = post ? getRelatedPosts(post) : [];
  const loading = false;
  const notFound = !post;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-8 h-8 text-neutral-300 animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <Newspaper className="w-16 h-16 text-neutral-300 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-neutral-800 mb-3">Không tìm thấy bài viết</h1>
        <p className="text-neutral-500 mb-8">Bài viết bạn đang tìm có thể đã bị xóa hoặc chưa được đăng.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white font-semibold rounded-xl hover:bg-neutral-900 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Về trang Blog
        </Link>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-stone-100 via-amber-50 to-teal-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Tất cả bài viết
          </button>

          <div className="flex items-center gap-3 mb-5">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColors[post.category] || 'bg-neutral-100 text-neutral-600'}`}>
              <Tag className="w-3 h-3 inline mr-1" />
              {post.category}
            </span>
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.created_at)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed">{post.excerpt}</p>
          <p className="mt-6 text-sm text-neutral-500">Bởi <span className="font-semibold text-neutral-700">{post.author}</span></p>
        </div>
      </section>

      {/* Cover image */}
      {post.cover_image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <Heart className="w-4 h-4" />
              Cảm ơn bạn đã đọc bài viết này
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-amber-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Chia sẻ
            </button>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-neutral-100 flex flex-col sm:flex-row"
                >
                  <div className="aspect-[3/2] sm:w-40 sm:aspect-auto overflow-hidden shrink-0">
                    {rp.cover_image ? (
                      <img src={rp.cover_image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-100 to-teal-100 flex items-center justify-center">
                        <Newspaper className="w-8 h-8 text-amber-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <span className={`inline-block self-start px-2 py-0.5 rounded-full text-xs font-bold mb-2 ${categoryColors[rp.category] || 'bg-neutral-100 text-neutral-600'}`}>
                      {rp.category}
                    </span>
                    <h3 className="font-bold text-neutral-800 leading-snug mb-2 group-hover:text-amber-600 transition-colors">{rp.title}</h3>
                    <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      Đọc tiếp <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
