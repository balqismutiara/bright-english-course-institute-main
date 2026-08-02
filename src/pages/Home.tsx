import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, Users, Trophy, ArrowRight, Star, Zap, ShieldCheck, Globe, Quote } from 'lucide-react';
import { TEACHERS } from '../constants';
import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";

export default function Home() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    apiGet("/api/message")
      .then((data) => {
        setBackendMessage(data.message);
      })
      .catch((error) => {
        console.error("Failed to fetch backend message:", error);
      });
  }, []);

  return (
    <div className="bg-white">
      {backendMessage && (
        <p className="text-center text-sm text-green-600 mb-4">{backendMessage}</p>
      )}
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star className="w-4 h-4 fill-current" />
                <span>Lembaga Kursus Bahasa Inggris Terbaik di Palopo</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] mb-6">
                Kuasai Bahasa Inggris dengan <span className="text-blue-600">Percaya Diri</span> dan Jelas.
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
                Bergabunglah bersama Bright English Course dan tingkatkan kemampuan Bahasa Inggris Anda untuk kebutuhan sekolah, pekerjaan, maupun komunikasi sehari-hari. Program belajar kami disusun secara praktis dan bertahap agar Anda lebih mudah memahami materi dan semakin percaya diri saat menggunakan Bahasa Inggris.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/registration"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center group"
                >
                  Daftar Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
                >
                  Lihat Kursus
                </Link>
              </div>
              
              <div className="mt-12 flex items-center space-x-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/100/100`}
                      alt="Student"
                      className="w-12 h-12 rounded-full border-4 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 font-medium">Dipercaya oleh 5.000+ siswa</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>
              <img
                src="/images/BECPalopo.png"
                alt="Students learning"
                className="rounded-3xl shadow-2xl relative z-10 border-8 border-white"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <CheckCircle className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">98%</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Tingkat Keberhasilan</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3+</div>
              <p className="text-slate-500 font-medium">Tahun Pengalaman</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">6+</div>
              <p className="text-slate-500 font-medium">Pengajar Ahli</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">80+</div>
              <p className="text-slate-500 font-medium">Siswa Bahagia</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">6+</div>
              <p className="text-slate-500 font-medium">Modul Kursus</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Courses */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Kursus Unggulan Kami</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Pilih dari berbagai program Bahasa Inggris khusus kami yang dirancang untuk setiap level dan tujuan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Kids & Teens', desc: 'Program khusus untuk anak-anak dan remaja dengan metode yang menyenangkan.', icon: <Users className="w-6 h-6" />, level: 'SD - SMA' },
              { title: 'Adult & Professional', desc: 'Tingkatkan karir Anda dengan kemampuan Bahasa Inggris yang mumpuni.', icon: <Star className="w-6 h-6" />, level: 'Umum' },
              { title: 'TOEFL / IELTS Prep', desc: 'Persiapan intensif untuk mencapai skor target ujian internasional Anda.', icon: <Trophy className="w-6 h-6" />, level: 'Lanjutan' },
            ].map((course, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  {course.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{course.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{course.level}</span>
                  <Link to="/services" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Mengapa Memilih <span className="text-blue-500">Bright English Course</span>?</h2>
              <div className="space-y-8">
                {[
                  { title: 'Pengajar Berpengalaman', desc: 'Belajar bersama pengajar yang ramah, kompeten, dan siap membantu peserta memahami materi dengan lebih mudah.', icon: <Globe className="w-6 h-6 text-blue-500" /> },
                  { title: 'Pembelajaran LebihPersonal', desc: 'Jumlah peserta dalam setiap kelas dibatasi agar proses belajar lebih fokus dan setiap peserta mendapatkan perhatian yang cukup.', icon: <Zap className="w-6 h-6 text-blue-500" /> },
                  { title: 'Materi Praktis dan Mudah Dipahami', desc: 'Materi disusun secara bertahap dengan latihan berbicara, membaca, menulis, dan mendengarkan yang dapat digunakan dalam kehidupan sehari-hari.', icon: <ShieldCheck className="w-6 h-6 text-blue-500" /> },
                  { title: 'Suasana Belajar Nyaman', desc: 'Proses pembelajaran dibuat santai, interaktif, dan mendukung agar peserta lebih percaya diri menggunakan Bahasa Inggris.', icon: <ShieldCheck className="w-6 h-6 text-blue-500" /> },
                  { title: 'Biaya Lebih Terjangkau', desc: 'Kami menyediakan pilihan program belajar dengan harga yang sesuai untuk pelajar, mahasiswa, karyawan, maupun masyarakat umum.', icon: <ShieldCheck className="w-6 h-6 text-blue-500" /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img
                src="/images/BECPalopo2.png"
                alt="Mengapa memilih kami"
                className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 bg-blue-600 p-8 rounded-3xl shadow-2xl hidden md:block">
                <p className="text-5xl font-bold mb-2">100%</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">Komitmen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Teachers Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Kenali Pengajar Kami</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Belajar dari para profesional terbaik yang berdedikasi untuk membantu Anda mencapai potensi maksimal dalam berbahasa Inggris.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEACHERS.slice(0, 3).map((teacher, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={teacher.img}
                    alt={teacher.name}
                    className="w-full h-full object-contain bg-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-white text-sm leading-relaxed">{teacher.bio}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest shadow-sm">
                    {teacher.exp} Exp
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-1">{teacher.name}</h4>
                  <p className="text-blue-600 font-semibold text-sm">{teacher.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Apa Kata Siswa Kami</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Kisah nyata dari siswa nyata yang telah mengubah hidup mereka melalui program kami.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Catherine', role: 'Siswa BEC Palopo', text: 'Belajar di Bright English sangat menyenangkan. Pengajarnya ramah, materinya mudah dipahami, dan saya jadi lebih percaya diri berbahasa Inggris.', img: '/images/Testi1.png' },
              { name: 'Luthfi Edial', role: 'Siswa BEC Palopo', text: 'Setelah belajar di Bright English, saya lebih percaya diri saat presentasi di sekolah. Materinya praktis dan mudah diterapkan.', img: '/images/Testi2.png' },
              { name: 'Ahyar', role: 'Siswa BEC Palopo', text: 'Lingkungan belajarnya ramah dan mendukung. Dari yang awalnya belum percaya diri, sekarang saya lebih berani berbicara dalam Bahasa Inggris.', img: '/images/Testi3.png' },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-100" />
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
