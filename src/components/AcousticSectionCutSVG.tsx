/**
 * Corte Esquemático da Sala de Aulas (1:100)
 * Atualizações:
 * 1. Porta posicionada no lado ESQUERDO (e não no direito)
 * 2. Janelas nas paredes laterais (esquerda e direita em corte)
 * 3. Lambril contínuo hl = 0,80 m
 * 4. Altura e proporções otimizadas para visibilidade 100% nítida e contínua
 * 5. Tipografia Century Gothic em todos os elementos.
 */

import { SECTION_CALLOUTS } from "../data/acousticBoardData";

interface AcousticSectionCutProps {
  className?: string;
  onExpand?: () => void;
}

export function AcousticSectionCutSVG({ className = "", onExpand }: AcousticSectionCutProps) {
  return (
    <div className={`bg-white rounded border border-gray-300 p-2 flex flex-col justify-between font-century ${className}`}>
      {/* Cabeçalho do Bloco */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-1 mb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0c232c] flex items-center justify-center text-[7.5px] text-white font-bold">
            B
          </span>
          <h4 className="text-[11px] font-bold text-gray-900 tracking-wide uppercase">
            Corte Esquemático da Sala de Aulas (1:100)
          </h4>
        </div>
        <div className="flex items-center gap-2 text-[9.5px] text-gray-600">
          <span className="bg-gray-100 px-1.5 py-0.2 rounded border border-gray-200 font-semibold text-gray-700">
            Escala 1:100 · H = 3,00 m · hl = 0,80 m
          </span>
          {onExpand && (
            <button
              onClick={onExpand}
              className="text-[#0c232c] hover:underline cursor-pointer text-[9.5px] font-medium"
              title="Ampliar Desenho"
            >
              [Ampliar]
            </button>
          )}
        </div>
      </div>

      {/* Desenho Técnico Vetorial SVG */}
      <div className="w-full flex justify-center items-center overflow-hidden my-0.5">
        <svg
          viewBox="0 0 680 280"
          className="w-full h-auto select-none"
          style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, 'Questrial', 'Montserrat', sans-serif" }}
        >
          <defs>
            {/* Hachura de alvenaria seccionada */}
            <pattern id="cut-wall-pattern-exact" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#334155" strokeWidth="1.2" />
            </pattern>
            {/* Hachura de betão armado (lajes de piso e tecto) */}
            <pattern id="cut-slab-pattern-exact" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="#e2e8f0" />
              <circle cx="3" cy="3" r="1" fill="#64748b" />
              <circle cx="9" cy="8" r="1.2" fill="#64748b" />
              <path d="M 1 10 L 4 12 M 7 2 L 10 0" stroke="#94a3b8" strokeWidth="0.8" />
            </pattern>
            {/* Padrão da chapa acústica suspensa */}
            <pattern id="cut-acoustic-pattern-exact" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#bae6fd" />
              <circle cx="4" cy="4" r="1" fill="#0284c7" />
            </pattern>
            {/* Seta de cota */}
            <marker id="dim-sec-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="#0f172a" />
            </marker>
          </defs>

          {/* Fundo do corte */}
          <rect x="0" y="0" width="680" height="280" fill="#fafafa" rx="4" />

          {/* LAJE DE PISO (BETÃO ARMADO): y = 220 -> 240 */}
          <rect x="100" y="220" width="410" height="20" fill="url(#cut-slab-pattern-exact)" stroke="#0f172a" strokeWidth="1.2" />

          {/* PAVIMENTO EM PARQUÊ DE MADEIRA (5 mm sobre a laje) */}
          <rect x="130" y="215" width="350" height="5" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />

          {/* PAREDE DE FUNDO EM ALÇADO (Reboco liso pintado: y 65 a 215) */}
          <rect x="130" y="65" width="350" height="150" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />

          {/* ========================================================
              PORTA DE MADEIRA NO LADO ESQUERDO (Conforme Pedido Explícito)
              Largura = 0,90 m = 45 px (x: 145 -> 190)
              Altura = 2,10 m = 105 px (y: 110 -> 215)
             ======================================================== */}
          {/* Vão da porta em alçado na esquerda */}
          <rect x="145" y="110" width="45" height="105" fill="#ffffff" stroke="#78350f" strokeWidth="1.5" />
          <rect x="150" y="115" width="35" height="45" fill="#fef3c7" stroke="#92400e" strokeWidth="1" />
          <rect x="150" y="165" width="35" height="45" fill="#fef3c7" stroke="#92400e" strokeWidth="1" />
          {/* Puxador da porta à direita do batente */}
          <circle cx="180" cy="168" r="2.2" fill="#d97706" />

          {/* Retorno do lambril à esquerda da porta (x: 130 -> 145) */}
          <rect x="130" y="175" width="15" height="40" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <line x1="130" y1="175" x2="145" y2="175" stroke="#b45309" strokeWidth="1.5" />

          {/* LAMBRIL PERIMÉTRICO DE MADEIRA À DIREITA DA PORTA (hl = 0,80 m = 40 px: y 175 a 215)
              Extensão contínua: de x=190 a x=480 (290 px)
          */}
          <rect x="190" y="175" width="290" height="40" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <line x1="190" y1="175" x2="480" y2="175" stroke="#b45309" strokeWidth="1.5" />
          {/* Frisos verticais do lambril */}
          <g stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.4">
            <line x1="220" y1="175" x2="220" y2="215" />
            <line x1="250" y1="175" x2="250" y2="215" />
            <line x1="280" y1="175" x2="280" y2="215" />
            <line x1="310" y1="175" x2="310" y2="215" />
            <line x1="340" y1="175" x2="340" y2="215" />
            <line x1="370" y1="175" x2="370" y2="215" />
            <line x1="400" y1="175" x2="400" y2="215" />
            <line x1="430" y1="175" x2="430" y2="215" />
            <line x1="460" y1="175" x2="460" y2="215" />
          </g>

          {/* LAJE DE TETO / COBERTURA (BETÃO ARMADO: y = 45 -> 65) */}
          <rect x="100" y="45" width="410" height="20" fill="url(#cut-slab-pattern-exact)" stroke="#0f172a" strokeWidth="1.2" />

          {/* CHAPA ACÚSTICA MACIA SUSPENSA NO TETO (Ca = 6,00 m = 300 px: x 155 a 455) */}
          <g stroke="#64748b" strokeWidth="0.8">
            <line x1="170" y1="65" x2="170" y2="72" />
            <line x1="230" y1="65" x2="230" y2="72" />
            <line x1="305" y1="65" x2="305" y2="72" />
            <line x1="380" y1="65" x2="380" y2="72" />
            <line x1="440" y1="65" x2="440" y2="72" />
          </g>
          <rect x="155" y="72" width="300" height="10" rx="1.5" fill="url(#cut-acoustic-pattern-exact)" stroke="#0284c7" strokeWidth="1.2" />

          {/* PAREDE LATERAL ESQUERDA (CORTADA) - COM VÃO DE JANELA LATERAL */}
          <rect x="120" y="165" width="10" height="50" fill="url(#cut-wall-pattern-exact)" stroke="#0f172a" strokeWidth="1" />
          <rect x="119" y="105" width="12" height="60" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
          <line x1="125" y1="105" x2="125" y2="165" stroke="#0284c7" strokeWidth="2" />
          <rect x="120" y="65" width="10" height="40" fill="url(#cut-wall-pattern-exact)" stroke="#0f172a" strokeWidth="1" />

          {/* PAREDE LATERAL DIREITA (CORTADA) - COM VÃO DE JANELA LATERAL */}
          <rect x="480" y="165" width="10" height="50" fill="url(#cut-wall-pattern-exact)" stroke="#0f172a" strokeWidth="1" />
          <rect x="479" y="105" width="12" height="60" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
          <line x1="485" y1="105" x2="485" y2="165" stroke="#0284c7" strokeWidth="2" />
          <rect x="480" y="65" width="10" height="40" fill="url(#cut-wall-pattern-exact)" stroke="#0f172a" strokeWidth="1" />

          {/* COTAS TÉCNICAS VERTICAIS (LADO ESQUERDO) */}
          {/* Pé-direito H = 3,00 m (y: 65 a 215) */}
          <g transform="translate(68, 0)">
            <line x1="0" y1="65" x2="0" y2="215" stroke="#0f172a" strokeWidth="0.8" markerStart="url(#dim-sec-arr)" markerEnd="url(#dim-sec-arr)" />
            <line x1="-3" y1="65" x2="52" y2="65" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="-3" y1="215" x2="52" y2="215" stroke="#94a3b8" strokeWidth="0.5" />
            <rect x="-8" y="128" width="16" height="24" fill="#ffffff" />
            <text x="0" y="143" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0f172a" transform="rotate(-90 0 143)">
              H=3,00m
            </text>
          </g>

          {/* Cota do Lambril hl = 0,80 m (y: 175 a 215) */}
          <g transform="translate(88, 0)">
            <line x1="0" y1="175" x2="0" y2="215" stroke="#b45309" strokeWidth="0.8" markerStart="url(#dim-sec-arr)" markerEnd="url(#dim-sec-arr)" />
            <line x1="-2" y1="175" x2="32" y2="175" stroke="#b45309" strokeWidth="0.5" />
            <rect x="-6" y="186" width="12" height="16" fill="#ffffff" />
            <text x="0" y="197" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#b45309" transform="rotate(-90 0 197)">
              hl=0,80
            </text>
          </g>

          {/* Cota horizontal inferior de vão livre L = 7,00 m */}
          <g transform="translate(0, 252)">
            <line x1="130" y1="0" x2="480" y2="0" stroke="#0f172a" strokeWidth="0.8" markerStart="url(#dim-sec-arr)" markerEnd="url(#dim-sec-arr)" />
            <line x1="130" y1="-32" x2="130" y2="5" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="480" y1="-32" x2="480" y2="5" stroke="#94a3b8" strokeWidth="0.5" />
            <rect x="280" y="-8" width="50" height="15" fill="#ffffff" />
            <text x="305" y="3.5" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#0f172a">
              L = 7,00 m
            </text>
          </g>

          {/* MARCADORES NUMERADOS COM LINHAS DE CHAMADA (① a ⑥) */}
          {/* ① Chapa Acústica */}
          <g>
            <line x1="305" y1="77" x2="305" y2="28" stroke="#0284c7" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="305" cy="22" r="8" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
            <text x="305" y="25.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">1</text>
          </g>

          {/* ② Vão de Janela Lateral */}
          <g>
            <line x1="125" y1="135" x2="125" y2="28" stroke="#0284c7" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="125" cy="22" r="8" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
            <text x="125" y="25.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">2</text>
          </g>

          {/* ③ Porta de Madeira (AGORA NA ESQUERDA!) */}
          <g>
            <line x1="167" y1="120" x2="167" y2="28" stroke="#78350f" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="167" cy="22" r="8" fill="#78350f" stroke="#ffffff" strokeWidth="1.5" />
            <text x="167" y="25.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">3</text>
          </g>

          {/* ④ Lambril hl = 0,80 m */}
          <g>
            <line x1="280" y1="195" x2="280" y2="260" stroke="#d97706" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="280" cy="265" r="8" fill="#d97706" stroke="#ffffff" strokeWidth="1.5" />
            <text x="280" y="268.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">4</text>
          </g>

          {/* ⑤ Pavimento Parquê */}
          <g>
            <line x1="380" y1="217" x2="380" y2="260" stroke="#b45309" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="380" cy="265" r="8" fill="#b45309" stroke="#ffffff" strokeWidth="1.5" />
            <text x="380" y="268.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">5</text>
          </g>

          {/* ⑥ Parede Alvenaria */}
          <g>
            <line x1="485" y1="85" x2="535" y2="85" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="545" cy="85" r="8" fill="#475569" stroke="#ffffff" strokeWidth="1.5" />
            <text x="545" y="88.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">6</text>
          </g>
        </svg>
      </div>

      {/* LEGENDA TÉCNICA E NOTAS DESCRITIVAS */}
      <div className="pt-1.5 border-t border-gray-200 font-century space-y-1 bg-gray-50/70 p-1.5 rounded">
        <div className="flex items-center justify-between">
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#0c232c]">
            Legenda Técnica dos Componentes Construtivos
          </span>
          <span className="text-[9px] text-gray-500 italic">
            Porta no Lado Esquerdo · Banda 500 Hz
          </span>
        </div>

        {/* Grade de 2 colunas com os 6 itens numerados */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[8.5px]">
          {SECTION_CALLOUTS.map((item, index) => (
            <div key={index} className="flex items-start gap-1">
              <span className="w-3 h-3 rounded-full bg-[#0c232c] text-white flex items-center justify-center text-[7.5px] font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <div className="leading-tight">
                <span className="font-bold text-gray-900">{item.title}: </span>
                <span className="text-gray-700">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
