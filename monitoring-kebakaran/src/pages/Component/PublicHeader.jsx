import { Link, useLocation } from 'react-router-dom';

const PublicHeader = () => {
  const location = useLocation();

  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Sistem Monitoring Bencana</h1>
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-gray-200 ${location.pathname === '/' ? 'font-bold' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/fire-incidents" 
              className={`hover:text-gray-200 ${location.pathname === '/fire-incidents' ? 'font-bold' : ''}`}
            >
              Data Kebakaran
            </Link>
            <Link 
              to="/drought-incidents" 
              className={`hover:text-gray-200 ${location.pathname === '/drought-incidents' ? 'font-bold' : ''}`}
            >
              Data Kekeringan
            </Link>
            <Link
              to="/login"
              className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
