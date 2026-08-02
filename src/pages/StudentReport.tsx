import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Calendar,
  MessageSquare,
  TrendingUp,
  Award,
  User,
  FileText,
  Phone,
  Mail,
  MapPin,
  Users
} from 'lucide-react';

type ReportType = {
  id: number;
  student_id: number;
  student_name: string;
  reading: number;
  writing: number;
  speaking: number;
  listening: number;
  attendance: number;
  feedback: string;
  updated_at: string;
};

type StudentProfile = {
  id: number;
  name: string;
  email: string;
  phone: string;
  birth_date: string;
  age: number;
  address: string;
  parent_name: string;
  parent_phone: string;
  level: string;
  schedule: string;
  time_slot: string;
};

type StudentSession = {
  id: number;
  username: string;
  role: 'student';
  student_id?: number | null;
};

export default function StudentReport() {
  const [activeTab, setActiveTab] = useState<'profile' | 'report'>('profile');
  const [report, setReport] = useState<ReportType | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const timeSlots = [
    '09.00 - 10.30',
    '10.45 - 12.15',
    '13.00 - 14.30',
    '14.30 - 16.00',
    '16.30 - 18.00',
    '18.30 - 20.00'
  ];

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const rawSession = localStorage.getItem('student_session');

        if (!rawSession) {
          setLoading(false);
          return;
        }

        const session: StudentSession = JSON.parse(rawSession);

        if (!session.student_id) {
          setLoading(false);
          return;
        }

        const [profileRes, reportRes] = await Promise.all([
          fetch(`/api/student/profile?studentId=${session.student_id}`),
          fetch(`/api/report/me?studentId=${session.student_id}`)
        ]);

        const profileData = await profileRes.json();
        const reportData = await reportRes.json();

        if (profileData.success && profileData.profile) {
          setProfile(profileData.profile);
        }

        if (reportData.success && reportData.report) {
          setReport(reportData.report);
        }
      } catch (error) {
        console.error('Load student data error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, []);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!profile) return;

    const value =
      e.target.name === 'age' ? Number(e.target.value) : e.target.value;

    setProfile({
      ...profile,
      [e.target.name]: value
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);

    try {
      const response = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || 'Gagal menyimpan profil');
        return;
      }

      alert('Profil berhasil diperbarui');
    } catch (error) {
      console.error('Save profile error:', error);
      alert('Terjadi kesalahan saat menyimpan profil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const averageScore = report
    ? (report.reading + report.writing + report.speaking + report.listening) / 4
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Dashboard Siswa</h2>

            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-all ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-semibold">Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('report')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-all ${
                  activeTab === 'report'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Raport</span>
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && profile && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Profile Siswa</h1>
                <p className="text-slate-500">
                  Perbarui data pribadi Anda di bawah ini.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={profile.name || ''}
                        onChange={handleProfileChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={profile.email || ''}
                        onChange={handleProfileChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nomor HP
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        name="phone"
                        value={profile.phone || ''}
                        onChange={handleProfileChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      name="birth_date"
                      value={profile.birth_date || ''}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Umur
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={profile.age || 0}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Program
                    </label>
                    <select
                      name="level"
                      value={profile.level || ''}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option value="Kids">Kids (SD)</option>
                      <option value="Teens">Teens (SMP/SMA)</option>
                      <option value="Adult">Adult (Umum)</option>
                      <option value="TOEFL / IELTS">TOEFL / IELTS Prep</option>
                      <option value="Coaching">Private Coaching</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Alamat
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                    <textarea
                      name="address"
                      rows={3}
                      value={profile.address || ''}
                      onChange={handleProfileChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nama Orang Tua
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        name="parent_name"
                        value={profile.parent_name || ''}
                        onChange={handleProfileChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nomor HP Orang Tua
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        name="parent_phone"
                        value={profile.parent_phone || ''}
                        onChange={handleProfileChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Jadwal
                    </label>
                    <select
                      name="schedule"
                      value={profile.schedule || 'Senin, Selasa, Rabu'}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option value="Senin, Selasa, Rabu">Senin, Selasa, Rabu</option>
                      <option value="Rabu, Kamis, Jumat">Rabu, Kamis, Jumat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Jam Belajar
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() =>
                            setProfile({
                              ...profile,
                              time_slot: slot
                            })
                          }
                          className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                            profile.time_slot === slot
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100'
                              : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === 'report' && (
            <>
              {!report ? (
                <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-slate-100">
                  <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Calendar className="text-blue-600 w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Belum Ada Laporan</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Laporan kemajuan akademik Anda belum diunggah oleh pengajar Anda.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h1 className="text-4xl font-bold text-slate-900 mb-2">Raport Siswa</h1>
                      <p className="text-slate-500">Selamat datang kembali, {report.student_name}</p>
                    </div>
                    <div className="mt-4 md:mt-0 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                      <span className="text-sm text-slate-500 font-medium">Terakhir Diperbarui: </span>
                      <span className="text-sm font-bold text-slate-900">
                        {new Date(report.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 lg:col-span-1">
                      <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                        <GraduationCap className="text-blue-600 w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                        Identitas Siswa
                      </p>
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs text-slate-500 block">Nama Lengkap</span>
                          <span className="font-bold text-slate-900">{report.student_name}</span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 block">ID Siswa</span>
                          <span className="font-mono text-xs text-slate-700">{report.student_id}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 lg:col-span-2">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                          <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-indigo-600 w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">Nilai Kemampuan</h3>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                            Rata-rata
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            {averageScore.toFixed(1)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {[
                          { label: 'Reading', score: report.reading, color: 'text-blue-600' },
                          { label: 'Writing', score: report.writing, color: 'text-emerald-600' },
                          { label: 'Speaking', score: report.speaking, color: 'text-purple-600' },
                          { label: 'Listening', score: report.listening, color: 'text-amber-600' },
                        ].map((item) => (
                          <div key={item.label} className="text-center">
                            <div className="relative w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle
                                  cx="40"
                                  cy="40"
                                  r="36"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="transparent"
                                  className="text-slate-100"
                                />
                                <circle
                                  cx="40"
                                  cy="40"
                                  r="36"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="transparent"
                                  strokeDasharray={226}
                                  strokeDashoffset={226 - (226 * item.score) / 100}
                                  className={`${item.color} transition-all duration-1000`}
                                />
                              </svg>
                              <span className="absolute text-xl font-bold text-slate-900">
                                {item.score}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              {item.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                      <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                        <Calendar className="text-emerald-600 w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Kehadiran
                      </p>
                      <h3 className="text-4xl font-bold text-slate-900">{report.attendance}%</h3>
                      <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full"
                          style={{ width: `${report.attendance}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                      <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                        <Award className="text-amber-600 w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Pencapaian
                      </p>
                      <h3 className="text-4xl font-bold text-slate-900">
                        {averageScore >= 70 ? 'Elite' : 'Standard'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-4 font-medium">
                        Terus pertahankan kerja keras Anda!
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center space-x-4">
                      <div className="bg-slate-100 p-3 rounded-xl">
                        <MessageSquare className="text-slate-600 w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Umpan Balik Pengajar</h3>
                    </div>
                    <div className="p-8">
                      <p className="text-slate-600 leading-relaxed italic text-lg">
                        "{report.feedback}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}