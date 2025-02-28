import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaFileAlt, FaUpload } from "react-icons/fa";
import Modal from "react-modal";

export default function SptPage() {
  const [sptData, setSptData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState({
    id_spt: "",
    masa_pajak: "",
    tahun_pajak: "",
    npwp_pemotong: "",
    nama_pemotong: "",
    npwp_penerima: "",
    nama_penerima: "",
    alamat_penerima: "",
    jabatan_penerima: "",
    penghasilan_setahun: "",
    ptkp: "",
    pengurangan: "",
    netto: "",
    pph: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/spt")
      .then((res) => res.json())
      .then((data) => {
        setSptData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const openModal = (type, item = null) => {
    setModalType(type);
    if (item) {
      setSelectedData(item);
      setFormData({ ...item });
      setFormData({ ...item, file_dok_lampiran: null });
    } else {
      setSelectedData(null);
      setFormData({
        id_spt: "",
        masa_pajak: "",
        tahun_pajak: "",
        npwp_pemotong: "",
        nama_pemotong: "",
        npwp_penerima: "",
        nama_penerima: "",
        alamat_penerima: "",
        jabatan_penerima: "",
        penghasilan_setahun: "",
        ptkp: "",
        pengurangan: "",
        netto: "",
        pph: "",
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File uploaded:", file.name);
    }
  };

  const handleSave = async () => {
    if (!formData.npwp_pemotong || !formData.nama_pemotong || 
        !formData.npwp_penerima || !formData.nama_penerima ||
        !formData.masa_pajak || !formData.tahun_pajak || 
        !formData.penghasilan_setahun || !formData.pph) {
      alert("Harap isi semua data yang wajib diisi!");
      return;
    }
  
    if (modalType === "edit" && !selectedData) {
      alert("Terjadi kesalahan: Data yang akan diedit tidak ditemukan!");
      return;
    }
  
    const method = modalType === "add" ? "POST" : "PUT";
    const endpoint = modalType === "add" 
      ? "http://localhost:3001/spt" 
      : `http://localhost:3001/spt/${selectedData.id_spt}`;
  
    try {
      console.log("Mengirim data ke:", endpoint);
      console.log("Data yang dikirim:", JSON.stringify(formData));
  
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      console.log("Response Status:", response.status);
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error dari server:", errorMessage);
        throw new Error(`Gagal menyimpan data: ${errorMessage}`);
      }
  
      const result = await response.json();
      console.log("Response dari server:", result);
  
      if (modalType === "add") {
        setSptData([...sptData, result]);
      } else {
        setSptData(sptData.map(item => (item.id_spt === selectedData.id_spt ? result : item)));
      }
  
      closeModal();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert(`Gagal menyimpan data: ${error.message}`);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-5">Data SPT Pajak</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 flex items-center" onClick={() => openModal("add")}>
        <FaPlus className="mr-2" /> Tambah Data
      </button>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2">Pemotong</th>
                <th className="px-4 py-2">Penerima</th>
                <th className="px-4 py-2">Masa Pajak</th>
                <th className="px-4 py-2">Tahun Pajak</th>
                <th className="px-4 py-2">Penghasilan</th>
                <th className="px-4 py-2">PPH</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sptData.map((item) => (
                <tr key={item.id_spt} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{item.nama_pemotong}</td>
                  <td className="px-4 py-2">{item.nama_penerima}</td>
                  <td className="px-4 py-2 text-center">{item.masa_pajak}</td>
                  <td className="px-4 py-2 text-center">{item.tahun_pajak}</td>
                  <td className="px-4 py-2 text-right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.penghasilan_setahun)}</td>
                  <td className="px-4 py-2 text-right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.pph)}</td>
                  
                  <td className="px-4 py-2 flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => openModal("resume", item)}> <FaFileAlt /></button>
                    <button className="text-yellow-500 hover:text-yellow-600" onClick={() => openModal("edit", item)}><FaEdit /> </button>
                    <button className="text-red-500 hover:text-red-600" onClick={() => openModal("delete", item)}><FaTrash /> </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
 <Modal isOpen={modalOpen} onRequestClose={closeModal} className="bg-white p-6 rounded-lg shadow-lg w-1/3 mx-auto mt-20">
        {modalType === "resume" && selectedData ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Detail Data SPT</h2>
            {Object.keys(selectedData).map((key) => (
              <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {selectedData[key]}</p>
            ))}
          </>
        ) : modalType === "delete" && selectedData ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Hapus Data</h2>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded mt-4 w-full" onClick={handleDelete}>Hapus</button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">{modalType === "add" ? "Tambah Data" : "Edit Data"}</h2>
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.replace(/_/g, ' ')}
                className="border p-2 w-full mb-2"
                value={formData[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              />
            ))}
            <label className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center mt-2 cursor-pointer"><FaUpload className="mr-2" /> Upload File <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
            <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full" onClick={handleSave}>Simpan</button>
          </>
        )}
        <button className="bg-gray-400 text-white px-4 py-2 rounded mt-2 w-full" onClick={closeModal}>Tutup</button>
      </Modal>
    </div>
  );
}
