/**
 * Barra de Identificação / Carimbo Técnico Oficial UEM
 * Exatamente de acordo com a referência do utilizador:
 * Fundo: #0c232c (Azul Petróleo Escuro), divisórias técnicas finas e tipografia Times New Roman.
 */

interface AcousticIdentificationBarProps {
  className?: string;
}

export function AcousticIdentificationBar({ className = "" }: AcousticIdentificationBarProps) {
  return (
    <div
      className={`w-full bg-[#0c232c] text-white border-t-2 border-[#163c4a] select-none ${className}`}
      style={{ fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, 'Questrial', 'Montserrat', sans-serif" }}
    >
      <div className="grid grid-cols-12 divide-x divide-[#1f4a5c] text-xs">
        {/* Célula 1: Instituição de Ensino */}
        <div className="col-span-3 px-3 py-1.5 flex flex-col justify-center">
          <div className="text-[10px] tracking-wider text-[#93c5fd] font-semibold uppercase">
            INSTITUIÇÃO DE ENSINO SUPERIOR
          </div>
          <div className="text-[13px] font-bold tracking-wide text-white leading-tight mt-0.5">
            UNIVERSIDADE EDUARDO MONDLANE (UEM)
          </div>
          <div className="text-[11px] text-gray-300 tracking-normal mt-0.5 font-medium">
            FACULDADE DE ARQUITECTURA E PLANEAMENTO FÍSICO
          </div>
        </div>

        {/* Célula 2: Cadeira & Tema */}
        <div className="col-span-3 px-3 py-1.5 flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#93c5fd]">
              CADEIRA:
            </span>
            <span className="text-[12px] font-bold text-white tracking-wide">
              TCA (Tecnologias para o Conforto Ambiental)
            </span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#93c5fd]">
              TEMA:
            </span>
            <span className="text-[11.5px] font-medium text-amber-100/90 leading-tight">
              Estudo Acústico de uma Sala de Aula
            </span>
          </div>
        </div>

        {/* Célula 3: Corpo Docente */}
        <div className="col-span-3 px-3 py-1.5 flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#93c5fd]">
              DOCENTE:
            </span>
            <span className="text-[12px] font-medium text-gray-100">
              Bernardino Jaiela
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#93c5fd]">
              MONITOR:
            </span>
            <span className="text-[12px] font-medium text-gray-100">
              Hermínio Banze
            </span>
          </div>
        </div>

        {/* Célula 4: Discente & Ano */}
        <div className="col-span-3 px-3 py-1.5 flex flex-col justify-center bg-[#091a21]/60">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#fbbf24]">
              DISCENTE:
            </span>
            <span className="text-[13.5px] font-bold text-[#f59e0b] tracking-wide">
              Delcídio Nhatingo
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-300 mt-1 font-medium">
            <span>
              <strong className="text-gray-400 font-normal">Ano:</strong> III Ano
            </span>
            <span className="text-gray-400">·</span>
            <span>
              <strong className="text-gray-400 font-normal">Semestre:</strong> Segundo Semestre
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-amber-300/80 font-bold">
              FL. 01/01
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
