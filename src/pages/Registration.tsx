import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, BookOpen, Clock, Send, CheckCircle2, Calendar, MapPin, Users } from 'lucide-react';
import { apiPost } from '../lib/api';

export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    age: '',
    address: '',
    parentName: '',
    parentPhone: '',
    level: 'Kids',
    schedule: 'Senin, Selasa, Rabu',
    timeSlot: '09.00 - 10.30',
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await apiPost('/api/register', {
        student: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate,
          age: parseInt(formData.age) || 0,
          address: formData.address,
          parentName: formData.parentName,
          parentPhone: formData.parentPhone,
          level: formData.level,
          schedule: formData.schedule,
          timeSlot: formData.timeSlot
        },
        account: {
          username: formData.username,
          password: formData.password
        }
      });

      if (response.success) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          birthDate: '',
          age: '',
          address: '',
          parentName: '',
          parentPhone: '',
          level: 'Kids',
          schedule: 'Senin, Selasa, Rabu',
          timeSlot: '09.00 - 10.30',
          username: '',
          password: ''
        });
      } else {
        setError('Gagal mengirim pendaftaran. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Gagal mengirim pendaftaran. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const timeSlots = [
    '09.00 - 10.30',
    '10.45 - 12.15',
    '13.00 - 14.30',
    '14.30 - 16.00',
    '16.30 - 18.00',
    '18.30 - 20.00'
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pendaftaran Berhasil!</h2>
          <p className="text-slate-600 mb-8">
            Terima kasih telah mendaftar di Bright English Course. Tim kami akan segera menghubungi Anda melalui WhatsApp atau Email untuk langkah selanjutnya.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all"
          >
            Daftar Lagi
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Formulir Pendaftaran
          </motion.h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Lengkapi data diri Anda di bawah ini untuk memulai perjalanan belajar Bahasa Inggris bersama kami.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 bg-blue-600 p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">Informasi Penting</h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-sm opacity-90">Proses verifikasi data memakan waktu maksimal 1x24 jam.</p>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-sm opacity-90">Pastikan nomor WhatsApp Anda aktif untuk konfirmasi jadwal.</p>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-sm opacity-90">Pembayaran dilakukan setelah jadwal belajar dikonfirmasi.</p>
                </li>
              </ul>
              
              <div className="mt-16 p-6 bg-blue-700 rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Butuh Bantuan?</p>
                <p className="text-sm font-medium">Hubungi Admin via WhatsApp:</p>
                <p className="text-xl font-bold mt-1">+62 838 7202 3888</p>
              </div>
            </div>

            <div className="md:col-span-3 p-10">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap Siswa</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Contoh: Andi Pratama"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nomor WhatsApp Siswa</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="tel"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="0812xxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Lahir</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="date"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Umur</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="number"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Contoh: 10"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Lengkap</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                    <textarea
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Contoh: Jl. Merdeka No. 123, Jakarta"
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama Orang Tua</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Contoh: Bapak/Ibu Budi"
                        value={formData.parentName}
                        onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nomor HP Orang Tua</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="tel"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="0812xxxx"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="email"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Program</label>
                    <div className="relative">
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                      <select
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none bg-white"
                        value={formData.level}
                        onChange={(e) => setFormData({...formData, level: e.target.value})}
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
                    <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Hari</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                      <select
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none bg-white"
                        value={formData.schedule}
                        onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                      >
                        <option value="Senin, Selasa, Rabu">Senin, Selasa, Rabu</option>
                        <option value="Rabu, Kamis, Jumat">Rabu, Kamis, Jumat</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Jam Belajar</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({...formData, timeSlot: slot})}
                        className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                          formData.timeSlot === slot
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100'
                            : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-slate-900">Akun Login</h4>
                    <p className="text-sm text-slate-500 italic">Gunakan data di bawah ini untuk login ke sistem nantinya.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          type="text"
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          placeholder="Pilih username"
                          value={formData.username}
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          type="password"
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          placeholder="Pilih password"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shadow-xl"
                >
                  {isSubmitting ? (
                    <span>Mengirim...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Kirim Pendaftaran</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Dengan mendaftar, Anda menyetujui syarat dan ketentuan Bright English Course.</p>
        </div>
      </div>
    </div>
  );
}
