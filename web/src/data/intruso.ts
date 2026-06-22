// Puzzles de "O Intruso": 4 craques, 3 compartilham um traço, 1 não.
// Cada puzzle tem resposta ÚNICA: só um traço divide 3-contra-1, e os
// demais traços nunca isolam um jogador diferente (no máximo reforçam).

export type IntrusoPuzzle = {
  players: string[]
  intruder: string
  rule: string
}

export const intruso: IntrusoPuzzle[] = [
  {
    players: ['Cafu', 'Roberto Carlos', 'Lahm', 'Maldini'],
    intruder: 'Maldini',
    rule: 'Os outros são laterais; Maldini é zagueiro.',
  },
  {
    players: ['Buffon', 'Casillas', 'Neuer', 'Cannavaro'],
    intruder: 'Cannavaro',
    rule: 'Os outros são goleiros; Cannavaro é zagueiro.',
  },
  {
    players: ['Maldini', 'Baresi', 'Nesta', 'Puyol'],
    intruder: 'Puyol',
    rule: 'Os outros são zagueiros italianos; Puyol é espanhol.',
  },
  {
    players: ['Messi', 'Kempes', 'Batistuta', 'Cruyff'],
    intruder: 'Cruyff',
    rule: 'Os outros são argentinos; Cruyff é holandês.',
  },
  {
    players: ['Mbappé', 'Neymar', 'Messi', 'Pelé'],
    intruder: 'Pelé',
    rule: 'Os outros surgiram no século 21; Pelé é dos anos 1950.',
  },
  {
    players: ['Cruyff', 'Bergkamp', 'Robben', 'Figo'],
    intruder: 'Figo',
    rule: 'Os outros são holandeses; Figo é português.',
  },
  {
    players: ['Maldini', 'Baresi', 'Nesta', 'Cannavaro'],
    intruder: 'Cannavaro',
    rule: 'Os outros são ídolos do Milan; Cannavaro nunca jogou lá.',
  },
  {
    players: ['Ronaldo', 'Henry', 'Klose', 'Maldini'],
    intruder: 'Maldini',
    rule: 'Os outros são atacantes; Maldini é zagueiro.',
  },
  {
    players: ['Zico', 'Platini', 'Maradona', 'Buffon'],
    intruder: 'Buffon',
    rule: 'Os outros eram meias; Buffon é goleiro.',
  },
  {
    players: ['Pelé', 'Cruyff', 'Eusébio', 'Mbappé'],
    intruder: 'Mbappé',
    rule: 'Os outros são lendas dos anos 1950/60; Mbappé é de 2015.',
  },
  {
    players: ['Casillas', 'Buffon', 'Neuer', 'Ramos'],
    intruder: 'Ramos',
    rule: 'Os outros são goleiros; Ramos é zagueiro.',
  },
  {
    players: ['Mbappé', 'Neymar', 'Cristiano Ronaldo', 'Maradona'],
    intruder: 'Maradona',
    rule: 'Os outros brilharam no século 21; Maradona é dos anos 1980.',
  },
  {
    players: ['Drogba', "Eto'o", 'Weah', 'Maldini'],
    intruder: 'Maldini',
    rule: 'Os outros são atacantes africanos; Maldini é zagueiro italiano.',
  },
  {
    players: ['Xavi', 'Iniesta', 'Xabi Alonso', 'Pirlo'],
    intruder: 'Pirlo',
    rule: 'Os outros são meias espanhóis; Pirlo é italiano.',
  },
  {
    players: ['Cavani', 'Suárez', 'Forlán', 'Salah'],
    intruder: 'Salah',
    rule: 'Os outros são uruguaios; Salah é egípcio.',
  },
  {
    players: ['Lewandowski', 'Lahm', 'Neuer', 'Drogba'],
    intruder: 'Drogba',
    rule: 'Os outros jogaram no Bayern de Munique; Drogba nunca.',
  },
  {
    players: ['Salah', 'Mané', 'Robben', 'Lewandowski'],
    intruder: 'Lewandowski',
    rule: 'Os outros são pontas; Lewandowski é centroavante.',
  },
  {
    players: ['Pirlo', 'Xavi', 'Iniesta', 'Cannavaro'],
    intruder: 'Cannavaro',
    rule: 'Os outros eram meias; Cannavaro é zagueiro.',
  },
  {
    players: ['Messi', 'Agüero', 'Batistuta', 'Suárez'],
    intruder: 'Suárez',
    rule: 'Os outros são argentinos; Suárez é uruguaio.',
  },
  {
    players: ['Modrić', 'Hagi', 'Nedvěd', 'Stoichkov'],
    intruder: 'Stoichkov',
    rule: 'Os outros eram meias; Stoichkov era atacante.',
  },
  {
    players: ['Drogba', "Eto'o", 'Weah', 'Lukaku'],
    intruder: 'Lukaku',
    rule: 'Os outros jogam por seleções africanas; Lukaku é belga.',
  },
  {
    players: ['Neymar', 'Romário', 'Ronaldo', 'Cafu'],
    intruder: 'Cafu',
    rule: 'Os outros são atacantes; Cafu é lateral.',
  },
]
