import Nav from '../components/landing/Nav'
import Footer from '../components/landing/Footer'

export default function Privacidade() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Nav />
      <main className="container-page flex-1 py-12 sm:py-16">
        <header className="border-b-2 border-ink-900 pb-5">
          <p className="kicker">As miudezas</p>
          <h1 className="mt-2 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
            Privacidade
          </h1>
          <p className="mt-3 font-serif text-base italic text-ink-600">Atualizado em junho de 2026.</p>
        </header>

        <div className="mt-6 max-w-2xl space-y-6 font-serif text-[15px] leading-relaxed text-ink-800">
          <p>
            O Encyclobol é um jogo de futebol feito pra ser simples e leve. Coletamos o mínimo possível —
            só o necessário pra você jogar e disputar com os amigos.
          </p>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">O que fica no seu aparelho</h2>
            <p className="mt-1">
              Seu progresso (pontos, sequências, conquistas e o estado das edições do dia) é guardado no
              armazenamento local (localStorage) do seu navegador. Esses dados não saem do aparelho a menos que
              você entre no ranking ou no duelo online.
            </p>
          </section>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">O que vai pro servidor (opcional)</h2>
            <p className="mt-1">
              Só quando você escolhe entrar no <strong>ranking</strong> ou no <strong>duelo online</strong>, guardamos
              no nosso banco (Supabase): um <strong>apelido</strong> que você escolhe, um <strong>código de amigo</strong> e
              seus <strong>pontos por jogo</strong>, ligados a um identificador <strong>anônimo</strong> gerado
              automaticamente. Não pedimos nome real, e-mail, telefone ou qualquer dado sensível.
            </p>
          </section>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">O que NÃO fazemos</h2>
            <p className="mt-1">
              Não vendemos seus dados, não usamos rastreadores de publicidade e não compartilhamos informações com
              terceiros para marketing. Se um dia adicionarmos anúncios ou medição de audiência, avisaremos aqui.
            </p>
          </section>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">Terceiros</h2>
            <p className="mt-1">
              Usamos o <strong>GitHub Pages</strong> (hospedagem) e o <strong>Supabase</strong> (banco de dados do
              ranking/duelo). Eles processam apenas o necessário pra entregar o jogo.
            </p>
          </section>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">Seus controles</h2>
            <p className="mt-1">
              Você pode apagar os dados locais limpando os dados do site no seu navegador. Para remover seu apelido e
              pontos do ranking, fale com a gente.
            </p>
          </section>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">Contato</h2>
            <p className="mt-1">
              Dúvidas sobre privacidade? Fale com a gente pelo{' '}
              <a
                href="https://github.com/eduardomarui/encyclobol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-grass-600 underline"
              >
                projeto no GitHub
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
