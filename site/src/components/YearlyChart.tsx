import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { Section, Card } from './ui/Section';
import { yearlyData } from '../data/deforestation';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-amazon-700 bg-amazon-900/95 px-4 py-3 shadow-xl backdrop-blur">
      <p className="text-xs font-medium text-amazon-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-white">
        {payload[0].value.toLocaleString('pt-BR')} km²
      </p>
    </div>
  );
};

function getBarColor(area: number) {
  if (area > 50000) return '#e8544a';
  if (area > 30000) return '#f5a623';
  return '#3ddc6e';
}

export function YearlyChart() {
  return (
    <Section
      id="yearly"
      title="Área Alertada por Ano"
      subtitle="Evolução anual"
    >
      <Card>
        <p className="mb-2 text-sm text-amazon-400">
          km² totais por ano hidrológico — DETER-AMZ — 2015/16 a 2024/25
        </p>
        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
              <XAxis
                dataKey="year"
                tick={{ fill: '#6a8a6a', fontSize: 11 }}
                axisLine={{ stroke: '#1e2e1e' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#6a8a6a', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(61,220,110,0.06)' }} />
              <Bar dataKey="area" radius={[6, 6, 0, 0]} maxBarSize={52}>
                {yearlyData.map((entry, index) => (
                  <Cell key={index} fill={getBarColor(entry.area)} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center gap-6 text-xs text-amazon-400">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-forest" /> {'< 30.000 km²'}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber" /> 30.000–50.000 km²
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-danger" /> {'> 50.000 km²'}
          </span>
        </div>
      </Card>
    </Section>
  );
}
