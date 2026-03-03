import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3 } from 'lucide-react';
import { KPI } from '../data/deforestation';

const kpis = [
  {
    label: 'Área Alertada 2024/2025',
    value: `${KPI.totalAlerted2024.toLocaleString('pt-BR')}`,
    unit: 'km²',
    sublabel: 'Pior da série histórica',
    delta: `+${KPI.changeVsPrevious}% vs ano anterior`,
    deltaUp: true,
    icon: AlertTriangle,
    accent: 'text-danger',
    accentBg: 'bg-danger/10',
    borderAccent: 'border-danger/30',
  },
  {
    label: 'Previsão 2025 (modelo)',
    value: `${KPI.forecast2025Total.toLocaleString('pt-BR')}`,
    unit: 'km²',
    sublabel: 'Gradient Boosting forecast',
    delta: 'Regressão à média',
    deltaUp: false,
    icon: TrendingDown,
    accent: 'text-amber',
    accentBg: 'bg-amber/10',
    borderAccent: 'border-amber/30',
  },
  {
    label: 'Total 2015–2025',
    value: `${KPI.totalPeriod.toLocaleString('pt-BR')}`,
    unit: 'km²',
    sublabel: 'Alertas no período completo',
    delta: '10 anos hidrológicos',
    deltaUp: false,
    icon: BarChart3,
    accent: 'text-amazon-200',
    accentBg: 'bg-amazon-200/10',
    borderAccent: 'border-amazon-400/30',
  },
  {
    label: 'R² Gradient Boosting',
    value: KPI.r2GradientBoosting.toFixed(3),
    unit: '',
    sublabel: 'vs 0.0001 modelo original',
    delta: 'Melhoria significativa',
    deltaUp: false,
    icon: TrendingUp,
    accent: 'text-forest',
    accentBg: 'bg-forest/10',
    borderAccent: 'border-forest/30',
  },
];

export function KpiBar() {
  return (
    <div id="dashboard" className="border-y border-amazon-700 bg-amazon-800/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-amazon-700 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative px-8 py-8 transition-colors hover:bg-amazon-800/60"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${kpi.accentBg}`}>
                  <Icon className={`h-4 w-4 ${kpi.accent}`} />
                </div>
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-amazon-400">
                  {kpi.label}
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold tracking-tight text-white`}>
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className="text-sm text-amazon-400">{kpi.unit}</span>
                )}
              </div>

              <p className="mt-2 text-xs text-amazon-500">{kpi.sublabel}</p>

              <span
                className={`mt-3 inline-block rounded-md px-2.5 py-1 text-[10px] font-medium ${
                  kpi.deltaUp
                    ? 'bg-danger/10 text-danger'
                    : 'bg-forest/10 text-forest'
                }`}
              >
                {kpi.deltaUp ? '▲' : '▼'} {kpi.delta}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
