import React, { useState } from "react";

interface Message {
  sender: "IA" | "User";
  text: string;
}

const initialMessages: Message[] = [
  {
    sender: "IA",
    text: "¡Hola! Soy tu mentor IA. ¿En qué puedo ayudarte hoy?",
  },
  {
    sender: "User",
    text: "Hola, necesito algunos consejos para mejorar mi productividad.",
  },
  {
    sender: "IA",
    text: "¡Claro! Te sugiero que dividas tu día en bloques de tiempo y te propongas metas diarias.",
  },
];

const IA: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    // Agregar mensaje del usuario
    const userMsg: Message = { sender: "User", text: newMessage };
    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");

    // Respuestas automáticas de la IA; dos mensajes extra
    setTimeout(() => {
      const iaMsg1: Message = {
        sender: "IA",
        text:
          "Interesante, ¿has probado establecer recordatorios y revisar tus objetivos cada mañana? Esto te ayudará a mantener el enfoque.",
      };
      setMessages((prev) => [...prev, iaMsg1]);
    }, 1000);

    setTimeout(() => {
      const iaMsg2: Message = {
        sender: "IA",
        text:
          "Además, intenta dividir tus tareas en partes más pequeñas para que sean más fáciles de gestionar.",
      };
      setMessages((prev) => [...prev, iaMsg2]);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Contenedor de la tarjeta del chat */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <h2 className="font-semibold mb-4">Chat Mentor IA</h2>
        {/* Ventana de mensajes con diseño de chat bubbles */}
        <div className="h-80 overflow-y-auto border p-3 rounded-lg bg-neutral-50 flex flex-col gap-2">
          {messages.map((msg, index) =>
            msg.sender === "IA" ? (
              <div key={index} className="flex items-start">
                <div className="bg-green-100 text-green-800 p-3 rounded-lg max-w-xs">
                  <span className="font-bold">Mentor IA:</span>
                  <p>{msg.text}</p>
                </div>
              </div>
            ) : (
              <div key={index} className="flex justify-end">
                <div className="bg-blue-100 text-gray-800 p-3 rounded-lg max-w-xs">
                  <span className="font-bold">Tú:</span>
                  <p>{msg.text}</p>
                </div>
              </div>
            )
          )}
        </div>
        {/* Campo para enviar mensajes */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg transition-colors hover:bg-primary-700"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IA;
