// Escalação (beta): elencos marcantes pra escalar de memória. Cada jogador
// aceita apelidos (`alias`), comparados sem acento e sem caixa.
// Dados conferidos em fonte oficial antes de entrar (ver `fonte`).

export type Pos = 'GOL' | 'ZAG' | 'LAT' | 'VOL' | 'MEI' | 'ATA'
// `nat`: seleção principal que o jogador defendeu (código FIFA), não o país de nascimento.
export type Jogador = { nome: string; alias: string[]; num: number; pos: Pos; nat: string }
export type Escalacao = {
  id: string
  time: string
  jogo: string // "Roma 3x0 Barcelona"
  quando: string // "Champions 2018 · quartas"
  nivel: 'fácil' | 'médio' | 'difícil'
  esquema: string
  // Cores da camisa usada no jogo (estilizada, sem escudo).
  camisa: { cor: string; detalhe: string; numero: string; calcao: string }
  goleiro: { cor: string; numero: string }
  // 6 em pé (atrás) e 5 agachados (frente), como na foto oficial.
  atras: Jogador[]
  frente: Jogador[]
  fonte: string
}

const j = (nome: string, num: number, pos: Pos, nat: string, ...alias: string[]): Jogador => ({ nome, alias, num, pos, nat })

export const ESCALACOES: Escalacao[] = [
  {
    id: 'brasil-2002',
    time: 'Brasil',
    jogo: 'Brasil 2x0 Alemanha',
    quando: 'Final da Copa do Mundo 2002',
    nivel: 'fácil',
    esquema: '3-4-1-2',
    camisa: { cor: '#f6d21f', detalhe: '#1c8a3c', numero: '#1c8a3c', calcao: '#1f4fa3' },
    goleiro: { cor: '#5c6b73', numero: '#f4f4f4' },
    atras: [
      j('Marcos', 1, 'GOL', 'BRA'),
      j('Lúcio', 3, 'ZAG', 'BRA'),
      j('Edmílson', 5, 'ZAG', 'BRA'),
      j('Roque Júnior', 4, 'ZAG', 'BRA', 'Roque', 'Roque Junior'),
      j('Gilberto Silva', 8, 'VOL', 'BRA', 'Gilberto'),
      j('Kléberson', 15, 'VOL', 'BRA'),
    ],
    frente: [
      j('Cafu', 2, 'LAT', 'BRA'),
      j('Roberto Carlos', 6, 'LAT', 'BRA'),
      j('Ronaldinho', 11, 'MEI', 'BRA', 'Ronaldinho Gaúcho', 'Ronaldinho Gaucho', 'R10'),
      j('Rivaldo', 10, 'MEI', 'BRA'),
      j('Ronaldo', 9, 'ATA', 'BRA', 'Ronaldo Fenômeno', 'Ronaldo Fenomeno', 'R9', 'Fenômeno', 'Fenomeno'),
    ],
    fonte: 'Súmula oficial FIFA, final 30/06/2002 (Yokohama); Wikipedia "2002 FIFA World Cup final"',
  },
  {
    id: 'corinthians-2012',
    time: 'Corinthians',
    jogo: 'Corinthians 1x0 Chelsea',
    quando: 'Final do Mundial de Clubes 2012',
    nivel: 'médio',
    esquema: '4-2-3-1',
    camisa: { cor: '#f4f4f4', detalhe: '#111111', numero: '#111111', calcao: '#111111' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Cássio', 12, 'GOL', 'BRA'),
      j('Chicão', 3, 'ZAG', 'BRA'),
      j('Paulo André', 13, 'ZAG', 'BRA'),
      j('Ralf', 5, 'VOL', 'BRA'),
      j('Paulinho', 8, 'VOL', 'BRA'),
      j('Guerrero', 9, 'ATA', 'PER', 'Paolo Guerrero'),
    ],
    frente: [
      j('Alessandro', 2, 'LAT', 'BRA'),
      j('Fábio Santos', 6, 'LAT', 'BRA'),
      j('Jorge Henrique', 23, 'ATA', 'BRA'),
      j('Danilo', 20, 'MEI', 'BRA'),
      // Nasceu no Brasil; defendeu o Catar (3 jogos em 2008). Bandeira = seleção que defendeu.
      j('Emerson Sheik', 11, 'ATA', 'QAT', 'Emerson', 'Sheik'),
    ],
    fonte: 'Súmula oficial FIFA, final do Mundial 16/12/2012 (Yokohama); Wikipedia "2012 FIFA Club World Cup final"',
  },
  {
    id: 'roma-2018',
    time: 'Roma',
    jogo: 'Roma 3x0 Barcelona',
    quando: 'Champions 2018 · quartas, a virada',
    nivel: 'difícil',
    esquema: '3-5-2',
    camisa: { cor: '#8c2a39', detalhe: '#f0a32a', numero: '#f0a32a', calcao: '#8c2a39' },
    goleiro: { cor: '#2f7d5a', numero: '#f4f4f4' },
    atras: [
      j('Alisson', 1, 'GOL', 'BRA', 'Alisson Becker'),
      j('Manolas', 44, 'ZAG', 'GRE', 'Kostas Manolas'),
      j('Fazio', 20, 'ZAG', 'ARG', 'Federico Fazio'),
      j('Juan Jesus', 5, 'ZAG', 'BRA', 'Juan'),
      j('De Rossi', 16, 'VOL', 'ITA', 'Daniele De Rossi', 'Derossi'),
      j('Džeko', 9, 'ATA', 'BIH', 'Dzeko', 'Edin Dzeko', 'Edin Džeko'),
    ],
    frente: [
      j('Florenzi', 24, 'LAT', 'ITA', 'Alessandro Florenzi'),
      j('Kolarov', 11, 'LAT', 'SRB', 'Aleksandar Kolarov'),
      j('Strootman', 6, 'VOL', 'NED', 'Kevin Strootman'),
      j('Nainggolan', 4, 'MEI', 'BEL', 'Radja Nainggolan', 'Ninja'),
      j('Schick', 14, 'ATA', 'CZE', 'Patrik Schick'),
    ],
    fonte: 'UEFA (match.uefa.com, jogo 2021705); ESPN; esquema pelo posicionamento oficial da UEFA',
  },
]
