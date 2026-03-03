import { TreePine, Github, ExternalLink } from 'lucide-react';

const navLinks = [
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#yearly', label: 'Evolução' },
  { href: '#seasonality', label: 'Sazonalidade' },
  { href: '#models', label: 'Modelos' },
  { href: '#forecast', label: 'Previsão' },
  { href: '#methodology', label: 'Metodologia' },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-amazon-700/50 bg-amazon-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center gap-2.5 text-sm font-bold text-white">
          <TreePine className="h-5 w-5 text-forest" />
          DETER Amazônia
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-amazon-300 transition-colors hover:bg-amazon-800 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="https://github.com/mariananlemos/Amazon_Deforestation"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-amazon-700 px-3 py-1.5 text-xs font-medium text-amazon-300 transition-colors hover:border-amazon-500 hover:text-white"
        >
          <Github className="h-3.5 w-3.5" />
          GitHub
        </a>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-amazon-700 bg-amazon-900">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <TreePine className="h-5 w-5 text-forest" />
              DETER Amazônia
            </div>
            <p className="mt-3 text-sm leading-relaxed text-amazon-400">
              Análise preditiva de desmatamento na Amazônia usando dados oficiais
              do INPE e técnicas de Machine Learning.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider uppercase text-amazon-500">
              Fontes de Dados
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'DETER-AMZ / INPE', url: 'http://terrabrasilis.dpi.inpe.br/downloads/' },
                {
                  label: 'TerraBrasilis Dashboard',
                  url: 'http://terrabrasilis.dpi.inpe.br/app/dashboard/alerts/legal/amazon/aggregated/',
                },
                { label: 'IPCC Climate Data', url: 'https://www.ipcc.ch/data/' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-amazon-300 transition-colors hover:text-forest"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider uppercase text-amazon-500">
              Tecnologias
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Scikit-learn', 'Statsmodels', 'Pandas', 'React', 'Recharts', 'Tailwind CSS'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-amazon-700 bg-amazon-800/50 px-2.5 py-1 text-[11px] text-amazon-300"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-amazon-700 pt-8 md:flex-row">
          <p className="text-xs text-amazon-500">
            Dados atualizados em 03/03/2026 — DETER-AMZ / INPE
          </p>
          <p className="text-xs text-amazon-500">
            Feito por{' '}
            <a
              href="https://github.com/mariananlemos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest hover:underline"
            >
              Mariana Lemos
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
