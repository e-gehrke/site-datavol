/* DATA.VOL Public landing page */

const PublicHeader = ({ openLogin }) => (
  <header className="pub-header">
    <div className="wrap-wide">
      <div className="header-inner">
        <window.Lockup size={32} fontSize={26} dot="lime" />
        <nav>
          <ul className="pub-nav">
            <li><a href="#produto">Produto</a></li>
            <li><a href="#cobertura">Cobertura</a></li>
            <li><a href="#para-quem">Para quem</a></li>
            <li><a href="#assinatura">Assinatura</a></li>
          </ul>
        </nav>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="#/dashboard" className="btn btn-quiet btn-sm" style={{ color: 'var(--cinza)', borderColor: 'var(--rule-dark-strong)' }}>Acesso demo →</a>
          <button onClick={openLogin} className="btn btn-lime btn-sm">Entrar</button>
        </div>
      </div>
    </div>
  </header>
);

/* ─── Compact forward curve preview chart for hero ─── */
const HeroChart = () => {
  const W = 640, H = 280;
  const PAD = { l: 60, r: 24, t: 28, b: 38 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const data = window.FORWARD_DATA;
  const xMax = 36;
  const yMin = 5.10, yMax = 6.30;
  const xs = (m) => PAD.l + (m / xMax) * innerW;
  const ys = (v) => PAD.t + innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  const refPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs(d.m).toFixed(1)} ${ys(d.ref).toFixed(1)}`).join(' ');
  const bankPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs(d.m).toFixed(1)} ${ys(d.bank).toFixed(1)}`).join(' ');

  const yTicks = [5.2, 5.5, 5.8, 6.1];
  const xTicks = [0, 6, 12, 24, 36];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      {/* gridlines */}
      {yTicks.map(t => (
        <line key={'y'+t} x1={PAD.l} y1={ys(t)} x2={W - PAD.r} y2={ys(t)} stroke="rgba(166,166,166,.12)" strokeDasharray="2 4" />
      ))}
      {xTicks.map(t => (
        <line key={'x'+t} x1={xs(t)} y1={PAD.t} x2={xs(t)} y2={H - PAD.b} stroke="rgba(166,166,166,.08)" />
      ))}
      {/* axes */}
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="rgba(166,166,166,.4)" />
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="rgba(166,166,166,.4)" />
      {/* y labels */}
      {yTicks.map(t => (
        <text key={'yl'+t} x={PAD.l - 10} y={ys(t)+3} textAnchor="end" fill="#A6A6A6" fontFamily="IBM Plex Mono" fontSize="10">{t.toFixed(2)}</text>
      ))}
      {/* x labels */}
      {xTicks.map(t => (
        <text key={'xl'+t} x={xs(t)} y={H - PAD.b + 16} textAnchor="middle" fill="#A6A6A6" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="1">
          {t === 0 ? 'SPOT' : t + 'M'}
        </text>
      ))}
      {/* bank curve (dashed) */}
      <path d={bankPath} fill="none" stroke="#A6A6A6" strokeWidth="1.4" strokeDasharray="4 3" />
      {/* ref curve (lime) */}
      <path d={refPath} fill="none" stroke="#C6FF4D" strokeWidth="2" />
      {/* ref points */}
      {data.map(d => (
        <circle key={d.vert} cx={xs(d.m)} cy={ys(d.ref)} r="3" fill="#C6FF4D" />
      ))}
      {/* spread annotation at 12M */}
      <g>
        <line x1={xs(12)} y1={ys(5.518)} x2={xs(12)} y2={ys(5.560)} stroke="#ff6b6b" strokeWidth="1" />
        <rect x={xs(12) + 8} y={ys(5.54) - 8} width="58" height="16" fill="#080A0B" stroke="rgba(166,166,166,.3)" />
        <text x={xs(12) + 12} y={ys(5.54)+3} fill="#ff6b6b" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="1">SPREAD 76bps</text>
      </g>
      {/* labels */}
      <text x={PAD.l} y={20} fill="#F2EDE0" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="2">USD/BRL · FORWARD CURVE · 25 MAI 2026</text>
    </svg>
  );
};

const PublicLanding = ({ openLogin }) => {
  const ticker = window.useTicker();
  const tickerItems = [...ticker, ...ticker]; // duplicate for infinite ticker

  return (
    <div style={{ background: 'var(--black)', color: 'var(--off)', minHeight: '100vh' }}>
      {/* Pre-hero ticker sample of what members see */}
      <div className="ticker-bar" style={{ borderTop: 'none', position: 'relative' }}>
        <div className="ticker-track">
          {tickerItems.map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="symbol-label">{t.sym}</span>
              <span className="value">{t.v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}{t.suffix || ''}</span>
              {t.d !== 0 && (
                <span className={'delta ' + (t.d > 0 ? 'up' : 'down')}>
                  {t.d > 0 ? '+' : ''}{t.d.toFixed(2)}%
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: '70px 0 60px', borderBottom: '1px solid var(--rule-dark)' }}>
        <div className="wrap-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)', gap: 56, alignItems: 'center' }} className="hero-grid">
            <div>
              <p className="label" style={{ color: 'var(--lime)', marginBottom: 22 }}>Infraestrutura de cálculo · Tesouraria corporativa</p>
              <h1 className="display-lg" style={{ color: 'var(--off)', maxWidth: '14ch', textTransform: 'uppercase' }}>
                O banco oferece o preço.<br/>
                <span style={{ color: 'var(--lime)' }}>DATA.VOL</span> mostra o cálculo.
              </h1>
              <p className="lead" style={{ color: 'var(--cinza)', marginTop: 24, maxWidth: '48ch' }}>
                Curvas calculadas, preços legíveis e decisões menos assimétricas para empresas que lidam com câmbio, NDF, swaps e exposição em dólar sem depender da precificação unilateral do banco.
              </p>
              <p style={{
                fontFamily: 'var(--display)', fontSize: 'clamp(20px, 2vw, 28px)',
                lineHeight: 1.05, letterSpacing: '.5px',
                color: 'var(--lime)', marginTop: 22, maxWidth: '36ch',
                paddingTop: 22, borderTop: '1px solid rgba(198, 255, 77, .25)',
              }}>
                O usuário entende o preço e decide com mais critério.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
                <button onClick={openLogin} className="btn btn-lime">Entrar →</button>
                <a href="#/dashboard" className="btn btn-ghost on-dark">Ver demo</a>
                <a href="#assinatura" className="btn btn-quiet" style={{ color: 'var(--cinza)' }}>Solicitar acesso</a>
              </div>
            </div>

            {/* Live tool preview */}
            <div className="panel" style={{ padding: 0, background: 'var(--black-2)', border: '1px solid var(--rule-dark-strong)' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 16px',
                borderBottom: '1px solid var(--rule-dark)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--lime)' }}></span>
                  <span className="label-sm" style={{ color: 'var(--off)' }}>Curva dólar forward · ao vivo</span>
                </div>
                <span className="label-sm" style={{ color: 'var(--cinza)' }}>USD/BRL · ref 25 mai 2026</span>
              </div>
              <div style={{ padding: 8 }}>
                <HeroChart />
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                borderTop: '1px solid var(--rule-dark)',
              }}>
                {[
                  { l: 'Spot', v: '5,182', d: '+0,34%', up: true },
                  { l: 'DV ref 12M', v: '5,518', d: 'carrego 6,49% a.a.', up: false, dim: true },
                  { l: 'Banco 12M', v: '5,560', d: '+76 bps', up: false },
                ].map((kpi, i) => (
                  <div key={i} style={{
                    padding: '14px 16px',
                    borderRight: i < 2 ? '1px solid var(--rule-dark)' : 'none',
                  }}>
                    <p className="label-sm" style={{ color: 'var(--cinza-3)', marginBottom: 6 }}>{kpi.l}</p>
                    <p className="mono" style={{ fontSize: 22, lineHeight: 1, color: 'var(--off)', marginBottom: 4 }}>{kpi.v}</p>
                    <p className="mono" style={{ fontSize: 10, letterSpacing: 1, color: kpi.dim ? 'var(--cinza)' : kpi.up ? 'var(--up)' : 'var(--down)' }}>
                      {kpi.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 980px) { .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; } }`}</style>
      </section>

      {/* MANIFESTO PUNCH */}
      <section style={{ padding: '80px 0', background: 'var(--off)', color: 'var(--grafite)' }} id="produto">
        <div className="wrap-wide">
          <div className="seclabel">Proposta</div>
          <h2 className="display-lg" style={{ maxWidth: '18ch' }}>
            Pequenas empresas não precisam aceitar preços financeiros como <span style={{ background: 'var(--lime)', padding: '0 6px' }}>caixas-pretas.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, marginTop: 48 }}>
            <p className="lead" style={{ color: 'var(--cinza-3)' }}>
              Existem empresas que lidam com dólar, fluxo internacional e risco cambial relevante, mas não possuem tesouraria estruturada, orçamento para terminais Bloomberg, nem equipe capaz de construir modelos confiáveis em Excel.
            </p>
            <p className="lead" style={{ color: 'var(--cinza-3)' }}>
              Essas empresas acabam aceitando preços de dealers sem conseguir decompor curva, spread, premissa ou custo implícito. <strong style={{ color: 'var(--grafite)' }}>DATA.VOL existe para reduzir essa assimetria.</strong>
            </p>
            <p className="lead" style={{ color: 'var(--cinza-3)' }}>
              A complexidade fica no motor. A clareza fica na interface.
            </p>
          </div>

          {/* Manifesto punchline */}
          <div style={{
            marginTop: 60,
            paddingTop: 36,
            borderTop: '1px solid rgba(0,0,0,.12)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            gap: 32, flexWrap: 'wrap',
          }}>
            <p style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(28px, 3.6vw, 48px)',
              lineHeight: 1.04, letterSpacing: '.5px',
              maxWidth: '22ch',
            }}>
              O usuário entende o preço e <span style={{ background: 'var(--lime)', padding: '0 6px' }}>decide com mais critério.</span>
            </p>
            <p className="label" style={{ color: 'var(--cinza-3)' }}>Essência DATA.VOL</p>
          </div>
        </div>
      </section>

      {/* COBERTURA */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--rule-dark)' }} id="cobertura">
        <div className="wrap-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
            <div>
              <div className="seclabel lime">Cobertura</div>
              <h2 className="display-md" style={{ color: 'var(--off)', maxWidth: '20ch' }}>
                Uma assinatura.<br/>Todos os instrumentos.
              </h2>
            </div>
            <p className="lead-sm" style={{ color: 'var(--cinza)', maxWidth: '40ch' }}>
              Sem trilhas BASIC/PRO. Sem aulas. Sem conteúdo. Ferramenta operacional, atualizada com dados de mercado.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { tit: 'Curva dólar forward', sub: 'USD/BRL · vértices até 36M', s: 'live', d: 'Curva calculada a partir de DI futuro × taxa internacional. Comparativo direto com cotação bancária.' },
              { tit: 'Curvas de juros',     sub: 'DI · Pré · Cupom',           s: 'beta', d: 'Vertices DI futuro, estrutura a termo e leitura do mercado de taxa.' },
              { tit: 'Comparador',          sub: 'Banco × referência',         s: 'beta', d: 'Cole a cotação que o banco enviou. Veja o spread, custo embutido e referência calculada.' },
              { tit: 'NDF',                 sub: 'Non-deliverable forward',    s: 'soon', d: 'Precificação de NDF e leitura de prêmio implícito.' },
              { tit: 'Swaps',               sub: 'DI × Pré · USD × CDI',       s: 'soon', d: 'Estrutura de swap com leg fixa e flutuante. Avaliação a mercado.' },
              { tit: 'Biblioteca técnica',  sub: 'Glossário curto',            s: 'live', d: 'Definições objetivas e fórmulas mínimas. Sem aula longa.' },
            ].map((c, i) => (
              <div key={i} className="panel" style={{ padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <p className="display-sm" style={{ color: 'var(--off)' }}>{c.tit}</p>
                    <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 4 }}>{c.sub}</p>
                  </div>
                  <span className={'pill ' + c.s}>{c.s === 'live' ? 'Ao vivo' : c.s === 'beta' ? 'Beta' : 'Em breve'}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--cinza)', lineHeight: 1.6 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section style={{ padding: '80px 0', background: 'var(--off)', color: 'var(--grafite)' }} id="para-quem">
        <div className="wrap-wide">
          <div className="seclabel">Usuário-alvo</div>
          <h2 className="display-md" style={{ maxWidth: '22ch' }}>
            Tesouraria sem o custo<br/>de uma tesouraria.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56, marginTop: 48 }} className="alvo-grid">
            {/* Para quem */}
            <div>
              <p className="label" style={{ color: 'var(--azul)', marginBottom: 18 }}>É para você se</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Dono ou gestor de empresa de comércio exterior (importação ou exportação)',
                  'CFO ou financeiro de empresa pequena/média com exposição em dólar',
                  'Escritório de investimento que atende empresas e precisa validar preço bancário',
                  'Assessor que precisa entender estrutura de preço antes de conversar com cliente ou banco',
                  'Profissional de backoffice que opera câmbio, NDF, swap ou hedge cambial',
                ].map((line, i) => (
                  <li key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 14, alignItems: 'baseline', fontSize: 15, lineHeight: 1.55 }}>
                    <span className="mono" style={{ color: 'var(--azul)', fontSize: 11 }}>{String(i+1).padStart(2,'0')}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* O que não é */}
            <div style={{
              background: 'var(--grafite)',
              color: 'var(--off)',
              padding: 32,
              borderRadius: 4,
              backgroundImage:
                'linear-gradient(rgba(166,166,166,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(166,166,166,.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}>
              <p className="label" style={{ color: 'var(--lime)', marginBottom: 18 }}>DATA.VOL não é</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--mono)', fontSize: 13 }}>
                {[
                  'Plataforma de day trade',
                  'Home broker',
                  'Sala de calls ou canal de recomendação',
                  'Consultoria individual de investimento',
                  'Curso de educação financeira',
                  'Promessa de retorno',
                ].map((line, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--cinza)' }}>
                    <span style={{
                      width: 10, height: 1.5, background: 'var(--cinza)', flexShrink: 0,
                    }}></span>
                    {line}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 12, color: 'var(--cinza-2)', marginTop: 22, lineHeight: 1.6, fontFamily: 'var(--mono)' }}>
                Ferramenta de cálculo, organização de dados e leitura de preço. Não substitui análise regulada, gestão profissional ou política formal de hedge.
              </p>
            </div>
          </div>
          <style>{`@media (max-width: 880px) { .alvo-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
        </div>
      </section>

      {/* ASSINATURA */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--rule-dark)' }} id="assinatura">
        <div className="wrap-wide">
          <div className="seclabel lime">Assinatura</div>
          <h2 className="display-md" style={{ color: 'var(--off)', maxWidth: '22ch' }}>
            Um plano.<br/>Recorrência por utilidade.
          </h2>
          <p className="lead-sm" style={{ color: 'var(--cinza)', marginTop: 16, maxWidth: '52ch' }}>
            Sem freemium, sem trial obscuro, sem upgrades disfarçados. O valor da ferramenta vem do uso recorrente e da atualização contínua dos dados.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginTop: 36 }} className="plan-grid">
            {/* Main plan */}
            <div className="panel" style={{ padding: 36, borderColor: 'var(--lime)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p className="label" style={{ color: 'var(--lime)', marginBottom: 6 }}>Plano Mesa</p>
                  <h3 className="display-md" style={{ color: 'var(--off)' }}>Acesso completo</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="mono" style={{ fontSize: 36, color: 'var(--off)', lineHeight: 1 }}>R$ 480<span style={{ fontSize: 14, color: 'var(--cinza)' }}>/mês</span></p>
                  <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 6 }}>cobrança trimestral · R$ 1.440</p>
                </div>
              </div>

              <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', marginTop: 22, padding: '22px 0', borderTop: '1px solid var(--rule-dark)', borderBottom: '1px solid var(--rule-dark)' }}>
                {[
                  'Curva dólar forward ao vivo',
                  'Curvas de juros (DI futuro)',
                  'NDF e swaps',
                  'Comparador banco × referência',
                  'Histórico ilimitado de consultas',
                  'Biblioteca técnica',
                  'Até 3 usuários',
                  'Disclaimer e auditabilidade',
                ].map((line, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 13, color: 'var(--off)' }}>
                    <span style={{ color: 'var(--lime)', fontFamily: 'var(--mono)', fontSize: 10 }}>✓</span>
                    {line}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
                <button onClick={openLogin} className="btn btn-lime">Solicitar acesso →</button>
                <a href="#/dashboard" className="btn btn-ghost on-dark">Ver dentro do produto</a>
              </div>
            </div>

            {/* Aside */}
            <div className="panel" style={{ padding: 28, background: 'transparent', borderStyle: 'dashed', borderColor: 'var(--rule-dark-strong)' }}>
              <p className="label" style={{ color: 'var(--cinza)', marginBottom: 14 }}>Plano corporativo</p>
              <p className="lead-sm" style={{ color: 'var(--off)', marginBottom: 20 }}>
                Mais de 3 usuários, integrações, dados via API ou cobertura sob medida.
              </p>
              <p style={{ fontSize: 13, color: 'var(--cinza)', lineHeight: 1.6, marginBottom: 24 }}>
                Conversamos com a empresa, mapeamos o uso e calculamos o plano. Sem mensalidade tabelada.
              </p>
              <a href="mailto:mesa@datavol.com" className="btn-link">mesa@datavol.com →</a>
            </div>
          </div>
          <style>{`@media (max-width: 880px) { .plan-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* COMPLIANCE / DISCLAIMER */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--rule-dark)', background: 'var(--black-2)' }}>
        <div className="wrap-wide">
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32 }} className="comp-grid">
            <div className="label" style={{ color: 'var(--cinza)' }}>Compliance</div>
            <p className="mono" style={{ fontSize: 12, color: 'var(--cinza)', lineHeight: 1.85, maxWidth: '92ch' }}>
              DATA.VOL é uma ferramenta educacional e analítica de apoio à leitura de preços e instrumentos financeiros. Os cálculos apresentados são estimativas baseadas em dados, premissas e metodologias informadas. Não constituem recomendação individual de investimento, operação, hedge, compra, venda ou contratação de produto financeiro. Decisões financeiras devem considerar o contexto específico da empresa, política de risco, documentação contratual e assessoria profissional habilitada quando necessário.
            </p>
          </div>
          <style>{`@media (max-width: 720px) { .comp-grid { grid-template-columns: 1fr !important; gap: 14px !important; } }`}</style>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--black)', padding: '60px 0 30px', borderTop: '1px solid var(--rule-dark)' }}>
        <div className="wrap-wide">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 40, marginBottom: 48 }} className="footer-g">
            <div>
              <window.Lockup size={32} fontSize={26} dot="lime" />
              <p className="mono" style={{ fontSize: 12, color: 'var(--cinza)', lineHeight: 1.7, marginTop: 16, maxWidth: '36ch' }}>
                Curvas calculadas.<br/>
                Preços legíveis.<br/>
                Decisões menos assimétricas.
              </p>
            </div>
            <div>
              <h5 className="label-sm" style={{ color: 'var(--lime)', marginBottom: 14 }}>Produto</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--cinza)' }}>
                <li><a href="#/curva">Curva dólar forward</a></li>
                <li><a href="#/juros">Curva de juros</a></li>
                <li><a href="#/ndf">NDF</a></li>
                <li><a href="#/comparador">Comparador</a></li>
              </ul>
            </div>
            <div>
              <h5 className="label-sm" style={{ color: 'var(--lime)', marginBottom: 14 }}>Empresa</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--cinza)' }}>
                <li><a href="#produto">Proposta</a></li>
                <li><a href="#para-quem">Para quem</a></li>
                <li><a href="#assinatura">Assinatura</a></li>
                <li><a href="mailto:mesa@datavol.com">mesa@datavol.com</a></li>
              </ul>
            </div>
            <div>
              <h5 className="label-sm" style={{ color: 'var(--lime)', marginBottom: 14 }}>Aviso</h5>
              <p className="mono" style={{ fontSize: 11, color: 'var(--cinza-2)', lineHeight: 1.8 }}>
                Não constitui recomendação individual de investimento. Cálculos são estimativas baseadas em premissas informadas. Use com critério.
              </p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--rule-dark)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }} className="label-sm">
            <span style={{ color: 'var(--cinza-3)' }}>© 2026 Volatis · DATA.VOL · v2.0</span>
            <span style={{ color: 'var(--cinza-3)' }}>volatis.com.br · mesa@datavol.com</span>
          </div>
          <style>{`@media (max-width: 720px) { .footer-g { grid-template-columns: 1fr 1fr !important; gap: 28px !important; } }`}</style>
        </div>
      </footer>
    </div>
  );
};

Object.assign(window, { PublicHeader, PublicLanding, HeroChart });
