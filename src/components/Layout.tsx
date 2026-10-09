import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Heart, Sparkles, MapPin, Phone, Mail, Facebook } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/ve-chung-toi', label: 'Về chúng tôi' },
  { to: '/huong-dan-cai-dat', label: 'Thời gian cùng bé' },
  { to: '/hoat-dong-cung-con', label: 'Hoạt động cùng con' },
  { to: '/challenge', label: 'Challenge' },
  { to: '/bang-xep-hang', label: 'Bảng xếp hạng' },
  { to: '/blog', label: 'Blog' },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-white/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <span className="text-lg font-bold text-neutral-800">Smart Play</span>
              <span className="text-lg font-bold text-teal-500"> Guide</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 bg-stone-100/80 rounded-full p-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-white bg-teal-500 shadow-sm'
                      : 'text-neutral-600 hover:text-teal-700 hover:bg-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-neutral-100 animate-fade-in">
            <div className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-teal-600 bg-teal-50'
                        : 'text-neutral-600 hover:text-teal-600 hover:bg-neutral-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <footer className="bg-neutral-800 text-neutral-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-[1.2fr_0.8fr_1fr_1.4fr] gap-8">
            {/* Cột 1: Thương hiệu */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" fill="white" />
                </div>
                <span className="text-lg font-bold text-white">Smart Play Guide</span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-400">
                Smart Play Guide là chiến dịch giúp phụ huynh kết nối sâu sắc với con cái thông qua hoạt động sáng tạo và thử thách 14 ngày.
              </p>
            </div>

            {/* Cột 2: Điều hướng */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Điều hướng</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-neutral-400 hover:text-teal-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột 3: Tinh thần chiến dịch */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tinh thần chiến dịch</h4>
              <div className="flex items-start gap-2 text-sm text-neutral-400">
                <Sparkles className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>Mỗi ngày bên con là một kỷ niệm mới. Không cần hoàn hảo, chỉ cần chân thành.</span>
              </div>
            </div>

            {/* Cột 4: Liên hệ */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Liên hệ</h4>
              <p className="text-sm font-semibold text-amber-300 mb-4">
                Kết nối cùng chúng tôi để cùng lan toả giá trị cho cộng đồng
              </p>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                  <span>Địa chỉ: Km 9, đường Nguyễn Trãi, phường Đại Mỗ, thành phố Hà Nội</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                  <span>
                    Điện thoại:{' '}
                    <a href="tel:+84862417415" className="hover:text-teal-400 transition-colors">
                      (+84) 862 417 415
                    </a>{' '}
                    (Ms. Phương Thảo)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                  <span>
                    Email:{' '}
                    <a href="mailto:smartplayguide67@gmail.com" className="hover:text-teal-400 transition-colors break-all">
                      smartplayguide67@gmail.com
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Facebook className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                  <span>
                    Facebook:{' '}
                    <a
                      href="https://www.facebook.com/share/1FA4NPGGtB/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-teal-400 transition-colors break-all"
                    >
                      facebook.com/share/1FA4NPGGtB
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-700 text-center text-sm text-neutral-500">
            <p>© 2026 Smart Play Guide. Tạo với tất cả yêu thương.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
