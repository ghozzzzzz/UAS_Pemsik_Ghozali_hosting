import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import Swal from 'sweetalert2';

const FireIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    province: '',
    district: '',
    fire_level: 'Ringan',
    burned_area: '',
    affected_people: '',
    start_date: '',
    end_date: '',
    status: 'Aktif',
    fire_type: 'Hutan',
    description: ''
  });

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const fetchIncidents = async () => {
    try {
      const response = await api.get('/fire');
      if (response.data && Array.isArray(response.data)) {
        setIncidents(response.data);
      } else {
        setIncidents([]);
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
      setIncidents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchIncidents();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await api.delete(`/fire/${id}`);
        
        Swal.fire(
          'Deleted!',
          'Record has been deleted.',
          'success'
        );
        
        fetchIncidents();
      }
    } catch (error) {
      console.error('Error deleting incident:', error);
      Swal.fire(
        'Error!',
        'Failed to delete record.',
        'error'
      );
    }
  };

  const handleEdit = async (incident) => {
    setEditingId(incident.id);
    setFormData({
      province: incident.province,
      district: incident.district,
      fire_level: incident.fire_level,
      burned_area: incident.burned_area,
      affected_people: incident.affected_people,
      start_date: new Date(incident.start_date).toISOString().split('T')[0],
      end_date: incident.end_date ? new Date(incident.end_date).toISOString().split('T')[0] : '',
      status: incident.status,
      fire_type: incident.fire_type,
      description: incident.description || ''
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      province: '',
      district: '',
      fire_level: 'Ringan',
      burned_area: '',
      affected_people: '',
      start_date: '',
      end_date: '',
      status: 'Aktif',
      fire_type: 'Hutan',
      description: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/fire/${editingId}`, formData);
      } else {
        await api.post('/fire', formData);
      }

      setShowModal(false);
      fetchIncidents();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Data berhasil ${editingId ? 'diperbarui' : 'ditambahkan'}`
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Terjadi kesalahan'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Data Kebakaran</h1>
          <button
            onClick={handleAdd}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Tambah Data
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-gray-500 text-sm font-medium">Total Kasus</h2>
    <p className="text-3xl font-bold text-gray-900">{incidents.length}</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-gray-500 text-sm font-medium">Kasus Aktif</h2>
    <p className="text-3xl font-bold text-red-600">
      {incidents.filter(i => i.status === 'Aktif').length}
    </p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-gray-500 text-sm font-medium">Kasus Padam</h2>
    <p className="text-3xl font-bold text-green-600">
      {incidents.filter(i => i.status === 'Padam').length}
    </p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-gray-500 text-sm font-medium">Total Area Terbakar (Ha)</h2>
    <p className="text-3xl font-bold text-gray-900">
      {incidents.reduce((sum, i) => sum + (parseFloat(i.burned_area) || 0), 0).toFixed(2)}
    </p>
  </div>
</div>


        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b text-left">Provinsi</th>
                <th className="px-6 py-3 border-b text-left">Kabupaten</th>
                <th className="px-6 py-3 border-b text-left">Level</th>
                <th className="px-6 py-3 border-b text-left">Status</th>
                <th className="px-6 py-3 border-b text-left">Luas Area (Ha)</th>
                <th className="px-6 py-3 border-b text-left">Tipe</th>
                <th className="px-6 py-3 border-b text-left">Tanggal Mulai</th>
                <th className="px-6 py-3 border-b text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {incidents && incidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{incident.province}</td>
                  <td className="px-6 py-4 border-b">{incident.district}</td>
                  <td className="px-6 py-4 border-b">
                    <span className={`px-2 py-1 rounded text-white ${
                      incident.fire_level === 'Berat' ? 'bg-red-500' : 
                      incident.fire_level === 'Sedang' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                      {incident.fire_level}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <span className={`px-2 py-1 rounded text-white ${
                      incident.status === 'Aktif' ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b">{incident.burned_area}</td>
                  <td className="px-6 py-4 border-b">{incident.fire_type}</td>
                  <td className="px-6 py-4 border-b">
                    {new Date(incident.start_date).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <button
                      onClick={() => handleEdit(incident)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(incident.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit Data Kebakaran' : 'Tambah Data Kebakaran'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Provinsi</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Kabupaten</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Level Kebakaran</label>
                <select
                  name="fire_level"
                  value={formData.fire_level}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="Ringan">Ringan</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Berat">Berat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Luas Area (Ha)</label>
                <input
                  type="number"
                  step="0.01"
                  name="burned_area"
                  value={formData.burned_area}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Jumlah Terdampak</label>
                <input
                  type="number"
                  name="affected_people"
                  value={formData.affected_people}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Padam">Padam</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tipe Kebakaran</label>
                <select
                  name="fire_type"
                  value={formData.fire_type}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="Hutan">Hutan</option>
                  <option value="Pemukiman">Pemukiman</option>
                  <option value="Industri">Industri</option>
                  <option value="Lahan">Lahan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  {editingId ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FireIncidents;
