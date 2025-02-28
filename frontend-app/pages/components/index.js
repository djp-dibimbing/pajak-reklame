import { useState } from 'react';
import Image from 'next/image';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import Button from "../components/ui/button";
import { LogOut } from "lucide-react";

Modal.setAppElement('#__next');

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Dashboard</div>
      <Button variant="ghost" className="flex items-center gap-2">
        <LogOut size={18} /> Logout
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-grow">
        <aside className="w-64 bg-indigo-900 shadow-lg p-5">
          <div className="flex items-center justify-center mb-6">
            <Image src="/djp.png" alt="DJP Logo" width={90} height={90} />
          </div>
          <ul>
            {['Lapor Pajak', 'Faktur Pajak', 'NPWP'].map((menu) => (
              <li
                key={menu}
                className={`p-3 cursor-pointer rounded-lg transition ${
                  activeMenu === menu ? 'bg-yellow-400 text-white' : 'hover:bg-blue-900 text-white'
                }`}
                onClick={() => setActiveMenu(menu)}
              >
                {menu}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-6">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-indigo-900 font-semibold">{activeMenu}</h2>
              <button
                onClick={() => openModal('add')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
              >
                <FaPlus className="mr-2" /> Tambah Data
              </button>
            </div>

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-indigo-900 text-white">
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Nama</th>
                  <th className="border p-3">Tipe</th>
                  <th className="border p-3">Status</th>
                  <th className="border p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="border text-gray-900 p-3">{item.id}</td>
                    <td className="border text-gray-900 p-3">{item.name}</td>
                    <td className="border text-gray-900 p-3">{item.type}</td>
                    <td className="border text-gray-900 p-3">{item.status}</td>
                    <td className="border text-gray-900 p-3 flex justify-center gap-3">
                      <button className="text-yellow-500 hover:text-yellow-700" onClick={() => openModal('edit', item)}>
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700" onClick={() => openModal('delete', item)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-xl w-96 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {modalType === 'add' || modalType === 'edit' ? (
          <>
            <h2 className="text-xl text-indigo-900 font-bold mb-4">{modalType === 'add' ? 'Tambah Data' : 'Edit Data'}</h2>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama" className="w-full border p-2 rounded mb-2" />
            <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="Tipe" className="w-full border p-2 rounded mb-2" />
            <input type="text" name="status" value={formData.status} onChange={handleInputChange} placeholder="Status" className="w-full border p-2 rounded mb-4" />
            <button onClick={modalType === 'add' ? handleAddData : handleEditData} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full">
              {modalType === 'add' ? 'Tambahkan' : 'Simpan Perubahan'}
            </button>
          </>
        ) : modalType === 'delete' && selectedData ? (
          <>
            <h2 className="text-xl text-indigo-900 font-bold mb-4">Hapus Data {selectedData.name}?</h2>
            <button onClick={() => handleDelete(selectedData.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full">Hapus</button>
          </>
        ) : null}
        <button onClick={closeModal} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-full">Batal</button>
      </Modal>
    </div>
  );
}
