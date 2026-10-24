import { useState } from "react";
import { X, BookOpen, CheckCircle, FileText, Image as ImageIcon } from "lucide-react";

interface MethodologyReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MethodologyReferenceModal({ isOpen, onClose }: MethodologyReferenceModalProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "ref1" | "ref2" | "workflow">("summary");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden font-times">
        {/* Cabeçalho */}
        <div className="bg-[#0c232c] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#1f4a5c]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base tracking-wide">
              Documentos de Referência & Metodologia Académica
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Abas */}
        <div className="bg-gray-100 border-b border-gray-300 px-5 flex gap-2 pt-2">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-3 py-1.5 rounded-t text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "summary"
                ? "bg-white text-[#0c232c] border-t-2 border-t-[#0c232c] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Síntese do Exercício
          </button>
          <button
            onClick={() => setActiveTab("ref2")}
            className={`px-3 py-1.5 rounded-t text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "ref2"
                ? "bg-white text-[#0c232c] border-t-2 border-t-[#0c232c] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            Documento Original (Imagem 2)
          </button>
          <button
            onClick={() => setActiveTab("ref1")}
            className={`px-3 py-1.5 rounded-t text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "ref1"
                ? "bg-white text-[#0c232c] border-t-2 border-t-[#0c232c] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
            Referência Visual (Imagem 1)
          </button>
          <button
            onClick={() => setActiveTab("workflow")}
            className={`px-3 py-1.5 rounded-t text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "workflow"
                ? "bg-white text-[#0c232c] border-t-2 border-t-[#0c232c] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Metodologia em 3 Fases
          </button>
        </div>

        {/* Conteúdo da Aba */}
        <div className="p-6 overflow-auto flex-1 space-y-4 text-xs text-gray-700 leading-relaxed">
          {activeTab === "summary" && (
            <div className="space-y-4">
              <div className="bg-blue-50/70 border border-blue-200 p-3.5 rounded">
                <h4 className="font-bold text-sm text-blue-950 mb-1">
                  Estudo Acústico de uma Sala de Aula — Parâmetros Verificados
                </h4>
                <p className="text-gray-600">
                  Todos os cálculos e dimensões foram rigorosamente sincronizados com o documento de exercício fornecido:
                </p>
                <div className="grid grid-cols-3 gap-2 mt-2 text-[11px]">
                  <div className="p-2 bg-white rounded border border-blue-100">
                    <strong className="block text-gray-900">Dimensões Livres:</strong>
                    8,00 × 7,00 × 3,00 m (V = 168,00 m³)
                  </div>
                  <div className="p-2 bg-white rounded border border-blue-100">
                    <strong className="block text-gray-900">Lambril e Janelas:</strong>
                    hl = 0,80 m · 4 Janelas de 1,60 × 1,20 m
                  </div>
                  <div className="p-2 bg-white rounded border border-blue-100">
                    <strong className="block text-gray-900">Absorção Inicial:</strong>
                    A1 = 34,30 m² sabin · Tr = 0,78 s
                  </div>
                  <div className="p-2 bg-white rounded border border-blue-100">
                    <strong className="block text-gray-900">Proposta de Melhoria:</strong>
                    +10 m² chapa acústica (ΔA = 7,50 m²)
                  </div>
                  <div className="p-2 bg-white rounded border border-blue-100">
                    <strong className="block text-gray-900">Novo Tempo de Reverberação:</strong>
                    Tr novo = 0,64 s (Conforme ANSI S12.60)
                  </div>
                  <div className="p-2 bg-white rounded border border-blue-100">
                    <strong className="block text-gray-900">Cartela Regulamentar:</strong>
                    UEM · FAPF · Delcídio Nhatingo
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded">
                <strong className="text-gray-900 block mb-1">Cotas e Vãos Atualizados na Prancha:</strong>
                <p className="text-gray-600 leading-normal">
                  - Parede Norte e Sul: cotas parciais de 0,20 | 1,70 | 1,60 | 1,40 | 1,60 | 1,70 | 0,20 (Total interior 8,00 m, exterior 8,40 m).<br />
                  - Parede Este: Porta de 0,90 m no topo e pano cego de 5,70 m (Total interior 7,00 m, exterior 7,40 m).<br />
                  - Corte esquemático: Janelas nas paredes laterais, lambril hl = 0,80 m, porta em alçado e marcadores numerados ① a ⑥.
                </p>
              </div>
            </div>
          )}

          {activeTab === "ref2" && (
            <div className="space-y-3">
              <div className="text-xs text-gray-600">
                Visualização do documento original com os 6 tópicos do exercício (Dados, Volume, Áreas, Absorção, Sabine e Proposta):
              </div>
              <div className="border border-gray-300 rounded overflow-hidden bg-gray-100 flex items-center justify-center p-2">
                <img
                  src="/assets/aistudio/Screenshot_2026-10-24_004350_2e809a68.png"
                  alt="Documento Original do Exercício UEM"
                  className="max-h-[600px] w-auto object-contain rounded shadow-xs"
                />
              </div>
            </div>
          )}

          {activeTab === "ref1" && (
            <div className="space-y-3">
              <div className="text-xs text-gray-600">
                Visualização da referência gráfica vertical de Acústica Arquitetónica (FAPF TCA):
              </div>
              <div className="border border-gray-300 rounded overflow-hidden bg-gray-100 flex items-center justify-center p-2">
                <img
                  src="/assets/aistudio/Screenshot_2026-10-24_002124_25054d23.png"
                  alt="Referência Visual de Acústica"
                  className="max-h-[600px] w-auto object-contain rounded shadow-xs"
                />
              </div>
            </div>
          )}

          {activeTab === "workflow" && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <strong className="text-blue-900 block font-bold mb-1">
                  Fase 1: Criação do Modelo Visual (Concluída)
                </strong>
                Composição em grelha DIN de 12 colunas, formato A2 horizontal (594 × 420 mm), tipografia Times New Roman e portão de aprovação formal.
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <strong className="text-gray-900 block font-bold mb-1">
                  Fase 2: Revisão do Modelo
                </strong>
                Ajustes solicitados pelo discente (janelas laterais no corte, legenda em marcadores, substituição da cartela e novos formatos de download).
              </div>
              <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                <strong className="text-emerald-900 block font-bold mb-1">
                  Fase 3: Conversão e Exportação
                </strong>
                Geração da prancha técnica completa para exportação direta em PDF para plotter, PNG de alta definição, JPEG, PowerPoint (PPT), Word (DOC), Excel (CSV) e SVG vetorial.
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-100 px-5 py-3 flex justify-end text-xs border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0c232c] text-white rounded font-bold hover:bg-[#163c4a] cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
