import { Link } from 'react-router-dom'
import { players } from '../../data/players'
import { quiz } from '../../data/quiz'

export default function Sobre() {
  return (
    <section id="sobre" className="border-t border-white/10">
      <div className="container-page grid gap-10 py-16 lg:grid-cols-12 lg:gap-12 sm:py-20">
        <div className="lg:col-span-5">
          <p className="kicker">Sobre</p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
            Feito à mão,
            <br />
            sem atalho.
          </h2>
        </div>

        <div className="space-y-8 font-serif text-[17px] leading-relaxed text-ink-700 lg:col-span-7">
          <p>
            O Encyclobol é um projeto <strong className="text-ink-900">independente</strong>, feito por quem
            cresceu discutindo escalação e trocando figurinha. Não tem vínculo com clube, liga ou
            federação — os nomes de craques e seleções aparecem como referência histórica, do jeito que
            aparecem numa conversa de bar.
          </p>
          <p>
            A base é montada e conferida à mão: <strong className="text-ink-900">{players.length} craques</strong> com
            seleção, posição e época checadas, e <strong className="text-ink-900">{quiz.length} perguntas</strong> com
            resposta verificada. Achou um erro? Manda. Aqui erro factual é bug e é corrigido.
          </p>

          <div className="grid gap-px border border-white/15 bg-white/10 sm:grid-cols-3">
            {[
              ['Todo dia', 'Uma edição nova, a mesma pra todo mundo. Ninguém vê a resposta antes.'],
              ['Sem Google', 'Os jogos têm relógio e vidas. Consultar mata a graça — e o placar.'],
              ['Com os amigos', 'Ranking global e por código de amigo, e um duelo de pênaltis 1×1 ao vivo.'],
            ].map(([t, d]) => (
              <div key={t} className="bg-paper px-5 py-5">
                <p className="font-cond text-xs font-700 uppercase tracking-[0.16em] text-corn-500">{t}</p>
                <p className="mt-2 font-serif text-[15px] leading-snug text-ink-700">{d}</p>
              </div>
            ))}
          </div>

          <p className="text-ink-600">
            É grátis e, por enquanto, sem anúncio e sem plano pago. Se isso mudar, vai estar escrito
            aqui antes de aparecer em qualquer outro lugar. Miudezas em{' '}
            <Link to="/privacidade" className="text-ink-900 underline underline-offset-4">privacidade</Link> e{' '}
            <Link to="/termos" className="text-ink-900 underline underline-offset-4">termos</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
