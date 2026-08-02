import { useEffect, useState } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, UserCircle, GraduationCap, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types';
import { apiPost } from '../lib/api';

type SessionAccount = {
  id: number;
  student_id?: number | null;
  teacher_id?: number | null;
  username: string;
  role: UserRole;
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const getDashboardPath = (role: UserRole) => {
    if (role === 'admin') return '/admin';
    if (role === 'teacher') return '/admin';
    return '/report';
  };

  useEffect(() => {
    const studentSession = localStorage.getItem('student_session');
    const userSession = localStorage.getItem('user_session');
    const rawSession = userSession || studentSession;

    if (rawSession) {
      try {
        const parsed: SessionAccount = JSON.parse(rawSession);
        navigate(getDashboardPath(parsed.role));
      } catch (err) {
        console.error('Failed to parse session:', err);
      }
    }
  }, [navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await apiPost('/api/login', {
        username: email,
        password: password,
      });

      if (!response.success) {
        setError(response.message || 'Username atau password salah');
        return;
      }

      const account: SessionAccount = response.account;

      if (account.role !== selectedRole) {
        setError(`Akun Anda terdaftar sebagai ${account.role}, bukan ${selectedRole}.`);
        return;
      }

      if (account.role === 'student') {
        localStorage.setItem('student_session', JSON.stringify(account));
        localStorage.removeItem('user_session');
      } else {
        localStorage.setItem('user_session', JSON.stringify(account));
        localStorage.removeItem('student_session');
      }

      navigate(getDashboardPath(account.role));
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-slate-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Login Portal</h1>
          <p className="text-slate-500">Pilih akses Anda dan masuk ke sistem.</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { id: 'student', label: 'Siswa', icon: GraduationCap, colorClass: 'border-blue-600 bg-blue-50 text-blue-600' },
            { id: 'teacher', label: 'Guru', icon: UserCircle, colorClass: 'border-emerald-600 bg-emerald-50 text-emerald-600' },
            { id: 'admin', label: 'Admin', icon: ShieldCheck, colorClass: 'border-purple-600 bg-purple-50 text-purple-600' },
          ].map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelectedRole(role.id as UserRole)}
              className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                selectedRole === role.id
                  ? role.colorClass
                  : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
              }`}
            >
              <role.icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {role.label}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Username / Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                required
                className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Username atau email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password"
                required
                className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:opacity-50 ${
              selectedRole === 'student'
                ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
                : selectedRole === 'teacher'
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
                : 'bg-purple-600 hover:bg-purple-700 shadow-purple-100'
            }`}
          >
            {isLoading
              ? 'Memproses...'
              : `Masuk sebagai ${
                  selectedRole === 'student'
                    ? 'Siswa'
                    : selectedRole === 'teacher'
                    ? 'Guru'
                    : 'Admin'
                }`}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Belum punya akun?{' '}
          <span className="text-blue-600 font-bold cursor-pointer hover:underline">
            Hubungi Admin
          </span>
        </p>
      </motion.div>
    </div>
  );
}