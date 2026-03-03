import { motion } from 'framer-motion';
import { Section, Card } from './ui/Section';

const improvements = [
  {
    before: 'Shuffle no split',
    after: 'Split cronológico 80/20',
    desc: 'Respeita a estrutura temporal e evita data leakage',
  },
  {
    before: 'Regressão linear simples',
    after: 'Gradient Boosting + SARIMA',
    desc: 'Modelos robustos que capturam não-linearidade e sazonalidade',
  },
  {
    before: 'Sem features temporais',
    after: 'Lags, médias móveis, mês',
    desc: 'Feature engineering com autocorrelação de curto e longo prazo',
  },
  {
    before: 'R² ≈ 0.0001',
    after: 'R² = 0.731',
    desc: 'Melhoria de mais de 7000x no coeficiente de determinação',
  },
  {
    before: 'Visualização básica',
    after: 'Dashboard interativo + PNG',
    desc: 'Múltiplos tipos de gráfico com análise detalhada',
  },
  {
    before: 'Sem forecast futuro',
    after: 'Previsão recursiva 12 meses',
    desc: 'Projeção para 2025 com atualização dinâmica de features',
  },
];

export function Improvements() {
  return (
    <Section
      id="improvements"
      title="Melhorias Aplicadas"
      subtitle="Antes vs Depois"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {improvements.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Card className="group h-full transition-colors hover:border-forest/30">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-danger/10 px-2.5 py-1">
                  <span className="text-[10px] font-bold uppercase text-danger">Antes</span>
                </div>
                <p className="text-sm text-amazon-400 line-through decoration-amazon-600">
                  {item.before}
                </p>
              </div>
              <div className="mt-3 flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-forest/10 px-2.5 py-1">
                  <span className="text-[10px] font-bold uppercase text-forest">Depois</span>
                </div>
                <p className="text-sm font-semibold text-white">{item.after}</p>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-amazon-400">{item.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
