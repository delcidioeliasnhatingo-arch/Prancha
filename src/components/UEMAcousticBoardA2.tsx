/**
 * Prancha Académica A2 Horizontal (594 × 420 mm)
 * Estudo Acústico de uma Sala de Aula — Universidade Eduardo Mondlane (UEM)
 * Discente: Delcídio Nhatingo · Docente: Bernardino Jaiela · Monitor: Hermínio Banze
 * 
 * - Tipografia Century Gothic em todos os elementos
 * - Zero lacunas / preenchimento contínuo e equilibrado dos 886px de altura útil
 * - Corte esquemático 100% visível no centro
 * - Porta posicionada no lado ESQUERDO na planta e no corte
 * - Tabelas 1 a 6 fiéis ao documento do estudante
 */

import {
  ROOM_DATA,
  GEOMETRIC_PARAMETERS,
  SURFACE_AREAS_TABLE,
  ABSORPTION_MATERIALS,
  TECHNICAL_DESCRIPTIONS,
} from "../data/acousticBoardData";
import { AcousticFloorPlanExactSVG } from "./AcousticFloorPlanExactSVG";
import { AcousticSectionCutSVG } from "./AcousticSectionCutSVG";
import { AcousticIdentificationBar } from "./AcousticIdentificationBar";

interface UEMAcousticBoardA2Props {
  showGrid?: boolean;
  showMargins?: boolean;
  showPlotterMarks?: boolean;
  onExpandPlan?: () => void;
  onExpandSection?: () => void;
}

export function UEMAcousticBoardA2({
  showGrid = false,
  showMargins = false,
  showPlotterMarks = true,
  onExpandPlan,
  onExpandSection,
}: UEMAcousticBoardA2Props) {
  return (
    <div
      id="a2-printable-board"
      className="relative bg-white text-gray-900 shadow-2xl mx-auto a2-board-print select-text border border-gray-400 overflow-hidden font-century"
      style={{
        width: "1485px",
        height: "1050px",
        minWidth: "1485px",
        minHeight: "1050px",
        maxWidth: "1485px",
        maxHeight: "1050px",
        fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, 'Questrial', 'Montserrat', sans-serif",
      }}
    >
      {/* MARCAS DE CORTE DE PLOTTER (10 mm) */}
      {showPlotterMarks && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gray-400" />
          <div className="absolute top-2.5 left-2.5 text-[8px] text-gray-400 select-none font-mono">
            + 10mm
          </div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gray-400" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gray-400" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gray-400" />
        </div>
      )}

      {/* MARGENS DE SEGURANÇA TÉCNICA (20 mm) */}
      {showMargins && (
        <div className="absolute inset-[24px] pointer-events-none border border-dashed border-red-400/60 z-30 flex items-start justify-end p-1">
          <span className="text-[8px] text-red-500 bg-white/90 px-1 rounded font-mono">
            Margem de Segurança: 20 mm
          </span>
        </div>
      )}

      {/* GRELHA MODULAR DIN DE 12 COLUNAS */}
      {showGrid && (
        <div className="absolute inset-0 pointer-events-none z-20 grid grid-cols-12 gap-2 p-6 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-blue-500/20 border border-blue-400 h-full flex items-start justify-center pt-2">
              <span className="text-[8px] text-blue-900 font-mono">C{i + 1}</span>
            </div>
          ))}
        </div>
      )}

      {/* ESTRUTURA GLOBAL DA PRANCHA A2 */}
      <div className="w-full h-full flex flex-col justify-between p-2.5 box-border">
        {/* ========================================================
            1. CABEÇALHO TÉCNICO SUPERIOR (#0c232c)
           ======================================================== */}
        <header className="w-full bg-[#0c232c] text-white rounded border border-[#163c4a] px-3.5 py-1.5 shadow-md shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-wide text-white leading-tight">
                  Estudo Acústico de uma Sala de Aula
                </h1>
                <p className="text-xs text-cyan-200/90 font-normal tracking-normal mt-0.5">
                  Cálculo do Tempo de Reverberação e Proposta de Melhoria Acústica
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-gray-100 tracking-wider">
                UNIVERSIDADE EDUARDO MONDLANE (UEM)
              </div>
              <div className="text-[10px] text-gray-300">
                Faculdade de Arquitectura e Planeamento Físico
              </div>
              <div className="text-[11px] font-bold text-[#f59e0b] mt-0.5">
                DISCENTE: DELCÍDIO NHATINGO · III ANO
              </div>
            </div>
          </div>

          {/* Fita Superior de Características */}
          <div className="grid grid-cols-6 gap-2 mt-1.5 pt-1.5 border-t border-[#1f4a5c] text-center text-xs">
            <div className="bg-[#091a21] p-1 rounded border border-[#1b3d4b]">
              <span className="text-[8px] text-gray-400 block uppercase">COMPRIMENTO (C)</span>
              <strong className="text-sm text-cyan-300 font-bold">8,00 m</strong>
            </div>
            <div className="bg-[#091a21] p-1 rounded border border-[#1b3d4b]">
              <span className="text-[8px] text-gray-400 block uppercase">LARGURA (L)</span>
              <strong className="text-sm text-cyan-300 font-bold">7,00 m</strong>
            </div>
            <div className="bg-[#091a21] p-1 rounded border border-[#1b3d4b]">
              <span className="text-[8px] text-gray-400 block uppercase">PÉ-DIREITO (H)</span>
              <strong className="text-sm text-cyan-300 font-bold">3,00 m</strong>
            </div>
            <div className="bg-[#091a21] p-1 rounded border border-[#1b3d4b]">
              <span className="text-[8px] text-gray-400 block uppercase">ESPESSURA PAREDES (e)</span>
              <strong className="text-sm text-gray-200 font-bold">0,20 m</strong>
            </div>
            <div className="bg-[#091a21] p-1 rounded border border-[#1b3d4b]">
              <span className="text-[8px] text-gray-400 block uppercase">VOLUME DA SALA (V)</span>
              <strong className="text-sm text-amber-300 font-bold">168,00 m³</strong>
            </div>
            <div className="bg-[#851b1b]/80 p-1 rounded border border-red-700">
              <span className="text-[8px] text-red-200 block uppercase font-bold">TR INICIAL → TR NOVO</span>
              <strong className="text-sm text-white font-bold">0,78 s → 0,64 s</strong>
            </div>
          </div>
        </header>

        {/* ========================================================
            2. CORPO DA PRANCHA A2 EM 3 BAIAS TÉCNICAS (GRELHA 12 COL)
           ======================================================== */}
        <div className="flex-1 grid grid-cols-12 gap-2.5 my-2 min-h-0">
          {/* --------------------------------------------------------
              COLUNA 1: ESQUERDA (4 COLUNAS ~ 480 px)
              Desenhos Técnicos: Planta Baixa (Porta na Direita, 10 cm afastamento) e
              Corte Esquemático (Porta na Esquerda, 100% Visível)
             -------------------------------------------------------- */}
          <div className="col-span-4 flex flex-col justify-between h-full gap-1.5 overflow-hidden">
            {/* PLANTA BAIXA DA SALA DE AULAS */}
            <div className="w-full flex-1 flex flex-col min-h-0">
              <AcousticFloorPlanExactSVG
                className="w-full h-full shadow-xs flex-1"
                onExpand={onExpandPlan}
              />
            </div>

            {/* CORTE ESQUEMÁTICO DA SALA DE AULAS (100% VISÍVEL E PORTA NA ESQUERDA) */}
            <div className="w-full flex-1 flex flex-col min-h-0">
              <AcousticSectionCutSVG
                className="w-full h-full shadow-xs flex-1"
                onExpand={onExpandSection}
              />
            </div>
          </div>

          {/* --------------------------------------------------------
              COLUNA 2: CENTRO (4 COLUNAS ~ 480 px)
              Tabela 1 (Dados do exercício), Tabela 2 (Volume da sala),
              Tabela 5 (Tempo de reverberação) e Conclusão Técnica
             -------------------------------------------------------- */}
          <div className="col-span-4 flex flex-col justify-between h-full gap-1.5">
            {/* DADOS DO EXERCÍCIO */}
            <div className="bg-white rounded border border-gray-300 p-1.5 shadow-xs">
              <h3 className="font-bold text-[10.5px] text-gray-900 text-center pb-0.5 mb-1 border-b border-gray-200 uppercase tracking-wide">
                Dados do exercício
              </h3>
              <p className="text-[8px] text-gray-700 leading-tight text-justify mb-1 font-normal">
                {TECHNICAL_DESCRIPTIONS.dadosExercicio}
              </p>
              <table className="w-full text-[8px] border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#e8f1f5] text-gray-800 font-bold border-b border-gray-300">
                    <th className="py-0.5 px-1 text-left border-r border-gray-300">Elemento</th>
                    <th className="py-0.5 px-1 text-center border-r border-gray-300">Símbolo</th>
                    <th className="py-0.5 px-1 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {GEOMETRIC_PARAMETERS.map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                      <td className="py-0.5 px-1 font-medium text-gray-800 border-b border-r border-gray-200">
                        {item.param}
                      </td>
                      <td className="py-0.5 px-1 italic text-center text-gray-700 border-b border-r border-gray-200">
                        {item.simbolo}
                      </td>
                      <td className="py-0.5 px-1 font-bold text-gray-900 text-right border-b border-gray-200">
                        {item.valor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CÁLCULO DO VOLUME DA SALA */}
            <div className="bg-white rounded border border-gray-300 p-1.5 shadow-xs">
              <h3 className="font-bold text-[10.5px] text-gray-900 text-center pb-0.5 mb-1 border-b border-gray-200 uppercase tracking-wide">
                Cálculo do volume da sala
              </h3>
              <p className="text-[8px] text-gray-700 leading-tight text-justify mb-1 font-normal">
                {TECHNICAL_DESCRIPTIONS.volumeSala}
              </p>
              <table className="w-full text-[8px] border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#e8f1f5] text-gray-800 font-bold border-b border-gray-300">
                    <th className="py-0.5 px-1 text-left border-r border-gray-300">Elemento</th>
                    <th className="py-0.5 px-1 text-center border-r border-gray-300">Fórmula</th>
                    <th className="py-0.5 px-1 text-center border-r border-gray-300">Cálculo</th>
                    <th className="py-0.5 px-1 text-right">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="py-0.5 px-1 font-medium text-gray-800 border-r border-gray-200">Volume da sala</td>
                    <td className="py-0.5 px-1 font-mono text-center text-gray-700 border-r border-gray-200">V = C × L × H</td>
                    <td className="py-0.5 px-1 font-mono text-center text-gray-700 border-r border-gray-200">V = 8,00 × 7,00 × 3,00</td>
                    <td className="py-0.5 px-1 font-bold text-gray-900 text-right whitespace-nowrap bg-amber-50/50">
                      V = 168,00 m³
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-1 text-[7.5px] text-gray-500 bg-gray-50 px-1 py-0.5 rounded border border-gray-200/80 flex items-center justify-between">
                <span>Rácio volumétrico: 4,20 m³/aluno (lotação 40 alunos)</span>
                <span className="font-semibold text-gray-700">Pé-direito H = 3,00 m</span>
              </div>
            </div>

            {/* TEMPO DE REVERBERAÇÃO */}
            <div className="bg-white rounded border border-gray-300 p-1.5 shadow-xs">
              <h3 className="font-bold text-[10.5px] text-gray-900 text-center pb-0.5 mb-1 border-b border-gray-200 uppercase tracking-wide">
                Tempo de reverberação
              </h3>
              <p className="text-[8px] text-gray-700 leading-tight text-justify mb-1 font-normal">
                {TECHNICAL_DESCRIPTIONS.tempoReverberacao}
              </p>
              <table className="w-full text-[8px] border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#e8f1f5] text-gray-800 font-bold border-b border-gray-300">
                    <th className="py-0.5 px-1 text-left border-r border-gray-300">Elemento</th>
                    <th className="py-0.5 px-1 text-center border-r border-gray-300">Fórmula</th>
                    <th className="py-0.5 px-1 text-center border-r border-gray-300">Cálculo</th>
                    <th className="py-0.5 px-1 text-right">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="py-0.5 px-1 font-medium text-gray-800 border-r border-gray-200">Tempo de reverberação</td>
                    <td className="py-0.5 px-1 italic text-center text-gray-700 border-r border-gray-200">Tr = 0,16V / A</td>
                    <td className="py-0.5 px-1 text-center text-gray-700 border-r border-gray-200">Tr = (0,16 × 168) / 34,30</td>
                    <td className="py-0.5 px-1 font-bold text-red-700 text-right whitespace-nowrap bg-red-50/60">
                      Tr = 0,78 s
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-1 text-[7.5px] text-red-700 bg-red-50/70 px-1 py-0.5 rounded border border-red-200 flex items-center justify-between">
                <span>Diagnóstico: Tr = 0,78 s ultrapassa o limite recomendado</span>
                <span className="font-bold">Intervenção Exigida</span>
              </div>
            </div>

            {/* CONCLUSÃO (Preenchimento nobre e contínuo da coluna central) */}
            <div className="bg-white rounded border border-gray-300 p-1.5 shadow-xs">
              <h3 className="font-bold text-[10.5px] text-[#0c232c] pb-0.5 mb-1 border-b border-gray-200 uppercase tracking-wide flex items-center justify-between">
                <span>Conclusão</span>
                <span className="text-[7.5px] text-emerald-800 font-bold bg-emerald-50 px-1 py-0.2 rounded border border-emerald-300">
                  Tr = 0,64 s Otimizado
                </span>
              </h3>
              <p className="text-[8px] text-gray-700 leading-tight text-justify font-normal">
                {TECHNICAL_DESCRIPTIONS.conclusao}
              </p>
              <div className="mt-1 pt-0.5 border-t border-gray-200 flex justify-between text-[7.5px] text-gray-600 bg-gray-50/80 px-1 py-0.5 rounded">
                <span>Norma DIN 18041: 0,45 s a 0,65 s</span>
                <span className="font-bold text-emerald-800">Conformidade Plena Atingida</span>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------
              COLUNA 3: DIREITA (4 COLUNAS ~ 480 px)
              Cálculo das Áreas, Absorção Sonora e Proposta de Melhoria
             -------------------------------------------------------- */}
          <div className="col-span-4 flex flex-col justify-between h-full gap-1.5">
            {/* CÁLCULO DAS ÁREAS */}
            <div className="bg-white rounded border border-gray-300 p-1.5 shadow-xs">
              <h3 className="font-bold text-[10.5px] text-gray-900 text-center pb-0.5 mb-1 border-b border-gray-200 uppercase tracking-wide">
                Cálculo das áreas
              </h3>
              <p className="text-[8px] text-gray-700 leading-tight text-justify mb-1 font-normal">
                {TECHNICAL_DESCRIPTIONS.calculoAreas}
              </p>
              <table className="w-full text-[7.8px] border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#e8f1f5] text-gray-800 font-bold border-b border-gray-300">
                    <th className="py-0.5 px-1 text-left border-r border-gray-300">Elemento</th>
                    <th className="py-0.5 px-1 text-left border-r border-gray-300">Fórmula</th>
                    <th className="py-0.5 px-1 text-center border-r border-gray-300">Cálculo</th>
                    <th className="py-0.5 px-1 text-right">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {SURFACE_AREAS_TABLE.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                      <td className="py-0.5 px-1 font-medium text-gray-800 border-b border-r border-gray-200 whitespace-nowrap">
                        {row.description}
                      </td>
                      <td className="py-0.5 px-1 italic text-gray-700 border-b border-r border-gray-200">
                        {row.formula}
                      </td>
                      <td className="py-0.5 px-1 font-mono text-center text-gray-600 border-b border-r border-gray-200">
                        {row.calculation}
                      </td>
                      <td className="py-0.5 px-1 text-right font-bold text-gray-900 border-b border-gray-200 whitespace-nowrap">
                        {row.area.toFixed(2)} {row.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ÁREA DE ABSORÇÃO SONORA */}
            <div className="bg-white rounded border border-gray-300 p-1.5 shadow-xs">
              <h3 className="font-bold text-[10.5px] text-gray-900 text-center pb-0.5 mb-1 border-b border-gray-200 uppercase tracking-wide">
                Área de absorção sonora
              </h3>
              <p className="text-[8px] text-gray-700 leading-tight text-justify mb-1 font-normal">
                {TECHNICAL_DESCRIPTIONS.absorcaoSonora}
              </p>
              <table className="w-full text-[7.8px] border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#e8f1f5] text-gray-800 font-bold border-b border-gray-300">
                    <th className="py-0.5 px-1 text-left border-r border-gray-300">Material</th>
                    <th className="py-0.5 px-1 text-center border-r border-gray-300">Área (m²)</th>
                    <th className="py-0.5 px-1 text-center border-r border-gray-300">Coeficiente (α)</th>
                    <th className="py-0.5 px-1 text-right">Absorção (m² sabin)</th>
                  </tr>
                </thead>
                <tbody>
                  {ABSORPTION_MATERIALS.map((mat, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                      <td className="py-0.5 px-1 font-medium text-gray-800 border-b border-r border-gray-200">
                        {mat.name}
                      </td>
                      <td className="py-0.5 px-1 text-center text-gray-700 border-b border-r border-gray-200">
                        {mat.area.toFixed(2)}
                      </td>
                      <td className="py-0.5 px-1 text-center font-mono text-gray-700 border-b border-r border-gray-200">
                        {mat.coefficient.toFixed(2)}
                      </td>
                      <td className="py-0.5 px-1 text-right font-bold text-gray-900 border-b border-gray-200">
                        {mat.absorption.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#e8f1f5] text-gray-900 font-bold border-t border-gray-300">
                    <td colSpan={3} className="py-0.5 px-1 text-left uppercase border-r border-gray-300 text-[8px]">
                      Total de absorção sonora (A)
                    </td>
                    <td className="py-0.5 px-1 text-right text-[#0c232c] font-bold whitespace-nowrap text-[8px]">
                      {ROOM_DATA.initialAbsorption.toFixed(2)} m² sabin
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PROPOSTA DE MELHORIA ACÚSTICA */}
            <div className="bg-white rounded border border-gray-300 p-1.5 shadow-xs">
              <h3 className="font-bold text-[10.5px] text-gray-900 text-center pb-0.5 mb-1 border-b border-gray-200 uppercase tracking-wide">
                Proposta de melhoria acústica
              </h3>
              <p className="text-[8px] text-gray-700 leading-tight text-justify mb-1 font-normal">
                {TECHNICAL_DESCRIPTIONS.propostaMelhoria}
              </p>
              <table className="w-full text-[7.8px] border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#e8f1f5] text-gray-800 font-bold border-b border-gray-300">
                    <th className="py-0.5 px-1 text-left border-r border-gray-300">Elemento</th>
                    <th className="py-0.5 px-1 text-center border-r border-gray-300">Cálculo</th>
                    <th className="py-0.5 px-1 text-right">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="py-0.5 px-1 font-medium text-gray-800 border-b border-r border-gray-200">
                      Aumento da absorção (10 m² de chapa acústica)
                    </td>
                    <td className="py-0.5 px-1 text-center text-gray-700 border-b border-r border-gray-200">
                      ΔA = 10(0,80 - 0,05)
                    </td>
                    <td className="py-0.5 px-1 font-bold text-gray-900 text-right border-b border-gray-200 whitespace-nowrap">
                      ΔA = 7,50 m² sabin
                    </td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td className="py-0.5 px-1 font-medium text-gray-800 border-b border-r border-gray-200">
                      Nova absorção sonora
                    </td>
                    <td className="py-0.5 px-1 text-center text-gray-700 border-b border-r border-gray-200">
                      Anovo = 34,30 + 7,50
                    </td>
                    <td className="py-0.5 px-1 font-bold text-gray-900 text-right border-b border-gray-200 whitespace-nowrap">
                      Anovo = 41,80 m² sabin
                    </td>
                  </tr>
                  <tr className="bg-emerald-50/60">
                    <td className="py-0.5 px-1 font-medium text-emerald-950 border-r border-gray-200">
                      Novo tempo de reverberação
                    </td>
                    <td className="py-0.5 px-1 italic text-center text-emerald-900 border-r border-gray-200">
                      Tr = 0,16V / Anovo
                    </td>
                    <td className="py-0.5 px-1 font-bold text-emerald-800 text-right whitespace-nowrap">
                      Tr = (0,16 × 168) / 41,80; <strong>Tr = 0,64 s</strong>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-1 pt-0.5 border-t border-gray-200 flex items-center justify-between text-[7.5px] bg-emerald-50/80 px-1 py-0.5 rounded border border-emerald-300">
                <span className="font-bold text-emerald-950">Melhoria Conforto Oral: -18% Reverberação</span>
                <span className="text-emerald-800 font-semibold">Tr 0,78 s → 0,64 s</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. BARRA DE IDENTIFICAÇÃO / CARIMBO TÉCNICO UEM (#0c232c)
           ======================================================== */}
        <footer className="w-full shrink-0 shadow-md">
          <AcousticIdentificationBar />
        </footer>
      </div>
    </div>
  );
}
