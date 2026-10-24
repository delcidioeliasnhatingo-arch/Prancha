import { useState } from "react";
import { CheckCircle2, ShieldAlert, X, MessageSquare } from "lucide-react";

interface ApprovalGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (notes: string) => void;
  onRequestRevisions: (notes: string) => void;
}

export function ApprovalGateModal({
  isOpen,
  onClose,
  onApprove,
  onRequestRevisions,
}: ApprovalGateModalProps) {
  const [approvedVisual, setApprovedVisual] = useState<boolean | null>(true);
  const [approvedLayout, setApprovedLayout] = useState<boolean | null>(true);
  const [needsAlterations, setNeedsAlterations] = useState<boolean | null>(false);
  const [observations, setObservations] = useState<string>("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden font-times">
        <div className="bg-[#0c232c] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#1f4a5c]">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base tracking-wide">
              Portão de Aprovação — Modelo Visual A2 (Fase 1)
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
          <div className="bg-amber-50 border border-amber-200 p-3 rounded text-amber-900 leading-relaxed">
            <strong>Regra Estrita da Metodologia:</strong> De acordo com as diretrizes do projeto, o processo é formalmente interrompido neste ponto para avaliação do discente/usuário. Nenhuma etapa posterior é finalizada sem a validação explícita do modelo visual.
          </div>

          <div className="space-y-3">
            {/* Questão 1 */}
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-bold text-gray-900 text-xs mb-2">
                1. O usuário aprova o estilo visual e a identidade gráfica da prancha A2?
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="q1"
                    checked={approvedVisual === true}
                    onChange={() => setApprovedVisual(true)}
                    className="accent-[#0c232c]"
                  />
                  <span className="text-gray-800">Sim, aprovo plenamente o estilo visual</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="q1"
                    checked={approvedVisual === false}
                    onChange={() => setApprovedVisual(false)}
                    className="accent-[#0c232c]"
                  />
                  <span className="text-gray-800">Não, necessita de ajustes</span>
                </label>
              </div>
            </div>

            {/* Questão 2 */}
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-bold text-gray-900 text-xs mb-2">
                2. A organização dos elementos (3 colunas, planta, corte com janelas laterais e tabelas) é adequada?
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="q2"
                    checked={approvedLayout === true}
                    onChange={() => setApprovedLayout(true)}
                    className="accent-[#0c232c]"
                  />
                  <span className="text-gray-800">Sim, a disposição é clara e equilibrada</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="q2"
                    checked={approvedLayout === false}
                    onChange={() => setApprovedLayout(false)}
                    className="accent-[#0c232c]"
                  />
                  <span className="text-gray-800">Requer reorganização</span>
                </label>
              </div>
            </div>

            {/* Questão 3 */}
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-bold text-gray-900 text-xs mb-2">
                3. É necessário alterar cores, tipografia Times New Roman ou disposição das legendas?
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="q3"
                    checked={needsAlterations === false}
                    onChange={() => setNeedsAlterations(false)}
                    className="accent-[#0c232c]"
                  />
                  <span className="text-gray-800">Não, está de acordo com o pretendido</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="q3"
                    checked={needsAlterations === true}
                    onChange={() => setNeedsAlterations(true)}
                    className="accent-[#0c232c]"
                  />
                  <span className="text-gray-800">Sim, desejo indicar alterações</span>
                </label>
              </div>
            </div>

            {/* Campo de Observações do Utilizador */}
            <div className="space-y-1">
              <label className="font-bold text-gray-800 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-gray-500" /> Observações do Discente / Revisor:
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Insira aqui notas adicionais, observações sobre cotas, tabelas ou considerações finais..."
                className="w-full h-20 p-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#0c232c] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-100 px-5 py-3 flex justify-between items-center text-xs border-t border-gray-200">
          <button
            onClick={() => onRequestRevisions(observations)}
            className="px-3.5 py-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-200 font-medium"
          >
            Solicitar Ajustes (Fase 2)
          </button>
          <button
            onClick={() => onApprove(observations)}
            className="px-5 py-2 bg-emerald-700 text-white rounded font-bold hover:bg-emerald-800 flex items-center gap-1.5 shadow"
          >
            <CheckCircle2 className="w-4 h-4" />
            Autorizar Modelo Visual A2 (Fase 1 Concluída)
          </button>
        </div>
      </div>
    </div>
  );
}
