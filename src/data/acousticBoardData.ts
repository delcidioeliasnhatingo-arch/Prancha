/**
 * Academic Acoustic Data according to UEM - Delcídio Nhatingo
 * Faculdade de Arquitectura e Planeamento Físico
 * Tecnologias para o Conforto Ambiental (TCA)
 * Dados 100% fiéis ao documento Screenshot_2026-10-24_004350_2e809a68.png
 */

export interface AcousticMaterialItem {
  id: string;
  name: string;
  area: number;
  coefficient: number; // alpha at 500 Hz
  absorption: number;  // A = S * alpha (m² sabin)
  formula: string;
  color: string;
}

export interface AreaCalculationRow {
  code: string;
  description: string;
  formula: string;
  calculation: string;
  area: number;
  unit: string;
  highlight?: boolean;
}

export const ROOM_DATA = {
  institution: "Universidade Eduardo Mondlane (UEM)",
  faculty: "Faculdade de Arquitectura e Planeamento Físico",
  subject: "Tecnologias para o Conforto Ambiental (TCA)",
  disciplineCode: "TCA",
  theme: "Estudo Acústico de uma Sala de Aula",
  subtheme: "Cálculo do Tempo de Reverberação e Proposta de Melhoria Acústica",
  teacher: "Bernardino Jaiela",
  monitor: "Hermínio Banze",
  student: "Delcídio Nhatingo",
  studentYear: "III Ano",
  semester: "Segundo Semestre",
  sheet: "01 / 01",
  format: "A2 Horizontal (594 × 420 mm)",
  scale: "1:100",
  date: "Outubro 2026",

  // Parâmetros Geométricos Exatos (Tabela 1 do documento)
  length: 8.00,        // C (m)
  width: 7.00,         // L (m)
  height: 3.00,        // H (m)
  wallThickness: 0.20, // e (m)
  externalLength: 8.40,
  externalWidth: 7.40,
  volume: 168.00,      // V (m³) = 8 * 7 * 3
  floorArea: 56.00,    // S (m²) = 8 * 7
  lambrilHeight: 0.80, // hl (m) = 0,80 m
  
  // Vãos de Janelas e Porta
  windowCount: 4,
  windowWidth: 1.60,   // Cj (m) = 1,60 m
  windowHeight: 1.20,  // Hj (m) = 1,20 m
  doorCount: 1,
  doorWidth: 0.90,     // Ld (m) = 0,90 m
  doorHeight: 2.10,    // Hd (m) = 2,10 m
  
  // Chapa Acústica Macia Suspensa no Teto
  acousticCeilingLength: 6.00, // Ca (m) = 6,00 m
  acousticCeilingWidth: 5.00,  // La (m) = 5,00 m
  acousticCeilingArea: 30.00,  // Aa (m²) = 30,00 m²

  // Resultados Acústicos Exatos do Exercício
  frequency: "500 Hz",
  sabineConstant: 0.16,      // Tr = 0,16 * V / A
  initialAbsorption: 34.30,  // A1 (m² sabin)
  initialTR: 0.78,          // Tr1 (s) = (0,16 * 168) / 34,30 = 0,78 s
  proposedAdditionalSoftPanel: 10.00, // 10 m²
  proposedAbsorptionIncrease: 7.50,   // ΔA (m² sabin) = 10 * (0,80 - 0,05) = 7,50
  targetAbsorption: 41.80,   // Anovo (m² sabin) = 34,30 + 7,50 = 41,80
  targetTR: 0.64,            // Tr2 (s) = (0,16 * 168) / 41,80 = 0,64 s
  standardMinTR: 0.40,       // ANSI/ASA S12.60
  standardMaxTR: 0.65,       // ANSI/ASA S12.60
};

// 1. Dados do Exercício (Parâmetros Geométricos da Imagem 2)
export const GEOMETRIC_PARAMETERS = [
  { param: "Comprimento da sala", simbolo: "C", valor: "8,00 m", obs: "Vão livre interior" },
  { param: "Largura da sala", simbolo: "L", valor: "7,00 m", obs: "Vão livre interior" },
  { param: "Pé-direito", simbolo: "H", valor: "3,00 m", obs: "Cota livre de piso a laje" },
  { param: "Espessura das paredes", simbolo: "e", valor: "0,20 m", obs: "Alvenaria perimétrica" },
  { param: "Altura do lambril", simbolo: "hl", valor: "0,80 m", obs: "Revestimento em madeira" },
  { param: "Número de janelas", simbolo: "n", valor: "4", obs: "Vãos envidraçados laterais" },
  { param: "Comprimento de cada janela", simbolo: "Cj", valor: "1,60 m", obs: "Dimensão horizontal de vão" },
  { param: "Altura de cada janela", simbolo: "Hj", valor: "1,20 m", obs: "Dimensão vertical de vão" },
  { param: "Largura da porta", simbolo: "Ld", valor: "0,90 m", obs: "Vão útil de passagem" },
  { param: "Altura da porta", simbolo: "Hd", valor: "2,10 m", obs: "Altura padrão de esquadria" },
  { param: "Comprimento da chapa acústica", simbolo: "Ca", valor: "6,00 m", obs: "Placa suspensa central" },
  { param: "Largura da chapa acústica", simbolo: "La", valor: "5,00 m", obs: "Placa suspensa central" }
];

// 3. Cálculo das Áreas das Superfícies Envolventes (Exatamente como na Imagem 2)
export const SURFACE_AREAS_TABLE: AreaCalculationRow[] = [
  {
    code: "Ap",
    description: "Pavimento",
    formula: "Ap = C × L",
    calculation: "8,00 × 7,00",
    area: 56.00,
    unit: "m²",
  },
  {
    code: "At",
    description: "Tecto (total)",
    formula: "At = C × L",
    calculation: "8,00 × 7,00",
    area: 56.00,
    unit: "m²",
  },
  {
    code: "Aa",
    description: "Chapa acústica",
    formula: "Aa = Ca × La",
    calculation: "6,00 × 5,00",
    area: 30.00,
    unit: "m²",
    highlight: true,
  },
  {
    code: "Ar",
    description: "Reboco liso (tecto)",
    formula: "Ar = At - Aa",
    calculation: "56,00 - 30,00",
    area: 26.00,
    unit: "m²",
  },
  {
    code: "Apb",
    description: "Paredes (brutas)",
    formula: "Apb = 2(C + L) × H",
    calculation: "2(8,00 + 7,00) × 3,00",
    area: 90.00,
    unit: "m²",
  },
  {
    code: "Aj1",
    description: "Janela (1 unidade)",
    formula: "Aj1 = Cj × Hj",
    calculation: "1,60 × 1,20",
    area: 1.92,
    unit: "m²",
  },
  {
    code: "Aj",
    description: "Janelas (4 unidades)",
    formula: "Aj = 4 × Aj1",
    calculation: "4 × 1,92",
    area: 7.68,
    unit: "m²",
  },
  {
    code: "Ad",
    description: "Porta",
    formula: "Ad = Ld × Hd",
    calculation: "0,90 × 2,10",
    area: 1.89,
    unit: "m²",
  },
  {
    code: "Apl",
    description: "Paredes líquidas",
    formula: "Apl = Apb - Aj - Ad",
    calculation: "90,00 - 7,68 - 1,89",
    area: 80.43,
    unit: "m²",
  },
  {
    code: "Al",
    description: "Lambril (bruto)",
    formula: "Al = P × hl",
    calculation: "30,00 × 0,80",
    area: 24.00,
    unit: "m²",
    highlight: true,
  },
  {
    code: "Ar_sup",
    description: "Paredes acima do lambril",
    formula: "Ar = Apl - Al",
    calculation: "80,43 - 24,00",
    area: 56.43,
    unit: "m²",
  },
];

// 4. Área de Absorção Sonora (Tabela 4 da Imagem 2)
export const ABSORPTION_MATERIALS: AcousticMaterialItem[] = [
  {
    id: "parquet",
    name: "Parquê (pavimento)",
    area: 56.00,
    coefficient: 0.06,
    absorption: 3.36,
    formula: "56,00 × 0,06",
    color: "#b45309",
  },
  {
    id: "chapa_acustica",
    name: "Chapa acústica macia",
    area: 30.00,
    coefficient: 0.80,
    absorption: 24.00,
    formula: "30,00 × 0,80",
    color: "#0284c7",
  },
  {
    id: "reboco_tecto",
    name: "Reboco liso (tecto)",
    area: 26.00,
    coefficient: 0.05,
    absorption: 1.30,
    formula: "26,00 × 0,05",
    color: "#94a3b8",
  },
  {
    id: "lambril_madeira",
    name: "Lambril de madeira",
    area: 24.00,
    coefficient: 0.10,
    absorption: 2.40,
    formula: "24,00 × 0,10",
    color: "#d97706",
  },
  {
    id: "reboco_paredes",
    name: "Paredes rebocadas",
    area: 56.43,
    coefficient: 0.05,
    absorption: 2.82,
    formula: "56,43 × 0,05",
    color: "#cbd5e1",
  },
  {
    id: "janelas_vidro",
    name: "Janelas (fechadas)",
    area: 7.68,
    coefficient: 0.03,
    absorption: 0.23,
    formula: "7,68 × 0,03",
    color: "#38bdf8",
  },
  {
    id: "porta_madeira",
    name: "Porta de madeira",
    area: 1.89,
    coefficient: 0.10,
    absorption: 0.19,
    formula: "1,89 × 0,10",
    color: "#78350f",
  },
];

// Marcadores numerados para o corte esquemático
export const SECTION_CALLOUTS = [
  {
    number: "①",
    title: "Chapa Acústica Macia no Teto",
    detail: "6,00 × 5,00 m (30,00 m²) suspensa · α = 0,80 a 500 Hz",
    description: "Amortece reflexões verticais diretas entre o teto e o pavimento.",
  },
  {
    number: "②",
    title: "Vãos Envidraçados nas Paredes Laterais",
    detail: "4 janelas de 1,60 × 1,20 m (peitoril 1,00 m / verga 2,20 m) · α = 0,03",
    description: "Disposição bilateral equilibrada para iluminação natural uniforme e ventilação cruzada.",
  },
  {
    number: "③",
    title: "Porta de Madeira em Alçado",
    detail: "0,90 × 2,10 m (1,89 m²) na parede de acesso · α = 0,10",
    description: "Folha maciça com batente vedante, posicionada na parede terminal.",
  },
  {
    number: "④",
    title: "Lambril de Madeira Perimétrico",
    detail: "Altura contínua hl = 0,80 m (24,00 m²) · α = 0,10",
    description: "Proteção física e absorção acústica moderada na zona de circulação dos alunos.",
  },
  {
    number: "⑤",
    title: "Pavimento em Parquê de Madeira",
    detail: "Área total 56,00 m² · α = 0,06 a 500 Hz",
    description: "Tacos sobre betonilha proporcionando conforto térmico e absorção inicial de 3,36 sabin.",
  },
  {
    number: "⑥",
    title: "Paredes em Alvenaria Rebocada",
    detail: "Área líquida superior 56,43 m² · α = 0,05 a 500 Hz",
    description: "Superfície difusa que direciona a energia sonora útil para o fundo da sala.",
  },
];

// Textos técnicos detalhados fornecidos pelo utilizador para preenchimento das lacunas
export const TECHNICAL_DESCRIPTIONS = {
  dadosExercicio:
    "A sala de aula em estudo apresenta uma configuração rectangular, com pavimento em parquet de madeira, paredes rebocadas, lambril perimetral em madeira, vãos envidraçados e porta de acesso em madeira. O tecto integra uma área de revestimento acústico mineral, cuja função é aumentar a absorção sonora e controlar a reverberação no interior do espaço.",
  volumeSala:
    "O volume interior da sala constitui um parâmetro fundamental na avaliação do seu comportamento acústico, uma vez que influencia o tempo de reverberação e a resposta sonora do ambiente. A geometria e as dimensões do compartimento são consideradas na análise da propagação do som durante as actividades lectivas.",
  calculoAreas:
    "A quantificação das superfícies interiores permite determinar a contribuição de cada elemento construtivo para o comportamento acústico da sala. Foram consideradas as áreas do pavimento, do tecto e das paredes, com a dedução dos vãos correspondentes às janelas e à porta, distinguindo-se as superfícies revestidas com materiais de diferentes características acústicas.",
  absorcaoSonora:
    "A absorção sonora da sala resulta da combinação dos diferentes materiais aplicados nas superfícies interiores. O revestimento acústico mineral apresenta maior capacidade de absorção do que as superfícies de madeira e reboco consideradas no estudo, contribuindo significativamente para a redução da energia sonora reflectida e para o controlo das reflexões no interior do compartimento.",
  tempoReverberacao:
    "O tempo de reverberação inicial permite avaliar a persistência do som no interior da sala após a interrupção da fonte sonora. Numa sala destinada ao ensino, este parâmetro é particularmente relevante, pois uma reverberação excessiva pode comprometer a articulação das palavras, dificultar a compreensão das explicações do professor e reduzir a inteligibilidade da fala, sobretudo nas posições mais afastadas da fonte sonora.",
  propostaMelhoria:
    "Propõe-se a aplicação de um revestimento acústico mineral numa área central do tecto, mantendo os restantes acabamentos arquitectónicos. Esta intervenção visa aumentar a absorção sonora na superfície superior da sala, reduzir as reflexões entre o tecto e o pavimento e melhorar as condições de comunicação oral. A solução permite optimizar o desempenho acústico do espaço sem exigir alterações significativas à configuração arquitectónica existente.",
  conclusao:
    "A análise demonstra a importância da selecção dos materiais de acabamento no desempenho acústico de uma sala de aula. A introdução de um revestimento absorvente no tecto constitui uma estratégia de intervenção localizada, capaz de contribuir para o controlo da reverberação e para a melhoria da inteligibilidade da fala. A eficácia da solução deverá ser confirmada pela verificação do tempo de reverberação final face aos critérios acústicos aplicáveis a salas destinadas ao ensino.",
};

// Síntese técnica do discente Delcídio Nhatingo
export const TECHNICAL_SYNTHESIS = {
  title: "Conclusão e Parecer Técnico",
  paragraphs: [
    TECHNICAL_DESCRIPTIONS.conclusao,
  ]
};
