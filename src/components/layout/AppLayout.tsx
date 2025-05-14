import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import { Bell } from "lucide-react";

const AppLayout: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Notificaciones simuladas
  const notifications = [
    "📩 Tienes 3 mensajes nuevos en el chat.",
    "🤖 Tu mentor IA te envió un recordatorio.",
    "✅ Marca tus tareas completadas para avanzar.",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
        {/* Logo en la esquina superior izquierda */}
        <div className="flex items-center">
          <img src="Public/logo.png" alt="App Logo" className="h-10 w-auto" />
          <span className="ml-1 font-bold text-2xl text-[#adef91]">On-Life</span>
        </div>

        {/* Botón de notificaciones (campana) */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
          >
            <Bell size={28} className="text-[#adef91]" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="p-3">
                {notifications.map((note, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-700 border-b last:border-b-0 py-2"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 container mx-auto px-4 py-6 mb-16">
        <Outlet />
      </main>

      {/* Barra de navegación inferior */}
      <BottomNav />
    </div>
  );
};

export default AppLayout;


