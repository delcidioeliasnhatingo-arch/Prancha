import { useState } from "react";
import {
  X,
  Download,
  FileText,
  Presentation,
  Image as ImageIcon,
  FileSpreadsheet,
  Printer,
  Check,
  Loader2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Globe,
  Eye,
  AlertCircle,
} from "lucide-react";
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
  generateBoardImagePreview,
} from "../utils/exportTools";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [loadingFormat, setLoadingFormat] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pré-visualização direta de imagem
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = async (
    format: string,
    filename: string,
    exportFn: () => Promise<string | void> | string | void
  ) => {
    try {
      setErrorMessage(null);
      setLoadingFormat(format);
      const res = await Promise.resolve(exportFn());
      if (typeof res === "string" && (res.startsWith("blob:") || res.startsWith("data:"))) {
        setDownloadUrl(res);
      }
      setDownloadFilename(filename);
      setDownloadSuccess(format);
      setTimeout(() => {
        setDownloadSuccess(null);
      }, 6000);
    } catch (error) {
      console.error(`Erro ao exportar ${format}:`, error);
      setErrorMessage(
        `Ocorreu um erro ao gerar o formato ${format}. Utilize a opção de "Ficheiro HTML Autónomo" ou o gerador de imagem direta abaixo.`
      );
    } finally {
      setLoadingFormat(null);
    }
  };

  const handleGeneratePreview = async () => {
    try {
      setIsPreviewLoading(true);
      setErrorMessage(null);
      const result = await generateBoardImagePreview();
      setPreviewDataUrl(result.dataUrl);
    } catch (err) {
      console.error("Erro ao gerar pré-visualização:", err);
      setErrorMessage("Não foi possível gerar a imagem no browser. Tente o formato HTML Autónomo.");
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const formats = [
    {
      id: "html_standalone",
      title: "Prancha Autónoma HTML (.html)",
      ext: ".html",
      category: "Novo Método Recomendado",
      desc: "Ficheiro independente e completo que abre em qualquer computador/browser. Permite gerar PDF A2 vetorial nativo de 600 DPI premindo Ctrl+P sem erros.",
      icon: Globe,
      color: "bg-emerald-950/40 text-emerald-300 border-emerald-600/60 hover:bg-emerald-900/40",
      btnColor: "bg-emerald-700 hover:bg-emerald-600 text-white",
      badge: "100% Confiável · Offline",
      filename: "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.html",
      action: () =>
        handleExport(
          "html_standalone",
          "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.html",
          () => exportToStandaloneHTML()
        ),
    },
    {
      id: "pdf_direct",
      title: "PDF Direto (A2 594 × 420 mm)",
      ext: ".pdf",
      category: "Documento de Impressão",
      desc: "Gera e descarrega ficheiro PDF em tamanho real A2 Paisagem (594 × 420 mm) com qualidade fotográfica e prancha completa.",
      icon: Download,
      color: "bg-red-950/40 text-red-300 border-red-700/60 hover:bg-red-900/40",
      btnColor: "bg-red-700 hover:bg-red-600 text-white",
      badge: "Download Direto A2",
      filename: "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.pdf",
      action: () =>
        handleExport(
          "pdf_direct",
          "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.pdf",
          () => exportToDirectPDF()
        ),
    },
    {
      id: "pdf_print",
      title: "PDF Plotter (Janela Nativa)",
      ext: ".pdf",
      category: "Plotter / Gráfica",
      desc: "Abre o diálogo nativo do sistema do seu navegador configurado para A2 Paisagem (594 × 420 mm) sem margens.",
      icon: Printer,
      color: "bg-rose-950/40 text-rose-300 border-rose-700/60 hover:bg-rose-900/40",
      btnColor: "bg-rose-700 hover:bg-rose-600 text-white",
      badge: "Vetorial 300/600 DPI",
      filename: "Plotter_Nativo.pdf",
      action: () => exportToPrintPDF(),
    },
    {
      id: "png",
      title: "PNG (Imagem Alta Resolução)",
      ext: ".png",
      category: "Imagem Rasterizada",
      desc: "Captura de ultra-alta fidelidade (escala 2x, 2970 × 2100 px) com traço CAD nítido e fundo branco regulamentar.",
      icon: ImageIcon,
      color: "bg-blue-950/40 text-blue-300 border-blue-700/60 hover:bg-blue-900/40",
      btnColor: "bg-blue-700 hover:bg-blue-600 text-white",
      badge: "Alta Nitidez (2x)",
      filename: "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.png",
      action: () =>
        handleExport(
          "png",
          "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.png",
          () => exportToPNG()
        ),
    },
    {
      id: "jpeg",
      title: "JPEG (Imagem Compacta)",
      ext: ".jpg",
      category: "Imagem Web / Envio",
      desc: "Ficheiro leve com 95% de qualidade para partilha imediata por WhatsApp, e-mail ou submissão rápida no portal UEM.",
      icon: ImageIcon,
      color: "bg-amber-950/40 text-amber-300 border-amber-700/60 hover:bg-amber-900/40",
      btnColor: "bg-amber-700 hover:bg-amber-600 text-white",
      badge: "Qualidade 95%",
      filename: "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.jpg",
      action: () =>
        handleExport(
          "jpeg",
          "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.jpg",
          () => exportToJPEG()
        ),
    },
    {
      id: "ppt",
      title: "PowerPoint (PPT Editável)",
      ext: ".ppt",
      category: "Apresentação de Slides",
      desc: "9 diapositivos formatados em Century Gothic com capa formal UEM, Planta, Corte, Tabelas de 1 a 6 e fórmulas de Sabine.",
      icon: Presentation,
      color: "bg-orange-950/40 text-orange-300 border-orange-700/60 hover:bg-orange-900/40",
      btnColor: "bg-orange-700 hover:bg-orange-600 text-white",
      badge: "9 Slides Office",
      filename: "Apresentacao_Acustica_UEM_Delcidio_Nhatingo.ppt",
      action: () =>
        handleExport(
          "ppt",
          "Apresentacao_Acustica_UEM_Delcidio_Nhatingo.ppt",
          () => exportToPowerPoint()
        ),
    },
    {
      id: "word",
      title: "Word (DOC Relatório Técnico)",
      ext: ".doc",
      category: "Documento de Texto",
      desc: "Relatório técnico em Century Gothic com cabeçalho institucional UEM, equações, tabelas de absorção e textos analíticos.",
      icon: FileText,
      color: "bg-cyan-950/40 text-cyan-300 border-cyan-700/60 hover:bg-cyan-900/40",
      btnColor: "bg-cyan-700 hover:bg-cyan-600 text-white",
      badge: "Relatório Completo",
      filename: "Estudo_Acustico_UEM_Delcidio_Nhatingo.doc",
      action: () =>
        handleExport(
          "word",
          "Estudo_Acustico_UEM_Delcidio_Nhatingo.doc",
          () => exportToWord()
        ),
    },
    {
      id: "csv",
      title: "Excel / Planilha (CSV)",
      ext: ".csv",
      category: "Tabelas e Cálculos",
      desc: "Planilha codificada em UTF-8 com todas as 11 áreas, coeficientes α a 500 Hz e balanço acústico para abrir no Excel.",
      icon: FileSpreadsheet,
      color: "bg-teal-950/40 text-teal-300 border-teal-700/60 hover:bg-teal-900/40",
      btnColor: "bg-teal-700 hover:bg-teal-600 text-white",
      badge: "Tabelas e Fórmulas",
      filename: "Calculos_Acustica_UEM_Delcidio_Nhatingo.csv",
      action: () =>
        handleExport(
          "csv",
          "Calculos_Acustica_UEM_Delcidio_Nhatingo.csv",
          () => exportToCSV()
        ),
    },
    {
      id: "svg",
      title: "SVG Vetorial (AutoCAD / Corel)",
      ext: ".svg",
      category: "Vetor Escalável",
      desc: "Prancha vetorial com planta cotada e corte esquemático para importação em AutoCAD, Revit, CorelDRAW ou Illustrator.",
      icon: Sparkles,
      color: "bg-purple-950/40 text-purple-300 border-purple-700/60 hover:bg-purple-900/40",
      btnColor: "bg-purple-700 hover:bg-purple-600 text-white",
      badge: "100% Vetorial CAD",
      filename: "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.svg",
      action: () =>
        handleExport(
          "svg",
          "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.svg",
          () => exportToSVG()
        ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#0c161d] text-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden font-century border border-[#1f3a47]">
        {/* Cabeçalho do Modal */}
        <div className="bg-[#091a21] px-6 py-3.5 flex items-center justify-between border-b border-[#1b3d4b]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#851b1b] flex items-center justify-center text-white border border-red-500 shadow-sm shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base tracking-wide text-white">
                  Central de Download e Exportação da Prancha A2
                </h3>
                <span className="text-[10px] bg-emerald-900/80 text-emerald-200 border border-emerald-600 px-2 py-0.5 rounded-full font-bold">
                  Novas Funções Ativas
                </span>
              </div>
              <p className="text-xs text-cyan-300/80 font-normal mt-0.5">
                Universidade Eduardo Mondlane · Discente: Delcídio Nhatingo · Formatos Oficiais
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notificação de Erro */}
        {errorMessage && (
          <div className="bg-red-950/90 border-b border-red-700 px-6 py-2.5 flex items-center gap-2 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Notificação de Sucesso com Link Físico Direto */}
        {downloadSuccess && (
          <div className="bg-emerald-950/90 border-b border-emerald-700 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Download de <strong>{downloadSuccess.toUpperCase()}</strong> preparado com sucesso!
              </span>
            </div>
            {downloadUrl && (
              <div className="flex items-center gap-2">
                <a
                  href={downloadUrl}
                  download={downloadFilename}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-[11px] inline-flex items-center gap-1 shadow"
                >
                  <Download className="w-3 h-3" />
                  Clique aqui se o download não iniciou
                </a>
              </div>
            )}
          </div>
        )}

        {/* Área de Conteúdo Scrollável */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5 text-xs">
          {/* Banner de Destaque: Novo Método HTML Autónomo */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-[#0a2322] to-[#0c1e28] border border-emerald-600/70 rounded-lg p-3.5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-800/60 rounded-md border border-emerald-500 text-emerald-300 shrink-0 mt-0.5">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-emerald-200 text-sm">
                    NOVA FUNÇÃO: Ficheiro Prancha Autónoma HTML (.html)
                  </h4>
                  <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700">
                    Sem Erros
                  </span>
                </div>
                <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                  Descarregue o ficheiro completo autónomo. Pode abri-lo em qualquer computador sem internet. Ao abrir, tem um botão no topo para gerar o PDF A2 vetorial nativo de alta definição através da impressão do navegador.
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                handleExport(
                  "html_standalone",
                  "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.html",
                  () => exportToStandaloneHTML()
                )
              }
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs flex items-center gap-1.5 shrink-0 shadow-md cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Descarregar HTML A2</span>
            </button>
          </div>

          {/* Grade de Todos os Formatos */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
              <span>Formatos Disponíveis para Descarregar:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {formats.map((item) => {
                const Icon = item.icon;
                const isLoading = loadingFormat === item.id;
                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-lg border transition-all flex flex-col justify-between ${item.color}`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 shrink-0" />
                          <h4 className="font-bold text-[13px] text-white leading-tight">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/50 border border-white/10 text-gray-300 font-mono">
                          {item.ext}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                        {item.category} · <span className="text-amber-300 font-normal">{item.badge}</span>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed mb-3">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex justify-end">
                      <button
                        onClick={item.action}
                        disabled={isLoading}
                        className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer ${item.btnColor} ${
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>A preparar...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Descarregar {item.ext}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NOVA SEÇÃO: Pré-visualizador e Download Manual à Prova de Falhas */}
          <div className="bg-[#091a21] border border-[#1b3d4b] rounded-lg p-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[#1b3d4b] pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-amber-900/40 text-amber-300 border border-amber-700/60">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    Alternativa à Prova de Falhas: Pré-visualização & Download Manual
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    Se o seu navegador bloquear o download automático, gere a imagem aqui e guarde diretamente com o botão direito do rato.
                  </p>
                </div>
              </div>
              <button
                onClick={handleGeneratePreview}
                disabled={isPreviewLoading}
                className="px-3.5 py-1.5 bg-[#0284c7] hover:bg-sky-500 text-white rounded font-bold text-xs flex items-center gap-1.5 shrink-0 shadow cursor-pointer transition-colors"
              >
                {isPreviewLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>A renderizar imagem...</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Gerar Pré-visualização</span>
                  </>
                )}
              </button>
            </div>

            {previewDataUrl ? (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0c161d] p-2.5 rounded border border-[#1f3a47]">
                  <span className="text-[11px] text-emerald-300 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Imagem da Prancha A2 renderizada com sucesso (2970 × 2100 px):
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={previewDataUrl}
                      download="Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.png"
                      className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs font-bold inline-flex items-center gap-1 shadow cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      Descarregar PNG Agora
                    </a>
                    <a
                      href={previewDataUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#1f4a5c] hover:bg-[#285d73] text-cyan-200 rounded text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Abrir em Separador
                    </a>
                  </div>
                </div>

                <div className="text-[11px] text-amber-300/90 bg-amber-950/30 border border-amber-700/40 p-2 rounded">
                  💡 <strong>Instrução manual:</strong> Se o botão acima não descarregar no seu dispositivo, basta clicar com o <strong>botão direito do rato</strong> sobre a imagem abaixo e escolher <strong>«Guardar imagem como...»</strong> (ou premir e manter pressionado no telemóvel/tablet).
                </div>

                <div className="max-h-72 overflow-auto border border-[#1f3a47] rounded bg-white p-1">
                  <img
                    src={previewDataUrl}
                    alt="Pré-visualização da Prancha A2 UEM"
                    className="w-full h-auto object-contain cursor-pointer"
                    title="Clique com o botão direito para guardar"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400 text-xs bg-[#06151b] rounded border border-[#1b3d4b]/60">
                Clique no botão azul <strong>«Gerar Pré-visualização»</strong> para criar e visualizar a imagem da prancha inteira aqui mesmo.
              </div>
            )}
          </div>
        </div>

        {/* Rodapé com Informações Técnicas */}
        <div className="bg-[#091a21] px-6 py-3 flex items-center justify-between text-xs text-gray-400 border-t border-[#1b3d4b]">
          <span className="text-[11px]">
            Universidade Eduardo Mondlane · Faculdade de Arquitectura e Planeamento Físico · TCA II
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#163c4a] hover:bg-[#1f4a5c] text-white rounded text-xs font-semibold cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
