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
  { answer: 'PELE', display: 'Pelé', nat: 'Brasil', pos: 'Atacante', era: '1957–1977' },
  { answer: 'ZICO', display: 'Zico', nat: 'Brasil', pos: 'Meia', era: '1971–1994' },
  { answer: 'CAFU', display: 'Cafu', nat: 'Brasil', pos: 'Lateral', era: '1994–2006' },
  { answer: 'KAKA', display: 'Kaká', nat: 'Brasil', pos: 'Meia', era: '2002–2010' },
  { answer: 'FIGO', display: 'Luís Figo', nat: 'Portugal', pos: 'Ponta', era: '1995–2006' },
  { answer: 'MESSI', display: 'Lionel Messi', nat: 'Argentina', pos: 'Atacante', era: '2005–presente' },
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

  // === Expansão: mais seleções e clubes ===

  // Brasil
  { answer: 'SOCRATES', display: 'Sócrates', nat: 'Brasil', pos: 'Meia', era: '1974–1989' },
  { answer: 'FALCAO', display: 'Falcão', nat: 'Brasil', pos: 'Meia', era: '1972–1986' },
  { answer: 'BEBETO', display: 'Bebeto', nat: 'Brasil', pos: 'Atacante', era: '1983–2002' },
  { answer: 'ADRIANO', display: 'Adriano', nat: 'Brasil', pos: 'Atacante', era: '2000–2016' },
  { answer: 'DIDA', display: 'Dida', nat: 'Brasil', pos: 'Goleiro', era: '1992–2015' },
  { answer: 'ALISSON', display: 'Alisson', nat: 'Brasil', pos: 'Goleiro', era: '2011–presente' },
  { answer: 'COUTINHO', display: 'Philippe Coutinho', nat: 'Brasil', pos: 'Meia', era: '2009–presente' },

  // Argentina
  { answer: 'RIQUELME', display: 'Juan Román Riquelme', nat: 'Argentina', pos: 'Meia', era: '1996–2015' },
  { answer: 'TEVEZ', display: 'Carlos Tévez', nat: 'Argentina', pos: 'Atacante', era: '2001–2022' },
  { answer: 'CRESPO', display: 'Hernán Crespo', nat: 'Argentina', pos: 'Atacante', era: '1993–2012' },
  { answer: 'VERON', display: 'Juan Sebastián Verón', nat: 'Argentina', pos: 'Meia', era: '1993–2017' },
  { answer: 'DIMARIA', display: 'Ángel Di María', nat: 'Argentina', pos: 'Ponta', era: '2005–presente' },
  { answer: 'AGUERO', display: 'Sergio Agüero', nat: 'Argentina', pos: 'Atacante', era: '2003–2021' },
  { answer: 'PALERMO', display: 'Martín Palermo', nat: 'Argentina', pos: 'Atacante', era: '1992–2011' },

  // Uruguai
  { answer: 'SUAREZ', display: 'Luis Suárez', nat: 'Uruguai', pos: 'Atacante', era: '2005–presente' },
  { answer: 'CAVANI', display: 'Edinson Cavani', nat: 'Uruguai', pos: 'Atacante', era: '2005–presente' },
  { answer: 'FRANCESCOLI', display: 'Enzo Francescoli', nat: 'Uruguai', pos: 'Meia', era: '1982–1997' },

  // Inglaterra
  { answer: 'ROONEY', display: 'Wayne Rooney', nat: 'Inglaterra', pos: 'Atacante', era: '2002–2021' },
  { answer: 'LAMPARD', display: 'Frank Lampard', nat: 'Inglaterra', pos: 'Meia', era: '1995–2016' },
  { answer: 'TERRY', display: 'John Terry', nat: 'Inglaterra', pos: 'Zagueiro', era: '1998–2018' },
  { answer: 'SHEARER', display: 'Alan Shearer', nat: 'Inglaterra', pos: 'Atacante', era: '1988–2006' },
  { answer: 'OWEN', display: 'Michael Owen', nat: 'Inglaterra', pos: 'Atacante', era: '1996–2013' },

  // Espanha
  { answer: 'TORRES', display: 'Fernando Torres', nat: 'Espanha', pos: 'Atacante', era: '2001–2019' },
  { answer: 'XAVI', display: 'Xavi', nat: 'Espanha', pos: 'Meia', era: '1998–2019' },
  { answer: 'INIESTA', display: 'Andrés Iniesta', nat: 'Espanha', pos: 'Meia', era: '2002–2024' },
  { answer: 'RAUL', display: 'Raúl', nat: 'Espanha', pos: 'Atacante', era: '1994–2015' },
  { answer: 'ALONSO', display: 'Xabi Alonso', nat: 'Espanha', pos: 'Meia', era: '2000–2017' },

  // França
  { answer: 'VIEIRA', display: 'Patrick Vieira', nat: 'França', pos: 'Meia', era: '1994–2011' },
  { answer: 'CANTONA', display: 'Eric Cantona', nat: 'França', pos: 'Atacante', era: '1983–1997' },
  { answer: 'PIRES', display: 'Robert Pirès', nat: 'França', pos: 'Meia', era: '1993–2010' },
  { answer: 'TREZEGUET', display: 'David Trezeguet', nat: 'França', pos: 'Atacante', era: '1994–2015' },
  { answer: 'GRIEZMANN', display: 'Antoine Griezmann', nat: 'França', pos: 'Atacante', era: '2009–presente' },
  { answer: 'POGBA', display: 'Paul Pogba', nat: 'França', pos: 'Meia', era: '2009–presente' },

  // Holanda
  { answer: 'VANBASTEN', display: 'Marco van Basten', nat: 'Holanda', pos: 'Atacante', era: '1981–1995' },
  { answer: 'RIJKAARD', display: 'Frank Rijkaard', nat: 'Holanda', pos: 'Meia', era: '1980–1995' },
  { answer: 'DAVIDS', display: 'Edgar Davids', nat: 'Holanda', pos: 'Meia', era: '1991–2010' },
  { answer: 'VANNISTELROOY', display: 'Ruud van Nistelrooy', nat: 'Holanda', pos: 'Atacante', era: '1993–2012' },
  { answer: 'VANDERSAR', display: 'Edwin van der Sar', nat: 'Holanda', pos: 'Goleiro', era: '1990–2011' },
  { answer: 'SNEIJDER', display: 'Wesley Sneijder', nat: 'Holanda', pos: 'Meia', era: '2002–2019' },
  { answer: 'SEEDORF', display: 'Clarence Seedorf', nat: 'Holanda', pos: 'Meia', era: '1992–2014' },

  // Alemanha
  { answer: 'MATTHAUS', display: 'Lothar Matthäus', nat: 'Alemanha', pos: 'Meia', era: '1979–2000' },
  { answer: 'BALLACK', display: 'Michael Ballack', nat: 'Alemanha', pos: 'Meia', era: '1995–2012' },
  { answer: 'KAHN', display: 'Oliver Kahn', nat: 'Alemanha', pos: 'Goleiro', era: '1987–2008' },
  { answer: 'MULLER', display: 'Thomas Müller', nat: 'Alemanha', pos: 'Atacante', era: '2008–presente' },
  { answer: 'RUMMENIGGE', display: 'Karl-Heinz Rummenigge', nat: 'Alemanha', pos: 'Atacante', era: '1974–1989' },

  // Itália
  { answer: 'BAGGIO', display: 'Roberto Baggio', nat: 'Itália', pos: 'Atacante', era: '1982–2004' },
  { answer: 'DELPIERO', display: 'Alessandro Del Piero', nat: 'Itália', pos: 'Atacante', era: '1993–2014' },
  { answer: 'ROSSI', display: 'Paolo Rossi', nat: 'Itália', pos: 'Atacante', era: '1973–1987' },
  { answer: 'ZOFF', display: 'Dino Zoff', nat: 'Itália', pos: 'Goleiro', era: '1961–1983' },
  { answer: 'GATTUSO', display: 'Gennaro Gattuso', nat: 'Itália', pos: 'Meia', era: '1995–2013' },

  // Portugal
  { answer: 'DECO', display: 'Deco', nat: 'Portugal', pos: 'Meia', era: '1997–2013' },
  { answer: 'PEPE', display: 'Pepe', nat: 'Portugal', pos: 'Zagueiro', era: '2001–2024' },

  // Croácia / Leste Europeu
  { answer: 'MODRIC', display: 'Luka Modrić', nat: 'Croácia', pos: 'Meia', era: '2003–presente' },
  { answer: 'SUKER', display: 'Davor Šuker', nat: 'Croácia', pos: 'Atacante', era: '1989–2003' },
  { answer: 'HAGI', display: 'Gheorghe Hagi', nat: 'Romênia', pos: 'Meia', era: '1982–2001' },
  { answer: 'STOICHKOV', display: 'Hristo Stoichkov', nat: 'Bulgária', pos: 'Atacante', era: '1985–2003' },
  { answer: 'SHEVCHENKO', display: 'Andriy Shevchenko', nat: 'Ucrânia', pos: 'Atacante', era: '1994–2012' },
  { answer: 'NEDVED', display: 'Pavel Nedvěd', nat: 'Rep. Tcheca', pos: 'Meia', era: '1991–2009' },

  // Bélgica
  { answer: 'HAZARD', display: 'Eden Hazard', nat: 'Bélgica', pos: 'Ponta', era: '2007–2023' },
  { answer: 'DEBRUYNE', display: 'Kevin De Bruyne', nat: 'Bélgica', pos: 'Meia', era: '2008–presente' },

  // Norte / Leste
  { answer: 'LEWANDOWSKI', display: 'Robert Lewandowski', nat: 'Polônia', pos: 'Atacante', era: '2006–presente' },
  { answer: 'IBRAHIMOVIC', display: 'Zlatan Ibrahimović', nat: 'Suécia', pos: 'Atacante', era: '1999–2023' },
  { answer: 'LAUDRUP', display: 'Michael Laudrup', nat: 'Dinamarca', pos: 'Meia', era: '1981–1998' },

  // África
  { answer: 'WEAH', display: 'George Weah', nat: 'Libéria', pos: 'Atacante', era: '1987–2003' },
  { answer: 'DROGBA', display: 'Didier Drogba', nat: 'Costa do Marfim', pos: 'Atacante', era: '1998–2018' },
  { answer: 'ETOO', display: "Samuel Eto'o", nat: 'Camarões', pos: 'Atacante', era: '1997–2019' },
  { answer: 'SALAH', display: 'Mohamed Salah', nat: 'Egito', pos: 'Ponta', era: '2010–presente' },
  { answer: 'MANE', display: 'Sadio Mané', nat: 'Senegal', pos: 'Ponta', era: '2011–presente' },

  // Demais
  { answer: 'VALDERRAMA', display: 'Carlos Valderrama', nat: 'Colômbia', pos: 'Meia', era: '1985–2004' },
  { answer: 'JAMES', display: 'James Rodríguez', nat: 'Colômbia', pos: 'Meia', era: '2009–presente' },
  { answer: 'SANCHEZ', display: 'Hugo Sánchez', nat: 'México', pos: 'Atacante', era: '1976–1997' },
  { answer: 'BALE', display: 'Gareth Bale', nat: 'País de Gales', pos: 'Ponta', era: '2006–2023' },

  // Geração atual
  { answer: 'BENZEMA', display: 'Karim Benzema', nat: 'França', pos: 'Atacante', era: '2004–presente' },
  { answer: 'KANTE', display: "N'Golo Kanté", nat: 'França', pos: 'Meia', era: '2012–presente' },
  { answer: 'KROOS', display: 'Toni Kroos', nat: 'Alemanha', pos: 'Meia', era: '2007–2024' },
  { answer: 'CASEMIRO', display: 'Casemiro', nat: 'Brasil', pos: 'Meia', era: '2010–presente' },
  { answer: 'VINICIUS', display: 'Vinícius Júnior', nat: 'Brasil', pos: 'Ponta', era: '2017–presente' },
  { answer: 'HAALAND', display: 'Erling Haaland', nat: 'Noruega', pos: 'Atacante', era: '2016–presente' },

  // === Convocados para a Copa de 2026 (fonte: listas oficiais) ===

  // Brasil
  { answer: 'RAPHINHA', display: 'Raphinha', nat: 'Brasil', pos: 'Ponta', era: '2016–presente' },
  { answer: 'GUIMARAES', display: 'Bruno Guimarães', nat: 'Brasil', pos: 'Meia', era: '2015–presente' },
  { answer: 'ENDRICK', display: 'Endrick', nat: 'Brasil', pos: 'Atacante', era: '2022–presente' },
  { answer: 'MARQUINHOS', display: 'Marquinhos', nat: 'Brasil', pos: 'Zagueiro', era: '2012–presente' },
  { answer: 'EDERSON', display: 'Ederson', nat: 'Brasil', pos: 'Goleiro', era: '2012–presente' },

  // Argentina
  { answer: 'LAUTARO', display: 'Lautaro Martínez', nat: 'Argentina', pos: 'Atacante', era: '2015–presente' },
  { answer: 'ALVAREZ', display: 'Julián Álvarez', nat: 'Argentina', pos: 'Atacante', era: '2018–presente' },
  { answer: 'ENZO', display: 'Enzo Fernández', nat: 'Argentina', pos: 'Meia', era: '2019–presente' },
  { answer: 'MACALLISTER', display: 'Alexis Mac Allister', nat: 'Argentina', pos: 'Meia', era: '2016–presente' },
  { answer: 'DIBU', display: 'Emiliano Martínez', nat: 'Argentina', pos: 'Goleiro', era: '2010–presente' },
  { answer: 'ROMERO', display: 'Cristian Romero', nat: 'Argentina', pos: 'Zagueiro', era: '2018–presente' },

  // França
  { answer: 'TCHOUAMENI', display: 'Aurélien Tchouaméni', nat: 'França', pos: 'Meia', era: '2018–presente' },
  { answer: 'DEMBELE', display: 'Ousmane Dembélé', nat: 'França', pos: 'Ponta', era: '2015–presente' },
  { answer: 'SALIBA', display: 'William Saliba', nat: 'França', pos: 'Zagueiro', era: '2019–presente' },

  // Inglaterra
  { answer: 'BELLINGHAM', display: 'Jude Bellingham', nat: 'Inglaterra', pos: 'Meia', era: '2019–presente' },
  { answer: 'KANE', display: 'Harry Kane', nat: 'Inglaterra', pos: 'Atacante', era: '2011–presente' },
  { answer: 'SAKA', display: 'Bukayo Saka', nat: 'Inglaterra', pos: 'Ponta', era: '2018–presente' },
  { answer: 'RICE', display: 'Declan Rice', nat: 'Inglaterra', pos: 'Meia', era: '2017–presente' },

  // Portugal
  { answer: 'FERNANDES', display: 'Bruno Fernandes', nat: 'Portugal', pos: 'Meia', era: '2012–presente' },
  { answer: 'BERNARDO', display: 'Bernardo Silva', nat: 'Portugal', pos: 'Meia', era: '2013–presente' },
  { answer: 'DIAS', display: 'Rúben Dias', nat: 'Portugal', pos: 'Zagueiro', era: '2015–presente' },
  { answer: 'LEAO', display: 'Rafael Leão', nat: 'Portugal', pos: 'Ponta', era: '2017–presente' },

  // Espanha
  { answer: 'PEDRI', display: 'Pedri', nat: 'Espanha', pos: 'Meia', era: '2019–presente' },
  { answer: 'GAVI', display: 'Gavi', nat: 'Espanha', pos: 'Meia', era: '2021–presente' },
  { answer: 'RODRI', display: 'Rodri', nat: 'Espanha', pos: 'Meia', era: '2015–presente' },
  { answer: 'YAMAL', display: 'Lamine Yamal', nat: 'Espanha', pos: 'Ponta', era: '2023–presente' },
  { answer: 'NICOWILLIAMS', display: 'Nico Williams', nat: 'Espanha', pos: 'Ponta', era: '2021–presente' },

  // Alemanha
  { answer: 'MUSIALA', display: 'Jamal Musiala', nat: 'Alemanha', pos: 'Meia', era: '2020–presente' },
  { answer: 'WIRTZ', display: 'Florian Wirtz', nat: 'Alemanha', pos: 'Meia', era: '2020–presente' },
  { answer: 'KIMMICH', display: 'Joshua Kimmich', nat: 'Alemanha', pos: 'Lateral', era: '2013–presente' },

  // Holanda
  { answer: 'VANDIJK', display: 'Virgil van Dijk', nat: 'Holanda', pos: 'Zagueiro', era: '2011–presente' },
  { answer: 'DEJONG', display: 'Frenkie de Jong', nat: 'Holanda', pos: 'Meia', era: '2015–presente' },
  { answer: 'GAKPO', display: 'Cody Gakpo', nat: 'Holanda', pos: 'Atacante', era: '2018–presente' },
  { answer: 'DEPAY', display: 'Memphis Depay', nat: 'Holanda', pos: 'Atacante', era: '2011–presente' },

  // Bélgica
  { answer: 'LUKAKU', display: 'Romelu Lukaku', nat: 'Bélgica', pos: 'Atacante', era: '2009–presente' },
  { answer: 'COURTOIS', display: 'Thibaut Courtois', nat: 'Bélgica', pos: 'Goleiro', era: '2011–presente' },

  // Uruguai
  { answer: 'VALVERDE', display: 'Federico Valverde', nat: 'Uruguai', pos: 'Meia', era: '2015–presente' },
  { answer: 'NUNEZ', display: 'Darwin Núñez', nat: 'Uruguai', pos: 'Atacante', era: '2017–presente' },

  // Marrocos
  { answer: 'HAKIMI', display: 'Achraf Hakimi', nat: 'Marrocos', pos: 'Lateral', era: '2016–presente' },
]
