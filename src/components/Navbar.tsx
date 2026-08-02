import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

type SessionUser = {
  id: number;
  username: string;
  role: 'student' | 'teacher' | 'admin';
  student_id?: number | null;
  teacher_id?: number | null;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const location = useLocation();

  useEffect(() => {
    const loadSession = () => {
      const userSession = localStorage.getItem('user_session');
      const studentSession = localStorage.getItem('student_session');
      const rawSession = userSession || studentSession;

      if (rawSession) {
        try {
          const sessionData = JSON.parse(rawSession);
          setUser(sessionData);
        } catch (err) {
          console.error('Failed parsing session:', err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadSession();
    window.addEventListener('storage', loadSession);

    return () => {
      window.removeEventListener('storage', loadSession);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    localStorage.removeItem('student_session');
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Layanan', path: '/services' },
    { name: 'Pendaftaran', path: '/registration' },
    { name: 'Kontak Kami', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'student') return '/report';
    return '/admin';
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4">
              <img
                src="/images/logo.png"
                alt="Bright English"
                className="w-18 h-18 rounded-lg"
              />
              <span className="text-1xl font-bold tracking-tight text-slate-900">Bright English Course Palopo</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-blue-600"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 pb-6 px-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-base font-medium ${
                isActive(link.path) ? 'text-blue-600' : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-slate-700 mb-4"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-red-500 font-medium"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}