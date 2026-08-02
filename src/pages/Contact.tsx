import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
            Hubungi Kami
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Punya pertanyaan tentang kursus kami? Tim kami siap membantu Anda memulai perjalanan belajar bahasa Inggris Anda.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Informasi Kontak</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-100 p-4 rounded-2xl shrink-0">
                    <MapPin className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Alamat Kantor</h3>
                    <p className="text-slate-600">Perum BTN No.16 Blok B, Surutanga, Kec. Wara Tim., Kota Palopo, Sulawesi Selatan 91912 (Cabang1)</p>
                    <p className="text-slate-600">JL. Garuda No 6D dekat SMAN 2 Palopo (Cabang 2)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-indigo-100 p-4 rounded-2xl shrink-0">
                    <Phone className="text-indigo-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Telepon & WhatsApp</h3>
                    <p className="text-slate-600">+62 83872023888</p>
                    <p className="text-slate-600">+62 083872023888 (WhatsApp)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-emerald-100 p-4 rounded-2xl shrink-0">
                    <Mail className="text-emerald-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600">admin@becpalopo.com</p>
                    <p className="text-slate-600">brightenglishcoursebecplp@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-amber-100 p-4 rounded-2xl shrink-0">
                    <Clock className="text-amber-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Jam Operasional</h3>
                    <p className="text-slate-600">Senin - Jumat: 08.00 - 17.00</p>
                    <p className="text-slate-600">Sabtu: 09.00 - 15.00</p>
                    <p className="text-slate-600">Minggu: Tutup</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 rounded-3xl overflow-hidden h-64 border border-slate-200 shadow-sm">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.354741371971!2d120.19908299999999!3d-2.9988120999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d915f850810214f%3A0xb23d54256aa8079c!2sBright%20English%20Course%20Palopo%20(Kursus%20Bahasa%20Inggris)!5e0!3m2!1sid!2sid!4v1785453908408!5m2!1sid!2sid"
                title="Lokasi Bright English Course Palopo"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                href="https://maps.app.goo.gl/WrRdcVkuGHB7PRfK8"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-blue-600 font-semibold shadow-lg hover:bg-slate-50 transition-colors"
                >
                  Open in Maps
                  <ExternalLink className="w-5 h-5" />
                  </a>
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Kirim Pesan</h2>
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 text-green-700 p-8 rounded-2xl text-center"
                >
                  <div className="bg-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Pesan Terkirim!</h3>
                  <p>Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-green-700 font-bold underline"
                  >
                    Kirim pesan lain
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Masukkan nama Anda"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="email@contoh.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subjek</label>
                    <input
                      type="text"
                      required
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Apa yang ingin Anda tanyakan?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Pesan</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Tuliskan pesan Anda di sini..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center space-x-2"
                  >
                    <span>Kirim Pesan</span>
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
