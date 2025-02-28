import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";
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
    file_dok_lampiran: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/spt")
      .then((res) => res.json())
      .then((data) => {
        setSptData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [sptData]); // Refresh data saat ada perubahan

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedData(item);
    setFormData(item || {
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
      file_dok_lampiran: "",
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = async () => {
    const method = modalType === "add" ? "POST" : "PUT";
    const endpoint = modalType === "add"
      ? "http://localhost:3000/spt"
      : `http://localhost:3000/spt/${selectedData.id_spt}`;

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Gagal menyimpan data");

      closeModal();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Gagal menyimpan data");
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
                    <button className="text-yellow-500 hover:text-yellow-600" onClick={() => openModal("edit", item)}><FaEdit /></button>
                    <button className="text-red-500 hover:text-red-600" onClick={() => openModal("delete", item)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
