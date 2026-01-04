interface FooterProps {
  theme?: 'light' | 'dark';
}

export default function Footer({ theme = 'light' }: FooterProps) {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '' : 'bg-slate-50';
  const borderColor = isDark ? 'border-white/10' : 'border-slate-200';
  const textColor = isDark ? 'text-slate-400' : 'text-slate-600';
  const textSecondary = isDark ? 'text-slate-500' : 'text-slate-500';
  const hoverColor = isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600';

  return (
    <footer className={`border-t ${borderColor} ${bgColor} py-4 bottom-0 fixed w-full`}>
      <div className="flex flex-col items-center text-sm">
        <div className="flex items-center gap-4 text-sm">
          <a
            href="/termos/"
            target="_blank"
            rel="no-opener no-referer"
            className={`${textColor} ${hoverColor} transition-colors`}>
            Termos de uso
          </a>
          <div className="hidden sm:block w-px h-4 bg-white/10" />
          <a
            href="/politica-privacidade/"
            target="_blank"
            rel="no-opener no-referer"
            className={`${textColor} ${hoverColor} transition-colors`}>
            Política de Privacidade
          </a>
          <div className="hidden sm:block w-px h-4 bg-white/10" />
          <a
            href="/regulamento"
            target="_blank"
            rel="no-opener no-referer"
            className={`${textColor} ${hoverColor} transition-colors`}>
            Regulamento
          </a>
        </div>
        <p className={`text-center text-xs ${textSecondary} mt-4`}>AG7 DIGITAL BUSINESS - CNPJ: 50.446.882/0001-91</p>
      </div>
    </footer>
  );
}
