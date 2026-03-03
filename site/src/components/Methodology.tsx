import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { methodologySteps } from '../data/deforestation';

const stepIcons = ['📥', '⚙️', '✂️', '🤖', '📊', '🔮'];

export function Methodology() {
  return (
    <Section
      id="methodology"
      title="Metodologia"
      subtitle="Pipeline de análise"
    >
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-0 bottom-0 left-6 hidden w-px bg-gradient-to-b from-forest/50 via-amazon-700 to-transparent md:left-[calc(50%-0.5px)] md:block" />

        <div className="space-y-8 md:space-y-12">
          {methodologySteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex items-start gap-6 md:gap-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Card */}
              <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="rounded-2xl border border-amazon-700 bg-amazon-800/60 p-6 backdrop-blur-sm transition-colors hover:border-amazon-600">
                  <div className={`flex items-center gap-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className="text-xl">{stepIcons[i]}</span>
                    <div>
                      <p className="text-[10px] font-semibold tracking-wider uppercase text-forest">
                        Etapa {step.step}
                      </p>
                      <h3 className="text-base font-semibold text-white">{step.title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-amazon-300">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Center dot */}
              <div className="relative z-10 hidden flex-shrink-0 md:block">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-forest bg-amazon-900">
                  <span className="text-xs font-bold text-forest">{step.step}</span>
                </div>
              </div>

              {/* Spacer */}
              <div className="hidden flex-1 md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
