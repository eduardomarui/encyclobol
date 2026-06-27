import Nav from '../components/landing/Nav'
import Footer from '../components/landing/Footer'

export default function Termos() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Nav />
      <main className="container-page flex-1 py-12 sm:py-16">
        <header className="border-b-2 border-ink-900 pb-5">
          <p className="kicker">As miudezas</p>
          <h1 className="mt-2 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
            Termos de uso
          </h1>
          <p className="mt-3 font-serif text-base italic text-ink-600">Atualizado em junho de 2026.</p>
        </header>

        <div className="mt-6 max-w-2xl space-y-6 font-serif text-[15px] leading-relaxed text-ink-800">
          <p>
            Ao usar o Encyclobol, você concorda com estes termos. Eles são curtos e em português claro de propósito.
          </p>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">O que é</h2>
            <p className="mt-1">
              O Encyclobol é um jogo <strong>gratuito</strong> de entretenimento sobre a história do futebol.
              Os desafios são pra diversão — não são fonte oficial de informação.
            </p>
          </section>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">Uso justo</h2>
            <p className="mt-1">
              Jogue limpo: nada de trapaça, automação, abuso do multiplayer ou tentativa de manipular o ranking.
              Apelidos ofensivos ou que se passem por terceiros podem ser removidos.
            </p>
          </section>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">Nomes e referências</h2>
            <p className="mt-1">
              Nomes de jogadores, seleções e clubes são citados como <strong>referência factual e cultural</strong>,
              para fins de entretenimento. O Encyclobol não é afiliado, patrocinado nem endossado por nenhuma
              entidade, clube ou liga.
            </p>
          </section>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">Sem garantias</h2>
            <p className="mt-1">
              O jogo é oferecido "como está". Fazemos o possível pra manter tudo no ar e correto, mas o serviço
              pode mudar, ficar indisponível ou conter eventuais erros, sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">Propriedade</h2>
            <p className="mt-1">
              A marca Encyclobol, a identidade visual, os textos e o código são do projeto. Você pode jogar e
              compartilhar seus resultados à vontade.
            </p>
          </section>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">Mudanças</h2>
            <p className="mt-1">
              Podemos atualizar estes termos conforme o jogo evolui. A data no topo indica a última revisão.
            </p>
          </section>

          <section>
            <h2 className="font-cond text-sm font-700 uppercase tracking-wide text-ink-900">Contato</h2>
            <p className="mt-1">
              Fale com a gente pelo{' '}
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
