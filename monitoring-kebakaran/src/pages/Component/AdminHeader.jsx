import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../Redux/authSlice';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4">
          {/* User Name */}
          <span className="text-2xl font-bold tracking-wide uppercase">
            {user?.name || "Admin"}
          </span>
          <nav className="flex items-center space-x-6">
            <Link 
              to="/admin" 
              className={`hover:text-gray-200 ${location.pathname === '/admin' ? 'font-bold' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/fire-incidents" 
              className={`hover:text-gray-200 ${location.pathname === '/admin/fire-incidents' ? 'font-bold' : ''}`}
            >
              Data Kebakaran
            </Link>
            <Link 
              to="/admin/drought-incidents" 
              className={`hover:text-gray-200 ${location.pathname === '/admin/drought-incidents' ? 'font-bold' : ''}`}
            >
              Data Kekeringan
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => dispatch(logout())}
                className="bg-red-700 px-4 py-2 rounded hover:bg-red-800"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
