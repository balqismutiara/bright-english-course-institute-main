import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">BRIGHT</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Membantu pelajar meningkatkan kemampuan Bahasa Inggris melalui pembelajaran yang nyaman, praktis, dan mudah dipahami. Bergabunglah bersama Bright English dan mulai belajar dengan lebih percaya diri.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Tautan Cepat</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Kursus Kami</Link></li>
              <li><Link to="/registration" className="hover:text-white transition-colors">Pendaftaran</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Portal Siswa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Kursus</h4>
            <ul className="space-y-4 text-sm">
              <li>Bahasa Inggris Umum</li>
              <li>Persiapan IELTS</li>
              <li>Bahasa Inggris Bisnis</li>
              <li>Persiapan TOEFL iBT</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>admin@becpalopo.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+62 83872023888</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Perum BTN No.16 Blok B, Surutanga, Kec. Wara Tim., Kota Palopo, Sulawesi Selatan 91912</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Bright English Course Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
