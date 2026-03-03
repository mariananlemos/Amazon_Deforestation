import { motion } from 'framer-motion';
import { TreePine, Github, ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Animated background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(61,220,110,0.08)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-amazon-900 to-transparent" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-forest/30"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-amazon-700 bg-amazon-800/80"
        >
          <TreePine className="h-8 w-8 text-forest" />
        </motion.div>

        <p className="mb-4 text-xs font-semibold tracking-[0.3em] uppercase text-forest">
          DETER / INPE — Amazônia Legal
        </p>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl">
          Predição de{' '}
          <span className="bg-gradient-to-r from-forest to-teal bg-clip-text text-transparent">
            Desmatamento
          </span>{' '}
          na Amazônia
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-amazon-300 leading-relaxed">
          Análise preditiva de alertas de desmatamento usando Machine Learning
          e séries temporais sobre dados do DETER-AMZ (2015–2025).
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-semibold text-amazon-900 
                       transition-all hover:bg-forest/90 hover:shadow-[0_0_24px_rgba(61,220,110,0.3)]"
          >
            Explorar Dashboard
          </a>
          <a
            href="https://github.com/mariananlemos/Amazon_Deforestation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-amazon-600 px-8 py-3.5 text-sm font-semibold text-amazon-100 
                       transition-all hover:border-amazon-400 hover:bg-amazon-800/50"
          >
            <Github className="h-4 w-4" />
            Ver no GitHub
          </a>
        </div>

        {/* Stat pills */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: '10 anos de dados', color: 'text-forest' },
            { label: '3 modelos comparados', color: 'text-teal' },
            { label: 'R² = 0.731', color: 'text-amber' },
          ].map((pill) => (
            <span
              key={pill.label}
              className={`rounded-full border border-amazon-700 bg-amazon-800/50 px-4 py-1.5 text-xs font-medium ${pill.color}`}
            >
              {pill.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-5 w-5 text-amazon-500" />
      </motion.div>
    </header>
  );
}
