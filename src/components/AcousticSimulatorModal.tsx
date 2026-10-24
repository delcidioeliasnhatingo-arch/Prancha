import { useState } from "react";
import { X, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { ROOM_DATA, ABSORPTION_MATERIALS } from "../data/acousticBoardData";

interface AcousticSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AcousticSimulatorModal({ isOpen, onClose }: AcousticSimulatorModalProps) {
  const [additionalArea, setAdditionalArea] = useState<number>(10);
  const [panelCoefficient, setPanelCoefficient] = useState<number>(0.60);
  const [existingPlasterCoeff] = useState<number>(0.02);

  if (!isOpen) return null;

  // Max additional area is remaining ceiling plaster = 26 m²
  const maxAvailable = 26;

  // Calculations
  const deltaA = additionalArea * (panelCoefficient - existingPlasterCoeff);
  const simulatedTotalAbsorption = ROOM_DATA.initialAbsorption + deltaA;
  const simulatedTR = (ROOM_DATA.sabineConstant * ROOM_DATA.volume) / simulatedTotalAbsorption;

  const isCompliant = simulatedTR >= ROOM_DATA.standardMinTR && simulatedTR <= ROOM_DATA.standardMaxTR;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden font-times">
        <div className="bg-[#0c232c] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#1f4a5c]">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base tracking-wide">
              Simulador Acústico Interativo (Fórmula de Sabine)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-auto flex-1 space-y-4 text-xs">
          <p className="text-gray-600 leading-relaxed">
            Experimente diferentes áreas de substituição do reboco liso livre do teto (máx. 26 m²) por materiais fonoabsorventes para verificar a variação instantânea do Tempo de Reverberação (<span className="font-serif italic font-bold">TR</span>) segundo a norma <strong>ANSI/ASA S12.60</strong>.
          </p>

          {/* Controle Deslizante de Área */}
          <div className="bg-gray-50 p-3.5 rounded border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-800 text-xs">
                Área Adicional de Chapa Acústica no Teto (ΔS):
              </label>
              <span className="font-bold text-sm text-[#0c232c] bg-white px-2.5 py-0.5 rounded border border-gray-300">
                {additionalArea.toFixed(1)} m²
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={maxAvailable}
              step="1"
              value={additionalArea}
              onChange={(e) => setAdditionalArea(parseFloat(e.target.value))}
              className="w-full accent-[#0c232c] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>0 m² (Situação Atual)</span>
              <span className="text-emerald-700 font-bold">10 m² (Proposta Original UEM)</span>
              <span>26 m² (Teto 100% Acústico)</span>
            </div>
          </div>

          {/* Seleção do Coeficiente do Material */}
          <div className="bg-gray-50 p-3.5 rounded border border-gray-200 space-y-2">
            <label className="font-bold text-gray-800 block text-xs">
              Coeficiente de Absorção Sonora do Material (α a 500 Hz):
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPanelCoefficient(0.60)}
                className={`p-2 rounded border text-left transition-all ${
                  panelCoefficient === 0.60
                    ? "bg-[#0c232c] text-white border-[#0c232c]"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <div className="font-bold">Chapa Macia Padrão</div>
                <div className="text-[10px] opacity-80">α = 0,60 (UEM)</div>
              </button>
              <button
                type="button"
                onClick={() => setPanelCoefficient(0.75)}
                className={`p-2 rounded border text-left transition-all ${
                  panelCoefficient === 0.75
                    ? "bg-[#0c232c] text-white border-[#0c232c]"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <div className="font-bold">Lã Mineral Acústica</div>
                <div className="text-[10px] opacity-80">α = 0,75 (Alta perf.)</div>
              </button>
              <button
                type="button"
                onClick={() => setPanelCoefficient(0.85)}
                className={`p-2 rounded border text-left transition-all ${
                  panelCoefficient === 0.85
                    ? "bg-[#0c232c] text-white border-[#0c232c]"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <div className="font-bold">Nuvens Perfuradas</div>
                <div className="text-[10px] opacity-80">α = 0,85 (Premium)</div>
              </button>
            </div>
          </div>

          {/* Resultados Comparativos */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="text-[10px] font-bold text-red-700 uppercase">
                Situação Existente (Inicial)
              </div>
              <div className="text-xl font-bold text-red-900 mt-1">
                {ROOM_DATA.initialTR.toFixed(2)} s
              </div>
              <div className="text-[10px] text-red-700 mt-0.5">
                Absorção: {ROOM_DATA.initialAbsorption.toFixed(2)} m² sabin
              </div>
            </div>

            <div
              className={`p-3 rounded border ${
                isCompliant
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                  : "bg-amber-50 border-amber-300 text-amber-950"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Situação Simulada
                </span>
                {isCompliant ? (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Em Conformidade
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] text-amber-700 font-bold">
                    <AlertCircle className="w-3.5 h-3.5" /> Fora da Faixa
                  </span>
                )}
              </div>
              <div className="text-xl font-bold mt-1">
                {simulatedTR.toFixed(2)} s
              </div>
              <div className="text-[10px] opacity-80 mt-0.5">
                Absorção Total: {simulatedTotalAbsorption.toFixed(2)} m² sabin (+{deltaA.toFixed(2)})
              </div>
            </div>
          </div>

          {/* Gráfico de Barra Comparativo */}
          <div className="bg-gray-50 p-3 rounded border border-gray-200 space-y-2">
            <div className="text-[10px] font-bold text-gray-700 uppercase">
              Faixa Normativa ANSI/ASA S12.60 (Salas de Aula: 0,40 s a 0,65 s)
            </div>
            <div className="relative h-6 bg-gray-200 rounded overflow-hidden">
              {/* Faixa permitida */}
              <div
                className="absolute top-0 bottom-0 bg-emerald-200/80 border-x-2 border-emerald-500"
                style={{ left: "40%", width: "25%" }}
                title="Faixa Ideal: 0,40s - 0,65s"
              />
              {/* Marcador TR Inicial */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-red-600"
                style={{ left: `${Math.min(100, (ROOM_DATA.initialTR / 1.0) * 100)}%` }}
                title={`TR Inicial: ${ROOM_DATA.initialTR}s`}
              />
              {/* Marcador TR Simulado */}
              <div
                className="absolute top-0 bottom-0 w-2 bg-blue-700 rounded-full"
                style={{ left: `${Math.min(100, (simulatedTR / 1.0) * 100)}%` }}
                title={`TR Simulado: ${simulatedTR.toFixed(2)}s`}
              />
            </div>
            <div className="flex justify-between text-[9px] text-gray-500">
              <span>0,0 s</span>
              <span className="text-emerald-700 font-bold">0,40 s (Min)</span>
              <span className="text-emerald-700 font-bold">0,65 s (Max)</span>
              <span className="text-red-700 font-bold">0,78 s (Atual)</span>
              <span>1,0 s</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 px-5 py-3 flex justify-between items-center text-xs border-t border-gray-200">
          <button
            onClick={() => {
              setAdditionalArea(10);
              setPanelCoefficient(0.60);
            }}
            className="text-gray-600 hover:text-gray-900 underline"
          >
            Restaurar Valores Oficiais UEM
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0c232c] text-white rounded font-bold hover:bg-[#163c4a]"
          >
            Concluir Simulação
          </button>
        </div>
      </div>
    </div>
  );
}
