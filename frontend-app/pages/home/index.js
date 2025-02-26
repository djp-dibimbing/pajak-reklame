import { useState } from 'react';
import Image from 'next/image';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import Button from "../components/button";
import { LogOut } from "lucide-react";
import SptPage from "./spt";

Modal.setAppElement('#__next');

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-indigo-500 text-white py-5 px-9 flex justify-between items-center shadow-md">
      {/* Logo Pajak Reklame */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="PAJAK REKLAME" width={160} height={90} className="rounded-md" />
      </div>
  
      {/* Tombol Logout */}
      <Button variant="ghost" className="flex items-center gap-2">
        <LogOut size={20} /> Logout
      </Button>
    </nav>
  );
};

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('Lapor Pajak');
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', type: 'Personal', status: 'Active' },
    { id: 2, name: 'Jane Smith', type: 'Business', status: 'Pending' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: '', status: '' });

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedData(item);
    setFormData(item || { name: '', type: '', status: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddData = () => {
    setData([...data, { id: data.length + 1, ...formData }]);
    closeModal();
  };

  const handleEditData = () => {
    setData(data.map(item => (item.id === selectedData.id ? { ...item, ...formData } : item)));
    closeModal();
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    closeModal();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-grow">
        <aside className="w-64 bg-indigo-900 text-white shadow-xl p-6">
          <ul className="space-y-0">
            {['PROFIL WP', 'SPT', 'FAKTUR', 'LOG'].map((menu, index) => (
             <li
             key={menu}
             className={`cursor-pointer p-3 rounded-lg transition transform hover:scale-105 border-b border-white/20 ${
               activeMenu === menu ? 'bg-yellow-500 text-white' : 'hover:bg-indigo-700'
             } ${index === 3 ? 'border-b-0' : ''}`}
             onClick={() => {
               setActiveMenu(menu);
               console.log("Menu clicked:", menu); // Tambahkan ini untuk debugging
             }}
           >
             {menu}
           </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl text-indigo-800 font-semibold">{activeMenu}</h2>
              {activeMenu === 'LOG' && (
                <button
                  onClick={() => openModal('add')}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  <FaPlus size={16} /> Tambah Data
                </button>
              )}
            </div>

            {/* Menyesuaikan Konten Berdasarkan Menu */}
            {activeMenu === 'PROFIL WP' && (
              <p className="text-gray-600">Ini adalah halaman Profil Wajib Pajak.</p>
            )}

            {activeMenu === 'SPT' && <SptPage />} {/* Menampilkan halaman SPT */}

            {activeMenu === 'FAKTUR' && (
              <p className="text-gray-600">Kelola faktur pajak di sini.</p>
            )}

            {activeMenu === 'LOG' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-indigo-800 text-white">
                      <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Nama</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Tipe</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-6 py-3 text-center text-sm font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-100 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center space-x-3">
                          <button className="text-yellow-500 hover:text-yellow-600" onClick={() => openModal('edit', item)}>
                            <FaEdit size={16} />
                          </button>
                          <button className="text-red-500 hover:text-red-600" onClick={() => openModal('delete', item)}>
                            <FaTrash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-8 rounded-xl shadow-2xl w-11/12 md:w-1/3 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {(modalType === 'add' || modalType === 'edit') && (
          <>
            <h2 className="text-2xl text-indigo-800 font-bold mb-6">
              {modalType === 'add' ? 'Tambah Data' : 'Edit Data'}
            </h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nama"
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="Tipe"
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              placeholder="Status"
              className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={modalType === 'add' ? handleAddData : handleEditData}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              {modalType === 'add' ? 'Tambahkan' : 'Simpan Perubahan'}
            </button>
          </>
        )}

        {modalType === 'delete' && selectedData && (
          <>
            <h2 className="text-2xl text-red-600 font-bold mb-6">Hapus Data {selectedData.name}?</h2>
            <button
              onClick={() => handleDelete(selectedData.id)}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              Hapus
            </button>
          </>
        )}
        <button
          onClick={closeModal}
          className="mt-6 w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition"
        >
          Batal
        </button>
      </Modal>
    </div>
  );
}
