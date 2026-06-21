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
]
