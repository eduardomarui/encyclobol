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
  { q: 'De qual país é Cristiano Ronaldo?', options: ['Portugal', 'Brasil', 'Espanha', 'Argentina'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'De qual país é Kylian Mbappé?', options: ['França', 'Bélgica', 'Holanda', 'Portugal'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'De qual país é Erling Haaland?', options: ['Noruega', 'Suécia', 'Dinamarca', 'Holanda'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'Qual clube inglês é os "Diabos Vermelhos"?', options: ['Manchester United', 'Liverpool', 'Arsenal', 'Chelsea'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Em que cidade fica o estádio do Maracanã?', options: ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte', 'Salvador'], correct: 0, cat: 'Estádios', dif: 'facil' },
  { q: 'O Camp Nou é o estádio de qual clube?', options: ['Barcelona', 'Real Madrid', 'Atlético de Madrid', 'Valencia'], correct: 0, cat: 'Estádios', dif: 'facil' },
  { q: 'O Santiago Bernabéu é o estádio de qual clube?', options: ['Real Madrid', 'Barcelona', 'Sevilla', 'Atlético de Madrid'], correct: 0, cat: 'Estádios', dif: 'facil' },
  { q: 'Quais países sediaram a Copa do Mundo de 2026?', options: ['Estados Unidos, México e Canadá', 'Estados Unidos e Canadá', 'Estados Unidos, México e Costa Rica', 'México e Canadá'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  { q: 'Quantas seleções disputaram a Copa de 2026?', options: ['48', '32', '24', '64'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  { q: 'Quem foi o técnico do Brasil na Copa de 2026?', options: ['Carlo Ancelotti', 'Dorival Júnior', 'Tite', 'Fernando Diniz'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  { q: 'Qual seleção foi vice-campeã da Copa de 2018?', options: ['Croácia', 'França', 'Bélgica', 'Inglaterra'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa América de 2021?', options: ['Argentina', 'Brasil', 'Uruguai', 'Chile'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Em qual país foi a Copa do Mundo de 2018?', options: ['Rússia', 'Catar', 'Brasil', 'Alemanha'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em qual país foi a Copa do Mundo de 2022?', options: ['Catar', 'Rússia', 'Brasil', 'África do Sul'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Pela contagem da FIFA, quem mais marcou pelo Brasil?', options: ['Neymar', 'Pelé', 'Ronaldo', 'Romário'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem ganhou mais Bolas de Ouro na história?', options: ['Lionel Messi', 'Cristiano Ronaldo', 'Platini', 'Cruyff'], correct: 0, cat: 'Recordes', dif: 'facil' },
  { q: 'Quem é apelidado de "O Imperador"?', options: ['Adriano', 'Ronaldo', 'Romário', 'Bebeto'], correct: 0, cat: 'Lendas', dif: 'facil' },
  { q: 'Quem criou a comemoração "embalando o neném", no gol contra a Holanda na Copa de 1994?', options: ['Bebeto', 'Branco', 'Dunga', 'Raí'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem treinou o Brasil no penta, em 2002?', options: ['Luiz Felipe Scolari', 'Carlos Alberto Parreira', 'Mário Zagallo', 'Tite'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual clube paulista é o "Verdão"?', options: ['Palmeiras', 'Corinthians', 'São Paulo', 'Santos'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube carioca é o "Mengão"?', options: ['Flamengo', 'Fluminense', 'Vasco', 'Botafogo'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Em qual país foi a Copa do Mundo de 1994?', options: ['Estados Unidos', 'México', 'Itália', 'Brasil'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual é a maior campeã da história das Copas do Mundo?', options: ['Brasil', 'Alemanha', 'Itália', 'Argentina'], correct: 0, cat: 'Recordes', dif: 'facil' },
  { q: 'Por qual clube italiano Cristiano Ronaldo jogou?', options: ['Juventus', 'Milan', 'Inter', 'Roma'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube revelou Neymar no Brasil?', options: ['Santos', 'São Paulo', 'Flamengo', 'Palmeiras'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quantos títulos mundiais a Argentina tem?', options: ['3', '2', '4', '1'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'Qual jogador é famoso pelo drible "Cruyff Turn"?', options: ['Johan Cruyff', 'Ruud Gullit', 'Dennis Bergkamp', 'Arjen Robben'], correct: 0, cat: 'Lendas', dif: 'facil' },
  { q: 'Por qual clube espanhol Vinícius Júnior estreou na Europa, em 2018?', options: ['Real Madrid', 'Barcelona', 'Atlético de Madrid', 'Sevilla'], correct: 0, cat: 'Clubes', dif: 'facil' },

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
  { q: 'Quem era o maior artilheiro das Copas (16 gols) até ser superado em 2026?', options: ['Miroslav Klose', 'Ronaldo', 'Pelé', 'Gerd Müller'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem dividiu com Salenko a artilharia da Copa de 1994?', options: ['Hristo Stoichkov', 'Romário', 'Roberto Baggio', 'Bebeto'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 2018?', options: ['Harry Kane', 'Mbappé', 'Lukaku', 'Cristiano Ronaldo'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem perdeu o pênalti decisivo da final de 1994?', options: ['Roberto Baggio', 'Franco Baresi', 'Massaro', 'Donadoni'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção venceu a Eurocopa de 2016?', options: ['Portugal', 'França', 'Alemanha', 'Espanha'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Qual seleção venceu a primeira Eurocopa, em 1960?', options: ['União Soviética', 'Iugoslávia', 'Espanha', 'França'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Qual clube tem mais títulos da Champions League?', options: ['Real Madrid', 'Milan', 'Bayern', 'Liverpool'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube venceu a primeira Copa dos Campeões, em 1956?', options: ['Real Madrid', 'Benfica', 'Milan', 'Manchester United'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história da Champions League?', options: ['Cristiano Ronaldo', 'Messi', 'Benzema', 'Raúl'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Por qual clube italiano Maradona foi ídolo?', options: ['Napoli', 'Juventus', 'Milan', 'Roma'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem treinou a Espanha campeã do mundo em 2010?', options: ['Vicente del Bosque', 'Luis Aragonés', 'Luis Enrique', 'Julen Lopetegui'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Quem treinou o Real no tri da Champions (2016-2018)?', options: ['Zinédine Zidane', 'Carlo Ancelotti', 'José Mourinho', 'Del Bosque'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história do Real Madrid?', options: ['Cristiano Ronaldo', 'Raúl', 'Benzema', 'Di Stéfano'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Por qual clube europeu Romário brilhou nos anos 90?', options: ['Barcelona', 'Real Madrid', 'Milan', 'Inter'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem goleou o Brasil por 7 a 1, em 2014?', options: ['Alemanha', 'Holanda', 'Argentina', 'França'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Em que ano foi o "Maracanaço"?', options: ['1950', '1954', '1938', '1962'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Qual clube é o maior campeão da Bundesliga?', options: ['Bayern de Munique', 'Borussia Dortmund', 'Schalke 04', 'Hamburgo'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem fez 13 gols numa única Copa, recorde de 1958?', options: ['Just Fontaine', 'Pelé', 'Garrincha', 'Kopa'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Em que ano Pelé marcou seu milésimo gol?', options: ['1969', '1970', '1965', '1972'], correct: 0, cat: 'Lendas', dif: 'dificil' },
  { q: 'Quantos gols Pelé marcou em Copas do Mundo?', options: ['12', '10', '14', '8'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem foi o capitão da Argentina campeã em 2022?', options: ['Lionel Messi', 'Di María', 'Agüero', 'Otamendi'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Qual goleiro foi herói do tetra do Brasil em 1994?', options: ['Taffarel', 'Dida', 'Marcos', 'Zetti'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1998?', options: ['Davor Šuker', 'Ronaldo', 'Batistuta', 'Vieri'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem fez o gol do título da Alemanha em 2014?', options: ['Mario Götze', 'Müller', 'Klose', 'Schürrle'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o capitão pentacampeão do Brasil em 2002?', options: ['Cafu', 'Roberto Carlos', 'Lúcio', 'Emerson'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Qual clube é o maior campeão da Premier League?', options: ['Manchester United', 'Manchester City', 'Liverpool', 'Chelsea'], correct: 0, cat: 'Clubes', dif: 'dificil' },

  // ===== Expansão — FÁCEIS (cobranças) =====
  { q: 'Qual seleção venceu a Copa do Mundo de 2018?', options: ['França', 'Croácia', 'Bélgica', 'Inglaterra'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 2014?', options: ['Brasil', 'África do Sul', 'Rússia', 'Catar'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em qual clube Messi estreou como profissional?', options: ['Barcelona', 'River Plate', 'PSG', 'Manchester City'], correct: 0, cat: 'Craques', dif: 'facil' },
  { q: 'Qual clube é o "Tricolor do Morumbi"?', options: ['São Paulo', 'Fluminense', 'Grêmio', 'Bahia'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube mineiro é o "Galo"?', options: ['Atlético-MG', 'Cruzeiro', 'América-MG', 'Villa Nova'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube mineiro é a "Raposa"?', options: ['Cruzeiro', 'Atlético-MG', 'América-MG', 'Tombense'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem marcou o "Gol do Século" contra a Inglaterra em 1986?', options: ['Maradona', 'Kempes', 'Valdano', 'Batistuta'], correct: 0, cat: 'Craques', dif: 'facil' },
  { q: 'Qual seleção é apelidada de "La Albiceleste"?', options: ['Argentina', 'Uruguai', 'Chile', 'Itália'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'O que é um "gol olímpico"?', options: ['Gol direto de escanteio', 'Gol marcado numa Olimpíada', 'Gol do meio de campo', 'Gol de bicicleta'], correct: 0, cat: 'Regras', dif: 'facil' },
  { q: 'Qual clube inglês é apelidado de "The Reds"?', options: ['Liverpool', 'Everton', 'Arsenal', 'Chelsea'], correct: 0, cat: 'Clubes', dif: 'facil' },

  // ===== Expansão — DIFÍCEIS (defesas) =====
  { q: 'Quem venceu a Bola de Ouro de 2006?', options: ['Fabio Cannavaro', 'Zidane', 'Thierry Henry', 'Ronaldinho'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2018?', options: ['Luka Modrić', 'Cristiano Ronaldo', 'Griezmann', 'Mbappé'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2010?', options: ['Lionel Messi', 'Iniesta', 'Xavi', 'Sneijder'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quantas Bolas de Ouro Messi tinha conquistado até 2023?', options: ['8', '7', '6', '5'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Quem marcou o gol do título da Espanha na final de 2010?', options: ['Iniesta', 'David Villa', 'Xavi', 'Fernando Torres'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o capitão da Alemanha campeã em 2014?', options: ['Philipp Lahm', 'Schweinsteiger', 'Neuer', 'Müller'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Quem venceu a Champions de 2005, o "Milagre de Istambul"?', options: ['Liverpool', 'Milan', 'Chelsea', 'Arsenal'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual clube holandês foi tricampeão europeu nos anos 1970?', options: ['Ajax', 'PSV', 'Feyenoord', 'AZ Alkmaar'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual seleção africana chegou à semifinal da Copa de 2022?', options: ['Marrocos', 'Senegal', 'Gana', 'Camarões'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual clube tem mais títulos da Copa Libertadores?', options: ['Independiente', 'Boca Juniors', 'Peñarol', 'River Plate'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Quem foi o primeiro brasileiro a vencer a Bola de Ouro?', options: ['Ronaldo', 'Romário', 'Rivaldo', 'Ronaldinho'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },

  // ===== Expansão 2 — FÁCEIS (cobranças) =====
  { q: 'Em que país foi a Copa do Mundo de 1950?', options: ['Brasil', 'Uruguai', 'Suíça', 'Suécia'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quantas Copas do Mundo Pelé venceu?', options: ['3', '2', '4', '1'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual seleção é apelidada de "Azzurra"?', options: ['Itália', 'França', 'Argentina', 'Espanha'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'No futebol, o que é dar um "chapéu"?', options: ['Passar a bola por cima do adversário', 'Passar a bola entre as pernas do adversário', 'Chutar de bico', 'Cabecear para trás'], correct: 0, cat: 'Regras', dif: 'facil' },
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
  { q: 'No futebol, o que é dar uma "caneta"?', options: ['Passar a bola entre as pernas do adversário', 'Passar a bola por cima do adversário', 'Cobrar falta por baixo da barreira', 'Dar um passe de calcanhar'], correct: 0, cat: 'Regras', dif: 'facil' },
  { q: 'Qual clube gaúcho é o "Colorado"?', options: ['Internacional', 'Grêmio', 'Juventude', 'Caxias'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube gaúcho é o "Imortal Tricolor"?', options: ['Grêmio', 'Internacional', 'Juventude', 'Caxias'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube carioca é o "Fogão"?', options: ['Botafogo', 'Fluminense', 'Vasco', 'Flamengo'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'O que é um "hat-trick"?', options: ['Três gols do mesmo jogador', 'Dois gols seguidos', 'Um gol de falta', 'Defender um pênalti'], correct: 0, cat: 'Regras', dif: 'facil' },
  { q: 'Quantos pontos vale uma vitória no futebol atual?', options: ['3', '2', '1', '4'], correct: 0, cat: 'Regras', dif: 'facil' },
  { q: 'Em 2017, Neymar saiu do Barcelona para qual clube?', options: ['PSG', 'Real Madrid', 'Juventus', 'Chelsea'], correct: 0, cat: 'Craques', dif: 'facil' },
  { q: 'De que país é o clube Ajax?', options: ['Holanda', 'Bélgica', 'Alemanha', 'Dinamarca'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Quem venceu a Copa América de 2024?', options: ['Argentina', 'Colômbia', 'Uruguai', 'Brasil'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Em que continente fica o Catar, sede da Copa de 2022?', options: ['Ásia', 'África', 'Europa', 'Oceania'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual clube brasileiro é apelidado de "Timão"?', options: ['Corinthians', 'Palmeiras', 'Flamengo', 'Vasco'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube brasileiro é apelidado de "Peixe"?', options: ['Santos', 'Cruzeiro', 'Grêmio', 'Bahia'], correct: 0, cat: 'Clubes', dif: 'facil' },

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
  { q: 'Qual clube venceu a Libertadores de 2019?', options: ['Flamengo', 'River Plate', 'Grêmio', 'Boca Juniors'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Qual clube venceu a Libertadores de 2021?', options: ['Palmeiras', 'Flamengo', 'River Plate', 'Santos'], correct: 0, cat: 'Libertadores', dif: 'facil' },

  // ===== Expansão — COPA DO MUNDO (fáceis) =====
  { q: 'Em que país foi a Copa do Mundo de 1970?', options: ['México', 'Brasil', 'Itália', 'Espanha'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 1958?', options: ['Suécia', 'Chile', 'Suíça', 'Brasil'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 1978?', options: ['Argentina', 'Brasil', 'Espanha', 'México'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 1966?', options: ['Inglaterra', 'Alemanha', 'Suíça', 'Chile'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 2010?', options: ['África do Sul', 'Brasil', 'Alemanha', 'Nigéria'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual clube carioca é o "Gigante da Colina"?', options: ['Vasco', 'Botafogo', 'Fluminense', 'Flamengo'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Em qual Copa Ronaldo marcou os 2 gols do título na final?', options: ['2002', '1998', '2006', '1994'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Em que país foi a Copa do Mundo de 1986?', options: ['México', 'Argentina', 'Espanha', 'Colômbia'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual é a única seleção que jogou todas as Copas?', options: ['Brasil', 'Alemanha', 'Itália', 'Argentina'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quem fez o gol do Brasil na final de 1994?', options: ['Ninguém: foi 0 a 0', 'Bebeto', 'Mazinho', 'Zinho'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem marcou para o Brasil na final de 1998?', options: ['Ninguém: perdeu de 3 a 0', 'Ronaldo', 'Edmundo', 'César Sampaio'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual craque é o "Baixinho"?', options: ['Romário', 'Bebeto', 'Edmundo', 'Juninho Paulista'], correct: 0, cat: 'Apelidos', dif: 'facil' },
  { q: 'Qual atacante ficou conhecido como "Animal"?', options: ['Edmundo', 'Romário', 'Viola', 'Túlio Maravilha'], correct: 0, cat: 'Apelidos', dif: 'facil' },
  { q: '"R10" é o apelido de qual craque?', options: ['Ronaldinho', 'Rivaldo', 'Romário', 'Ronaldo'], correct: 0, cat: 'Apelidos', dif: 'facil' },
  { q: 'Em qual Copa o VAR estreou?', options: ['2018', '2014', '2022', '2010'], correct: 0, cat: 'Regras', dif: 'facil' },
  { q: 'Quem foi o goleiro titular do Brasil em 2018 e 2022?', options: ['Alisson', 'Ederson', 'Weverton', 'Júlio César'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Contra quem Ronaldinho fez o gol de falta que encobriu o goleiro, em 2002?', options: ['Inglaterra', 'Bélgica', 'Turquia', 'Costa Rica'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem fez o golaço de falta contra a Colômbia em 2014?', options: ['David Luiz', 'Thiago Silva', 'Neymar', 'Oscar'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem foi eleito o melhor jogador da Copa de 1994?', options: ['Romário', 'Bebeto', 'Roberto Baggio', 'Dunga'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quem foi eleito o melhor da Copa de 1998, mesmo perdendo a final?', options: ['Ronaldo', 'Zidane', 'Davor Šuker', 'Rivaldo'], correct: 0, cat: 'Copas', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025_Ballon_d%27Or
  { q: 'Até 2025, quem foi o último brasileiro a ganhar a Bola de Ouro?', options: ['Kaká', 'Ronaldinho', 'Vinícius Júnior', 'Neymar'], correct: 0, cat: 'Bola de Ouro', dif: 'facil' },
  { q: 'Quem ficou em 2º na Bola de Ouro de 2024?', options: ['Vinícius Júnior', 'Jude Bellingham', 'Kylian Mbappé', 'Harry Kane'], correct: 0, cat: 'Bola de Ouro', dif: 'facil' },
  // fonte: https://www.nst.com.my/amp/sports/football/2026/09/1537854/spain-coach-de-la-fuente-gets-new-deal-after-world-cup-success
  { q: 'Qual técnico ganhou a Euro 2024 e a Copa 2026 com a Espanha?', options: ['Luis de la Fuente', 'Luis Enrique', 'Vicente del Bosque', 'Julen Lopetegui'], correct: 0, cat: 'Técnicos', dif: 'facil' },
  { q: 'Quem treinou a Argentina campeã do mundo em 2022?', options: ['Lionel Scaloni', 'Jorge Sampaoli', 'Marcelo Gallardo', 'Gerardo Martino'], correct: 0, cat: 'Técnicos', dif: 'facil' },
  { q: 'Em qual estádio foi o 7 a 1?', options: ['Mineirão', 'Maracanã', 'Arena Corinthians', 'Mané Garrincha'], correct: 0, cat: 'Estádios', dif: 'facil' },
  { q: 'Qual estádio é o "Gigante da Pampulha"?', options: ['Mineirão', 'Independência', 'Arena MRV', 'Mineirinho'], correct: 0, cat: 'Estádios', dif: 'facil' },
  { q: 'Qual seleção perdeu três finais de Copa e nunca foi campeã?', options: ['Holanda', 'Hungria', 'Croácia', 'Tchecoslováquia'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quem mordeu Chiellini na Copa de 2014?', options: ['Luis Suárez', 'Edinson Cavani', 'Diego Godín', 'Diego Costa'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual seleção ficou conhecida como "Laranja Mecânica"?', options: ['Holanda', 'Costa do Marfim', 'Bélgica', 'Dinamarca'], correct: 0, cat: 'Seleções', dif: 'facil' },
  { q: 'Em que ano foi disputada a Euro 2020?', options: ['2021', '2020', '2019', '2022'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Quem perdeu pênalti na final da Copa América 2016 e anunciou que largava a seleção?', options: ['Lionel Messi', 'Lucas Biglia', 'Gonzalo Higuaín', 'Sergio Agüero'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Quem tem mais gols por seleções masculinas (até 2026)?', options: ['Cristiano Ronaldo', 'Lionel Messi', 'Ali Daei', 'Pelé'], correct: 0, cat: 'Recordes', dif: 'facil' },

  // ===== Expansão — COPA DO MUNDO (difíceis) =====
  { q: 'Quais países sediaram a Copa de 2002?', options: ['Coreia do Sul e Japão', 'Japão e China', 'Coreia do Sul e China', 'Japão e Austrália'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Em que país foi a Copa do Mundo de 2006?', options: ['Alemanha', 'França', 'Itália', 'Inglaterra'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quem foi o artilheiro da Copa do Mundo de 1990?', options: ['Salvatore Schillaci', 'Lineker', 'Matthäus', 'Roger Milla'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa do Mundo de 2014?', options: ['James Rodríguez', 'Thomas Müller', 'Messi', 'Neymar'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa do Mundo de 2022?', options: ['Kylian Mbappé', 'Messi', 'Giroud', 'Julián Álvarez'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção foi vice-campeã da Copa de 2010?', options: ['Holanda', 'Espanha', 'Alemanha', 'Uruguai'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção foi vice-campeã da Copa de 2006?', options: ['França', 'Itália', 'Alemanha', 'Portugal'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção foi vice-campeã da Copa de 2002?', options: ['Alemanha', 'Brasil', 'Coreia do Sul', 'Turquia'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem fez um hat-trick na final da Copa de 1966?', options: ['Geoff Hurst', 'Bobby Charlton', 'Eusébio', 'Pelé'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem deu a cabeçada em Materazzi na final de 2006?', options: ['Zidane', 'Vieira', 'Makélélé', 'Henry'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem fez um hat-trick na final da Copa de 2022?', options: ['Mbappé', 'Messi', 'Di María', 'Giroud'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro do Brasil em Copas do Mundo (até 2026)?', options: ['Ronaldo', 'Pelé', 'Neymar', 'Romário'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Em 1950, o que bastava ao Brasil contra o Uruguai?', options: ['Empate', 'Vitória simples', 'Vitória por 2 gols', 'Vencer nos pênaltis'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Qual craque era a "Enciclopédia do Futebol"?', options: ['Nilton Santos', 'Didi', 'Djalma Santos', 'Zito'], correct: 0, cat: 'Apelidos', dif: 'dificil' },
  { q: 'Qual craque era chamado de "Pelé Branco"?', options: ['Zico', 'Tostão', 'Rivellino', 'Falcão'], correct: 0, cat: 'Apelidos', dif: 'dificil' },
  { q: 'Com menos de quantos jogadores um time não pode seguir em campo?', options: ['7', '8', '6', '9'], correct: 0, cat: 'Regras', dif: 'dificil' },
  { q: 'Lateral jogado direto no gol adversário vale?', options: ['Não: é tiro de meta', 'Sim, vale gol', 'Não: é escanteio', 'Não: é tiro livre indireto'], correct: 0, cat: 'Regras', dif: 'dificil' },
  { q: 'Gol direto de tiro de meta no gol adversário vale?', options: ['Sim', 'Não: volta o tiro de meta', 'Não: é escanteio', 'Só se alguém tocar'], correct: 0, cat: 'Regras', dif: 'dificil' },
  { q: 'Goleiro pode pegar com a mão um recuo de cabeça?', options: ['Sim', 'Não: é tiro livre indireto', 'Só dentro da pequena área', 'Não: é pênalti'], correct: 0, cat: 'Regras', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup
  { q: 'Qual país foi o 1º a sediar três Copas?', options: ['México', 'Itália', 'Brasil', 'Alemanha'], correct: 0, cat: 'Copas', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup
  { q: 'Qual estádio já recebeu três aberturas de Copa?', options: ['Azteca', 'Maracanã', 'Wembley', 'Centenário'], correct: 0, cat: 'Estádios', dif: 'dificil' },
  { q: 'Quem fez o gol contra que abriu a Copa de 2014?', options: ['Marcelo', 'David Luiz', 'Daniel Alves', 'Thiago Silva'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem tirou Neymar da Copa de 2014 com uma joelhada?', options: ['Juan Camilo Zúñiga', 'Mario Yepes', 'Juan Cuadrado', 'Pablo Armero'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem fez os 3 gols da Itália na "Tragédia do Sarriá"?', options: ['Paolo Rossi', 'Bruno Conti', 'Marco Tardelli', 'Francesco Graziani'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem fez o gol de falta do 3 a 2 na Holanda, em 1994?', options: ['Branco', 'Jorginho', 'Mazinho', 'Leonardo'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem foi expulso por cotovelada no Brasil x EUA de 1994?', options: ['Leonardo', 'Branco', 'Mauro Silva', 'Aldair'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quantos gols Pelé fez na final de 1958?', options: ['2', '1', '3', '0'], correct: 0, cat: 'Lendas', dif: 'dificil' },
  { q: 'Quem substituiu Pelé, lesionado, e virou herói em 1962?', options: ['Amarildo', 'Coutinho', 'Vavá', 'Zito'], correct: 0, cat: 'Lendas', dif: 'dificil' },
  { q: 'Quem venceu a Bola de Ouro de 2002?', options: ['Ronaldo', 'Roberto Carlos', 'Oliver Kahn', 'Zidane'], correct: 0, cat: 'Bola de Ouro', dif: 'dificil' },
  { q: 'Qual foi o 1º brasileiro eleito Melhor do Mundo pela FIFA?', options: ['Romário', 'Ronaldo', 'Rivaldo', 'Bebeto'], correct: 0, cat: 'Craques', dif: 'dificil' },
  { q: 'Quem levou 31 a 0 da Austrália, recorde mundial?', options: ['Samoa Americana', 'Tonga', 'San Marino', 'Ilhas Cook'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'De quem CR7 tomou o recorde de gols por seleções?', options: ['Ali Daei', 'Ferenc Puskás', 'Pelé', 'Miroslav Klose'], correct: 0, cat: 'Recordes', dif: 'dificil' },
  { q: 'Quem é o único técnico bicampeão do mundo?', options: ['Vittorio Pozzo', 'Mário Zagallo', 'Didier Deschamps', 'Carlos Bilardo'], correct: 0, cat: 'Técnicos', dif: 'dificil' },
  { q: 'Além de Zagallo, quem ganhou a Copa como jogador e técnico?', options: ['Beckenbauer e Deschamps', 'Beckenbauer e Cruyff', 'Deschamps e Zidane', 'Bilardo e Passarella'], correct: 0, cat: 'Técnicos', dif: 'dificil' },
  { q: 'Qual foi a 1ª seleção africana nas quartas de uma Copa?', options: ['Camarões', 'Nigéria', 'Senegal', 'Gana'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual seleção é a dos "Leões Indomáveis"?', options: ['Camarões', 'Senegal', 'Marrocos', 'Nigéria'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Qual seleção sul-americana nunca jogou uma Copa?', options: ['Venezuela', 'Bolívia', 'Equador', 'Peru'], correct: 0, cat: 'Seleções', dif: 'dificil' },
  { q: 'Quem perdeu o último pênalti da Inglaterra na final da Euro 2020?', options: ['Bukayo Saka', 'Marcus Rashford', 'Jadon Sancho', 'Harry Kane'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Quais asiáticos jogaram a Copa América 2019 como convidados?', options: ['Japão e Catar', 'Japão e Coreia do Sul', 'Catar e Arábia Saudita', 'China e Japão'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Qual goleiro foi herói nos pênaltis da Copa América 2004?', options: ['Júlio César', 'Dida', 'Marcos', 'Gomes'], correct: 0, cat: 'Copa América', dif: 'dificil' },

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
  { q: 'Quem fez os 2 gols da Noruega contra o Brasil, em 2026?', options: ['Erling Haaland', 'Martin Ødegaard', 'Alexander Sørloth', 'Antonio Nusa'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
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
  { q: 'Quanto foi México x África do Sul, abertura de 2026?', options: ['2 a 0 para o México', '1 a 1', '1 a 0 para o México', '2 a 1 para a África do Sul'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup
  { q: 'Quantos jogos teve a Copa do Mundo de 2026?', options: ['104', '64', '80', '96'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Copa_do_Mundo_FIFA_de_2026
  { q: 'Quais seleções estrearam em Copas do Mundo em 2026?', options: ['Cabo Verde, Curaçao, Jordânia e Uzbequistão', 'Cabo Verde, Haiti, Jordânia e Catar', 'Curaçao, Panamá, Uzbequistão e Gana', 'RD Congo, Jordânia, Escócia e Curaçao'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://sbtnews.sbt.com.br/noticia/mundo/curacao-conheca-menor-pais-a-se-classificar-para-a-copa-do-mundo-2026
  { q: 'Qual foi o país de menor população a disputar uma Copa do Mundo, em 2026?', options: ['Curaçao', 'Cabo Verde', 'Islândia', 'Jordânia'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.fifa.com/pt/tournaments/mens/worldcup/canadamexicousa2026/articles/franca-inglaterra-resumo-melhores-momentos-bronze-terceiro-lugar
  { q: 'Qual seleção ficou em terceiro lugar na Copa de 2026?', options: ['Inglaterra', 'França', 'Marrocos', 'Noruega'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://www.fifa.com/pt/tournaments/mens/worldcup/canadamexicousa2026/articles/franca-inglaterra-resumo-melhores-momentos-bronze-terceiro-lugar
  { q: 'Quanto foi Inglaterra x França, 3º lugar de 2026?', options: ['6 a 4', '2 a 1', '3 a 3, com pênaltis', '4 a 2'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/copa-do-mundo/copa-do-mundo-paraguai-surpreende-e-elimina-alemanha-nos-penaltis/
  { q: 'A Alemanha perdeu sua 1ª disputa de pênaltis em Copas em 2026. Para quem?', options: ['Paraguai', 'Marrocos', 'Japão', 'Colômbia'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Maple,_Zayu_e_Clutch
  { q: 'Quais são os mascotes da Copa do Mundo de 2026?', options: ['Maple, Zayu e Clutch', 'Fuleco, Zabivaka e La\'eeb', 'Striker, Footix e Pique', 'Juanito, Gauchito e Naranjito'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/List_of_FIFA_World_Cup_official_match_balls
  { q: 'Qual é o nome da bola oficial da Copa de 2026?', options: ['Trionda', 'Al Rihla', 'Brazuca', 'Jabulani'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/copa-do-mundo/premiacao-da-copa-do-mundo-de-2026-acompanhe-os-vencedores/
  { q: 'Quem saiu da Copa de 2026 como maior artilheiro da história das Copas do Mundo?', options: ['Kylian Mbappé', 'Miroslav Klose', 'Lionel Messi', 'Cristiano Ronaldo'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://www.qatar-tribune.com/article/240880/sports/ronaldo-scores-at-sixth-world-cup-as-portugal-hit-uzbekistan-for-five
  { q: 'Quem foi o 1º jogador a marcar em seis Copas?', options: ['Cristiano Ronaldo', 'Lionel Messi', 'Guillermo Ochoa', 'Luka Modrić'], correct: 0, cat: 'Copa 2026', dif: 'facil' },
  // fonte: https://jovempan.com.br/esportes/futebol/copa-do-mundo/juiz-brasileiro-expulsa-tres-na-abertura-da-copa-do-mundo-e-mexico-vence-africa-do-sul-na-abertura-da-copa/
  { q: 'Qual árbitro brasileiro expulsou três na abertura de 2026?', options: ['Wilton Pereira Sampaio', 'Raphael Claus', 'Anderson Daronco', 'Ramon Abatti'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup
  { q: 'Quantos gols a Espanha sofreu na Copa de 2026 inteira?', options: ['1', '0', '3', '5'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_final
  { q: 'Quem foi expulso pela Argentina na final de 2026?', options: ['Enzo Fernández', 'Rodrigo De Paul', 'Nicolás Otamendi', 'Alexis Mac Allister'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_final
  { q: 'Qual goleiro bateu o recorde de defesas numa final, em 2026?', options: ['Emiliano Martínez', 'Unai Simón', 'David Raya', 'Gerónimo Rulli'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.sofascore.com/news/michael-olise-breaks-peles-world-cup-assist-record
  { q: 'Quem deu 7 assistências na Copa de 2026, recorde?', options: ['Michael Olise', 'Lamine Yamal', 'Lionel Messi', 'Bruno Fernandes'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://blog.wego.com/world-cup-third-place-playoff/
  { q: 'No 6 a 4 sobre a França, quanto a Inglaterra vencia no intervalo?', options: ['4 a 0', '3 a 1', '2 a 0', '3 a 2'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.gazetasp.com.br/esportes/brasil-eliminado-noruega-oitavas-copa-do-mundo-2026-haaland/
  { q: 'Quem perdeu um pênalti pelo Brasil contra a Noruega, em 2026?', options: ['Bruno Guimarães', 'Vinícius Júnior', 'Raphinha', 'Neymar'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://www.nbcchicago.com/local-2/kylian-mbappe-passes-lionel-messi-for-career-world-cup-scoring-record-with-22-goals/3963416/
  { q: 'Com quantos gols em Copas Mbappé saiu de 2026?', options: ['22', '21', '19', '16'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup
  { q: 'Quantos gols Messi fez na Copa de 2026?', options: ['8', '10', '6', '4'], correct: 0, cat: 'Copa 2026', dif: 'dificil' },

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
  { q: 'Quais são os únicos dois clubes que nunca foram rebaixados no Brasileirão (até 2025)?', options: ['Flamengo e São Paulo', 'Flamengo e Santos', 'São Paulo e Corinthians', 'Palmeiras e Internacional'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
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
  { q: 'Como foi decidida a final da Champions de 2026?', options: ['Nos pênaltis, após 1 a 1', '2 a 1 no tempo normal', '1 a 0 na prorrogação', '3 a 2 no tempo normal'], correct: 0, cat: 'Champions', dif: 'dificil' },
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
  { q: 'Qual goleiro foi eleito o melhor jogador da Copa de 2002?', options: ['Oliver Kahn', 'Marcos', 'Rüştü Reçber', 'Iker Casillas'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual brasileiro foi o artilheiro da Copa de 1938?', options: ['Leônidas da Silva', 'Ademir', 'Zizinho', 'Romeu'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1950?', options: ['Ademir', 'Zizinho', 'Ghiggia', 'Schiaffino'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1954, com 11 gols?', options: ['Sándor Kocsis', 'Ferenc Puskás', 'Fritz Walter', 'Helmut Rahn'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem a Alemanha venceu no "Milagre de Berna", 1954?', options: ['Hungria', 'Áustria', 'Uruguai', 'Brasil'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual foi o placar da final da Copa de 1958, Brasil x Suécia?', options: ['5 a 2', '4 a 2', '3 a 1', '2 a 0'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Quem foi o artilheiro da Copa de 1966, com 9 gols?', options: ['Eusébio', 'Bobby Charlton', 'Geoff Hurst', 'Franz Beckenbauer'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual foi o placar da final da Copa de 1970, Brasil x Itália?', options: ['4 a 1', '3 a 1', '2 a 1', '4 a 2'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual cachorro encontrou a taça Jules Rimet, roubada antes da Copa de 1966?', options: ['Pickles', 'Rex', 'Bobby', 'Laika'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1978?', options: ['Mario Kempes', 'Teófilo Cubillas', 'Rob Rensenbrink', 'Paolo Rossi'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa de 1982?', options: ['Paolo Rossi', 'Zico', 'Karl-Heinz Rummenigge', 'Falcão'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual goleiro foi campeão do mundo aos 40 anos?', options: ['Dino Zoff', 'Gianluigi Buffon', 'Walter Zenga', 'Gianluca Pagliuca'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual era o mascote da Copa do Mundo de 2014?', options: ['Fuleco', 'Zakumi', 'Zabivaka', 'Pique'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual era o mascote da Copa do Mundo de 1998?', options: ['Footix', 'Ciao', 'Striker', 'Goleo'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual era o nome da bola oficial da Copa de 2010?', options: ['Jabulani', 'Brazuca', 'Teamgeist', 'Fevernova'], correct: 0, cat: 'Copas', dif: 'facil' },
  { q: 'Qual foi a primeira bola oficial de Copa produzida pela Adidas, em 1970?', options: ['Telstar', 'Tango', 'Azteca', 'Questra'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem é o mais velho a marcar em Copas, aos 42?', options: ['Roger Milla', 'Cristiano Ronaldo', 'Dino Zoff', 'Pepe'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem marcou 5 gols em um só jogo de Copa, contra Camarões em 1994?', options: ['Oleg Salenko', 'Hristo Stoichkov', 'Romário', 'Jürgen Klinsmann'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Quem fez o gol mais rápido das Copas, aos 11 s?', options: ['Hakan Şükür', 'Ronaldo', 'Miroslav Klose', 'Rivaldo'], correct: 0, cat: 'Copas', dif: 'dificil' },

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
  { q: 'O "Clássico dos Milhões" é entre Flamengo e qual rival?', options: ['Vasco', 'Fluminense', 'Botafogo', 'Corinthians'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube é o "Tricolor das Laranjeiras"?', options: ['Fluminense', 'São Paulo', 'Grêmio', 'Bahia'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'O Gre-Nal é o clássico entre Grêmio e qual rival?', options: ['Internacional', 'Juventude', 'Caxias', 'Brasil de Pelotas'], correct: 0, cat: 'Clubes', dif: 'facil' },
  { q: 'Qual clube tinha mais títulos da Copa do Brasil até 2025?', options: ['Cruzeiro', 'Grêmio', 'Palmeiras', 'Flamengo'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Qual clube é o "Leão da Ilha"?', options: ['Sport', 'Náutico', 'Santa Cruz', 'Fortaleza'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'O "Clássico Vovô" é entre Fluminense e qual rival?', options: ['Botafogo', 'Flamengo', 'Vasco', 'América-RJ'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'O "Majestoso" é o clássico entre São Paulo e qual rival?', options: ['Corinthians', 'Palmeiras', 'Santos', 'Portuguesa'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Em que ano o Corinthians foi fundado?', options: ['1910', '1914', '1902', '1920'], correct: 0, cat: 'Clubes', dif: 'dificil' },
  { q: 'Qual é o nome oficial do Maracanã?', options: ['Estádio Jornalista Mário Filho', 'Estádio Nilton Santos', 'Estádio Cícero Pompeu de Toledo', 'Estádio Governador Magalhães Pinto'], correct: 0, cat: 'Estádios', dif: 'facil' },

  // ===== SELEÇÃO BRASILEIRA =====
  { q: 'Quem foi o capitão do Brasil no tetra de 1994?', options: ['Dunga', 'Romário', 'Taffarel', 'Branco'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual brasileiro disputou três finais de Copa seguidas (1994, 1998 e 2002)?', options: ['Cafu', 'Pelé', 'Ronaldo', 'Roberto Carlos'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem é o mais jovem campeão do mundo da história, aos 17 anos, em 1958?', options: ['Pelé', 'Garrincha', 'Ronaldo', 'Vavá'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem foi o primeiro a ser campeão do mundo como jogador e como técnico?', options: ['Mário Zagallo', 'Telê Santana', 'Carlos Alberto Parreira', 'Luiz Felipe Scolari'], correct: 0, cat: 'Técnicos', dif: 'dificil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/selecao-brasileira/treinadores-estrangeiros-selecao-brasileira/
  { q: 'Antes de Ancelotti, quem foi o último técnico estrangeiro do Brasil?', options: ['Filpo Núñez', 'Otto Glória', 'Béla Guttmann', 'Jorge Jesus'], correct: 0, cat: 'Técnicos', dif: 'dificil' },
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
  { q: 'Quem tem o recorde de jogos em Copas (34, até 2026)?', options: ['Lionel Messi', 'Lothar Matthäus', 'Cristiano Ronaldo', 'Miroslav Klose'], correct: 0, cat: 'Recordes', dif: 'dificil' },

  // ===== Lote 3 (set/2026): temas por campeonato — Champions, Euro, Premier League, La Liga, Serie A =====
  // ===================== CHAMPIONS LEAGUE (30) =====================
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_UEFA_Champions_League
  { q: 'Quantos títulos de Champions League / Copa dos Campeões o Real Madrid tinha até 2026?', options: ['15', '14', '13', '16'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quem marcou o gol de empate do Real Madrid aos 93 minutos na final da Champions de 2014, contra o Atlético?', options: ['Sergio Ramos', 'Gareth Bale', 'Cristiano Ronaldo', 'Marcelo'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Qual clube o Real Madrid derrotou nas finais da Champions de 2014 e de 2016?', options: ['Atlético de Madrid', 'Juventus', 'Liverpool', 'Bayern de Munique'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quem marcou os dois gols da Inter de Milão na final da Champions de 2010, contra o Bayern?', options: ['Diego Milito', "Samuel Eto'o", 'Wesley Sneijder', 'Goran Pandev'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual clube fez a "remontada" de 6 a 1 sobre o PSG em 2017, após perder o jogo de ida por 4 a 0?', options: ['Barcelona', 'Real Madrid', 'Bayern de Munique', 'Juventus'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Qual clube eliminou o Barcelona nas quartas da Champions de 2018 com um 3 a 0 em casa, após perder a ida por 4 a 1?', options: ['Roma', 'Liverpool', 'Juventus', 'Napoli'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Quem marcou o gol de bicicleta na final da Champions de 2018, contra o Liverpool?', options: ['Gareth Bale', 'Cristiano Ronaldo', 'Karim Benzema', 'Marcelo'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Qual clube o Real Madrid venceu na final da Champions de 2018, em Kiev?', options: ['Liverpool', 'Juventus', 'Bayern de Munique', 'Manchester City'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Qual goleiro do Liverpool cometeu duas falhas decisivas na final da Champions de 2018?', options: ['Loris Karius', 'Alisson', 'Simon Mignolet', 'Adrián'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Quem marcou o gol do título do Real Madrid na final da Champions de 2022, contra o Liverpool?', options: ['Vinícius Júnior', 'Karim Benzema', 'Rodrygo', 'Luka Modrić'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quem marcou o único gol da final da Champions de 2020, Bayern 1 a 0 PSG?', options: ['Kingsley Coman', 'Robert Lewandowski', 'Thomas Müller', 'Serge Gnabry'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Quem marcou o gol do título do Chelsea na final da Champions de 2021, contra o Manchester City?', options: ['Kai Havertz', 'Timo Werner', 'Mason Mount', 'Christian Pulisic'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Qual clube português venceu a Champions de 2004 comandado por José Mourinho?', options: ['Porto', 'Benfica', 'Sporting', 'Braga'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quem marcou o gol de voleio na final da Champions de 2002, em Glasgow, pelo Real Madrid?', options: ['Zinédine Zidane', 'Raúl', 'Luís Figo', 'Roberto Carlos'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quem fez o gol da virada do Manchester United aos 93 na final de 1999?', options: ['Ole Gunnar Solskjær', 'Teddy Sheringham', 'Dwight Yorke', 'Andy Cole'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual foi o placar da final da Copa dos Campeões de 1960, Real Madrid x Eintracht Frankfurt?', options: ['7 a 3', '4 a 1', '5 a 2', '3 a 0'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Quem marcou quatro gols pelo Real Madrid na final da Copa dos Campeões de 1960?', options: ['Ferenc Puskás', 'Alfredo Di Stéfano', 'Francisco Gento', 'Raymond Kopa'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual foi o primeiro clube inglês campeão europeu, em 1968?', options: ['Manchester United', 'Liverpool', 'Nottingham Forest', 'Leeds United'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual clube escocês foi o primeiro britânico a vencer a Copa dos Campeões, em 1967?', options: ['Celtic', 'Rangers', 'Aberdeen', 'Hearts'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual clube inglês foi bicampeão europeu em 1979 e 1980, comandado por Brian Clough?', options: ['Nottingham Forest', 'Aston Villa', 'Liverpool', 'Leeds United'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual clube venceu a primeira edição já com o nome "Champions League", em 1993?', options: ['Olympique de Marseille', 'Milan', 'Barcelona', 'Ajax'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual clube romeno foi campeão europeu em 1986, vencendo o Barcelona nos pênaltis?', options: ['Steaua Bucareste', 'Dinamo Bucareste', 'Rapid Bucareste', 'CFR Cluj'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_UEFA_Champions_League
  { q: 'Quem dividiu a artilharia da Champions 2023-24 com Mbappé, com 8 gols cada?', options: ['Harry Kane', 'Erling Haaland', 'Jude Bellingham', 'Vinícius Júnior'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_UEFA_Champions_League
  { q: 'Quem foi eleito o melhor jogador da Champions League 2023-24?', options: ['Vinícius Júnior', 'Jude Bellingham', 'Toni Kroos', 'Rodri'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_UEFA_Champions_League
  { q: 'Qual clube eliminou o Real Madrid nas quartas de final da Champions 2024-25?', options: ['Arsenal', 'Bayern de Munique', 'Barcelona', 'Inter de Milão'], correct: 0, cat: 'Champions', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_UEFA_Champions_League
  { q: 'Qual clube eliminou o Barcelona na semifinal da Champions 2024-25, vencendo o jogo de volta por 4 a 3 na prorrogação?', options: ['Inter de Milão', 'PSG', 'Arsenal', 'Bayern de Munique'], correct: 0, cat: 'Champions', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025_UEFA_Champions_League_final
  { q: 'Quem marcou dois gols pelo PSG na final da Champions de 2025 e foi eleito o melhor em campo?', options: ['Désiré Doué', 'Ousmane Dembélé', 'Achraf Hakimi', 'Khvicha Kvaratskhelia'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_UEFA_Champions_League_final
  { q: 'Quem o PSG eliminou na semifinal da Champions 2025-26, por 6 a 5 no placar agregado?', options: ['Bayern de Munique', 'Real Madrid', 'Barcelona', 'Liverpool'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_UEFA_Champions_League
  { q: 'Quem foi eleito o melhor jogador da Champions League 2025-26?', options: ['Khvicha Kvaratskhelia', 'Vitinha', 'Ousmane Dembélé', 'Kylian Mbappé'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_UEFA_Champions_League_final
  { q: 'Quem marcou, de pênalti, o gol de empate do PSG na final da Champions de 2026, contra o Arsenal?', options: ['Ousmane Dembélé', 'Vitinha', 'Désiré Doué', 'Achraf Hakimi'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual goleiro foi o herói do Chelsea na final da Champions de 2012?', options: ['Petr Čech', 'Thibaut Courtois', 'Manuel Neuer', 'Edwin van der Sar'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual lateral brasileiro fez o gol do título do Barcelona em 2006?', options: ['Belletti', 'Sylvinho', 'Daniel Alves', 'Edmílson'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_UEFA_Champions_League_final
  { q: 'Quem fez o gol do Arsenal na final da Champions de 2026?', options: ['Kai Havertz', 'Bukayo Saka', 'Viktor Gyökeres', 'Declan Rice'], correct: 0, cat: 'Champions', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2026_UEFA_Champions_League_final
  { q: 'Quem foi eleito o melhor em campo na final da Champions de 2026?', options: ['Vitinha', 'Ousmane Dembélé', 'Kvaratskhelia', 'Achraf Hakimi'], correct: 0, cat: 'Champions', dif: 'dificil' },
  { q: 'Qual clube alemão venceu a Champions de 1997, sobre a Juventus?', options: ['Borussia Dortmund', 'Bayern de Munique', 'Schalke 04', 'Bayer Leverkusen'], correct: 0, cat: 'Champions', dif: 'dificil' },

  // ===================== EUROCOPA (30) =====================
  // fonte: https://en.wikipedia.org/wiki/UEFA_Euro_2024
  { q: 'Qual seleção a Espanha venceu por 2 a 1 na final da Eurocopa de 2024?', options: ['Inglaterra', 'França', 'Alemanha', 'Holanda'], correct: 0, cat: 'Euro', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/UEFA_Euro_2024
  { q: 'Em que cidade foi disputada a final da Eurocopa de 2024?', options: ['Berlim', 'Munique', 'Dortmund', 'Frankfurt'], correct: 0, cat: 'Euro', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/UEFA_Euro_2024
  { q: 'Quem foi eleito o melhor jogador da Eurocopa de 2024?', options: ['Rodri', 'Lamine Yamal', 'Jude Bellingham', 'Harry Kane'], correct: 0, cat: 'Euro', dif: 'facil' },
  // fonte: https://www.skysports.com/football/news/19692/13175207/euro-2024-spain-2-1-france-lamine-yamals-wonder-goal-helps-luis-de-la-fuentes-side-reach-final
  { q: 'Quem virou o mais jovem a marcar numa Euro, aos 16 anos?', options: ['Lamine Yamal', 'Nico Williams', 'Pedri', 'Gavi'], correct: 0, cat: 'Euro', dif: 'facil' },
  // fonte: https://www.uefa.com/uefaeuro/history/news/028f-1b5765a3842e-a4a706ebc266-1000--netherlands-1-2-england-analysis-how-ollie-watkins-impacted/
  { q: 'Quem decidiu Inglaterra x Holanda, semi da Euro 2024?', options: ['Ollie Watkins', 'Harry Kane', 'Jude Bellingham', 'Cole Palmer'], correct: 0, cat: 'Euro', dif: 'dificil' },
  // fonte: https://www.skysports.com/football/news/11095/13162892/euro-2024-spain-2-1-germany-aet-mikel-merinos-119th-minute-header-dumps-hosts-out-in-epic-quarter-final
  { q: 'Quem fez o gol aos 119\' de Espanha x Alemanha, Euro 2024?', options: ['Mikel Merino', 'Dani Olmo', 'Álvaro Morata', 'Ferran Torres'], correct: 0, cat: 'Euro', dif: 'dificil' },
  // fonte: https://www.skysports.com/football/news/12309/13157537/euro-2024-georgia-2-0-portugal-khvicha-kvaratskhelia-scores-as-willy-sagnols-side-reach-last-16
  { q: 'Qual estreante venceu Portugal por 2 a 0 na Euro 2024?', options: ['Geórgia', 'Albânia', 'Eslovênia', 'Eslováquia'], correct: 0, cat: 'Euro', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/UEFA_Euro_2024
  { q: 'Quantos títulos de Eurocopa a Espanha passou a ter após 2024, recorde da competição?', options: ['4', '3', '5', '2'], correct: 0, cat: 'Euro', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/UEFA_Euro_2024
  { q: 'Qual seleção eliminou a Itália, então campeã, nas oitavas de final da Euro 2024?', options: ['Suíça', 'Alemanha', 'Espanha', 'Croácia'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Qual seleção venceu a Eurocopa de 2012, goleando a Itália por 4 a 0 na final?', options: ['Espanha', 'Alemanha', 'Portugal', 'Holanda'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Qual seleção venceu a Eurocopa de 2008?', options: ['Espanha', 'Alemanha', 'Rússia', 'Turquia'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Qual zebra venceu a Eurocopa de 2004, disputada em Portugal?', options: ['Grécia', 'República Tcheca', 'Dinamarca', 'Suécia'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Quem era o técnico da Grécia campeã da Eurocopa de 2004?', options: ['Otto Rehhagel', 'Berti Vogts', 'Guus Hiddink', 'Franz Beckenbauer'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Quem marcou o gol do título da Grécia na final da Eurocopa de 2004, contra Portugal?', options: ['Angelos Charisteas', 'Theodoros Zagorakis', 'Giorgos Karagounis', 'Traianos Dellas'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Qual seleção venceu a Eurocopa de 2000?', options: ['França', 'Itália', 'Holanda', 'Portugal'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Quem marcou o gol de ouro da França na final da Eurocopa de 2000, contra a Itália?', options: ['David Trezeguet', 'Zinédine Zidane', 'Sylvain Wiltord', 'Thierry Henry'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Qual seleção venceu a Eurocopa de 1996, disputada na Inglaterra?', options: ['Alemanha', 'Inglaterra', 'República Tcheca', 'Holanda'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Quem fez o gol de ouro da final da Euro 96?', options: ['Oliver Bierhoff', 'Jürgen Klinsmann', 'Matthias Sammer', 'Andreas Möller'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Qual seleção venceu a Eurocopa de 1992 após ser convocada de última hora para substituir a Iugoslávia?', options: ['Dinamarca', 'Suécia', 'Alemanha', 'Holanda'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Quem marcou o famoso gol de voleio na final da Eurocopa de 1988, contra a União Soviética?', options: ['Marco van Basten', 'Ruud Gullit', 'Frank Rijkaard', 'Ronald Koeman'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Quem marcou 9 gols na Eurocopa de 1984, recorde de uma única edição?', options: ['Michel Platini', 'Karl-Heinz Rummenigge', 'Jean Tigana', 'Alain Giresse'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Qual seleção venceu a Eurocopa de 1976, decidida com a famosa "cavadinha" de Panenka?', options: ['Tchecoslováquia', 'Alemanha Ocidental', 'Holanda', 'Iugoslávia'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Qual seleção chegou à final da Euro 68 no cara ou coroa?', options: ['Itália', 'Iugoslávia', 'Inglaterra', 'União Soviética'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história das Eurocopas, com 14 gols (até 2024)?', options: ['Cristiano Ronaldo', 'Michel Platini', 'Alan Shearer', 'Antoine Griezmann'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Quem marcou o gol do título de Portugal na final da Eurocopa de 2016, contra a França?', options: ['Éder', 'Cristiano Ronaldo', 'Nani', 'Ricardo Quaresma'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Qual seleção eliminou a Inglaterra nas oitavas de final da Eurocopa de 2016?', options: ['Islândia', 'País de Gales', 'Irlanda', 'Eslováquia'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Quem foi o artilheiro da Eurocopa de 2016, com 6 gols?', options: ['Antoine Griezmann', 'Cristiano Ronaldo', 'Gareth Bale', 'Dimitri Payet'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Qual goleiro foi eleito o melhor jogador da Eurocopa de 2020?', options: ['Gianluigi Donnarumma', 'Jordan Pickford', 'Unai Simón', 'Kasper Schmeichel'], correct: 0, cat: 'Euro', dif: 'dificil' },
  { q: 'Qual seleção perdeu a final da Eurocopa de 2020 para a Itália, nos pênaltis, em Wembley?', options: ['Inglaterra', 'Espanha', 'Dinamarca', 'Bélgica'], correct: 0, cat: 'Euro', dif: 'facil' },
  { q: 'Quem marcou os dois gols da Itália sobre a Alemanha na semifinal da Eurocopa de 2012?', options: ['Mario Balotelli', 'Antonio Cassano', 'Andrea Pirlo', 'Antonio Di Natale'], correct: 0, cat: 'Euro', dif: 'dificil' },

  // ===================== PREMIER LEAGUE (40) =====================
  // fonte: https://www.premierleague.com/en/news/4662306/arsenal-win-2025-26-premier-league-title-ending-22-year-wait-to-be-crowned-champions-again
  { q: 'Qual clube foi campeão da Premier League 2025-26?', options: ['Arsenal', 'Manchester City', 'Liverpool', 'Chelsea'], correct: 0, cat: 'Premier League', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Premier_League
  { q: 'Quem era o técnico do Arsenal campeão da Premier League 2025-26?', options: ['Mikel Arteta', 'Pep Guardiola', 'Arne Slot', 'Unai Emery'], correct: 0, cat: 'Premier League', dif: 'facil' },
  // fonte: https://www.premierleague.com/en/news/4662306/arsenal-win-2025-26-premier-league-title-ending-22-year-wait-to-be-crowned-champions-again
  { q: 'Quantos anos o Arsenal ficou sem ser campeão inglês antes do título de 2025-26?', options: ['22', '20', '18', '25'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Premier_League
  { q: 'Quem foi o artilheiro da Premier League 2025-26, com 27 gols?', options: ['Erling Haaland', 'Mohamed Salah', 'Viktor Gyökeres', 'Alexander Isak'], correct: 0, cat: 'Premier League', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Premier_League
  { q: 'Qual destes clubes foi rebaixado da Premier League 2025-26?', options: ['West Ham', 'Leeds', 'Sunderland', 'Nottingham Forest'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_Premier_League
  { q: 'Qual clube foi campeão da Premier League 2024-25, chegando ao 20º título inglês?', options: ['Liverpool', 'Arsenal', 'Manchester City', 'Chelsea'], correct: 0, cat: 'Premier League', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_Premier_League
  { q: 'Quem era o técnico do Liverpool campeão da Premier League 2024-25, em sua primeira temporada no clube?', options: ['Arne Slot', 'Jürgen Klopp', 'Xabi Alonso', 'Brendan Rodgers'], correct: 0, cat: 'Premier League', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_Premier_League
  { q: 'Quem foi o artilheiro da Premier League 2024-25, com 29 gols?', options: ['Mohamed Salah', 'Erling Haaland', 'Alexander Isak', 'Cole Palmer'], correct: 0, cat: 'Premier League', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_Premier_League
  { q: 'Qual destes clubes foi rebaixado da Premier League 2024-25?', options: ['Ipswich', 'Everton', 'Wolverhampton', 'Nottingham Forest'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_Premier_League
  { q: 'Qual clube foi campeão da Premier League 2023-24, conquistando um inédito quarto título seguido?', options: ['Manchester City', 'Arsenal', 'Liverpool', 'Manchester United'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Em qual temporada o Arsenal ficou invicto na Premier League, ganhando o apelido de "Invencíveis"?', options: ['2003-04', '2001-02', '2004-05', '1997-98'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Quantos jogos seguidos sem perder o Arsenal somou na Premier League, recorde encerrado em 2004?', options: ['49', '38', '42', '55'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Quem era o técnico do Arsenal dos "Invencíveis"?', options: ['Arsène Wenger', 'George Graham', 'Mikel Arteta', 'Unai Emery'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Qual brasileiro foi volante titular do Arsenal dos "Invencíveis" de 2003-04?', options: ['Gilberto Silva', 'Juninho Paulista', 'Sylvinho', 'Denílson'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual clube protagonizou a maior zebra da Premier League ao ser campeão em 2015-16?', options: ['Leicester City', 'Tottenham', 'Arsenal', 'Manchester City'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Quem era o técnico do Leicester campeão da Premier League em 2015-16?', options: ['Claudio Ranieri', 'Nigel Pearson', 'Brendan Rodgers', 'Craig Shakespeare'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual atacante do Leicester marcou em 11 jogos seguidos da Premier League em 2015, recorde da competição?', options: ['Jamie Vardy', 'Riyad Mahrez', 'Shinji Okazaki', 'Leonardo Ulloa'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual era a cotação nas casas de apostas para o título do Leicester no início da temporada 2015-16?', options: ['5.000 para 1', '500 para 1', '1.000 para 1', '100 para 1'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Qual clube foi o primeiro a somar 100 pontos em uma temporada da Premier League, em 2017-18?', options: ['Manchester City', 'Liverpool', 'Chelsea', 'Manchester United'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Quem é o maior artilheiro da história da Premier League, com 260 gols?', options: ['Alan Shearer', 'Harry Kane', 'Wayne Rooney', 'Thierry Henry'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Quem marcou 36 gols em 2022-23, recorde de uma única temporada da Premier League?', options: ['Erling Haaland', 'Mohamed Salah', 'Alan Shearer', 'Andy Cole'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual clube venceu a primeira edição da Premier League, em 1992-93?', options: ['Manchester United', 'Blackburn Rovers', 'Arsenal', 'Leeds United'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual clube foi campeão da Premier League em 1994-95, seu único título na competição?', options: ['Blackburn Rovers', 'Newcastle', 'Leeds United', 'Nottingham Forest'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual clube desperdiçou 12 pontos de vantagem e perdeu o título de 1995-96 para o Manchester United?', options: ['Newcastle', 'Liverpool', 'Arsenal', 'Aston Villa'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual técnico venceu 13 títulos da Premier League com o Manchester United?', options: ['Alex Ferguson', 'Matt Busby', 'José Mourinho', 'Louis van Gaal'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Qual jogador tem mais títulos da Premier League, com 13 conquistas?', options: ['Ryan Giggs', 'Paul Scholes', 'Gary Neville', 'Wayne Rooney'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Quem era o técnico do Chelsea bicampeão da Premier League em 2004-05 e 2005-06?', options: ['José Mourinho', 'Carlo Ancelotti', 'Claudio Ranieri', 'Antonio Conte'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Qual clube foi campeão da Premier League 2016-17 comandado por Antonio Conte?', options: ['Chelsea', 'Manchester City', 'Tottenham', 'Liverpool'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Qual clube foi rebaixado com apenas 11 pontos em 2007-08, pior campanha da história da Premier League?', options: ['Derby County', 'Sunderland', 'Portsmouth', 'Queens Park Rangers'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Em que ano o Leeds United foi rebaixado da Premier League, três anos após uma semifinal de Champions?', options: ['2004', '2002', '2006', '2007'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Quem marcou o gol do título do Manchester City nos acréscimos contra o QPR, em 2012?', options: ['Sergio Agüero', 'Mario Balotelli', 'Carlos Tévez', 'Edin Džeko'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Em qual temporada o Liverpool venceu a Premier League pela primeira vez, após 30 anos sem título inglês?', options: ['2019-20', '2018-19', '2013-14', '2008-09'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Quem era o técnico do Liverpool campeão da Premier League 2019-20?', options: ['Jürgen Klopp', 'Brendan Rodgers', 'Rafael Benítez', 'Arne Slot'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Qual atacante do Arsenal venceu quatro Chuteiras de Ouro da Premier League entre 2002 e 2006?', options: ['Thierry Henry', 'Dennis Bergkamp', 'Robin van Persie', 'Ian Wright'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Premier League 2007-08, com 31 gols pelo Manchester United?', options: ['Cristiano Ronaldo', 'Wayne Rooney', 'Carlos Tévez', 'Emmanuel Adebayor'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Premier League 2013-14, com 31 gols pelo Liverpool?', options: ['Luis Suárez', 'Daniel Sturridge', 'Raheem Sterling', 'Steven Gerrard'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual brasileiro é ídolo do Middlesbrough, com três passagens pelo clube e o título da Copa da Liga de 2004?', options: ['Juninho Paulista', 'Gilberto Silva', 'Kléberson', 'Edu'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual brasileiro foi o goleiro do Manchester City nos seis títulos de Premier League entre 2018 e 2024?', options: ['Ederson', 'Alisson', 'Júlio César', 'Heurelho Gomes'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Qual goleiro brasileiro venceu a Luva de Ouro da Premier League 2018-19, pelo Liverpool?', options: ['Alisson', 'Ederson', 'Júlio César', 'Heurelho Gomes'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Qual brasileiro formou o trio de ataque do Liverpool com Salah e Mané?', options: ['Roberto Firmino', 'Philippe Coutinho', 'Lucas Leiva', 'Fabinho'], correct: 0, cat: 'Premier League', dif: 'facil' },
  { q: 'Qual foi o placar de Manchester United x Arsenal em agosto de 2011?', options: ['8 a 2', '6 a 1', '5 a 0', '7 a 3'], correct: 0, cat: 'Premier League', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Premier_League
  { q: 'Qual clube foi vice-campeão da Premier League 2025-26?', options: ['Manchester City', 'Liverpool', 'Aston Villa', 'Chelsea'], correct: 0, cat: 'Premier League', dif: 'facil' },

  // ===================== LA LIGA (35) =====================
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_La_Liga
  { q: 'Qual clube foi campeão espanhol de 2025-26?', options: ['Barcelona', 'Real Madrid', 'Atlético de Madrid', 'Athletic Bilbao'], correct: 0, cat: 'La Liga', dif: 'facil' },
  // fonte: https://www.si.com/es-us/futbol/el-fc-barcelona-se-consagra-campeon-de-laliga-2025-26-tras-vencer-2-0-al-real-madrid
  { q: 'Contra quem o Barcelona garantiu o título espanhol de 2025-26, com uma vitória por 2 a 0?', options: ['Real Madrid', 'Espanyol', 'Atlético de Madrid', 'Valencia'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_La_Liga
  { q: 'Quem treinou o Barcelona bicampeão espanhol em 2024-25 e 2025-26?', options: ['Hansi Flick', 'Xavi', 'Luis Enrique', 'Ronald Koeman'], correct: 0, cat: 'La Liga', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_La_Liga
  { q: 'Quem foi o Pichichi (artilheiro) da La Liga 2025-26?', options: ['Kylian Mbappé', 'Robert Lewandowski', 'Lamine Yamal', 'Julián Álvarez'], correct: 0, cat: 'La Liga', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_La_Liga
  { q: 'Com quantos gols Mbappé foi o Pichichi da La Liga 2024-25, sua primeira temporada no Real Madrid?', options: ['31', '25', '27', '35'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_La_Liga
  { q: 'Qual destes clubes foi rebaixado da La Liga 2025-26?', options: ['Girona', 'Getafe', 'Levante', 'Elche'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_La_Liga
  { q: 'Qual brasileiro foi eleito o melhor jogador da La Liga 2024-25?', options: ['Raphinha', 'Vinícius Júnior', 'Rodrygo', 'Savinho'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_La_Liga
  { q: 'Qual clube foi campeão espanhol de 2024-25?', options: ['Barcelona', 'Real Madrid', 'Atlético de Madrid', 'Athletic Bilbao'], correct: 0, cat: 'La Liga', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_La_Liga
  { q: 'Qual clube foi campeão espanhol de 2023-24?', options: ['Real Madrid', 'Barcelona', 'Girona', 'Atlético de Madrid'], correct: 0, cat: 'La Liga', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_La_Liga
  { q: 'Qual atacante ucraniano do Girona foi o Pichichi da La Liga 2023-24, com 24 gols?', options: ['Artem Dovbyk', 'Jude Bellingham', 'Robert Lewandowski', 'Alexander Sørloth'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_La_Liga
  { q: 'Quantos títulos espanhóis o Real Madrid tinha até 2026?', options: ['36', '35', '34', '38'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Quem tem mais troféus Pichichi na história, com 8 conquistas?', options: ['Lionel Messi', 'Cristiano Ronaldo', 'Telmo Zarra', 'Alfredo Di Stéfano'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Quantos gols Messi marcou na La Liga 2011-12, recorde de uma única temporada?', options: ['50', '46', '44', '48'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Quem marcou 48 gols na La Liga 2014-15 pelo Real Madrid?', options: ['Cristiano Ronaldo', 'Karim Benzema', 'Gareth Bale', 'Luis Suárez'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'De quem era o recorde de 251 gols na La Liga que Messi superou em 2014?', options: ['Telmo Zarra', 'Hugo Sánchez', 'Raúl', 'Alfredo Di Stéfano'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Qual atacante mexicano venceu cinco troféus Pichichi nos anos 1980 e 1990?', options: ['Hugo Sánchez', 'Javier Hernández', 'Rafael Márquez', 'Raúl Jiménez'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Qual brasileiro marcou três gols no 5 a 0 do Barcelona sobre o Real Madrid em janeiro de 1994?', options: ['Romário', 'Bebeto', 'Ronaldo', 'Rivaldo'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual chileno fez hat-trick no 5 a 0 do Real Madrid sobre o Barcelona em janeiro de 1995?', options: ['Iván Zamorano', 'Marcelo Salas', 'Alexis Sánchez', 'Arturo Vidal'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Qual foi o placar de Real Madrid x Barcelona no Bernabéu, em maio de 2009?', options: ['2 a 6', '0 a 4', '1 a 5', '2 a 3'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Qual brasileiro foi o Pichichi da La Liga 1996-97, com 34 gols pelo Barcelona?', options: ['Ronaldo', 'Rivaldo', 'Romário', 'Giovanni'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual brasileiro foi o Pichichi da La Liga 1993-94, com 30 gols pelo Barcelona?', options: ['Romário', 'Bebeto', 'Ronaldo', 'Rivaldo'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Qual clube galego foi campeão espanhol pela única vez em 1999-2000, o "Super Depor"?', options: ['Deportivo La Coruña', 'Celta de Vigo', 'Valencia', 'Sevilla'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Qual clube foi campeão espanhol em 2001-02 e 2003-04 comandado por Rafael Benítez?', options: ['Valencia', 'Deportivo La Coruña', 'Sevilla', 'Atlético de Madrid'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Qual clube quebrou a hegemonia de Real Madrid e Barcelona ao ser campeão espanhol em 2013-14 e 2020-21?', options: ['Atlético de Madrid', 'Valencia', 'Sevilla', 'Athletic Bilbao'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Quem era o técnico do Atlético de Madrid campeão espanhol em 2014 e 2021?', options: ['Diego Simeone', 'Luis Aragonés', 'José Mourinho', 'Rafael Benítez'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Em que ano o Atlético de Madrid foi rebaixado à Segunda Divisão espanhola?', options: ['2000', '1998', '2002', '1995'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Quais são os três clubes que nunca foram rebaixados na história da La Liga?', options: ['Real Madrid, Barcelona e Athletic Bilbao', 'Real Madrid, Barcelona e Atlético de Madrid', 'Real Madrid, Barcelona e Valencia', 'Real Madrid, Barcelona e Sevilla'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual clube basco foi bicampeão espanhol em 1980-81 e 1981-82?', options: ['Real Sociedad', 'Athletic Bilbao', 'Osasuna', 'Alavés'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Quantos pontos o Real Madrid de Mourinho somou ao ser campeão espanhol em 2011-12?', options: ['100', '96', '92', '99'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Quem marcou 40 gols e foi o Pichichi da La Liga 2015-16?', options: ['Luis Suárez', 'Lionel Messi', 'Cristiano Ronaldo', 'Neymar'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Qual ídolo do Real Madrid deu nome à geração "Quinta del Buitre", dos anos 1980?', options: ['Emilio Butragueño', 'Míchel', 'Hugo Sánchez', 'Manolo Sanchís'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Qual brasileiro chegou ao Real Madrid em 2009, vindo do Milan?', options: ['Kaká', 'Robinho', 'Ronaldo', 'Marcelo'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual brasileiro foi a transferência mais cara do mundo em 1998, do São Paulo para o Betis?', options: ['Denílson', 'Rivaldo', 'Giovanni', 'Edmundo'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  { q: 'Qual troféu premia o goleiro menos vazado da La Liga?', options: ['Troféu Zamora', 'Troféu Pichichi', 'Troféu Di Stéfano', 'Troféu Yashin'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Quem é o maior artilheiro da história dos clássicos Real Madrid x Barcelona?', options: ['Lionel Messi', 'Cristiano Ronaldo', 'Alfredo Di Stéfano', 'Raúl'], correct: 0, cat: 'La Liga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/Real_Oviedo
  { q: 'Qual clube voltou à La Liga em 2025, após 24 anos, e caiu na mesma temporada?', options: ['Real Oviedo', 'Levante', 'Elche', 'Racing Santander'], correct: 0, cat: 'La Liga', dif: 'dificil' },

  // ===================== SERIE A (35) =====================
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Serie_A
  { q: 'Qual clube foi campeão italiano de 2025-26, chegando ao 21º título?', options: ['Inter de Milão', 'Napoli', 'Milan', 'Juventus'], correct: 0, cat: 'Serie A', dif: 'facil' },
  // fonte: https://www.adnkronos.com/sport/inter-scudetto-2025-2026-chivu_2Y5LZihGUPhAHVHQQ4I0WM
  { q: 'Quem era o técnico da Inter de Milão campeã italiana de 2025-26, em sua primeira temporada no cargo?', options: ['Cristian Chivu', 'Simone Inzaghi', 'Antonio Conte', 'José Mourinho'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Serie_A
  { q: 'Quem foi o artilheiro (Capocannoniere) da Serie A 2025-26?', options: ['Lautaro Martínez', 'Mateo Retegui', 'Moise Kean', 'Dušan Vlahović'], correct: 0, cat: 'Serie A', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_Serie_A
  { q: 'Qual clube foi campeão italiano de 2024-25, conquistando seu quarto título?', options: ['Napoli', 'Inter de Milão', 'Juventus', 'Milan'], correct: 0, cat: 'Serie A', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_Serie_A
  { q: 'Quem era o técnico do Napoli campeão italiano de 2024-25?', options: ['Antonio Conte', 'Luciano Spalletti', 'Rudi Garcia', 'Walter Mazzarri'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_Serie_A
  { q: 'Quem foi o artilheiro da Serie A 2024-25, com 25 gols pela Atalanta?', options: ['Mateo Retegui', 'Lautaro Martínez', 'Moise Kean', 'Romelu Lukaku'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_Serie_A
  { q: 'Qual clube foi campeão italiano de 2023-24, conquistando o 20º título e a segunda estrela?', options: ['Inter de Milão', 'Milan', 'Juventus', 'Napoli'], correct: 0, cat: 'Serie A', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_Serie_A
  { q: 'Contra quem a Inter garantiu o título italiano de 2023-24, com uma vitória por 2 a 1?', options: ['Milan', 'Juventus', 'Torino', 'Napoli'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Qual clube foi campeão italiano em 2022-23, 33 anos após seu título anterior?', options: ['Napoli', 'Milan', 'Inter de Milão', 'Roma'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Quem era o técnico do Napoli campeão italiano de 2022-23?', options: ['Luciano Spalletti', 'Antonio Conte', 'Maurizio Sarri', 'Carlo Ancelotti'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Quantos títulos italianos seguidos a Juventus venceu entre 2011-12 e 2019-20?', options: ['9', '7', '8', '10'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Qual clube encerrou a sequência de títulos da Juventus ao ser campeão italiano em 2020-21?', options: ['Inter de Milão', 'Milan', 'Atalanta', 'Napoli'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Qual clube foi campeão italiano em 2021-22 comandado por Stefano Pioli?', options: ['Milan', 'Inter de Milão', 'Napoli', 'Juventus'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Qual clube tem mais títulos do Campeonato Italiano?', options: ['Juventus', 'Inter de Milão', 'Milan', 'Torino'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'No escândalo Calciopoli, em 2006, qual clube foi rebaixado à Série B?', options: ['Juventus', 'Milan', 'Fiorentina', 'Lazio'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Qual clube recebeu o título italiano de 2005-06, retirado da Juventus após o Calciopoli?', options: ['Inter de Milão', 'Milan', 'Roma', 'Fiorentina'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história da Serie A, com 274 gols?', options: ['Silvio Piola', 'Francesco Totti', 'Gunnar Nordahl', 'Giuseppe Meazza'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Quem marcou 36 gols na Serie A 2015-16 pelo Napoli, recorde de uma única edição na época?', options: ['Gonzalo Higuaín', 'Ciro Immobile', 'Paulo Dybala', 'Mauro Icardi'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Quem igualou os 36 gols em uma edição da Serie A em 2019-20, pela Lazio?', options: ['Ciro Immobile', 'Romelu Lukaku', 'Cristiano Ronaldo', 'Zlatan Ibrahimović'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história da Roma?', options: ['Francesco Totti', 'Daniele De Rossi', 'Gabriel Batistuta', 'Roberto Pruzzo'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Qual brasileiro foi campeão italiano pela Roma em 1982-83?', options: ['Falcão', 'Zico', 'Toninho Cerezo', 'Júnior'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Por qual clube italiano Zico jogou entre 1983 e 1985?', options: ['Udinese', 'Roma', 'Fiorentina', 'Torino'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Qual brasileiro foi o centroavante do Napoli de Maradona campeão italiano em 1989-90?', options: ['Careca', 'Sócrates', 'Müller', 'Dunga'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Por qual clube italiano Sócrates jogou na temporada 1984-85?', options: ['Fiorentina', 'Roma', 'Milan', 'Napoli'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Por qual clube italiano Ronaldo Fenômeno jogou entre 1997 e 2002?', options: ['Inter de Milão', 'Milan', 'Juventus', 'Roma'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Qual brasileiro foi campeão italiano pelo Milan em 2003-04, em sua primeira temporada na Europa?', options: ['Kaká', 'Ronaldinho', 'Robinho', 'Alexandre Pato'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Qual brasileiro foi o artilheiro da Serie A 1998-99, pela Udinese?', options: ['Márcio Amoroso', 'Edmundo', 'Cafu', 'Zé Elias'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Qual lateral brasileiro foi campeão italiano pela Roma em 2001 e pelo Milan em 2004?', options: ['Cafu', 'Roberto Carlos', 'Cicinho', 'Zé Maria'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Qual clube foi campeão italiano em 1990-91 com a dupla Vialli e Mancini?', options: ['Sampdoria', 'Genoa', 'Fiorentina', 'Parma'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Qual clube surpreendeu ao ser campeão italiano em 1984-85?', options: ['Hellas Verona', 'Sampdoria', 'Fiorentina', 'Torino'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Qual clube foi campeão italiano em 1999-2000 comandado por Sven-Göran Eriksson?', options: ['Lazio', 'Roma', 'Fiorentina', 'Parma'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Qual clube italiano conquistou a tríplice coroa em 2009-10, comandado por José Mourinho?', options: ['Inter de Milão', 'Milan', 'Juventus', 'Roma'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Quem foi o artilheiro da Serie A 2020-21, com 29 gols pela Juventus?', options: ['Cristiano Ronaldo', 'Romelu Lukaku', 'Ciro Immobile', 'Luis Muriel'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Como se chama o estádio dividido por Milan e Inter de Milão?', options: ['San Siro (Giuseppe Meazza)', 'Olímpico de Roma', 'Juventus Stadium', 'Artemio Franchi'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Como é chamado o clássico entre Milan e Inter de Milão?', options: ['Derby della Madonnina', "Derby d'Italia", 'Derby della Capitale', 'Derby della Mole'], correct: 0, cat: 'Serie A', dif: 'facil' },

  // ===== Lote 3 (set/2026): Libertadores, Brasileirão, Bundesliga, Copa América, Copa do Brasil =====
  // ===== LIBERTADORES =====
  { q: 'Quantos títulos da Libertadores tem o Independiente, recordista da competição?', options: ['7', '6', '5', '8'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Em qual período o Independiente venceu quatro Libertadores consecutivas?', options: ['1972 a 1975', '1964 a 1967', '1983 a 1986', '1977 a 1980'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Qual foi o primeiro clube brasileiro campeão da Libertadores, em 1962?', options: ['Santos', 'Palmeiras', 'Botafogo', 'Flamengo'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Quem o Santos de Pelé venceu na final da Libertadores de 1962?', options: ['Peñarol', 'Boca Juniors', 'Nacional', 'Independiente'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Quem o Cruzeiro venceu na final da Libertadores de 1976, seu primeiro título?', options: ['River Plate', 'Boca Juniors', 'Peñarol', 'Olimpia'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Qual clube venceu a Libertadores de 1981, com Zico como grande destaque?', options: ['Flamengo', 'Grêmio', 'Cruzeiro', 'Internacional'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Quem o Flamengo venceu na final da Libertadores de 1981?', options: ['Cobreloa', 'Peñarol', 'Nacional', 'Olimpia'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Qual clube venceu a Libertadores de 1983, derrotando o Peñarol na final?', options: ['Grêmio', 'Internacional', 'Flamengo', 'Santos'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Qual clube foi bicampeão da Libertadores em 1992 e 1993, com Telê Santana?', options: ['São Paulo', 'Palmeiras', 'Santos', 'Corinthians'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Quem o São Paulo venceu nos pênaltis na final da Libertadores de 1992?', options: ["Newell's Old Boys", 'Boca Juniors', 'River Plate', 'Universidad Católica'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Qual clube venceu a Libertadores de 1998, contra o Barcelona de Guayaquil?', options: ['Vasco', 'Cruzeiro', 'Grêmio', 'Palmeiras'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Em que ano o Palmeiras conquistou sua primeira Libertadores?', options: ['1999', '1996', '2000', '1994'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Quem foi o goleiro do Palmeiras na final da Libertadores de 1999?', options: ['Marcos', 'Zetti', 'Dida', 'Fernando Prass'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Quem o Boca Juniors venceu nos pênaltis na final da Libertadores de 2000?', options: ['Palmeiras', 'Cruzeiro', 'Corinthians', 'Vasco'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Qual clube colombiano venceu a Libertadores de 2004, batendo o Boca nos pênaltis?', options: ['Once Caldas', 'Atlético Nacional', 'América de Cali', 'Millonarios'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Quem o Internacional venceu na final da Libertadores de 2006?', options: ['São Paulo', 'Boca Juniors', 'Santos', 'River Plate'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Qual clube equatoriano venceu a Libertadores de 2008, contra o Fluminense?', options: ['LDU', 'Barcelona de Guayaquil', 'Emelec', 'Independiente del Valle'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Qual clube venceu a Libertadores de 2011, 48 anos após seu título anterior na competição?', options: ['Santos', 'Corinthians', 'Cruzeiro', 'Internacional'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Quem o Santos venceu na final da Libertadores de 2011?', options: ['Peñarol', 'Boca Juniors', 'Cerro Porteño', 'Universidad de Chile'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Qual clube venceu a Libertadores de 2013?', options: ['Atlético-MG', 'Cruzeiro', 'Grêmio', 'São Paulo'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Qual goleiro do Atlético-MG defendeu o pênalti decisivo contra o Tijuana na Libertadores de 2013?', options: ['Victor', 'Fábio', 'Giovanni', 'Everson'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Qual clube argentino venceu a Libertadores de 2014, seu primeiro título?', options: ['San Lorenzo', 'Lanús', 'Racing', 'Vélez Sarsfield'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Quem o Grêmio venceu na final da Libertadores de 2017?', options: ['Lanús', 'Boca Juniors', 'River Plate', 'Barcelona de Guayaquil'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Em qual estádio foi disputado o jogo de volta da final da Libertadores de 2018, River x Boca?', options: ['Santiago Bernabéu (Madri)', 'Monumental de Núñez', 'La Bombonera', 'Camp Nou'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'A partir de qual edição a final da Libertadores passou a ser em jogo único?', options: ['2019', '2017', '2021', '2015'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Em que cidade foi disputada a primeira final única da Libertadores, em 2019?', options: ['Lima', 'Santiago', 'Montevidéu', 'Buenos Aires'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Quem marcou os dois gols do Flamengo na virada sobre o River Plate na final da Libertadores de 2019?', options: ['Gabigol', 'Bruno Henrique', 'Arrascaeta', 'Everton Ribeiro'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Em qual estádio foi disputada a final da Libertadores de 2020, Palmeiras x Santos?', options: ['Maracanã', 'Allianz Parque', 'Vila Belmiro', 'Morumbi'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Em que cidade foi disputada a final da Libertadores de 2022, Flamengo x Athletico-PR?', options: ['Guayaquil', 'Montevidéu', 'Lima', 'Santiago'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Qual é o único clube chileno campeão da Libertadores, em 1991?', options: ['Colo-Colo', 'Universidad de Chile', 'Universidad Católica', 'Cobreloa'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Quem detém o recorde de gols em uma única edição da Libertadores, com 17 gols em 1966?', options: ['Daniel Onega', 'Alberto Spencer', 'Pelé', 'Luizão'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Quantos títulos da Libertadores o Boca Juniors tinha até 2025?', options: ['6', '4', '7', '5'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024_Copa_Libertadores_final
  { q: 'Em qual estádio foi disputada a final da Libertadores de 2024, Botafogo x Atlético-MG?', options: ['Monumental de Núñez (Buenos Aires)', 'Maracanã', 'Centenário (Montevidéu)', 'Monumental de Lima'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024_Copa_Libertadores_final
  { q: 'Qual jogador do Botafogo foi expulso logo no início da final da Libertadores de 2024?', options: ['Gregore', 'Marlon Freitas', 'Alex Telles', 'Bastos'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024_Copa_Libertadores_final
  { q: 'Quem abriu o placar para o Botafogo, já com 10 em campo, na final da Libertadores 2024?', options: ['Luiz Henrique', 'Igor Jesus', 'Savarino', 'Almada'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024_Copa_Libertadores_final
  { q: 'Quem era o técnico do Botafogo campeão da Libertadores de 2024?', options: ['Artur Jorge', 'Renato Paiva', 'Luís Castro', 'Bruno Lage'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/futebol-internacional/libertadores-da-america/epico-palmeiras-goleia-ldu-e-vai-a-final-da-libertadores-contra-o-flamengo/
  { q: 'O Palmeiras perdeu de 3 a 0 para a LDU na ida da semi de 2025. E na volta?', options: ['Venceu por 4 a 0', 'Venceu por 3 a 0 e caiu nos pênaltis', 'Venceu por 3 a 1', 'Empatou por 1 a 1'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  // fonte: https://www.fifa.com/en/articles/ldu-racing-palmeiras-flamengo-libertadores-semis
  { q: 'Qual clube argentino o Flamengo eliminou na semifinal da Libertadores de 2025?', options: ['Racing', 'River Plate', 'Boca Juniors', 'Estudiantes'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Quem fez o gol do título do Flamengo na final da Libertadores de 2022?', options: ['Gabigol', 'Pedro', 'Arrascaeta', 'Everton Ribeiro'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Qual goleiro do Corinthians fez a defesa histórica em Diego Souza, em 2012?', options: ['Cássio', 'Júlio César', 'Walter', 'Dida'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Qual clube argentino venceu a Libertadores de 2015 e de 2018?', options: ['River Plate', 'Boca Juniors', 'San Lorenzo', 'Racing'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  { q: 'Quem o São Paulo venceu na final da Libertadores de 2005?', options: ['Athletico-PR', 'Boca Juniors', 'River Plate', 'Chivas Guadalajara'], correct: 0, cat: 'Libertadores', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2025_Copa_Libertadores
  { q: 'Com o título do Flamengo em 2025, o Brasil igualou a Argentina em títulos da Libertadores. Quantos?', options: ['25', '22', '28', '20'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Copa_Libertadores_da_Am%C3%A9rica_de_2025
  { q: 'Quem foi eleito o melhor jogador da Libertadores de 2025?', options: ['Arrascaeta', 'Pedro', 'Flaco López', 'Raphael Veiga'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Em que cidade foi disputada a final da Libertadores de 2021?', options: ['Montevidéu', 'Lima', 'Guayaquil', 'Buenos Aires'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Em qual estádio foi disputada a final da Libertadores de 2023?', options: ['Maracanã', 'Monumental de Núñez', 'Centenário', 'La Bombonera'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Quem o Internacional venceu na final da Libertadores de 2010?', options: ['Chivas Guadalajara', 'São Paulo', 'Estudiantes', 'Universidad de Chile'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Qual clube tirou do São Paulo o tri seguido da Libertadores, em 1994?', options: ['Vélez Sarsfield', 'Boca Juniors', 'Palmeiras', 'Cruzeiro'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Quem o Grêmio venceu na final da Libertadores de 1995?', options: ['Atlético Nacional', 'Peñarol', 'River Plate', 'Olimpia'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Quem fez os 2 gols do Corinthians no 2 a 0 sobre o Boca, na final de 2012?', options: ['Emerson Sheik', 'Paolo Guerrero', 'Danilo', 'Romarinho'], correct: 0, cat: 'Libertadores', dif: 'dificil' },
  { q: 'Quem eliminou o Palmeiras nos pênaltis na semifinal da Libertadores 2023?', options: ['Boca Juniors', 'Fluminense', 'Internacional', 'River Plate'], correct: 0, cat: 'Libertadores', dif: 'dificil' },

  // ===== BRASILEIRÃO =====
  { q: 'Qual clube venceu a primeira Taça Brasil, em 1959, reconhecida como Campeonato Brasileiro?', options: ['Bahia', 'Santos', 'Palmeiras', 'Botafogo'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Quantas Taças Brasil consecutivas o Santos de Pelé venceu, entre 1961 e 1965?', options: ['5', '3', '4', '6'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube venceu o Robertão (Taça de Prata) de 1970?', options: ['Fluminense', 'Palmeiras', 'Santos', 'Botafogo'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube venceu o primeiro Campeonato Nacional de Clubes, em 1971?', options: ['Atlético-MG', 'São Paulo', 'Botafogo', 'Palmeiras'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Quem foi o artilheiro do Campeonato Brasileiro de 1971?', options: ['Dario (Dadá Maravilha)', 'Tostão', 'Pelé', 'Jairzinho'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube foi campeão brasileiro invicto em 1979?', options: ['Internacional', 'Grêmio', 'Flamengo', 'Palmeiras'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Quem foi o artilheiro do Brasileirão de 1977, com 28 gols pelo Atlético-MG?', options: ['Reinaldo', 'Dadá Maravilha', 'Serginho Chulapa', 'Zico'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube do interior paulista foi campeão brasileiro em 1978?', options: ['Guarani', 'Ponte Preta', 'Bragantino', 'Paulista'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube foi campeão brasileiro em 1980, 1982 e 1983?', options: ['Flamengo', 'Fluminense', 'Grêmio', 'Internacional'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Qual clube paranaense foi campeão brasileiro em 1985?', options: ['Coritiba', 'Athletico-PR', 'Paraná Clube', 'Londrina'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Pela Justiça e pela CBF, quem é o campeão brasileiro de 1987?', options: ['Sport', 'Flamengo', 'Internacional', 'Guarani'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube foi bicampeão brasileiro em 1993 e 1994, na era Parmalat?', options: ['Palmeiras', 'Corinthians', 'São Paulo', 'Vasco'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Quem foi o artilheiro do Brasileirão de 1997, com 29 gols pelo Vasco?', options: ['Edmundo', 'Romário', 'Evair', 'Túlio'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube foi bicampeão brasileiro em 1998 e 1999?', options: ['Corinthians', 'Palmeiras', 'Vasco', 'Cruzeiro'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Qual clube venceu a Copa João Havelange, o Campeonato Brasileiro de 2000?', options: ['Vasco', 'São Caetano', 'Cruzeiro', 'Palmeiras'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube venceu o Brasileirão de 2001?', options: ['Athletico-PR', 'São Caetano', 'Fluminense', 'Grêmio'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube venceu o Brasileirão de 2002, com os jovens Robinho e Diego?', options: ['Santos', 'Corinthians', 'Grêmio', 'São Paulo'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Quantos pontos o Cruzeiro somou no Brasileirão de 2003, em 46 jogos?', options: ['100', '90', '95', '87'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube foi tricampeão brasileiro em 2006, 2007 e 2008?', options: ['São Paulo', 'Corinthians', 'Internacional', 'Cruzeiro'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Quem treinou o São Paulo no tricampeonato brasileiro de 2006 a 2008?', options: ['Muricy Ramalho', 'Paulo Autuori', 'Leão', 'Cuca'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quem foi o artilheiro do Brasileirão de 2005, com 22 gols pelo Vasco?', options: ['Romário', 'Edmundo', 'Fred', 'Washington'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube foi campeão brasileiro em 2009, encerrando um jejum de 17 anos na competição?', options: ['Flamengo', 'Vasco', 'Botafogo', 'Fluminense'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Quem treinou o Corinthians nos títulos brasileiros de 2011 e 2015?', options: ['Tite', 'Mano Menezes', 'Adilson Batista', 'Fábio Carille'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quem foi o artilheiro do Brasileirão de 2022, com 26 gols pelo Fluminense?', options: ['Germán Cano', 'Pedro', 'Calleri', 'Hulk'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube venceu o Brasileirão de 2021, com Cuca como técnico?', options: ['Atlético-MG', 'Flamengo', 'Palmeiras', 'Fortaleza'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Em que ano o Vasco foi rebaixado pela primeira vez no Brasileirão?', options: ['2008', '2013', '2015', '2005'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Em que ano o Grêmio foi rebaixado pela primeira vez no Brasileirão?', options: ['1991', '2004', '2021', '1996'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Em que ano o Botafogo foi rebaixado pela primeira vez no Brasileirão?', options: ['2002', '2014', '2020', '1998'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual grande clube carioca chegou a disputar a Série C em 1999?', options: ['Fluminense', 'Botafogo', 'Vasco', 'Flamengo'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quantos clubes disputam a Série A do Brasileirão desde 2006?', options: ['20', '22', '24', '18'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Quantos clubes disputaram o Brasileirão de 2003, o primeiro por pontos corridos?', options: ['24', '20', '22', '26'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quem foi o artilheiro do Brasileirão de 2018, com 18 gols pelo Santos?', options: ['Gabigol', 'Neymar', 'Rodrygo', 'Ricardo Oliveira'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Qual técnico tem mais títulos do Campeonato Brasileiro, com cinco conquistas?', options: ['Vanderlei Luxemburgo', 'Muricy Ramalho', 'Tite', 'Abel Ferreira'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024_Campeonato_Brasileiro_S%C3%A9rie_A
  { q: 'Quem era o técnico do Botafogo campeão brasileiro de 2024?', options: ['Artur Jorge', 'Luís Castro', 'Renato Paiva', 'Tiago Nunes'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  // fonte: https://www.olympics.com/pt/noticias/brasileirao-2024-tabela-classificacao-segundo-turno
  { q: 'Qual clube foi vice-campeão do Brasileirão de 2024?', options: ['Palmeiras', 'Flamengo', 'Fortaleza', 'Internacional'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024_Campeonato_Brasileiro_S%C3%A9rie_A
  { q: 'Qual destes clubes foi rebaixado no Brasileirão de 2024?', options: ['Athletico-PR', 'Vitória', 'Juventude', 'Fluminense'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube foi campeão brasileiro em 1996, com Luiz Felipe Scolari como técnico?', options: ['Grêmio', 'Internacional', 'Palmeiras', 'Cruzeiro'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Qual clube venceu o Brasileirão de 2020, decidido só em fevereiro de 2021?', options: ['Flamengo', 'Internacional', 'Atlético-MG', 'São Paulo'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Qual clube foi campeão brasileiro em 2017?', options: ['Corinthians', 'Palmeiras', 'Santos', 'Grêmio'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Qual clube foi bicampeão brasileiro em 2013 e 2014?', options: ['Cruzeiro', 'Atlético-MG', 'Corinthians', 'Fluminense'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Em 2016, qual clube voltou a ser campeão brasileiro após 22 anos?', options: ['Palmeiras', 'Santos', 'Flamengo', 'Atlético-MG'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Em 2024, o Botafogo ganhou o Brasileirão e qual outro título?', options: ['Libertadores', 'Copa do Brasil', 'Sul-Americana', 'Recopa'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Em que ano o Flamengo de Jorge Jesus ganhou Brasileirão e Libertadores?', options: ['2019', '2020', '2018', '2022'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  // fonte: https://www.flashscore.com.br/noticias/futebol-brasileirao-betano-guia-do-brasileirao-2026-veja-tabela-favoritos-regulamento-e-onde-assistir/GlOpeEjo/
  { q: 'Desde 2006, com 20 clubes, quantos caem por ano para a Série B?', options: ['4', '3', '2', '5'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Quem era o técnico do Palmeiras campeão brasileiro de 2018?', options: ['Luiz Felipe Scolari', 'Vanderlei Luxemburgo', 'Abel Ferreira', 'Cuca'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  { q: 'Qual clube foi campeão brasileiro de 2012, com Fred artilheiro?', options: ['Fluminense', 'Atlético-MG', 'Grêmio', 'São Paulo'], correct: 0, cat: 'Brasileirão', dif: 'facil' },
  // fonte: https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2025_-_S%C3%A9rie_A
  { q: 'Quantos pontos o Flamengo somou no título do Brasileirão de 2025?', options: ['79', '84', '76', '90'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025_Campeonato_Brasileiro_S%C3%A9rie_A
  { q: 'Qual foi a maior goleada do Brasileirão de 2025?', options: ['Flamengo 8 a 0 Vitória', 'Palmeiras 6 a 0 Sport', 'Cruzeiro 7 a 0 Juventude', 'Flamengo 6 a 1 Fortaleza'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2025_-_S%C3%A9rie_A
  { q: 'Quem foi eleito o melhor técnico do Brasileirão de 2025, pelo trabalho no Mirassol?', options: ['Rafael Guanaes', 'Filipe Luís', 'Abel Ferreira', 'Leonardo Jardim'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025_Campeonato_Brasileiro_S%C3%A9rie_A
  { q: 'Qual clube terminou o Brasileirão 2025 em 3º lugar?', options: ['Cruzeiro', 'Mirassol', 'Fluminense', 'Botafogo'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025_Campeonato_Brasileiro_S%C3%A9rie_A
  { q: 'Quem foi o vice-artilheiro do Brasileirão 2025, com 18 gols?', options: ['Arrascaeta', 'Vitor Roque', 'Pedro', 'Hulk'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube foi campeão brasileiro em 2005, ano da "Máfia do Apito"?', options: ['Corinthians', 'Internacional', 'Goiás', 'Palmeiras'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual ídolo do Corinthians morreu no dia do título brasileiro de 2011?', options: ['Sócrates', 'Rivellino', 'Casagrande', 'Zé Maria'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quem foi o artilheiro do Brasileirão de 2021, com 19 gols?', options: ['Hulk', 'Gabigol', 'Germán Cano', 'Pedro'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Contra quem o Corinthians ganhou seu 1º Brasileirão, em 1990?', options: ['São Paulo', 'Palmeiras', 'Bragantino', 'Vasco'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quem fez o gol do título do Corinthians no Brasileiro de 1990?', options: ['Tupãzinho', 'Neto', 'Viola', 'Ronaldo Giovanelli'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube foi campeão brasileiro de 1995, com Túlio Maravilha?', options: ['Botafogo', 'Santos', 'Fluminense', 'Grêmio'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quem o São Paulo venceu na final do Brasileiro de 1991?', options: ['Bragantino', 'Corinthians', 'Atlético-MG', 'Grêmio'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Quem o Palmeiras venceu na final do Brasileiro de 1994?', options: ['Corinthians', 'São Paulo', 'Guarani', 'Atlético-MG'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube nordestino foi campeão brasileiro de 1988, sobre o Inter?', options: ['Bahia', 'Sport', 'Fortaleza', 'Vitória'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },
  { q: 'Qual clube foi campeão brasileiro de 2010, com Conca como craque?', options: ['Fluminense', 'Cruzeiro', 'Corinthians', 'Grêmio'], correct: 0, cat: 'Brasileirão', dif: 'dificil' },

  // ===== BUNDESLIGA =====
  { q: 'Qual clube venceu a primeira edição da Bundesliga, em 1963-64?', options: ['Colônia (1. FC Köln)', 'Bayern de Munique', 'Hamburgo', 'Borussia Dortmund'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Quantos títulos consecutivos da Bundesliga o Bayern venceu entre 2012-13 e 2022-23?', options: ['11', '9', '10', '12'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Qual clube encerrou a sequência de títulos do Bayern ao vencer a Bundesliga 2023-24?', options: ['Bayer Leverkusen', 'Borussia Dortmund', 'RB Leipzig', 'Stuttgart'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_Bundesliga
  { q: 'Quem treinou o Bayer Leverkusen campeão invicto da Bundesliga 2023-24?', options: ['Xabi Alonso', 'Julian Nagelsmann', 'Thomas Tuchel', 'Edin Terzić'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_Bundesliga
  { q: 'Quantos pontos somou o Leverkusen invicto na Bundesliga 2023-24?', options: ['90', '94', '86', '88'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2023%E2%80%9324_Bundesliga
  { q: 'Quem foi o artilheiro da Bundesliga 2023-24, com 36 gols em sua primeira temporada na Alemanha?', options: ['Harry Kane', 'Serhou Guirassy', 'Loïs Openda', 'Victor Boniface'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_Bundesliga
  { q: 'Qual clube venceu a Bundesliga 2024-25?', options: ['Bayern de Munique', 'Bayer Leverkusen', 'Borussia Dortmund', 'Eintracht Frankfurt'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024%E2%80%9325_Bundesliga
  { q: 'Quem treinou o Bayern campeão da Bundesliga 2024-25?', options: ['Vincent Kompany', 'Thomas Tuchel', 'Julian Nagelsmann', 'Hansi Flick'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Bundesliga
  { q: 'Qual clube foi vice-campeão da Bundesliga 2025-26, atrás do Bayern?', options: ['Borussia Dortmund', 'Bayer Leverkusen', 'RB Leipzig', 'Stuttgart'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Bundesliga
  { q: 'Quantos gols o Bayern marcou na Bundesliga 2025-26?', options: ['122', '98', '106', '115'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  // fonte: https://www.bundesliga.com/en/bundesliga/news/harry-kane-top-scorer-2025-26-third-time-bayern-munich-37407
  { q: 'Quem foi artilheiro da Bundesliga nas suas 3 primeiras temporadas na liga?', options: ['Harry Kane', 'Robert Lewandowski', 'Erling Haaland', 'Serhou Guirassy'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Bundesliga
  { q: 'Quantos títulos da Bundesliga o Bayern acumulava após a temporada 2025-26?', options: ['34', '30', '32', '36'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Como se chama o troféu dado ao artilheiro da Bundesliga?', options: ['Torjägerkanone', 'Goldener Schuh', 'Meisterschale', 'Torschützenpokal'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  // fonte: https://de.wikipedia.org/wiki/Torj%C3%A4gerkanone
  { q: 'Quais dois jogadores dividem o recorde de sete artilharias da Bundesliga?', options: ['Gerd Müller e Robert Lewandowski', 'Gerd Müller e Karl-Heinz Rummenigge', 'Robert Lewandowski e Miroslav Klose', 'Uwe Seeler e Gerd Müller'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Quem marcou 41 gols na Bundesliga 2020-21, recorde de uma única temporada?', options: ['Robert Lewandowski', 'Erling Haaland', 'Harry Kane', 'Thomas Müller'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Quem detinha o recorde anterior de gols em uma temporada da Bundesliga, com 40 gols em 1971-72?', options: ['Gerd Müller', 'Uwe Seeler', 'Karl-Heinz Rummenigge', 'Klaus Fischer'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/List_of_Bundesliga_top_scorers
  { q: 'Quem é o maior artilheiro da história da Bundesliga, com 365 gols?', options: ['Gerd Müller', 'Robert Lewandowski', 'Klaus Fischer', 'Jupp Heynckes'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Qual brasileiro foi o artilheiro da Bundesliga 2008-09, pelo Wolfsburg campeão?', options: ['Grafite', 'Diego', 'Naldo', 'Cacau'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Qual brasileiro dividiu a artilharia da Bundesliga 2002-03, pelo Bayern de Munique?', options: ['Giovane Élber', 'Zé Roberto', 'Lúcio', 'Paulo Sérgio'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Qual brasileiro foi o artilheiro da Bundesliga 2003-04, pelo Werder Bremen campeão?', options: ['Aílton', 'Marcelinho Paraíba', 'Grafite', 'Amoroso'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Além do Bayern de Munique, por quais outros clubes alemães Zé Roberto jogou?', options: ['Bayer Leverkusen e Hamburgo', 'Borussia Dortmund e Schalke 04', 'Wolfsburg e Stuttgart', 'Werder Bremen e Colônia'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Por quais dois clubes alemães o zagueiro Lúcio jogou?', options: ['Bayer Leverkusen e Bayern de Munique', 'Borussia Dortmund e Bayern de Munique', 'Hamburgo e Schalke 04', 'Stuttgart e Bayer Leverkusen'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Quem treinou o Borussia Dortmund bicampeão da Bundesliga em 2010-11 e 2011-12?', options: ['Jürgen Klopp', 'Thomas Tuchel', 'Ottmar Hitzfeld', 'Lucien Favre'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Quantos títulos da Bundesliga o Borussia Dortmund tinha até 2026?', options: ['5', '8', '3', '6'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Qual clube venceu a Bundesliga 1997-98 na condição de recém-promovido?', options: ['Kaiserslautern', 'Wolfsburg', 'Hoffenheim', 'Eintracht Frankfurt'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Qual clube, único a jamais ter caído até então, foi rebaixado pela primeira vez da Bundesliga em 2018?', options: ['Hamburgo', 'Werder Bremen', 'Colônia', 'Schalke 04'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Quantos clubes disputam a Bundesliga?', options: ['18', '20', '16', '22'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Qual clube alemão foi vice em 3 torneios na mesma temporada, 2001-02?', options: ['Bayer Leverkusen', 'Schalke 04', 'Borussia Dortmund', 'Hamburgo'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Qual é o estádio do Bayern de Munique desde 2005?', options: ['Allianz Arena', 'Olympiastadion', 'Signal Iduna Park', 'Veltins-Arena'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Qual clube alemão tem a arquibancada conhecida como "Muralha Amarela"?', options: ['Borussia Dortmund', 'Bayern de Munique', 'Schalke 04', 'Eintracht Frankfurt'], correct: 0, cat: 'Bundesliga', dif: 'facil' },

  // ===== COPA AMÉRICA =====
  // fonte: https://en.wikipedia.org/wiki/2024_Copa_Am%C3%A9rica_final
  { q: 'Qual seleção tem mais títulos de Copa América, com 16 até 2024?', options: ['Argentina', 'Uruguai', 'Brasil', 'Chile'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Quantos títulos de Copa América o Uruguai tinha até 2024?', options: ['15', '12', '16', '9'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024_Copa_Am%C3%A9rica_final
  { q: 'Quem marcou o gol do título da Argentina na final da Copa América de 2024, contra a Colômbia?', options: ['Lautaro Martínez', 'Lionel Messi', 'Ángel Di María', 'Julián Álvarez'], correct: 0, cat: 'Copa América', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024_Copa_Am%C3%A9rica_final
  { q: 'Em qual estádio foi disputada a final da Copa América de 2024?', options: ['Hard Rock Stadium (Miami)', 'MetLife Stadium (Nova Jersey)', 'Rose Bowl (Pasadena)', 'AT&T Stadium (Dallas)'], correct: 0, cat: 'Copa América', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/2024_Copa_Am%C3%A9rica
  { q: 'Quem foi eleito o melhor jogador da Copa América de 2024?', options: ['James Rodríguez', 'Lionel Messi', 'Lautaro Martínez', 'Emiliano Martínez'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  // fonte: https://www.conmebol.com/pt-br/noticias-pt-br/uruguai-e-bronze-na-conmebol-copa-america-usa-2024/
  { q: 'Quem ficou em 3º na Copa América 2024?', options: ['Uruguai', 'Colômbia', 'Brasil', 'Venezuela'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2024_Copa_Am%C3%A9rica_final
  { q: 'Qual país sediou a Copa América de 2024?', options: ['Estados Unidos', 'Argentina', 'Equador', 'Brasil'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Quem marcou o gol da Argentina na final da Copa América de 2021, contra o Brasil, no Maracanã?', options: ['Ángel Di María', 'Lionel Messi', 'Lautaro Martínez', 'Rodrigo De Paul'], correct: 0, cat: 'Copa América', dif: 'facil' },
  // fonte: https://en.wikipedia.org/wiki/Copa_Am%C3%A9rica_records_and_statistics
  { q: 'Quem dividiu com Messi a artilharia da Copa América 2021?', options: ['Luis Díaz', 'Neymar', 'Lautaro Martínez', 'Lucas Paquetá'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Em qual estádio foi disputada a final da Copa América de 2019, Brasil 3 a 1 Peru?', options: ['Maracanã', 'Arena Corinthians', 'Mineirão', 'Morumbi'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Qual brasileiro dividiu com Guerrero a artilharia da Copa América 2019?', options: ['Everton Cebolinha', 'Gabriel Jesus', 'Roberto Firmino', 'Philippe Coutinho'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Qual seleção venceu as Copas América de 2015 e 2016?', options: ['Chile', 'Argentina', 'Colômbia', 'Uruguai'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Quem o Chile venceu nos pênaltis nas finais das Copas América de 2015 e 2016?', options: ['Argentina', 'Brasil', 'Uruguai', 'Colômbia'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Em qual país foi disputada a Copa América Centenário, em 2016?', options: ['Estados Unidos', 'Argentina', 'Uruguai', 'México'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa América de 2011, disputada na Argentina?', options: ['Uruguai', 'Paraguai', 'Brasil', 'Argentina'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Quem fez 2 gols na final da Copa América 2011?', options: ['Diego Forlán', 'Luis Suárez', 'Edinson Cavani', 'Diego Lugano'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Quem marcou o gol de empate do Brasil nos acréscimos da final da Copa América de 2004, contra a Argentina?', options: ['Adriano', 'Luís Fabiano', 'Kaká', 'Alex'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Qual seleção venceu a Copa América de 2001, como anfitriã?', options: ['Colômbia', 'México', 'Honduras', 'Uruguai'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Quem o Brasil venceu por 3 a 0 na final da Copa América de 1999?', options: ['Uruguai', 'Argentina', 'México', 'Chile'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Quem dividiu com Rivaldo a artilharia da Copa América 99?', options: ['Ronaldo', 'Amoroso', 'Romário', 'Zé Roberto'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Quem marcou o gol do título do Brasil na Copa América de 1989, contra o Uruguai, no Maracanã?', options: ['Romário', 'Bebeto', 'Careca', 'Müller'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Qual seleção venceu a edição de 1975, a primeira com o nome de Copa América?', options: ['Peru', 'Colômbia', 'Brasil', 'Uruguai'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Qual seleção venceu a Copa América de 1979?', options: ['Paraguai', 'Chile', 'Argentina', 'Peru'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Copa América de 1991, vencida pela Argentina?', options: ['Gabriel Batistuta', 'Claudio Caniggia', 'Diego Simeone', 'Abel Balbo'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Quem divide com Zizinho o recorde de 17 gols em Copas América?', options: ['Norberto Méndez', 'Gabriel Batistuta', 'Lionel Messi', 'Ademir'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  { q: 'Em qual país foi disputada a Copa América de 2021?', options: ['Brasil', 'Argentina', 'Colômbia', 'Estados Unidos'], correct: 0, cat: 'Copa América', dif: 'facil' },
  { q: 'Quem venceu o 1º Sul-Americano, em 1916?', options: ['Uruguai', 'Argentina', 'Brasil', 'Chile'], correct: 0, cat: 'Copa América', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/Copa_Am%C3%A9rica_records_and_statistics
  { q: 'Quem foi o artilheiro da Copa América de 2016, com 6 gols?', options: ['Eduardo Vargas', 'Alexis Sánchez', 'Lionel Messi', 'Gonzalo Higuaín'], correct: 0, cat: 'Copa América', dif: 'dificil' },

  // ===== COPA DO BRASIL =====
  { q: 'Em que ano foi disputada a primeira edição da Copa do Brasil?', options: ['1989', '1985', '1991', '1993'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Qual clube venceu a primeira Copa do Brasil, em 1989?', options: ['Grêmio', 'Sport', 'Flamengo', 'Cruzeiro'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Quem o Grêmio venceu na final da Copa do Brasil de 1989?', options: ['Sport', 'Flamengo', 'Bahia', 'Corinthians'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Qual clube catarinense venceu a Copa do Brasil de 1991?', options: ['Criciúma', 'Figueirense', 'Avaí', 'Joinville'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Quem treinou o Criciúma campeão da Copa do Brasil de 1991?', options: ['Luiz Felipe Scolari', 'Vanderlei Luxemburgo', 'Levir Culpi', 'Émerson Leão'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Qual clube gaúcho venceu a Copa do Brasil de 1999, contra o Botafogo?', options: ['Juventude', 'Grêmio', 'Internacional', 'Caxias'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Qual clube do ABC paulista venceu a Copa do Brasil de 2004, contra o Flamengo?', options: ['Santo André', 'São Caetano', 'São Bernardo', 'Paulista'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Qual clube venceu a Copa do Brasil de 2005, contra o Fluminense?', options: ['Paulista de Jundiaí', 'Santo André', 'Ponte Preta', 'Ituano'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Qual clube pernambucano venceu a Copa do Brasil de 2008, contra o Corinthians?', options: ['Sport', 'Náutico', 'Santa Cruz', 'Bahia'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Qual clube venceu a Copa do Brasil de 2010, com Neymar e Ganso?', options: ['Santos', 'Vasco', 'Palmeiras', 'Vitória'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Qual clube venceu a Copa do Brasil de 2011, contra o Coritiba?', options: ['Vasco', 'Flamengo', 'Botafogo', 'Atlético-MG'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Qual clube venceu a Copa do Brasil de 2019, contra o Internacional?', options: ['Athletico-PR', 'Cruzeiro', 'Grêmio', 'Coritiba'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Qual clube venceu a Copa do Brasil de 2023, seu primeiro título na competição?', options: ['São Paulo', 'Flamengo', 'Fortaleza', 'Bahia'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Quem o Palmeiras venceu na final da Copa do Brasil de 2020, disputada em 2021?', options: ['Grêmio', 'Santos', 'Internacional', 'América-MG'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Quem o Palmeiras venceu nos pênaltis na final da Copa do Brasil de 2015?', options: ['Santos', 'Fluminense', 'Corinthians', 'Flamengo'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Quem o Atlético-MG venceu na final da Copa do Brasil de 2014?', options: ['Cruzeiro', 'Flamengo', 'Grêmio', 'Corinthians'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Quem o Flamengo venceu nos pênaltis na final da Copa do Brasil de 2022?', options: ['Corinthians', 'São Paulo', 'Fluminense', 'Athletico-PR'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Quem o Cruzeiro venceu nos pênaltis na final da Copa do Brasil de 2017?', options: ['Flamengo', 'Grêmio', 'Corinthians', 'Botafogo'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/Copa_do_Brasil
  { q: 'Quantos títulos da Copa do Brasil o Grêmio tinha até 2025?', options: ['5', '3', '6', '4'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  // fonte: https://www.espn.com.br/futebol/artigo/_/id/10243627/fred-ultrapassa-romario-e-se-torna-o-maior-artilheiro-da-historia-da-copa-do-brasil
  { q: 'Quem é o maior artilheiro da história da Copa do Brasil, com 37 gols?', options: ['Fred', 'Romário', 'Gabigol', 'Dodô'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  // fonte: https://www.espn.com.br/futebol/artigo/_/id/10243627/fred-ultrapassa-romario-e-se-torna-o-maior-artilheiro-da-historia-da-copa-do-brasil
  { q: 'Quem Fred ultrapassou para se tornar o maior artilheiro da Copa do Brasil?', options: ['Romário', 'Edmundo', 'Túlio', 'Evair'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Final_da_Copa_do_Brasil_de_Futebol_de_2024
  { q: 'Quem o Flamengo venceu na final da Copa do Brasil de 2024?', options: ['Atlético-MG', 'Corinthians', 'Vasco', 'Athletico-PR'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  // fonte: https://pt.wikipedia.org/wiki/Final_da_Copa_do_Brasil_de_Futebol_de_2024
  { q: 'Qual foi o placar agregado da final da Copa do Brasil de 2024, Flamengo x Atlético-MG?', options: ['4 a 1 (3 a 1 e 1 a 0)', '3 a 1 (2 a 1 e 1 a 0)', '2 a 2, com pênaltis', '5 a 2 (3 a 1 e 2 a 1)'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Final_da_Copa_do_Brasil_de_Futebol_de_2024
  { q: 'Quem marcou dois gols no jogo de ida da final da Copa do Brasil de 2024, no Maracanã?', options: ['Gabigol', 'Pedro', 'Arrascaeta', 'Bruno Henrique'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Final_da_Copa_do_Brasil_de_Futebol_de_2024
  { q: 'Quem marcou o gol do Flamengo no jogo de volta da final da Copa do Brasil de 2024, na Arena MRV?', options: ['Gonzalo Plata', 'Gabigol', 'Léo Pereira', 'Michael'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  // fonte: https://www.lance.com.br/vasco/vegetti-do-vasco-termina-a-copa-do-brasil-como-artilheiro.html
  { q: 'Quem foi o artilheiro da Copa do Brasil de 2024, com 7 gols pelo Vasco?', options: ['Pablo Vegetti', 'Enner Valencia', 'Hulk', 'Yuri Alberto'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Final_da_Copa_do_Brasil_de_Futebol_de_2025
  { q: 'Quem o Corinthians venceu na final da Copa do Brasil de 2025?', options: ['Vasco', 'Flamengo', 'Fluminense', 'Cruzeiro'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  // fonte: https://pt.wikipedia.org/wiki/Final_da_Copa_do_Brasil_de_Futebol_de_2025
  { q: 'Quem fez o 2º gol do Corinthians no 2 a 1 sobre o Vasco, na final da Copa do Brasil 2025?', options: ['Memphis Depay', 'Yuri Alberto', 'Rodrigo Garro', 'Breno Bidon'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Final_da_Copa_do_Brasil_de_Futebol_de_2025
  { q: 'Quem era o técnico do Corinthians campeão da Copa do Brasil de 2025?', options: ['Dorival Júnior', 'Ramón Díaz', 'Tite', 'Mano Menezes'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Qual clube ganhou a Copa do Brasil e caiu no Brasileirão no mesmo ano, 2012?', options: ['Palmeiras', 'Coritiba', 'Sport', 'Vasco'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Quem o Flamengo venceu na final da Copa do Brasil de 2013?', options: ['Athletico-PR', 'Atlético-MG', 'Goiás', 'Grêmio'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Quem o Grêmio venceu na final da Copa do Brasil de 2016?', options: ['Atlético-MG', 'Cruzeiro', 'Internacional', 'Flamengo'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Qual clube ganhou a Copa do Brasil de 2000 com gol de falta de Geovanni no fim?', options: ['Cruzeiro', 'São Paulo', 'Grêmio', 'Santos'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  { q: 'Quem o Atlético-MG venceu na final da Copa do Brasil de 2021?', options: ['Athletico-PR', 'Flamengo', 'Fortaleza', 'Palmeiras'], correct: 0, cat: 'Copa do Brasil', dif: 'dificil' },
  // fonte: https://pt.wikipedia.org/wiki/Final_da_Copa_do_Brasil_de_Futebol_de_2025
  { q: 'Quantos títulos da Copa do Brasil o Corinthians passou a ter com a conquista de 2025?', options: ['4', '3', '5', '2'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Qual clube venceu a Copa do Brasil de 2009, com Ronaldo Fenômeno?', options: ['Corinthians', 'Internacional', 'Flamengo', 'Vasco'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Qual clube de Felipão venceu a Copa do Brasil de 1998, sobre o Cruzeiro?', options: ['Palmeiras', 'Grêmio', 'Corinthians', 'Vasco'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },
  { q: 'Qual clube venceu a Copa do Brasil de 2006, numa final contra o Vasco?', options: ['Flamengo', 'Fluminense', 'Botafogo', 'Corinthians'], correct: 0, cat: 'Copa do Brasil', dif: 'facil' },

  // ===== Lote 4 (set/2026): engorda Champions, La Liga, Serie A, Bundesliga, Premier League, Seleção e Copas =====
  // ===================== CHAMPIONS LEAGUE (12 fáceis) =====================
  { q: 'Qual clube venceu a Champions League de 2011, batendo o Manchester United por 3 a 1 em Wembley?', options: ['Barcelona', 'Real Madrid', 'Chelsea', 'Bayern de Munique'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Qual clube venceu a Champions League de 2015, em Berlim, contra a Juventus?', options: ['Barcelona', 'Real Madrid', 'Bayern de Munique', 'Chelsea'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Qual clube venceu a Champions League de 2017, em Cardiff, goleando a Juventus por 4 a 1?', options: ['Real Madrid', 'Barcelona', 'Atlético de Madrid', 'Bayern de Munique'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Qual clube venceu a Champions League de 2008, nos pênaltis contra o Chelsea, em Moscou?', options: ['Manchester United', 'Liverpool', 'Arsenal', 'Barcelona'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Qual clube venceu a Champions League de 2006, batendo o Arsenal por 2 a 1 em Paris?', options: ['Barcelona', 'Real Madrid', 'Milan', 'Juventus'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Qual clube venceu a Champions League de 2007, em Atenas, na revanche da final de 2005 contra o Liverpool?', options: ['Milan', 'Inter de Milão', 'Juventus', 'Chelsea'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quantos títulos de Champions League / Copa dos Campeões o Liverpool tinha até 2026?', options: ['6', '5', '7', '4'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quantos títulos de Champions League / Copa dos Campeões o Bayern de Munique tinha até 2026?', options: ['6', '5', '7', '4'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Em quais três idiomas é cantado o hino da Champions League?', options: ['Inglês, francês e alemão', 'Inglês, espanhol e italiano', 'Inglês, francês e espanhol', 'Latim, inglês e francês'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Como é apelidado o troféu da Champions League, por causa de suas grandes alças?', options: ['Orelhuda', 'Taça Grande', 'Rainha da Europa', 'Estrela'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quem marcou 17 gols na Champions League 2013-14, recorde de uma única edição?', options: ['Cristiano Ronaldo', 'Lionel Messi', 'Robert Lewandowski', 'Karim Benzema'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quantos jogos cada clube disputa na fase de liga da Champions, no formato adotado em 2024-25?', options: ['8', '6', '10', '4'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quem empatou para o Chelsea aos 88 e bateu o pênalti do título em 2012?', options: ['Didier Drogba', 'Frank Lampard', 'Fernando Torres', 'Juan Mata'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Qual clube virou sobre o Barcelona com um 4 a 0 em Anfield, em 2019?', options: ['Liverpool', 'Tottenham', 'Manchester City', 'Chelsea'], correct: 0, cat: 'Champions', dif: 'facil' },
  { q: 'Quem fez o gol do título do Bayern aos 89 na final da Champions de 2013?', options: ['Arjen Robben', 'Mario Mandžukić', 'Thomas Müller', 'Franck Ribéry'], correct: 0, cat: 'Champions', dif: 'facil' },

  // ===================== LA LIGA (12 fáceis) =====================
  { q: 'Como é chamado o clássico entre Real Madrid e Barcelona?', options: ['El Clásico', 'El Derbi', 'La Final', 'El Superclásico'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual é o estádio do Atlético de Madrid desde 2017?', options: ['Metropolitano', 'Vicente Calderón', 'Santiago Bernabéu', 'Mestalla'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual clube manda seus jogos no estádio Ramón Sánchez-Pizjuán?', options: ['Sevilla', 'Real Betis', 'Valencia', 'Villarreal'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual clube manda seus jogos no estádio San Mamés?', options: ['Athletic Bilbao', 'Real Sociedad', 'Osasuna', 'Celta de Vigo'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual é o segundo maior campeão da história do Campeonato Espanhol, atrás do Real Madrid?', options: ['Barcelona', 'Atlético de Madrid', 'Athletic Bilbao', 'Valencia'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual clube espanhol só escala jogadores formados no País Basco?', options: ['Athletic Bilbao', 'Real Sociedad', 'Osasuna', 'Alavés'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual brasileiro venceu a Bola de Ouro de 1999 jogando pelo Barcelona?', options: ['Rivaldo', 'Ronaldo', 'Romário', 'Ronaldinho'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual lateral-esquerdo brasileiro jogou no Real Madrid de 1996 a 2007?', options: ['Roberto Carlos', 'Marcelo', 'Branco', 'Júnior'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual brasileiro do Barcelona foi aplaudido de pé pela torcida do Real Madrid no Bernabéu, em 2005?', options: ['Ronaldinho', 'Rivaldo', 'Romário', 'Neymar'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual brasileiro se apresentou ao Real Madrid em 2018, vindo do Flamengo?', options: ['Vinícius Júnior', 'Rodrygo', 'Endrick', 'Reinier'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Qual atacante uruguaio formou o trio "MSN" com Messi e Neymar no Barcelona?', options: ['Luis Suárez', 'Edinson Cavani', 'Diego Forlán', 'Darwin Núñez'], correct: 0, cat: 'La Liga', dif: 'facil' },
  { q: 'Quem é o maior artilheiro da história do Barcelona?', options: ['Lionel Messi', 'Luis Suárez', 'Ronaldinho', 'Samuel Eto\'o'], correct: 0, cat: 'La Liga', dif: 'facil' },
  // fonte: https://www.laliga.com/en-GB/news/lamine-yamal-ea-sports-laliga-player-of-the-season-2025-2026
  { q: 'Quem foi eleito o melhor jogador da La Liga 2025-26?', options: ['Lamine Yamal', 'Kylian Mbappé', 'Raphinha', 'Pedri'], correct: 0, cat: 'La Liga', dif: 'facil' },

  // ===================== SERIE A (8 fáceis + 5 difíceis) =====================
  { q: 'Como é chamado o clássico entre Roma e Lazio?', options: ['Derby della Capitale', 'Derby della Madonnina', "Derby d'Italia", 'Derby della Mole'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Qual clube italiano manda seus jogos no Allianz Stadium, inaugurado em 2011?', options: ['Juventus', 'Inter de Milão', 'Milan', 'Torino'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Qual atacante sueco jogou por Juventus, Inter de Milão e Milan na Itália?', options: ['Zlatan Ibrahimović', 'Henrik Larsson', 'Dejan Kulusevski', 'Alexander Isak'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Como é chamado o título do Campeonato Italiano, simbolizado por um escudo tricolor na camisa do campeão?', options: ['Scudetto', 'Capocannoniere', 'Tricolore', 'Coppa Italia'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Qual clube italiano é apelidado de "Vecchia Signora" (Velha Senhora)?', options: ['Juventus', 'Milan', 'Inter de Milão', 'Roma'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Qual clube italiano é conhecido como "Rossoneri" (vermelhos e pretos)?', options: ['Milan', 'Inter de Milão', 'Juventus', 'Torino'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Por qual clube italiano Ronaldinho jogou entre 2008 e 2011?', options: ['Milan', 'Inter de Milão', 'Juventus', 'Roma'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Por qual clube italiano Adriano, o "Imperador", brilhou nos anos 2000?', options: ['Inter de Milão', 'Milan', 'Juventus', 'Fiorentina'], correct: 0, cat: 'Serie A', dif: 'facil' },
  { q: 'Qual sueco é o maior artilheiro da história do Milan?', options: ['Gunnar Nordahl', 'Zlatan Ibrahimović', 'Nils Liedholm', 'Gunnar Gren'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Quem é o maior artilheiro da história da Juventus, com 290 gols?', options: ['Alessandro Del Piero', 'Roberto Baggio', 'David Trezeguet', 'Giampiero Boniperti'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Qual clube da Sardenha foi campeão italiano em 1969-70, com Gigi Riva?', options: ['Cagliari', 'Bologna', 'Fiorentina', 'Torino'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Qual clube italiano faliu em 2002 e teve de recomeçar na quarta divisão?', options: ['Fiorentina', 'Parma', 'Napoli', 'Lazio'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  { q: 'Quantas vezes Ciro Immobile foi artilheiro da Serie A?', options: ['4', '2', '3', '5'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Serie_A
  { q: 'Qual clube foi vice-campeão italiano em 2025-26, atrás da Inter?', options: ['Napoli', 'Milan', 'Juventus', 'Roma'], correct: 0, cat: 'Serie A', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Serie_A
  { q: 'Qual destes clubes foi rebaixado da Serie A 2025-26?', options: ['Hellas Verona', 'Como', 'Sassuolo', 'Cagliari'], correct: 0, cat: 'Serie A', dif: 'dificil' },

  // ===================== BUNDESLIGA (10 fáceis + 6 difíceis) =====================
  { q: 'Como é chamado o clássico entre Bayern de Munique e Borussia Dortmund?', options: ['Der Klassiker', 'Revierderby', 'Nordderby', 'Derby da Baviera'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Qual clube alemão foi fundado em 2009 pela empresa de bebidas energéticas Red Bull?', options: ['RB Leipzig', 'Hoffenheim', 'Wolfsburg', 'Bayer Leverkusen'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Quem treinou o Bayern de Munique na tríplice coroa de 2013?', options: ['Jupp Heynckes', 'Pep Guardiola', 'Louis van Gaal', 'Ottmar Hitzfeld'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Qual técnico comandou o Bayern de Munique de 2013 a 2016, antes de ir para o Manchester City?', options: ['Pep Guardiola', 'Carlo Ancelotti', 'Jürgen Klopp', 'Thomas Tuchel'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Quem treinou o Bayern de Munique na temporada 2019-20, que terminou com seis títulos (sêxtuplo)?', options: ['Hansi Flick', 'Niko Kovač', 'Julian Nagelsmann', 'Thomas Tuchel'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Por qual clube alemão Erling Haaland jogou antes de ir para o Manchester City?', options: ['Borussia Dortmund', 'Bayern de Munique', 'RB Leipzig', 'Bayer Leverkusen'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Por qual clube alemão Robert Lewandowski jogou antes de se transferir para o Bayern de Munique?', options: ['Borussia Dortmund', 'Schalke 04', 'Wolfsburg', 'Werder Bremen'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Quem é o maior artilheiro estrangeiro da história da Bundesliga?', options: ['Robert Lewandowski', 'Claudio Pizarro', 'Giovane Élber', 'Erling Haaland'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Qual clube alemão é conhecido como "Werkself" (time da fábrica), por ter sido fundado por funcionários da Bayer?', options: ['Bayer Leverkusen', 'Wolfsburg', 'Schalke 04', 'Borussia Dortmund'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Qual goleiro venceu as Champions League de 2013 e 2020 pelo Bayern de Munique?', options: ['Manuel Neuer', 'Oliver Kahn', 'Marc-André ter Stegen', 'Sven Ulreich'], correct: 0, cat: 'Bundesliga', dif: 'facil' },
  { q: 'Contra qual clube Lewandowski marcou cinco gols em nove minutos, em 2015?', options: ['Wolfsburg', 'Borussia Dortmund', 'Schalke 04', 'Hamburgo'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Qual jogador tem mais partidas na história da Bundesliga, com 602, todas pelo Eintracht Frankfurt?', options: ['Charly Körbel', 'Thomas Müller', 'Manfred Kaltz', 'Sepp Maier'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Qual clube foi campeão da Bundesliga em 2006-07, quebrando a sequência de Bayern e Werder Bremen?', options: ['Stuttgart', 'Schalke 04', 'Wolfsburg', 'Hamburgo'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Qual técnico foi campeão da Bundesliga pelo Borussia Dortmund em 1995 e 1996 e depois pelo Bayern de Munique?', options: ['Ottmar Hitzfeld', 'Jupp Heynckes', 'Jürgen Klopp', 'Felix Magath'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  { q: 'Qual clube alemão foi campeão da Bundesliga e da Copa dos Campeões em 1983, comandado por Ernst Happel?', options: ['Hamburgo', 'Borussia Mönchengladbach', 'Colônia (1. FC Köln)', 'Stuttgart'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  // fonte: https://www.bundesliga.com/en/bundesliga/news/manuel-neuer-equals-thomas-muller-record-13-titles-bayern-munich-36939
  { q: 'Quais dois jogadores do Bayern dividem o recorde de 13 títulos da Bundesliga (até 2026)?', options: ['Thomas Müller e Manuel Neuer', 'Thomas Müller e Robert Lewandowski', 'Franz Beckenbauer e Gerd Müller', 'Philipp Lahm e Bastian Schweinsteiger'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Bundesliga
  { q: 'Qual clube caiu da Bundesliga em 2026 após 29 temporadas seguidas na elite?', options: ['Wolfsburg', 'Werder Bremen', 'Stuttgart', 'Hoffenheim'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },
  // fonte: https://abcnews.com/Sports/wireStory/wolfsburg-relegated-bundesliga-after-playoff-defeat-paderborn-133297680
  { q: 'Qual clube subiu à Bundesliga em 2026 vencendo o playoff contra o Wolfsburg?', options: ['Paderborn', 'Hamburgo', 'Schalke 04', 'Hertha Berlim'], correct: 0, cat: 'Bundesliga', dif: 'dificil' },

  // ===================== PREMIER LEAGUE (12 difíceis) =====================
  { q: 'Quem marcou 34 gols na Premier League 1993-94 pelo Newcastle, recorde na era de 42 jogos?', options: ['Andy Cole', 'Alan Shearer', 'Les Ferdinand', 'Peter Beardsley'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Quem foi o artilheiro da Premier League 1994-95, com 34 gols pelo Blackburn campeão?', options: ['Alan Shearer', 'Chris Sutton', 'Andy Cole', 'Robbie Fowler'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Quem era o técnico do Blackburn Rovers campeão da Premier League em 1994-95?', options: ['Kenny Dalglish', 'Graeme Souness', 'Roy Hodgson', 'Howard Kendall'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual técnico argentino levou o Leeds de volta à Premier League em 2020, após 16 anos?', options: ['Marcelo Bielsa', 'Mauricio Pochettino', 'Diego Simeone', 'Gerardo Martino'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Quantos gols o Chelsea de Mourinho sofreu na Premier League 2004-05, recorde de menos gols sofridos em uma temporada?', options: ['15', '20', '12', '25'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual atacante do Sunderland levou a Chuteira de Ouro europeia de 1999-2000?', options: ['Kevin Phillips', 'Niall Quinn', 'Dwight Yorke', 'Dion Dublin'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Quem dividiu a artilharia da Premier League 2018-19 com Salah e Mané, com 22 gols?', options: ['Pierre-Emerick Aubameyang', 'Sergio Agüero', 'Harry Kane', 'Jamie Vardy'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  { q: 'Qual jogador tem mais assistências na história da Premier League?', options: ['Ryan Giggs', 'Kevin De Bruyne', 'Cesc Fàbregas', 'Wayne Rooney'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  // fonte: https://www.beinsports.com/en-us/soccer/premier-league/articles/bruno-fernandes-breaks-historic-premier-league-assist-record-2026-05-24
  { q: 'Quem bateu o recorde de assistências numa só temporada da Premier League, com 21?', options: ['Bruno Fernandes', 'Kevin De Bruyne', 'Bukayo Saka', 'Mohamed Salah'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Premier_League
  { q: 'Quem levou a Luva de Ouro da Premier League 2025-26?', options: ['David Raya', 'Alisson', 'Gianluigi Donnarumma', 'Robert Sánchez'], correct: 0, cat: 'Premier League', dif: 'dificil' },
  // fonte: https://en.wikipedia.org/wiki/2025%E2%80%9326_Premier_League
  { q: 'Com o título de 2025-26, quantos Campeonatos Ingleses o Arsenal passou a ter?', options: ['14', '13', '12', '15'], correct: 0, cat: 'Premier League', dif: 'dificil' },

  // ===================== SELEÇÃO BRASILEIRA (10 fáceis + 25 difíceis) =====================
  { q: 'Qual é o apelido da seleção brasileira, em referência à cor da camisa?', options: ['Canarinho', 'Celeste', 'Azzurra', 'Albiceleste'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual era a cor da camisa titular do Brasil na Copa de 1950, antes da adoção da amarela?', options: ['Branca', 'Azul', 'Verde', 'Celeste'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem foi o técnico do Brasil na Copa do Mundo de 2014?', options: ['Luiz Felipe Scolari', 'Dunga', 'Mano Menezes', 'Tite'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem foi o técnico do Brasil nas Copas do Mundo de 2018 e 2022?', options: ['Tite', 'Dunga', 'Luiz Felipe Scolari', 'Fernando Diniz'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem foi o técnico do Brasil no tetracampeonato de 1994?', options: ['Carlos Alberto Parreira', 'Mário Zagallo', 'Telê Santana', 'Luiz Felipe Scolari'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem foi o técnico do Brasil na Copa do Mundo de 2010?', options: ['Dunga', 'Mano Menezes', 'Carlos Alberto Parreira', 'Luiz Felipe Scolari'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual seleção eliminou o Brasil nas quartas de final da Copa de 2018?', options: ['Bélgica', 'França', 'Holanda', 'Croácia'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual seleção eliminou o Brasil nos pênaltis, nas quartas de final da Copa de 2022?', options: ['Croácia', 'Argentina', 'França', 'Holanda'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Qual seleção eliminou o Brasil nas quartas de final da Copa de 2010, com uma virada por 2 a 1?', options: ['Holanda', 'Alemanha', 'Espanha', 'Uruguai'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem é o recordista de jogos pela seleção brasileira (até a Copa de 2026)?', options: ['Cafu', 'Neymar', 'Roberto Carlos', 'Dani Alves'], correct: 0, cat: 'Brasil', dif: 'facil' },
  { q: 'Quem foi o técnico do Brasil na Copa do Mundo de 2006?', options: ['Carlos Alberto Parreira', 'Luiz Felipe Scolari', 'Dunga', 'Vanderlei Luxemburgo'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem foi o técnico do Brasil nas Copas do Mundo de 1982 e 1986?', options: ['Telê Santana', 'Cláudio Coutinho', 'Mário Zagallo', 'Sebastião Lazaroni'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem foi o técnico do Brasil na Copa do Mundo de 1990?', options: ['Sebastião Lazaroni', 'Telê Santana', 'Carlos Alberto Parreira', 'Carlos Alberto Silva'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem foi o técnico do Brasil na conquista da Copa do Mundo de 1958?', options: ['Vicente Feola', 'Aymoré Moreira', 'Flávio Costa', 'Mário Zagallo'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Qual capitão fez o 4º gol da final de 1970?', options: ['Carlos Alberto Torres', 'Pelé', 'Gérson', 'Piazza'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Qual capitão inventou o gesto de erguer a taça, em 1958?', options: ['Bellini', 'Nilton Santos', 'Didi', 'Djalma Santos'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem foi o goleiro titular do Brasil no pentacampeonato de 2002?', options: ['Marcos', 'Dida', 'Rogério Ceni', 'Taffarel'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem foi o goleiro titular do Brasil no tricampeonato de 1970?', options: ['Félix', 'Gilmar', 'Leão', 'Ado'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem era o goleiro do Brasil na derrota para o Uruguai no Maracanaço de 1950?', options: ['Barbosa', 'Gilmar', 'Castilho', 'Félix'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem desenhou a camisa amarela do Brasil?', options: ['Aldyr Garcia Schlee', 'Oscar Niemeyer', 'Alceu Penna', 'Cândido Portinari'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Com camisa de que cor o Brasil jogou a final da Copa de 1958, contra a Suécia?', options: ['Azul', 'Amarela', 'Branca', 'Verde'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem treinou o Brasil no ouro do Rio 2016?', options: ['Rogério Micale', 'Dunga', 'André Jardine', 'Tite'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem foi o técnico do Brasil no bicampeonato olímpico, em Tóquio 2020?', options: ['André Jardine', 'Rogério Micale', 'Tite', 'Ramon Menezes'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem o Brasil venceu por 3 a 0 na final da Copa das Confederações de 2013, no Maracanã?', options: ['Espanha', 'Itália', 'Uruguai', 'Argentina'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem eliminou o Brasil de Telê nos pênaltis, em 1986?', options: ['França', 'Itália', 'Argentina', 'Alemanha Ocidental'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem eliminou o Brasil em 1990, com gol de Caniggia?', options: ['Argentina', 'Itália', 'Alemanha Ocidental', 'Iugoslávia'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem marcou o gol do Brasil na derrota por 7 a 1 para a Alemanha, em 2014?', options: ['Oscar', 'Fred', 'David Luiz', 'Hulk'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Contra qual seleção Roberto Carlos marcou o famoso gol de falta com efeito, em 1997?', options: ['França', 'Itália', 'Inglaterra', 'Argentina'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Para quem o Brasil perdeu por 2 a 1 em sua estreia em Copas do Mundo, em 1930?', options: ['Iugoslávia', 'Uruguai', 'Argentina', 'Bolívia'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem marcou o primeiro gol do Brasil em Copas do Mundo, em 1930?', options: ['Preguinho', 'Leônidas da Silva', 'Friedenreich', 'Zizinho'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  { q: 'Quem marcou o gol da vitória do Uruguai sobre o Brasil no Maracanaço de 1950?', options: ['Ghiggia', 'Schiaffino', 'Obdulio Varela', 'Míguez'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  // fonte: https://agenciabrasil.ebc.com.br/esportes/noticia/2025-06/brasil-joga-mal-e-fica-no-0-0-com-o-equador-na-estreia-de-ancelotti
  { q: 'Contra qual seleção Carlo Ancelotti estreou no comando do Brasil, em um 0 a 0 em junho de 2025?', options: ['Equador', 'Paraguai', 'Argentina', 'Chile'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  // fonte: https://www.lance.com.br/selecao-brasileira/brasil-vence-o-paraguai-no-dia-do-aniversario-de-ancelotti-e-garante-vaga-na-copa-do-mundo.html
  { q: 'Quem fez o 1 a 0 sobre o Paraguai que classificou o Brasil para 2026?', options: ['Vinícius Júnior', 'Raphinha', 'Matheus Cunha', 'Estêvão'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/selecao-brasileira/dorival-junior-e-demitido-da-selecao-brasileira-apos-vexame-na-argentina/
  { q: 'Qual técnico caiu após o 4 a 1 para a Argentina, em 2025?', options: ['Dorival Júnior', 'Fernando Diniz', 'Tite', 'Ramon Menezes'], correct: 0, cat: 'Brasil', dif: 'dificil' },
  // fonte: https://www.cnnbrasil.com.br/esportes/futebol/futebol-internacional/eliminatorias/eliminatorias-brasil-termina-em-quinto-lugar-pior-posicao-da-historia/
  { q: 'Em que lugar o Brasil fechou as Eliminatórias para 2026?', options: ['5º lugar', '3º lugar', '4º lugar', '6º lugar'], correct: 0, cat: 'Brasil', dif: 'dificil' },

  // ===================== COPAS DO MUNDO (10 difíceis) =====================
  { q: 'Qual belga ganhou o 1º prêmio de melhor goleiro de Copa?', options: ['Michel Preud\'homme', 'Jean-Marie Pfaff', 'Thibaut Courtois', 'Filip De Wilde'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual goleiro recebeu a Luva de Ouro da Copa de 2010?', options: ['Iker Casillas', 'Manuel Neuer', 'Júlio César', 'Fernando Muslera'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Em qual Copa do Mundo os cartões amarelo e vermelho foram usados pela primeira vez?', options: ['1970', '1966', '1974', '1962'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual chileno recebeu o primeiro cartão vermelho da história das Copas, em 1974?', options: ['Carlos Caszely', 'Elías Figueroa', 'Leonel Sánchez', 'Iván Zamorano'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual jogo de 2006 virou a "Batalha de Nuremberg"?', options: ['Portugal x Holanda', 'Itália x Austrália', 'Alemanha x Argentina', 'Inglaterra x Equador'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Em qual estádio foi disputada a final da primeira Copa do Mundo, em 1930?', options: ['Centenário (Montevidéu)', 'Maracanã (Rio de Janeiro)', 'Monumental (Buenos Aires)', 'Nacional (Santiago)'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Em qual estádio o Brasil conquistou o tetracampeonato, na final da Copa de 1994?', options: ['Rose Bowl (Pasadena)', 'Giants Stadium (Nova Jersey)', 'Soldier Field (Chicago)', 'Cotton Bowl (Dallas)'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual país sediou a Copa do Mundo de 1954?', options: ['Suíça', 'Suécia', 'Áustria', 'França'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual argentino foi o artilheiro da primeira Copa do Mundo, em 1930, com 8 gols?', options: ['Guillermo Stábile', 'Pedro Cea', 'Héctor Scarone', 'Luis Monti'], correct: 0, cat: 'Copas', dif: 'dificil' },
  { q: 'Qual polonês foi o artilheiro da Copa de 1974, com 7 gols?', options: ['Grzegorz Lato', 'Zbigniew Boniek', 'Kazimierz Deyna', 'Andrzej Szarmach'], correct: 0, cat: 'Copas', dif: 'dificil' },
]
