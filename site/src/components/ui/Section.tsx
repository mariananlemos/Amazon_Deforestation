import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Section({ id, children, className = '', title, subtitle }: SectionProps) {
  return (
    <section id={id} className={`py-20 px-6 md:px-12 lg:px-20 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            {subtitle && (
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-forest">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {title}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl border border-amazon-700 bg-amazon-800/60 backdrop-blur-sm p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
