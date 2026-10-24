/**
 * Planta Baixa da Sala de Aulas (1:100)
 * Porta posicionada na Parede Oeste (Lado Esquerdo) conforme pedido do utilizador.
 * Cotas: 0,20 | 1,70 | 1,60 | 1,40 | 1,60 | 1,70 | 0,20 e porta 0,90 m na esquerda.
 */

interface AcousticFloorPlanProps {
  className?: string;
  onExpand?: () => void;
}

export function AcousticFloorPlanExactSVG({ className = "", onExpand }: AcousticFloorPlanProps) {
  return (
    <div className={`bg-white rounded border border-gray-300 p-2 flex flex-col justify-between font-century ${className}`}>
      {/* Título do Bloco com Escala */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-1 mb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0c232c] flex items-center justify-center text-[7.5px] text-white font-bold">
            A
          </span>
          <h4 className="text-[11px] font-bold text-gray-900 tracking-wide uppercase">
            Planta Baixa da Sala de Aulas (1:100)
          </h4>
        </div>
        <div className="flex items-center gap-2 text-[9.5px] text-gray-600">
          <span className="bg-gray-100 px-1.5 py-0.2 rounded border border-gray-200 font-semibold text-gray-700">
            Escala 1:100 · Porta no Lado Direito (afast. 10 cm)
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
          viewBox="0 0 680 340"
          className="w-full h-auto select-none"
          style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, 'Questrial', 'Montserrat', sans-serif" }}
        >
          <defs>
            {/* Hachura de alvenaria cortada */}
            <pattern id="wall-hatch-exact-2" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#334155" strokeWidth="1" />
            </pattern>
            {/* Padrão do pavimento parquê */}
            <pattern id="parquet-hatch-exact-2" width="36" height="10" patternUnits="userSpaceOnUse">
              <rect width="36" height="10" fill="#fffbeb" />
              <line x1="0" y1="0" x2="36" y2="0" stroke="#fcd34d" strokeWidth="0.5" strokeOpacity="0.7" />
              <line x1="0" y1="5" x2="36" y2="5" stroke="#fcd34d" strokeWidth="0.5" strokeOpacity="0.7" />
              <line x1="18" y1="0" x2="18" y2="5" stroke="#fcd34d" strokeWidth="0.5" strokeOpacity="0.7" />
              <line x1="36" y1="5" x2="36" y2="10" stroke="#fcd34d" strokeWidth="0.5" strokeOpacity="0.7" />
            </pattern>
            {/* Padrão da chapa acústica perfurada */}
            <pattern id="acoustic-dot-exact-2" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#e0f2fe" fillOpacity="0.7" />
              <circle cx="4" cy="4" r="0.9" fill="#0284c7" fillOpacity="0.8" />
            </pattern>
            {/* Marcadores de seta de cota */}
            <marker id="dim-start-2" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 10 2 L 0 5 L 10 8 z" fill="#0f172a" />
            </marker>
            <marker id="dim-end-2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="#0f172a" />
            </marker>
          </defs>

          {/* Fundo do desenho */}
          <rect x="0" y="0" width="680" height="340" fill="#fafafa" rx="4" />

          {/* Símbolo do Norte no Canto Superior Direito */}
          <g transform="translate(620, 35)">
            <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
            <path d="M 0 -12 L 3 0 L 0 -2 L -3 0 Z" fill="#0c232c" />
            <path d="M 0 12 L 3 0 L 0 2 L -3 0 Z" fill="#94a3b8" />
            <text x="0" y="-15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0c232c">N</text>
          </g>

          {/* Pavimento Parquê Interior: x 145 -> 529, y 50 -> 310 (384 x 260 px) */}
          <rect x="145" y="50" width="384" height="260" fill="url(#parquet-hatch-exact-2)" stroke="#d97706" strokeWidth="0.5" />

          {/* Friso Perimétrico do Lambril de Madeira (hl = 0,80 m) */}
          <rect x="145" y="50" width="384" height="260" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="6,3" />

          {/* Chapa Acústica Macia Suspensa (6,00 x 5,00 m = 288 x 190 px) */}
          <rect
            x="193"
            y="85"
            width="288"
            height="190"
            fill="url(#acoustic-dot-exact-2)"
            stroke="#0284c7"
            strokeWidth="1.6"
            strokeDasharray="4,3"
          />

          {/* Identificação Central da Chapa Acústica */}
          <rect x="250" y="165" width="174" height="30" rx="3" fill="#ffffff" fillOpacity="0.94" stroke="#0284c7" strokeWidth="1" />
          <text x="337" y="177" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">
            CHAPA ACÚSTICA SUSPENSA
          </text>
          <text x="337" y="189" textAnchor="middle" fontSize="8" fill="#0f172a">
            6,00 × 5,00 m = 30,00 m² · α = 0,80
          </text>

          {/* Fonte Sonora (Docente) e Propagação */}
          <g transform="translate(337, 60)">
            <circle cx="0" cy="0" r="4.5" fill="#ea580c" stroke="#ffffff" strokeWidth="1.2" />
            <text x="0" y="-7" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#ea580c">
              FONTE SONORA (DOCENTE)
            </text>
            <path d="M -25 14 A 28 28 0 0 0 25 14" fill="none" stroke="#ea580c" strokeWidth="1" strokeOpacity="0.75" />
            <path d="M -50 28 A 56 56 0 0 0 50 28" fill="none" stroke="#ea580c" strokeWidth="0.8" strokeOpacity="0.55" strokeDasharray="3,2" />
          </g>

          {/* ========================================================
              ALVENARIA E VÃOS
             ======================================================== */}
          {/* PAREDE NORTE (y: 40 a 50) */}
          <rect x="135" y="40" width="92" height="10" fill="url(#wall-hatch-exact-2)" stroke="#0f172a" strokeWidth="1" />
          <rect x="227" y="40" width="77" height="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
          <line x1="227" y1="45" x2="304" y2="45" stroke="#0284c7" strokeWidth="1.5" />
          <text x="265" y="35" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0369a1">J1 (1,60×1,20)</text>

          <rect x="304" y="40" width="67" height="10" fill="url(#wall-hatch-exact-2)" stroke="#0f172a" strokeWidth="1" />
          <rect x="371" y="40" width="77" height="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
          <line x1="371" y1="45" x2="448" y2="45" stroke="#0284c7" strokeWidth="1.5" />
          <text x="410" y="35" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0369a1">J2 (1,60×1,20)</text>

          <rect x="448" y="40" width="91" height="10" fill="url(#wall-hatch-exact-2)" stroke="#0f172a" strokeWidth="1" />

          {/* PAREDE SUL (y: 310 a 320) */}
          <rect x="135" y="310" width="92" height="10" fill="url(#wall-hatch-exact-2)" stroke="#0f172a" strokeWidth="1" />
          <rect x="227" y="310" width="77" height="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
          <line x1="227" y1="315" x2="304" y2="315" stroke="#0284c7" strokeWidth="1.5" />
          <text x="265" y="331" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0369a1">J3 (1,60×1,20)</text>

          <rect x="304" y="310" width="67" height="10" fill="url(#wall-hatch-exact-2)" stroke="#0f172a" strokeWidth="1" />
          <rect x="371" y="310" width="77" height="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
          <line x1="371" y1="315" x2="448" y2="315" stroke="#0284c7" strokeWidth="1.5" />
          <text x="410" y="331" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0369a1">J4 (1,60×1,20)</text>

          <rect x="448" y="310" width="91" height="10" fill="url(#wall-hatch-exact-2)" stroke="#0f172a" strokeWidth="1" />

          {/* ========================================================
              PAREDE OESTE (LADO ESQUERDO): Alvenaria contínua
             ======================================================== */}
          <rect x="135" y="50" width="10" height="260" fill="url(#wall-hatch-exact-2)" stroke="#0f172a" strokeWidth="1" />

          {/* ========================================================
              PAREDE ESTE (LADO DIREITO) COM A PORTA P (0,90 x 2,10 m)
              Afastamento de 10 cm (boneca) da parede norte
              y: 50 -> 54 (0,10 m alvenaria)
              y: 54 -> 88 (0,90 m vão da porta)
              y: 88 -> 310 (6,00 m alvenaria contínua)
             ======================================================== */}
          {/* Boneca de 10 cm no canto norte (y: 50 a 54) */}
          <rect x="529" y="50" width="10" height="4" fill="url(#wall-hatch-exact-2)" stroke="#0f172a" strokeWidth="0.8" />
          
          {/* Vão da Porta (y: 54 a 88 = 34 px / 0,90 m) */}
          <rect x="529" y="54" width="10" height="34" fill="#ffffff" stroke="#92400e" strokeWidth="1" />
          
          {/* Folha e batente da porta abrindo para o interior da sala */}
          <line x1="529" y1="54" x2="495" y2="72" stroke="#92400e" strokeWidth="2.5" />
          <path d="M 529 88 A 34 34 0 0 1 495 72" fill="none" stroke="#92400e" strokeWidth="1" strokeDasharray="3,2" />
          
          <text x="544" y="73" textAnchor="start" fontSize="7" fontWeight="bold" fill="#92400e">
            PORTA (0,90m)
          </text>
          <text x="544" y="81" textAnchor="start" fontSize="5.5" fill="#64748b">
            (10cm afastamento)
          </text>

          {/* Pano cego inferior este (y: 88 a 310 = 222 px / 6,00 m) */}
          <rect x="529" y="88" width="10" height="222" fill="url(#wall-hatch-exact-2)" stroke="#0f172a" strokeWidth="1" />

          {/* ========================================================
              LINHAS DE COTA HORIZONTAIS SUPERIORES
             ======================================================== */}
          {/* Cota Geral Exterior = 8,40 m */}
          <g transform="translate(0, 12)">
            <line x1="135" y1="0" x2="539" y2="0" stroke="#0f172a" strokeWidth="0.8" markerStart="url(#dim-start-2)" markerEnd="url(#dim-end-2)" />
            <line x1="135" y1="-2" x2="135" y2="28" stroke="#64748b" strokeWidth="0.5" />
            <line x1="539" y1="-2" x2="539" y2="28" stroke="#64748b" strokeWidth="0.5" />
            <rect x="317" y="-7" width="40" height="12" fill="#ffffff" />
            <text x="337" y="2" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0f172a">8,40 m</text>
          </g>

          {/* Cota Geral Interior = 8,00 m */}
          <g transform="translate(0, 22)">
            <line x1="145" y1="0" x2="529" y2="0" stroke="#0f172a" strokeWidth="0.8" markerStart="url(#dim-start-2)" markerEnd="url(#dim-end-2)" />
            <line x1="145" y1="-2" x2="145" y2="18" stroke="#64748b" strokeWidth="0.5" />
            <line x1="529" y1="-2" x2="529" y2="18" stroke="#64748b" strokeWidth="0.5" />
            <rect x="317" y="-6" width="40" height="11" fill="#ffffff" />
            <text x="337" y="1.5" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#0f172a">8,00 m</text>
          </g>

          {/* ========================================================
              LINHAS DE COTA VERTICAIS (ESQUERDA E DIREITA)
             ======================================================== */}
          {/* Cota Geral Exterior Esquerda = 7,40 m */}
          <g transform="translate(85, 0)">
            <line x1="0" y1="40" x2="0" y2="320" stroke="#0f172a" strokeWidth="0.8" markerStart="url(#dim-start-2)" markerEnd="url(#dim-end-2)" />
            <line x1="-3" y1="40" x2="50" y2="40" stroke="#64748b" strokeWidth="0.5" />
            <line x1="-3" y1="320" x2="50" y2="320" stroke="#64748b" strokeWidth="0.5" />
            <rect x="-8" y="170" width="16" height="26" fill="#ffffff" />
            <text x="0" y="185" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0f172a" transform="rotate(-90 0 185)">
              7,40 m
            </text>
          </g>

          {/* Cota Geral Interior Esquerda = 7,00 m */}
          <g transform="translate(105, 0)">
            <line x1="0" y1="50" x2="0" y2="310" stroke="#0f172a" strokeWidth="0.8" markerStart="url(#dim-start-2)" markerEnd="url(#dim-end-2)" />
            <line x1="-3" y1="50" x2="30" y2="50" stroke="#64748b" strokeWidth="0.5" />
            <line x1="-3" y1="310" x2="30" y2="310" stroke="#64748b" strokeWidth="0.5" />
            <rect x="-6" y="170" width="12" height="22" fill="#ffffff" />
            <text x="0" y="184" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#0f172a" transform="rotate(-90 0 184)">
              7,00 m
            </text>
          </g>

          {/* Cotas da Porta na Parede Direita (0,10 m | 0,90 m | 6,00 m) */}
          <g transform="translate(605, 0)" fontSize="6" fontWeight="bold" fill="#0f172a">
            {/* Cota da Boneca 0,10 m */}
            <line x1="0" y1="50" x2="0" y2="54" stroke="#94a3b8" strokeWidth="0.7" markerStart="url(#dim-start-2)" markerEnd="url(#dim-end-2)" />
            <line x1="-66" y1="50" x2="4" y2="50" stroke="#64748b" strokeWidth="0.4" />
            <line x1="-66" y1="54" x2="4" y2="54" stroke="#64748b" strokeWidth="0.4" />
            <text x="14" y="53" textAnchor="start" fill="#64748b">0,10</text>

            {/* Cota do Vão da Porta 0,90 m */}
            <line x1="0" y1="54" x2="0" y2="88" stroke="#92400e" strokeWidth="0.8" markerStart="url(#dim-start-2)" markerEnd="url(#dim-end-2)" />
            <line x1="-66" y1="88" x2="4" y2="88" stroke="#64748b" strokeWidth="0.4" />
            <rect x="-4" y="65" width="8" height="12" fill="#ffffff" />
            <text x="0" y="73" textAnchor="middle" transform="rotate(-90 0 73)" fill="#92400e">0,90</text>

            {/* Cota do Pano Cego 6,00 m */}
            <line x1="0" y1="88" x2="0" y2="310" stroke="#0f172a" strokeWidth="0.7" markerStart="url(#dim-start-2)" markerEnd="url(#dim-end-2)" />
            <line x1="-66" y1="310" x2="4" y2="310" stroke="#64748b" strokeWidth="0.4" />
            <rect x="-4" y="195" width="8" height="15" fill="#ffffff" />
            <text x="0" y="205" textAnchor="middle" transform="rotate(-90 0 205)">6,00</text>
          </g>

          <text x="140" y="333" textAnchor="middle" fontSize="7" fill="#475569" fontWeight="bold">
            e=0,20
          </text>
        </svg>
      </div>

      {/* Legenda de Materiais */}
      <div className="grid grid-cols-4 gap-2 pt-1 border-t border-gray-200 text-[9px] font-century bg-gray-50/80 p-1 rounded">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#fef3c7] border border-[#d97706] shrink-0" />
          <span className="text-gray-800">
            <strong>Parquê:</strong> α=0,06
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#e0f2fe] border border-[#0284c7] shrink-0" />
          <span className="text-gray-800">
            <strong>Chapa:</strong> α=0,80
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#fed7aa] border border-[#b45309] shrink-0" />
          <span className="text-gray-800">
            <strong>Lambril:</strong> α=0,10
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#f1f5f9] border border-[#94a3b8] shrink-0" />
          <span className="text-gray-800">
            <strong>Reboco:</strong> α=0,05
          </span>
        </div>
      </div>
    </div>
  );
}
