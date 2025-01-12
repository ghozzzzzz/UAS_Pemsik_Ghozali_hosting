import { Outlet } from 'react-router-dom';
import PublicHeader from '../Component/PublicHeader';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <PublicHeader />
      <main className="container mx-auto py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
