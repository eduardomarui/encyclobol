// Escalação (beta): elencos marcantes pra escalar de memória. Cada jogador
// aceita apelidos (`alias`), comparados sem acento e sem caixa.
// Dados conferidos em fonte oficial antes de entrar (ver `fonte`).

export type Pos = 'GOL' | 'ZAG' | 'LAT' | 'VOL' | 'MEI' | 'ATA'
// `nat`: seleção principal que o jogador defendeu (código FIFA), não o país de
// nascimento; quem nunca jogou pela seleção principal leva a nacionalidade.
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
  // FONTES: https://rsssf.org/tablesi/intconclub62.html (RSSSF, XI do jogo de volta) | https://en.wikipedia.org/wiki/1962_Intercontinental_Cup (XI + números + uniforme) | https://pt.wikipedia.org/wiki/Copa_Intercontinental_de_1962 (XI)
  // DÚVIDA: jogo de 1962 sem súmula oficial online (FIFA não tem o jogo na base). XI bate em RSSSF + en.wiki + pt.wiki.
  // DÚVIDA: números só na en.wiki (RSSSF não traz). Posições: RSSSF/pt.wiki divergem na ordem; usei Olavo e Dalmo nas laterais, Mauro e Calvet no miolo, Lima no meio.
  // DÚVIDA nat: Dalmo não tem jogo pela seleção principal registrado na Wikipedia; brasileiro, usei BRA. Demais com jogos pela seleção.
  // Uniforme: Santos todo de branco (en.wiki kit); goleiro de preto (genérico).
  {
    id: 'santos-1962',
    time: 'Santos',
    jogo: 'Santos 5x2 Benfica',
    quando: 'Mundial Interclubes 1962 · jogo de volta, em Lisboa',
    nivel: 'difícil',
    esquema: '4-2-4',
    camisa: { cor: '#f4f4f4', detalhe: '#111111', numero: '#111111', calcao: '#f4f4f4' },
    goleiro: { cor: '#1f1f1f', numero: '#f4f4f4' },
    atras: [
      j('Gilmar', 1, 'GOL', 'BRA', 'Gylmar', 'Gilmar dos Santos Neves'),
      j('Olavo', 4, 'LAT', 'BRA'),
      j('Mauro', 2, 'ZAG', 'BRA', 'Mauro Ramos', 'Mauro Ramos de Oliveira'),
      j('Calvet', 6, 'ZAG', 'BRA', 'Raul Calvet', 'Raul Donazar Calvet'),
      j('Dalmo', 3, 'LAT', 'BRA', 'Dalmo Gaspar'),
      j('Zito', 5, 'VOL', 'BRA'),
    ],
    frente: [
      j('Dorval', 7, 'ATA', 'BRA', 'Dorval Rodrigues'),
      j('Lima', 8, 'MEI', 'BRA', 'Antônio Lima', 'Antonio Lima'),
      j('Coutinho', 9, 'ATA', 'BRA'),
      j('Pelé', 10, 'ATA', 'BRA', 'Pele', 'Edson Arantes do Nascimento', 'Rei'),
      j('Pepe', 11, 'ATA', 'BRA', 'José Macia', 'Jose Macia', 'Canhão da Vila'),
    ],
    fonte: 'RSSSF "Intercontinental Club Cup 1962"; Wikipedia "1962 Intercontinental Cup" (2º jogo, Lisboa, 11/10/1962)',
  },
  // FONTES: https://rsssf.org/tablest/toyota81.html (RSSSF, XI) | https://en.wikipedia.org/wiki/1981_Intercontinental_Cup (XI + números + uniforme) | https://pt.wikipedia.org/wiki/Copa_Intercontinental_de_1981 (XI + números) | https://www.goal.com/br/not%C3%ADcias/flamengo-x-liverpool-no-mundial-de-1981-quem-fez-os-gols/10h42uz9wm0w6165rp82dnh275 e Correio Braziliense (XI) | https://www.lance.com.br/flamengo/como-1981-atuara-branco-diante-liverpool-final-mundial.html (Flamengo de branco, meião rubro-negro)
  // DÚVIDA: sem súmula oficial online (FIFA não tem a Copa Toyota na base). XI bate em RSSSF + en.wiki + pt.wiki + Goal + Correio Braziliense.
  // DÚVIDA: números só nas Wikipedias (en e pt concordam, inclusive Marinho 13 e Mozer 4); nenhuma fonte independente com numeração.
  // Uniforme: camisa branca (2º uniforme) com faixa rubro-negra, calção branco (en.wiki kit); goleiro Raul de amarelo (marca registrada dele).
  {
    id: 'flamengo-1981',
    time: 'Flamengo',
    jogo: 'Flamengo 3x0 Liverpool',
    quando: 'Final do Mundial Interclubes 1981',
    nivel: 'médio',
    esquema: '4-3-3',
    camisa: { cor: '#f4f4f4', detalhe: '#c8102e', numero: '#111111', calcao: '#f4f4f4' },
    goleiro: { cor: '#f2c230', numero: '#111111' },
    atras: [
      j('Raul', 1, 'GOL', 'BRA', 'Raul Plassmann'),
      j('Leandro', 2, 'LAT', 'BRA'),
      j('Marinho', 13, 'ZAG', 'BRA'),
      j('Mozer', 4, 'ZAG', 'BRA', 'Carlos Mozer'),
      j('Júnior', 5, 'LAT', 'BRA', 'Junior', 'Leovegildo Júnior', 'Capacete'),
      j('Andrade', 6, 'VOL', 'BRA'),
    ],
    frente: [
      j('Tita', 7, 'ATA', 'BRA'),
      j('Adílio', 8, 'MEI', 'BRA', 'Adilio'),
      j('Nunes', 9, 'ATA', 'BRA'),
      j('Zico', 10, 'MEI', 'BRA', 'Arthur Antunes Coimbra', 'Galinho'),
      j('Lico', 11, 'ATA', 'BRA'),
    ],
    fonte: 'RSSSF "Intercontinental Club Cup 1981"; Wikipedia "1981 Intercontinental Cup" (Tóquio, 13/12/1981)',
  },
  // FONTES: https://rsssf.org/tablest/toyota83.html (RSSSF, XI) | https://en.wikipedia.org/wiki/1983_Intercontinental_Cup (XI + números + uniforme) | https://pt.wikipedia.org/wiki/Copa_Intercontinental_de_1983 (XI + números) | https://www.jornaldocomercio.com/esportes/2023/12/amp/1134829-gremio-celebra-os-40-anos-da-conquista-do-mundial-em-toquio.html (foto oficial do time: em pé Paulo Roberto, Mazaropi, Baidek, China, Paulo César Magalhães, De León; agachados Renato, Osvaldo, Tarciso, Caju, Mário Sérgio — bate com o XI)
  // DÚVIDA: sem súmula oficial online (FIFA não tem a Copa Toyota na base). XI bate em RSSSF + en.wiki + pt.wiki + legenda da foto (Jornal do Comércio).
  // DÚVIDA: números só nas Wikipedias (en e pt concordam).
  // DÚVIDA uniforme: tricolor listrado (azul/preto/branco); en.wiki indica calção branco no kit, mas o calção tradicional é preto — usei preto. Conferir em foto se quiser.
  // nat: todos BRA exceto Hugo De León (URU, jogou pela seleção uruguaia). Alguns (ex.: Mazarópi, Baidek, Tarciso) podem não ter jogo pela seleção principal; são brasileiros, BRA.
  {
    id: 'gremio-1983',
    time: 'Grêmio',
    jogo: 'Grêmio 2x1 Hamburgo',
    quando: 'Final do Mundial Interclubes 1983 · prorrogação',
    nivel: 'difícil',
    esquema: '4-3-3',
    camisa: { cor: '#0d6fb8', detalhe: '#111111', numero: '#f4f4f4', calcao: '#f4f4f4' },
    goleiro: { cor: '#5c6b73', numero: '#f4f4f4' },
    atras: [
      j('Mazarópi', 1, 'GOL', 'BRA', 'Mazaropi'),
      j('Paulo Roberto', 2, 'LAT', 'BRA'),
      j('Baidek', 3, 'ZAG', 'BRA', 'Jorge Baidek'),
      j('De León', 6, 'ZAG', 'URU', 'De Leon', 'Hugo De León', 'Hugo De Leon'),
      j('Paulo César Magalhães', 4, 'LAT', 'BRA', 'Paulo Cesar Magalhaes', 'Paulo César', 'Paulo Cesar'),
      j('China', 5, 'VOL', 'BRA'),
    ],
    frente: [
      j('Renato Gaúcho', 7, 'ATA', 'BRA', 'Renato Gaucho', 'Renato', 'Renato Portaluppi'),
      j('Osvaldo', 8, 'MEI', 'BRA'),
      j('Tarciso', 9, 'ATA', 'BRA', 'Tarcisio', 'Flecha Negra'),
      j('Caju', 10, 'ATA', 'BRA', 'Paulo César Caju', 'Paulo Cesar Caju', 'Paulo César Lima', 'Paulo Cesar Lima'),
      j('Mário Sérgio', 11, 'MEI', 'BRA', 'Mario Sergio'),
    ],
    fonte: 'RSSSF "Intercontinental Club Cup 1983"; Wikipedia "1983 Intercontinental Cup" (Tóquio, 11/12/1983)',
  },
  // FONTES: https://rsssf.org/tablest/toyota92.html (RSSSF, XI) | https://en.wikipedia.org/wiki/1992_Intercontinental_Cup (XI + números + uniforme) | https://pt.wikipedia.org/wiki/Copa_Intercontinental_de_1992 (XI + números) | https://www.gazetaesportiva.com/?p=3740450 (Gazeta Esportiva, XI)
  // DÚVIDA: sem súmula oficial online (FIFA não tem a Copa Toyota na base; o link de relatório fifa.com citado na pt.wiki está fora do ar). XI bate em RSSSF + en.wiki + pt.wiki + Gazeta Esportiva.
  // DÚVIDA: números só nas Wikipedias (en e pt concordam, ex.: Ronaldão 4, Adilson 3, Cafu 11, Müller 7).
  // DÚVIDA data: o lote diz 13/12/1992 (data no Brasil); RSSSF/en.wiki dão 12/12/1992 (hora de Tóquio). Não usei data no campo `quando`.
  // Uniforme: camisa branca com faixas vermelha e preta, calção branco (en.wiki kit).
  {
    id: 'saopaulo-1992',
    time: 'São Paulo',
    jogo: 'São Paulo 2x1 Barcelona',
    quando: 'Final do Mundial Interclubes 1992',
    nivel: 'médio',
    esquema: '4-4-2',
    camisa: { cor: '#f4f4f4', detalhe: '#d7182a', numero: '#111111', calcao: '#f4f4f4' },
    goleiro: { cor: '#2f7d5a', numero: '#f4f4f4' },
    atras: [
      j('Zetti', 1, 'GOL', 'BRA'),
      j('Vítor', 2, 'LAT', 'BRA', 'Vitor', 'Victor'),
      j('Adilson', 3, 'ZAG', 'BRA', 'Adílson'),
      j('Ronaldão', 4, 'ZAG', 'BRA', 'Ronaldao', 'Ronaldo'),
      j('Ronaldo Luiz', 6, 'LAT', 'BRA', 'Ronaldo Luís', 'Ronaldo Luis'),
      j('Pintado', 5, 'VOL', 'BRA'),
    ],
    frente: [
      j('Cafu', 11, 'MEI', 'BRA', 'Marcos Evangelista'),
      j('Toninho Cerezo', 8, 'VOL', 'BRA', 'Cerezo', 'Toninho'),
      j('Raí', 10, 'MEI', 'BRA', 'Rai'),
      j('Palhinha', 9, 'ATA', 'BRA', 'Palinha'),
      j('Müller', 7, 'ATA', 'BRA', 'Muller'),
    ],
    fonte: 'RSSSF "Intercontinental Club Cup 1992"; Wikipedia "1992 Intercontinental Cup" (Tóquio, 12/12/1992)',
  },
  // FONTES: https://api.fifa.com/api/v3/live/football/17/32/3476/1765 (FIFA, dados oficiais do jogo: titulares e números) | https://en.wikipedia.org/wiki/1970_FIFA_World_Cup_final (XI + números + uniforme) | https://rsssf.org/tables/70full.html (RSSSF, XI)
  // DÚVIDAS: nenhuma. FIFA e Wikipedia batem nos 11 titulares e em todos os números.
  // Uniforme: camisa amarela com gola verde, calção azul, meião branco. Disposição em pé/agachados segue a foto oficial da final.
  {
    id: 'brasil-1970',
    time: 'Brasil',
    jogo: 'Brasil 4x1 Itália',
    quando: 'Final da Copa do Mundo 1970',
    nivel: 'fácil',
    esquema: '4-3-3',
    camisa: { cor: '#f6d21f', detalhe: '#1c8a3c', numero: '#1c8a3c', calcao: '#1f4fa3' },
    goleiro: { cor: '#4a6fa5', numero: '#f4f4f4' },
    atras: [
      j('Félix', 1, 'GOL', 'BRA', 'Felix'),
      j('Carlos Alberto', 4, 'LAT', 'BRA', 'Carlos Alberto Torres', 'Capita'),
      j('Brito', 2, 'ZAG', 'BRA'),
      j('Piazza', 3, 'ZAG', 'BRA', 'Wilson Piazza'),
      j('Clodoaldo', 5, 'VOL', 'BRA'),
      j('Everaldo', 16, 'LAT', 'BRA'),
    ],
    frente: [
      j('Jairzinho', 7, 'ATA', 'BRA', 'Jair', 'Furacão', 'Furacao'),
      j('Gérson', 8, 'MEI', 'BRA', 'Gerson', 'Canhotinha de Ouro'),
      j('Tostão', 9, 'ATA', 'BRA', 'Tostao'),
      j('Pelé', 10, 'ATA', 'BRA', 'Pele', 'Edson Arantes do Nascimento', 'Rei'),
      j('Rivellino', 11, 'MEI', 'BRA', 'Rivelino', 'Roberto Rivellino'),
    ],
    fonte: 'FIFA (dados oficiais da partida, 21/06/1970, Cidade do México); Wikipedia "1970 FIFA World Cup final"',
  },
  // FONTES: CONMEBOL, ficha oficial do jogo (conmebol.com/competiciones_evento_reporte.jsp?evento=1081&ano=1999&dv=E&flt=Z&id=2, cópia arquivada em web.archive.org/web/2005) | https://www.palmeiras.com.br/?p=173631 (ficha no site oficial do clube) | https://en.wikipedia.org/wiki/1999_Copa_Libertadores_finals
  // DÚVIDAS: nenhuma nos titulares e números (CONMEBOL e Wikipedia batem; o site do clube confirma os 11, mas não traz números). Uniforme: titular verde com calção branco (Palmeiras era o mandante; kit da Wikipedia).
  {
    id: 'palmeiras-1999',
    time: 'Palmeiras',
    jogo: 'Palmeiras 2x1 Deportivo Cali',
    quando: 'Final da Libertadores 1999 · 2º jogo (4x3 nos pênaltis)',
    nivel: 'médio',
    esquema: '4-4-2',
    camisa: { cor: '#1d6b3c', detalhe: '#f4f4f4', numero: '#f4f4f4', calcao: '#f4f4f4' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Marcos', 12, 'GOL', 'BRA', 'São Marcos', 'Sao Marcos'),
      j('Júnior Baiano', 3, 'ZAG', 'BRA', 'Junior Baiano', 'Baiano'),
      j('Roque Júnior', 5, 'ZAG', 'BRA', 'Roque Junior', 'Roque'),
      j('César Sampaio', 8, 'VOL', 'BRA', 'Cesar Sampaio', 'Sampaio'),
      j('Rogério', 16, 'VOL', 'BRA', 'Rogerio'),
      j('Oséas', 9, 'ATA', 'BRA', 'Oseas'),
    ],
    frente: [
      j('Arce', 2, 'LAT', 'PAR', 'Francisco Arce', 'Francisco Javier Arce'),
      j('Júnior', 6, 'LAT', 'BRA', 'Junior'),
      j('Alex', 10, 'MEI', 'BRA'),
      j('Zinho', 11, 'MEI', 'BRA'),
      j('Paulo Nunes', 7, 'ATA', 'BRA', 'Nunes'),
    ],
    fonte: 'Ficha oficial CONMEBOL, final da Libertadores 16/06/1999 (Palestra Itália); site oficial do Palmeiras; Wikipedia "1999 Copa Libertadores finals"',
  },
  // FONTES: https://en.wikipedia.org/wiki/1998_Copa_Libertadores_finals (cita a ficha CONMEBOL, link morto) | https://www.ogol.com.br/jogo/1998-08-26-barcelona-sc-vasco/1104261 | https://netvasco.com.br/historia/decisoes/Sumula19980826.html (titulares, sem números) | https://www.netvasco.com.br/n/256721/vagner-relembra-passagem-pelo-vasco-e-conquista-da-libertadores-de-1998 (Vágner com a 10)
  // DÚVIDAS: SEM FONTE OFICIAL ONLINE. A ficha da CONMEBOL de 1998 não está mais no ar e não há cópia arquivada (procurei no web.archive.org). Titulares batem em Wikipedia, ogol e netvasco; números batem em Wikipedia e ogol (Vágner, lateral, com a 10, confirmado pelo netvasco). Uniforme: branco com faixa preta (Barcelona de amarelo; kit da Wikipedia), sem confirmação oficial.
  {
    id: 'vasco-1998',
    time: 'Vasco',
    jogo: 'Vasco 2x1 Barcelona de Guayaquil',
    quando: 'Final da Libertadores 1998 · 2º jogo, em Guayaquil',
    nivel: 'difícil',
    esquema: '4-4-2',
    camisa: { cor: '#f4f4f4', detalhe: '#111111', numero: '#111111', calcao: '#f4f4f4' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Carlos Germano', 1, 'GOL', 'BRA', 'Germano'),
      j('Odvan', 3, 'ZAG', 'BRA'),
      j('Mauro Galvão', 4, 'ZAG', 'BRA', 'Mauro Galvao', 'Galvão', 'Galvao'),
      j('Luisinho', 5, 'VOL', 'BRA'),
      j('Nasa', 8, 'VOL', 'BRA'),
      j('Luizão', 9, 'ATA', 'BRA', 'Luizao'),
    ],
    frente: [
      j('Vágner', 10, 'LAT', 'BRA', 'Vagner'),
      j('Felipe', 6, 'LAT', 'BRA'),
      j('Juninho', 19, 'MEI', 'BRA', 'Juninho Pernambucano'),
      j('Pedrinho', 16, 'MEI', 'BRA'),
      j('Donizete', 7, 'ATA', 'BRA', 'Donizete Pantera', 'Pantera'),
    ],
    fonte: 'Wikipedia "1998 Copa Libertadores finals" (a partir da ficha CONMEBOL); oGol; netvasco (súmula). Sem ficha oficial online',
  },
  // FONTES: FIFA, "FIFA Club World Cup Japan 2006 – Report and Statistics" (relatório técnico oficial, Match Telegram do jogo 7; web.archive.org/web/20090920083736/http://www.fifa.com/mm/document/afdeveloping/technicaldevp/64/28/97/documentation_centre-_143916-v1-reportandstatistics-fifaclubworldcupjapan2006_28305.pdf) | https://rsssf.org/tablesf/fifa-wcc06-det.html | https://en.wikipedia.org/wiki/2006_FIFA_Club_World_Cup_final
  // DÚVIDAS: titulares e números batem na FIFA, RSSSF e Wikipedia. Esquema 4-4-2 vem do relatório técnico da FIFA ("same 4-4-2 formation in both their matches"). Uniforme: branco (o kit da Wikipedia mostra o segundo uniforme branco; a camisa retrô branca de 2026 "resgata o modelo da final"); confirmação só indireta.
  {
    id: 'inter-2006',
    time: 'Internacional',
    jogo: 'Internacional 1x0 Barcelona',
    quando: 'Final do Mundial de Clubes 2006',
    nivel: 'médio',
    esquema: '4-4-2',
    camisa: { cor: '#f4f4f4', detalhe: '#c8102e', numero: '#c8102e', calcao: '#f4f4f4' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Clemer', 1, 'GOL', 'BRA'),
      j('Índio', 3, 'ZAG', 'BRA', 'Indio'),
      j('Fabiano Eller', 4, 'ZAG', 'BRA', 'Eller'),
      j('Edinho', 8, 'VOL', 'BRA'),
      j('Wellington Monteiro', 5, 'VOL', 'BRA', 'Wellington'),
      j('Fernandão', 9, 'MEI', 'BRA', 'Fernandao'),
    ],
    frente: [
      j('Ceará', 2, 'LAT', 'BRA', 'Ceara'),
      j('Rubens Cardoso', 15, 'LAT', 'BRA', 'Rubens'),
      j('Alex', 7, 'MEI', 'BRA'),
      j('Iarley', 10, 'ATA', 'BRA'),
      j('Alexandre Pato', 11, 'ATA', 'BRA', 'Pato'),
    ],
    fonte: 'Relatório técnico oficial da FIFA, Mundial de Clubes Japão 2006 (final 17/12/2006, Yokohama); RSSSF; Wikipedia "2006 FIFA Club World Cup final"',
  },
  // FONTES: CONMEBOL, ficha oficial (estadisticas.conmebol.com/libertadores/fichas/ficha161504.html, cópia arquivada em web.archive.org/web/2014) | https://en.wikipedia.org/wiki/2013_Copa_Libertadores_finals
  // DÚVIDAS: nenhuma nos titulares e números (CONMEBOL e Wikipedia batem). Atenção: o Lance! lista Marcos Rocha e Richarlyson, mas esses são do 1º jogo. No 2º jogo jogaram Michel e Júnior César (CONMEBOL). Uniforme: listrado alvinegro com calção preto (kit da Wikipedia).
  {
    id: 'atletico-2013',
    time: 'Atlético-MG',
    jogo: 'Atlético-MG 2x0 Olimpia',
    quando: 'Final da Libertadores 2013 · 2º jogo (4x3 nos pênaltis)',
    nivel: 'médio',
    esquema: '4-2-3-1',
    camisa: { cor: '#f4f4f4', detalhe: '#111111', numero: '#111111', calcao: '#111111' },
    goleiro: { cor: '#2f7d5a', numero: '#f4f4f4' },
    atras: [
      j('Victor', 1, 'GOL', 'BRA', 'São Victor', 'Sao Victor'),
      j('Réver', 4, 'ZAG', 'BRA', 'Rever'),
      j('Leonardo Silva', 3, 'ZAG', 'BRA', 'Leo Silva', 'Léo Silva'),
      j('Pierre', 5, 'VOL', 'BRA'),
      j('Josué', 28, 'VOL', 'BRA', 'Josue'),
      j('Jô', 7, 'ATA', 'BRA', 'Jo'),
    ],
    frente: [
      j('Michel', 29, 'LAT', 'BRA', 'Michel Macedo'),
      j('Júnior César', 6, 'LAT', 'BRA', 'Junior Cesar'),
      j('Diego Tardelli', 9, 'ATA', 'BRA', 'Tardelli'),
      j('Ronaldinho', 10, 'MEI', 'BRA', 'Ronaldinho Gaúcho', 'Ronaldinho Gaucho', 'R10'),
      j('Bernard', 11, 'ATA', 'BRA'),
    ],
    fonte: 'Ficha oficial CONMEBOL, final da Libertadores 24/07/2013 (Mineirão); Wikipedia "2013 Copa Libertadores finals"',
  },
  // FONTES: flamengo.com.br, "Virada espetacular! Mengão vence o River Plate por 2 a 1 e é bicampeão da Conmebol Libertadores" (titulares) | https://en.wikipedia.org/wiki/2019_Copa_Libertadores_final (cita a ficha CONMEBOL) | https://www.fotmob.com/en-GB/matches/flamengo-vs-river-plate/399csf | https://br.soccerway.com/noticias/de-lima-a-guayaquil-flamengo-se-reformula-para-continuar-no-topo/44wi3enn
  // DÚVIDAS: a ficha oficial (Match Center da CONMEBOL e a matéria do flamengo.com.br) não abriu no WebFetch, porque a página é montada por JavaScript. Os titulares do site do clube vieram do índice do buscador. Titulares e números batem em Wikipedia e FotMob. Esquema 4-2-3-1 pelo FotMob. Pablo Marí nunca jogou pela seleção principal da Espanha: nat=ESP pelo país de nascimento. Uniforme: rubro-negro listrado com calção branco (kit da Wikipedia).
  {
    id: 'flamengo-2019',
    time: 'Flamengo',
    jogo: 'Flamengo 2x1 River Plate',
    quando: 'Final da Libertadores 2019, em Lima',
    nivel: 'fácil',
    esquema: '4-2-3-1',
    camisa: { cor: '#c8102e', detalhe: '#111111', numero: '#f4f4f4', calcao: '#f4f4f4' },
    goleiro: { cor: '#2f7d5a', numero: '#f4f4f4' },
    atras: [
      j('Diego Alves', 1, 'GOL', 'BRA'),
      j('Rodrigo Caio', 3, 'ZAG', 'BRA', 'Caio'),
      j('Pablo Marí', 24, 'ZAG', 'ESP', 'Pablo Mari', 'Marí', 'Mari'),
      j('Willian Arão', 5, 'VOL', 'BRA', 'Willian Arao', 'Arão', 'Arao'),
      j('Gerson', 15, 'VOL', 'BRA', 'Gérson'),
      j('Gabigol', 9, 'ATA', 'BRA', 'Gabriel Barbosa', 'Gabriel', 'Gabi'),
    ],
    frente: [
      j('Rafinha', 18, 'LAT', 'BRA'),
      j('Filipe Luís', 21, 'LAT', 'BRA', 'Filipe Luis', 'Filipe'),
      j('Éverton Ribeiro', 7, 'MEI', 'BRA', 'Everton Ribeiro', 'Everton'),
      j('Arrascaeta', 14, 'MEI', 'URU', 'De Arrascaeta', 'Giorgian de Arrascaeta'),
      j('Bruno Henrique', 27, 'ATA', 'BRA', 'BH'),
    ],
    fonte: 'Site oficial do Flamengo (ficha da final 23/11/2019, Lima); Wikipedia "2019 Copa Libertadores final" (a partir da ficha CONMEBOL); FotMob',
  },
  // FONTES: https://www.fluminense.com.br/noticia/historico-fluminense-vence-o-boca-juniors-e-e-campeao-da-conmebol-libertadores-2023 (ficha no site oficial do clube) | https://en.wikipedia.org/wiki/2023_Copa_Libertadores_final | https://www.fotmob.com/en-GB/matches/fluminense-vs-boca-juniors/3adfr5
  // DÚVIDAS: titulares batem no site do Fluminense, na Wikipedia e no FotMob. Números batem em Wikipedia e FotMob; o site do clube confirma a 14 do Cano. Esquema: o FotMob dá 4-2-3-1 e o Netflu fala em 4-3-3; usei o FotMob. Germán Cano nunca jogou pela seleção principal da Argentina: nat=ARG pelo país de nascimento. Uniforme: tricolor listrado com calção branco (kit da Wikipedia).
  {
    id: 'fluminense-2023',
    time: 'Fluminense',
    jogo: 'Fluminense 2x1 Boca Juniors',
    quando: 'Final da Libertadores 2023, no Maracanã',
    nivel: 'médio',
    esquema: '4-2-3-1',
    camisa: { cor: '#8a1c2b', detalhe: '#00613c', numero: '#f4f4f4', calcao: '#f4f4f4' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Fábio', 1, 'GOL', 'BRA', 'Fabio'),
      j('Nino', 33, 'ZAG', 'BRA'),
      j('Felipe Melo', 30, 'ZAG', 'BRA', 'Melo'),
      j('André', 7, 'VOL', 'BRA', 'Andre'),
      j('Martinelli', 8, 'VOL', 'BRA', 'Matheus Martinelli'),
      j('Germán Cano', 14, 'ATA', 'ARG', 'Cano', 'German Cano'),
    ],
    frente: [
      j('Samuel Xavier', 2, 'LAT', 'BRA', 'Samuel'),
      j('Marcelo', 12, 'LAT', 'BRA'),
      j('Jhon Arias', 21, 'ATA', 'COL', 'Arias', 'John Arias'),
      j('Ganso', 10, 'MEI', 'BRA', 'Paulo Henrique Ganso', 'PH Ganso'),
      j('Keno', 11, 'ATA', 'BRA'),
    ],
    fonte: 'Site oficial do Fluminense (ficha da final 04/11/2023, Maracanã); Wikipedia "2023 Copa Libertadores final"; FotMob',
  },
  // FONTES: https://botafogo.com.br/noticias/campeao-da-libertadores (ficha no site oficial do clube) | https://en.wikipedia.org/wiki/2024_Copa_Libertadores_final | https://global.espn.com/football/match/_/gameId/723106/botafogo-atletico-mg | https://www.hojeemdia.com.br/esportes/atletico/final-da-libertadores-quem-jogara-com-o-uniforme-listrado-atletico-ou-botafogo-entenda-1.1037817 (uniformes)
  // DÚVIDAS: titulares batem no site do Botafogo, na Wikipedia e na ESPN. Prévias citavam Bastos, mas quem começou foi Adryelson. Números batem em Wikipedia e ESPN. Alexander Barboza nunca jogou pela seleção principal da Argentina: nat=ARG pelo país de nascimento. Uniforme: 3º uniforme, todo branco com meião preto (o Atlético ficou com a listrada por campanha).
  {
    id: 'botafogo-2024',
    time: 'Botafogo',
    jogo: 'Botafogo 3x1 Atlético-MG',
    quando: 'Final da Libertadores 2024, em Buenos Aires',
    nivel: 'médio',
    esquema: '4-2-3-1',
    camisa: { cor: '#f4f4f4', detalhe: '#111111', numero: '#111111', calcao: '#f4f4f4' },
    goleiro: { cor: '#2f7d5a', numero: '#f4f4f4' },
    atras: [
      j('John', 12, 'GOL', 'BRA', 'John Victor'),
      j('Adryelson', 34, 'ZAG', 'BRA'),
      j('Barboza', 20, 'ZAG', 'ARG', 'Alexander Barboza'),
      j('Gregore', 26, 'VOL', 'BRA'),
      j('Marlon Freitas', 17, 'VOL', 'BRA', 'Marlon'),
      j('Igor Jesus', 99, 'ATA', 'BRA', 'Igor'),
    ],
    frente: [
      j('Vitinho', 22, 'LAT', 'BRA'),
      j('Alex Telles', 13, 'LAT', 'BRA', 'Telles'),
      j('Luiz Henrique', 7, 'ATA', 'BRA'),
      j('Almada', 18, 'MEI', 'ARG', 'Thiago Almada'),
      j('Savarino', 10, 'MEI', 'VEN', 'Jefferson Savarino'),
    ],
    fonte: 'Site oficial do Botafogo (ficha da final 30/11/2024, Monumental de Núñez); Wikipedia "2024 Copa Libertadores final"; ESPN',
  },
  // FONTES: https://uefa.com/newsfiles/UCL/2009/302813_LU.pdf (UEFA Line-ups, final 27/05/2009) | https://match.uefa.com/v5/matches/302813/lineups (API oficial UEFA) | https://en.wikipedia.org/wiki/2009_UEFA_Champions_League_final (ref [6]: UEFA Tactical Line-ups)
  // DÚVIDAS: titulares e números batem nas duas fontes. Puyol jogou de lateral-direito (diagrama UEFA), por isso LAT. Cor dos números (amarelo) é estilização plausível, não conferida.
  {
    id: 'barcelona-2009',
    time: 'Barcelona',
    jogo: 'Barcelona 2x0 Manchester United',
    quando: 'Final da Champions 2009 · Roma',
    nivel: 'fácil',
    esquema: '4-3-3',
    camisa: { cor: '#a50044', detalhe: '#1d3f8f', numero: '#f6c700', calcao: '#1d3f8f' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Víctor Valdés', 1, 'GOL', 'ESP', 'Valdés', 'Valdes', 'Victor Valdes'),
      j('Piqué', 3, 'ZAG', 'ESP', 'Pique', 'Gerard Piqué', 'Gerard Pique'),
      j('Yaya Touré', 24, 'ZAG', 'CIV', 'Touré', 'Toure', 'Yaya Toure', 'Yaya'),
      j('Busquets', 28, 'VOL', 'ESP', 'Sergio Busquets'),
      j('Henry', 14, 'ATA', 'FRA', 'Thierry Henry', 'Titi'),
      j("Eto'o", 9, 'ATA', 'CMR', 'Etoo', "Samuel Eto'o", 'Samuel Etoo'),
    ],
    frente: [
      j('Puyol', 5, 'LAT', 'ESP', 'Carles Puyol', 'Puyi'),
      j('Sylvinho', 16, 'LAT', 'BRA', 'Silvinho'),
      j('Xavi', 6, 'MEI', 'ESP', 'Xavi Hernández', 'Xavi Hernandez'),
      j('Iniesta', 8, 'MEI', 'ESP', 'Andrés Iniesta', 'Andres Iniesta'),
      j('Messi', 10, 'ATA', 'ARG', 'Lionel Messi', 'Leo Messi', 'Leo'),
    ],
    fonte: 'UEFA Line-ups oficial, final 27/05/2009 (Stadio Olimpico, Roma); Wikipedia "2009 UEFA Champions League final"',
  },
  // FONTES: https://www.uefa.com/newsfiles/UCL/2011/2003352_LU.pdf (UEFA Tactical Line-ups, 28/05/2011) | https://match.uefa.com/v5/matches/2003352/lineups (API oficial UEFA) | https://en.wikipedia.org/wiki/2011_UEFA_Champions_League_final (ref [5]: UEFA Tactical Line-ups)
  // DÚVIDAS: titulares e números batem. Uniforme: camisa titular 2010/11 listrada azul-grená, calção azul (Wikipedia, kit "fcbarcelona1011h"); cor dos números é estilização plausível.
  {
    id: 'barcelona-2011',
    time: 'Barcelona',
    jogo: 'Barcelona 3x1 Manchester United',
    quando: 'Final da Champions 2011 · Wembley',
    nivel: 'fácil',
    esquema: '4-3-3',
    camisa: { cor: '#a50044', detalhe: '#1d3f8f', numero: '#f6c700', calcao: '#1d3f8f' },
    goleiro: { cor: '#2f7d5a', numero: '#f4f4f4' },
    atras: [
      j('Víctor Valdés', 1, 'GOL', 'ESP', 'Valdés', 'Valdes', 'Victor Valdes'),
      j('Piqué', 3, 'ZAG', 'ESP', 'Pique', 'Gerard Piqué', 'Gerard Pique'),
      j('Mascherano', 14, 'ZAG', 'ARG', 'Javier Mascherano', 'Masche'),
      j('Busquets', 16, 'VOL', 'ESP', 'Sergio Busquets'),
      j('Abidal', 22, 'LAT', 'FRA', 'Éric Abidal', 'Eric Abidal'),
      j('Villa', 7, 'ATA', 'ESP', 'David Villa'),
    ],
    frente: [
      j('Daniel Alves', 2, 'LAT', 'BRA', 'Dani Alves', 'Daniel', 'Alves'),
      j('Xavi', 6, 'MEI', 'ESP', 'Xavi Hernández', 'Xavi Hernandez'),
      j('Iniesta', 8, 'MEI', 'ESP', 'Andrés Iniesta', 'Andres Iniesta'),
      j('Pedro', 17, 'ATA', 'ESP', 'Pedro Rodríguez', 'Pedro Rodriguez', 'Pedrito'),
      j('Messi', 10, 'ATA', 'ARG', 'Lionel Messi', 'Leo Messi', 'Leo'),
    ],
    fonte: 'UEFA Tactical Line-ups oficial, final 28/05/2011 (Wembley); Wikipedia "2011 UEFA Champions League final"',
  },
  // FONTES: https://www.uefa.com/newsfiles/UCL/2004/1086988_LU.pdf (UEFA Line-ups, final 25/05/2005) |https://en.wikipedia.org/wiki/2005_UEFA_Champions_League_final (ref [36]: lineups; "red home kit"; 4-4-1-1 no 1º tempo)
  // DÚVIDAS: titulares e números batem. Djimi Traoré: nascido na França, defendeu a seleção principal do Mali (MLI). Esquema 4-4-1-1 é o do 1º tempo (Hamann entrou no intervalo e mudou para 3 atrás).
  {
    id: 'liverpool-2005',
    time: 'Liverpool',
    jogo: 'Liverpool 3x3 Milan',
    quando: 'Final da Champions 2005 · Istambul, título nos pênaltis',
    nivel: 'médio',
    esquema: '4-4-1-1',
    camisa: { cor: '#d00027', detalhe: '#f4f4f4', numero: '#f4f4f4', calcao: '#d00027' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Dudek', 1, 'GOL', 'POL', 'Jerzy Dudek'),
      j('Hyypiä', 4, 'ZAG', 'FIN', 'Hyypia', 'Sami Hyypiä', 'Sami Hyypia'),
      j('Carragher', 23, 'ZAG', 'ENG', 'Jamie Carragher', 'Carra'),
      j('Xabi Alonso', 14, 'VOL', 'ESP', 'Alonso', 'Xabi'),
      j('Gerrard', 8, 'MEI', 'ENG', 'Steven Gerrard', 'Stevie G'),
      j('Baroš', 5, 'ATA', 'CZE', 'Baros', 'Milan Baroš', 'Milan Baros'),
    ],
    frente: [
      j('Finnan', 3, 'LAT', 'IRL', 'Steve Finnan', 'Stephen Finnan'),
      j('Traoré', 21, 'LAT', 'MLI', 'Traore', 'Djimi Traoré', 'Djimi Traore', 'Djimi'),
      j('Luis García', 10, 'MEI', 'ESP', 'Luis Garcia', 'Garcia'),
      j('Riise', 6, 'MEI', 'NOR', 'John Arne Riise', 'Jon Arne Riise'),
      j('Kewell', 7, 'ATA', 'AUS', 'Harry Kewell'),
    ],
    fonte: 'UEFA Line-ups oficial, final 25/05/2005 (Atatürk, Istambul); Wikipedia "2005 UEFA Champions League final"',
  },
  // FONTES: https://match.uefa.com/v5/matches/56379/lineups (API oficial UEFA, jogo 56379 = final 1998/99; página https://www.uefa.com/uefachampionsleague/match/56379/) | https://en.wikipedia.org/wiki/1999_UEFA_Champions_League_final | https://www.11v11.com/matches/manchester-united-v-bayern-m%C3%BCnchen-26-may-1999-25126/
  // DÚVIDAS: titulares e números batem (UEFA x Wikipedia). Sem PDF de súmula da UEFA para 1999; a fonte oficial é o banco de dados da UEFA (API do match centre). Esquema 4-4-2 inferido pelas posições (Giggs na direita, Blomqvist na esquerda, Beckham e Butt no meio, com Keane e Scholes suspensos). Yorke defendeu Trinidad e Tobago (TRI).
  {
    id: 'manutd-1999',
    time: 'Manchester United',
    jogo: 'Manchester United 2x1 Bayern',
    quando: 'Final da Champions 1999 · Camp Nou, a virada nos acréscimos',
    nivel: 'médio',
    esquema: '4-4-2',
    camisa: { cor: '#da1f26', detalhe: '#111111', numero: '#f4f4f4', calcao: '#f4f4f4' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Schmeichel', 1, 'GOL', 'DEN', 'Peter Schmeichel'),
      j('Stam', 6, 'ZAG', 'NED', 'Jaap Stam'),
      j('Johnsen', 5, 'ZAG', 'NOR', 'Ronny Johnsen'),
      j('Butt', 8, 'VOL', 'ENG', 'Nicky Butt'),
      j('Yorke', 19, 'ATA', 'TRI', 'Dwight Yorke'),
      j('Cole', 9, 'ATA', 'ENG', 'Andy Cole', 'Andrew Cole'),
    ],
    frente: [
      j('Gary Neville', 2, 'LAT', 'ENG', 'Neville', 'G. Neville'),
      j('Irwin', 3, 'LAT', 'IRL', 'Denis Irwin'),
      j('Beckham', 7, 'MEI', 'ENG', 'David Beckham', 'Becks'),
      j('Giggs', 11, 'MEI', 'WAL', 'Ryan Giggs'),
      j('Blomqvist', 15, 'MEI', 'SWE', 'Jesper Blomqvist'),
    ],
    fonte: 'UEFA match centre oficial (jogo 56379), final 26/05/1999 (Camp Nou); Wikipedia "1999 UEFA Champions League final"; 11v11',
  },
  // FONTES: https://www.uefa.com/newsfiles/UCL/2017/2019641_LU.pdf (UEFA Tactical Line-ups, 03/06/2017) | https://match.uefa.com/v5/matches/2019641/lineups (API oficial UEFA) | https://en.wikipedia.org/wiki/2017_UEFA_Champions_League_final (ref: UEFA Tactical Line-ups) | https://www.realmadrid.com/StaticFiles/RealMadridResponsive/especiales/en/shirts-and-kits/duodecima.html (camisa)
  // DÚVIDAS: titulares e números batem. Esquema 4-3-1-2 pelo diagrama tático da UEFA (Isco atrás de Benzema e Cristiano). Uniforme: camisa branca com detalhes roxos (site do Real Madrid); o calção aparece roxo na infobox da Wikipedia, mas outras fontes falam em branco; usei branco.
  {
    id: 'realmadrid-2017',
    time: 'Real Madrid',
    jogo: 'Real Madrid 4x1 Juventus',
    quando: 'Final da Champions 2017 · Cardiff',
    nivel: 'fácil',
    esquema: '4-3-1-2',
    camisa: { cor: '#f4f4f4', detalhe: '#6b3fa0', numero: '#6b3fa0', calcao: '#f4f4f4' },
    goleiro: { cor: '#2f7d5a', numero: '#f4f4f4' },
    atras: [
      j('Keylor Navas', 1, 'GOL', 'CRC', 'Navas', 'Keylor'),
      j('Sergio Ramos', 4, 'ZAG', 'ESP', 'Ramos'),
      j('Varane', 5, 'ZAG', 'FRA', 'Raphaël Varane', 'Raphael Varane'),
      j('Casemiro', 14, 'VOL', 'BRA'),
      j('Benzema', 9, 'ATA', 'FRA', 'Karim Benzema'),
      j('Cristiano Ronaldo', 7, 'ATA', 'POR', 'Cristiano', 'Ronaldo', 'CR7'),
    ],
    frente: [
      j('Carvajal', 2, 'LAT', 'ESP', 'Dani Carvajal', 'Daniel Carvajal'),
      j('Marcelo', 12, 'LAT', 'BRA'),
      j('Kroos', 8, 'MEI', 'GER', 'Toni Kroos'),
      j('Modrić', 19, 'MEI', 'CRO', 'Modric', 'Luka Modrić', 'Luka Modric'),
      j('Isco', 22, 'MEI', 'ESP', 'Francisco Alarcón', 'Francisco Alarcon'),
    ],
    fonte: 'UEFA Tactical Line-ups oficial, final 03/06/2017 (Cardiff); Wikipedia "2017 UEFA Champions League final"',
  },
  // FONTES: https://api.fifa.com/api/v3/live/football/17/9741/10166/97410064 (dados oficiais FIFA, jogo 64) | FIFA "Report and Statistics 2006 FIFA World Cup Germany" (relatório técnico, pág. "Final": ITA 1 BUFFON; 3 GROSSO, 5 CANNAVARO (C), 8 GATTUSO, 9 TONI, 10 TOTTI, 16 CAMORANESI, 19 ZAMBROTTA, 20 PERROTTA, 21 PIRLO, 23 MATERAZZI) cópia em https://www.ussoccerhistory.org/wp-content/uploads/2025/01/ddjn8odoi3vcgscxqds3-compressed.pdf | https://en.wikipedia.org/wiki/2006_FIFA_World_Cup_final | https://rsssf.org/tables/2006f.html
  // DÚVIDAS: nenhuma nos titulares/números. Uniforme: camisa azul, calção branco (kit da Wikipedia); cor do número e do goleiro estimadas.
  {
    id: 'italia-2006',
    time: 'Itália',
    jogo: 'Itália 1x1 França (5x3 pên.)',
    quando: 'Final da Copa do Mundo 2006',
    nivel: 'fácil',
    esquema: '4-4-1-1',
    camisa: { cor: '#2050c0', detalhe: '#d4af37', numero: '#f4f4f4', calcao: '#f4f4f4' },
    goleiro: { cor: '#3a3a3a', numero: '#f4f4f4' },
    atras: [
      j('Buffon', 1, 'GOL', 'ITA', 'Gianluigi Buffon', 'Gigi Buffon'),
      j('Cannavaro', 5, 'ZAG', 'ITA', 'Fabio Cannavaro'),
      j('Materazzi', 23, 'ZAG', 'ITA', 'Marco Materazzi'),
      j('Gattuso', 8, 'VOL', 'ITA', 'Gennaro Gattuso', 'Rino Gattuso'),
      j('Pirlo', 21, 'VOL', 'ITA', 'Andrea Pirlo'),
      j('Toni', 9, 'ATA', 'ITA', 'Luca Toni'),
    ],
    frente: [
      j('Zambrotta', 19, 'LAT', 'ITA', 'Gianluca Zambrotta'),
      j('Grosso', 3, 'LAT', 'ITA', 'Fabio Grosso'),
      // Nasceu na Argentina; defendeu a Itália.
      j('Camoranesi', 16, 'MEI', 'ITA', 'Mauro Camoranesi'),
      j('Perrotta', 20, 'MEI', 'ITA', 'Simone Perrotta'),
      j('Totti', 10, 'MEI', 'ITA', 'Francesco Totti'),
    ],
    fonte: 'Dados oficiais FIFA (api.fifa.com, jogo 64) e Relatório Técnico FIFA 2006; Wikipedia "2006 FIFA World Cup final"; RSSSF',
  },
  // FONTES: https://api.fifa.com/api/v3/live/football/17/249715/249721/300061509 (dados oficiais FIFA) | https://en.wikipedia.org/wiki/2010_FIFA_World_Cup_final | https://www.footballkitarchive.com/ms/spain-2010-world-cup-final-kit-234291/ (kit da final: azul-marinho com vermelho/amarelo)
  // DÚVIDAS: titulares/números batem. Esquema 4-2-3-1 inferido das posições da Wikipedia. Cor do número (amarelo) estimada; camisa e calção azul-marinho confirmados.
  {
    id: 'espanha-2010',
    time: 'Espanha',
    jogo: 'Espanha 1x0 Holanda',
    quando: 'Final da Copa do Mundo 2010',
    nivel: 'fácil',
    esquema: '4-2-3-1',
    camisa: { cor: '#0a1f44', detalhe: '#c8102e', numero: '#f2c230', calcao: '#0a1f44' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Casillas', 1, 'GOL', 'ESP', 'Iker Casillas', 'Iker'),
      j('Piqué', 3, 'ZAG', 'ESP', 'Pique', 'Gerard Piqué', 'Gerard Pique'),
      j('Puyol', 5, 'ZAG', 'ESP', 'Carles Puyol'),
      j('Busquets', 16, 'VOL', 'ESP', 'Sergio Busquets'),
      j('Xabi Alonso', 14, 'VOL', 'ESP', 'Xabi', 'Alonso'),
      j('Villa', 7, 'ATA', 'ESP', 'David Villa'),
    ],
    frente: [
      j('Sergio Ramos', 15, 'LAT', 'ESP', 'Ramos'),
      j('Capdevila', 11, 'LAT', 'ESP', 'Joan Capdevila'),
      j('Xavi', 8, 'MEI', 'ESP', 'Xavi Hernández', 'Xavi Hernandez', 'Xavi Hernandes'),
      j('Iniesta', 6, 'MEI', 'ESP', 'Andrés Iniesta', 'Andres Iniesta'),
      j('Pedro', 18, 'ATA', 'ESP', 'Pedro Rodríguez', 'Pedro Rodriguez', 'Pedrito'),
    ],
    fonte: 'Dados oficiais FIFA (api.fifa.com, final 11/07/2010, Joanesburgo); Wikipedia "2010 FIFA World Cup final"',
  },
  // FONTES: https://api.fifa.com/api/v3/live/football/17/251164/255959/300186501 (dados oficiais FIFA) | https://en.wikipedia.org/wiki/2014_FIFA_World_Cup_final (lineup 4-3-3; Kramer entrou no lugar de Khedira, lesionado no aquecimento; kit branco com detalhes vermelhos)
  // DÚVIDAS: nenhuma nos titulares/números. Cor do número e do goleiro estimadas.
  {
    id: 'alemanha-2014',
    time: 'Alemanha',
    jogo: 'Alemanha 1x0 Argentina',
    quando: 'Final da Copa do Mundo 2014',
    nivel: 'médio',
    esquema: '4-3-3',
    camisa: { cor: '#f4f4f4', detalhe: '#c8102e', numero: '#111111', calcao: '#f4f4f4' },
    goleiro: { cor: '#8bc34a', numero: '#111111' },
    atras: [
      j('Neuer', 1, 'GOL', 'GER', 'Manuel Neuer'),
      j('Boateng', 20, 'ZAG', 'GER', 'Jérôme Boateng', 'Jerome Boateng'),
      j('Hummels', 5, 'ZAG', 'GER', 'Mats Hummels'),
      j('Schweinsteiger', 7, 'VOL', 'GER', 'Bastian Schweinsteiger', 'Schweini'),
      // Titular de última hora: Khedira se lesionou no aquecimento.
      j('Kramer', 23, 'VOL', 'GER', 'Christoph Kramer'),
      j('Klose', 11, 'ATA', 'GER', 'Miroslav Klose'),
    ],
    frente: [
      j('Lahm', 16, 'LAT', 'GER', 'Philipp Lahm'),
      j('Höwedes', 4, 'LAT', 'GER', 'Howedes', 'Hoewedes', 'Benedikt Höwedes', 'Benedikt Howedes'),
      j('Kroos', 18, 'MEI', 'GER', 'Toni Kroos'),
      j('Özil', 8, 'MEI', 'GER', 'Ozil', 'Oezil', 'Mesut Özil', 'Mesut Ozil'),
      j('Müller', 13, 'ATA', 'GER', 'Muller', 'Mueller', 'Thomas Müller', 'Thomas Muller'),
    ],
    fonte: 'Dados oficiais FIFA (api.fifa.com, final 13/07/2014, Maracanã); Wikipedia "2014 FIFA World Cup final"',
  },
  // FONTES: https://api.fifa.com/api/v3/live/football/17/255711/285077/400128145 (dados oficiais FIFA, tática 4-3-3) | https://en.wikipedia.org/wiki/2022_FIFA_World_Cup_final
  // DÚVIDAS: nenhuma nos titulares/números. Uniforme titular listrado celeste/branco, calção preto (kit da Wikipedia).
  {
    id: 'argentina-2022',
    time: 'Argentina',
    jogo: 'Argentina 3x3 França (4x2 pên.)',
    quando: 'Final da Copa do Mundo 2022',
    nivel: 'fácil',
    esquema: '4-3-3',
    camisa: { cor: '#75aadb', detalhe: '#f4f4f4', numero: '#111111', calcao: '#111111' },
    goleiro: { cor: '#6a3fa0', numero: '#f4f4f4' },
    atras: [
      j('Emiliano Martínez', 23, 'GOL', 'ARG', 'Emiliano Martinez', 'Dibu', 'Dibu Martínez', 'Dibu Martinez', 'Martínez', 'Martinez'),
      j('Cristian Romero', 13, 'ZAG', 'ARG', 'Romero', 'Cuti Romero', 'Cuti'),
      j('Otamendi', 19, 'ZAG', 'ARG', 'Nicolás Otamendi', 'Nicolas Otamendi'),
      j('Enzo Fernández', 24, 'VOL', 'ARG', 'Enzo Fernandez', 'Enzo'),
      j('De Paul', 7, 'MEI', 'ARG', 'Rodrigo De Paul', 'Depaul'),
      j('Mac Allister', 20, 'MEI', 'ARG', 'Alexis Mac Allister', 'MacAllister'),
    ],
    frente: [
      j('Molina', 26, 'LAT', 'ARG', 'Nahuel Molina'),
      j('Tagliafico', 3, 'LAT', 'ARG', 'Nicolás Tagliafico', 'Nicolas Tagliafico'),
      j('Di María', 11, 'ATA', 'ARG', 'Di Maria', 'Ángel Di María', 'Angel Di Maria', 'Fideo'),
      j('Messi', 10, 'ATA', 'ARG', 'Lionel Messi', 'Leo Messi', 'Lio Messi'),
      j('Julián Álvarez', 9, 'ATA', 'ARG', 'Julian Alvarez', 'Álvarez', 'Alvarez', 'Araña', 'Arana'),
    ],
    fonte: 'Dados oficiais FIFA (api.fifa.com, final 18/12/2022, Lusail); Wikipedia "2022 FIFA World Cup final"',
  },
  // FONTES: https://api.fifa.com/api/v3/live/football/17/68/3467/393 (dados oficiais FIFA) | https://en.wikipedia.org/wiki/1986_FIFA_World_Cup_final (lineup: Brown líbero, Cuciuffo e Ruggeri zagueiros, Giusti e Olarticoechea alas)
  // DÚVIDAS: titulares/números batem. Esquema 3-5-2 inferido das posições da Wikipedia (Bilardo). Kit: listrado celeste/branco, calção preto, meião branco (Wikipedia); cor do número estimada.
  {
    id: 'argentina-1986',
    time: 'Argentina',
    jogo: 'Argentina 3x2 Alemanha Ocidental',
    quando: 'Final da Copa do Mundo 1986',
    nivel: 'médio',
    esquema: '3-5-2',
    camisa: { cor: '#75aadb', detalhe: '#f4f4f4', numero: '#111111', calcao: '#111111' },
    goleiro: { cor: '#5c6b73', numero: '#f4f4f4' },
    atras: [
      j('Pumpido', 18, 'GOL', 'ARG', 'Nery Pumpido'),
      j('Brown', 5, 'ZAG', 'ARG', 'José Luis Brown', 'Jose Luis Brown', 'Tata Brown'),
      j('Ruggeri', 19, 'ZAG', 'ARG', 'Oscar Ruggeri', 'Cabezón Ruggeri', 'Cabezon'),
      j('Cuciuffo', 9, 'ZAG', 'ARG', 'José Luis Cuciuffo', 'Jose Luis Cuciuffo'),
      j('Batista', 2, 'VOL', 'ARG', 'Sergio Batista', 'Checho Batista'),
      j('Valdano', 11, 'ATA', 'ARG', 'Jorge Valdano'),
    ],
    frente: [
      j('Giusti', 14, 'LAT', 'ARG', 'Ricardo Giusti'),
      j('Olarticoechea', 16, 'LAT', 'ARG', 'Julio Olarticoechea', 'Vasco Olarticoechea'),
      j('Enrique', 12, 'MEI', 'ARG', 'Héctor Enrique', 'Hector Enrique', 'Negro Enrique'),
      j('Burruchaga', 7, 'MEI', 'ARG', 'Jorge Burruchaga', 'Burru'),
      j('Maradona', 10, 'MEI', 'ARG', 'Diego Maradona', 'Diego Armando Maradona', 'Diego', 'Pelusa'),
    ],
    fonte: 'Dados oficiais FIFA (api.fifa.com, final 29/06/1986, Estádio Azteca); Wikipedia "1986 FIFA World Cup final"',
  },
  // FONTES: https://api.fifa.com/api/v3/live/football/17/1013/1027/8788 (dados oficiais FIFA) | https://en.wikipedia.org/wiki/1998_FIFA_World_Cup_final
  // DÚVIDAS: titulares/números batem. Esquema 4-3-2-1 (Zidane e Djorkaeff atrás de Guivarc'h) é leitura clássica do jogo, não consta da FIFA (que traz posições genéricas). Kit: azul, calção branco, meião vermelho (Wikipedia).
  {
    id: 'franca-1998',
    time: 'França',
    jogo: 'França 3x0 Brasil',
    quando: 'Final da Copa do Mundo 1998',
    nivel: 'médio',
    esquema: '4-3-2-1',
    camisa: { cor: '#1a2fa8', detalhe: '#e1001a', numero: '#f4f4f4', calcao: '#f4f4f4' },
    goleiro: { cor: '#5c6b73', numero: '#f4f4f4' },
    atras: [
      j('Barthez', 16, 'GOL', 'FRA', 'Fabien Barthez'),
      j('Desailly', 8, 'ZAG', 'FRA', 'Marcel Desailly'),
      j('Leboeuf', 18, 'ZAG', 'FRA', 'Frank Leboeuf', 'Lebœuf'),
      j('Deschamps', 7, 'VOL', 'FRA', 'Didier Deschamps'),
      j('Petit', 17, 'VOL', 'FRA', 'Emmanuel Petit', 'Manu Petit'),
      // Nasceu na Nova Caledônia; defendeu a França.
      j('Karembeu', 19, 'VOL', 'FRA', 'Christian Karembeu'),
    ],
    frente: [
      j('Thuram', 15, 'LAT', 'FRA', 'Lilian Thuram'),
      j('Lizarazu', 3, 'LAT', 'FRA', 'Bixente Lizarazu'),
      j('Zidane', 10, 'MEI', 'FRA', 'Zinedine Zidane', 'Zizou'),
      j('Djorkaeff', 6, 'MEI', 'FRA', 'Youri Djorkaeff'),
      j("Guivarc'h", 9, 'ATA', 'FRA', 'Guivarch', 'Stéphane Guivarc\'h', 'Stephane Guivarch'),
    ],
    fonte: 'Dados oficiais FIFA (api.fifa.com, final 12/07/1998, Stade de France); Wikipedia "1998 FIFA World Cup final"',
  },
  // FONTES: https://api.fifa.com/api/v3/live/football/17/39/605/2063 (dados do match centre FIFA https://www.fifa.com/en/match-centre/match/17/39/605/2063) | https://datencenter.dfb.de/en/data-center/fifa-world-cup/1974-in-germany/final/netherlands-germany-137046 (DFB) | https://en.wikipedia.org/wiki/1974_FIFA_World_Cup_final (ref: FIFA)
  // DÚVIDAS: FIFA classifica Haan como meio-campo; na final jogou de zagueiro ao lado de Rijsbergen (Wikipedia: CB), usei ZAG. Esquema 4-3-3 inferido das posições. Uniforme: laranja, calção branco (Wikipedia kit).
  {
    id: 'holanda-1974',
    time: 'Holanda',
    jogo: 'Holanda 1x2 Alemanha Ocidental',
    quando: 'Final da Copa do Mundo 1974',
    nivel: 'médio',
    esquema: '4-3-3',
    camisa: { cor: '#ff6000', detalhe: '#111111', numero: '#111111', calcao: '#f4f4f4' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Jongbloed', 8, 'GOL', 'NED', 'Jan Jongbloed'),
      j('Rijsbergen', 17, 'ZAG', 'NED', 'Wim Rijsbergen'),
      j('Haan', 2, 'ZAG', 'NED', 'Arie Haan'),
      j('Jansen', 6, 'VOL', 'NED', 'Wim Jansen'),
      j('Neeskens', 13, 'MEI', 'NED', 'Johan Neeskens'),
      j('Cruyff', 14, 'ATA', 'NED', 'Johan Cruyff', 'Cruijff', 'Johan Cruijff'),
    ],
    frente: [
      j('Suurbier', 20, 'LAT', 'NED', 'Wim Suurbier'),
      j('Krol', 12, 'LAT', 'NED', 'Ruud Krol'),
      j('Van Hanegem', 3, 'MEI', 'NED', 'Wim van Hanegem', 'Hanegem'),
      j('Rep', 16, 'ATA', 'NED', 'Johnny Rep'),
      j('Rensenbrink', 15, 'ATA', 'NED', 'Rob Rensenbrink'),
    ],
    fonte: 'Match centre FIFA, final 07/07/1974 (Munique); Datencenter DFB; Wikipedia "1974 FIFA World Cup final"',
  },
  // FONTES: https://match.uefa.com/v5/matches/51668/lineups (UEFA, jogo 51668) | https://en.wikipedia.org/wiki/1995_UEFA_Champions_League_final
  // DÚVIDAS: Ajax usou o uniforme reserva (azul-marinho, Umbro 94/95) — Wikipedia kit 1F264C e champions-journal.com ("both teams wore away shirts"); detalhe vermelho/branco aproximado. Esquema: Van Gaal variava 3-4-3/4-3-3; usei 4-3-3 (Wikipedia lista Reiziger RB, F. de Boer LB, Blind e Rijkaard no miolo).
  {
    id: 'ajax-1995',
    time: 'Ajax',
    jogo: 'Ajax 1x0 Milan',
    quando: 'Final da Champions 1995',
    nivel: 'médio',
    esquema: '4-3-3',
    camisa: { cor: '#1f264c', detalhe: '#d2122e', numero: '#f4f4f4', calcao: '#1f264c' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Van der Sar', 1, 'GOL', 'NED', 'Edwin van der Sar', 'Vandersar'),
      j('Blind', 3, 'ZAG', 'NED', 'Danny Blind'),
      j('Rijkaard', 4, 'ZAG', 'NED', 'Frank Rijkaard'),
      j('Frank de Boer', 5, 'ZAG', 'NED', 'F. de Boer', 'De Boer'),
      j('Davids', 8, 'MEI', 'NED', 'Edgar Davids'),
      j('Seedorf', 6, 'MEI', 'NED', 'Clarence Seedorf'),
    ],
    frente: [
      j('Reiziger', 2, 'LAT', 'NED', 'Michael Reiziger'),
      j('Litmanen', 10, 'MEI', 'FIN', 'Jari Litmanen'),
      j('Finidi', 7, 'ATA', 'NGA', 'Finidi George', 'George'),
      j('Ronald de Boer', 9, 'ATA', 'NED', 'R. de Boer', 'De Boer'),
      j('Overmars', 11, 'ATA', 'NED', 'Marc Overmars'),
    ],
    fonte: 'UEFA (match.uefa.com, jogo 51668), final 24/05/1995 (Viena); Wikipedia "1995 UEFA Champions League final"',
  },
  // FONTES: https://match.uefa.com/v5/matches/2000488/lineups (UEFA, jogo 2000488) | https://en.wikipedia.org/wiki/2010_UEFA_Champions_League_final (ref [3]: UEFA "Tactical Line-ups" PDF)
  // DÚVIDAS: esquema 4-2-3-1 inferido das posições. Uniforme titular listrado azul/preto, calção preto (Wikipedia kit "inter0910home").
  {
    id: 'inter-2010',
    time: 'Inter',
    jogo: 'Inter 2x0 Bayern',
    quando: 'Final da Champions 2010',
    nivel: 'médio',
    esquema: '4-2-3-1',
    camisa: { cor: '#1a4fbf', detalhe: '#111111', numero: '#f4f4f4', calcao: '#111111' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Júlio César', 12, 'GOL', 'BRA', 'Julio Cesar'),
      j('Lúcio', 6, 'ZAG', 'BRA', 'Lucio'),
      j('Samuel', 25, 'ZAG', 'ARG', 'Walter Samuel'),
      j('Zanetti', 4, 'VOL', 'ARG', 'Javier Zanetti', 'Pupi'),
      j('Cambiasso', 19, 'VOL', 'ARG', 'Esteban Cambiasso', 'Cuchu'),
      j('Milito', 22, 'ATA', 'ARG', 'Diego Milito', 'Principe', 'Príncipe'),
    ],
    frente: [
      j('Maicon', 13, 'LAT', 'BRA', 'Maicon Douglas'),
      j('Chivu', 26, 'LAT', 'ROU', 'Cristian Chivu'),
      j('Eto\'o', 9, 'ATA', 'CMR', 'Samuel Eto\'o', 'Etoo', 'Samuel Etoo'),
      j('Sneijder', 10, 'MEI', 'NED', 'Wesley Sneijder', 'Sneider'),
      j('Pandev', 27, 'ATA', 'MKD', 'Goran Pandev'),
    ],
    fonte: 'UEFA (match.uefa.com, jogo 2000488), final 22/05/2010 (Madri); Wikipedia "2010 UEFA Champions League final"',
  },
  // FONTES: https://www.premierleague.com/match/12474 (dados via footballapi.pulselive.com/football/fixtures/12474, formação 4-4-2) | https://www.espn.com/soccer/lineups/_/gameId/422297
  // DÚVIDAS: Simpson e Albrighton nunca jogaram pela seleção inglesa principal; usei ENG (nacionalidade, como na própria Premier League). Wasilewski no lugar de Huth (suspenso). Uniforme titular azul, calção azul (Wikipedia "2015–16 Leicester City F.C. season", kit home); detalhe aproximado.
  {
    id: 'leicester-2016',
    time: 'Leicester',
    jogo: 'Leicester 3x1 Everton',
    quando: 'Premier League 2015-16 · o dia da taça',
    nivel: 'médio',
    esquema: '4-4-2',
    camisa: { cor: '#0a3fa8', detalhe: '#f4f4f4', numero: '#f4f4f4', calcao: '#0a3fa8' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Schmeichel', 1, 'GOL', 'DEN', 'Kasper Schmeichel'),
      j('Morgan', 5, 'ZAG', 'JAM', 'Wes Morgan'),
      j('Wasilewski', 27, 'ZAG', 'POL', 'Marcin Wasilewski'),
      j('Kanté', 14, 'VOL', 'FRA', 'Kante', 'N\'Golo Kanté', 'Ngolo Kante'),
      j('King', 10, 'MEI', 'WAL', 'Andy King'),
      j('Okazaki', 20, 'ATA', 'JPN', 'Shinji Okazaki'),
    ],
    frente: [
      j('Simpson', 17, 'LAT', 'ENG', 'Danny Simpson'),
      j('Fuchs', 28, 'LAT', 'AUT', 'Christian Fuchs'),
      j('Mahrez', 26, 'MEI', 'ALG', 'Riyad Mahrez'),
      j('Albrighton', 11, 'MEI', 'ENG', 'Marc Albrighton'),
      j('Vardy', 9, 'ATA', 'ENG', 'Jamie Vardy'),
    ],
    fonte: 'Premier League (premierleague.com, jogo 12474), 07/05/2016; ESPN (jogo 422297)',
  },
  // FONTES: https://match.uefa.com/v5/matches/2044466/lineups (UEFA, jogo 2044466; shirtColor #000080) | https://en.wikipedia.org/wiki/2025_UEFA_Champions_League_final
  // DÚVIDAS: esquema 4-3-3 inferido. Uniforme titular azul-marinho com faixa vermelha, calção marinho (Wikipedia kit psg2425h; UEFA cor #000080).
  {
    id: 'psg-2025',
    time: 'PSG',
    jogo: 'PSG 5x0 Inter',
    quando: 'Final da Champions 2025',
    nivel: 'fácil',
    esquema: '4-3-3',
    camisa: { cor: '#0a1254', detalhe: '#d8202a', numero: '#f4f4f4', calcao: '#0a1254' },
    goleiro: { cor: '#2b2b2b', numero: '#f4f4f4' },
    atras: [
      j('Donnarumma', 1, 'GOL', 'ITA', 'Gianluigi Donnarumma', 'Gigio'),
      j('Marquinhos', 5, 'ZAG', 'BRA'),
      j('Pacho', 51, 'ZAG', 'ECU', 'Willian Pacho'),
      j('Vitinha', 17, 'VOL', 'POR'),
      j('João Neves', 87, 'MEI', 'POR', 'Joao Neves', 'Neves'),
      j('Fabián Ruiz', 8, 'MEI', 'ESP', 'Fabian Ruiz', 'Fabián', 'Fabian'),
    ],
    frente: [
      j('Hakimi', 2, 'LAT', 'MAR', 'Achraf Hakimi'),
      j('Nuno Mendes', 25, 'LAT', 'POR', 'Mendes'),
      j('Doué', 14, 'ATA', 'FRA', 'Doue', 'Désiré Doué', 'Desire Doue'),
      j('Dembélé', 10, 'ATA', 'FRA', 'Dembele', 'Ousmane Dembélé', 'Ousmane Dembele'),
      j('Kvaratskhelia', 7, 'ATA', 'GEO', 'Kvara', 'Khvicha Kvaratskhelia'),
    ],
    fonte: 'UEFA (match.uefa.com, jogo 2044466), final 31/05/2025 (Munique); Wikipedia "2025 UEFA Champions League final"',
  },
  // FONTES: https://api.fifa.com/api/v3/live/football/17/84/3459/3104 (dados do match centre FIFA https://www.fifa.com/en/match-centre/match/17/84/3459/3104) | https://en.wikipedia.org/wiki/1994_FIFA_World_Cup_final (ref: FIFA)
  // DÚVIDAS: esquema 4-4-2 inferido. Uniforme amarelo, calção azul, meião branco (Wikipedia kit bra94h); cor do número aproximada.
  {
    id: 'brasil-1994',
    time: 'Brasil',
    jogo: 'Brasil 0x0 Itália',
    quando: 'Final da Copa do Mundo 1994 · nos pênaltis',
    nivel: 'fácil',
    esquema: '4-4-2',
    camisa: { cor: '#f6d21f', detalhe: '#1c8a3c', numero: '#1f4fa3', calcao: '#1f4fa3' },
    goleiro: { cor: '#5c6b73', numero: '#f4f4f4' },
    atras: [
      j('Taffarel', 1, 'GOL', 'BRA', 'Cláudio Taffarel', 'Claudio Taffarel'),
      j('Aldair', 13, 'ZAG', 'BRA'),
      j('Márcio Santos', 15, 'ZAG', 'BRA', 'Marcio Santos'),
      j('Mauro Silva', 5, 'VOL', 'BRA'),
      j('Dunga', 8, 'VOL', 'BRA'),
      j('Mazinho', 17, 'MEI', 'BRA'),
    ],
    frente: [
      j('Jorginho', 2, 'LAT', 'BRA'),
      j('Branco', 6, 'LAT', 'BRA'),
      j('Zinho', 9, 'MEI', 'BRA'),
      j('Bebeto', 7, 'ATA', 'BRA'),
      j('Romário', 11, 'ATA', 'BRA', 'Romario', 'Baixinho'),
    ],
    fonte: 'Match centre FIFA, final 17/07/1994 (Pasadena); Wikipedia "1994 FIFA World Cup final"',
  },
]
