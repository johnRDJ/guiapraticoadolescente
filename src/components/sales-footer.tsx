const links = ["Termos de Uso", "Política de Privacidade", "Suporte"];

export function SalesFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-name">Annie Vasconcelos</p>
        <nav className="footer-nav" aria-label="Informações legais e suporte">
          {links.map((label, i) => (
            <span className="footer-nav__item" key={label}>
              {i > 0 && <span className="footer-nav__dot" aria-hidden="true">•</span>}
              <span className="footer-nav__link">{label}</span>
            </span>
          ))}
        </nav>
        <hr className="footer-divider" />
        <p className="ethical-note">
          <strong>Aviso Legal &amp; Ético:</strong> Este é um material educacional
          destinado a psicólogos, terapeutas, profissionais e estudantes de
          Psicologia. Não substitui formação, supervisão clínica ou avaliação
          individualizada. O material não oferece diagnóstico, tratamento ou
          garantia de resultados clínicos.
        </p>
      </div>
    </footer>
  );
}
