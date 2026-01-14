import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  Dumbbell,
} from "lucide-react";
import AuthModal from "./AuthModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/", isScroll: true, id: "home" },
    { name: "Blogs", path: "/blog", isScroll: false, id: null },
    { name: "Plans", path: "/plans", isScroll: false, id: null },
    { name: "Tools", path: "/tools", isScroll: false, id: null },
    { name: "Diet Plans", path: "/diet-plans", isScroll: false, id: null },
    { name: "FAQs", path: "/faq", isScroll: false, id: null },
    { name: "Contact", path: "/contact", isScroll: false, id: null },
  ];

  const handleNavClick = (item: any) => {
    setIsMenuOpen(false);
    if (item.isScroll && item.id) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document
            .getElementById(item.id)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document
          .getElementById(item.id)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-premium-black text-white selection:bg-gold selection:text-black">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-premium-black/80 backdrop-blur-md shadow-sm border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="text-gold p-1.5 transform group-hover:rotate-12 transition-transform">
                <Dumbbell size={28} strokeWidth={1.5} />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight text-white">
                Eugen<span className="text-gold"> FnF</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-sm font-medium text-gray-400 hover:text-gold transition-colors uppercase tracking-wider"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Profile & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gold border border-gold/30 rounded-full hover:bg-gold hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
              >
                <User size={18} />
                <span className="hidden sm:inline">Member Login</span>
              </button>

              <button
                className="md:hidden text-gold focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-premium-dark border-t border-white/10 absolute w-full left-0 top-20 z-30">
            <div className="flex flex-col px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-gold hover:bg-white/5 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t-2 border-white/10 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="text-gold">
                  <Dumbbell size={24} />
                </div>
                <span className="text-xl font-heading font-bold">
                  Eugen<span className="text-gold"> FnF</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Elite training for those who demand excellence. Experience the
                pinnacle of fitness and nutrition coaching.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-gold transition-colors"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/plans"
                    className="hover:text-gold transition-colors"
                  >
                    Premium Plans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/diet-plans"
                    className="hover:text-gold transition-colors"
                  >
                    Diet Plans (New)
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-gold transition-colors"
                  >
                    Apply for Membership
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white">
                Legal
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-gold transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gold transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gold transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white">
                Connect
              </h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-black hover:bg-gold p-3 rounded-full transition-all"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-black hover:bg-gold p-3 rounded-full transition-all"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-black hover:bg-gold p-3 rounded-full transition-all"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-16 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Eugen FnF. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default Layout;
