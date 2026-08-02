import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Registration from './pages/Registration';
import Login from './pages/Login';
import StudentReport from './pages/StudentReport';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';

type SessionUser = {
  id: number;
  username: string;
  role: 'student' | 'teacher' | 'admin';
  student_id?: number | null;
  teacher_id?: number | null;
};

export default function App() {

  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadSession = () => {

      try {

        const userSession = localStorage.getItem('user_session');
        const studentSession = localStorage.getItem('student_session');

        const rawSession = userSession || studentSession;

        if (rawSession) {

          const sessionData = JSON.parse(rawSession);

          setUser(sessionData);

        } else {

          setUser(null);

        }

      } catch (error) {

        console.error('Failed to load session:', error);
        setUser(null);

      } finally {

        setLoading(false);

      }

    };

    loadSession();

    window.addEventListener('storage', loadSession);

    return () => {

      window.removeEventListener('storage', loadSession);

    };

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>

    );

  }

  return (

    <ErrorBoundary>

      <Router>

        <div className="min-h-screen flex flex-col font-sans">

          <Navbar />

          <main className="flex-grow">

            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />

              {/* STUDENT DASHBOARD */}

              <Route
                path="/report"
                element={
                  user && user.role === 'student'
                    ? <StudentReport />
                    : <Navigate to="/login" />
                }
              />

              {/* ADMIN DASHBOARD */}

              <Route
                path="/admin"
                element={
                  user && (user.role === 'admin' || user.role === 'teacher')
                    ? <AdminDashboard />
                    : <Navigate to="/login" />
                }
              />

            </Routes>

          </main>

          <Footer />

        </div>

      </Router>

    </ErrorBoundary>

  );

}