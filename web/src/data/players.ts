// Banco de jogadores do Encyclobol.
// `answer` é o nome usado nos jogos: MAIÚSCULO, sem acento e sem espaço.
// `display` é o nome de exibição para a revelação.

export type Player = {
  answer: string
  display: string
  nat: string
  pos: string
  era: string
}

export const players: Player[] = [
  { answer: 'PELE', display: 'Pelé', nat: 'Brasil', pos: 'Atacante', era: '1958–1971' },
  { answer: 'ZICO', display: 'Zico', nat: 'Brasil', pos: 'Meia', era: '1976–1986' },
  { answer: 'CAFU', display: 'Cafu', nat: 'Brasil', pos: 'Lateral', era: '1994–2006' },
  { answer: 'KAKA', display: 'Kaká', nat: 'Brasil', pos: 'Meia', era: '2002–2010' },
  { answer: 'FIGO', display: 'Luís Figo', nat: 'Portugal', pos: 'Ponta', era: '1995–2006' },
  { answer: 'MESSI', display: 'Lionel Messi', nat: 'Argentina', pos: 'Atacante', era: '2005–2024' },
  { answer: 'TOTTI', display: 'Francesco Totti', nat: 'Itália', pos: 'Atacante', era: '1994–2017' },
  { answer: 'PIRLO', display: 'Andrea Pirlo', nat: 'Itália', pos: 'Meia', era: '1998–2017' },
  { answer: 'HENRY', display: 'Thierry Henry', nat: 'França', pos: 'Atacante', era: '1996–2012' },
  { answer: 'KLOSE', display: 'Miroslav Klose', nat: 'Alemanha', pos: 'Atacante', era: '1999–2014' },
  { answer: 'CRUYFF', display: 'Johan Cruyff', nat: 'Holanda', pos: 'Atacante', era: '1964–1984' },
  { answer: 'GULLIT', display: 'Ruud Gullit', nat: 'Holanda', pos: 'Meia', era: '1979–1998' },
  { answer: 'ROBBEN', display: 'Arjen Robben', nat: 'Holanda', pos: 'Ponta', era: '2000–2021' },
  { answer: 'NEYMAR', display: 'Neymar', nat: 'Brasil', pos: 'Atacante', era: '2009–presente' },
  { answer: 'MBAPPE', display: 'Kylian Mbappé', nat: 'França', pos: 'Atacante', era: '2015–presente' },
  { answer: 'FORLAN', display: 'Diego Forlán', nat: 'Uruguai', pos: 'Atacante', era: '2002–2019' },
  { answer: 'KEMPES', display: 'Mario Kempes', nat: 'Argentina', pos: 'Atacante', era: '1973–1996' },
  { answer: 'BARESI', display: 'Franco Baresi', nat: 'Itália', pos: 'Zagueiro', era: '1977–1997' },
  { answer: 'BUFFON', display: 'Gianluigi Buffon', nat: 'Itália', pos: 'Goleiro', era: '1995–2023' },
  { answer: 'FIGUEROA', display: 'Elías Figueroa', nat: 'Chile', pos: 'Zagueiro', era: '1964–1982' },
  { answer: 'EUSEBIO', display: 'Eusébio', nat: 'Portugal', pos: 'Atacante', era: '1960–1978' },
  { answer: 'ROMARIO', display: 'Romário', nat: 'Brasil', pos: 'Atacante', era: '1985–2007' },
  { answer: 'RIVALDO', display: 'Rivaldo', nat: 'Brasil', pos: 'Meia', era: '1991–2015' },
  { answer: 'RONALDO', display: 'Ronaldo', nat: 'Brasil', pos: 'Atacante', era: '1993–2011' },
  { answer: 'ZIDANE', display: 'Zinédine Zidane', nat: 'França', pos: 'Meia', era: '1989–2006' },
  { answer: 'PLATINI', display: 'Michel Platini', nat: 'França', pos: 'Meia', era: '1972–1987' },
  { answer: 'MALDINI', display: 'Paolo Maldini', nat: 'Itália', pos: 'Zagueiro', era: '1985–2009' },
  { answer: 'BECKHAM', display: 'David Beckham', nat: 'Inglaterra', pos: 'Meia', era: '1992–2013' },
  { answer: 'GERRARD', display: 'Steven Gerrard', nat: 'Inglaterra', pos: 'Meia', era: '1998–2016' },
  { answer: 'MARADONA', display: 'Diego Maradona', nat: 'Argentina', pos: 'Meia', era: '1976–1997' },
  { answer: 'BERGKAMP', display: 'Dennis Bergkamp', nat: 'Holanda', pos: 'Atacante', era: '1986–2006' },
  { answer: 'GARRINCHA', display: 'Garrincha', nat: 'Brasil', pos: 'Ponta', era: '1953–1972' },
  { answer: 'CRISTIANO', display: 'Cristiano Ronaldo', nat: 'Portugal', pos: 'Atacante', era: '2002–presente' },
  { answer: 'BATISTUTA', display: 'Gabriel Batistuta', nat: 'Argentina', pos: 'Atacante', era: '1988–2005' },
  { answer: 'RONALDINHO', display: 'Ronaldinho Gaúcho', nat: 'Brasil', pos: 'Meia', era: '1998–2015' },
  { answer: 'BECKENBAUER', display: 'Franz Beckenbauer', nat: 'Alemanha', pos: 'Zagueiro', era: '1964–1983' },

  // Goleiros
  { answer: 'YASHIN', display: 'Lev Yashin', nat: 'União Soviética', pos: 'Goleiro', era: '1950–1970' },
  { answer: 'BANKS', display: 'Gordon Banks', nat: 'Inglaterra', pos: 'Goleiro', era: '1958–1978' },
  { answer: 'TAFFAREL', display: 'Cláudio Taffarel', nat: 'Brasil', pos: 'Goleiro', era: '1988–2003' },
  { answer: 'CASILLAS', display: 'Iker Casillas', nat: 'Espanha', pos: 'Goleiro', era: '1999–2019' },
  { answer: 'NEUER', display: 'Manuel Neuer', nat: 'Alemanha', pos: 'Goleiro', era: '2006–presente' },

  // Laterais
  { answer: 'CARLOS', display: 'Roberto Carlos', nat: 'Brasil', pos: 'Lateral', era: '1992–2015' },
  { answer: 'MAICON', display: 'Maicon', nat: 'Brasil', pos: 'Lateral', era: '2001–2018' },
  { answer: 'LAHM', display: 'Philipp Lahm', nat: 'Alemanha', pos: 'Lateral', era: '2002–2017' },
  { answer: 'ZANETTI', display: 'Javier Zanetti', nat: 'Argentina', pos: 'Lateral', era: '1992–2014' },
  { answer: 'FACCHETTI', display: 'Giacinto Facchetti', nat: 'Itália', pos: 'Lateral', era: '1960–1978' },

  // Zagueiros
  { answer: 'NESTA', display: 'Alessandro Nesta', nat: 'Itália', pos: 'Zagueiro', era: '1993–2012' },
  { answer: 'CANNAVARO', display: 'Fabio Cannavaro', nat: 'Itália', pos: 'Zagueiro', era: '1992–2011' },
  { answer: 'PUYOL', display: 'Carles Puyol', nat: 'Espanha', pos: 'Zagueiro', era: '1999–2014' },
  { answer: 'RAMOS', display: 'Sergio Ramos', nat: 'Espanha', pos: 'Zagueiro', era: '2004–presente' },
  { answer: 'LUCIO', display: 'Lúcio', nat: 'Brasil', pos: 'Zagueiro', era: '1997–2016' },
]
