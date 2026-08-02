import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, UserCog, FileText, Pencil, Trash2 } from 'lucide-react';

type Registration = {
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

type Account = {
  id: number;
  username: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
};

type Student = {
  id: number;
  name: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'registrations' | 'users' | 'grades'>('registrations');

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [newPassword, setNewPassword] = useState('');

  const [gradeForm, setGradeForm] = useState({
    student_id: '',
    student_name: '',
    reading: 0,
    writing: 0,
    speaking: 0,
    listening: 0,
    attendance: 0,
    feedback: ''
  });

  const timeSlots = [
    '09.00 - 10.30',
    '10.45 - 12.15',
    '13.00 - 14.30',
    '14.30 - 16.00',
    '16.30 - 18.00',
    '18.30 - 20.00'
  ];

  const loadData = async () => {
    try {
      setLoading(true);

      const [regRes, accRes, stuRes] = await Promise.all([
        fetch('/api/admin/registrations'),
        fetch('/api/admin/accounts'),
        fetch('/api/admin/students')
      ]);

      const regData = await regRes.json();
      const accData = await accRes.json();
      const stuData = await stuRes.json();

      if (regData.success) setRegistrations(regData.registrations || []);
      if (accData.success) setAccounts(accData.accounts || []);
      if (stuData.success) setStudents(stuData.students || []);
    } catch (error) {
      console.error('Load admin data error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteRegistration = async (id: number) => {
    const ok = window.confirm('Yakin ingin menghapus data siswa ini?');
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (!data.success) {
        alert(data.message || 'Gagal menghapus data siswa');
        return;
      }

      loadData();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
    }
  };

  const handleSaveRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRegistration) return;

    try {
      const res = await fetch(`/api/admin/registrations/${editingRegistration.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingRegistration)
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || 'Gagal memperbarui data siswa');
        return;
      }

      alert('Data siswa berhasil diperbarui');
      setEditingRegistration(null);
      loadData();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
    }
  };

  const handleDeleteAccount = async (id: number) => {
    const ok = window.confirm('Yakin ingin menghapus pengguna ini?');
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/accounts/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (!data.success) {
        alert(data.message || 'Gagal menghapus pengguna');
        return;
      }

      loadData();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
    }
  };

  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccount) return;

    try {
      const res = await fetch(`/api/admin/accounts/${editingAccount.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: editingAccount.username,
          password: newPassword,
          role: editingAccount.role
        })
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || 'Gagal memperbarui pengguna');
        return;
      }

      alert('Pengguna berhasil diperbarui');
      setEditingAccount(null);
      setNewPassword('');
      loadData();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
    }
  };

  const handleGradeStudentChange = (studentId: string) => {
    const selectedStudent = students.find((s) => String(s.id) === studentId);

    setGradeForm({
      ...gradeForm,
      student_id: studentId,
      student_name: selectedStudent ? selectedStudent.name : ''
    });
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/admin/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...gradeForm,
          student_id: Number(gradeForm.student_id),
          reading: Number(gradeForm.reading),
          writing: Number(gradeForm.writing),
          speaking: Number(gradeForm.speaking),
          listening: Number(gradeForm.listening),
          attendance: Number(gradeForm.attendance)
        })
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || 'Gagal menyimpan nilai');
        return;
      }

      alert('Nilai siswa berhasil disimpan');

      setGradeForm({
        student_id: '',
        student_name: '',
        reading: 0,
        writing: 0,
        speaking: 0,
        listening: 0,
        attendance: 0,
        feedback: ''
      });
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Admin Panel</h2>

            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('registrations')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-all ${
                  activeTab === 'registrations'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-semibold">Pendaftar</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-all ${
                  activeTab === 'users'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <UserCog className="w-5 h-5" />
                <span className="font-semibold">Pengguna</span>
              </button>

              <button
                onClick={() => setActiveTab('grades')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-all ${
                  activeTab === 'grades'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Nilai Siswa</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'registrations' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8"
            >
              <h1 className="text-3xl font-bold text-slate-900 mb-6">Data Pendaftar</h1>

              <div className="overflow-x-auto">
                <table className="min-w-[1400px] w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 border-b">
                      <th className="py-3 pr-4">ID</th>
                      <th className="py-3 pr-4">Nama Siswa</th>
                      <th className="py-3 pr-4">Nomor Telepon</th>
                      <th className="py-3 pr-4">Email</th>
                      <th className="py-3 pr-4">Tanggal Lahir</th>
                      <th className="py-3 pr-4">Umur</th>
                      <th className="py-3 pr-4">Alamat Lengkap</th>
                      <th className="py-3 pr-4">Nama Orang Tua</th>
                      <th className="py-3 pr-4">Nomor HP Orang Tua</th>
                      <th className="py-3 pr-4">Program</th>
                      <th className="py-3 pr-4">Hari</th>
                      <th className="py-3 pr-4">Jam Belajar</th>
                      <th className="py-3 pr-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 align-top">
                        <td className="py-3 pr-4">{item.id}</td>
                        <td className="py-3 pr-4 font-medium text-slate-900">{item.name}</td>
                        <td className="py-3 pr-4">{item.phone}</td>
                        <td className="py-3 pr-4">{item.email}</td>
                        <td className="py-3 pr-4">{item.birth_date}</td>
                        <td className="py-3 pr-4">{item.age}</td>
                        <td className="py-3 pr-4">{item.address}</td>
                        <td className="py-3 pr-4">{item.parent_name}</td>
                        <td className="py-3 pr-4">{item.parent_phone}</td>
                        <td className="py-3 pr-4">{item.level}</td>
                        <td className="py-3 pr-4">{item.schedule}</td>
                        <td className="py-3 pr-4">{item.time_slot}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingRegistration(item)}
                              className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRegistration(item.id)}
                              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {registrations.length === 0 && (
                      <tr>
                        <td colSpan={13} className="py-6 text-center text-slate-500">
                          Belum ada data pendaftar.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {editingRegistration && (
                <form onSubmit={handleSaveRegistration} className="mt-8 border-t pt-8 space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">Edit Data Siswa</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nama Siswa</label>
                      <input
                        className="w-full px-4 py-3 rounded-xl border"
                        value={editingRegistration.name}
                        onChange={(e) =>
                          setEditingRegistration({ ...editingRegistration, name: e.target.value })
                        }
                        placeholder="Nama Siswa"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Telepon</label>
                      <input
                        className="w-full px-4 py-3 rounded-xl border"
                        value={editingRegistration.phone}
                        onChange={(e) =>
                          setEditingRegistration({ ...editingRegistration, phone: e.target.value })
                        }
                        placeholder="Nomor Telepon"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                      <input
                        className="w-full px-4 py-3 rounded-xl border"
                        value={editingRegistration.email}
                        onChange={(e) =>
                          setEditingRegistration({ ...editingRegistration, email: e.target.value })
                        }
                        placeholder="Email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Lahir</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border"
                        value={editingRegistration.birth_date}
                        onChange={(e) =>
                          setEditingRegistration({ ...editingRegistration, birth_date: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Umur</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 rounded-xl border"
                        value={editingRegistration.age}
                        onChange={(e) =>
                          setEditingRegistration({ ...editingRegistration, age: Number(e.target.value) })
                        }
                        placeholder="Umur"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Program</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border bg-white"
                        value={editingRegistration.level}
                        onChange={(e) =>
                          setEditingRegistration({ ...editingRegistration, level: e.target.value })
                        }
                      >
                        <option value="Kids">Kids (SD)</option>
                        <option value="Teens">Teens (SMP/SMA)</option>
                        <option value="Adult">Adult (Umum)</option>
                        <option value="TOEFL / IELTS">TOEFL / IELTS Prep</option>
                        <option value="Coaching">Private Coaching</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Hari</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border bg-white"
                        value={editingRegistration.schedule}
                        onChange={(e) =>
                          setEditingRegistration({ ...editingRegistration, schedule: e.target.value })
                        }
                      >
                        <option value="Senin, Selasa, Rabu">Senin, Selasa, Rabu</option>
                        <option value="Rabu, Kamis, Jumat">Rabu, Kamis, Jumat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nama Orang Tua</label>
                      <input
                        className="w-full px-4 py-3 rounded-xl border"
                        value={editingRegistration.parent_name}
                        onChange={(e) =>
                          setEditingRegistration({ ...editingRegistration, parent_name: e.target.value })
                        }
                        placeholder="Nama Orang Tua"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nomor HP Orang Tua</label>
                      <input
                        className="w-full px-4 py-3 rounded-xl border"
                        value={editingRegistration.parent_phone}
                        onChange={(e) =>
                          setEditingRegistration({ ...editingRegistration, parent_phone: e.target.value })
                        }
                        placeholder="Nomor HP Orang Tua"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Lengkap</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border"
                      rows={3}
                      value={editingRegistration.address}
                      onChange={(e) =>
                        setEditingRegistration({ ...editingRegistration, address: e.target.value })
                      }
                      placeholder="Alamat Lengkap"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Jam Belajar</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() =>
                            setEditingRegistration({
                              ...editingRegistration,
                              time_slot: slot
                            })
                          }
                          className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                            editingRegistration.time_slot === slot
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100'
                              : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold">
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingRegistration(null)}
                      className="bg-slate-100 text-slate-700 px-5 py-3 rounded-xl font-semibold"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8"
            >
              <h1 className="text-3xl font-bold text-slate-900 mb-6">Data Pengguna</h1>

              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 border-b">
                      <th className="py-3 pr-4">Username</th>
                      <th className="py-3 pr-4">Password</th>
                      <th className="py-3 pr-4">Role</th>
                      <th className="py-3 pr-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 align-top">
                        <td className="py-3 pr-4 font-medium text-slate-900">{item.username}</td>
                        <td className="py-3 pr-4 break-all text-xs text-slate-600">{item.password}</td>
                        <td className="py-3 pr-4">{item.role}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingAccount(item);
                                setNewPassword('');
                              }}
                              className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAccount(item.id)}
                              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {accounts.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-slate-500">
                          Belum ada data pengguna.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {editingAccount && (
                <form onSubmit={handleSaveAccount} className="mt-8 border-t pt-8 space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">Edit Pengguna</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                      <input
                        className="w-full px-4 py-3 rounded-xl border"
                        value={editingAccount.username}
                        onChange={(e) =>
                          setEditingAccount({
                            ...editingAccount,
                            username: e.target.value
                          })
                        }
                        placeholder="Username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Password Baru</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 rounded-xl border"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Kosongkan jika tidak ingin mengganti"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Role</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border bg-white"
                        value={editingAccount.role}
                        onChange={(e) =>
                          setEditingAccount({
                            ...editingAccount,
                            role: e.target.value as 'student' | 'teacher' | 'admin'
                          })
                        }
                      >
                        <option value="student">student</option>
                        <option value="teacher">teacher</option>
                        <option value="admin">admin</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold">
                      Simpan Perubahan
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAccount(null);
                        setNewPassword('');
                      }}
                      className="bg-slate-100 text-slate-700 px-5 py-3 rounded-xl font-semibold"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {activeTab === 'grades' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8"
            >
              <h1 className="text-3xl font-bold text-slate-900 mb-6">Input Nilai Siswa</h1>

              <form onSubmit={handleSaveGrade} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Siswa</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border bg-white"
                    value={gradeForm.student_id}
                    onChange={(e) => handleGradeStudentChange(e.target.value)}
                    required
                  >
                    <option value="">-- Pilih siswa --</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nilai Reading (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 rounded-xl border"
                      value={gradeForm.reading}
                      onChange={(e) => setGradeForm({ ...gradeForm, reading: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nilai Writing (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 rounded-xl border"
                      value={gradeForm.writing}
                      onChange={(e) => setGradeForm({ ...gradeForm, writing: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nilai Speaking (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 rounded-xl border"
                      value={gradeForm.speaking}
                      onChange={(e) => setGradeForm({ ...gradeForm, speaking: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nilai Listening (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 rounded-xl border"
                      value={gradeForm.listening}
                      onChange={(e) => setGradeForm({ ...gradeForm, listening: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Kehadiran (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 rounded-xl border"
                      value={gradeForm.attendance}
                      onChange={(e) => setGradeForm({ ...gradeForm, attendance: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Umpan Balik
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border"
                    value={gradeForm.feedback}
                    onChange={(e) => setGradeForm({ ...gradeForm, feedback: e.target.value })}
                  />
                </div>

                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">
                  Simpan Nilai
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}