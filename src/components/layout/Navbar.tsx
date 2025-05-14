import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-20 bg-white border-b border-neutral-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary-600">On-life</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <User size={16} className="text-primary-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;