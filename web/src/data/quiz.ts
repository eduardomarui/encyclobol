// Banco de perguntas (usado na Disputa de Pênaltis).
// Opção correta sempre no índice 0; a ordem é embaralhada no jogo.
// dif: 'facil' (cobranças) ou 'dificil' (defesas).

export type QuizQuestion = {
  q: string
  options: string[]
  correct: number
  cat: string
  dif: 'facil' | 'dificil'
}

export const quiz: QuizQuestion[] = [
  // ===== FÁCEIS (cobranças) — conhecimento popular de futebol =====
  { q: 'Qual seleção venceu a Copa do Mundo de 1958?', options: ['Brasil', 'Suécia', 'França', 'Alemanha'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1970?', options: ['Brasil', 'Itália', 'Alemanha', 'Uruguai'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1994?', options: ['Brasil', 'Itália', 'Suécia', 'Argentina'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 2002?', options: ['Brasil', 'Alemanha', 'Turquia', 'Coreia do Sul'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quantas Copas do Mundo o Brasil já venceu?', options: ['5', '4', '6', '3'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1998?', options: ['França', 'Brasil', 'Croácia', 'Itália'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 2006?', options: ['Itália', 'França', 'Alemanha', 'Portugal'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 2010?', options: ['Espanha', 'Holanda', 'Alemanha', 'Uruguai'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 2014?', options: ['Alemanha', 'Argentina', 'Brasil', 'Holanda'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 2022?', options: ['Argentina', 'França', 'Brasil', 'Croácia'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual seleção venceu a primeira Copa, em 1930?', options: ['Uruguai', 'Brasil', 'Argentina', 'Itália'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quem fez o gol da "La Mano de Dios", em 1986?', options: ['Maradona', 'Pelé', 'Kempes', 'Batistuta'], correct: 0, cat: 'Lendas', dif: 'facil' },
  { q: 'Quem é apelidado de "O Fenômeno"?', options: ['Ronaldo', 'Ronaldinho', 'Romário', 'Adriano'], correct: 0, cat: 'Lendas', dif: 'facil' },
  { q: 'Quem é chamado de "O Rei do Futebol"?', options: ['Pelé', 'Maradona', 'Garrincha', 'Zico'], correct: 0, cat: 'Lendas', dif: 'facil' },
  { q: 'Qual craque é apelidado de "La Pulga"?', options: ['Messi', 'Agüero', 'Tévez', 'Di María'], correct: 0, cat: 'Lendas', dif: 'facil' },
  { q: 'Por qual clube Pelé jogou quase toda a carreira?', options: ['Santos', 'Corinthians', 'Palmeiras', 'Flamengo'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Por qual clube Messi jogou a maior parte da carreira?', options: ['Barcelona', 'Real Madrid', 'Paris Saint-Germain', 'Manchester City'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Em que país nasceu Lionel Messi?', options: ['Argentina', 'Espanha', 'Uruguai', 'Brasil'], correct: 0, cat: 'Lendas', dif: 'facil' },
  { q: 'Por qual seleção joga Cristiano Ronaldo?', options: ['Portugal', 'Brasil', 'Espanha', 'Argentina'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'Por qual seleção joga Kylian Mbappé?', options: ['França', 'Bélgica', 'Holanda', 'Portugal'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'Por qual seleção joga Erling Haaland?', options: ['Noruega', 'Suécia', 'Dinamarca', 'Holanda'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'Qual clube inglês é os "Diabos Vermelhos"?', options: ['Manchester United', 'Liverpool', 'Arsenal', 'Chelsea'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Em que cidade fica o estádio do Maracanã?', options: ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte', 'Salvador'], correct: 0, cat: 'Estádios', dif: 'facil' },
  { q: 'O Camp Nou é o estádio de qual clube?', options: ['Barcelona', 'Real Madrid', 'Atlético de Madrid', 'Valencia'], correct: 0, cat: 'Estádios', dif: 'facil' },
  { q: 'O Santiago Bernabéu é o estádio de qual clube?', options: ['Real Madrid', 'Barcelona', 'Sevilla', 'Atlético de Madrid'], correct: 0, cat: 'Estádios', dif: 'facil' },
  { q: 'Quais países sediaram a Copa do Mundo de 2026?', options: ['Estados Unidos, México e Canadá', 'Brasil e Argentina', 'Espanha e Portugal', 'Catar'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  { q: 'Quantas seleções disputaram a Copa de 2026?', options: ['48', '32', '24', '64'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  { q: 'Quem foi o técnico do Brasil na Copa de 2026?', options: ['Carlo Ancelotti', 'Dorival Júnior', 'Tite', 'Fernando Diniz'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  { q: 'Contra qual seleção o Brasil perdeu a final de 1950?', options: ['Uruguai', 'Argentina', 'Itália', 'Suécia'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual seleção foi vice-campeã da Copa de 2018?', options: ['Croácia', 'França', 'Bélgica', 'Inglaterra'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa América de 2021?', options: ['Argentina', 'Brasil', 'Uruguai', 'Chile'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'Em qual país foi a Copa do Mundo de 2018?', options: ['Rússia', 'Catar', 'Brasil', 'Alemanha'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em qual país foi a Copa do Mundo de 2022?', options: ['Catar', 'Rússia', 'Brasil', 'África do Sul'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quem é o maior artilheiro da história da seleção brasileira?', options: ['Neymar', 'Pelé', 'Ronaldo', 'Romário'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem ganhou mais Bolas de Ouro na história?', options: ['Lionel Messi', 'Cristiano Ronaldo', 'Platini', 'Cruyff'], correct: 0, cat: 'Recordes', dif: 'facil' },
  { q: 'Quem é apelidado de "O Imperador"?', options: ['Adriano', 'Ronaldo', 'Romário', 'Bebeto'], correct: 0, cat: 'Lendas', dif: 'facil' },
  { q: 'Por qual seleção Maradona foi ídolo?', options: ['Argentina', 'Brasil', 'Uruguai', 'Itália'], correct: 0, cat: 'Lendas', dif: 'facil' },
  { q: 'Qual dupla brasileira comemorou "fazendo o nenê" em 1994?', options: ['Bebeto e Romário', 'Ronaldo e Rivaldo', 'Pelé e Tostão', 'Careca e Müller'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem treinou o Brasil no penta, em 2002?', options: ['Luiz Felipe Scolari', 'Carlos Alberto Parreira', 'Mário Zagallo', 'Tite'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual clube paulista é o "Verdão"?', options: ['Palmeiras', 'Corinthians', 'São Paulo', 'Santos'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube carioca é o "Mengão"?', options: ['Flamengo', 'Fluminense', 'Vasco', 'Botafogo'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Em qual país foi a Copa do Mundo de 1994?', options: ['Estados Unidos', 'México', 'Itália', 'Brasil'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual é a maior campeã da história das Copas do Mundo?', options: ['Brasil', 'Alemanha', 'Itália', 'Argentina'], correct: 0, cat: 'Recordes', dif: 'facil' },
  { q: 'Por qual clube italiano Cristiano Ronaldo jogou?', options: ['Juventus', 'Milan', 'Inter', 'Roma'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube revelou Neymar no Brasil?', options: ['Santos', 'São Paulo', 'Flamengo', 'Palmeiras'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quantos títulos mundiais a Argentina tem?', options: ['3', '2', '4', '1'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'Qual jogador é famoso pelo drible "Cruyff Turn"?', options: ['Johan Cruyff', 'Ruud Gullit', 'Dennis Bergkamp', 'Arjen Robben'], correct: 0, cat: 'Lendas', dif: 'facil' },
  { q: 'Por qual clube espanhol Vinícius Júnior joga?', options: ['Real Madrid', 'Barcelona', 'Atlético de Madrid', 'Sevilla'], correct: 0, cat: 'Clubes', dif: 'facil' },

  // ===== DIFÍCEIS (defesas) — história e detalhes =====
  { q: 'Qual seleção venceu a Copa do Mundo de 1934?', options: ['Itália', 'Tchecoslováquia', 'Alemanha', 'Áustria'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1938?', options: ['Itália', 'Hungria', 'Brasil', 'Alemanha'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1954?', options: ['Alemanha Ocidental', 'Hungria', 'Áustria', 'Uruguai'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1962?', options: ['Brasil', 'Tchecoslováquia', 'Chile', 'Iugoslávia'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1966?', options: ['Inglaterra', 'Alemanha', 'Portugal', 'União Soviética'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1974?', options: ['Alemanha Ocidental', 'Holanda', 'Polônia', 'Brasil'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1978?', options: ['Argentina', 'Holanda', 'Brasil', 'Itália'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1982?', options: ['Itália', 'Alemanha', 'Polônia', 'Brasil'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1986?', options: ['Argentina', 'Alemanha', 'França', 'Bélgica'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a Copa do Mundo de 1990?', options: ['Alemanha', 'Argentina', 'Itália', 'Inglaterra'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1970?', options: ['Gerd Müller', 'Pelé', 'Jairzinho', 'Riva'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1986?', options: ['Gary Lineker', 'Maradona', 'Careca', 'Butragueño'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 2002?', options: ['Ronaldo', 'Rivaldo', 'Klose', 'Vieri'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história das Copas?', options: ['Miroslav Klose', 'Ronaldo', 'Pelé', 'Gerd Müller'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem dividiu a artilharia da Copa de 1994?', options: ['Hristo Stoichkov', 'Romário', 'Roberto Baggio', 'Bebeto'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 2018?', options: ['Harry Kane', 'Mbappé', 'Lukaku', 'Cristiano Ronaldo'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem perdeu o pênalti decisivo da final de 1994?', options: ['Roberto Baggio', 'Franco Baresi', 'Massaro', 'Donadoni'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem ganhou a Bola de Ouro de 2006?', options: ['Fabio Cannavaro', 'Zidane', 'Ronaldinho', 'Henry'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem ganhou a Bola de Ouro de 2007?', options: ['Kaká', 'Cristiano Ronaldo', 'Messi', 'Drogba'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem ganhou a Bola de Ouro de 2008?', options: ['Cristiano Ronaldo', 'Messi', 'Torres', 'Iniesta'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem ganhou a Bola de Ouro de 2018?', options: ['Luka Modrić', 'Mbappé', 'Griezmann', 'Salah'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem ganhou a Bola de Ouro de 2022?', options: ['Karim Benzema', 'Messi', 'Mbappé', 'Haaland'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Qual seleção venceu a Eurocopa de 2016?', options: ['Portugal', 'França', 'Alemanha', 'Espanha'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Qual seleção venceu a Eurocopa de 2020?', options: ['Itália', 'Inglaterra', 'Espanha', 'França'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Qual seleção venceu a primeira Eurocopa, em 1960?', options: ['União Soviética', 'Iugoslávia', 'Espanha', 'França'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Qual clube tem mais títulos da Champions League?', options: ['Real Madrid', 'Milan', 'Bayern', 'Liverpool'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Qual clube venceu a primeira Copa dos Campeões, em 1956?', options: ['Real Madrid', 'Benfica', 'Milan', 'Manchester United'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história da Champions League?', options: ['Cristiano Ronaldo', 'Messi', 'Benzema', 'Raúl'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Por qual clube italiano Maradona foi ídolo?', options: ['Napoli', 'Juventus', 'Milan', 'Roma'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem treinou a Espanha campeã do mundo em 2010?', options: ['Vicente del Bosque', 'Luis Aragonés', 'Luis Enrique', 'Julen Lopetegui'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Quem treinou o Real no tri da Champions (2016-2018)?', options: ['Zinédine Zidane', 'Carlo Ancelotti', 'José Mourinho', 'Del Bosque'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história do Real Madrid?', options: ['Cristiano Ronaldo', 'Raúl', 'Benzema', 'Di Stéfano'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Por qual clube europeu Romário brilhou nos anos 90?', options: ['Barcelona', 'Real Madrid', 'Milan', 'Inter'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem goleou o Brasil por 7 a 1, em 2014?', options: ['Alemanha', 'Holanda', 'Argentina', 'França'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Em que ano foi o "Maracanaço"?', options: ['1950', '1954', '1938', '1962'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Qual clube é o maior campeão da Bundesliga?', options: ['Bayern de Munique', 'Borussia Dortmund', 'Schalke 04', 'Hamburgo'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem fez o "gol do século" contra a Inglaterra em 1986?', options: ['Maradona', 'Valdano', 'Burruchaga', 'Caniggia'], correct: 0, cat: 'Lendas', dif: 'dificil' },
  { q: 'Quem fez 13 gols numa única Copa, recorde de 1958?', options: ['Just Fontaine', 'Pelé', 'Garrincha', 'Kopa'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Em que ano Pelé marcou seu milésimo gol?', options: ['1969', '1970', '1965', '1972'], correct: 0, cat: 'Lendas', dif: 'dificil' },
  { q: 'Quantos gols Pelé marcou em Copas do Mundo?', options: ['12', '10', '14', '8'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem foi o capitão da Argentina campeã em 2022?', options: ['Lionel Messi', 'Di María', 'Agüero', 'Otamendi'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Qual seleção africana fez semifinal inédita em 2022?', options: ['Marrocos', 'Senegal', 'Gana', 'Camarões'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual goleiro foi herói do tetra do Brasil em 1994?', options: ['Taffarel', 'Dida', 'Marcos', 'Zetti'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1998?', options: ['Davor Šuker', 'Ronaldo', 'Batistuta', 'Vieri'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem fez o gol do título da Alemanha em 2014?', options: ['Mario Götze', 'Müller', 'Klose', 'Schürrle'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a Copa das Confederações de 2013?', options: ['Brasil', 'Espanha', 'Itália', 'Uruguai'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Quem foi o capitão pentacampeão do Brasil em 2002?', options: ['Cafu', 'Roberto Carlos', 'Lúcio', 'Emerson'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Qual clube é o maior campeão da Premier League?', options: ['Manchester United', 'Manchester City', 'Liverpool', 'Chelsea'], correct: 0, cat: 'Clubes', dif: 'dificil' },

  // ===== Expansão — FÁCEIS (cobranças) =====
  { q: 'Qual seleção venceu a Copa do Mundo de 2018?', options: ['França', 'Croácia', 'Bélgica', 'Inglaterra'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 2014?', options: ['Brasil', 'África do Sul', 'Rússia', 'Catar'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 2022?', options: ['Catar', 'Rússia', 'Brasil', 'Estados Unidos'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quem é o maior artilheiro da história das Copas do Mundo?', options: ['Miroslav Klose', 'Ronaldo', 'Pelé', 'Gerd Müller'], correct: 0, cat: 'Craques', dif: 'facil' },
  { q: 'Em qual clube Lionel Messi se revelou?', options: ['Barcelona', 'River Plate', 'PSG', 'Manchester City'], correct: 0, cat: 'Craques', dif: 'facil' },
  { q: 'Em que país fica o estádio do Maracanã?', options: ['Brasil', 'Argentina', 'Uruguai', 'Portugal'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem venceu a Copa América de 2021?', options: ['Argentina', 'Brasil', 'Uruguai', 'Colômbia'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'Quem venceu a Eurocopa de 2016?', options: ['Portugal', 'França', 'Alemanha', 'Espanha'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'Quantos jogadores cada time tem em campo?', options: ['11', '10', '12', '9'], correct: 0, cat: 'Regras', dif: 'facil' },
  { q: 'Quanto dura cada tempo de uma partida oficial?', options: ['45 minutos', '40 minutos', '50 minutos', '30 minutos'], correct: 0, cat: 'Regras', dif: 'facil' },
  { q: 'Quem marcou o "Gol do Século" contra a Inglaterra em 1986?', options: ['Maradona', 'Kempes', 'Valdano', 'Batistuta'], correct: 0, cat: 'Craques', dif: 'facil' },
  { q: 'Qual seleção é apelidada de "La Albiceleste"?', options: ['Argentina', 'Uruguai', 'Chile', 'Itália'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'De que país é o Boca Juniors?', options: ['Argentina', 'Brasil', 'Chile', 'Uruguai'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual craque é conhecido como "O Fenômeno"?', options: ['Ronaldo', 'Romário', 'Ronaldinho', 'Adriano'], correct: 0, cat: 'Craques', dif: 'facil' },
  { q: 'Qual clube inglês é apelidado de "The Reds"?', options: ['Liverpool', 'Everton', 'Arsenal', 'Chelsea'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem venceu a Copa do Mundo de 2006?', options: ['Itália', 'França', 'Alemanha', 'Portugal'], correct: 0, cat: 'Copas', dif: 'facil' },

  // ===== Expansão — DIFÍCEIS (defesas) =====
  { q: 'Quem venceu a Bola de Ouro de 2006?', options: ['Fabio Cannavaro', 'Zidane', 'Thierry Henry', 'Ronaldinho'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2018?', options: ['Luka Modrić', 'Cristiano Ronaldo', 'Griezmann', 'Mbappé'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2010?', options: ['Lionel Messi', 'Iniesta', 'Xavi', 'Sneijder'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quantas Bolas de Ouro Messi tinha conquistado até 2023?', options: ['8', '7', '6', '5'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa do Mundo de 1970?', options: ['Gerd Müller', 'Pelé', 'Jairzinho', 'Rivelino'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa do Mundo de 2002?', options: ['Ronaldo', 'Rivaldo', 'Klose', 'Vieri'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem marcou o gol do título da Espanha na final de 2010?', options: ['Iniesta', 'David Villa', 'Xavi', 'Fernando Torres'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o técnico do Brasil campeão do mundo em 2002?', options: ['Luiz Felipe Scolari', 'Zagallo', 'Parreira', 'Tite'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem defendeu o gol do Brasil na conquista de 1994?', options: ['Taffarel', 'Dida', 'Marcos', 'Júlio César'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem foi o capitão da Alemanha campeã em 2014?', options: ['Philipp Lahm', 'Schweinsteiger', 'Neuer', 'Müller'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Qual seleção venceu o "Maracanaço" em 1950?', options: ['Uruguai', 'Brasil', 'Argentina', 'Suécia'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem venceu a Champions de 2005, o "Milagre de Istambul"?', options: ['Liverpool', 'Milan', 'Chelsea', 'Arsenal'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual clube holandês foi tricampeão europeu nos anos 1970?', options: ['Ajax', 'PSV', 'Feyenoord', 'AZ Alkmaar'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual seleção africana chegou à semifinal da Copa de 2022?', options: ['Marrocos', 'Senegal', 'Gana', 'Camarões'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Em que ano foi disputada a primeira Copa do Mundo?', options: ['1930', '1928', '1934', '1926'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a primeira Copa do Mundo, em 1930?', options: ['Uruguai', 'Itália', 'Brasil', 'Argentina'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual clube tem mais títulos da Copa Libertadores?', options: ['Independiente', 'Boca Juniors', 'Peñarol', 'River Plate'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem venceu a Eurocopa de 2024?', options: ['Espanha', 'Inglaterra', 'França', 'Alemanha'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Quem foi o primeiro brasileiro a vencer a Bola de Ouro?', options: ['Ronaldo', 'Romário', 'Rivaldo', 'Ronaldinho'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },

  // ===== Expansão 2 — FÁCEIS (cobranças) =====
  { q: 'Em que país foi a Copa do Mundo de 2018?', options: ['Rússia', 'Brasil', 'Catar', 'Alemanha'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 1950?', options: ['Brasil', 'Uruguai', 'Suíça', 'Suécia'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quantas Copas do Mundo Pelé venceu?', options: ['3', '2', '4', '1'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual seleção é apelidada de "Azzurra"?', options: ['Itália', 'França', 'Argentina', 'Espanha'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'De que país é o River Plate?', options: ['Argentina', 'Uruguai', 'Brasil', 'Chile'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Em qual cidade fica o estádio Camp Nou?', options: ['Barcelona', 'Madri', 'Lisboa', 'Milão'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem é o craque apelidado de "CR7"?', options: ['Cristiano Ronaldo', 'Romário', 'Robinho', 'Coutinho'], correct: 0, cat: 'Craques', dif: 'facil' },
  { q: 'Em que ano a Argentina de Messi venceu a Copa do Mundo?', options: ['2022', '2018', '2014', '2010'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quanto dura a prorrogação completa de um jogo?', options: ['30 minutos', '20 minutos', '15 minutos', '45 minutos'], correct: 0, cat: 'Regras', dif: 'facil' },

  // ===== Expansão 2 — DIFÍCEIS (defesas) =====
  { q: 'Quem venceu a Bola de Ouro de 2005?', options: ['Ronaldinho', 'Lampard', 'Henry', "Eto'o"], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2007?', options: ['Kaká', 'Messi', 'Cristiano Ronaldo', 'Henry'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2008?', options: ['Cristiano Ronaldo', 'Messi', 'Fernando Torres', 'Kaká'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem ganhou a Chuteira de Ouro da Copa de 2010?', options: ['Thomas Müller', 'Diego Forlán', 'David Villa', 'Sneijder'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual clube venceu a primeira Copa Libertadores, em 1960?', options: ['Peñarol', 'Santos', 'Independiente', 'Boca Juniors'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quantos títulos de Copa do Mundo a Itália conquistou?', options: ['4', '3', '5', '2'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Quem foi o técnico do Barcelona campeão de tudo em 2009?', options: ['Pep Guardiola', 'Frank Rijkaard', 'Luis Enrique', 'Tito Vilanova'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quantos títulos da Champions tem o Milan?', options: ['7', '5', '6', '3'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Quem marcou o gol do título da Alemanha em 1990 (pênalti na final)?', options: ['Andreas Brehme', 'Lothar Matthäus', 'Rudi Völler', 'Jürgen Klinsmann'], correct: 0, cat: 'Copas', dif: 'dificil' },

  // ===== Expansão 3 — FÁCEIS (cobranças) =====
  { q: 'Quem venceu a Champions League de 2019?', options: ['Liverpool', 'Tottenham', 'Barcelona', 'Ajax'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quem venceu a Champions League de 2023?', options: ['Manchester City', 'Inter de Milão', 'Real Madrid', 'Bayern de Munique'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quem venceu a Champions League de 2024?', options: ['Real Madrid', 'Borussia Dortmund', 'Bayern de Munique', 'PSG'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Em que país é disputada a Bundesliga?', options: ['Alemanha', 'Áustria', 'Holanda', 'Suíça'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Em que país é disputada a Serie A?', options: ['Itália', 'Espanha', 'França', 'Portugal'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Em que país é disputada a LaLiga?', options: ['Espanha', 'Portugal', 'Itália', 'México'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Em que país é disputada a Premier League?', options: ['Inglaterra', 'Escócia', 'Irlanda', 'País de Gales'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'O que é um "hat-trick"?', options: ['Três gols do mesmo jogador', 'Dois gols seguidos', 'Um gol de falta', 'Defender um pênalti'], correct: 0, cat: 'Regras', dif: 'facil' },
  { q: 'Quantos pontos vale uma vitória no futebol atual?', options: ['3', '2', '1', '4'], correct: 0, cat: 'Regras', dif: 'facil' },
  { q: 'Em 2017, Neymar saiu do Barcelona para qual clube?', options: ['PSG', 'Real Madrid', 'Juventus', 'Chelsea'], correct: 0, cat: 'Craques', dif: 'facil' },
  { q: 'De que país é o clube Ajax?', options: ['Holanda', 'Bélgica', 'Alemanha', 'Dinamarca'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem venceu a Copa América de 2024?', options: ['Argentina', 'Colômbia', 'Uruguai', 'Brasil'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'Em que continente fica o Catar, sede da Copa de 2022?', options: ['Ásia', 'África', 'Europa', 'Oceania'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual clube brasileiro é apelidado de "Verdão"?', options: ['Palmeiras', 'Corinthians', 'São Paulo', 'Santos'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual clube brasileiro é apelidado de "Timão"?', options: ['Corinthians', 'Palmeiras', 'Flamengo', 'Vasco'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual clube brasileiro é apelidado de "Mengão"?', options: ['Flamengo', 'Fluminense', 'Botafogo', 'Vasco'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual clube brasileiro é apelidado de "Peixe"?', options: ['Santos', 'Cruzeiro', 'Grêmio', 'Bahia'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual seleção tem mais títulos de Copa do Mundo?', options: ['Brasil', 'Alemanha', 'Itália', 'Argentina'], correct: 0, cat: 'Copas', dif: 'facil' },

  // ===== Expansão 3 — DIFÍCEIS (defesas) =====
  { q: 'Quem venceu a Bola de Ouro de 2009?', options: ['Lionel Messi', 'Cristiano Ronaldo', 'Xavi', "Eto'o"], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2013?', options: ['Cristiano Ronaldo', 'Messi', 'Ribéry', 'Neymar'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2016?', options: ['Cristiano Ronaldo', 'Messi', 'Griezmann', 'Neymar'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2022?', options: ['Karim Benzema', 'Messi', 'Sadio Mané', 'De Bruyne'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2024?', options: ['Rodri', 'Vinícius Júnior', 'Bellingham', 'Haaland'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Champions League de 2012?', options: ['Chelsea', 'Bayern de Munique', 'Barcelona', 'Real Madrid'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Quem venceu a Champions League de 2013?', options: ['Bayern de Munique', 'Borussia Dortmund', 'Real Madrid', 'Barcelona'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Quem venceu a Champions League de 2020?', options: ['Bayern de Munique', 'PSG', 'Lyon', 'RB Leipzig'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Quem venceu a Champions League de 2021?', options: ['Chelsea', 'Manchester City', 'Real Madrid', 'PSG'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Quem venceu a Champions League de 2022?', options: ['Real Madrid', 'Liverpool', 'Manchester City', 'Villarreal'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual seleção aplicou o 7 a 1 no Brasil em 2014?', options: ['Alemanha', 'Holanda', 'Argentina', 'França'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa do Mundo de 2018?', options: ['Harry Kane', 'Mbappé', 'Griezmann', 'Lukaku'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi eleito o melhor jogador da Copa de 2022?', options: ['Messi', 'Mbappé', 'Modrić', 'Di María'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Em qual clube dos EUA Pelé jogou?', options: ['New York Cosmos', 'LA Galaxy', 'Inter Miami', 'Chicago Fire'], correct: 0, cat: 'Craques', dif: 'dificil' },
  { q: 'Em qual clube Cristiano Ronaldo jogou antes do Manchester United?', options: ['Sporting', 'Benfica', 'Porto', 'Boavista'], correct: 0, cat: 'Craques', dif: 'dificil' },
  { q: 'Qual é o único goleiro a vencer a Bola de Ouro?', options: ['Lev Yashin', 'Gianluigi Buffon', 'Oliver Kahn', 'Iker Casillas'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história da seleção argentina?', options: ['Messi', 'Batistuta', 'Maradona', 'Agüero'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história da seleção portuguesa?', options: ['Cristiano Ronaldo', 'Eusébio', 'Luís Figo', 'Pauleta'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Quantas Champions League Cristiano Ronaldo conquistou?', options: ['5', '4', '6', '3'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Quantas Champions League Messi conquistou?', options: ['4', '3', '5', '2'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual seleção foi vice-campeã da Copa de 2014?', options: ['Argentina', 'Holanda', 'Brasil', 'Alemanha'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção foi vice-campeã da Copa de 1998?', options: ['Brasil', 'Croácia', 'Holanda', 'França'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem marcou dois gols de cabeça na final da Copa de 1998?', options: ['Zidane', 'Petit', 'Henry', 'Trezeguet'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual treinador tem mais títulos da Champions League?', options: ['Carlo Ancelotti', 'Pep Guardiola', 'Zidane', 'Bob Paisley'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual clube venceu a Libertadores de 2019?', options: ['Flamengo', 'River Plate', 'Grêmio', 'Boca Juniors'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Qual clube venceu a Libertadores de 2021?', options: ['Palmeiras', 'Flamengo', 'River Plate', 'Santos'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Em que ano o Brasil conquistou o pentacampeonato?', options: ['2002', '1998', '1994', '2006'], correct: 0, cat: 'Brasil', dif: 'dificil' },

  // ===== Expansão — COPA DO MUNDO (fáceis) =====
  { q: 'Em que país foi a Copa do Mundo de 1970?', options: ['México', 'Brasil', 'Itália', 'Espanha'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 1958?', options: ['Suécia', 'Chile', 'Suíça', 'Brasil'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 1978?', options: ['Argentina', 'Brasil', 'Espanha', 'México'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 1966?', options: ['Inglaterra', 'Alemanha', 'Suíça', 'Chile'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 2010?', options: ['África do Sul', 'Brasil', 'Alemanha', 'Nigéria'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'De quantos em quantos anos acontece a Copa do Mundo?', options: ['4 anos', '2 anos', '3 anos', '5 anos'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Por qual seleção Maradona jogou as Copas?', options: ['Argentina', 'Uruguai', 'México', 'Itália'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em qual Copa Ronaldo marcou os 2 gols do título na final?', options: ['2002', '1998', '2006', '1994'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 1986?', options: ['México', 'Argentina', 'Espanha', 'Colômbia'], correct: 0, cat: 'Copas', dif: 'facil' },

  // ===== Expansão — COPA DO MUNDO (difíceis) =====
  { q: 'Quais países sediaram a Copa do Mundo de 2002?', options: ['Coreia do Sul e Japão', 'China', 'Catar', 'Austrália'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Em que país foi a Copa do Mundo de 2006?', options: ['Alemanha', 'França', 'Itália', 'Inglaterra'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Em que país foi a Copa do Mundo de 1994?', options: ['Estados Unidos', 'México', 'Canadá', 'Brasil'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem é o recordista de gols em uma única Copa (13, em 1958)?', options: ['Just Fontaine', 'Pelé', 'Klose', 'Gerd Müller'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa do Mundo de 1986?', options: ['Gary Lineker', 'Maradona', 'Careca', 'Butragueño'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa do Mundo de 1990?', options: ['Salvatore Schillaci', 'Lineker', 'Matthäus', 'Roger Milla'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa do Mundo de 2014?', options: ['James Rodríguez', 'Thomas Müller', 'Messi', 'Neymar'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa do Mundo de 2022?', options: ['Kylian Mbappé', 'Messi', 'Giroud', 'Julián Álvarez'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção foi vice-campeã da Copa de 2010?', options: ['Holanda', 'Espanha', 'Alemanha', 'Uruguai'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção foi vice-campeã da Copa de 2006?', options: ['França', 'Itália', 'Alemanha', 'Portugal'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção foi vice-campeã da Copa de 2002?', options: ['Alemanha', 'Brasil', 'Coreia do Sul', 'Turquia'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem fez um hat-trick na final da Copa de 1966?', options: ['Geoff Hurst', 'Bobby Charlton', 'Eusébio', 'Pelé'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem deu a cabeçada em Materazzi na final de 2006?', options: ['Zidane', 'Vieira', 'Makélélé', 'Henry'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem fez um hat-trick na final da Copa de 2022?', options: ['Mbappé', 'Messi', 'Di María', 'Giroud'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem marcou o gol da "Mão de Deus" em 1986?', options: ['Maradona', 'Burruchaga', 'Valdano', 'Kempes'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro do Brasil em Copas do Mundo?', options: ['Ronaldo', 'Pelé', 'Neymar', 'Romário'], correct: 0, cat: 'Copas', dif: 'dificil' },

  // ===== Lote 2 (set/2026): Copa 2026, Brasileirão/Libertadores 2025, Champions 2026, Bola de Ouro 2025 etc. — fatos verificados =====
  // ===== COPA DO MUNDO 2026 =====
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_final
  { q: 'Qual seleção venceu a Copa do Mundo de 2026?', options: ['Espanha', 'Argentina', 'França', 'Inglaterra'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_final
  { q: 'Qual seleção foi vice-campeã da Copa de 2026?', options: ['Argentina', 'França', 'Inglaterra', 'Brasil'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_final
  { q: 'Qual foi o placar da final da Copa de 2026, Espanha x Argentina?', options: ['1 a 0 para a Espanha, na prorrogação', '2 a 1 para a Espanha', '1 a 0 para a Espanha, no tempo normal', 'Empate e vitória da Espanha nos pênaltis'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_final
  { q: 'Quem marcou o gol do título da Espanha na final da Copa de 2026?', options: ['Ferran Torres', 'Lamine Yamal', 'Mikel Oyarzabal', 'Dani Olmo'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://www.espn.com/soccer/story/_/id/49397919/kylian-mbappe-wins-golden-boot-2026-world-cup-lionel-messi-goalless-final
  { q: 'Quem foi o artilheiro da Copa do Mundo de 2026?', options: ['Kylian Mbappé', 'Lionel Messi', 'Erling Haaland', 'Lamine Yamal'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/adidas-golden-boot-race-top-scorer
  { q: 'Quantos gols Mbappé marcou na Copa de 2026?', options: ['10', '8', '7', '12'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.nbcsports.com/soccer/news/2026-world-cup-award-winners-golden-boot-golden-ball-best-young-player-golden-glove
  { q: 'Quem foi eleito o melhor jogador (Bola de Ouro) da Copa de 2026?', options: ['Rodri', 'Lamine Yamal', 'Lionel Messi', 'Kylian Mbappé'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://www.nbcsports.com/soccer/news/2026-world-cup-award-winners-golden-boot-golden-ball-best-young-player-golden-glove
  { q: 'Qual goleiro recebeu a Luva de Ouro da Copa de 2026?', options: ['Unai Simón', 'Emiliano Martínez', 'Mike Maignan', 'Alisson'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.nbcsports.com/soccer/news/2026-world-cup-award-winners-golden-boot-golden-ball-best-young-player-golden-glove
  { q: 'Quem foi eleito o melhor jogador jovem da Copa de 2026?', options: ['Pau Cubarsí', 'Lamine Yamal', 'Estêvão', 'Endrick'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/copa-do-mundo/brasil-fecha-copa-em-11o-lugar-sua-segunda-pior-campanha-da-historia/
  { q: 'Qual seleção eliminou o Brasil da Copa de 2026?', options: ['Noruega', 'Japão', 'Marrocos', 'França'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://www.olympics.com/pt/noticias/copa-do-mundo-2026-brasil-noruega-estatisticas
  { q: 'Quem marcou os dois gols da Noruega na vitória por 2 a 1 sobre o Brasil em 2026?', options: ['Erling Haaland', 'Martin Ødegaard', 'Alexander Sørloth', 'Antonio Nusa'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.olympics.com/pt/noticias/copa-do-mundo-2026-brasil-noruega-estatisticas
  { q: 'Quem marcou o gol do Brasil na derrota para a Noruega na Copa de 2026?', options: ['Neymar', 'Vinícius Júnior', 'Raphinha', 'Matheus Cunha'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://pt.wikipedia.org/wiki/Copa_do_Mundo_FIFA_de_2026_%E2%80%93_Grupo_C
  { q: 'Quais foram os adversários do Brasil no Grupo C da Copa de 2026?', options: ['Marrocos, Escócia e Haiti', 'Marrocos, Sérvia e Haiti', 'Egito, Escócia e Panamá', 'Argélia, Áustria e Jordânia'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://www.cbf.com.br/selecao-brasileira/noticias/selecao-masculina/a/de-virada-brasil-derrota-japao-por-2-a-1-e-avanca-as-oitavas-da-copa-do-mundo
  { q: 'Quem o Brasil venceu de virada, por 2 a 1, nos 16 avos de final da Copa de 2026?', options: ['Japão', 'Coreia do Sul', 'Paraguai', 'Costa do Marfim'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://www.cbf.com.br/selecao-brasileira/noticias/selecao-masculina/a/de-virada-brasil-derrota-japao-por-2-a-1-e-avanca-as-oitavas-da-copa-do-mundo
  { q: 'Quem marcou os gols do Brasil na virada sobre o Japão na Copa de 2026?', options: ['Casemiro e Gabriel Martinelli', 'Vinícius Júnior e Raphinha', 'Neymar e Rodrygo', 'Matheus Cunha e Estêvão'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Ciclo_do_Brasil_na_Copa_do_Mundo_FIFA_2026
  { q: 'Quem foi o artilheiro do Brasil na Copa de 2026, com 4 gols?', options: ['Vinícius Júnior', 'Matheus Cunha', 'Neymar', 'Raphinha'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_final
  { q: 'Em qual estádio foi disputada a final da Copa de 2026?', options: ['MetLife Stadium (Nova Jersey)', 'Estádio Azteca (Cidade do México)', 'Rose Bowl (Pasadena)', 'SoFi Stadium (Los Angeles)'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/copa-do-mundo/mexico-vence-africa-do-sul-na-abertura-da-copa-do-mundo-e-quebra-tabu/
  { q: 'Em qual estádio foi o jogo de abertura da Copa de 2026?', options: ['Estádio Azteca', 'MetLife Stadium', 'Estádio Akron (Guadalajara)', 'BMO Field (Toronto)'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/copa-do-mundo/mexico-vence-africa-do-sul-na-abertura-da-copa-do-mundo-e-quebra-tabu/
  { q: 'Qual foi o resultado do jogo de abertura da Copa de 2026, México x África do Sul?', options: ['2 a 0 para o México', '1 a 1', '1 a 0 para o México', '2 a 1 para a África do Sul'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup
  { q: 'Quantos jogos teve a Copa do Mundo de 2026?', options: ['104', '64', '80', '96'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Copa_do_Mundo_FIFA_de_2026
  { q: 'Quais seleções estrearam em Copas do Mundo em 2026?', options: ['Cabo Verde, Curaçao, Jordânia e Uzbequistão', 'Cabo Verde, Haiti, Jordânia e Catar', 'Curaçao, Panamá, Uzbequistão e Gana', 'RD Congo, Jordânia, Escócia e Curaçao'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://sbtnews.sbt.com.br/noticia/mundo/curacao-conheca-menor-pais-a-se-classificar-para-a-copa-do-mundo-2026
  { q: 'Qual foi o país de menor população a disputar uma Copa do Mundo, em 2026?', options: ['Curaçao', 'Cabo Verde', 'Islândia', 'Jordânia'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.fifa.com/pt/tournaments/mens/worldcup/canadamexicousa2026/articles/franca-inglaterra-resumo-melhores-momentos-bronze-terceiro-lugar
  { q: 'Qual seleção ficou em terceiro lugar na Copa de 2026?', options: ['Inglaterra', 'França', 'Marrocos', 'Noruega'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://www.fifa.com/pt/tournaments/mens/worldcup/canadamexicousa2026/articles/franca-inglaterra-resumo-melhores-momentos-bronze-terceiro-lugar
  { q: 'Qual foi o placar da disputa de terceiro lugar da Copa de 2026, Inglaterra x França?', options: ['6 a 4', '2 a 1', '3 a 3, com pênaltis', '4 a 2'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/copa-do-mundo/copa-do-mundo-paraguai-surpreende-e-elimina-alemanha-nos-penaltis/
  { q: 'Qual seleção eliminou a Alemanha nos pênaltis, nos 16 avos da Copa de 2026?', options: ['Paraguai', 'Marrocos', 'Japão', 'Colômbia'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Maple,_Zayu_e_Clutch
  { q: 'Quais são os mascotes da Copa do Mundo de 2026?', options: ['Maple, Zayu e Clutch', 'Fuleco, Zabivaka e La\'eeb', 'Striker, Footix e Pique', 'Juanito, Gauchito e Naranjito'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/List_of_FIFA_World_Cup_official_match_balls
  { q: 'Qual é o nome da bola oficial da Copa de 2026?', options: ['Trionda', 'Al Rihla', 'Brazuca', 'Jabulani'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/copa-do-mundo/premiacao-da-copa-do-mundo-de-2026-acompanhe-os-vencedores/
  { q: 'Quem se tornou, em 2026, o maior artilheiro da história das Copas do Mundo?', options: ['Kylian Mbappé', 'Miroslav Klose', 'Lionel Messi', 'Cristiano Ronaldo'], correct: 0, cat: 'Copa 2026', dif: 'facil' },

  // ===== BRASILEIRÃO =====
  // fonte: https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2025_-_S%C3%A9rie_A
  { q: 'Qual clube foi campeão do Brasileirão de 2025?', options: ['Flamengo', 'Palmeiras', 'Cruzeiro', 'Mirassol'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  // fonte: https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2025_-_S%C3%A9rie_A
  { q: 'Quem foi o artilheiro do Brasileirão de 2025, com 21 gols?', options: ['Kaio Jorge', 'Pedro', 'Vitor Roque', 'Arrascaeta'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2025_-_S%C3%A9rie_A
  { q: 'Qual clube foi vice-campeão do Brasileirão de 2025?', options: ['Palmeiras', 'Cruzeiro', 'Mirassol', 'Fluminense'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  // fonte: https://www.gazetaesportiva.com/apostas/noticias/quem-foi-rebaixado-no-brasileirao-2025-veja-classificacao-apos-a-ultima-rodada-2025
  { q: 'Quais clubes foram rebaixados no Brasileirão de 2025?', options: ['Ceará, Fortaleza, Juventude e Sport', 'Vasco, Fortaleza, Juventude e Sport', 'Ceará, Fortaleza, Santos e Vitória', 'Grêmio, Juventude, Sport e Vitória'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  // fonte: https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2025_-_S%C3%A9rie_A
  { q: 'Qual clube terminou em 4º lugar no Brasileirão de 2025, em sua estreia na Série A?', options: ['Mirassol', 'Red Bull Bragantino', 'Juventude', 'Vitória'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/brasileirao/veja-lista-dos-maiores-campeoes-do-campeonato-brasileiro/
  { q: 'Qual clube foi campeão do Brasileirão de 2024?', options: ['Botafogo', 'Palmeiras', 'Flamengo', 'Fortaleza'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/brasileirao/veja-lista-dos-maiores-campeoes-do-campeonato-brasileiro/
  { q: 'Qual clube foi campeão do Brasileirão de 2023?', options: ['Palmeiras', 'Botafogo', 'Grêmio', 'Flamengo'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/brasileirao/yuri-alberto-e-alerrandro-sao-os-artilheiros-do-brasileirao-2024/
  { q: 'Quem dividiu a artilharia do Brasileirão de 2024, com 15 gols cada?', options: ['Yuri Alberto e Alerrandro', 'Estêvão e Pedro', 'Hulk e Paulinho', 'Calleri e Germán Cano'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quem foi o artilheiro do Brasileirão de 2023, com 20 gols pelo Atlético-MG?', options: ['Paulinho', 'Tiquinho Soares', 'Luis Suárez', 'Hulk'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube tem mais títulos do Campeonato Brasileiro?', options: ['Palmeiras', 'Flamengo', 'Santos', 'Corinthians'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Quem é o maior artilheiro da história do Campeonato Brasileiro?', options: ['Roberto Dinamite', 'Zico', 'Romário', 'Fred'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube somou 90 pontos no Brasileirão de 2019, recorde da era dos 20 clubes?', options: ['Flamengo', 'Palmeiras', 'Corinthians', 'Santos'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quem marcou 34 gols no Brasileirão de 2004, recorde de uma só edição na era dos pontos corridos?', options: ['Washington', 'Gabigol', 'Fred', 'Romário'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quem foi o artilheiro do Brasileirão de 2019, com 25 gols?', options: ['Gabigol', 'Bruno Henrique', 'Gilberto', 'Everton Cebolinha'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quais são os únicos dois clubes que nunca foram rebaixados no Brasileirão?', options: ['Flamengo e São Paulo', 'Flamengo e Santos', 'São Paulo e Corinthians', 'Palmeiras e Internacional'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Em que ano o Santos foi rebaixado pela primeira vez na história?', options: ['2023', '2021', '2019', '2024'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Em que ano o Corinthians foi rebaixado para a Série B?', options: ['2007', '2005', '2009', '2012'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Em quais anos o Palmeiras foi rebaixado para a Série B?', options: ['2002 e 2012', '2004 e 2013', '2002 e 2010', '1999 e 2012'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Em que ano o Cruzeiro foi rebaixado pela primeira vez?', options: ['2019', '2018', '2021', '2016'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Em que ano o Internacional foi rebaixado pela primeira vez?', options: ['2016', '2013', '2019', '2010'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quem treinou o Cruzeiro da Tríplice Coroa de 2003?', options: ['Vanderlei Luxemburgo', 'Luiz Felipe Scolari', 'Muricy Ramalho', 'Tite'], correct: 0, cat: 'Técnicos', dif: 'dificil' },
  { q: 'Em que ano o Brasileirão passou a ser disputado por pontos corridos?', options: ['2003', '2000', '2005', '2006'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2025_-_S%C3%A9rie_A
  { q: 'Quem foi eleito o craque do Brasileirão de 2025?', options: ['Arrascaeta', 'Kaio Jorge', 'Vitor Roque', 'Pedro'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  // fonte: https://www.cbf.com.br/futebol-brasileiro/noticias/campeonato-brasileiro/a/flamengo-e-campeao-do-brasileirao-betano-2025
  { q: 'Quem era o técnico do Flamengo campeão brasileiro de 2025?', options: ['Filipe Luís', 'Tite', 'Jorge Jesus', 'Abel Ferreira'], correct: 0, cat: 'Técnicos', dif: 'facil' },
  { q: 'Quem treinou o Palmeiras bicampeão brasileiro em 2022 e 2023?', options: ['Abel Ferreira', 'Vanderlei Luxemburgo', 'Luiz Felipe Scolari', 'Cuca'], correct: 0, cat: 'Técnicos', dif: 'facil' },

  // ===== LIBERTADORES =====
  // fonte: https://pt.wikipedia.org/wiki/Copa_Libertadores_da_Am%C3%A9rica_de_2025
  { q: 'Qual clube venceu a Libertadores de 2025?', options: ['Flamengo', 'Palmeiras', 'Racing', 'LDU'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025_Copa_Libertadores_final
  { q: 'Quem marcou o gol do título do Flamengo na final da Libertadores de 2025?', options: ['Danilo', 'Arrascaeta', 'Pedro', 'Bruno Henrique'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025_Copa_Libertadores_final
  { q: 'Em que cidade foi disputada a final da Libertadores de 2025?', options: ['Lima', 'Buenos Aires', 'Montevidéu', 'Santiago'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Copa_Libertadores_da_Am%C3%A9rica_de_2025
  { q: 'Qual clube foi vice-campeão da Libertadores de 2025?', options: ['Palmeiras', 'Racing', 'River Plate', 'São Paulo'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  // fonte: https://www.conmebol.com/pt-br/noticias-pt-br/flamengo-faz-historia-e-conquista-o-quarto-titulo-da-conmebol-libertadores-2025/
  { q: 'Qual é o único clube brasileiro tetracampeão da Libertadores (até 2025)?', options: ['Flamengo', 'Palmeiras', 'São Paulo', 'Grêmio'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Copa_Libertadores_da_Am%C3%A9rica_de_2025
  { q: 'Quem dividiu a artilharia da Libertadores de 2025 com Flaco López, com 7 gols?', options: ['Adrián Martínez', 'Pedro', 'Germán Cano', 'Vitor Roque'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  // fonte: https://www.conmebol.com/pt-br/noticias-pt-br/a-gloria-eterna-e-do-botafogo/
  { q: 'Qual clube venceu a Libertadores de 2024?', options: ['Botafogo', 'Atlético-MG', 'Palmeiras', 'River Plate'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  // fonte: https://www.conmebol.com/pt-br/noticias-pt-br/a-gloria-eterna-e-do-botafogo/
  { q: 'Quem foi o artilheiro da Libertadores de 2024, com 10 gols?', options: ['Júnior Santos', 'Hulk', 'Paulinho', 'Luiz Henrique'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Qual clube venceu a Libertadores de 2023?', options: ['Fluminense', 'Boca Juniors', 'Palmeiras', 'Internacional'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Quem marcou o gol do título do Fluminense na final da Libertadores de 2023?', options: ['John Kennedy', 'Germán Cano', 'Jhon Arias', 'Keno'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Qual clube venceu a Libertadores de 2022?', options: ['Flamengo', 'Palmeiras', 'Athletico-PR', 'Estudiantes'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Quem é o maior artilheiro da história da Libertadores, com 54 gols?', options: ['Alberto Spencer', 'Pelé', 'Gabigol', 'Zico'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Qual clube brasileiro venceu a Libertadores de 2012 sem perder nenhum jogo?', options: ['Corinthians', 'Santos', 'Internacional', 'Atlético-MG'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Quem marcou o gol do título do Palmeiras na final da Libertadores de 2020, contra o Santos?', options: ['Breno Lopes', 'Rony', 'Luiz Adriano', 'Raphael Veiga'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Quem marcou o gol do título do Palmeiras na prorrogação da final da Libertadores de 2021?', options: ['Deyverson', 'Rony', 'Dudu', 'Raphael Veiga'], correct: 0, cat: 'Libertadores', dif: 'dificil' },

  // ===== CHAMPIONS / EURO =====
  // fonte: https://en.wikipedia.org/wiki/2025_UEFA_Champions_League_final
  { q: 'Quem venceu a Champions League de 2025?', options: ['PSG', 'Inter de Milão', 'Barcelona', 'Arsenal'], correct: 0, cat: 'Champions', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025_UEFA_Champions_League_final
  { q: 'Qual foi o placar da final da Champions de 2025, PSG x Inter?', options: ['5 a 0', '3 a 1', '2 a 0', '1 a 0'], correct: 0, cat: 'Champions', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2026_UEFA_Champions_League_final
  { q: 'Quem venceu a Champions League de 2026?', options: ['PSG', 'Arsenal', 'Real Madrid', 'Bayern de Munique'], correct: 0, cat: 'Champions', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2026_UEFA_Champions_League_final
  { q: 'Quem foi vice-campeão da Champions League de 2026?', options: ['Arsenal', 'Bayern de Munique', 'Liverpool', 'Barcelona'], correct: 0, cat: 'Champions', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2026_UEFA_Champions_League_final
  { q: 'Como foi decidida a final da Champions de 2026, PSG x Arsenal?', options: ['Nos pênaltis, após 1 a 1', '2 a 1 no tempo normal', '1 a 0 na prorrogação', '3 a 2 no tempo normal'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_UEFA_Champions_League_final
  { q: 'Em que cidade foi disputada a final da Champions League de 2026?', options: ['Budapeste', 'Munique', 'Madri', 'Milão'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://pt.uefa.com/uefachampionsleague/news/029d-1ec1670159ea-2d1882e6a430-1000--champions-league-top-scorer-kylian-mbappe/
  { q: 'Quem foi o artilheiro da Champions League 2025/26, com 15 gols?', options: ['Kylian Mbappé', 'Harry Kane', 'Erling Haaland', 'Julián Álvarez'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://www.uefa.com/uefachampionsleague/news/0291-1be52628e744-a25f57a62887-1000--champions-league-top-scorers-raphinha-and-serhou-guirassy-/
  { q: 'Quem dividiu a artilharia da Champions League 2024/25, com 13 gols cada?', options: ['Raphinha e Serhou Guirassy', 'Harry Kane e Lewandowski', 'Dembélé e Haaland', 'Vinícius Júnior e Mbappé'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_UEFA_Champions_League_final
  { q: 'Quem treinou o PSG bicampeão da Champions em 2025 e 2026?', options: ['Luis Enrique', 'Pep Guardiola', 'Carlo Ancelotti', 'Mikel Arteta'], correct: 0, cat: 'Técnicos', dif: 'facil' },
  { q: 'Quem marcou o gol do título do Manchester City na final da Champions de 2023?', options: ['Rodri', 'Haaland', 'De Bruyne', 'Bernardo Silva'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024_UEFA_Champions_League_final
  { q: 'Quem marcou os gols do Real Madrid na final da Champions de 2024, contra o Dortmund?', options: ['Carvajal e Vinícius Júnior', 'Bellingham e Rodrygo', 'Kroos e Vinícius Júnior', 'Joselu e Carvajal'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://pt.uefa.com/uefachampionsleague/news/0268-121596105392-0908f942a319-1000--novo-formato-para-a-champions-league-pos-2024-saiba-tudo/
  { q: 'Quantos clubes disputam a fase de liga da Champions no formato adotado em 2024/25?', options: ['36', '32', '40', '48'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://www.uefa.com/uefaeuro/history/news/028f-1b5e5c2b7b67-d5faab9be20b-1000--spain-2-1-england-late-oyarzabal-winner-earns-la-roja-reco/
  { q: 'Quem marcou o gol do título da Espanha na final da Eurocopa de 2024?', options: ['Mikel Oyarzabal', 'Nico Williams', 'Lamine Yamal', 'Dani Olmo'], correct: 0, cat: 'Euro', dif: 'dificil' },
  // fonte: https://www.uefa.com/uefaeuro/history/news/028f-1b5e5e91b6e6-b9784b9e13fb-1000--lamine-yamal-named-euro-2024-young-player-of-the-tournament/
  { q: 'Quem foi eleito o melhor jogador jovem da Eurocopa de 2024?', options: ['Lamine Yamal', 'Jude Bellingham', 'Jamal Musiala', 'Nico Williams'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Em que país foi disputada a Eurocopa de 2024?', options: ['Alemanha', 'França', 'Inglaterra', 'Itália'], correct: 0, cat: 'Euro', dif: 'facil' },

  // ===== BOLA DE OURO / THE BEST =====
  // fonte: https://en.wikipedia.org/wiki/2025_Ballon_d%27Or
  { q: 'Quem venceu a Bola de Ouro de 2025?', options: ['Ousmane Dembélé', 'Lamine Yamal', 'Vitinha', 'Mohamed Salah'], correct: 0, cat: 'Bola de Ouro', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025_Ballon_d%27Or
  { q: 'Quem ficou em segundo lugar na Bola de Ouro de 2025?', options: ['Lamine Yamal', 'Vitinha', 'Mohamed Salah', 'Raphinha'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025_Ballon_d%27Or
  { q: 'Qual brasileiro ficou em 5º lugar na Bola de Ouro de 2025?', options: ['Raphinha', 'Vinícius Júnior', 'Alisson', 'Marquinhos'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2023?', options: ['Lionel Messi', 'Erling Haaland', 'Kylian Mbappé', 'Kevin De Bruyne'], correct: 0, cat: 'Bola de Ouro', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025_Ballon_d%27Or
  { q: 'Quem venceu o Troféu Kopa (melhor jovem) na Bola de Ouro de 2025?', options: ['Lamine Yamal', 'Désiré Doué', 'Estêvão', 'Pau Cubarsí'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025_Ballon_d%27Or
  { q: 'Quem venceu o Troféu Yashin (melhor goleiro) na Bola de Ouro de 2025?', options: ['Gianluigi Donnarumma', 'Alisson', 'Thibaut Courtois', 'Emiliano Martínez'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/The_Best_FIFA_Football_Awards_2024
  { q: 'Quem venceu o prêmio The Best da FIFA de 2024?', options: ['Vinícius Júnior', 'Rodri', 'Jude Bellingham', 'Kylian Mbappé'], correct: 0, cat: 'Bola de Ouro', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/The_Best_FIFA_Football_Awards_2025
  { q: 'Quem venceu o prêmio The Best da FIFA de 2025?', options: ['Ousmane Dembélé', 'Lamine Yamal', 'Kylian Mbappé', 'Vitinha'], correct: 0, cat: 'Bola de Ouro', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/The_Best_FIFA_Football_Awards_2025
  { q: 'Quem foi eleito o melhor técnico no The Best da FIFA de 2025?', options: ['Luis Enrique', 'Hansi Flick', 'Mikel Arteta', 'Carlo Ancelotti'], correct: 0, cat: 'Técnicos', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/The_Best_FIFA_Football_Awards_2024
  { q: 'Quem foi eleito o melhor técnico no The Best da FIFA de 2024?', options: ['Carlo Ancelotti', 'Pep Guardiola', 'Xabi Alonso', 'Luis Enrique'], correct: 0, cat: 'Técnicos', dif: 'dificil' },

  // ===== COPAS ANTIGAS =====
  { q: 'Qual foi o placar da final da Copa de 1930, Uruguai x Argentina?', options: ['4 a 2', '2 a 1', '3 a 1', '1 a 0'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual goleiro foi eleito o melhor jogador da Copa de 2002?', options: ['Oliver Kahn', 'Marcos', 'Rüştü Reçber', 'Iker Casillas'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual brasileiro foi o artilheiro da Copa de 1938?', options: ['Leônidas da Silva', 'Ademir', 'Zizinho', 'Romeu'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1950?', options: ['Ademir', 'Zizinho', 'Ghiggia', 'Schiaffino'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1954, com 11 gols?', options: ['Sándor Kocsis', 'Ferenc Puskás', 'Fritz Walter', 'Helmut Rahn'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção a Alemanha Ocidental venceu na final de 1954, o "Milagre de Berna"?', options: ['Hungria', 'Áustria', 'Uruguai', 'Brasil'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual foi o placar da final da Copa de 1958, Brasil x Suécia?', options: ['5 a 2', '4 a 2', '3 a 1', '2 a 0'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quem foi o artilheiro da Copa de 1966, com 9 gols?', options: ['Eusébio', 'Bobby Charlton', 'Geoff Hurst', 'Franz Beckenbauer'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual foi o placar da final da Copa de 1970, Brasil x Itália?', options: ['4 a 1', '3 a 1', '2 a 1', '4 a 2'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual cachorro encontrou a taça Jules Rimet, roubada antes da Copa de 1966?', options: ['Pickles', 'Rex', 'Bobby', 'Laika'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1978?', options: ['Mario Kempes', 'Teófilo Cubillas', 'Rob Rensenbrink', 'Paolo Rossi'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1982?', options: ['Paolo Rossi', 'Zico', 'Karl-Heinz Rummenigge', 'Falcão'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual goleiro foi campeão do mundo aos 40 anos, como capitão da Itália em 1982?', options: ['Dino Zoff', 'Gianluigi Buffon', 'Walter Zenga', 'Gianluca Pagliuca'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual era o mascote da Copa do Mundo de 2014?', options: ['Fuleco', 'Zakumi', 'Zabivaka', 'Pique'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual era o mascote da Copa do Mundo de 1998?', options: ['Footix', 'Ciao', 'Striker', 'Goleo'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual era o nome da bola oficial da Copa de 2010?', options: ['Jabulani', 'Brazuca', 'Teamgeist', 'Fevernova'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual foi a primeira bola oficial de Copa produzida pela Adidas, em 1970?', options: ['Telstar', 'Tango', 'Azteca', 'Questra'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem é o jogador mais velho a marcar em Copas, aos 42 anos, em 1994?', options: ['Roger Milla', 'Dino Zoff', 'Pat Jennings', 'Faryd Mondragón'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem marcou 5 gols em um só jogo de Copa, contra Camarões em 1994?', options: ['Oleg Salenko', 'Hristo Stoichkov', 'Romário', 'Jürgen Klinsmann'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem marcou o gol mais rápido da história das Copas, aos 11 segundos, em 2002?', options: ['Hakan Şükür', 'Ronaldo', 'Miroslav Klose', 'Rivaldo'], correct: 0, cat: 'Copas', dif: 'dificil' },

  // ===== CLUBES / ÍDOLOS BRASILEIROS =====
  { q: 'Quem é o maior artilheiro da história do Flamengo?', options: ['Zico', 'Gabigol', 'Romário', 'Nunes'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem é o maior artilheiro da história do Vasco?', options: ['Roberto Dinamite', 'Romário', 'Edmundo', 'Ademir'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem é o maior artilheiro da história do Corinthians?', options: ['Cláudio', 'Marcelinho Carioca', 'Sócrates', 'Rivellino'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história do São Paulo?', options: ['Serginho Chulapa', 'Rogério Ceni', 'Luis Fabiano', 'Raí'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história do Palmeiras?', options: ['Heitor', 'Ademir da Guia', 'Evair', 'Dudu'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história do Cruzeiro?', options: ['Tostão', 'Dirceu Lopes', 'Alex', 'Marcelo Moreno'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história do Atlético-MG?', options: ['Reinaldo', 'Hulk', 'Dadá Maravilha', 'Éder'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história do Grêmio?', options: ['Alcindo', 'Renato Gaúcho', 'Luis Suárez', 'Jardel'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem marcou dois gols na vitória do Flamengo por 3 a 0 sobre o Liverpool, no Mundial de 1981?', options: ['Nunes', 'Zico', 'Adílio', 'Tita'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem marcou os dois gols do Grêmio sobre o Hamburgo no Mundial de 1983?', options: ['Renato Gaúcho', 'Tarciso', 'Caio', 'Paulo Isidoro'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem marcou os dois gols do São Paulo sobre o Barcelona no Mundial de 1992?', options: ['Raí', 'Müller', 'Palhinha', 'Cafu'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem marcou o gol do São Paulo sobre o Liverpool no Mundial de 2005?', options: ['Mineiro', 'Amoroso', 'Luizão', 'Danilo'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem marcou o gol do Internacional sobre o Barcelona no Mundial de 2006?', options: ['Adriano Gabiru', 'Fernandão', 'Iarley', 'Alexandre Pato'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem marcou o gol do Corinthians sobre o Chelsea no Mundial de 2012?', options: ['Paolo Guerrero', 'Emerson Sheik', 'Paulinho', 'Danilo'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem o Corinthians venceu nos pênaltis na final do Mundial de 2000?', options: ['Vasco', 'Real Madrid', 'Manchester United', 'Necaxa'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube tem mais títulos da Copa do Brasil?', options: ['Cruzeiro', 'Grêmio', 'Palmeiras', 'Flamengo'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Final_da_Copa_do_Brasil_de_Futebol_de_2025
  { q: 'Qual clube venceu a Copa do Brasil de 2025?', options: ['Corinthians', 'Vasco', 'Flamengo', 'Fluminense'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual é o nome oficial do Maracanã?', options: ['Estádio Jornalista Mário Filho', 'Estádio Nilton Santos', 'Estádio Cícero Pompeu de Toledo', 'Estádio Governador Magalhães Pinto'], correct: 0, cat: 'Estádios', dif: 'facil' },
  { q: 'Qual estádio tem o nome oficial de Cícero Pompeu de Toledo?', options: ['Morumbi', 'Pacaembu', 'Mineirão', 'Beira-Rio'], correct: 0, cat: 'Estádios', dif: 'dificil' },

  // ===== SELEÇÃO BRASILEIRA =====
  { q: 'Quem foi o capitão do Brasil no tetra de 1994?', options: ['Dunga', 'Romário', 'Taffarel', 'Branco'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem é o único jogador a disputar três finais de Copa do Mundo?', options: ['Cafu', 'Pelé', 'Ronaldo', 'Roberto Carlos'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem é o mais jovem campeão do mundo da história, aos 17 anos, em 1958?', options: ['Pelé', 'Garrincha', 'Ronaldo', 'Vavá'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem foi o primeiro a ser campeão do mundo como jogador e como técnico?', options: ['Mário Zagallo', 'Telê Santana', 'Carlos Alberto Parreira', 'Luiz Felipe Scolari'], correct: 0, cat: 'Técnicos', dif: 'dificil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/selecao-brasileira/treinadores-estrangeiros-selecao-brasileira/
  { q: 'Antes de Ancelotti, quem foi o último técnico estrangeiro a dirigir o Brasil, em 1965?', options: ['Filpo Núñez', 'Otto Glória', 'Béla Guttmann', 'Jorge Jesus'], correct: 0, cat: 'Técnicos', dif: 'dificil' },
  { q: 'Quem o Brasil venceu na final da Copa América de 2019?', options: ['Peru', 'Argentina', 'Chile', 'Colômbia'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Quem foi eleito o melhor jogador da Copa América de 2019?', options: ['Dani Alves', 'Everton Cebolinha', 'Gabriel Jesus', 'Alisson'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Quem o Brasil venceu por 3 a 0 na final da Copa América de 2007?', options: ['Argentina', 'Uruguai', 'México', 'Chile'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Quantos títulos de Copa América o Brasil tem (até 2025)?', options: ['9', '10', '8', '15'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Quantas Copas das Confederações o Brasil venceu?', options: ['4', '3', '5', '2'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem converteu o pênalti decisivo do primeiro ouro olímpico do Brasil, em 2016?', options: ['Neymar', 'Gabriel Jesus', 'Renato Augusto', 'Marquinhos'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem o Brasil venceu na final olímpica de 2016, no Maracanã?', options: ['Alemanha', 'Argentina', 'México', 'Nigéria'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem marcou o gol do bicampeonato olímpico do Brasil na prorrogação da final de Tóquio 2020?', options: ['Malcom', 'Richarlison', 'Matheus Cunha', 'Antony'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem o Brasil venceu na final olímpica de Tóquio 2020?', options: ['Espanha', 'México', 'Alemanha', 'Japão'], correct: 0, cat: 'Brasil', dif: 'facil' },
  // fonte: https://www.lance.com.br/selecao-brasileira/uruguai-vence-nos-penaltis-apos-jogo-ruim-e-selecao-brasileira-esta-eliminada-da-copa-america.html
  { q: 'Quem eliminou o Brasil nos pênaltis, nas quartas da Copa América de 2024?', options: ['Uruguai', 'Colômbia', 'Argentina', 'Venezuela'], correct: 0, cat: 'Copa América', dif: 'dificil' },

  // ===== LENDAS / APELIDOS / RECORDES =====
  { q: 'Qual craque é o "Galinho de Quintino"?', options: ['Zico', 'Júnior', 'Leandro', 'Adílio'], correct: 0, cat: 'Apelidos', dif: 'facil' },
  { q: 'Qual craque ficou conhecido como a "Alegria do Povo"?', options: ['Garrincha', 'Pelé', 'Didi', 'Nilton Santos'], correct: 0, cat: 'Apelidos', dif: 'facil' },
  { q: 'Qual craque era chamado de "Pantera Negra"?', options: ['Eusébio', 'Pelé', 'Roger Milla', 'George Weah'], correct: 0, cat: 'Apelidos', dif: 'dificil' },
  { q: 'Qual craque alemão é o "Kaiser"?', options: ['Franz Beckenbauer', 'Gerd Müller', 'Lothar Matthäus', 'Sepp Maier'], correct: 0, cat: 'Apelidos', dif: 'facil' },
  { q: 'Qual atacante alemão era chamado de "Der Bomber"?', options: ['Gerd Müller', 'Miroslav Klose', 'Karl-Heinz Rummenigge', 'Jürgen Klinsmann'], correct: 0, cat: 'Apelidos', dif: 'facil' },
  { q: 'Qual craque italiano era o "Il Divin Codino"?', options: ['Roberto Baggio', 'Francesco Totti', 'Alessandro Del Piero', 'Andrea Pirlo'], correct: 0, cat: 'Apelidos', dif: 'dificil' },
  { q: 'Qual argentino era chamado de "El Matador"?', options: ['Mario Kempes', 'Gabriel Batistuta', 'Diego Maradona', 'Daniel Passarella'], correct: 0, cat: 'Apelidos', dif: 'dificil' },
  { q: 'Qual atacante argentino é conhecido como "Batigol"?', options: ['Gabriel Batistuta', 'Hernán Crespo', 'Claudio Caniggia', 'Mario Kempes'], correct: 0, cat: 'Apelidos', dif: 'facil' },
  { q: 'Qual craque brasileiro era chamado de "Doutor", por ser formado em Medicina?', options: ['Sócrates', 'Zico', 'Falcão', 'Casagrande'], correct: 0, cat: 'Apelidos', dif: 'facil' },
  { q: 'Qual brasileiro ficou conhecido como o "Rei de Roma"?', options: ['Falcão', 'Toninho Cerezo', 'Júnior', 'Zico'], correct: 0, cat: 'Apelidos', dif: 'dificil' },
  { q: 'Qual goleiro é o maior artilheiro da história entre os goleiros, com 131 gols?', options: ['Rogério Ceni', 'José Luis Chilavert', 'René Higuita', 'Marcos'], correct: 0, cat: 'Recordes', dif: 'facil' },
  { q: 'Qual foi a transferência mais cara da história, por 222 milhões de euros, em 2017?', options: ['Neymar, para o PSG', 'Mbappé, para o PSG', 'Coutinho, para o Barcelona', 'João Félix, para o Atlético de Madrid'], correct: 0, cat: 'Recordes', dif: 'facil' },
  // fonte: https://www.espn.com/soccer/story/_/id/49338924/fifa-world-cup-2026-stats-lionel-messi-new-record-kylian-mbappe-julian-alvarez-tie-diego-maradona-jude-bellingham-second-pele
  { q: 'Quem detém o recorde de partidas disputadas em Copas do Mundo?', options: ['Lionel Messi', 'Lothar Matthäus', 'Cristiano Ronaldo', 'Miroslav Klose'], correct: 0, cat: 'Recordes', dif: 'dificil' },
]
