import { X } from "lucide-react";
import { ReactNode } from "react";

interface DrawingLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function DrawingLightboxModal({ isOpen, onClose, title, children }: DrawingLightboxModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="bg-[#0c232c] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#1f4a5c]">
          <h3 className="font-bold text-base font-times tracking-wide">
            {title} — Inspeção em Alta Resolução
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-auto flex-1 bg-gray-50 flex items-center justify-center">
          <div className="w-full max-w-4xl bg-white p-4 rounded shadow-sm border border-gray-200">
            {children}
          </div>
        </div>
        <div className="bg-gray-100 px-5 py-2.5 flex justify-between items-center text-xs text-gray-600 font-times border-t border-gray-200">
          <span>Universidade Eduardo Mondlane · Faculdade de Arquitectura e Planeamento Físico</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0c232c] text-white rounded text-xs font-semibold hover:bg-[#163c4a]"
          >
            Fechar Visualização
          </button>
        </div>
      </div>
    </div>
  );
}
