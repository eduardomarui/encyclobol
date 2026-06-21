// Banco de perguntas do Quiz Relâmpago.
// A opção correta é sempre a de índice `correct`; a ordem das alternativas
// é embaralhada no jogo (de forma determinística por dia).

export type QuizQuestion = {
  q: string
  options: string[]
  correct: number
  cat: string
}

export const quiz: QuizQuestion[] = [
  { q: 'Qual seleção venceu a primeira Copa do Mundo, em 1930?', options: ['Uruguai', 'Brasil', 'Argentina', 'Itália'], correct: 0, cat: 'Copas' },
  { q: 'Em que país foi disputada a Copa do Mundo de 1970?', options: ['México', 'Brasil', 'Espanha', 'Inglaterra'], correct: 0, cat: 'Copas' },
  { q: 'Quantas Copas do Mundo a seleção brasileira já venceu?', options: ['5', '4', '6', '3'], correct: 0, cat: 'Brasil' },
  { q: 'Quem fez o gol conhecido como "La Mano de Dios", em 1986?', options: ['Maradona', 'Pelé', 'Kempes', 'Batistuta'], correct: 0, cat: 'Lendas' },
  { q: 'Qual seleção venceu a Copa do Mundo de 2014?', options: ['Alemanha', 'Argentina', 'Brasil', 'Holanda'], correct: 0, cat: 'Copas' },
  { q: 'Quem foi o artilheiro da Copa do Mundo de 2002?', options: ['Ronaldo', 'Rivaldo', 'Klose', 'Vieri'], correct: 0, cat: 'Brasil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1998?', options: ['França', 'Brasil', 'Croácia', 'Itália'], correct: 0, cat: 'Copas' },
  { q: 'Em que cidade fica o estádio do Maracanã?', options: ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte', 'Salvador'], correct: 0, cat: 'Estádios' },
  { q: 'Qual seleção venceu a Copa do Mundo de 2010, na África do Sul?', options: ['Espanha', 'Holanda', 'Alemanha', 'Uruguai'], correct: 0, cat: 'Copas' },
  { q: 'Quem é o maior artilheiro da história das Copas do Mundo?', options: ['Miroslav Klose', 'Ronaldo', 'Pelé', 'Gerd Müller'], correct: 0, cat: 'Recordes' },
  { q: 'Qual clube Pelé defendeu durante quase toda a carreira no Brasil?', options: ['Santos', 'Corinthians', 'Palmeiras', 'Flamengo'], correct: 0, cat: 'Clubes' },
  { q: 'Em que ano foi disputada a Copa do Mundo do Catar?', options: ['2022', '2021', '2023', '2020'], correct: 0, cat: 'Copas' },
  { q: 'Qual seleção venceu a Copa do Mundo de 2022?', options: ['Argentina', 'França', 'Brasil', 'Croácia'], correct: 0, cat: 'Copas' },
  { q: 'Qual seleção venceu a Copa do Mundo de 2006?', options: ['Itália', 'França', 'Alemanha', 'Portugal'], correct: 0, cat: 'Copas' },
  { q: 'Quem venceu a Bola de Ouro mais vezes na história (até 2023)?', options: ['Lionel Messi', 'Cristiano Ronaldo', 'Michel Platini', 'Johan Cruyff'], correct: 0, cat: 'Recordes' },
  { q: 'Quantos jogadores de cada equipe começam uma partida em campo?', options: ['11', '10', '12', '9'], correct: 0, cat: 'Regras' },
  { q: 'Contra qual seleção o Brasil perdeu a final da Copa de 1950, no Maracanã?', options: ['Uruguai', 'Argentina', 'Itália', 'Suécia'], correct: 0, cat: 'Brasil' },
  { q: 'Quem foi o técnico do Brasil no pentacampeonato, em 2002?', options: ['Luiz Felipe Scolari', 'Carlos Alberto Parreira', 'Mário Zagallo', 'Tite'], correct: 0, cat: 'Brasil' },
  { q: 'Qual jogador é apelidado de "O Fenômeno"?', options: ['Ronaldo', 'Ronaldinho', 'Romário', 'Adriano'], correct: 0, cat: 'Lendas' },
  { q: 'Quantos minutos tem cada tempo regulamentar de uma partida?', options: ['45', '40', '50', '30'], correct: 0, cat: 'Regras' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1958, a primeira do Brasil?', options: ['Brasil', 'Suécia', 'França', 'Alemanha'], correct: 0, cat: 'Brasil' },
  { q: 'Em qual país foi disputada a Copa do Mundo de 1994?', options: ['Estados Unidos', 'México', 'Itália', 'Brasil'], correct: 0, cat: 'Copas' },
  { q: 'Qual seleção foi vice-campeã da Copa do Mundo de 2018?', options: ['Croácia', 'França', 'Bélgica', 'Inglaterra'], correct: 0, cat: 'Copas' },
  { q: 'Qual jogador holandês ficou famoso pelo drible "Cruyff Turn"?', options: ['Johan Cruyff', 'Ruud Gullit', 'Dennis Bergkamp', 'Arjen Robben'], correct: 0, cat: 'Lendas' },
  { q: 'Quem ganhou a Bola de Ouro de 2018, quebrando a sequência de Messi e Cristiano?', options: ['Luka Modrić', 'Kylian Mbappé', 'Antoine Griezmann', 'Mohamed Salah'], correct: 0, cat: 'Recordes' },
  { q: 'Qual seleção venceu a Eurocopa de 2016?', options: ['Portugal', 'França', 'Alemanha', 'Espanha'], correct: 0, cat: 'Seleções' },
  { q: 'Por qual clube Lionel Messi jogou a maior parte da carreira?', options: ['Barcelona', 'Real Madrid', 'Paris Saint-Germain', 'Manchester City'], correct: 0, cat: 'Clubes' },
  { q: 'Qual seleção venceu a Copa América de 2021?', options: ['Argentina', 'Brasil', 'Uruguai', 'Chile'], correct: 0, cat: 'Seleções' },
  { q: 'Em qual país foi disputada a Copa do Mundo de 2018?', options: ['Rússia', 'Catar', 'Brasil', 'Alemanha'], correct: 0, cat: 'Copas' },
  { q: 'Qual clube inglês é apelidado de "Os Diabos Vermelhos"?', options: ['Manchester United', 'Liverpool', 'Arsenal', 'Chelsea'], correct: 0, cat: 'Clubes' },
]
