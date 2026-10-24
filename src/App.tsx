/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import {
  ZoomIn,
  ZoomOut,
  Download,
  Printer,
  Grid3X3,
  Sliders,
  CheckCircle2,
  BookOpen,
  RotateCcw,
  FileText,
  Presentation,
  Image as ImageIcon,
  ChevronDown,
  Globe,
} from "lucide-react";

import { UEMAcousticBoardA2 } from "./components/UEMAcousticBoardA2";
import { AcousticFloorPlanExactSVG } from "./components/AcousticFloorPlanExactSVG";
import { AcousticSectionCutSVG } from "./components/AcousticSectionCutSVG";
import { DrawingLightboxModal } from "./components/DrawingLightboxModal";
import { AcousticSimulatorModal } from "./components/AcousticSimulatorModal";
import { ApprovalGateModal } from "./components/ApprovalGateModal";
import { MethodologyReferenceModal } from "./components/MethodologyReferenceModal";
import { DownloadModal } from "./components/DownloadModal";
import {
  exportToStandaloneHTML,
  exportToDirectPDF,
  exportToPrintPDF,
  exportToPNG,
  exportToJPEG,
  exportToWord,
  exportToPowerPoint,
  exportToCSV,
  exportToSVG,
} from "./utils/exportTools";

export default function App() {
  const [zoom, setZoom] = useState<number>(0.72);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showMargins, setShowMargins] = useState<boolean>(false);
  const [showPlotterMarks, setShowPlotterMarks] = useState<boolean>(true);

  // Modals state
  const [activeDrawing, setActiveDrawing] = useState<"plan" | "section" | null>(null);
  const [showSimulator, setShowSimulator] = useState<boolean>(false);
  const [showApprovalGate, setShowApprovalGate] = useState<boolean>(false);
  const [showMethodology, setShowMethodology] = useState<boolean>(false);
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState<boolean>(false);

  // Approval status
  const [isApproved, setIsApproved] = useState<boolean>(true);
  const [userNotes, setUserNotes] = useState<string>("");

  // Export status notification
  const [exportingMessage, setExportingMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-fit on initial mount
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 48;
        const availableHeight = containerRef.current.clientHeight - 48;
        const scaleX = availableWidth / 1485;
        const scaleY = availableHeight / 1050;
        const autoScale = Math.min(scaleX, scaleY, 0.95);
        setZoom(Number(Math.max(0.4, autoScale).toFixed(2)));
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFitToScreen = () => {
    if (containerRef.current) {
      const availableWidth = containerRef.current.clientWidth - 48;
      const availableHeight = containerRef.current.clientHeight - 48;
      const scaleX = availableWidth / 1485;
      const scaleY = availableHeight / 1050;
      const autoScale = Math.min(scaleX, scaleY, 0.95);
      setZoom(Number(Math.max(0.4, autoScale).toFixed(2)));
    }
  };

  return (
    <div className="min-h-screen bg-[#090e12] text-gray-100 flex flex-col overflow-hidden font-century select-none">
      {/* ========================================================
          BARRA DE FERRAMENTAS SUPERIOR (NO-PRINT)
         ======================================================== */}
      <header className="no-print bg-[#0c232c] border-b border-[#1f4a5c] px-4 py-2 flex items-center justify-between z-40 shadow-lg shrink-0">
        {/* Identificação e Título */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#851b1b] flex items-center justify-center font-bold text-white border border-red-500 shadow-sm text-sm">
            A2
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-wide">
                Prancha Académica A2 · Estudo Acústico UEM
              </h1>
              <span className="text-[10px] bg-cyan-900/80 text-cyan-200 px-1.5 py-0.2 rounded border border-cyan-700">
                594 × 420 mm
              </span>
            </div>
            <div className="text-[11px] text-gray-300 flex items-center gap-2">
              <span>Universidade Eduardo Mondlane</span>
              <span>·</span>
              <span className="text-[#f59e0b] font-bold">Discente: Delcídio Nhatingo</span>
              <span>·</span>
              <span className="text-gray-400">TCA (III Ano)</span>
            </div>
          </div>
        </div>

        {/* Controles de Navegação, Guias e Ferramentas */}
        <div className="flex items-center gap-2 text-xs">
          {/* Zoom Controls */}
          <div className="flex items-center bg-[#06151b] rounded border border-[#1b3d4b] p-0.5">
            <button
              onClick={() => setZoom((prev) => Math.max(0.35, Number((prev - 0.1).toFixed(2))))}
              className="p-1.5 hover:bg-[#112d38] rounded text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Reduzir Zoom (-)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono font-bold text-cyan-300 min-w-[48px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((prev) => Math.min(1.6, Number((prev + 0.1).toFixed(2))))}
              className="p-1.5 hover:bg-[#112d38] rounded text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Aumentar Zoom (+)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFitToScreen}
              className="px-2 py-1 text-[10px] hover:bg-[#112d38] text-gray-300 hover:text-white border-l border-[#1b3d4b] transition-colors cursor-pointer"
              title="Ajustar à Janela"
            >
              Ajustar
            </button>
            <button
              onClick={() => setZoom(1.0)}
              className={`px-2 py-1 text-[10px] hover:bg-[#112d38] border-l border-[#1b3d4b] transition-colors cursor-pointer ${
                zoom === 1.0 ? "text-amber-400 font-bold" : "text-gray-300"
              }`}
              title="Escala Real 100% (1:1)"
            >
              100% (1:1)
            </button>
          </div>

          {/* Guias Técnicas (Toggle) */}
          <div className="flex items-center bg-[#06151b] rounded border border-[#1b3d4b] p-0.5">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                showGrid
                  ? "bg-cyan-700 text-white font-bold"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              title="Ativar/Desativar Grelha Modular DIN 12 Colunas"
            >
              <Grid3X3 className="w-3 h-3" />
              Grelha
            </button>
            <button
              onClick={() => setShowMargins(!showMargins)}
              className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                showMargins
                  ? "bg-red-700 text-white font-bold"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              title="Exibir Margens de Segurança (20 mm)"
            >
              Margens (20mm)
            </button>
            <button
              onClick={() => setShowPlotterMarks(!showPlotterMarks)}
              className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                showPlotterMarks ? "text-cyan-300" : "text-gray-500"
              }`}
              title="Marcas de Corte para Plotter (10 mm)"
            >
              Marcas Plotter
            </button>
          </div>

          {/* Simulador Sabine Interativo */}
          <button
            onClick={() => setShowSimulator(true)}
            className="px-2.5 py-1.5 bg-[#163c4a] hover:bg-[#1f4a5c] text-cyan-200 rounded border border-cyan-700/60 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Abrir Simulador de Otimização Acústica"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulador Sabine</span>
          </button>

          {/* Metodologia & Referências */}
          <button
            onClick={() => setShowMethodology(true)}
            className="px-2.5 py-1.5 bg-[#163c4a] hover:bg-[#1f4a5c] text-gray-200 rounded border border-[#2b5869] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Consultar Documentos e Metodologia"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
            <span>Ver Referências</span>
          </button>

          {/* Botão Rápido HTML A2 (Novo Método 100% Confiável) */}
          <button
            onClick={() => {
              try {
                setExportingMessage("A descarregar Ficheiro Autónomo HTML A2...");
                exportToStandaloneHTML();
                setExportingMessage("Ficheiro HTML A2 descarregado com sucesso!");
                setTimeout(() => setExportingMessage(null), 3000);
              } catch (err) {
                console.error(err);
                setExportingMessage("Erro ao exportar HTML. Abra a Central de Downloads.");
                setTimeout(() => setExportingMessage(null), 3500);
              }
            }}
            className="px-2.5 py-1.5 bg-[#047857] hover:bg-emerald-600 text-white rounded font-bold border border-emerald-400 flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            title="Descarregar Ficheiro Autónomo HTML A2 com impressão integrada para PDF 600 DPI (Sem Erros)"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>HTML (A2)</span>
          </button>

          {/* Botão Rápido PDF Direto */}
          <button
            onClick={async () => {
              try {
                setExportingMessage("A gerar Prancha PDF A2 (594 × 420 mm)...");
                await exportToDirectPDF();
                setExportingMessage("PDF A2 descarregado com sucesso!");
                setTimeout(() => setExportingMessage(null), 3000);
              } catch (err) {
                console.error(err);
                setExportingMessage("Falha no PDF direto. A usar opção HTML ou Central de Downloads...");
                setShowDownloadModal(true);
                setTimeout(() => setExportingMessage(null), 3000);
              }
            }}
            className="px-2.5 py-1.5 bg-[#851b1b] hover:bg-red-700 text-white rounded font-bold border border-red-500 flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            title="Descarregar Ficheiro PDF Direto da Prancha A2 (594 × 420 mm)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF (A2)</span>
          </button>

          {/* Botão Rápido PNG */}
          <button
            onClick={async () => {
              try {
                setExportingMessage("A gerar imagem PNG de alta resolução...");
                await exportToPNG();
                setExportingMessage("Imagem PNG descarregada com sucesso!");
                setTimeout(() => setExportingMessage(null), 3000);
              } catch (err) {
                console.error(err);
                setExportingMessage("Erro ao exportar PNG. Abrindo Central de Downloads...");
                setShowDownloadModal(true);
                setTimeout(() => setExportingMessage(null), 3000);
              }
            }}
            className="px-2.5 py-1.5 bg-[#0369a1] hover:bg-sky-600 text-white rounded font-bold border border-sky-500 flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            title="Descarregar Imagem PNG de Alta Resolução"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>PNG</span>
          </button>

          {/* Botão Rápido JPEG */}
          <button
            onClick={async () => {
              try {
                setExportingMessage("A gerar imagem JPEG em alta qualidade...");
                await exportToJPEG();
                setExportingMessage("Imagem JPEG descarregada com sucesso!");
                setTimeout(() => setExportingMessage(null), 3000);
              } catch (err) {
                console.error(err);
                setExportingMessage("Erro ao exportar JPEG.");
                setShowDownloadModal(true);
                setTimeout(() => setExportingMessage(null), 3000);
              }
            }}
            className="px-2.5 py-1.5 bg-[#b45309] hover:bg-amber-600 text-white rounded font-bold border border-amber-500 flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            title="Descarregar Imagem JPEG de Alta Qualidade (95%)"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>JPEG</span>
          </button>

          {/* Botão Imprimir Plotter */}
          <button
            onClick={exportToPrintPDF}
            className="px-2 py-1.5 bg-[#521313] hover:bg-[#6b1919] text-gray-200 hover:text-white rounded border border-red-800 flex items-center gap-1 transition-colors cursor-pointer text-[11px]"
            title="Abrir Diálogo de Impressão / Plotter A2"
          >
            <Printer className="w-3 h-3 text-red-300" />
            <span>Plotter</span>
          </button>

          {/* Botão Rápido Word */}
          <button
            onClick={() => exportToWord()}
            className="px-2 py-1.5 bg-[#0e7490] hover:bg-cyan-600 text-white rounded font-medium border border-cyan-500 flex items-center gap-1 transition-colors shadow-sm cursor-pointer text-[11px]"
            title="Descarregar Relatório Completo em Microsoft Word (.doc)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Word</span>
          </button>

          {/* Botão Rápido PPT */}
          <button
            onClick={async () => {
              try {
                setExportingMessage("A gerar Apresentação PowerPoint (.ppt) em Century Gothic...");
                await exportToPowerPoint();
                setExportingMessage("Apresentação PPT descarregada com sucesso!");
                setTimeout(() => setExportingMessage(null), 3000);
              } catch (err) {
                console.error(err);
                setExportingMessage("Erro ao exportar PPT.");
                setTimeout(() => setExportingMessage(null), 3000);
              }
            }}
            className="px-2 py-1.5 bg-[#c2410c] hover:bg-orange-600 text-white rounded font-medium border border-orange-500 flex items-center gap-1 transition-colors shadow-sm cursor-pointer text-[11px]"
            title="Descarregar Apresentação em Microsoft PowerPoint (.ppt)"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>PPT</span>
          </button>

          {/* Menu Dropdown de Mais Formatos (CSV, SVG) & Central de Downloads */}
          <div className="relative">
            <button
              onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
              className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded font-bold border border-emerald-500 flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              title="Mais Opções de Download"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Downloads</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Dropdown Menu */}
            {showDownloadDropdown && (
              <div className="absolute right-0 mt-1 w-64 bg-[#0c161d] border border-[#1f3a47] rounded shadow-xl z-50 text-xs py-1 font-century">
                <button
                  onClick={() => {
                    exportToStandaloneHTML();
                    setShowDownloadDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-[#162d3a] flex items-center gap-2 text-emerald-300 font-bold"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>HTML Autónomo A2 (.html)</span>
                </button>
                <button
                  onClick={() => {
                    exportToJPEG();
                    setShowDownloadDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-[#162d3a] flex items-center gap-2 text-gray-200"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>JPEG (Imagem 95%)</span>
                </button>
                <button
                  onClick={() => {
                    exportToCSV();
                    setShowDownloadDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-[#162d3a] flex items-center gap-2 text-gray-200"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Excel / CSV (Cálculos)</span>
                </button>
                <button
                  onClick={() => {
                    exportToSVG();
                    setShowDownloadDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-[#162d3a] flex items-center gap-2 text-gray-200"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>SVG Vetorial (CAD)</span>
                </button>
                <div className="border-t border-[#1f3a47] my-1" />
                <button
                  onClick={() => {
                    setShowDownloadModal(true);
                    setShowDownloadDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-[#162d3a] flex items-center gap-2 text-cyan-300 font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Abrir Central de Downloads...</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================
          BANNER DE STATUS (CONFORME DADOS DA IMAGEM 2)
         ======================================================== */}
      <div className="no-print bg-[#08171f] border-b border-[#14323d] px-4 py-1.5 flex items-center justify-between text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>
            <strong className="text-white">Exercício UEM 100% Sincronizado:</strong> V = 168,00 m³ · hl = 0,80 m · 4 Janelas (1,60×1,20 m) · A1 = 34,30 m² · Tr = 0,78 s → Anovo = 41,80 m² · Tr novo = 0,64 s.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Prancha Aprovada & Pronta para Entrega
          </span>
          <button
            onClick={() => setShowDownloadModal(true)}
            className="bg-emerald-700/80 hover:bg-emerald-600 text-white px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer"
          >
            Exportar Prancha
          </button>
        </div>
      </div>

      {/* ========================================================
          CANVAS DE VISUALIZAÇÃO DA PRANCHA A2
         ======================================================== */}
      <main
        ref={containerRef}
        className="flex-1 overflow-auto bg-[#0a1014] relative p-8 flex items-center justify-center min-h-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div
          className="transition-transform duration-150 ease-out origin-center shrink-0 my-auto"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
          }}
        >
          <UEMAcousticBoardA2
            showGrid={showGrid}
            showMargins={showMargins}
            showPlotterMarks={showPlotterMarks}
            onExpandPlan={() => setActiveDrawing("plan")}
            onExpandSection={() => setActiveDrawing("section")}
          />
        </div>

        {/* Notificação Flutuante de Exportação */}
        {exportingMessage && (
          <div className="fixed bottom-14 right-6 bg-[#0c232c] text-white px-4 py-2.5 rounded-lg border border-cyan-500/60 shadow-2xl z-50 flex items-center gap-3 font-century">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-medium">{exportingMessage}</span>
          </div>
        )}
      </main>

      {/* ========================================================
          RODAPÉ DE NAVEGAÇÃO RÁPIDA (NO-PRINT)
         ======================================================== */}
      <footer className="no-print bg-[#081216] border-t border-[#162a33] px-4 py-2 flex items-center justify-between text-xs text-gray-400 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-gray-300">
            Formato: <strong className="text-white">ISO 216 A2 (594 × 420 mm)</strong>
          </span>
          <span>·</span>
          <span>
            Proporção: <strong className="text-white">1:√2 (1,414)</strong>
          </span>
          <span>·</span>
          <span>
            Frequência: <strong className="text-cyan-300">500 Hz</strong>
          </span>
          <span>·</span>
          <span>
            Downloads Disponíveis: <strong className="text-emerald-400">PDF, PPT, Word, PNG, JPEG, Excel, SVG</strong>
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-gray-400">
            Dica: Clique em <strong className="text-white">[Ampliar]</strong> para ver detalhes em tela cheia.
          </span>
          <button
            onClick={handleFitToScreen}
            className="flex items-center gap-1 text-cyan-300 hover:text-white underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Redefinir Enquadramento
          </button>
        </div>
      </footer>

      {/* ========================================================
          MODAIS E LIGHTBOXES DE INSPEÇÃO & DOWNLOAD
         ======================================================== */}
      {/* Lightbox da Planta Baixa */}
      <DrawingLightboxModal
        isOpen={activeDrawing === "plan"}
        onClose={() => setActiveDrawing(null)}
        title="Planta Baixa Cotada da Sala de Aulas (1:100)"
      >
        <AcousticFloorPlanExactSVG className="w-full" />
      </DrawingLightboxModal>

      {/* Lightbox do Corte Esquemático */}
      <DrawingLightboxModal
        isOpen={activeDrawing === "section"}
        onClose={() => setActiveDrawing(null)}
        title="Corte Esquemático da Sala de Aulas (Janelas Laterais)"
      >
        <AcousticSectionCutSVG className="w-full" />
      </DrawingLightboxModal>

      {/* Simulador Sabine */}
      <AcousticSimulatorModal
        isOpen={showSimulator}
        onClose={() => setShowSimulator(false)}
      />

      {/* Portão de Aprovação (Fase 1) */}
      <ApprovalGateModal
        isOpen={showApprovalGate}
        onClose={() => setShowApprovalGate(false)}
        onApprove={(notes) => {
          setIsApproved(true);
          setUserNotes(notes);
          setShowApprovalGate(false);
        }}
        onRequestRevisions={(notes) => {
          setIsApproved(false);
          setUserNotes(notes);
          setShowApprovalGate(false);
        }}
      />

      {/* Metodologia Reference Modal */}
      <MethodologyReferenceModal
        isOpen={showMethodology}
        onClose={() => setShowMethodology(false)}
      />

      {/* Central de Downloads Modal */}
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </div>
  );
}
