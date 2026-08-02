import { motion } from 'motion/react';
import { BookOpen, Target, Heart, Award } from 'lucide-react';
import { TEACHERS } from '../constants';

export default function About() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-slate-900 py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Kisah & Misi Kami
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Sejak 2024, Bright English Course hadir untuk membantu pelajar meningkatkan kemampuan Bahasa Inggris dengan metode pembelajaran yang praktis, nyaman, dan mudah dipahami. Kami berkomitmen mendampingi setiap peserta agar lebih percaya diri dalam menggunakan Bahasa Inggris untuk sekolah, pekerjaan, dan kehidupan sehari-hari.
          </p>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="/images/BECPalopo3.png"
                alt="Our Institute"
                className="rounded-3xl shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="space-y-12">
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-100 p-4 rounded-2xl shrink-0">
                    <Target className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Misi Kami</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Membantu peserta belajar Bahasa Inggris dengan mudah dan terjangkau.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-indigo-100 p-4 rounded-2xl shrink-0">
                    <Heart className="text-indigo-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Nilai-Nilai Kami</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Ramah, profesional, dan fokus pada kebutuhan peserta.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-emerald-100 p-4 rounded-2xl shrink-0">
                    <Award className="text-emerald-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Visi Kami</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Menjadi kursus Bahasa Inggris terpercaya di masyarakat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Kenali Pengajar Kami</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Belajar bersama pengajar yang ramah, berpengalaman, dan siap membantu Anda berkembang.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TEACHERS.map((teacher, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={teacher.img}
                    alt={teacher.name}
                    className="w-full h-full object-contain bg-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest shadow-sm">
                    {teacher.exp} Exp
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{teacher.name}</h3>
                  <p className="text-blue-600 text-sm font-bold mb-4 uppercase tracking-wider">{teacher.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{teacher.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
