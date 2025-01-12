import { useState, useEffect } from 'react';
import api from '../../utils/axios';

const DroughtIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalStats, setTotalStats] = useState({
    totalKasus: 0,
    kasusAktif: 0,
    kasusSelesai: 0,
    totalArea: 0,
    totalTerdampak: 0
  });

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await api.get('/drought');
        if (response.data && Array.isArray(response.data)) {
          setIncidents(response.data);
          
          // Hitung statistik
          const stats = {
            totalKasus: response.data.length,
            kasusAktif: response.data.filter(i => i.status === 'Aktif').length,
            kasusSelesai: response.data.filter(i => i.status === 'Selesai').length,
            totalArea: response.data.reduce((sum, i) => sum + (parseFloat(i.affected_area) || 0), 0),
            totalTerdampak: response.data.reduce((sum, i) => sum + (parseInt(i.affected_people) || 0), 0)
          };
          setTotalStats(stats);
        }
      } catch (error) {
        console.error('Error fetching drought incidents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Data Kekeringan</h1>
        
        {/* Statistik Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-500 text-sm font-medium">Total Kasus</h2>
            <p className="text-3xl font-bold text-gray-900">{totalStats.totalKasus}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-500 text-sm font-medium">Kasus Aktif</h2>
            <p className="text-3xl font-bold text-orange-600">{totalStats.kasusAktif}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-500 text-sm font-medium">Kasus Selesai</h2>
            <p className="text-3xl font-bold text-green-600">{totalStats.kasusSelesai}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-500 text-sm font-medium">Total Area (Ha)</h2>
            <p className="text-3xl font-bold text-gray-900">{totalStats.totalArea.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-500 text-sm font-medium">Total Terdampak</h2>
            <p className="text-3xl font-bold text-gray-900">{totalStats.totalTerdampak.toLocaleString()}</p>
          </div>
        </div>

        {/* Filter dan Pencarian bisa ditambahkan di sini */}
        
        {/* Tabel Data */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provinsi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kabupaten
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Area (Ha)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipe Lahan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Mulai
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dampak Sumber Air
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {incidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{incident.province}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{incident.district}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${incident.drought_level === 'Berat' ? 'bg-red-100 text-red-800' :
                          incident.drought_level === 'Sedang' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}`}>
                        {incident.drought_level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${incident.status === 'Aktif' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{parseFloat(incident.affected_area).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{incident.land_type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(incident.start_date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {incident.water_source_impact || '-'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Informasi Tambahan */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dampak Kekeringan</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Gagal panen dan kerugian pertanian</li>
            <li>Kesulitan akses air bersih</li>
            <li>Gangguan kesehatan masyarakat</li>
            <li>Kerusakan ekosistem</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upaya Mitigasi</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Pembangunan embung dan waduk</li>
            <li>Distribusi air bersih</li>
            <li>Sosialisasi penghematan air</li>
            <li>Pemanfaatan teknologi irigasi hemat air</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DroughtIncidents;