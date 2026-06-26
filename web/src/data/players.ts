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
  { answer: 'CAFU', display: 'Cafu', nat: 'Brasil', pos: 'Lateral', era: '1989–2008' },
  { answer: 'KAKA', display: 'Kaká', nat: 'Brasil', pos: 'Meia', era: '2001–2017' },
  { answer: 'FIGO', display: 'Luís Figo', nat: 'Portugal', pos: 'Ponta', era: '1990–2009' },
  { answer: 'MESSI', display: 'Lionel Messi', nat: 'Argentina', pos: 'Atacante', era: '2005–presente' },
  { answer: 'TOTTI', display: 'Francesco Totti', nat: 'Itália', pos: 'Atacante', era: '1993–2017' },
  { answer: 'PIRLO', display: 'Andrea Pirlo', nat: 'Itália', pos: 'Meia', era: '1995–2017' },
  { answer: 'HENRY', display: 'Thierry Henry', nat: 'França', pos: 'Atacante', era: '1994–2012' },
  { answer: 'KLOSE', display: 'Miroslav Klose', nat: 'Alemanha', pos: 'Atacante', era: '1999–2014' },
  { answer: 'CRUYFF', display: 'Johan Cruyff', nat: 'Holanda', pos: 'Atacante', era: '1964–1984' },
  { answer: 'GULLIT', display: 'Ruud Gullit', nat: 'Holanda', pos: 'Meia', era: '1979–1998' },
  { answer: 'ROBBEN', display: 'Arjen Robben', nat: 'Holanda', pos: 'Ponta', era: '2000–2021' },
  { answer: 'NEYMAR', display: 'Neymar', nat: 'Brasil', pos: 'Atacante', era: '2009–presente' },
  { answer: 'MBAPPE', display: 'Kylian Mbappé', nat: 'França', pos: 'Atacante', era: '2015–presente' },
  { answer: 'FORLAN', display: 'Diego Forlán', nat: 'Uruguai', pos: 'Atacante', era: '1998–2019' },
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

  // === Expansão 2: mais lendas e craques atuais ===

  // Brasil
  { answer: 'DIDI', display: 'Didi', nat: 'Brasil', pos: 'Meia', era: '1950–1965' },
  { answer: 'VAVA', display: 'Vavá', nat: 'Brasil', pos: 'Atacante', era: '1951–1965' },
  { answer: 'TOSTAO', display: 'Tostão', nat: 'Brasil', pos: 'Atacante', era: '1963–1973' },
  { answer: 'RIVELINO', display: 'Rivelino', nat: 'Brasil', pos: 'Meia', era: '1965–1981' },
  { answer: 'JAIRZINHO', display: 'Jairzinho', nat: 'Brasil', pos: 'Ponta', era: '1960–1982' },
  { answer: 'CARLOSALBERTO', display: 'Carlos Alberto Torres', nat: 'Brasil', pos: 'Lateral', era: '1963–1982' },
  { answer: 'JUNIOR', display: 'Júnior', nat: 'Brasil', pos: 'Lateral', era: '1974–1993' },
  { answer: 'CARECA', display: 'Careca', nat: 'Brasil', pos: 'Atacante', era: '1978–1994' },
  { answer: 'THIAGOSILVA', display: 'Thiago Silva', nat: 'Brasil', pos: 'Zagueiro', era: '2004–presente' },
  { answer: 'DAVIDLUIZ', display: 'David Luiz', nat: 'Brasil', pos: 'Zagueiro', era: '2006–presente' },
  { answer: 'MARCELO', display: 'Marcelo', nat: 'Brasil', pos: 'Lateral', era: '2005–2025' },
  { answer: 'GABRIELJESUS', display: 'Gabriel Jesus', nat: 'Brasil', pos: 'Atacante', era: '2015–presente' },
  { answer: 'RICHARLISON', display: 'Richarlison', nat: 'Brasil', pos: 'Atacante', era: '2015–presente' },
  { answer: 'FIRMINO', display: 'Roberto Firmino', nat: 'Brasil', pos: 'Atacante', era: '2009–presente' },
  { answer: 'HULK', display: 'Hulk', nat: 'Brasil', pos: 'Atacante', era: '2004–presente' },

  // Argentina
  { answer: 'PASSARELLA', display: 'Daniel Passarella', nat: 'Argentina', pos: 'Zagueiro', era: '1971–1989' },
  { answer: 'SIVORI', display: 'Omar Sívori', nat: 'Argentina', pos: 'Atacante', era: '1954–1969' },
  { answer: 'CANIGGIA', display: 'Claudio Caniggia', nat: 'Argentina', pos: 'Atacante', era: '1985–2004' },
  { answer: 'REDONDO', display: 'Fernando Redondo', nat: 'Argentina', pos: 'Meia', era: '1985–2004' },
  { answer: 'SIMEONE', display: 'Diego Simeone', nat: 'Argentina', pos: 'Meia', era: '1987–2006' },
  { answer: 'ORTEGA', display: 'Ariel Ortega', nat: 'Argentina', pos: 'Meia', era: '1991–2012' },
  { answer: 'AIMAR', display: 'Pablo Aimar', nat: 'Argentina', pos: 'Meia', era: '1996–2015' },
  { answer: 'SAVIOLA', display: 'Javier Saviola', nat: 'Argentina', pos: 'Atacante', era: '1998–2015' },
  { answer: 'HIGUAIN', display: 'Gonzalo Higuaín', nat: 'Argentina', pos: 'Atacante', era: '2004–2021' },
  { answer: 'MASCHERANO', display: 'Javier Mascherano', nat: 'Argentina', pos: 'Meia', era: '2001–2020' },

  // Uruguai
  { answer: 'RECOBA', display: 'Álvaro Recoba', nat: 'Uruguai', pos: 'Meia', era: '1994–2015' },
  { answer: 'GODIN', display: 'Diego Godín', nat: 'Uruguai', pos: 'Zagueiro', era: '2003–2022' },

  // Espanha
  { answer: 'DAVIDVILLA', display: 'David Villa', nat: 'Espanha', pos: 'Atacante', era: '2000–2019' },
  { answer: 'FABREGAS', display: 'Cesc Fàbregas', nat: 'Espanha', pos: 'Meia', era: '2003–2023' },
  { answer: 'DAVIDSILVA', display: 'David Silva', nat: 'Espanha', pos: 'Meia', era: '2004–2020' },
  { answer: 'BUSQUETS', display: 'Sergio Busquets', nat: 'Espanha', pos: 'Meia', era: '2008–2025' },
  { answer: 'HIERRO', display: 'Fernando Hierro', nat: 'Espanha', pos: 'Zagueiro', era: '1987–2005' },
  { answer: 'MORIENTES', display: 'Fernando Morientes', nat: 'Espanha', pos: 'Atacante', era: '1993–2010' },

  // França
  { answer: 'FONTAINE', display: 'Just Fontaine', nat: 'França', pos: 'Atacante', era: '1953–1962' },
  { answer: 'THURAM', display: 'Lilian Thuram', nat: 'França', pos: 'Zagueiro', era: '1990–2008' },
  { answer: 'BLANC', display: 'Laurent Blanc', nat: 'França', pos: 'Zagueiro', era: '1983–2003' },
  { answer: 'DESCHAMPS', display: 'Didier Deschamps', nat: 'França', pos: 'Meia', era: '1985–2001' },
  { answer: 'PAPIN', display: 'Jean-Pierre Papin', nat: 'França', pos: 'Atacante', era: '1984–1998' },
  { answer: 'RIBERY', display: 'Franck Ribéry', nat: 'França', pos: 'Ponta', era: '2000–2021' },
  { answer: 'GIROUD', display: 'Olivier Giroud', nat: 'França', pos: 'Atacante', era: '2005–presente' },

  // Itália
  { answer: 'RIVA', display: 'Gigi Riva', nat: 'Itália', pos: 'Atacante', era: '1962–1976' },
  { answer: 'RIVERA', display: 'Gianni Rivera', nat: 'Itália', pos: 'Meia', era: '1959–1979' },
  { answer: 'VIERI', display: 'Christian Vieri', nat: 'Itália', pos: 'Atacante', era: '1991–2009' },
  { answer: 'INZAGHI', display: 'Filippo Inzaghi', nat: 'Itália', pos: 'Atacante', era: '1991–2012' },
  { answer: 'CHIELLINI', display: 'Giorgio Chiellini', nat: 'Itália', pos: 'Zagueiro', era: '2000–2023' },
  { answer: 'BONUCCI', display: 'Leonardo Bonucci', nat: 'Itália', pos: 'Zagueiro', era: '2005–2024' },

  // Inglaterra
  { answer: 'CHARLTON', display: 'Bobby Charlton', nat: 'Inglaterra', pos: 'Meia', era: '1956–1975' },
  { answer: 'MOORE', display: 'Bobby Moore', nat: 'Inglaterra', pos: 'Zagueiro', era: '1958–1977' },
  { answer: 'LINEKER', display: 'Gary Lineker', nat: 'Inglaterra', pos: 'Atacante', era: '1978–1994' },
  { answer: 'SCHOLES', display: 'Paul Scholes', nat: 'Inglaterra', pos: 'Meia', era: '1994–2013' },
  { answer: 'FERDINAND', display: 'Rio Ferdinand', nat: 'Inglaterra', pos: 'Zagueiro', era: '1995–2015' },
  { answer: 'SEAMAN', display: 'David Seaman', nat: 'Inglaterra', pos: 'Goleiro', era: '1982–2004' },
  { answer: 'STERLING', display: 'Raheem Sterling', nat: 'Inglaterra', pos: 'Ponta', era: '2012–presente' },

  // Alemanha
  { answer: 'GERDMULLER', display: 'Gerd Müller', nat: 'Alemanha', pos: 'Atacante', era: '1963–1981' },
  { answer: 'KLINSMANN', display: 'Jürgen Klinsmann', nat: 'Alemanha', pos: 'Atacante', era: '1981–1998' },
  { answer: 'SAMMER', display: 'Matthias Sammer', nat: 'Alemanha', pos: 'Zagueiro', era: '1985–1998' },
  { answer: 'SCHWEINSTEIGER', display: 'Bastian Schweinsteiger', nat: 'Alemanha', pos: 'Meia', era: '2002–2017' },
  { answer: 'OZIL', display: 'Mesut Özil', nat: 'Alemanha', pos: 'Meia', era: '2006–2023' },
  { answer: 'PODOLSKI', display: 'Lukas Podolski', nat: 'Alemanha', pos: 'Atacante', era: '2003–2021' },

  // Holanda
  { answer: 'NEESKENS', display: 'Johan Neeskens', nat: 'Holanda', pos: 'Meia', era: '1968–1984' },
  { answer: 'KROL', display: 'Ruud Krol', nat: 'Holanda', pos: 'Zagueiro', era: '1968–1987' },
  { answer: 'KOEMAN', display: 'Ronald Koeman', nat: 'Holanda', pos: 'Zagueiro', era: '1980–1997' },
  { answer: 'OVERMARS', display: 'Marc Overmars', nat: 'Holanda', pos: 'Ponta', era: '1990–2009' },
  { answer: 'KLUIVERT', display: 'Patrick Kluivert', nat: 'Holanda', pos: 'Atacante', era: '1994–2008' },
  { answer: 'STAM', display: 'Jaap Stam', nat: 'Holanda', pos: 'Zagueiro', era: '1992–2007' },

  // Portugal
  { answer: 'RUICOSTA', display: 'Rui Costa', nat: 'Portugal', pos: 'Meia', era: '1990–2008' },
  { answer: 'NANI', display: 'Nani', nat: 'Portugal', pos: 'Ponta', era: '2005–2023' },
  { answer: 'JOAOFELIX', display: 'João Félix', nat: 'Portugal', pos: 'Atacante', era: '2016–presente' },
  { answer: 'VITINHA', display: 'Vitinha', nat: 'Portugal', pos: 'Meia', era: '2018–presente' },

  // Croácia / Leste Europeu
  { answer: 'BOBAN', display: 'Zvonimir Boban', nat: 'Croácia', pos: 'Meia', era: '1985–2002' },
  { answer: 'PROSINECKI', display: 'Robert Prosinečki', nat: 'Croácia', pos: 'Meia', era: '1987–2004' },
  { answer: 'RAKITIC', display: 'Ivan Rakitić', nat: 'Croácia', pos: 'Meia', era: '2005–2024' },
  { answer: 'PANENKA', display: 'Antonín Panenka', nat: 'Tchecoslováquia', pos: 'Meia', era: '1967–1985' },

  // América do Sul
  { answer: 'CHILAVERT', display: 'José Luis Chilavert', nat: 'Paraguai', pos: 'Goleiro', era: '1989–2004' },
  { answer: 'CUBILLAS', display: 'Teófilo Cubillas', nat: 'Peru', pos: 'Meia', era: '1966–1989' },
  { answer: 'ZAMORANO', display: 'Iván Zamorano', nat: 'Chile', pos: 'Atacante', era: '1985–2003' },
  { answer: 'SALAS', display: 'Marcelo Salas', nat: 'Chile', pos: 'Atacante', era: '1993–2008' },
  { answer: 'ALEXIS', display: 'Alexis Sánchez', nat: 'Chile', pos: 'Atacante', era: '2005–presente' },
  { answer: 'VIDAL', display: 'Arturo Vidal', nat: 'Chile', pos: 'Meia', era: '2006–presente' },
  { answer: 'ASPRILLA', display: 'Faustino Asprilla', nat: 'Colômbia', pos: 'Atacante', era: '1988–2004' },
  { answer: 'RADAMEL', display: 'Radamel Falcao', nat: 'Colômbia', pos: 'Atacante', era: '2005–presente' },
  { answer: 'MARQUEZ', display: 'Rafa Márquez', nat: 'México', pos: 'Zagueiro', era: '1996–2018' },
  { answer: 'CHICHARITO', display: 'Javier Hernández', nat: 'México', pos: 'Atacante', era: '2006–presente' },

  // África e Ásia
  { answer: 'OKOCHA', display: 'Jay-Jay Okocha', nat: 'Nigéria', pos: 'Meia', era: '1990–2008' },
  { answer: 'KANU', display: 'Nwankwo Kanu', nat: 'Nigéria', pos: 'Atacante', era: '1993–2012' },
  { answer: 'MILLA', display: 'Roger Milla', nat: 'Camarões', pos: 'Atacante', era: '1970–1996' },
  { answer: 'MAHREZ', display: 'Riyad Mahrez', nat: 'Argélia', pos: 'Ponta', era: '2009–presente' },
  { answer: 'AUBAMEYANG', display: 'Pierre-Emerick Aubameyang', nat: 'Gabão', pos: 'Atacante', era: '2008–presente' },
  { answer: 'PARKJISUNG', display: 'Park Ji-sung', nat: 'Coreia do Sul', pos: 'Meia', era: '2000–2014' },
  { answer: 'SON', display: 'Son Heung-min', nat: 'Coreia do Sul', pos: 'Atacante', era: '2010–presente' },
  { answer: 'NAKATA', display: 'Hidetoshi Nakata', nat: 'Japão', pos: 'Meia', era: '1995–2006' },

  // ===== Expansão da base =====
  // Brasil
  { answer: 'ZAGALLO', display: 'Mário Zagallo', nat: 'Brasil', pos: 'Ponta', era: '1950–1965' },
  { answer: 'DJALMASANTOS', display: 'Djalma Santos', nat: 'Brasil', pos: 'Lateral', era: '1948–1970' },
  { answer: 'NILTONSANTOS', display: 'Nílton Santos', nat: 'Brasil', pos: 'Lateral', era: '1948–1964' },
  { answer: 'GERSON', display: 'Gérson', nat: 'Brasil', pos: 'Meia', era: '1959–1972' },
  { answer: 'CEREZO', display: 'Toninho Cerezo', nat: 'Brasil', pos: 'Meia', era: '1972–1994' },
  { answer: 'RAI', display: 'Raí', nat: 'Brasil', pos: 'Meia', era: '1985–2000' },
  { answer: 'DUNGA', display: 'Dunga', nat: 'Brasil', pos: 'Meia', era: '1983–2000' },
  { answer: 'ALDAIR', display: 'Aldair', nat: 'Brasil', pos: 'Zagueiro', era: '1985–2005' },
  { answer: 'LEONARDO', display: 'Leonardo', nat: 'Brasil', pos: 'Meia', era: '1987–2003' },
  { answer: 'EDMUNDO', display: 'Edmundo', nat: 'Brasil', pos: 'Atacante', era: '1992–2008' },
  { answer: 'ZEROBERTO', display: 'Zé Roberto', nat: 'Brasil', pos: 'Meia', era: '1991–2017' },
  { answer: 'JUNINHO', display: 'Juninho Pernambucano', nat: 'Brasil', pos: 'Meia', era: '1993–2013' },
  { answer: 'GILBERTOSILVA', display: 'Gilberto Silva', nat: 'Brasil', pos: 'Meia', era: '1997–2013' },
  { answer: 'EMERSON', display: 'Emerson', nat: 'Brasil', pos: 'Meia', era: '1994–2010' },
  { answer: 'DANIALVES', display: 'Dani Alves', nat: 'Brasil', pos: 'Lateral', era: '2001–2022' },
  { answer: 'ROBINHO', display: 'Robinho', nat: 'Brasil', pos: 'Atacante', era: '2002–2020' },
  { answer: 'PATO', display: 'Alexandre Pato', nat: 'Brasil', pos: 'Atacante', era: '2006–2023' },
  { answer: 'GANSO', display: 'Paulo Henrique Ganso', nat: 'Brasil', pos: 'Meia', era: '2008–presente' },
  { answer: 'OSCAR', display: 'Oscar', nat: 'Brasil', pos: 'Meia', era: '2008–presente' },
  { answer: 'WILLIAN', display: 'Willian', nat: 'Brasil', pos: 'Ponta', era: '2006–presente' },
  { answer: 'LUCASMOURA', display: 'Lucas Moura', nat: 'Brasil', pos: 'Ponta', era: '2007–presente' },
  { answer: 'RODRYGO', display: 'Rodrygo', nat: 'Brasil', pos: 'Atacante', era: '2017–presente' },

  // Argentina
  { answer: 'DISTEFANO', display: 'Alfredo Di Stéfano', nat: 'Argentina', pos: 'Atacante', era: '1945–1966' },
  { answer: 'FILLOL', display: 'Ubaldo Fillol', nat: 'Argentina', pos: 'Goleiro', era: '1969–1991' },
  { answer: 'ARDILES', display: 'Osvaldo Ardiles', nat: 'Argentina', pos: 'Meia', era: '1975–1991' },
  { answer: 'CAMBIASSO', display: 'Esteban Cambiasso', nat: 'Argentina', pos: 'Meia', era: '1998–2017' },
  { answer: 'ZABALETA', display: 'Pablo Zabaleta', nat: 'Argentina', pos: 'Lateral', era: '2001–2020' },
  { answer: 'OTAMENDI', display: 'Nicolás Otamendi', nat: 'Argentina', pos: 'Zagueiro', era: '2007–presente' },
  { answer: 'DYBALA', display: 'Paulo Dybala', nat: 'Argentina', pos: 'Atacante', era: '2011–presente' },

  // Uruguai / Chile / Colômbia / Peru / México
  { answer: 'BRAVO', display: 'Claudio Bravo', nat: 'Chile', pos: 'Goleiro', era: '2002–presente' },
  { answer: 'CUADRADO', display: 'Juan Cuadrado', nat: 'Colômbia', pos: 'Ponta', era: '2008–presente' },
  { answer: 'GUERRERO', display: 'Paolo Guerrero', nat: 'Peru', pos: 'Atacante', era: '2002–presente' },
  { answer: 'BLANCO', display: 'Cuauhtémoc Blanco', nat: 'México', pos: 'Atacante', era: '1992–2016' },
  { answer: 'OCHOA', display: 'Guillermo Ochoa', nat: 'México', pos: 'Goleiro', era: '2004–presente' },

  // Inglaterra
  { answer: 'SHILTON', display: 'Peter Shilton', nat: 'Inglaterra', pos: 'Goleiro', era: '1966–1997' },
  { answer: 'GASCOIGNE', display: 'Paul Gascoigne', nat: 'Inglaterra', pos: 'Meia', era: '1985–2004' },
  { answer: 'ASHLEYCOLE', display: 'Ashley Cole', nat: 'Inglaterra', pos: 'Lateral', era: '1998–2019' },
  { answer: 'FODEN', display: 'Phil Foden', nat: 'Inglaterra', pos: 'Meia', era: '2017–presente' },
  { answer: 'PALMER', display: 'Cole Palmer', nat: 'Inglaterra', pos: 'Meia', era: '2020–presente' },

  // França
  { answer: 'BARTHEZ', display: 'Fabien Barthez', nat: 'França', pos: 'Goleiro', era: '1990–2007' },
  { answer: 'DESAILLY', display: 'Marcel Desailly', nat: 'França', pos: 'Zagueiro', era: '1986–2006' },
  { answer: 'LIZARAZU', display: 'Bixente Lizarazu', nat: 'França', pos: 'Lateral', era: '1988–2006' },
  { answer: 'PETIT', display: 'Emmanuel Petit', nat: 'França', pos: 'Meia', era: '1989–2005' },
  { answer: 'MAKELELE', display: 'Claude Makélélé', nat: 'França', pos: 'Meia', era: '1991–2011' },
  { answer: 'LLORIS', display: 'Hugo Lloris', nat: 'França', pos: 'Goleiro', era: '2005–presente' },
  { answer: 'VARANE', display: 'Raphaël Varane', nat: 'França', pos: 'Zagueiro', era: '2010–2024' },
  { answer: 'THEO', display: 'Theo Hernández', nat: 'França', pos: 'Lateral', era: '2016–presente' },

  // Itália
  { answer: 'SCIREA', display: 'Gaetano Scirea', nat: 'Itália', pos: 'Zagueiro', era: '1972–1988' },
  { answer: 'TARDELLI', display: 'Marco Tardelli', nat: 'Itália', pos: 'Meia', era: '1972–1988' },
  { answer: 'SCHILLACI', display: 'Salvatore Schillaci', nat: 'Itália', pos: 'Atacante', era: '1982–1999' },
  { answer: 'ZAMBROTTA', display: 'Gianluca Zambrotta', nat: 'Itália', pos: 'Lateral', era: '1997–2014' },
  { answer: 'MATERAZZI', display: 'Marco Materazzi', nat: 'Itália', pos: 'Zagueiro', era: '1995–2011' },
  { answer: 'VERRATTI', display: 'Marco Verratti', nat: 'Itália', pos: 'Meia', era: '2010–presente' },
  { answer: 'DONNARUMMA', display: 'Gianluigi Donnarumma', nat: 'Itália', pos: 'Goleiro', era: '2015–presente' },
  { answer: 'CHIESA', display: 'Federico Chiesa', nat: 'Itália', pos: 'Ponta', era: '2016–presente' },

  // Alemanha
  { answer: 'SEELER', display: 'Uwe Seeler', nat: 'Alemanha', pos: 'Atacante', era: '1953–1972' },
  { answer: 'BREITNER', display: 'Paul Breitner', nat: 'Alemanha', pos: 'Meia', era: '1970–1983' },
  { answer: 'VOLLER', display: 'Rudi Völler', nat: 'Alemanha', pos: 'Atacante', era: '1977–1996' },
  { answer: 'BIERHOFF', display: 'Oliver Bierhoff', nat: 'Alemanha', pos: 'Atacante', era: '1986–2003' },
  { answer: 'GOTZE', display: 'Mario Götze', nat: 'Alemanha', pos: 'Meia', era: '2009–presente' },
  { answer: 'REUS', display: 'Marco Reus', nat: 'Alemanha', pos: 'Meia', era: '2006–presente' },
  { answer: 'HUMMELS', display: 'Mats Hummels', nat: 'Alemanha', pos: 'Zagueiro', era: '2006–presente' },
  { answer: 'GUNDOGAN', display: 'İlkay Gündoğan', nat: 'Alemanha', pos: 'Meia', era: '2009–presente' },
  { answer: 'SANE', display: 'Leroy Sané', nat: 'Alemanha', pos: 'Ponta', era: '2013–presente' },

  // Holanda
  { answer: 'VANPERSIE', display: 'Robin van Persie', nat: 'Holanda', pos: 'Atacante', era: '2001–2019' },
  { answer: 'WIJNALDUM', display: 'Georginio Wijnaldum', nat: 'Holanda', pos: 'Meia', era: '2007–presente' },

  // Portugal
  { answer: 'PAULETA', display: 'Pedro Pauleta', nat: 'Portugal', pos: 'Atacante', era: '1996–2008' },
  { answer: 'QUARESMA', display: 'Ricardo Quaresma', nat: 'Portugal', pos: 'Ponta', era: '2002–2023' },
  { answer: 'CARVALHO', display: 'Ricardo Carvalho', nat: 'Portugal', pos: 'Zagueiro', era: '1997–2018' },
  { answer: 'MOUTINHO', display: 'João Moutinho', nat: 'Portugal', pos: 'Meia', era: '2004–2024' },
  { answer: 'RUIPATRICIO', display: 'Rui Patrício', nat: 'Portugal', pos: 'Goleiro', era: '2006–presente' },

  // Espanha
  { answer: 'BUTRAGUENO', display: 'Emilio Butragueño', nat: 'Espanha', pos: 'Atacante', era: '1983–1998' },
  { answer: 'GUARDIOLA', display: 'Pep Guardiola', nat: 'Espanha', pos: 'Meia', era: '1990–2006' },
  { answer: 'LUISENRIQUE', display: 'Luis Enrique', nat: 'Espanha', pos: 'Meia', era: '1989–2004' },
  { answer: 'VALDES', display: 'Víctor Valdés', nat: 'Espanha', pos: 'Goleiro', era: '2002–2017' },
  { answer: 'PIQUE', display: 'Gerard Piqué', nat: 'Espanha', pos: 'Zagueiro', era: '2004–2022' },
  { answer: 'JORDIALBA', display: 'Jordi Alba', nat: 'Espanha', pos: 'Lateral', era: '2007–presente' },
  { answer: 'ISCO', display: 'Isco', nat: 'Espanha', pos: 'Meia', era: '2010–presente' },
  { answer: 'MORATA', display: 'Álvaro Morata', nat: 'Espanha', pos: 'Atacante', era: '2010–presente' },

  // África
  { answer: 'YEKINI', display: 'Rashidi Yekini', nat: 'Nigéria', pos: 'Atacante', era: '1984–2005' },
  { answer: 'OSIMHEN', display: 'Victor Osimhen', nat: 'Nigéria', pos: 'Atacante', era: '2015–presente' },
  { answer: 'YAYATOURE', display: 'Yaya Touré', nat: 'Costa do Marfim', pos: 'Meia', era: '2001–2018' },
  { answer: 'ABEDIPELE', display: 'Abedi Pelé', nat: 'Gana', pos: 'Meia', era: '1978–2000' },
  { answer: 'ESSIEN', display: 'Michael Essien', nat: 'Gana', pos: 'Meia', era: '2000–2020' },
  { answer: 'GYAN', display: 'Asamoah Gyan', nat: 'Gana', pos: 'Atacante', era: '2003–2021' },
  { answer: 'DIOUF', display: 'El Hadji Diouf', nat: 'Senegal', pos: 'Atacante', era: '1999–2015' },
  { answer: 'KANOUTE', display: 'Frédéric Kanouté', nat: 'Mali', pos: 'Atacante', era: '1997–2012' },

  // Leste Europeu / Bálcãs
  { answer: 'BONIEK', display: 'Zbigniew Boniek', nat: 'Polônia', pos: 'Meia', era: '1975–1990' },
  { answer: 'LATO', display: 'Grzegorz Lato', nat: 'Polônia', pos: 'Ponta', era: '1971–1987' },
  { answer: 'BLOKHIN', display: 'Oleh Blokhin', nat: 'União Soviética', pos: 'Atacante', era: '1969–1990' },
  { answer: 'DASAEV', display: 'Rinat Dasaev', nat: 'União Soviética', pos: 'Goleiro', era: '1977–1990' },
  { answer: 'STOJKOVIC', display: 'Dragan Stojković', nat: 'Sérvia', pos: 'Meia', era: '1981–2001' },
  { answer: 'MIHAJLOVIC', display: 'Siniša Mihajlović', nat: 'Sérvia', pos: 'Zagueiro', era: '1990–2006' },
  { answer: 'DZEKO', display: 'Edin Džeko', nat: 'Bósnia', pos: 'Atacante', era: '2003–presente' },
  { answer: 'KVARATSKHELIA', display: 'Khvicha Kvaratskhelia', nat: 'Geórgia', pos: 'Ponta', era: '2017–presente' },
  { answer: 'VLAHOVIC', display: 'Dušan Vlahović', nat: 'Sérvia', pos: 'Atacante', era: '2016–presente' },

  // Escandinávia
  { answer: 'LARSSON', display: 'Henrik Larsson', nat: 'Suécia', pos: 'Atacante', era: '1992–2009' },
  { answer: 'SCHMEICHEL', display: 'Peter Schmeichel', nat: 'Dinamarca', pos: 'Goleiro', era: '1981–2003' },
  { answer: 'ERIKSEN', display: 'Christian Eriksen', nat: 'Dinamarca', pos: 'Meia', era: '2008–presente' },
  { answer: 'ODEGAARD', display: 'Martin Ødegaard', nat: 'Noruega', pos: 'Meia', era: '2014–presente' },

  // Bélgica / Ilhas Britânicas
  { answer: 'KOMPANY', display: 'Vincent Kompany', nat: 'Bélgica', pos: 'Zagueiro', era: '2003–2019' },
  { answer: 'BEST', display: 'George Best', nat: 'Irlanda do Norte', pos: 'Ponta', era: '1963–1984' },
  { answer: 'KEANE', display: 'Roy Keane', nat: 'Irlanda', pos: 'Meia', era: '1990–2006' },
  { answer: 'GIGGS', display: 'Ryan Giggs', nat: 'País de Gales', pos: 'Ponta', era: '1990–2014' },
  { answer: 'RUSH', display: 'Ian Rush', nat: 'País de Gales', pos: 'Atacante', era: '1980–1998' },
  { answer: 'DALGLISH', display: 'Kenny Dalglish', nat: 'Escócia', pos: 'Atacante', era: '1970–1990' },
]
