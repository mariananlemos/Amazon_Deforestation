// =============================================================================
// Amazon Deforestation — Static data extracted from the DETER-AMZ dataset
// Source: INPE / TerraBrasilis — http://terrabrasilis.dpi.inpe.br/downloads/
// =============================================================================

export const MONTHS_PT = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
] as const;

/** Yearly totals (hydrological year) */
export const yearlyData = [
  { year: '2015/2016', area: 15141.47 },
  { year: '2016/2017', area: 14898.32 },
  { year: '2017/2018', area: 16498.56 },
  { year: '2018/2019', area: 22939.14 },
  { year: '2019/2020', area: 29026.37 },
  { year: '2020/2021', area: 32024.85 },
  { year: '2021/2022', area: 30564.22 },
  { year: '2022/2023', area: 25018.43 },
  { year: '2023/2024', area: 29102.77 },
  { year: '2024/2025', area: 54674.00 },
];

/** Monthly seasonality (average km² across all years) */
export const monthlyAvg = [
  { month: 'Jan', value: 1408.2 },
  { month: 'Fev', value: 752.4 },
  { month: 'Mar', value: 498.7 },
  { month: 'Abr', value: 488.1 },
  { month: 'Mai', value: 1006.3 },
  { month: 'Jun', value: 1825.7 },
  { month: 'Jul', value: 3180.2 },
  { month: 'Ago', value: 5402.8 },
  { month: 'Set', value: 4813.6 },
  { month: 'Out', value: 3152.4 },
  { month: 'Nov', value: 2016.9 },
  { month: 'Dez', value: 1543.8 },
];

/** Top states by deforested area — 2024/2025 */
export const stateData = [
  { uf: 'PA', area: 17842, name: 'Pará' },
  { uf: 'MT', area: 11203, name: 'Mato Grosso' },
  { uf: 'AM', area: 9856, name: 'Amazonas' },
  { uf: 'RO', area: 5421, name: 'Rondônia' },
  { uf: 'MA', area: 4230, name: 'Maranhão' },
  { uf: 'AC', area: 2890, name: 'Acre' },
  { uf: 'TO', area: 1612, name: 'Tocantins' },
  { uf: 'RR', area: 980, name: 'Roraima' },
  { uf: 'AP', area: 640, name: 'Amapá' },
];

/** Model comparison on test set */
export const modelComparison = [
  {
    name: 'Gradient Boosting',
    mae: 892,
    rmse: 1204,
    r2: 0.731,
    color: '#e8544a',
  },
  {
    name: 'SARIMA(1,1,1)(1,1,1)[12]',
    mae: 1345,
    rmse: 1780,
    r2: 0.412,
    color: '#4ecdc4',
  },
  {
    name: 'Linear Regression',
    mae: 2890,
    rmse: 3520,
    r2: 0.0001,
    color: '#6a8a6a',
  },
];

/** Predicted vs actual on test set (last ~24 months) */
export const predVsActual = [
  { idx: 0, real: 2180, gb: 2050, sarima: 1800 },
  { idx: 1, real: 1420, gb: 1680, sarima: 1500 },
  { idx: 2, real: 980, gb: 1100, sarima: 1200 },
  { idx: 3, real: 760, gb: 850, sarima: 900 },
  { idx: 4, real: 1250, gb: 1150, sarima: 1000 },
  { idx: 5, real: 2400, gb: 2200, sarima: 1800 },
  { idx: 6, real: 4100, gb: 3800, sarima: 3200 },
  { idx: 7, real: 6200, gb: 5800, sarima: 4500 },
  { idx: 8, real: 5800, gb: 5500, sarima: 4800 },
  { idx: 9, real: 3500, gb: 3600, sarima: 3000 },
  { idx: 10, real: 2200, gb: 2400, sarima: 2100 },
  { idx: 11, real: 1600, gb: 1750, sarima: 1500 },
  { idx: 12, real: 3200, gb: 2900, sarima: 2400 },
  { idx: 13, real: 2100, gb: 2300, sarima: 1900 },
  { idx: 14, real: 1500, gb: 1400, sarima: 1200 },
  { idx: 15, real: 1100, gb: 1050, sarima: 950 },
  { idx: 16, real: 1800, gb: 1650, sarima: 1300 },
  { idx: 17, real: 3600, gb: 3200, sarima: 2600 },
  { idx: 18, real: 5500, gb: 5100, sarima: 4000 },
  { idx: 19, real: 8200, gb: 7500, sarima: 5800 },
];

/** GB feature importances */
export const featureImportance = [
  { feature: 'lag_1', importance: 0.38, label: 'Lag t-1' },
  { feature: 'lag_12', importance: 0.24, label: 'Lag t-12' },
  { feature: 'roll_3', importance: 0.14, label: 'Média Móvel 3m' },
  { feature: 'roll_12', importance: 0.09, label: 'Média Móvel 12m' },
  { feature: 'mes', importance: 0.08, label: 'Mês' },
  { feature: 'lag_24', importance: 0.05, label: 'Lag t-24' },
  { feature: 't', importance: 0.02, label: 'Tempo Linear' },
];

/** 2025 monthly forecast (Gradient Boosting) */
export const forecast2025 = [
  { month: 'Jan', area: 3120 },
  { month: 'Fev', area: 1850 },
  { month: 'Mar', area: 1200 },
  { month: 'Abr', area: 980 },
  { month: 'Mai', area: 1650 },
  { month: 'Jun', area: 2800 },
  { month: 'Jul', area: 4500 },
  { month: 'Ago', area: 6800 },
  { month: 'Set', area: 6200 },
  { month: 'Out', area: 4100 },
  { month: 'Nov', area: 2650 },
  { month: 'Dez', area: 1900 },
];

/** Key metrics */
export const KPI = {
  totalAlerted2024: 54674,
  totalPeriod: 249888,
  forecast2025Total: forecast2025.reduce((s, r) => s + r.area, 0),
  r2GradientBoosting: 0.731,
  peakMonths: ['Ago', 'Set', 'Out'],
  yearRange: '2015–2025',
  worstYear: '2024/2025',
  changeVsPrevious: 88,
} as const;

/** Methodology steps */
export const methodologySteps = [
  {
    step: 1,
    title: 'Preparação dos Dados',
    description:
      'Agregação mensal dos alertas DETER-AMZ por ano hidrológico. Remoção do ano corrente incompleto para evitar viés.',
  },
  {
    step: 2,
    title: 'Feature Engineering',
    description:
      'Criação de features temporais: lags (t-1, t-12, t-24), médias móveis (3 e 12 meses), índice temporal e mês como sazonalidade explícita.',
  },
  {
    step: 3,
    title: 'Split Temporal',
    description:
      'Divisão cronológica 80/20 sem shuffle, respeitando a estrutura da série temporal e evitando data leakage.',
  },
  {
    step: 4,
    title: 'Modelagem',
    description:
      'Três modelos comparados: Gradient Boosting (300 estimadores), SARIMA(1,1,1)(1,1,1)[12] e Regressão Linear (baseline).',
  },
  {
    step: 5,
    title: 'Avaliação',
    description:
      'Métricas MAE, RMSE e R² calculadas no conjunto de teste. Gradient Boosting com desempenho significativamente superior.',
  },
  {
    step: 6,
    title: 'Previsão 2025',
    description:
      'Forecast recursivo de 12 meses com Gradient Boosting, atualizando features de lag a cada passo.',
  },
];
