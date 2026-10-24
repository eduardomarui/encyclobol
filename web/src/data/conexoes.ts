// Puzzles do jogo Conexões: 16 craques, 4 grupos de 4.
// Cada puzzle tem PARTIÇÃO ÚNICA — os 16 só se dividem de uma forma.
// As cores indicam a dificuldade do grupo (corn=fácil → ink=traiçoeiro).

export type GroupColor = 'corn' | 'grass' | 'ochre' | 'ink'

export type ConGroup = {
  label: string
  color: GroupColor
  members: string[] // exatamente 4
}

export type Puzzle = { groups: ConGroup[] }

export const conexoes: Puzzle[] = [
  // 1 — armadilha: Buffon é italiano (mas goleiro); Taffarel é brasileiro (mas goleiro)
  {
    groups: [
      { color: 'corn', label: 'Goleiros lendários', members: ['Yashin', 'Banks', 'Buffon', 'Taffarel'] },
      { color: 'grass', label: 'Zagueiros italianos', members: ['Maldini', 'Baresi', 'Nesta', 'Cannavaro'] },
      { color: 'ochre', label: 'Atacantes brasileiros', members: ['Pelé', 'Romário', 'Ronaldo', 'Neymar'] },
      { color: 'ink', label: 'Franceses', members: ['Zidane', 'Henry', 'Platini', 'Mbappé'] },
    ],
  },
  // 2 — muitos atacantes e meias espalhados: divida por seleção, não por posição
  {
    groups: [
      { color: 'corn', label: 'Holandeses', members: ['Cruyff', 'Gullit', 'Bergkamp', 'Robben'] },
      { color: 'grass', label: 'Alemães', members: ['Beckenbauer', 'Klose', 'Neuer', 'Lahm'] },
      { color: 'ochre', label: 'Meias brasileiros', members: ['Zico', 'Kaká', 'Rivaldo', 'Ronaldinho'] },
      { color: 'ink', label: 'Argentinos', members: ['Maradona', 'Messi', 'Batistuta', 'Kempes'] },
    ],
  },
  // 3 — armadilha clássica: 4 italianos, um em cada grupo de posição
  {
    groups: [
      { color: 'corn', label: 'Goleiros', members: ['Casillas', 'Neuer', 'Banks', 'Buffon'] },
      { color: 'grass', label: 'Zagueiros', members: ['Cannavaro', 'Puyol', 'Ramos', 'Figueroa'] },
      { color: 'ochre', label: 'Laterais', members: ['Cafu', 'Roberto Carlos', 'Zanetti', 'Facchetti'] },
      { color: 'ink', label: 'Atacantes', members: ['Eusébio', 'Forlán', 'Totti', 'Cristiano Ronaldo'] },
    ],
  },
  // 4 — posições com seleções misturadas
  {
    groups: [
      { color: 'corn', label: 'Goleiros', members: ['Casillas', 'Taffarel', 'Banks', 'Neuer'] },
      { color: 'grass', label: 'Laterais', members: ['Cafu', 'Roberto Carlos', 'Lahm', 'Zanetti'] },
      { color: 'ochre', label: 'Maestros do meio', members: ['Zidane', 'Pirlo', 'Platini', 'Gerrard'] },
      { color: 'ink', label: 'Atacantes', members: ['Mbappé', 'Forlán', 'Eusébio', 'Bergkamp'] },
    ],
  },
  // 5 — puro por seleção (mais fácil): cuidado com os atacantes espalhados
  {
    groups: [
      { color: 'corn', label: 'Brasileiros', members: ['Pelé', 'Garrincha', 'Zico', 'Romário'] },
      { color: 'grass', label: 'Italianos', members: ['Maldini', 'Buffon', 'Pirlo', 'Baresi'] },
      { color: 'ochre', label: 'Argentinos', members: ['Maradona', 'Messi', 'Batistuta', 'Zanetti'] },
      { color: 'ink', label: 'Holandeses', members: ['Cruyff', 'Bergkamp', 'Gullit', 'Robben'] },
    ],
  },
  // 6 — por CLUBE. Armadilhas de carreira: Figo (Barça→Real), Ronaldinho
  // (Barça→Milan) e Robben (Real→Bayern) só fecham de um jeito.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Milan', members: ['Maldini', 'Baresi', 'Nesta', 'Gullit'] },
      { color: 'grass', label: 'Jogaram no Bayern de Munique', members: ['Lahm', 'Neuer', 'Beckenbauer', 'Robben'] },
      { color: 'ochre', label: 'Jogaram no Real Madrid', members: ['Figo', 'Zidane', 'Casillas', 'Ramos'] },
      { color: 'ink', label: 'Jogaram no Barcelona', members: ['Messi', 'Ronaldinho', 'Puyol', 'Rivaldo'] },
    ],
  },
  // 7 — CLUBE + posição + seleção misturados. Armadilha: Ronaldinho também
  // jogou no Barça e Messi também é argentino, mas o Milan só fecha com
  // Ronaldinho e os argentinos (Passarella, Batistuta, Kempes, Zanetti) nunca
  // jogaram no Barça, então Messi fica no Barça. (Maradona saiu: jogou no
  // Barça em 1982–84 e abria uma segunda solução.)
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Milan', members: ['Cafu', 'Kaká', 'Ronaldinho', 'Maldini'] },
      { color: 'grass', label: 'Jogaram no Barcelona', members: ['Messi', 'Romário', 'Cruyff', 'Neymar'] },
      { color: 'ochre', label: 'Goleiros', members: ['Buffon', 'Yashin', 'Banks', 'Casillas'] },
      { color: 'ink', label: 'Argentinos', members: ['Passarella', 'Batistuta', 'Kempes', 'Zanetti'] },
    ],
  },
  // 8 — quatro clubes ingleses. Armadilha: Torres jogou em Liverpool E
  // Chelsea (só fecha no Liverpool); muitos ingleses espalhados.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Liverpool', members: ['Gerrard', 'Suárez', 'Xabi Alonso', 'Fernando Torres'] },
      { color: 'grass', label: 'Jogaram no Chelsea', members: ['Drogba', 'Lampard', 'Terry', 'Hazard'] },
      { color: 'ochre', label: 'Jogaram no Arsenal', members: ['Henry', 'Bergkamp', 'Vieira', 'Pirès'] },
      { color: 'ink', label: 'Jogaram no Manchester United', members: ['Rooney', 'Cantona', 'Van Nistelrooy', 'Beckham'] },
    ],
  },
  // 9 — quatro seleções, incluindo um quarteto africano de continentes diferentes.
  {
    groups: [
      { color: 'corn', label: 'Africanos', members: ['Weah', 'Drogba', "Eto'o", 'Salah'] },
      { color: 'grass', label: 'Ingleses', members: ['Rooney', 'Lampard', 'Terry', 'Shearer'] },
      { color: 'ochre', label: 'Espanhóis', members: ['Xavi', 'Iniesta', 'Raúl', 'Fernando Torres'] },
      { color: 'ink', label: 'Uruguaios', members: ['Suárez', 'Cavani', 'Forlán', 'Francescoli'] },
    ],
  },
  // 10 — quatro clubes (Itália + Espanha). Armadilha: Figo (Barça e Real),
  // Zidane (Juve e Real) e Ronaldinho (Barça e Milan) têm dois clubes cada,
  // mas o Real só fecha com Raúl, Casillas, Figo e Zidane, e aí o resto se
  // encaixa de um jeito só. (Seedorf saiu: jogou no Real em 1996–99 e abria
  // uma segunda solução; Shevchenko nunca jogou em Juve, Real ou Barça.)
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Milan', members: ['Maldini', 'Gattuso', 'Nesta', 'Shevchenko'] },
      { color: 'grass', label: 'Jogaram na Juventus', members: ['Buffon', 'Del Piero', 'Nedvěd', 'Trezeguet'] },
      { color: 'ochre', label: 'Jogaram no Real Madrid', members: ['Raúl', 'Casillas', 'Figo', 'Zidane'] },
      { color: 'ink', label: 'Jogaram no Barcelona', members: ['Xavi', 'Iniesta', 'Messi', 'Ronaldinho'] },
    ],
  },
  // 11 — clubes + uma seleção. Robben/Beckham/Suárez têm muitos clubes,
  // mas só fecham num grupo aqui.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Liverpool', members: ['Gerrard', 'Suárez', 'Xabi Alonso', 'Fernando Torres'] },
      { color: 'grass', label: 'Jogaram no Bayern de Munique', members: ['Lahm', 'Neuer', 'Lewandowski', 'Robben'] },
      { color: 'ochre', label: 'Jogaram no Manchester United', members: ['Rooney', 'Cantona', 'Van Nistelrooy', 'Beckham'] },
      { color: 'ink', label: 'Argentinos', members: ['Messi', 'Maradona', 'Agüero', 'Di María'] },
    ],
  },
  // 12 — Inter e PSG (armadilha: Ibrahimović jogou nos dois; Buffon também
  // passou pelo PSG mas fecha nos goleiros).
  {
    groups: [
      { color: 'corn', label: 'Jogaram na Inter de Milão', members: ['Zanetti', 'Sneijder', 'Ibrahimović', 'Crespo'] },
      { color: 'grass', label: 'Jogaram no PSG', members: ['Mbappé', 'Neymar', 'Cavani', 'Di María'] },
      { color: 'ochre', label: 'Goleiros', members: ['Buffon', 'Casillas', 'Yashin', 'Neuer'] },
      { color: 'ink', label: 'Ingleses', members: ['Rooney', 'Lampard', 'Terry', 'Gerrard'] },
    ],
  },
  // 13 — quatro seleções de lendas (posições misturadas de propósito).
  {
    groups: [
      { color: 'corn', label: 'Alemães', members: ['Matthäus', 'Ballack', 'Kahn', 'Klose'] },
      { color: 'grass', label: 'Italianos', members: ['Baggio', 'Del Piero', 'Totti', 'Pirlo'] },
      { color: 'ochre', label: 'Franceses', members: ['Zidane', 'Henry', 'Vieira', 'Cantona'] },
      { color: 'ink', label: 'Brasileiros', members: ['Sócrates', 'Bebeto', 'Adriano', 'Coutinho'] },
    ],
  },
  // 14 — craques em atividade, por clube. Armadilha: Lewandowski (Bayern e
  // Barça) só fecha no Barça; os 4 espanhóis estão espalhados (City e Barça).
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Real Madrid', members: ['Vinícius', 'Bellingham', 'Mbappé', 'Courtois'] },
      { color: 'grass', label: 'Jogaram no Manchester City', members: ['Haaland', 'De Bruyne', 'Foden', 'Rodri'] },
      { color: 'ochre', label: 'Jogaram no Barcelona', members: ['Pedri', 'Gavi', 'Yamal', 'Lewandowski'] },
      { color: 'ink', label: 'Jogaram no Bayern de Munique', members: ['Musiala', 'Kimmich', 'Kane', 'Neuer'] },
    ],
  },
  // 15 — craques em atividade, por seleção.
  {
    groups: [
      { color: 'corn', label: 'Brasileiros', members: ['Vinícius', 'Neymar', 'Raphinha', 'Endrick'] },
      { color: 'grass', label: 'Argentinos', members: ['Lautaro', 'Julián Álvarez', 'Enzo Fernández', 'Mac Allister'] },
      { color: 'ochre', label: 'Portugueses', members: ['Bruno Fernandes', 'Bernardo Silva', 'Rafael Leão', 'Rúben Dias'] },
      { color: 'ink', label: 'Holandeses', members: ['Van Dijk', 'Frenkie de Jong', 'Gakpo', 'Depay'] },
    ],
  },
  // 16 — quatro clubes. Armadilha: Suárez jogou em Liverpool E Atlético,
  // mas só fecha no Liverpool.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Atlético de Madrid', members: ['Griezmann', 'Forlán', 'Courtois', 'Agüero'] },
      { color: 'grass', label: 'Jogaram no Tottenham', members: ['Kane', 'Bale', 'Modrić', 'Cristian Romero'] },
      { color: 'ochre', label: 'Jogaram no Liverpool', members: ['Gerrard', 'Suárez', 'Salah', 'Van Dijk'] },
      { color: 'ink', label: 'Jogaram no Borussia Dortmund', members: ['Lewandowski', 'Haaland', 'Dembélé', 'Bellingham'] },
    ],
  },
  // 17 — por posição, todas as eras. Cuidado: dá pra confundir com seleção.
  {
    groups: [
      { color: 'corn', label: 'Goleiros', members: ['Yashin', 'Zoff', 'Kahn', 'Van der Sar'] },
      { color: 'grass', label: 'Pontas', members: ['Garrincha', 'Robben', 'Figo', 'Bale'] },
      { color: 'ochre', label: 'Centroavantes', members: ['Shearer', 'Batistuta', 'Van Nistelrooy', 'Klose'] },
      { color: 'ink', label: 'Zagueiros', members: ['Baresi', 'Cannavaro', 'Puyol', 'Terry'] },
    ],
  },
  // 18 — por seleção (lendas). Goleiros espalhados servem de isca.
  {
    groups: [
      { color: 'corn', label: 'Espanhóis', members: ['Casillas', 'Puyol', 'Xavi', 'Fernando Torres'] },
      { color: 'grass', label: 'Alemães', members: ['Neuer', 'Lahm', 'Klose', 'Matthäus'] },
      { color: 'ochre', label: 'Brasileiros', members: ['Cafu', 'Ronaldo', 'Kaká', 'Roberto Carlos'] },
      { color: 'ink', label: 'Italianos', members: ['Buffon', 'Maldini', 'Pirlo', 'Totti'] },
    ],
  },
  // 19 — quatro clubes europeus. Iscas de carreira: cada um passou por vários
  // clubes, mas só fecha de um jeito aqui (Lampard tb jogou no City; Čech tb
  // no Arsenal; Modrić tb no Tottenham — nenhum desses é grupo).
  {
    groups: [
      { color: 'corn', label: 'Jogaram na Juventus', members: ['Pirlo', 'Pogba', 'Tevez', 'Buffon'] },
      { color: 'grass', label: 'Jogaram no Bayern de Munique', members: ['Lahm', 'Ribéry', 'Müller', 'Neuer'] },
      { color: 'ochre', label: 'Jogaram no Chelsea', members: ['Drogba', 'Lampard', 'Terry', 'Čech'] },
      { color: 'ink', label: 'Jogaram no Real Madrid', members: ['Modrić', 'Benzema', 'Marcelo', 'Raúl'] },
    ],
  },
  // 20 — por seleção (estrelas atuais), posições misturadas de propósito.
  {
    groups: [
      { color: 'corn', label: 'Brasileiros', members: ['Vinícius', 'Rodrygo', 'Raphinha', 'Endrick'] },
      { color: 'grass', label: 'Argentinos', members: ['Messi', 'Dybala', 'Lautaro', 'Julián Álvarez'] },
      { color: 'ochre', label: 'Franceses', members: ['Mbappé', 'Griezmann', 'Dembélé', 'Giroud'] },
      { color: 'ink', label: 'Portugueses', members: ['Cristiano Ronaldo', 'Bruno Fernandes', 'Bernardo Silva', 'João Félix'] },
    ],
  },
  // 21 — quatro clubes clássicos. Iscas: Salah (tb Chelsea), Robben (tb Real/
  // Chelsea), Vieira (tb City/Inter) — nenhum desses é grupo aqui.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Milan', members: ['Maldini', 'Baresi', 'Gattuso', 'Pirlo'] },
      { color: 'grass', label: 'Jogaram no Liverpool', members: ['Gerrard', 'Salah', 'Suárez', 'Fernando Torres'] },
      { color: 'ochre', label: 'Jogaram no Bayern de Munique', members: ['Lahm', 'Gerd Müller', 'Robben', 'Ribéry'] },
      { color: 'ink', label: 'Jogaram no Arsenal', members: ['Henry', 'Bergkamp', 'Vieira', 'Pirès'] },
    ],
  },

  // ===== Lote 2 (set/2026). `armadilha:` prova a partição única de cada puzzle =====
  // 1 — armadilha: Sócrates também jogou no Flamengo e no Santos; Leonardo
  // também jogou no Flamengo; Ganso também jogou no São Paulo. Nenhum troca de
  // grupo porque Zico/Júnior/Romário/Zagallo (Flamengo), Pelé/Neymar/Rodrygo
  // (Santos) e Kaká/Raí/Casemiro (São Paulo) nunca jogaram em outro dos quatro
  // clubes — não há vaga para ninguém entrar.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Santos', members: ['Pelé', 'Neymar', 'Rodrygo', 'Ganso'] },
      { color: 'grass', label: 'Jogaram no São Paulo', members: ['Kaká', 'Raí', 'Leonardo', 'Casemiro'] },
      { color: 'ochre', label: 'Jogaram no Corinthians', members: ['Sócrates', 'Rivelino', 'Tévez', 'Dunga'] },
      { color: 'ink', label: 'Jogaram no Flamengo', members: ['Zico', 'Júnior', 'Romário', 'Zagallo'] },
    ],
  },
  // 2 — armadilha: Cafu e Ronaldo também são campeões de 1994 (estavam no
  // elenco); Pelé também é bicampeão de 58/62. Não trocam de grupo porque
  // ninguém de 1994 (Romário, Bebeto, Dunga, Taffarel) foi campeão em 2002 e
  // ninguém de 58/62 (Garrincha, Vavá, Didi, Nílton Santos) jogou em 1970.
  {
    groups: [
      { color: 'corn', label: 'Campeões mundiais em 2002', members: ['Ronaldo', 'Rivaldo', 'Cafu', 'Marcos'] },
      { color: 'grass', label: 'Campeões mundiais em 1994', members: ['Romário', 'Bebeto', 'Dunga', 'Taffarel'] },
      { color: 'ochre', label: 'Campeões mundiais em 1970', members: ['Pelé', 'Jairzinho', 'Tostão', 'Carlos Alberto'] },
      { color: 'ink', label: 'Bicampeões em 1958 e 1962', members: ['Garrincha', 'Vavá', 'Didi', 'Nílton Santos'] },
    ],
  },
  // 3 — só brasileiros, por clube europeu. Armadilha: Rivaldo também jogou no
  // Milan; Roberto Carlos também jogou na Inter. Não trocam porque Cafu/Dida/
  // Pato/Thiago Silva nunca jogaram no Barça e Adriano/Maicon/Lúcio/Júlio César
  // nunca jogaram no Real.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Real Madrid', members: ['Roberto Carlos', 'Marcelo', 'Casemiro', 'Vinícius'] },
      { color: 'grass', label: 'Jogaram na Inter de Milão', members: ['Adriano', 'Maicon', 'Lúcio', 'Júlio César'] },
      { color: 'ochre', label: 'Jogaram no Milan', members: ['Cafu', 'Dida', 'Pato', 'Thiago Silva'] },
      { color: 'ink', label: 'Jogaram no Barcelona', members: ['Romário', 'Neymar', 'Dani Alves', 'Rivaldo'] },
    ],
  },
  // 4 — armadilha: Carlos Alberto é lateral e parece caber em "Laterais", mas
  // Cafu, Roberto Carlos, Júnior e Branco não foram campeões em 1970, então o
  // grupo de 1970 só fecha com ele.
  {
    groups: [
      { color: 'corn', label: 'Goleiros brasileiros', members: ['Taffarel', 'Dida', 'Marcos', 'Júlio César'] },
      { color: 'grass', label: 'Zagueiros brasileiros', members: ['Lúcio', 'Aldair', 'Thiago Silva', 'David Luiz'] },
      { color: 'ochre', label: 'Laterais brasileiros', members: ['Cafu', 'Roberto Carlos', 'Júnior', 'Branco'] },
      { color: 'ink', label: 'Campeões mundiais em 1970', members: ['Pelé', 'Jairzinho', 'Gérson', 'Carlos Alberto'] },
    ],
  },
  // 5 — armadilha: Fillol, Goycochea, Enzo Fernández e Julián Álvarez também
  // jogaram no River. Mas só há 4 goleiros (Fillol, Goycochea, Chilavert,
  // Dibu) e só 4 campeões de 2022 (Messi, Di María, Enzo, Julián); Crespo,
  // Aimar, Ortega e Gallardo não cabem em nenhum outro grupo, então o River
  // fecha com eles.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Boca Juniors', members: ['Maradona', 'Riquelme', 'Tévez', 'Palermo'] },
      { color: 'grass', label: 'Goleiros', members: ['Fillol', 'Goycochea', 'Chilavert', 'Dibu Martínez'] },
      { color: 'ochre', label: 'Campeões mundiais em 2022', members: ['Messi', 'Di María', 'Enzo Fernández', 'Julián Álvarez'] },
      { color: 'ink', label: 'Jogaram no River Plate', members: ['Crespo', 'Aimar', 'Ortega', 'Gallardo'] },
    ],
  },
  // 6 — armadilha: Futre também jogou no Porto (campeão europeu em 1987), mas
  // Falcao, Hulk, Casemiro e James nunca jogaram no Sporting, então o Porto
  // não abre vaga.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Ajax', members: ['Cruyff', 'Van Basten', 'Bergkamp', 'Suárez'] },
      { color: 'grass', label: 'Jogaram no Sporting', members: ['Figo', 'Cristiano Ronaldo', 'Nani', 'Futre'] },
      { color: 'ochre', label: 'Jogaram no Benfica', members: ['Eusébio', 'Rui Costa', 'Di María', 'Rúben Dias'] },
      { color: 'ink', label: 'Jogaram no Porto', members: ['Radamel Falcao', 'Hulk', 'Casemiro', 'James'] },
    ],
  },
  // 7 — armadilha: Lineker e Richarlison também jogaram no Tottenham, mas
  // Kane, Son, Bale e Ardiles nunca jogaram no Everton, então os dois só
  // fecham no Everton.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Manchester City', members: ['Agüero', 'De Bruyne', 'Kompany', 'Haaland'] },
      { color: 'grass', label: 'Jogaram no Newcastle', members: ['Shearer', 'Asprilla', 'Owen', 'Bruno Guimarães'] },
      { color: 'ochre', label: 'Jogaram no Tottenham', members: ['Kane', 'Son', 'Bale', 'Ardiles'] },
      { color: 'ink', label: 'Jogaram no Everton', members: ['Rooney', 'Lukaku', 'Richarlison', 'Lineker'] },
    ],
  },
  // 8 — por era. Armadilha: Di Stéfano, Gento e Puskás jogaram até os anos
  // 1960 e Romário/Baggio até os 2000, mas não há grupo de 60 nem de 2000;
  // cada um só cabe na sua década de auge.
  {
    groups: [
      { color: 'corn', label: 'Craques dos anos 2010', members: ['Messi', 'Cristiano Ronaldo', 'Neymar', 'Modrić'] },
      { color: 'grass', label: 'Craques dos anos 1990', members: ['Baggio', 'Stoichkov', 'Romário', 'Hagi'] },
      { color: 'ochre', label: 'Craques dos anos 1970', members: ['Cruyff', 'Beckenbauer', 'Rivelino', 'Kempes'] },
      { color: 'ink', label: 'Craques dos anos 1950', members: ['Puskás', 'Di Stéfano', 'Didi', 'Gento'] },
    ],
  },
  // 9 — armadilha: Dunga também jogou no Vasco (campeão carioca de 1987) e
  // Renato Gaúcho também jogou no Botafogo (1991–92). Não trocam porque
  // Romário/Edmundo/Juninho/Dinamite nunca jogaram no Internacional e
  // Garrincha/Jairzinho/Nílton Santos/Gérson nunca jogaram no Grêmio.
  {
    groups: [
      { color: 'corn', label: 'Ídolos do Botafogo', members: ['Garrincha', 'Jairzinho', 'Nílton Santos', 'Gérson'] },
      { color: 'grass', label: 'Ídolos do Vasco', members: ['Romário', 'Edmundo', 'Juninho Pernambucano', 'Roberto Dinamite'] },
      { color: 'ochre', label: 'Jogaram no Internacional', members: ['Falcão', 'Dunga', 'Taffarel', 'Alisson'] },
      { color: 'ink', label: 'Jogaram no Grêmio', members: ['Renato Gaúcho', 'Ronaldinho', 'Paulo Nunes', 'Suárez'] },
    ],
  },
  // 10 — carreiras fora da Europa. Armadilha: Hulk também jogou no Japão
  // (Kawasaki, Sapporo, Tokyo Verdy), mas Zico, Dunga, Lineker e Iniesta
  // nunca jogaram na China, então o grupo da China só fecha com ele.
  {
    groups: [
      { color: 'corn', label: 'Jogaram nos Estados Unidos', members: ['Pelé', 'Beckham', 'Henry', 'Kaká'] },
      { color: 'grass', label: 'Jogaram no Japão', members: ['Zico', 'Dunga', 'Lineker', 'Iniesta'] },
      { color: 'ochre', label: 'Jogaram na Turquia', members: ['Hagi', 'Taffarel', 'Roberto Carlos', 'Sneijder'] },
      { color: 'ink', label: 'Jogaram na China', members: ['Oscar', 'Hulk', 'Tévez', 'Witsel'] },
    ],
  },
  // 11 — armadilha: os 4 goleiros (Barthez, Buffon, Casillas, Neuer), um em
  // cada grupo, sugerem um grupo "Goleiros"; mas aí cada seleção ficaria com
  // 3 e sem quarto elemento de outra nacionalidade.
  {
    groups: [
      { color: 'corn', label: 'Campeões mundiais em 2014', members: ['Neuer', 'Lahm', 'Klose', 'Kroos'] },
      { color: 'grass', label: 'Campeões mundiais em 2010', members: ['Casillas', 'Xavi', 'Iniesta', 'Puyol'] },
      { color: 'ochre', label: 'Campeões mundiais em 2006', members: ['Cannavaro', 'Buffon', 'Pirlo', 'Totti'] },
      { color: 'ink', label: 'Campeões mundiais em 1998', members: ['Zidane', 'Henry', 'Thuram', 'Barthez'] },
    ],
  },
  // 12 — armadilha: Francescoli, Salas, Alexis e Falcao também jogaram no
  // River, mas Di Stéfano, Aimar, Ortega e Gallardo são argentinos e não há
  // grupo de argentinos — o River só fecha com os quatro.
  {
    groups: [
      { color: 'corn', label: 'Uruguaios', members: ['Forlán', 'Suárez', 'Cavani', 'Francescoli'] },
      { color: 'grass', label: 'Colombianos', members: ['Valderrama', 'Higuita', 'James', 'Radamel Falcao'] },
      { color: 'ochre', label: 'Chilenos', members: ['Zamorano', 'Salas', 'Vidal', 'Alexis'] },
      { color: 'ink', label: 'Jogaram no River Plate', members: ['Di Stéfano', 'Aimar', 'Ortega', 'Gallardo'] },
    ],
  },
  // 13 — camisas. Armadilha: Casillas é goleiro (mas Yashin/Banks/Zoff/Kahn
  // nunca jogaram no Real); Cristiano Ronaldo e Beckham também são ídolos do
  // Real (mas Di Stéfano/Raúl/Zidane/Casillas nunca vestiram a 7 do United).
  {
    groups: [
      { color: 'corn', label: 'Goleiros', members: ['Yashin', 'Banks', 'Zoff', 'Kahn'] },
      { color: 'grass', label: 'Vestiram a 10 da seleção brasileira', members: ['Pelé', 'Zico', 'Ronaldinho', 'Neymar'] },
      { color: 'ochre', label: 'Vestiram a 7 do Manchester United', members: ['Best', 'Cantona', 'Beckham', 'Cristiano Ronaldo'] },
      { color: 'ink', label: 'Ídolos do Real Madrid', members: ['Di Stéfano', 'Raúl', 'Zidane', 'Casillas'] },
    ],
  },
  // 14 — armadilha: Batistuta e Toni também jogaram na Roma, e Mihajlović
  // também (1992–94). Não trocam porque Totti, Falcão, Cafu e Aldair nunca
  // jogaram na Fiorentina nem na Lazio.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Napoli', members: ['Maradona', 'Careca', 'Cavani', 'Hamšík'] },
      { color: 'grass', label: 'Jogaram na Lazio', members: ['Nesta', 'Nedvěd', 'Verón', 'Mihajlović'] },
      { color: 'ochre', label: 'Jogaram na Fiorentina', members: ['Batistuta', 'Rui Costa', 'Toni', 'Vlahović'] },
      { color: 'ink', label: 'Jogaram na Roma', members: ['Totti', 'Falcão', 'Cafu', 'Aldair'] },
    ],
  },
  // 15 — armadilha: Ballack, Zé Roberto, Lúcio, Neuer e Sané também jogaram
  // no Bayern; mas Effenberg, Kahn, Matthäus e Ribéry não jogaram em nenhum
  // dos outros três clubes, então o Bayern fecha só com eles.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Bayern de Munique', members: ['Effenberg', 'Kahn', 'Matthäus', 'Ribéry'] },
      { color: 'grass', label: 'Jogaram no Borussia Dortmund', members: ['Sammer', 'Reus', 'Aubameyang', 'Bellingham'] },
      { color: 'ochre', label: 'Jogaram no Schalke', members: ['Neuer', 'Özil', 'Raúl', 'Sané'] },
      { color: 'ink', label: 'Jogaram no Bayer Leverkusen', members: ['Ballack', 'Zé Roberto', 'Lúcio', 'Wirtz'] },
    ],
  },
  // 16 — armadilha: Beckenbauer, Cannavaro, Rossi, Best e Weah ganharam a
  // Bola de Ouro, mas não há esse grupo. Os 4 portugueses jogaram Copas; os
  // capitães não foram artilheiros; Best/Weah/Giggs/Cantona nunca disputaram
  // uma Copa do Mundo.
  {
    groups: [
      { color: 'corn', label: 'Campeões da Euro 2016', members: ['Cristiano Ronaldo', 'Pepe', 'Nani', 'Quaresma'] },
      { color: 'grass', label: 'Capitães campeões mundiais', members: ['Carlos Alberto', 'Beckenbauer', 'Passarella', 'Cannavaro'] },
      { color: 'ochre', label: 'Artilheiros de uma Copa do Mundo', members: ['Fontaine', 'Rossi', 'Schillaci', 'Šuker'] },
      { color: 'ink', label: 'Nunca jogaram uma Copa do Mundo', members: ['Best', 'Weah', 'Giggs', 'Cantona'] },
    ],
  },

  // ===== Lote 3 (out/2026): 40 puzzles, partição única provada em cada `armadilha:` =====
  // 1 — armadilha: Eusébio (Bola de Ouro 1965) e Gerd Müller (Bola de Ouro
  // 1970) também cabem nas décadas da Bola de Ouro. Mas Yashin, Bobby Charlton,
  // Best e Rivera nunca foram artilheiros de Copa, nem Cruyff, Beckenbauer,
  // Blokhin e Keegan; os dois só fecham nos artilheiros. Yashin é goleiro, mas
  // nunca foi campeão mundial; Beckenbauer foi campeão em 1974, mas não é goleiro.
  {
    groups: [
      { color: 'corn', label: 'Goleiros campeões mundiais', members: ['Gilmar', 'Banks', 'Sepp Maier', 'Zoff'] },
      { color: 'grass', label: 'Bola de Ouro nos anos 1970', members: ['Cruyff', 'Beckenbauer', 'Blokhin', 'Keegan'] },
      { color: 'ochre', label: 'Bola de Ouro nos anos 1960', members: ['Yashin', 'Bobby Charlton', 'Best', 'Rivera'] },
      { color: 'ink', label: 'Artilheiros de uma Copa do Mundo', members: ['Eusébio', 'Gerd Müller', 'Lato', 'Kempes'] },
    ],
  },
  // 2 — armadilha: Zidane também foi eleito o melhor jogador da Copa de 2006.
  // Mas Kahn (2002), Forlán (2010), Romário (1994) e Schillaci (1990) nunca
  // ganharam a Bola de Ouro, e o grupo dos anos 1990 só tem quatro candidatos
  // (Weah 95, Sammer 96, Zidane 98, Rivaldo 99): Zidane fica nos anos 1990.
  // (Maradona, melhor da Copa de 86, saiu: recebeu uma Bola de Ouro honorária
  // em 1995 e abriria discussão.)
  {
    groups: [
      { color: 'corn', label: 'Bola de Ouro nos anos 2000', members: ['Figo', 'Owen', 'Nedvěd', 'Shevchenko'] },
      { color: 'grass', label: 'Bola de Ouro nos anos 1980', members: ['Rummenigge', 'Platini', 'Belanov', 'Gullit'] },
      { color: 'ochre', label: 'Bola de Ouro nos anos 1990', members: ['Weah', 'Sammer', 'Zidane', 'Rivaldo'] },
      { color: 'ink', label: 'Eleitos o melhor jogador de uma Copa', members: ['Kahn', 'Forlán', 'Romário', 'Schillaci'] },
    ],
  },
  // 3 — prêmios de Copa. armadilha: Ronaldo também foi eleito o melhor
  // jogador da Copa de 1998, mas o grupo dos artilheiros só tem quatro
  // candidatos (Ronaldo 2002, Klose 2006, James 2014, Kane 2018), então ele
  // fecha ali. Copa de 2026: melhor jogador Rodri, luva de ouro Unai Simón,
  // melhor jovem Pau Cubarsí. Mbappé (jovem 2018, artilheiro 2022/2026) ficou fora.
  {
    groups: [
      { color: 'corn', label: 'Melhor goleiro de uma Copa', members: ['Casillas', 'Courtois', 'Dibu Martínez', 'Unai Simón'] },
      { color: 'grass', label: 'Artilheiros de uma Copa', members: ['Ronaldo', 'Klose', 'James', 'Kane'] },
      { color: 'ochre', label: 'Melhor jogador de uma Copa', members: ['Romário', 'Zidane', 'Modrić', 'Rodri'] },
      { color: 'ink', label: 'Melhor jogador jovem de uma Copa', members: ['Podolski', 'Pogba', 'Enzo Fernández', 'Pau Cubarsí'] },
    ],
  },
  // 4 — Copa de 2026 (Espanha 1 x 0 Argentina na final). armadilha: são três
  // grupos de espanhóis. Nenhum campeão de 2010 (Casillas, Xavi, Iniesta, Puyol)
  // estava no elenco de 2026, e nenhum dos de 2026 (Rodri, Pedri, Yamal,
  // Cubarsí) estava em 2010; Raúl, Butragueño, Hierro e Luis Enrique pararam
  // antes de 2010. Os argentinos de 2022 não cabem em grupo espanhol.
  {
    groups: [
      { color: 'corn', label: 'Campeões mundiais em 2022', members: ['Messi', 'Di María', 'Dibu Martínez', 'Julián Álvarez'] },
      { color: 'grass', label: 'Campeões mundiais em 2010', members: ['Casillas', 'Xavi', 'Iniesta', 'Puyol'] },
      { color: 'ochre', label: 'Campeões mundiais em 2026', members: ['Rodri', 'Pedri', 'Lamine Yamal', 'Pau Cubarsí'] },
      { color: 'ink', label: 'Espanhóis que nunca ganharam a Copa', members: ['Raúl', 'Butragueño', 'Hierro', 'Luis Enrique'] },
    ],
  },
  // 5 — armadilha: Reinaldo também jogou no Cruzeiro (1986) e Charles Fabian
  // também (1991–92). Não trocam porque Tostão, Piazza, Sorín e Dirceu Lopes nunca
  // jogaram no Atlético-MG nem no Bahia; sem vaga, Reinaldo fecha no Atlético e
  // Charles no Bahia. Vavá e Ademir de Menezes também jogaram no Vasco e Durval
  // no Athletico-PR e no Santos, que não são grupo. (Hulk está no Fluminense
  // desde 2026, que não é grupo aqui.)
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Cruzeiro', members: ['Tostão', 'Wilson Piazza', 'Sorín', 'Dirceu Lopes'] },
      { color: 'grass', label: 'Jogaram no Atlético-MG', members: ['Hulk', 'Gilberto Silva', 'Guilherme Arana', 'Reinaldo'] },
      { color: 'ochre', label: 'Jogaram no Bahia', members: ['Bobô', 'Dani Alves', 'Talisca', 'Charles Fabian'] },
      { color: 'ink', label: 'Jogaram no Sport', members: ['Juninho Pernambucano', 'Durval', 'Vavá', 'Ademir de Menezes'] },
    ],
  },
  // 6 — armadilha: César Sampaio também jogou no Santos (1986–91) e Weverton
  // também jogou no Athletico-PR (2012–17). Não trocam: Zito, Clodoaldo,
  // Giovanni e Diego Ribas nunca jogaram no Palmeiras, e Kléberson, Jádson e
  // Bruno Guimarães nunca jogaram no Palmeiras; o Athletico só tem quatro
  // candidatos, então Weverton fecha ali, e Sampaio completa o Palmeiras.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Palmeiras', members: ['Ademir da Guia', 'Marcos', 'Endrick', 'César Sampaio'] },
      { color: 'grass', label: 'Jogaram no Santos', members: ['Zito', 'Clodoaldo', 'Giovanni', 'Diego Ribas'] },
      { color: 'ochre', label: 'Jogaram no Fluminense', members: ['Castilho', 'Rivellino', 'Conca', 'Germán Cano'] },
      { color: 'ink', label: 'Jogaram no Athletico-PR', members: ['Kléberson', 'Jádson', 'Bruno Guimarães', 'Weverton'] },
    ],
  },
  // 7 — técnicos. armadilha: Felipão também ganhou a Libertadores (Grêmio 95,
  // Palmeiras 99), Lippi também ganhou a Champions (Juventus 96) e Del Bosque
  // ganhou Copa, Champions e Euro. Mas Libertadores e Champions já têm quatro
  // campeões que só cabem ali, e a Euro só tem quatro candidatos (Fernando
  // Santos, Mancini, Rehhagel, Del Bosque): sobra a Copa para Felipão e Lippi.
  {
    groups: [
      { color: 'corn', label: 'Técnicos campeões da Champions', members: ['Guardiola', 'Klopp', 'Alex Ferguson', 'Zidane'] },
      { color: 'grass', label: 'Técnicos campeões da Libertadores', members: ['Telê Santana', 'Jorge Jesus', 'Abel Ferreira', 'Gallardo'] },
      { color: 'ochre', label: 'Técnicos campeões da Eurocopa', members: ['Fernando Santos', 'Mancini', 'Rehhagel', 'Del Bosque'] },
      { color: 'ink', label: 'Técnicos campeões da Copa do Mundo', members: ['Felipão', 'Lippi', 'Scaloni', 'Löw'] },
    ],
  },
  // 8 — camisas. armadilha: Messi vestiu a 10 do Barcelona, Benzema a 9 do
  // Real e Mbappé a 9 e a 10 do Real — nenhum vestiu a 9 do Barça nem a 7 do
  // Real. Ronaldo vestiu a 9 do Barça e a 11/9 do Real (nunca a 7). Números de
  // Copa conferidos nas listas oficiais: Kempes 78, Maradona 82–94, Riquelme
  // 2006, Messi 2010–26; Platini 82/86, Zidane 98–2006, Benzema 2014, Mbappé 2018–26.
  {
    groups: [
      { color: 'corn', label: 'Vestiram a 10 da Argentina em Copas', members: ['Kempes', 'Maradona', 'Riquelme', 'Messi'] },
      { color: 'grass', label: 'Vestiram a 7 do Real Madrid', members: ['Raúl', 'Cristiano Ronaldo', 'Hazard', 'Vinícius'] },
      { color: 'ochre', label: 'Vestiram a 9 do Barcelona', members: ['Ronaldo', "Eto'o", 'Suárez', 'Lewandowski'] },
      { color: 'ink', label: 'Vestiram a 10 da França em Copas', members: ['Platini', 'Zidane', 'Benzema', 'Mbappé'] },
    ],
  },
  // 9 — armadilha: Arce e Paulo Nunes ganharam a Libertadores pelo Grêmio
  // (1995) E pelo Palmeiras (1999). Mas Danrlei, Jardel (95), Renato Gaúcho
  // (83) e Geromel (2017) só ganharam pelo Grêmio, que fica cheio; o Palmeiras
  // só tem Marcos (99) e Weverton (2020/21) além deles. Cafu e Zetti jogaram
  // no Palmeiras, mas não ganharam a Libertadores lá.
  {
    groups: [
      { color: 'corn', label: 'Campeões da Libertadores pelo Flamengo', members: ['Zico', 'Adílio', 'Gabigol', 'Arrascaeta'] },
      { color: 'grass', label: 'Campeões da Libertadores pelo São Paulo', members: ['Raí', 'Zetti', 'Cafu', 'Lugano'] },
      { color: 'ochre', label: 'Campeões da Libertadores pelo Grêmio', members: ['Danrlei', 'Jardel', 'Renato Gaúcho', 'Geromel'] },
      { color: 'ink', label: 'Campeões da Libertadores pelo Palmeiras', members: ['Marcos', 'Weverton', 'Arce', 'Paulo Nunes'] },
    ],
  },
  // 10 — estrangeiros no Brasil. armadilha: Guerrero jogou no Corinthians, no
  // Flamengo E no Internacional. Mas Tévez, Mascherano, Memphis Depay e Garro
  // só jogaram no Corinthians e D'Alessandro, Forlán, Enner Valencia e Borré só
  // no Inter (entre os quatro clubes): Guerrero fecha no Flamengo. Petković
  // passou por Vasco, Fluminense, Santos e Atlético-MG, que não são grupo.
  {
    groups: [
      { color: 'corn', label: 'Estrangeiros que jogaram no Corinthians', members: ['Tévez', 'Mascherano', 'Memphis Depay', 'Garro'] },
      { color: 'grass', label: 'Estrangeiros que jogaram no Internacional', members: ["D'Alessandro", 'Forlán', 'Enner Valencia', 'Borré'] },
      { color: 'ochre', label: 'Estrangeiros que jogaram no Botafogo', members: ['Seedorf', 'Loco Abreu', 'Thiago Almada', 'Savarino'] },
      { color: 'ink', label: 'Estrangeiros que jogaram no Flamengo', members: ['Arrascaeta', 'Petković', 'Pulgar', 'Guerrero'] },
    ],
  },
  // 11 — África ocidental. armadilha: Abedi Pelé tem "Pelé" no nome, mas é
  // ganês; os dois Touré são marfinenses. Cada um defendeu só uma seleção.
  {
    groups: [
      { color: 'corn', label: 'Marfinenses', members: ['Drogba', 'Yaya Touré', 'Kolo Touré', 'Gervinho'] },
      { color: 'grass', label: 'Camaroneses', members: ["Eto'o", 'Roger Milla', 'Rigobert Song', 'Onana'] },
      { color: 'ochre', label: 'Nigerianos', members: ['Okocha', 'Kanu', 'Yekini', 'Osimhen'] },
      { color: 'ink', label: 'Ganeses', members: ['Abedi Pelé', 'Essien', 'Asamoah Gyan', 'Thomas Partey'] },
    ],
  },
  // 12 — África do norte + Senegal. armadilha: Hakimi (nascido na Espanha),
  // Bounou (no Canadá), Mahrez, Bennacer e Koulibaly (na França) não jogam
  // pelo país onde nasceram; na seleção principal, cada um defendeu uma só.
  {
    groups: [
      { color: 'corn', label: 'Egípcios', members: ['Salah', 'Aboutrika', 'Hossam Hassan', 'Marmoush'] },
      { color: 'grass', label: 'Senegaleses', members: ['Mané', 'Koulibaly', 'El Hadji Diouf', 'Édouard Mendy'] },
      { color: 'ochre', label: 'Marroquinos', members: ['Hakimi', 'Bounou', 'Ziyech', 'En-Nesyri'] },
      { color: 'ink', label: 'Argelinos', members: ['Mahrez', 'Madjer', 'Belloumi', 'Bennacer'] },
    ],
  },
  // 13 — Ásia e Oceania. armadilha: Ali Daei e Ali Karimi (iranianos) e os
  // dois "Mark" australianos (Viduka e Schwarzer) puxam pares; cada jogador
  // defendeu uma só seleção.
  {
    groups: [
      { color: 'corn', label: 'Sul-coreanos', members: ['Park Ji-sung', 'Son Heung-min', 'Kim Min-jae', 'Cha Bum-kun'] },
      { color: 'grass', label: 'Japoneses', members: ['Hidetoshi Nakata', 'Shunsuke Nakamura', 'Kagawa', 'Takefusa Kubo'] },
      { color: 'ochre', label: 'Australianos', members: ['Tim Cahill', 'Harry Kewell', 'Viduka', 'Schwarzer'] },
      { color: 'ink', label: 'Iranianos', members: ['Ali Daei', 'Ali Karimi', 'Taremi', 'Azmoun'] },
    ],
  },
  // 14 — apelidos. armadilha: Puskás é o "Major Galopante" (patente militar,
  // não bicho); Yashin, a "Aranha Negra", e Julián Álvarez, "La Araña",
  // dividem o mesmo bicho. Ninguém tem apelido de duas categorias: Rei (Pelé),
  // Kaiser (Beckenbauer), Imperador (Adriano), King Kenny (Dalglish); La Pulga
  // (Messi), El Toro (Lautaro); Der Bomber (Gerd Müller), El Pistolero
  // (Suárez), Dinamite (Roberto); Bruxo (Ronaldinho), La Brujita (Verón),
  // Divino (Ademir da Guia), Divin Codino (Baggio).
  {
    groups: [
      { color: 'corn', label: 'Apelido de realeza', members: ['Pelé', 'Beckenbauer', 'Adriano', 'Dalglish'] },
      { color: 'grass', label: 'Apelido de bicho', members: ['Messi', 'Lautaro', 'Julián Álvarez', 'Yashin'] },
      { color: 'ochre', label: 'Apelido de guerra', members: ['Puskás', 'Gerd Müller', 'Suárez', 'Roberto Dinamite'] },
      { color: 'ink', label: 'Apelido de bruxo ou divino', members: ['Ronaldinho', 'Verón', 'Ademir da Guia', 'Baggio'] },
    ],
  },
  // 15 — ouro olímpico. armadilha: Mascherano ganhou o ouro em 2004 E em 2008.
  // Mas Messi, Riquelme, Di María e Agüero só estavam em 2008, que fica cheio;
  // Mascherano completa 2004 com Tévez, Ayala e Heinze. Nenhum brasileiro de
  // 2016 estava em 2020.
  {
    groups: [
      { color: 'corn', label: 'Ouro olímpico em 2016 (Brasil)', members: ['Neymar', 'Gabriel Jesus', 'Marquinhos', 'Gabigol'] },
      { color: 'grass', label: 'Ouro olímpico em 2020 (Brasil)', members: ['Dani Alves', 'Richarlison', 'Bruno Guimarães', 'Matheus Cunha'] },
      { color: 'ochre', label: 'Ouro olímpico em 2008 (Argentina)', members: ['Messi', 'Riquelme', 'Di María', 'Agüero'] },
      { color: 'ink', label: 'Ouro olímpico em 2004 (Argentina)', members: ['Tévez', 'Ayala', 'Heinze', 'Mascherano'] },
    ],
  },
  // 16 — só argentinos, por posição. armadilha: a nacionalidade não separa
  // nada; vale a posição de ofício de cada um, sem ambiguidade (nenhum dos
  // laterais virou zagueiro, nenhum meia jogou na defesa).
  {
    groups: [
      { color: 'corn', label: 'Goleiros argentinos', members: ['Fillol', 'Pumpido', 'Goycochea', 'Dibu Martínez'] },
      { color: 'grass', label: 'Meio-campistas argentinos', members: ['Riquelme', 'Redondo', 'Verón', 'Aimar'] },
      { color: 'ochre', label: 'Zagueiros argentinos', members: ['Passarella', 'Ruggeri', 'Ayala', 'Walter Samuel'] },
      { color: 'ink', label: 'Laterais argentinos', members: ['Sorín', 'Zabaleta', 'Tagliafico', 'Montiel'] },
    ],
  },
  // 17 — duas posições x duas seleções. armadilha: o par de grupos de cada
  // seleção tenta a divisão "Italianos x Alemães" (8 e 8), que não fecha em
  // grupos de 4; é preciso cruzar posição e país. Lahm foi para o meio no fim
  // da carreira, mas fez história como lateral.
  {
    groups: [
      { color: 'corn', label: 'Goleiros italianos', members: ['Zoff', 'Zenga', 'Buffon', 'Donnarumma'] },
      { color: 'grass', label: 'Goleiros alemães', members: ['Sepp Maier', 'Kahn', 'Neuer', 'ter Stegen'] },
      { color: 'ochre', label: 'Laterais italianos', members: ['Facchetti', 'Cabrini', 'Zambrotta', 'Grosso'] },
      { color: 'ink', label: 'Laterais alemães', members: ['Berti Vogts', 'Brehme', 'Lahm', 'David Raum'] },
    ],
  },
  // 18 — duas posições x duas seleções. armadilha: a divisão "Espanhóis x
  // Ingleses" (8 e 8) não fecha em grupos de 4; é preciso cruzar posição e
  // país. Cada um tem uma só posição e uma só seleção.
  {
    groups: [
      { color: 'corn', label: 'Goleiros espanhóis', members: ['Zubizarreta', 'Casillas', 'De Gea', 'Unai Simón'] },
      { color: 'grass', label: 'Goleiros ingleses', members: ['Banks', 'Shilton', 'Seaman', 'Pickford'] },
      { color: 'ochre', label: 'Laterais espanhóis', members: ['Jordi Alba', 'Carvajal', 'Míchel Salgado', 'Capdevila'] },
      { color: 'ink', label: 'Laterais ingleses', members: ['Ashley Cole', 'Gary Neville', 'Alexander-Arnold', 'Kyle Walker'] },
    ],
  },
  // 19 — Mundial de Clubes (escalações das finais). armadilha: são dois grupos
  // do Corinthians, mas ninguém da final de 2000 (Dida, Rincón, Marcelinho,
  // Vampeta) estava em 2012, e vice-versa. Guerrero e Amoroso também jogaram
  // em outros clubes do puzzle (Inter; Corinthians), mas sem ser campeões
  // mundiais por eles. (Danilo, campeão em 2005 E 2012, ficou fora.)
  {
    groups: [
      { color: 'corn', label: 'Campeões mundiais pelo São Paulo (2005)', members: ['Rogério Ceni', 'Lugano', 'Mineiro', 'Amoroso'] },
      { color: 'grass', label: 'Campeões mundiais pelo Internacional (2006)', members: ['Clemer', 'Fernandão', 'Iarley', 'Adriano Gabiru'] },
      { color: 'ochre', label: 'Campeões mundiais pelo Corinthians (2012)', members: ['Cássio', 'Ralf', 'Guerrero', 'Emerson Sheik'] },
      { color: 'ink', label: 'Campeões mundiais pelo Corinthians (2000)', members: ['Dida', 'Rincón', 'Marcelinho Carioca', 'Vampeta'] },
    ],
  },
  // 20 — base. armadilha: Gabigol é ídolo do Flamengo, mas foi revelado pelo
  // Santos; Adriano passou por São Paulo e Corinthians, mas saiu da base do
  // Flamengo; Estêvão fez base no Cruzeiro (que não é grupo) e estreou no
  // Palmeiras. Cada um estreou como profissional em um só destes clubes.
  {
    groups: [
      { color: 'corn', label: 'Revelados pelo Santos', members: ['Neymar', 'Robinho', 'Rodrygo', 'Gabigol'] },
      { color: 'grass', label: 'Revelados pelo São Paulo', members: ['Kaká', 'Casemiro', 'Éder Militão', 'Antony'] },
      { color: 'ochre', label: 'Revelados pelo Flamengo', members: ['Vinícius', 'Paquetá', 'Adriano', 'Reinier'] },
      { color: 'ink', label: 'Revelados pelo Palmeiras', members: ['Endrick', 'Gabriel Jesus', 'Estêvão', 'Marcos'] },
    ],
  },
  // 21 — armadilha: Giovanni jogou no Olympiacos (Grécia) E no Al-Hilal
  // (Arábia Saudita). Mas Cristiano Ronaldo (Al-Nassr), Benzema (Al-Ittihad e
  // Al-Hilal), Neymar (Al-Hilal) e Mané (Al-Nassr) nunca jogaram na Grécia;
  // a Arábia fica cheia e Giovanni fecha na Grécia.
  {
    groups: [
      { color: 'corn', label: 'Jogaram na Arábia Saudita', members: ['Cristiano Ronaldo', 'Benzema', 'Neymar', 'Mané'] },
      { color: 'grass', label: 'Jogaram no Catar', members: ['Xavi', 'Raúl', 'Batistuta', 'Guardiola'] },
      { color: 'ochre', label: 'Jogaram na Escócia', members: ['Henrik Larsson', 'Gascoigne', 'Shunsuke Nakamura', 'Brian Laudrup'] },
      { color: 'ink', label: 'Jogaram na Grécia', members: ['Rivaldo', 'Gilberto Silva', 'Marcelo', 'Giovanni'] },
    ],
  },
  // 22 — técnicos. armadilha: Ancelotti, Luxemburgo e Capello treinaram o
  // Real Madrid. Mas Del Bosque, Benítez, Zidane e Xabi Alonso só treinaram o
  // Real entre os quatro, que fica cheio; a Seleção Brasileira só tem Tite,
  // Mano, Ancelotti e Luxemburgo, e a Inglaterra Eriksson, Southgate, Tuchel
  // e Capello.
  {
    groups: [
      { color: 'corn', label: 'Treinaram o Barcelona', members: ['Cruyff', 'Rijkaard', 'Guardiola', 'Flick'] },
      { color: 'grass', label: 'Treinaram a Inglaterra', members: ['Eriksson', 'Southgate', 'Tuchel', 'Capello'] },
      { color: 'ochre', label: 'Treinaram o Real Madrid', members: ['Del Bosque', 'Benítez', 'Zidane', 'Xabi Alonso'] },
      { color: 'ink', label: 'Treinaram a Seleção Brasileira', members: ['Tite', 'Mano Menezes', 'Ancelotti', 'Luxemburgo'] },
    ],
  },
  // 23 — Champions. armadilha: Giggs foi campeão pelo United em 1999 E em
  // 2008. Mas Beckham, Schmeichel, Solskjær e Sheringham só ganharam a de
  // 1999, que fica cheia; Giggs fecha em 2008. Fernando Torres jogou em
  // Liverpool e Chelsea e ficou fora.
  {
    groups: [
      { color: 'corn', label: 'Campeões da Champions pelo Liverpool (2005)', members: ['Gerrard', 'Xabi Alonso', 'Dudek', 'Carragher'] },
      { color: 'grass', label: 'Campeões da Champions pelo Chelsea (2012)', members: ['Drogba', 'Lampard', 'Čech', 'Mata'] },
      { color: 'ochre', label: 'Campeões da Champions pelo United (1999)', members: ['Beckham', 'Schmeichel', 'Solskjær', 'Sheringham'] },
      { color: 'ink', label: 'Campeões da Champions pelo United (2008)', members: ['Cristiano Ronaldo', 'Rooney', 'Van der Sar', 'Giggs'] },
    ],
  },
  // 24 — Espanha, quatro títulos (elencos oficiais). armadilha: Puyol e
  // Villa também foram campeões em 2010, Jesús Navas também em 2010, e Rodri
  // também em 2026. Mas Piqué, Busquets, Víctor Valdés e Mata só estavam em 2010
  // (não em 2008), que fica cheio; Cubarsí, Gavi, Porro e Eric García só em
  // 2026 (não na Euro 2024), que também fica cheio. Sobra: Puyol e Villa na
  // Euro 2008; Navas e Rodri na Euro 2024.
  {
    groups: [
      { color: 'corn', label: 'Campeões mundiais em 2010', members: ['Piqué', 'Busquets', 'Víctor Valdés', 'Mata'] },
      { color: 'grass', label: 'Campeões mundiais em 2026', members: ['Pau Cubarsí', 'Gavi', 'Pedro Porro', 'Eric García'] },
      { color: 'ochre', label: 'Campeões da Euro 2008', members: ['Marcos Senna', 'Güiza', 'Puyol', 'David Villa'] },
      { color: 'ink', label: 'Campeões da Euro 2024', members: ['Carvajal', 'Morata', 'Jesús Navas', 'Rodri'] },
    ],
  },
  // 25 — clássicos do Rio. armadilha: Garrincha também jogou no Flamengo
  // (1968–69) e Germán Cano também no Vasco (2020–22). Não trocam porque
  // Zico, Adílio, Gabigol e Arrascaeta só jogaram no Flamengo entre os quatro, e
  // Roberto Dinamite, Philippe Coutinho, Bellini e Vavá só no Vasco: sem vaga,
  // Garrincha fecha no Botafogo e Cano no Fluminense.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Flamengo', members: ['Zico', 'Adílio', 'Gabigol', 'Arrascaeta'] },
      { color: 'grass', label: 'Jogaram no Vasco', members: ['Roberto Dinamite', 'Philippe Coutinho', 'Bellini', 'Vavá'] },
      { color: 'ochre', label: 'Jogaram no Botafogo', members: ['Nílton Santos', 'Seedorf', 'Loco Abreu', 'Garrincha'] },
      { color: 'ink', label: 'Jogaram no Fluminense', members: ['Castilho', 'Fred', 'Thiago Silva', 'Germán Cano'] },
    ],
  },
  // 26 — Seleção em Copas (listas oficiais). armadilha: Zico foi às Copas
  // de 1982 E 1986, Careca às de 1986 E 1990, Dunga às de 1990 E 1998. Mas
  // Éder, Cerezo, Serginho e Waldir Peres só foram em 1982; Rivaldo, Roberto
  // Carlos e Denílson só em 1998 (pede Dunga); Mozer, Renato Gaúcho e Ricardo
  // Rocha só em 1990 (pede Careca); sobra Zico para 1986.
  {
    groups: [
      { color: 'corn', label: 'Convocados para a Copa de 1982', members: ['Éder Aleixo', 'Toninho Cerezo', 'Serginho Chulapa', 'Waldir Peres'] },
      { color: 'grass', label: 'Convocados para a Copa de 1998', members: ['Rivaldo', 'Roberto Carlos', 'Denílson', 'Dunga'] },
      { color: 'ochre', label: 'Convocados para a Copa de 1990', members: ['Mozer', 'Renato Gaúcho', 'Ricardo Rocha', 'Careca'] },
      { color: 'ink', label: 'Convocados para a Copa de 1986', members: ['Josimar', 'Casagrande', 'Emerson Leão', 'Zico'] },
    ],
  },
  // 27 — Libertadores recentes. armadilha: Ronaldinho jogou no Fluminense
  // (2015), Fábio é ídolo do Cruzeiro, Bernard perdeu a final de 2024 pelo
  // Atlético — mas cada um só foi campeão da Libertadores por um destes clubes.
  {
    groups: [
      { color: 'corn', label: 'Campeões da Libertadores pelo Atlético-MG (2013)', members: ['Ronaldinho', 'Jô', 'Bernard', 'Diego Tardelli'] },
      { color: 'grass', label: 'Campeões da Libertadores pelo Fluminense (2023)', members: ['Germán Cano', 'Fábio', 'Marcelo', 'John Kennedy'] },
      { color: 'ochre', label: 'Campeões da Libertadores pelo Botafogo (2024)', members: ['Luiz Henrique', 'Thiago Almada', 'Igor Jesus', 'Alex Telles'] },
      { color: 'ink', label: 'Campeões da Libertadores pelo Internacional (2010)', members: ["D'Alessandro", 'Guiñazú', 'Taison', 'Leandro Damião'] },
    ],
  },
  // 28 — brasileiros na Premier League. armadilha: Willian jogou no Chelsea
  // E no Arsenal; Gabriel Jesus no City E no Arsenal. Mas Fernandinho,
  // Ederson, Robinho e Elano só jogaram no City (entre os quatro), que fica
  // cheio, e Gilberto Silva, Martinelli e Gabriel Magalhães só no Arsenal:
  // Gabriel Jesus fecha o Arsenal e Willian vai para o Chelsea.
  {
    groups: [
      { color: 'corn', label: 'Brasileiros que jogaram no Liverpool', members: ['Philippe Coutinho', 'Firmino', 'Fabinho', 'Alisson'] },
      { color: 'grass', label: 'Brasileiros que jogaram no Manchester City', members: ['Fernandinho', 'Ederson', 'Robinho', 'Elano'] },
      { color: 'ochre', label: 'Brasileiros que jogaram no Arsenal', members: ['Gilberto Silva', 'Martinelli', 'Gabriel Magalhães', 'Gabriel Jesus'] },
      { color: 'ink', label: 'Brasileiros que jogaram no Chelsea', members: ['Ramires', 'Oscar', 'Filipe Luís', 'Willian'] },
    ],
  },
  // 29 — Seleção em Copas recentes (listas oficiais). armadilha: Marcelo foi
  // às Copas de 2014 E 2018; Vinícius às de 2022 E 2026. Mas Coutinho,
  // Firmino, Geromel e Miranda só foram em 2018, e Endrick, Matheus Cunha,
  // Gabriel Magalhães e Luiz Henrique só em 2026: Marcelo fecha 2014 e
  // Vinícius fecha 2022.
  {
    groups: [
      { color: 'corn', label: 'Convocados para a Copa de 2018', members: ['Philippe Coutinho', 'Firmino', 'Geromel', 'Miranda'] },
      { color: 'grass', label: 'Convocados para a Copa de 2026', members: ['Endrick', 'Matheus Cunha', 'Gabriel Magalhães', 'Luiz Henrique'] },
      { color: 'ochre', label: 'Convocados para a Copa de 2014', members: ['David Luiz', 'Oscar', 'Hulk', 'Marcelo'] },
      { color: 'ink', label: 'Convocados para a Copa de 2022', members: ['Antony', 'Richarlison', 'Rodrygo', 'Vinícius'] },
    ],
  },
  // 30 — brasileiros campeões da Champions. armadilha: Roberto Carlos jogou na
  // Inter, Neymar e Dani Alves no PSG, Coutinho no Barcelona — mas nenhum foi
  // campeão europeu por esses clubes. Cada um só ganhou a Champions por um
  // dos quatro aqui.
  {
    groups: [
      { color: 'corn', label: 'Brasileiros campeões da Champions pelo Real Madrid', members: ['Roberto Carlos', 'Marcelo', 'Casemiro', 'Rodrygo'] },
      { color: 'grass', label: 'Brasileiros campeões da Champions pelo Barcelona', members: ['Ronaldinho', 'Belletti', 'Dani Alves', 'Neymar'] },
      { color: 'ochre', label: 'Brasileiros campeões da Champions pelo Milan', members: ['Cafu', 'Kaká', 'Dida', 'Serginho'] },
      { color: 'ink', label: 'Brasileiros campeões da Champions pelo Bayern', members: ['Élber', 'Dante', 'Luiz Gustavo', 'Philippe Coutinho'] },
    ],
  },
  // 31 — prêmios individuais. armadilha: Haaland ganhou o Golden Boy (2020) E
  // a Chuteira de Ouro europeia (2023). Mas Jardel, Forlán, Luca Toni e
  // Immobile só ganharam a Chuteira, que fica cheia; Haaland fecha no Golden
  // Boy. Ninguém do Prêmio Puskás ganhou outro destes prêmios.
  {
    groups: [
      { color: 'corn', label: 'Bola de Ouro', members: ['Owen', 'Nedvěd', 'Shevchenko', 'Modrić'] },
      { color: 'grass', label: 'Prêmio Puskás (gol mais bonito)', members: ['Ibrahimović', 'Giroud', 'Son', 'Lamela'] },
      { color: 'ochre', label: 'Chuteira de Ouro europeia', members: ['Jardel', 'Forlán', 'Luca Toni', 'Immobile'] },
      { color: 'ink', label: 'Golden Boy (melhor jovem da Europa)', members: ['Pato', 'Götze', 'Isco', 'Haaland'] },
    ],
  },
  // 32 — vice-campeões mundiais. armadilha: Messi foi vice em 2014 E em 2026.
  // Mas Lautaro, De Paul, Mac Allister e Dibu só estavam em 2026, que fica
  // cheio; Messi completa 2014. Neeskens, Krol e Rep também foram vices em
  // 1978, que não é grupo.
  {
    groups: [
      { color: 'corn', label: 'Vice-campeões mundiais em 1974 (Holanda)', members: ['Cruyff', 'Neeskens', 'Krol', 'Rep'] },
      { color: 'grass', label: 'Vice-campeões mundiais em 1990 (Argentina)', members: ['Maradona', 'Caniggia', 'Goycochea', 'Ruggeri'] },
      { color: 'ochre', label: 'Vice-campeões mundiais em 2026 (Argentina)', members: ['Lautaro', 'De Paul', 'Mac Allister', 'Dibu Martínez'] },
      { color: 'ink', label: 'Vice-campeões mundiais em 2014 (Argentina)', members: ['Higuaín', 'Mascherano', 'Agüero', 'Messi'] },
    ],
  },
  // 33 — Eurocopas (listas oficiais). armadilha: dois grupos de franceses e
  // dois de alemães, sem ninguém repetido entre 1984 e 2000 nem entre 1980 e
  // 1996. Matthäus estava no elenco de 1980; Kahn era reserva em 1996.
  {
    groups: [
      { color: 'corn', label: 'Campeões da Euro 2000 (França)', members: ['Zidane', 'Henry', 'Trezeguet', 'Pirès'] },
      { color: 'grass', label: 'Campeões da Euro 1984 (França)', members: ['Platini', 'Giresse', 'Tigana', 'Luis Fernández'] },
      { color: 'ochre', label: 'Campeões da Euro 1996 (Alemanha)', members: ['Klinsmann', 'Sammer', 'Bierhoff', 'Kahn'] },
      { color: 'ink', label: 'Campeões da Euro 1980 (Alemanha)', members: ['Rummenigge', 'Schuster', 'Hrubesch', 'Matthäus'] },
    ],
  },
  // 34 — títulos de 2024–25. armadilha: Cucurella ganhou a Euro 2024 E o
  // Mundial de Clubes 2025; Enzo Fernández a Copa América 2024 E o Mundial de
  // Clubes. Mas Carvajal, Morata, Nico Williams e Yamal só ganharam a Euro, e
  // Messi, Lautaro, Dibu e De Paul só a Copa América: os dois fecham no
  // Chelsea com Palmer e João Pedro.
  {
    groups: [
      { color: 'corn', label: 'Campeões da Champions 2025 (PSG)', members: ['Dembélé', 'Hakimi', 'Vitinha', 'Kvaratskhelia'] },
      { color: 'grass', label: 'Campeões da Euro 2024 (Espanha)', members: ['Carvajal', 'Morata', 'Nico Williams', 'Lamine Yamal'] },
      { color: 'ochre', label: 'Campeões da Copa América 2024 (Argentina)', members: ['Messi', 'Lautaro', 'Dibu Martínez', 'De Paul'] },
      { color: 'ink', label: 'Campeões do Mundial de Clubes 2025 (Chelsea)', members: ['Palmer', 'João Pedro', 'Cucurella', 'Enzo Fernández'] },
    ],
  },
  // 35 — Américas. armadilha: Guerrero, Enner Valencia e Arce fizeram fama
  // no futebol brasileiro, mas defendem Peru, Equador e Paraguai; cada um
  // jogou por uma só seleção.
  {
    groups: [
      { color: 'corn', label: 'Mexicanos', members: ['Hugo Sánchez', 'Rafa Márquez', 'Chicharito', 'Ochoa'] },
      { color: 'grass', label: 'Paraguaios', members: ['Chilavert', 'Gamarra', 'Roque Santa Cruz', 'Arce'] },
      { color: 'ochre', label: 'Peruanos', members: ['Cubillas', 'Guerrero', 'Claudio Pizarro', 'Farfán'] },
      { color: 'ink', label: 'Equatorianos', members: ['Enner Valencia', 'Moisés Caicedo', 'Hincapié', 'Agustín Delgado'] },
    ],
  },
  // 36 — finais de Copa. armadilha: Zidane marcou em final e foi campeão
  // (1998), marcou em final e perdeu (2006) E foi expulso em final (2006).
  // Mbappé marcou em final ganha (2018) e perdida (2022). Mas Pelé, Vavá,
  // Götze e Iniesta enchem o grupo dos campeões; o dos expulsos só tem
  // Monzón, Dezotti, Heitinga e Zidane. Sobra: Mbappé nos que perderam.
  {
    groups: [
      { color: 'corn', label: 'Fizeram gol em final de Copa e foram campeões', members: ['Pelé', 'Vavá', 'Götze', 'Iniesta'] },
      { color: 'grass', label: 'Perderam pênalti na disputa de uma final de Copa', members: ['Baggio', 'Baresi', 'Massaro', 'Trezeguet'] },
      { color: 'ochre', label: 'Expulsos em final de Copa', members: ['Monzón', 'Dezotti', 'Heitinga', 'Zidane'] },
      { color: 'ink', label: 'Fizeram gol em final de Copa e perderam', members: ['Liedholm', 'Neeskens', 'Perišić', 'Mbappé'] },
    ],
  },
  // 37 — artilheiros das ligas. armadilha: Kane foi artilheiro da Premier E da
  // Bundesliga; Lewandowski da Bundesliga E de La Liga (2022–23); Luca Toni da
  // Serie A E da Bundesliga. Mas Gerd Müller, Rummenigge, Klinsmann e Klose
  // só foram artilheiros da Bundesliga, que fica cheia: Kane fecha a Premier,
  // Lewandowski La Liga e Toni a Serie A. (Aubameyang saiu: foi artilheiro da
  // Bundesliga E dividiu a artilharia da Premier 2018–19, abria 2ª solução.)
  {
    groups: [
      { color: 'corn', label: 'Artilheiros da Premier League', members: ['Shearer', 'Henry', 'Salah', 'Kane'] },
      { color: 'grass', label: 'Artilheiros da Bundesliga', members: ['Gerd Müller', 'Rummenigge', 'Klinsmann', 'Klose'] },
      { color: 'ochre', label: 'Artilheiros da Serie A', members: ['Batistuta', 'Immobile', 'Totti', 'Luca Toni'] },
      { color: 'ink', label: 'Artilheiros de La Liga', members: ['Hugo Sánchez', 'Raúl', 'Messi', 'Lewandowski'] },
    ],
  },
  // 38 — escandinavos. armadilha: Larsson e Litmanen brilharam fora (Celtic,
  // Ajax), Solskjær e Riise no futebol inglês; cada um defendeu uma só seleção.
  {
    groups: [
      { color: 'corn', label: 'Suecos', members: ['Ibrahimović', 'Henrik Larsson', 'Brolin', 'Isak'] },
      { color: 'grass', label: 'Noruegueses', members: ['Haaland', 'Ødegaard', 'Solskjær', 'Riise'] },
      { color: 'ochre', label: 'Dinamarqueses', members: ['Michael Laudrup', 'Peter Schmeichel', 'Eriksen', 'Højlund'] },
      { color: 'ink', label: 'Finlandeses', members: ['Litmanen', 'Hyypiä', 'Pukki', 'Jääskeläinen'] },
    ],
  },
  // 39 — leste europeu. armadilha: Boban e Šuker chegaram a jogar pela
  // Iugoslávia antes da Croácia, e Vidić por Sérvia e Montenegro — nenhuma das
  // duas é grupo. Nenhum jogador cabe em duas das quatro seleções.
  {
    groups: [
      { color: 'corn', label: 'Croatas', members: ['Modrić', 'Šuker', 'Boban', 'Gvardiol'] },
      { color: 'grass', label: 'Poloneses', members: ['Lewandowski', 'Boniek', 'Lato', 'Szczęsny'] },
      { color: 'ochre', label: 'Tchecos', members: ['Nedvěd', 'Čech', 'Rosický', 'Poborský'] },
      { color: 'ink', label: 'Sérvios', members: ['Vidić', 'Tadić', 'Mitrović', 'Vlahović'] },
    ],
  },
  // 40 — Champions fora dos gigantes. armadilha: Desailly também ganhou pelo
  // Milan (1994), Deco pelo Barcelona (2006), Van der Sar pelo United (2008) e
  // Paulo Sousa pela Juventus (1996) — nenhum desses é grupo. Ninguém ganhou
  // por dois dos quatro clubes daqui.
  {
    groups: [
      { color: 'corn', label: 'Campeões da Champions pelo Porto (2004)', members: ['Deco', 'Ricardo Carvalho', 'Vítor Baía', 'Paulo Ferreira'] },
      { color: 'grass', label: 'Campeões da Champions pelo Ajax (1995)', members: ['Van der Sar', 'Kluivert', 'Litmanen', 'Overmars'] },
      { color: 'ochre', label: 'Campeões da Champions pelo Olympique de Marseille (1993)', members: ['Barthez', 'Desailly', 'Deschamps', 'Völler'] },
      { color: 'ink', label: 'Campeões da Champions pelo Borussia Dortmund (1997)', members: ['Sammer', 'Riedle', 'Ricken', 'Paulo Sousa'] },
    ],
  },
]
