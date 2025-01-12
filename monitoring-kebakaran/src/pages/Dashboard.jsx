import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Selamat Datang, {user?.name}!
        </h1>
        <p className="text-xl text-gray-600">
          di Sistem Monitoring Bencana Kebakaran dan Kekeringan
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Artikel Kebakaran Terkini</h2>
          
          <article className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Pencegahan Kebakaran Hutan dan Lahan</h3>
            <p className="text-gray-600 mb-4">
              Kebakaran hutan dan lahan merupakan bencana yang sering terjadi di Indonesia. 
              Beberapa langkah pencegahan yang dapat dilakukan antara lain pemantauan hotspot, 
              patroli rutin, dan edukasi masyarakat.
            </p>
            <a href="#" className="text-red-600 hover:text-red-800">Baca selengkapnya →</a>
          </article>

          <article className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Dampak Kebakaran Terhadap Lingkungan</h3>
            <p className="text-gray-600 mb-4">
              Kebakaran tidak hanya berdampak pada area yang terbakar, tetapi juga 
              menyebabkan polusi udara, kerusakan ekosistem, dan gangguan kesehatan 
              masyarakat sekitar.
            </p>
            <a href="#" className="text-red-600 hover:text-red-800">Baca selengkapnya →</a>
          </article>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Artikel Kekeringan Terkini</h2>
          
          <article className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Mengatasi Dampak Kekeringan</h3>
            <p className="text-gray-600 mb-4">
              Kekeringan dapat menyebabkan krisis air bersih dan gagal panen. 
              Beberapa solusi yang dapat diterapkan adalah pembuatan embung, 
              sistem irigasi efisien, dan konservasi air.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800">Baca selengkapnya →</a>
          </article>

          <article className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Adaptasi Menghadapi Musim Kemarau</h3>
            <p className="text-gray-600 mb-4">
              Perubahan iklim menyebabkan musim kemarau yang lebih panjang. 
              Masyarakat perlu beradaptasi dengan menerapkan pola tanam yang sesuai 
              dan manajemen air yang lebih baik.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800">Baca selengkapnya →</a>
          </article>
        </div>
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tips Pencegahan Bencana</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Kebakaran</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Hindari pembakaran lahan</li>
              <li>Siapkan alat pemadam api</li>
              <li>Laporkan titik api segera</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Kekeringan</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Hemat penggunaan air</li>
              <li>Tampung air hujan</li>
              <li>Jaga sumber air</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Umum</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Ikuti informasi cuaca</li>
              <li>Siapkan rencana darurat</li>
              <li>Koordinasi dengan pihak terkait</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
