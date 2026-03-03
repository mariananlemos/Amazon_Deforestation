import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { Section, Card } from './ui/Section';
import { forecast2025, KPI } from '../data/deforestation';

const ForecastTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-amazon-700 bg-amazon-900/95 px-4 py-3 shadow-xl backdrop-blur">
      <p className="text-xs font-medium text-amazon-400">{label} / 2025</p>
      <p className="mt-1 text-lg font-bold text-amber">
        {payload[0].value.toLocaleString('pt-BR')} km²
      </p>
    </div>
  );
};

export function ForecastChart() {
  const maxArea = Math.max(...forecast2025.map((d) => d.area));

  return (
    <Section
      id="forecast"
      title="Previsão para 2025"
      subtitle="Forecast recursivo"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-white">
            Projeção Mensal — Gradient Boosting
          </h3>
          <p className="mb-4 mt-1 text-xs text-amazon-400">
            Forecast recursivo de 12 meses com atualização de features de lag
          </p>
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecast2025} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#6a8a6a', fontSize: 11 }}
                  axisLine={{ stroke: '#1e2e1e' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6a8a6a', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                />
                <Tooltip content={<ForecastTooltip />} cursor={{ fill: 'rgba(245,166,35,0.06)' }} />
                <Bar dataKey="area" radius={[6, 6, 0, 0]} maxBarSize={44}>
                  {forecast2025.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.area === maxArea ? '#e8544a' : '#f5a623'}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card delay={0.15}>
          <h3 className="text-lg font-semibold text-white">Resumo do Forecast</h3>
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-[10px] font-medium tracking-wider uppercase text-amazon-500">
                Total Previsto
              </p>
              <p className="mt-1 text-4xl font-bold text-amber">
                {KPI.forecast2025Total.toLocaleString('pt-BR')}
              </p>
              <p className="text-xs text-amazon-500">km² estimados para 2025</p>
            </div>

            <div className="h-px bg-amazon-700" />

            <div>
              <p className="text-[10px] font-medium tracking-wider uppercase text-amazon-500">
                Modelo
              </p>
              <p className="mt-1 text-sm text-amazon-200">
                Gradient Boosting com 300 estimadores, max depth 4, learning rate 0.05
              </p>
            </div>

            <div className="h-px bg-amazon-700" />

            <div>
              <p className="text-[10px] font-medium tracking-wider uppercase text-amazon-500">
                Estratégia
              </p>
              <p className="mt-1 text-sm text-amazon-200">
                Forecast recursivo: cada previsão atualiza os lags (t-1) e médias móveis para o
                passo seguinte, capturando a dinâmica temporal.
              </p>
            </div>

            <div className="h-px bg-amazon-700" />

            <div>
              <p className="text-[10px] font-medium tracking-wider uppercase text-amazon-500">
                Meses Críticos
              </p>
              <div className="mt-2 flex gap-2">
                {KPI.peakMonths.map((m) => (
                  <span
                    key={m}
                    className="rounded-md bg-danger/15 px-3 py-1 text-xs font-semibold text-danger"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
