import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Dumbbell,
  Utensils,
  Moon,
  LayoutGrid,
  Heart,
  Target,
  Users,
  MessageSquare,
} from "lucide-react";

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 transition-all duration-200 transform hover:scale-105 hover:text-[#0B6E4F] ${
              isActive ? "text-primary-600" : "text-neutral-600"
            }`
          }
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>

        <NavLink
          to="/exercise"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 transition-all duration-200 transform hover:scale-105 hover:text-[#0B6E4F] ${
              isActive ? "text-primary-600" : "text-neutral-600"
            }`
          }
        >
          <Dumbbell size={24} />
          <span className="text-xs mt-1">Exercise</span>
        </NavLink>

        <NavLink
          to="/nutrition"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 transition-all duration-200 transform hover:scale-105 hover:text-[#0B6E4F] ${
              isActive ? "text-primary-600" : "text-neutral-600"
            }`
          }
        >
          <Utensils size={24} />
          <span className="text-xs mt-1">Nutrition</span>
        </NavLink>

        {/* Nueva pestaña Sleep ubicada a la derecha de "Nutrition" */}
        <NavLink
          to="/sleep"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 transition-all duration-200 transform hover:scale-105 hover:text-[#0B6E4F] ${
              isActive ? "text-green-600" : "text-neutral-600"
            }`
          }
        >
          <Moon size={24} />
          <span className="text-xs mt-1">Sleep</span>
        </NavLink>

        <NavLink
          to="/organization"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 transition-all duration-200 transform hover:scale-105 hover:text-[#0B6E4F] ${
              isActive ? "text-primary-600" : "text-neutral-600"
            }`
          }
        >
          <LayoutGrid size={24} />
          <span className="text-xs mt-1">Organize</span>
        </NavLink>

        <NavLink
          to="/menstrual"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 transition-all duration-200 transform hover:scale-105 hover:text-[#0B6E4F] ${
              isActive ? "text-primary-600" : "text-neutral-600"
            }`
          }
        >
          <Heart size={24} />
          <span className="text-xs mt-1">Cycle</span>
        </NavLink>

        <NavLink
          to="/goals"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 transition-all duration-200 transform hover:scale-105 hover:text-[#0B6E4F] ${
              isActive ? "text-primary-600" : "text-neutral-600"
            }`
          }
        >
          <Target size={24} />
          <span className="text-xs mt-1">Goals</span>
        </NavLink>

        <NavLink
          to="/community"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 transition-all duration-200 transform hover:scale-105 hover:text-[#0B6E4F] ${
              isActive ? "text-primary-600" : "text-neutral-600"
            }`
          }
        >
          <Users size={24} />
          <span className="text-xs mt-1">Community</span>
        </NavLink>

        {/* Nueva pestaña IA, ubicada al extremo derecho */}
        <NavLink
          to="/ia"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 transition-all duration-200 transform hover:scale-105 hover:text-[#0B6E4F] ${
              isActive ? "text-primary-600" : "text-neutral-600"
            }`
          }
        >
          <MessageSquare size={24} />
          <span className="text-xs mt-1">IA</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
