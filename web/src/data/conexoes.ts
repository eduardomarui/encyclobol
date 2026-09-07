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
  // 7 — CLUBE + posição + seleção misturados. Brasileiros espalhados entre
  // Milan e Barça; Messi é argentino mas só fecha no Barça.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Milan', members: ['Cafu', 'Kaká', 'Ronaldinho', 'Maldini'] },
      { color: 'grass', label: 'Jogaram no Barcelona', members: ['Messi', 'Romário', 'Cruyff', 'Neymar'] },
      { color: 'ochre', label: 'Goleiros', members: ['Buffon', 'Yashin', 'Banks', 'Casillas'] },
      { color: 'ink', label: 'Argentinos', members: ['Maradona', 'Batistuta', 'Kempes', 'Zanetti'] },
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
  // 10 — quatro clubes (Itália + Espanha). Figo (Real), Ronaldinho (Barça),
  // Zidane (Real), Seedorf (Milan) só fecham de um jeito.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Milan', members: ['Maldini', 'Gattuso', 'Nesta', 'Seedorf'] },
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
      { color: 'ink', label: 'Holandeses', members: ['Van Dijk', 'De Jong', 'Gakpo', 'Depay'] },
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
      { color: 'grass', label: 'Goleiros', members: ['Fillol', 'Goycochea', 'Chilavert', 'Dibu'] },
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
      { color: 'ink', label: 'Jogaram no Grêmio', members: ['Renato Gaúcho', 'Ronaldinho', 'Emerson', 'Suárez'] },
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
]
