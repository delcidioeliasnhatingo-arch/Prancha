/**
 * Export and Download Utilities for UEM Architectural Acoustic A2 Board
 * Discente: Delcídio Nhatingo · UEM · FAPF · TCA II
 * 
 * Formatos suportados e novas funções de download:
 * 1. HTML Autónomo (.html) - Ficheiro independente com auto-impressão para PDF A2 nativo 600 DPI
 * 2. PDF Direto A2 (.pdf) - Ficheiro PDF real em formato A2 (594 × 420 mm)
 * 3. PDF Plotter (Janela de Impressão nativa)
 * 4. PNG Alta Resolução (.png)
 * 5. JPEG Alta Fidelidade (.jpg)
 * 6. PowerPoint Apresentação (.ppt)
 * 7. Word Relatório Técnico (.doc)
 * 8. Excel Planilha de Cálculo (.csv)
 * 9. SVG Vetorial CAD (.svg)
 * 10. Pré-visualizador e gerador de link direto no navegador
 */

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  ROOM_DATA,
  GEOMETRIC_PARAMETERS,
  SURFACE_AREAS_TABLE,
  ABSORPTION_MATERIALS,
  TECHNICAL_DESCRIPTIONS,
} from "../data/acousticBoardData";

/**
 * Função auxiliar robusta para capturar o elemento sem contaminação (taint: false)
 * e sem interferência do zoom (transform CSS)
 */
export async function captureBoardCanvas(elementId = "a2-printable-board"): Promise<HTMLCanvasElement> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error("Elemento da prancha não encontrado no DOM");

  // Guarda e reseta temporariamente transformações no elemento pai para captura 1:1 exata
  const parent = element.parentElement;
  const originalTransform = parent ? parent.style.transform : "";
  const originalTransition = parent ? parent.style.transition : "";

  // Reset scroll nos pais para evitar cortes ou desfasamento de coordenadas
  const mainContainer = element.closest("main");
  const prevMainScrollLeft = mainContainer ? mainContainer.scrollLeft : 0;
  const prevMainScrollTop = mainContainer ? mainContainer.scrollTop : 0;
  if (mainContainer) {
    mainContainer.scrollLeft = 0;
    mainContainer.scrollTop = 0;
  }

  const prevScrollX = window.scrollX;
  const prevScrollY = window.scrollY;
  window.scrollTo(0, 0);

  if (parent) {
    parent.style.transition = "none";
    parent.style.transform = "none";
    void parent.offsetHeight;
  }

  try {
    // Tentativa primária com escala 2x para ultra-alta definição arquitectónica
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false, // CRÍTICO: allowTaint deve ser false para permitir toDataURL e toBlob sem SecurityError!
        logging: false,
        backgroundColor: "#ffffff",
        width: 1485,
        height: 1050,
      });
      return canvas;
    } catch (primaryErr) {
      console.warn("Tentativa em escala 2x falhou, a tentar fallback escala 1x:", primaryErr);
      // Fallback em escala 1x mais tolerante
      const fallbackCanvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: "#ffffff",
        width: 1485,
        height: 1050,
      });
      return fallbackCanvas;
    }
  } finally {
    // Restaura o zoom e scroll original do utilizador
    if (parent) {
      parent.style.transform = originalTransform;
      parent.style.transition = originalTransition;
      void parent.offsetHeight;
    }
    if (mainContainer) {
      mainContainer.scrollLeft = prevMainScrollLeft;
      mainContainer.scrollTop = prevMainScrollTop;
    }
    window.scrollTo(prevScrollX, prevScrollY);
  }
}

/**
 * Helper seguro para descarregar Blob em qualquer navegador/iframe
 * Retorna o ObjectURL criado para que possa ser usado como link direto
 */
export function downloadBlob(blob: Blob, filename: string): string {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.position = "fixed";
  a.style.top = "-9999px";
  a.style.left = "-9999px";
  a.href = url;
  a.setAttribute("download", filename);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  try {
    const evt = new MouseEvent("click", { bubbles: true, cancelable: true, view: window });
    a.dispatchEvent(evt);
  } catch {
    // fallback
  }
  setTimeout(() => {
    try {
      document.body.removeChild(a);
    } catch {}
    // Não revogar imediatamente para permitir download do utilizador
    setTimeout(() => URL.revokeObjectURL(url), 120000);
  }, 2500);

  return url;
}

/**
 * NOVA FUNÇÃO: Gera pré-visualização em imagem e retorna DataURL e Blob
 * Permite exibição direta no modal e botão de download manual com o botão direito
 */
export async function generateBoardImagePreview(elementId = "a2-printable-board"): Promise<{ dataUrl: string; blob: Blob }> {
  const canvas = await captureBoardCanvas(elementId);
  const dataUrl = canvas.toDataURL("image/png");
  
  return new Promise<{ dataUrl: string; blob: Blob }>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve({ dataUrl, blob });
      } else {
        // Fallback de conversão DataURL para Blob
        const byteString = atob(dataUrl.split(",")[1]);
        const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const fallbackBlob = new Blob([ab], { type: mimeString });
        resolve({ dataUrl, blob: fallbackBlob });
      }
    }, "image/png");
  });
}

/**
 * NOVA FUNÇÃO: Exporta Prancha Autónoma em Ficheiro HTML (.html)
 * Ficheiro 100% autónomo, portátil, com estilos embutidos, Century Gothic, SVGs
 * e botão de impressão para PDF A2 direto no browser do aluno!
 */
export function exportToStandaloneHTML(elementId = "a2-printable-board", filename = "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.html"): string {
  const boardElem = document.getElementById(elementId);
  if (!boardElem) throw new Error("Elemento da prancha não encontrado");

  const boardClone = boardElem.cloneNode(true) as HTMLElement;

  const htmlDoc = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prancha A2 - Estudo Acústico de uma Sala de Aula - Delcídio Nhatingo - UEM</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: "Century Gothic", AppleGothic, "Montserrat", sans-serif;
      background: #0d1318;
      color: #1e293b;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }

    .top-toolbar {
      position: sticky;
      top: 10px;
      z-index: 9999;
      background: #0c232c;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      border: 1px solid #1f4a5c;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 25px;
      width: 100%;
      max-width: 1485px;
    }

    .toolbar-info {
      font-size: 13px;
    }

    .toolbar-info strong {
      color: #38bdf8;
    }

    .toolbar-btn {
      background: #851b1b;
      color: white;
      border: 1px solid #ef4444;
      padding: 8px 18px;
      border-radius: 6px;
      font-weight: bold;
      font-size: 13px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s;
    }

    .toolbar-btn:hover {
      background: #b91c1c;
    }

    .board-container {
      background: white;
      width: 1485px;
      min-height: 1050px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.6);
      overflow: visible;
      border-radius: 2px;
    }

    @page {
      size: 594mm 420mm landscape;
      margin: 0mm;
    }

    @media print {
      body {
        background: white !important;
        padding: 0 !important;
      }
      .top-toolbar {
        display: none !important;
      }
      .board-container {
        width: 594mm !important;
        height: 420mm !important;
        box-shadow: none !important;
        border: none !important;
        page-break-after: avoid !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>
  <div class="top-toolbar">
    <div class="toolbar-info">
      <strong>UNIVERSIDADE EDUARDO MONDLANE (UEM) · FAPF</strong> · Prancha A2 (594 × 420 mm)<br>
      Discente: Delcídio Nhatingo · Docente: Bernardino Jaiela · Monitor: Hermínio Banze
    </div>
    <div style="display:flex; gap:10px;">
      <button class="toolbar-btn" onclick="window.print()">
        🖨️ Imprimir / Guardar como PDF (A2 Paisagem)
      </button>
      <button class="toolbar-btn" style="background:#0284c7; border-color:#38bdf8;" onclick="window.close()">
        Fechar
      </button>
    </div>
  </div>

  <div class="board-container">
    ${boardClone.outerHTML}
  </div>
</body>
</html>`;

  const blob = new Blob([htmlDoc], { type: "text/html;charset=utf-8" });
  return downloadBlob(blob, filename);
}

// 1. Export to Direct PDF (Gera e descarrega ficheiro .pdf real A2 Paisagem 594 × 420 mm)
export async function exportToDirectPDF(elementId = "a2-printable-board", filename = "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.pdf"): Promise<string> {
  const canvas = await captureBoardCanvas(elementId);
  const imgData = canvas.toDataURL("image/jpeg", 0.95);

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [594, 420],
    compress: true,
  });

  pdf.addImage(imgData, "JPEG", 0, 0, 594, 420, undefined, "FAST");
  
  const pdfBlob = pdf.output("blob");
  return downloadBlob(pdfBlob, filename);
}

// 2. Export via Browser Print Dialog (para plotters físicas ou impressoras virtuais)
export function exportToPrintPDF() {
  window.print();
}

// 3. Export to PNG (Imagem de Alta Resolução via Blob)
export async function exportToPNG(elementId = "a2-printable-board", filename = "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.png"): Promise<string> {
  const canvas = await captureBoardCanvas(elementId);
  return new Promise<string>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        try {
          const dataUrl = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = dataUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => document.body.removeChild(a), 1500);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
        return;
      }
      const url = downloadBlob(blob, filename);
      resolve(url);
    }, "image/png");
  });
}

// 4. Export to JPEG (Imagem de Alta Resolução 95%)
export async function exportToJPEG(elementId = "a2-printable-board", filename = "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.jpg"): Promise<string> {
  const canvas = await captureBoardCanvas(elementId);
  return new Promise<string>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        try {
          const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = dataUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => document.body.removeChild(a), 1500);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
        return;
      }
      const url = downloadBlob(blob, filename);
      resolve(url);
    }, "image/jpeg", 0.95);
  });
}

// 5. Export to Word Document (.doc / .docx compatible formatted HTML in Century Gothic)
export function exportToWord(filename = "Estudo_Acustico_UEM_Delcidio_Nhatingo.doc"): string {
  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>Estudo Acústico de uma Sala de Aula - UEM</title>
      <style>
        body { font-family: 'Century Gothic', Arial, sans-serif; font-size: 10.5pt; color: #1e293b; line-height: 1.45; }
        h1 { font-size: 17pt; color: #0c232c; text-align: center; margin-bottom: 4pt; }
        h2 { font-size: 13pt; color: #0c232c; border-bottom: 1.5pt solid #0c232c; padding-bottom: 3pt; margin-top: 14pt; }
        p { margin: 5pt 0; text-align: justify; }
        table { width: 100%; border-collapse: collapse; margin: 8pt 0; font-size: 9.5pt; }
        th { background-color: #e8f1f5; color: #0c232c; padding: 5pt; text-align: left; border: 1pt solid #cbd5e1; font-weight: bold; }
        td { padding: 4.5pt; border: 1pt solid #cbd5e1; }
        tr:nth-child(even) td { background-color: #f8fafc; }
        .highlight { background-color: #e0f2fe; font-weight: bold; }
        .kpi-box { background-color: #f1f5f9; border-left: 4pt solid #0c232c; padding: 8pt; margin: 8pt 0; }
        .footer { font-size: 9pt; color: #64748b; text-align: center; margin-top: 20pt; border-top: 1pt solid #cccccc; padding-top: 5pt; }
      </style>
    </head>
    <body>
      <div style="text-align: center; border-bottom: 2pt solid #0c232c; padding-bottom: 10pt;">
        <div style="font-size: 14pt; font-weight: bold; color: #0c232c;">UNIVERSIDADE EDUARDO MONDLANE (UEM)</div>
        <div style="font-size: 11pt; color: #475569;">FACULDADE DE ARQUITECTURA E PLANEAMENTO FÍSICO</div>
        <div style="font-size: 10pt; color: #475569; margin-top: 4pt;">CADEIRA: TECNOLOGIAS PARA O CONFORTO AMBIENTAL (TCA)</div>
      </div>

      <h1>Estudo Acústico de uma Sala de Aula</h1>
      <div style="text-align: center; font-size: 11.5pt; color: #0284c7; font-weight: bold; margin-bottom: 15pt;">
        Cálculo do Tempo de Reverberação e Proposta de Melhoria Acústica
      </div>

      <div class="kpi-box">
        <strong>Discente:</strong> Delcídio Nhatingo (III Ano · Segundo Semestre)<br>
        <strong>Docente:</strong> Bernardino Jaiela &nbsp;|&nbsp; <strong>Monitor:</strong> Hermínio Banze<br>
        <strong>Formato da Prancha:</strong> A2 Horizontal (594 × 420 mm) &nbsp;|&nbsp; <strong>Tipografia:</strong> Century Gothic<br>
        <strong>Frequência de Análise:</strong> 500 Hz &nbsp;|&nbsp; <strong>Norma:</strong> ANSI/ASA S12.60
      </div>

      <h2>1. Dados do exercício</h2>
      <p>${TECHNICAL_DESCRIPTIONS.dadosExercicio}</p>
      <table>
        <tr>
          <th>Elemento</th>
          <th style="text-align: center;">Símbolo</th>
          <th style="text-align: right;">Valor</th>
        </tr>
        ${GEOMETRIC_PARAMETERS.map(p => `
          <tr>
            <td><strong>${p.param}</strong></td>
            <td style="text-align: center;">${p.simbolo}</td>
            <td style="text-align: right; font-weight: bold;">${p.valor}</td>
          </tr>
        `).join("")}
      </table>

      <h2>2. Cálculo do volume da sala</h2>
      <p>${TECHNICAL_DESCRIPTIONS.volumeSala}</p>
      <div style="background-color: #fffbeb; padding: 8pt; border: 1pt solid #fef3c7; font-size: 11pt; text-align: center;">
        <strong>V = C × L × H = 8,00 × 7,00 × 3,00 = 168,00 m³</strong>
      </div>

      <h2>3. Cálculo das áreas</h2>
      <p>${TECHNICAL_DESCRIPTIONS.calculoAreas}</p>
      <table>
        <tr>
          <th>Elemento</th>
          <th>Fórmula</th>
          <th>Cálculo</th>
          <th style="text-align: right;">Resultado</th>
        </tr>
        ${SURFACE_AREAS_TABLE.map(s => `
          <tr ${s.highlight ? "class='highlight'" : ""}>
            <td><strong>${s.description}</strong></td>
            <td>${s.formula}</td>
            <td>${s.calculation}</td>
            <td style="text-align: right; font-weight: bold;">${s.area.toFixed(2)} ${s.unit}</td>
          </tr>
        `).join("")}
      </table>

      <h2>4. Área de absorção sonora</h2>
      <p>${TECHNICAL_DESCRIPTIONS.absorcaoSonora}</p>
      <table>
        <tr>
          <th>Material</th>
          <th style="text-align: right;">Área (m²)</th>
          <th style="text-align: center;">Coeficiente (α)</th>
          <th style="text-align: right;">Absorção (m² sabin)</th>
        </tr>
        ${ABSORPTION_MATERIALS.map(m => `
          <tr>
            <td><strong>${m.name}</strong></td>
            <td style="text-align: right;">${m.area.toFixed(2)}</td>
            <td style="text-align: center;">${m.coefficient.toFixed(2)}</td>
            <td style="text-align: right; font-weight: bold;">${m.absorption.toFixed(2)}</td>
          </tr>
        `).join("")}
        <tr style="background-color: #e8f1f5; color: #0c232c; font-weight: bold;">
          <td colspan="3">Total de absorção sonora (A)</td>
          <td style="text-align: right;">${ROOM_DATA.initialAbsorption.toFixed(2)} m² sabin</td>
        </tr>
      </table>

      <h2>5. Tempo de reverberação</h2>
      <p>${TECHNICAL_DESCRIPTIONS.tempoReverberacao}</p>
      <div style="background-color: #fef2f2; border: 1pt solid #fca5a5; padding: 10pt; text-align: center; font-size: 12pt; color: #991b1b;">
        <strong>Tr = 0,16V / A = (0,16 × 168) / 34,30 = 0,78 s</strong>
      </div>

      <h2>6. Proposta de melhoria acústica</h2>
      <p>${TECHNICAL_DESCRIPTIONS.propostaMelhoria}</p>
      <ul>
        <li><strong>Aumento da absorção (10 m² de chapa acústica):</strong> ΔA = 10(0,80 - 0,05) = <strong>7,50 m² sabin</strong></li>
        <li><strong>Nova absorção sonora:</strong> Anovo = 34,30 + 7,50 = <strong>41,80 m² sabin</strong></li>
        <li><strong>Novo tempo de reverberação:</strong> Tr = (0,16 × 168) / 41,80; <strong>Tr = 0,64 s</strong></li>
      </ul>

      <h2>Conclusão</h2>
      <p>${TECHNICAL_DESCRIPTIONS.conclusao}</p>

      <div class="footer">
        Universidade Eduardo Mondlane · Faculdade de Arquitectura e Planeamento Físico<br>
        Discente: Delcídio Nhatingo · Outubro 2026
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", htmlContent], { type: "application/msword;charset=utf-8;" });
  return downloadBlob(blob, filename);
}

// 6. Export to PowerPoint (.ppt presentation HTML package in Century Gothic)
export async function exportToPowerPoint(elementId = "a2-printable-board", filename = "Apresentacao_Acustica_UEM_Delcidio_Nhatingo.ppt"): Promise<string> {
  let boardImgTag = "";
  try {
    const canvas = await captureBoardCanvas(elementId);
    const imgData = canvas.toDataURL("image/jpeg", 0.90);
    boardImgTag = `<div style="text-align:center; margin-top:10px;"><img src="${imgData}" style="max-width:900px; height:auto; border:2px solid #0c232c; border-radius:4px; box-shadow:0 4px 10px rgba(0,0,0,0.15);" /></div>`;
  } catch (err) {
    console.warn("Could not capture image for PPT slide 2:", err);
  }

  const slidesContent = `
    <html xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:p="urn:schemas-microsoft-com:office:powerpoint"
    xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>Estudo Acústico de uma Sala de Aula - UEM</title>
      <style>
        body { font-family: 'Century Gothic', Arial, sans-serif; margin: 0; background-color: #0c161d; color: #1e293b; }
        .slide { width: 980px; min-height: 580px; background: white; margin: 30px auto; padding: 35px 45px; box-sizing: border-box; page-break-after: always; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        .slide-header { background: #0c232c; color: white; padding: 15px 25px; margin: -35px -45px 20px -45px; border-radius: 8px 8px 0 0; }
        .slide-title { font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 0.5px; }
        .slide-subtitle { font-size: 13px; color: #38bdf8; margin-top: 4px; }
        p { font-size: 14px; line-height: 1.6; text-align: justify; color: #334155; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 15px 0; }
        th { background: #e8f1f5; color: #0c232c; padding: 8px 10px; text-align: left; border: 1px solid #cbd5e1; font-weight: bold; }
        td { border: 1px solid #cbd5e1; padding: 7px 10px; }
        tr:nth-child(even) td { background-color: #f8fafc; }
        .kpi-row { display: flex; gap: 15px; margin: 20px 0; }
        .kpi-card { flex: 1; background: #091a21; color: white; padding: 15px; border-radius: 6px; text-align: center; border: 1px solid #1f4a5c; }
        .kpi-val { font-size: 26px; font-weight: bold; color: #38bdf8; }
        .kpi-lbl { font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-bottom: 5px; }
        .box-highlight { background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px; padding: 15px; margin: 15px 0; }
        .box-alert { background: #fef2f2; border: 1.5px solid #fca5a5; border-radius: 6px; padding: 15px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <!-- SLIDE 1: CAPA -->
      <div class="slide" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: #0c232c; color: white;">
        <div style="font-size: 14px; letter-spacing: 3px; color: #38bdf8; text-transform: uppercase; font-weight: bold;">
          UNIVERSIDADE EDUARDO MONDLANE · FAPF
        </div>
        <div style="font-size: 12px; color: #94a3b8; margin-top: 5px;">
          TECNOLOGIAS PARA O CONFORTO AMBIENTAL (TCA II)
        </div>
        <h1 style="font-size: 34px; margin: 30px 0 15px 0; color: #ffffff;">
          Estudo Acústico de uma Sala de Aula
        </h1>
        <h3 style="font-size: 18px; color: #f59e0b; font-weight: normal; margin-top: 0;">
          Cálculo do Tempo de Reverberação e Proposta de Melhoria Acústica
        </h3>
        <div style="margin-top: 40px; font-size: 14px; color: #cbd5e1; line-height: 1.8; border-top: 1px solid #1f4a5c; padding-top: 20px; width: 80%;">
          <strong>Discente:</strong> Delcídio Nhatingo (III Ano · 2.º Semestre)<br>
          <strong>Docente:</strong> Bernardino Jaiela &nbsp;|&nbsp; <strong>Monitor:</strong> Hermínio Banze<br>
          Prancha Académica A2 Horizontal (594 × 420 mm)
        </div>
      </div>

      <!-- SLIDE 2: PRANCHA COMPLETA A2 -->
      ${boardImgTag ? `
      <div class="slide">
        <div class="slide-header">
          <div class="slide-title">Prancha Geral A2 do Estudo Acústico</div>
          <div class="slide-subtitle">Desenhos técnicos (Planta e Corte 1:100) e memorial de cálculo completo</div>
        </div>
        ${boardImgTag}
      </div>` : ""}

      <!-- SLIDE 3: DADOS DO EXERCÍCIO -->
      <div class="slide">
        <div class="slide-header">
          <div class="slide-title">1. Dados do Exercício</div>
          <div class="slide-subtitle">Parâmetros geométricos e caracterização dos elementos construtivos</div>
        </div>
        <p>${TECHNICAL_DESCRIPTIONS.dadosExercicio}</p>
        <table>
          <tr>
            <th>Elemento Construtivo</th>
            <th style="text-align:center;">Símbolo</th>
            <th style="text-align:right;">Valor Regulamentar</th>
          </tr>
          ${GEOMETRIC_PARAMETERS.map(p => `
            <tr>
              <td><strong>${p.param}</strong></td>
              <td style="text-align:center; font-style:italic;">${p.simbolo}</td>
              <td style="text-align:right; font-weight:bold;">${p.valor}</td>
            </tr>
          `).join("")}
        </table>
      </div>

      <!-- SLIDE 4: VOLUME DA SALA -->
      <div class="slide">
        <div class="slide-header">
          <div class="slide-title">2. Cálculo do Volume da Sala</div>
          <div class="slide-subtitle">Determinação da cubagem e rácio volumétrico por estudante</div>
        </div>
        <p>${TECHNICAL_DESCRIPTIONS.volumeSala}</p>
        <div class="kpi-row">
          <div class="kpi-card">
            <div class="kpi-lbl">Comprimento C</div>
            <div class="kpi-val">8,00 m</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-lbl">Largura L</div>
            <div class="kpi-val">7,00 m</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-lbl">Pé-direito H</div>
            <div class="kpi-val">3,00 m</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-lbl">Volume V</div>
            <div class="kpi-val" style="color: #f59e0b;">168,00 m³</div>
          </div>
        </div>
        <div class="box-highlight">
          <strong>Fórmula:</strong> V = C × L × H = 8,00 × 7,00 × 3,00 = <strong>168,00 m³</strong><br>
          <span style="font-size:12px; color:#15803d;">Rácio por aluno (lotação 40 estudantes): 4,20 m³/aluno, garantindo renovação de ar e conforto térmico.</span>
        </div>
      </div>

      <!-- SLIDE 5: CÁLCULO DAS ÁREAS -->
      <div class="slide">
        <div class="slide-header">
          <div class="slide-title">3. Cálculo das Áreas dos Componentes</div>
          <div class="slide-subtitle">Quantificação detalhada com dedução de vãos envidraçados e porta</div>
        </div>
        <p>${TECHNICAL_DESCRIPTIONS.calculoAreas}</p>
        <table>
          <tr>
            <th>Elemento</th>
            <th>Fórmula Aplicada</th>
            <th>Cálculo Algébrico</th>
            <th style="text-align:right;">Área Útil</th>
          </tr>
          ${SURFACE_AREAS_TABLE.map(s => `
            <tr ${s.highlight ? "style='background-color:#e0f2fe; font-weight:bold;'" : ""}>
              <td><strong>${s.description}</strong></td>
              <td>${s.formula}</td>
              <td>${s.calculation}</td>
              <td style="text-align:right; font-weight:bold;">${s.area.toFixed(2)} ${s.unit}</td>
            </tr>
          `).join("")}
        </table>
      </div>

      <!-- SLIDE 6: ÁREA DE ABSORÇÃO SONORA -->
      <div class="slide">
        <div class="slide-header">
          <div class="slide-title">4. Área de Absorção Sonora Inicial</div>
          <div class="slide-subtitle">Balanço de absorção acústica a 500 Hz antes da intervenção</div>
        </div>
        <p>${TECHNICAL_DESCRIPTIONS.absorcaoSonora}</p>
        <table>
          <tr>
            <th>Material Construtivo</th>
            <th style="text-align:right;">Área Superficial (m²)</th>
            <th style="text-align:center;">Coeficiente α (500 Hz)</th>
            <th style="text-align:right;">Absorção A (m² sabin)</th>
          </tr>
          ${ABSORPTION_MATERIALS.map(m => `
            <tr>
              <td><strong>${m.name}</strong></td>
              <td style="text-align:right;">${m.area.toFixed(2)}</td>
              <td style="text-align:center;">${m.coefficient.toFixed(2)}</td>
              <td style="text-align:right; font-weight:bold;">${m.absorption.toFixed(2)}</td>
            </tr>
          `).join("")}
          <tr style="background-color:#e8f1f5; font-weight:bold; color:#0c232c;">
            <td colspan="3">Absorção Acústica Total Inicial (A)</td>
            <td style="text-align:right; color:#0369a1; font-size:15px;">${ROOM_DATA.initialAbsorption.toFixed(2)} m² sabin</td>
          </tr>
        </table>
      </div>

      <!-- SLIDE 7: TEMPO DE REVERBERAÇÃO INICIAL -->
      <div class="slide">
        <div class="slide-header">
          <div class="slide-title">5. Avaliação do Tempo de Reverberação Inicial</div>
          <div class="slide-subtitle">Aplicação da Fórmula de Sabine e diagnóstico acústico</div>
        </div>
        <p>${TECHNICAL_DESCRIPTIONS.tempoReverberacao}</p>
        <div class="box-alert" style="text-align:center; font-size:18px; color:#991b1b; padding:25px;">
          <div style="font-size:12px; color:#64748b; text-transform:uppercase; margin-bottom:8px;">Fórmula Clássica de Sabine</div>
          <strong>Tr = (0,16 × V) / A = (0,16 × 168,00) / 34,30 = 0,78 s</strong>
        </div>
        <p style="margin-top:20px;">
          <strong>Diagnóstico:</strong> O valor inicial de <strong>0,78 s</strong> situa-se acima da gama de conforto ideal recomendada para salas de aula (0,60 s a 0,70 s segundo a norma ANSI/ASA S12.60). A reverberação prolongada cria um efeito de máscara acústica sobre as consoantes, comprometendo a clareza e a inteligibilidade dos conteúdos ministrados.
        </p>
      </div>

      <!-- SLIDE 8: PROPOSTA DE MELHORIA ACÚSTICA -->
      <div class="slide">
        <div class="slide-header">
          <div class="slide-title">6. Proposta de Melhoria Acústica</div>
          <div class="slide-subtitle">Aplicação de 10 m² de chapa mineral acústica no tecto (α = 0,80)</div>
        </div>
        <p>${TECHNICAL_DESCRIPTIONS.propostaMelhoria}</p>
        <div class="kpi-row">
          <div class="kpi-card" style="border-color:#15803d;">
            <div class="kpi-lbl">Ganho de Absorção ΔA</div>
            <div class="kpi-val" style="color:#22c55e;">+7,50 m² sab</div>
          </div>
          <div class="kpi-card" style="border-color:#0284c7;">
            <div class="kpi-lbl">Nova Absorção Anovo</div>
            <div class="kpi-val" style="color:#38bdf8;">41,80 m² sab</div>
          </div>
          <div class="kpi-card" style="border-color:#eab308;">
            <div class="kpi-lbl">Novo Tempo Tr</div>
            <div class="kpi-val" style="color:#facc15;">0,64 s</div>
          </div>
        </div>
        <div class="box-highlight" style="font-size:14px; line-height:1.7;">
          <strong>1. Ganho de absorção acústica no tecto:</strong><br>
          ΔA = S × (αnovo - αantigo) = 10,00 × (0,80 - 0,05) = <strong>7,50 m² sabin</strong><br><br>
          <strong>2. Absorção total corrigida:</strong><br>
          Anovo = Ainicial + ΔA = 34,30 + 7,50 = <strong>41,80 m² sabin</strong><br><br>
          <strong>3. Novo tempo de reverberação:</strong><br>
          Tr = (0,16 × V) / Anovo = (0,16 × 168,00) / 41,80 = <strong>0,64 s</strong> (Conforme com normas internacionais!)
        </div>
      </div>

      <!-- SLIDE 9: CONCLUSÃO -->
      <div class="slide">
        <div class="slide-header">
          <div class="slide-title">Conclusão e Parecer Técnico</div>
          <div class="slide-subtitle">Síntese dos resultados e conformidade regulamentar</div>
        </div>
        <p style="font-size:15px; line-height:1.8;">${TECHNICAL_DESCRIPTIONS.conclusao}</p>
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:20px; margin-top:25px;">
          <div style="font-size:14px; font-weight:bold; color:#0c232c; margin-bottom:10px;">Resumo dos Resultados Acústicos:</div>
          <ul style="font-size:14px; line-height:1.8; color:#334155;">
            <li>Redução efetiva de <strong>17,9%</strong> no tempo de reverberação (de 0,78 s para 0,64 s).</li>
            <li>Enquadramento rigoroso dentro do intervalo de excelência (0,60 s - 0,70 s).</li>
            <li>Intervenção cirúrgica e de baixo custo, sem necessidade de obras estruturais.</li>
          </ul>
        </div>
        <div style="text-align:center; margin-top:35px; font-size:12px; color:#64748b; border-top:1px solid #e2e8f0; padding-top:15px;">
          Universidade Eduardo Mondlane · Faculdade de Arquitectura e Planeamento Físico<br>
          Discente: Delcídio Nhatingo · Outubro 2026
        </div>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", slidesContent], { type: "application/vnd.ms-powerpoint;charset=utf-8;" });
  return downloadBlob(blob, filename);
}

// 7. Export to Excel / CSV format (compatível com Excel com UTF-8 BOM)
export function exportToCSV(filename = "Calculos_Acustica_UEM_Delcidio_Nhatingo.csv"): string {
  let csv = "\uFEFF"; // UTF-8 BOM
  csv += "UNIVERSIDADE EDUARDO MONDLANE (UEM);FACULDADE DE ARQUITECTURA E PLANEAMENTO FISICO\n";
  csv += "ESTUDO ACUSTICO DE UMA SALA DE AULA;DISCENTE: DELCIDIO NHATINGO\n";
  csv += "DOCENTE: BERNARDINO JAIELA;MONITOR: HERMINIO BANZE\n\n";

  csv += "1. DADOS DO EXERCICIO\n";
  csv += `"${TECHNICAL_DESCRIPTIONS.dadosExercicio}"\n`;
  csv += "Parametro;Simbolo;Valor\n";
  GEOMETRIC_PARAMETERS.forEach(p => {
    csv += `"${p.param}";"${p.simbolo}";"${p.valor}"\n`;
  });

  csv += "\n2. CALCULO DO VOLUME DA SALA\n";
  csv += `"${TECHNICAL_DESCRIPTIONS.volumeSala}"\n`;
  csv += `"Formula";"V = C * L * H"\n`;
  csv += `"Calculo";"8,00 * 7,00 * 3,00"\n`;
  csv += `"Volume";"168,00 m3"\n`;

  csv += "\n3. CALCULO DAS AREAS\n";
  csv += `"${TECHNICAL_DESCRIPTIONS.calculoAreas}"\n`;
  csv += "Elemento;Formula;Calculo;Resultado (m2)\n";
  SURFACE_AREAS_TABLE.forEach(s => {
    csv += `"${s.description}";"${s.formula}";"${s.calculation}";${s.area.toFixed(2)}\n`;
  });

  csv += "\n4. AREA DE ABSORCAO SONORA (500 Hz)\n";
  csv += `"${TECHNICAL_DESCRIPTIONS.absorcaoSonora}"\n`;
  csv += "Material;Area (m2);Coeficiente (alpha);Absorcao (m2 sabin)\n";
  ABSORPTION_MATERIALS.forEach(m => {
    csv += `"${m.name}";${m.area.toFixed(2)};${m.coefficient.toFixed(2)};${m.absorption.toFixed(2)}\n`;
  });
  csv += `Total de absorcao sonora (A);;;"${ROOM_DATA.initialAbsorption.toFixed(2)} m2 sabin"\n`;

  csv += "\n5. TEMPO DE REVERBERACAO INICIAL\n";
  csv += `"${TECHNICAL_DESCRIPTIONS.tempoReverberacao}"\n`;
  csv += `"Tempo de reverberacao";"Tr = 0,16V / A";"(0,16 * 168) / 34,30";"0,78 s"\n`;

  csv += "\n6. PROPOSTA DE MELHORIA ACUSTICA\n";
  csv += `"${TECHNICAL_DESCRIPTIONS.propostaMelhoria}"\n`;
  csv += "Elemento;Calculo;Resultado\n";
  csv += `"Aumento da absorcao (10 m2 de chapa acustica)";"Delta A = 10(0,80 - 0,05)";"7,50 m2 sabin"\n`;
  csv += `"Nova absorcao sonora";"Anovo = 34,30 + 7,50";"41,80 m2 sabin"\n`;
  csv += `"Novo tempo de reverberacao";"Tr = 0,16V / Anovo";"0,64 s"\n\n`;

  csv += "CONCLUSAO\n";
  csv += `"${TECHNICAL_DESCRIPTIONS.conclusao}"\n`;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  return downloadBlob(blob, filename);
}

// 8. Export Full Vector SVG
export function exportToSVG(elementId = "a2-printable-board", filename = "Prancha_A2_Acustica_UEM_Delcidio_Nhatingo.svg"): string {
  const element = document.getElementById(elementId);
  if (!element) throw new Error("Elemento da prancha não encontrado");

  const svgs = element.querySelectorAll("svg");
  if (svgs.length === 0) throw new Error("Desenhos SVG não encontrados");

  const combinedSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1485 1050" width="1485" height="1050">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
      text { font-family: 'Century Gothic', 'Montserrat', Arial, sans-serif; }
    </style>
  </defs>
  
  <!-- Fundo da Prancha A2 -->
  <rect width="1485" height="1050" fill="#ffffff" stroke="#0c232c" stroke-width="4" />
  
  <!-- Margem Regulamentar DIN (20 mm = ~50 px) -->
  <rect x="25" y="25" width="1435" height="1000" fill="none" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4,4" />

  <!-- Cabeçalho Institucional UEM -->
  <rect x="35" y="35" width="1415" height="42" fill="#0c232c" />
  <text x="50" y="62" font-size="16" font-weight="bold" fill="#ffffff">
    UNIVERSIDADE EDUARDO MONDLANE (UEM) · FACULDADE DE ARQUITECTURA E PLANEAMENTO FÍSICO
  </text>
  <text x="1430" y="62" text-anchor="end" font-size="12" font-weight="bold" fill="#38bdf8">
    TCA II · ESTUDO ACÚSTICO DE UMA SALA DE AULA · A2 HORIZONTAL
  </text>

  <!-- Desenho 1: Planta Baixa Cotada (x: 40, y: 88, w: 530, h: 460) -->
  <g transform="translate(40, 88)">
    <rect width="530" height="460" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" rx="4" />
    <text x="15" y="22" font-size="11" font-weight="bold" fill="#0c232c">1. PLANTA BAIXA ARQUITECTÓNICA COTADA (Escala 1:100)</text>
    <g transform="translate(10, 30)">
      ${svgs[0] ? svgs[0].innerHTML : ""}
    </g>
  </g>

  <!-- Desenho 2: Corte Esquemático Cotado (x: 40, y: 560, w: 530, h: 460) -->
  <g transform="translate(40, 560)">
    <rect width="530" height="460" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" rx="4" />
    <text x="15" y="22" font-size="11" font-weight="bold" fill="#0c232c">2. CORTE ESQUEMÁTICO COTADO A-A' (Escala 1:100)</text>
    <g transform="translate(10, 30)">
      ${svgs[1] ? svgs[1].innerHTML : ""}
    </g>
  </g>

  <!-- Legenda e Rodapé Académico -->
  <g transform="translate(585, 960)">
    <rect width="865" height="55" fill="#0c232c" rx="4" />
    <text x="20" y="24" font-size="11" font-weight="bold" fill="#ffffff">DISCENTE: DELCÍDIO NHATINGO (III ANO · 2.º SEMESTRE)</text>
    <text x="20" y="44" font-size="10" fill="#94a3b8">DOCENTE: BERNARDINO JAIELA · MONITOR: HERMÍNIO BANZE</text>
    <text x="845" y="34" text-anchor="end" font-size="12" font-weight="bold" fill="#f59e0b">PRANCHA A2 · 594 × 420 mm</text>
  </g>
</svg>`;

  const blob = new Blob([combinedSVG], { type: "image/svg+xml;charset=utf-8" });
  return downloadBlob(blob, filename);
}
