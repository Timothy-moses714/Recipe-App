import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Timothy
      </div>
    </footer>
  );
}
