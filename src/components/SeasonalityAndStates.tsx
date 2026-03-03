import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  BarChart, Bar, Cell,
} from 'recharts';
import { Section, Card } from './ui/Section';
import { monthlyAvg, stateData } from '../data/deforestation';

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

export function SeasonalityAndStates() {
  const maxArea = Math.max(...stateData.map((d) => d.area));

  return (
    <Section
      id="seasonality"
      title="Padrões do Desmatamento"
      subtitle="Sazonalidade & distribuição"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Seasonality Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-white">Sazonalidade Mensal</h3>
          <p className="mb-4 mt-1 text-xs text-amazon-400">
            Média de km² alertados por mês — destaque para o período seco (Ago–Out)
          </p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAvg} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="gradSeason" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3ddc6e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3ddc6e" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3ddc6e"
                  strokeWidth={2.5}
                  fill="url(#gradSeason)"
                  dot={{ r: 4, fill: '#3ddc6e', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#3ddc6e' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 rounded-lg border border-amazon-700 bg-amazon-900/50 px-4 py-3">
            <p className="text-xs text-amazon-300">
              <span className="font-semibold text-danger">Ago, Set e Out</span> concentram os picos
              de desmatamento — período seco na Amazônia que facilita atividades de queimada e corte.
            </p>
          </div>
        </Card>

        {/* States Chart */}
        <Card delay={0.1}>
          <h3 className="text-lg font-semibold text-white">Por Estado — 2024/2025</h3>
          <p className="mb-4 mt-1 text-xs text-amazon-400">
            Área alertada (km²) no ano hidrológico mais recente
          </p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stateData}
                layout="vertical"
                margin={{ top: 4, right: 12, bottom: 0, left: 4 }}
              >
                <XAxis
                  type="number"
                  tick={{ fill: '#6a8a6a', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="uf"
                  tick={{ fill: '#d4e8d4', fontSize: 12, fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-lg border border-amazon-700 bg-amazon-900/95 px-4 py-3 shadow-xl backdrop-blur">
                        <p className="text-xs font-medium text-amazon-400">{d.name}</p>
                        <p className="mt-1 text-lg font-bold text-white">
                          {d.area.toLocaleString('pt-BR')} km²
                        </p>
                      </div>
                    );
                  }}
                  cursor={{ fill: 'rgba(61,220,110,0.06)' }}
                />
                <Bar dataKey="area" radius={[0, 6, 6, 0]} maxBarSize={28}>
                  {stateData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.area === maxArea ? '#e8544a' : '#3ddc6e'}
                      fillOpacity={0.8 - index * 0.06}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 rounded-lg border border-amazon-700 bg-amazon-900/50 px-4 py-3">
            <p className="text-xs text-amazon-300">
              <span className="font-semibold text-danger">Pará</span> lidera com mais de 17.800 km²
              alertados, seguido por Mato Grosso e Amazonas.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
