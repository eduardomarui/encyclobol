// Puzzles de "O Intruso": 4 craques, 3 compartilham um traço, 1 não.
// Cada puzzle tem resposta ÚNICA: só um traço divide 3-contra-1, e os
// demais traços nunca isolam um jogador diferente (no máximo reforçam).
// `cat` é o tipo do elo que liga os outros três (usado na 2ª etapa).

export type IntrusoCat = 'Posição' | 'Nacionalidade' | 'Clube' | 'Era'

export type IntrusoPuzzle = {
  players: string[]
  intruder: string
  cat: IntrusoCat
  rule: string
}

export const intruso: IntrusoPuzzle[] = [
  {
    players: ['Cafu', 'Roberto Carlos', 'Lahm', 'Maldini'],
    intruder: 'Maldini',
    cat: 'Posição',
    rule: 'Os outros são laterais; Maldini é zagueiro.',
  },
  {
    players: ['Buffon', 'Casillas', 'Neuer', 'Cannavaro'],
    intruder: 'Cannavaro',
    cat: 'Posição',
    rule: 'Os outros são goleiros; Cannavaro é zagueiro.',
  },
  {
    players: ['Maldini', 'Baresi', 'Nesta', 'Puyol'],
    intruder: 'Puyol',
    cat: 'Nacionalidade',
    rule: 'Os outros são zagueiros italianos; Puyol é espanhol.',
  },
  {
    players: ['Messi', 'Kempes', 'Batistuta', 'Cruyff'],
    intruder: 'Cruyff',
    cat: 'Nacionalidade',
    rule: 'Os outros são argentinos; Cruyff é holandês.',
  },
  {
    players: ['Mbappé', 'Neymar', 'Messi', 'Pelé'],
    intruder: 'Pelé',
    cat: 'Era',
    rule: 'Os outros surgiram no século 21; Pelé é dos anos 1950.',
  },
  {
    players: ['Cruyff', 'Bergkamp', 'Robben', 'Figo'],
    intruder: 'Figo',
    cat: 'Nacionalidade',
    rule: 'Os outros são holandeses; Figo é português.',
  },
  {
    players: ['Maldini', 'Baresi', 'Nesta', 'Cannavaro'],
    intruder: 'Cannavaro',
    cat: 'Clube',
    rule: 'Os outros são ídolos do Milan; Cannavaro nunca jogou lá.',
  },
  {
    players: ['Ronaldo', 'Henry', 'Klose', 'Maldini'],
    intruder: 'Maldini',
    cat: 'Posição',
    rule: 'Os outros são atacantes; Maldini é zagueiro.',
  },
  {
    players: ['Zico', 'Platini', 'Maradona', 'Buffon'],
    intruder: 'Buffon',
    cat: 'Posição',
    rule: 'Os outros eram meias; Buffon é goleiro.',
  },
  {
    players: ['Pelé', 'Cruyff', 'Eusébio', 'Mbappé'],
    intruder: 'Mbappé',
    cat: 'Era',
    rule: 'Os outros são lendas dos anos 1950/60; Mbappé é de 2015.',
  },
  {
    players: ['Casillas', 'Buffon', 'Neuer', 'Ramos'],
    intruder: 'Ramos',
    cat: 'Posição',
    rule: 'Os outros são goleiros; Ramos é zagueiro.',
  },
  {
    players: ['Mbappé', 'Neymar', 'Cristiano Ronaldo', 'Maradona'],
    intruder: 'Maradona',
    cat: 'Era',
    rule: 'Os outros brilharam no século 21; Maradona é dos anos 1980.',
  },
  {
    players: ['Drogba', "Eto'o", 'Weah', 'Maldini'],
    intruder: 'Maldini',
    cat: 'Posição',
    rule: 'Os outros são atacantes africanos; Maldini é zagueiro.',
  },
  {
    players: ['Xavi', 'Iniesta', 'Xabi Alonso', 'Pirlo'],
    intruder: 'Pirlo',
    cat: 'Nacionalidade',
    rule: 'Os outros são meias espanhóis; Pirlo é italiano.',
  },
  {
    players: ['Cavani', 'Suárez', 'Forlán', 'Salah'],
    intruder: 'Salah',
    cat: 'Nacionalidade',
    rule: 'Os outros são uruguaios; Salah é egípcio.',
  },
  {
    players: ['Lewandowski', 'Lahm', 'Neuer', 'Drogba'],
    intruder: 'Drogba',
    cat: 'Clube',
    rule: 'Os outros jogaram no Bayern de Munique; Drogba nunca.',
  },
  {
    players: ['Salah', 'Mané', 'Robben', 'Lewandowski'],
    intruder: 'Lewandowski',
    cat: 'Posição',
    rule: 'Os outros são pontas; Lewandowski é centroavante.',
  },
  {
    players: ['Pirlo', 'Xavi', 'Iniesta', 'Cannavaro'],
    intruder: 'Cannavaro',
    cat: 'Posição',
    rule: 'Os outros eram meias; Cannavaro é zagueiro.',
  },
  {
    players: ['Messi', 'Agüero', 'Batistuta', 'Suárez'],
    intruder: 'Suárez',
    cat: 'Nacionalidade',
    rule: 'Os outros são argentinos; Suárez é uruguaio.',
  },
  {
    players: ['Modrić', 'Hagi', 'Nedvěd', 'Stoichkov'],
    intruder: 'Stoichkov',
    cat: 'Posição',
    rule: 'Os outros eram meias; Stoichkov era atacante.',
  },
  {
    players: ['Drogba', "Eto'o", 'Weah', 'Lukaku'],
    intruder: 'Lukaku',
    cat: 'Nacionalidade',
    rule: 'Os outros jogam por seleções africanas; Lukaku é belga.',
  },

  // ===== Expansão =====
  { players: ['Buffon', 'Casillas', 'Neuer', 'Cafu'], intruder: 'Cafu', cat: 'Posição', rule: 'Os outros são goleiros; Cafu é lateral.' },
  { players: ['Ronaldo', 'Romário', 'Bebeto', 'Figo'], intruder: 'Figo', cat: 'Nacionalidade', rule: 'Os outros são atacantes brasileiros; Figo é português.' },
  { players: ['Crespo', 'Batistuta', 'Kempes', 'Forlán'], intruder: 'Forlán', cat: 'Nacionalidade', rule: 'Os outros são argentinos; Forlán é uruguaio.' },
  { players: ['Pirlo', 'Iniesta', 'Xavi', 'Buffon'], intruder: 'Buffon', cat: 'Posição', rule: 'Os outros eram meias; Buffon é goleiro.' },
  { players: ['Lewandowski', 'Haaland', 'Kane', 'Van Dijk'], intruder: 'Van Dijk', cat: 'Posição', rule: 'Os outros são centroavantes; Van Dijk é zagueiro.' },
  { players: ['Zidane', 'Henry', 'Platini', 'Maldini'], intruder: 'Maldini', cat: 'Nacionalidade', rule: 'Os outros são franceses; Maldini é italiano.' },
  { players: ['Yashin', 'Banks', 'Zoff', 'Beckenbauer'], intruder: 'Beckenbauer', cat: 'Posição', rule: 'Os outros são goleiros; Beckenbauer é zagueiro.' },
  { players: ['Vinícius', 'Rodrygo', 'Raphinha', 'Messi'], intruder: 'Messi', cat: 'Nacionalidade', rule: 'Os outros são brasileiros; Messi é argentino.' },
  { players: ['Robben', 'Figo', 'Bale', 'Shearer'], intruder: 'Shearer', cat: 'Posição', rule: 'Os outros são pontas; Shearer é centroavante.' },
  { players: ['Totti', 'Del Piero', 'Baggio', 'Raúl'], intruder: 'Raúl', cat: 'Nacionalidade', rule: 'Os outros são italianos; Raúl é espanhol.' },
  { players: ['Klose', 'Völler', 'Bierhoff', 'Cruyff'], intruder: 'Cruyff', cat: 'Nacionalidade', rule: 'Os outros são alemães; Cruyff é holandês.' },
  { players: ['Cafu', 'Roberto Carlos', 'Maicon', 'Pirlo'], intruder: 'Pirlo', cat: 'Posição', rule: 'Os outros são laterais; Pirlo é meia.' },
  { players: ['Pedri', 'Gavi', 'Modrić', 'Haaland'], intruder: 'Haaland', cat: 'Posição', rule: 'Os outros são meias; Haaland é atacante.' },
  { players: ['Neuer', 'Courtois', 'Ochoa', 'Vinícius'], intruder: 'Vinícius', cat: 'Posição', rule: 'Os outros são goleiros; Vinícius é atacante.' },
  { players: ['Xavi', 'Iniesta', 'Casillas', 'Cannavaro'], intruder: 'Cannavaro', cat: 'Nacionalidade', rule: 'Os outros são espanhóis; Cannavaro é italiano.' },
]
