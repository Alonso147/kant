import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  Dumbbell, 
  CalendarCheck, 
  Target, 
  Heart,
  Users,
  Settings,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/nutrition', label: 'Nutrition', icon: <Utensils size={20} /> },
    { path: '/exercise', label: 'Exercise', icon: <Dumbbell size={20} /> },
    { path: '/tasks', label: 'Tasks', icon: <CalendarCheck size={20} /> },
    { path: '/goals', label: 'Goals', icon: <Target size={20} /> },
    { path: '/menstrual', label: 'Cycle', icon: <Heart size={20} /> },
    { path: '/community', label: 'Community', icon: <Users size={20} /> },
  ];

  const secondaryItems: NavItem[] = [
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
    { path: '/help', label: 'Help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="flex flex-col h-full py-4">
      <div className="px-4 mb-6">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-primary-600 rounded-md flex items-center justify-center mr-2">
            <Heart size={20} className="text-white" />
          </div>
          {!collapsed && (
            <h1 className="text-xl font-bold text-neutral-900">WellTrack</h1>
          )}
        </div>
      </div>

      <div className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-3 py-2.5 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-neutral-700 hover:bg-neutral-100'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <span className="ml-3 text-sm font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </div>

      <div className="px-2 space-y-1 mt-4 mb-2 pt-4 border-t border-neutral-200">
        {secondaryItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-3 py-2.5 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-neutral-500 hover:bg-neutral-100'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <span className="ml-3 text-sm font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;