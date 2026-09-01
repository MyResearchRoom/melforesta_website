// components/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "917796695552"; // add your number with country code
  const message = "Hello, I want to know more!";
  
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition duration-300 z-50"
    >
      <FaWhatsapp size={24} />
    </a>
  );
}