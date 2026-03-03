import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  BarChart, Bar, Cell,
} from 'recharts';
import { Section, Card } from './ui/Section';
import { predVsActual, modelComparison, featureImportance } from '../data/deforestation';

const PredTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-amazon-700 bg-amazon-900/95 px-4 py-3 shadow-xl backdrop-blur">
      <p className="mb-1 text-xs text-amazon-400">Mês {label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-sm" style={{ color: p.color }}>
          <span className="font-semibold">{p.name}:</span>{' '}
          {p.value.toLocaleString('pt-BR')} km²
        </p>
      ))}
    </div>
  );
};

export function ModelResults() {
  return (
    <Section
      id="models"
      title="Comparação de Modelos"
      subtitle="Machine Learning & Séries temporais"
    >
      {/* Model comparison cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {modelComparison.map((model, i) => (
          <Card key={model.name} delay={i * 0.1} className="relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{ backgroundColor: model.color }}
            />
            <h4 className="text-sm font-semibold text-white">{model.name}</h4>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] font-medium tracking-wider uppercase text-amazon-500">MAE</p>
                <p className="mt-1 text-xl font-bold text-white">
                  {model.mae.toLocaleString('pt-BR')}
                </p>
                <p className="text-[10px] text-amazon-500">km²</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-wider uppercase text-amazon-500">RMSE</p>
                <p className="mt-1 text-xl font-bold text-white">
                  {model.rmse.toLocaleString('pt-BR')}
                </p>
                <p className="text-[10px] text-amazon-500">km²</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-wider uppercase text-amazon-500">R²</p>
                <p className="mt-1 text-xl font-bold" style={{ color: model.color }}>
                  {model.r2.toFixed(4)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Pred vs Actual chart */}
        <Card className="lg:col-span-3">
          <h3 className="text-lg font-semibold text-white">Previsão vs Real</h3>
          <p className="mb-4 mt-1 text-xs text-amazon-400">
            Conjunto de teste — últimos 20 meses da série
          </p>
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predVsActual} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="idx"
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
                <Tooltip content={<PredTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 11, color: '#6a8a6a' }}
                  iconType="line"
                />
                <Line
                  type="monotone"
                  dataKey="real"
                  name="Real"
                  stroke="#3ddc6e"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#3ddc6e' }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="gb"
                  name="Gradient Boosting"
                  stroke="#e8544a"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={{ r: 3, fill: '#e8544a' }}
                />
                <Line
                  type="monotone"
                  dataKey="sarima"
                  name="SARIMA"
                  stroke="#4ecdc4"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={{ r: 3, fill: '#4ecdc4' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Feature Importance */}
        <Card className="lg:col-span-2" delay={0.15}>
          <h3 className="text-lg font-semibold text-white">Importância das Features</h3>
          <p className="mb-4 mt-1 text-xs text-amazon-400">
            Gradient Boosting — contribuição relativa de cada variável
          </p>
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[...featureImportance].reverse()}
                layout="vertical"
                margin={{ top: 4, right: 12, bottom: 0, left: 4 }}
              >
                <XAxis
                  type="number"
                  tick={{ fill: '#6a8a6a', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ fill: '#d4e8d4', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-lg border border-amazon-700 bg-amazon-900/95 px-4 py-3 shadow-xl backdrop-blur">
                        <p className="text-xs text-amazon-400">{d.label}</p>
                        <p className="mt-1 text-lg font-bold text-white">
                          {(d.importance * 100).toFixed(1)}%
                        </p>
                      </div>
                    );
                  }}
                  cursor={{ fill: 'rgba(61,220,110,0.06)' }}
                />
                <Bar dataKey="importance" radius={[0, 6, 6, 0]} maxBarSize={22}>
                  {[...featureImportance].reverse().map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.feature.includes('lag')
                          ? '#e8544a'
                          : entry.feature.includes('roll')
                          ? '#f5a623'
                          : '#4ecdc4'
                      }
                      fillOpacity={0.8}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-amazon-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-danger" /> Lags
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber" /> Médias móveis
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-teal" /> Outros
            </span>
          </div>
        </Card>
      </div>
    </Section>
  );
}
