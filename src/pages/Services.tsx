import { motion } from 'motion/react';
import { Check, Clock, DollarSign, BarChart, Users, Award } from 'lucide-react';

export default function Services() {
  const courses = [
    {
      title: 'Kids',
      price: 'Rp 800.000/bulan',
      level: 'SD (6-12 Tahun)',
      features: ['Pembelajaran Interaktif', 'Membangun Kosakata', 'Lagu & Permainan', 'Laporan Kemajuan'],
      color: 'blue'
    },
    {
      title: 'Teens',
      price: 'Rp 1.000.000/bulan',
      level: 'SMP/SMA',
      features: ['Percakapan Sehari-hari', 'Tata Bahasa & Menulis', 'Diskusi Kelompok', 'Persiapan Ujian Sekolah'],
      color: 'indigo'
    },
    {
      title: 'Adult',
      price: 'Rp 1.200.000/bulan',
      level: 'Umum/Profesional',
      features: ['Bahasa Inggris Praktis', 'Keterampilan Berbicara', 'Bahasa Inggris Bisnis', 'Jam Fleksibel'],
      color: 'emerald'
    },
    {
      title: 'TOEFL / IELTS',
      price: 'Rp 2.500.000/bulan',
      level: 'Menengah+',
      features: ['Strategi Ujian', 'Tes Simulasi', 'Umpan Balik Personal', 'Analisis Skor'],
      color: 'violet'
    },
    {
      title: 'Coaching',
      price: 'Rp 3.500.000/bulan',
      level: 'Privat/Khusus',
      features: ['Kurikulum Kustom', 'Sesi 1-on-1', 'Jadwal Fleksibel', 'Fokus Tujuan Spesifik'],
      color: 'rose'
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-blue-600 py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Kursus Khusus Kami
          </motion.h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            PPilihan kelas Bahasa Inggris untuk kebutuhan sekolah, pekerjaan, dan komunikasi sehari-hari.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <Clock className="text-blue-600 w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Jam Fleksibel</h4>
              <p className="text-sm text-slate-500">Sesi pagi, siang, dan sore tersedia.</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <BarChart className="text-blue-600 w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Pelacakan Kemajuan</h4>
              <p className="text-sm text-slate-500">Laporan terperinci dan umpan balik setiap bulan.</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-600 w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Kelas Kecil</h4>
              <p className="text-sm text-slate-500">Maksimal 10 siswa per kelas untuk fokus yang lebih baik.</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <Award className="text-blue-600 w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Sertifikasi</h4>
              <p className="text-sm text-slate-500">Terima sertifikat resmi setelah selesai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2 block">Level: {course.level}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h3>
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold text-slate-900">{course.price.split('/')[0]}</span>
                    <span className="text-slate-500 text-xs ml-1">/{course.price.split('/')[1]}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {course.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-2 text-slate-600">
                      <div className="bg-blue-50 p-1 rounded-full shrink-0">
                        <Check className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-sm hover:bg-slate-800 transition-colors">
                  Daftar Sekarang
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Jadwal Belajar</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Pilih waktu yang paling sesuai dengan rutinitas harian Anda. Kami menyediakan berbagai pilihan jam belajar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { days: 'Senin, Selasa, Rabu', times: ['09.00 - 10.30', '10.45 - 12.15', '13.00 - 14.30', '14.30 - 16.00', '16.30 - 18.00', '18.30 - 20.00'] },
              { days: 'Rabu, Kamis, Jumat', times: ['09.00 - 10.30', '10.45 - 12.15', '13.00 - 14.30', '14.30 - 16.00', '16.30 - 18.00', '18.30 - 20.00'] },
            ].map((group, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Clock className="text-white w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{group.days}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {group.times.map((time, tIdx) => (
                    <div key={tIdx} className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <span className="text-slate-700 font-semibold">{time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
