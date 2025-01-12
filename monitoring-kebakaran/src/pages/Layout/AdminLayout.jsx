import { Outlet } from 'react-router-dom';
import AdminHeader from '../Component/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <main className="container mx-auto py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
