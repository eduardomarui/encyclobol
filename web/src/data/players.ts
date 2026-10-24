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
  { answer: 'PELE', display: 'Pelé', nat: 'Brasil', pos: 'Atacante', era: '1956–1977' },
  { answer: 'ZICO', display: 'Zico', nat: 'Brasil', pos: 'Meia', era: '1971–1994' },
  { answer: 'CAFU', display: 'Cafu', nat: 'Brasil', pos: 'Lateral', era: '1989–2008' },
  { answer: 'KAKA', display: 'Kaká', nat: 'Brasil', pos: 'Meia', era: '2001–2017' },
  { answer: 'FIGO', display: 'Luís Figo', nat: 'Portugal', pos: 'Ponta', era: '1990–2009' },
  { answer: 'MESSI', display: 'Lionel Messi', nat: 'Argentina', pos: 'Atacante', era: '2004–presente' },
  { answer: 'TOTTI', display: 'Francesco Totti', nat: 'Itália', pos: 'Atacante', era: '1993–2017' },
  { answer: 'PIRLO', display: 'Andrea Pirlo', nat: 'Itália', pos: 'Meia', era: '1995–2017' },
  { answer: 'HENRY', display: 'Thierry Henry', nat: 'França', pos: 'Atacante', era: '1994–2014' },
  { answer: 'KLOSE', display: 'Miroslav Klose', nat: 'Alemanha', pos: 'Atacante', era: '1999–2016' },
  { answer: 'CRUYFF', display: 'Johan Cruyff', nat: 'Holanda', pos: 'Atacante', era: '1964–1984' },
  { answer: 'GULLIT', display: 'Ruud Gullit', nat: 'Holanda', pos: 'Meia', era: '1979–1998' },
  { answer: 'ROBBEN', display: 'Arjen Robben', nat: 'Holanda', pos: 'Ponta', era: '2000–2021' },
  { answer: 'NEYMAR', display: 'Neymar', nat: 'Brasil', pos: 'Atacante', era: '2009–presente' },
  { answer: 'MBAPPE', display: 'Kylian Mbappé', nat: 'França', pos: 'Atacante', era: '2015–presente' },
  { answer: 'FORLAN', display: 'Diego Forlán', nat: 'Uruguai', pos: 'Atacante', era: '1998–2018' },
  { answer: 'KEMPES', display: 'Mario Kempes', nat: 'Argentina', pos: 'Atacante', era: '1973–1996' },
  { answer: 'BARESI', display: 'Franco Baresi', nat: 'Itália', pos: 'Zagueiro', era: '1978–1997' },
  { answer: 'BUFFON', display: 'Gianluigi Buffon', nat: 'Itália', pos: 'Goleiro', era: '1995–2023' },
  { answer: 'FIGUEROA', display: 'Elías Figueroa', nat: 'Chile', pos: 'Zagueiro', era: '1964–1982' },
  { answer: 'EUSEBIO', display: 'Eusébio', nat: 'Portugal', pos: 'Atacante', era: '1957–1979' },
  { answer: 'ROMARIO', display: 'Romário', nat: 'Brasil', pos: 'Atacante', era: '1985–2007' },
  { answer: 'RIVALDO', display: 'Rivaldo', nat: 'Brasil', pos: 'Meia', era: '1991–2015' },
  { answer: 'RONALDO', display: 'Ronaldo', nat: 'Brasil', pos: 'Atacante', era: '1993–2011' },
  { answer: 'ZIDANE', display: 'Zinédine Zidane', nat: 'França', pos: 'Meia', era: '1989–2006' },
  { answer: 'PLATINI', display: 'Michel Platini', nat: 'França', pos: 'Meia', era: '1973–1987' },
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
  { answer: 'TAFFAREL', display: 'Cláudio Taffarel', nat: 'Brasil', pos: 'Goleiro', era: '1985–2003' },
  { answer: 'CASILLAS', display: 'Iker Casillas', nat: 'Espanha', pos: 'Goleiro', era: '1999–2019' },
  { answer: 'NEUER', display: 'Manuel Neuer', nat: 'Alemanha', pos: 'Goleiro', era: '2006–presente' },

  // Laterais
  { answer: 'ROBERTOCARLOS', display: 'Roberto Carlos', nat: 'Brasil', pos: 'Lateral', era: '1991–2015' },
  { answer: 'MAICON', display: 'Maicon', nat: 'Brasil', pos: 'Lateral', era: '2001–2021' },
  { answer: 'LAHM', display: 'Philipp Lahm', nat: 'Alemanha', pos: 'Lateral', era: '2002–2017' },
  { answer: 'ZANETTI', display: 'Javier Zanetti', nat: 'Argentina', pos: 'Lateral', era: '1992–2014' },
  { answer: 'FACCHETTI', display: 'Giacinto Facchetti', nat: 'Itália', pos: 'Lateral', era: '1961–1978' },

  // Zagueiros
  { answer: 'NESTA', display: 'Alessandro Nesta', nat: 'Itália', pos: 'Zagueiro', era: '1993–2014' },
  { answer: 'CANNAVARO', display: 'Fabio Cannavaro', nat: 'Itália', pos: 'Zagueiro', era: '1993–2011' },
  { answer: 'PUYOL', display: 'Carles Puyol', nat: 'Espanha', pos: 'Zagueiro', era: '1999–2014' },
  { answer: 'RAMOS', display: 'Sergio Ramos', nat: 'Espanha', pos: 'Zagueiro', era: '2004–presente' },
  { answer: 'LUCIO', display: 'Lúcio', nat: 'Brasil', pos: 'Zagueiro', era: '1997–2019' },

  // === Expansão: mais seleções e clubes ===

  // Brasil
  { answer: 'SOCRATES', display: 'Sócrates', nat: 'Brasil', pos: 'Meia', era: '1974–1989' },
  { answer: 'FALCAO', display: 'Falcão', nat: 'Brasil', pos: 'Meia', era: '1972–1986' },
  { answer: 'BEBETO', display: 'Bebeto', nat: 'Brasil', pos: 'Atacante', era: '1983–2002' },
  { answer: 'ADRIANO', display: 'Adriano', nat: 'Brasil', pos: 'Atacante', era: '2000–2016' },
  { answer: 'DIDA', display: 'Dida', nat: 'Brasil', pos: 'Goleiro', era: '1990–2015' },
  { answer: 'ALISSON', display: 'Alisson', nat: 'Brasil', pos: 'Goleiro', era: '2013–presente' },
  { answer: 'COUTINHO', display: 'Philippe Coutinho', nat: 'Brasil', pos: 'Meia', era: '2009–presente' },

  // Argentina
  { answer: 'RIQUELME', display: 'Juan Román Riquelme', nat: 'Argentina', pos: 'Meia', era: '1996–2014' },
  { answer: 'TEVEZ', display: 'Carlos Tévez', nat: 'Argentina', pos: 'Atacante', era: '2001–2021' },
  { answer: 'CRESPO', display: 'Hernán Crespo', nat: 'Argentina', pos: 'Atacante', era: '1993–2012' },
  { answer: 'VERON', display: 'Juan Sebastián Verón', nat: 'Argentina', pos: 'Meia', era: '1994–2017' },
  { answer: 'DIMARIA', display: 'Ángel Di María', nat: 'Argentina', pos: 'Ponta', era: '2005–presente' },
  { answer: 'AGUERO', display: 'Sergio Agüero', nat: 'Argentina', pos: 'Atacante', era: '2003–2021' },
  { answer: 'PALERMO', display: 'Martín Palermo', nat: 'Argentina', pos: 'Atacante', era: '1992–2011' },

  // Uruguai
  { answer: 'SUAREZ', display: 'Luis Suárez', nat: 'Uruguai', pos: 'Atacante', era: '2005–presente' },
  { answer: 'CAVANI', display: 'Edinson Cavani', nat: 'Uruguai', pos: 'Atacante', era: '2006–presente' },
  { answer: 'FRANCESCOLI', display: 'Enzo Francescoli', nat: 'Uruguai', pos: 'Meia', era: '1982–1997' },

  // Inglaterra
  { answer: 'ROONEY', display: 'Wayne Rooney', nat: 'Inglaterra', pos: 'Atacante', era: '2002–2021' },
  { answer: 'LAMPARD', display: 'Frank Lampard', nat: 'Inglaterra', pos: 'Meia', era: '1995–2016' },
  { answer: 'TERRY', display: 'John Terry', nat: 'Inglaterra', pos: 'Zagueiro', era: '1998–2018' },
  { answer: 'SHEARER', display: 'Alan Shearer', nat: 'Inglaterra', pos: 'Atacante', era: '1988–2006' },
  { answer: 'OWEN', display: 'Michael Owen', nat: 'Inglaterra', pos: 'Atacante', era: '1997–2013' },

  // Espanha
  { answer: 'TORRES', display: 'Fernando Torres', nat: 'Espanha', pos: 'Atacante', era: '2001–2019' },
  { answer: 'XAVI', display: 'Xavi', nat: 'Espanha', pos: 'Meia', era: '1998–2019' },
  { answer: 'INIESTA', display: 'Andrés Iniesta', nat: 'Espanha', pos: 'Meia', era: '2002–2024' },
  { answer: 'RAUL', display: 'Raúl', nat: 'Espanha', pos: 'Atacante', era: '1994–2015' },
  { answer: 'ALONSO', display: 'Xabi Alonso', nat: 'Espanha', pos: 'Meia', era: '1999–2017' },

  // França
  { answer: 'VIEIRA', display: 'Patrick Vieira', nat: 'França', pos: 'Meia', era: '1993–2011' },
  { answer: 'CANTONA', display: 'Eric Cantona', nat: 'França', pos: 'Atacante', era: '1983–1997' },
  { answer: 'PIRES', display: 'Robert Pirès', nat: 'França', pos: 'Meia', era: '1993–2014' },
  { answer: 'TREZEGUET', display: 'David Trezeguet', nat: 'França', pos: 'Atacante', era: '1994–2014' },
  { answer: 'GRIEZMANN', display: 'Antoine Griezmann', nat: 'França', pos: 'Atacante', era: '2009–presente' },
  { answer: 'POGBA', display: 'Paul Pogba', nat: 'França', pos: 'Meia', era: '2011–presente' },

  // Holanda
  { answer: 'VANBASTEN', display: 'Marco van Basten', nat: 'Holanda', pos: 'Atacante', era: '1982–1993' },
  { answer: 'RIJKAARD', display: 'Frank Rijkaard', nat: 'Holanda', pos: 'Meia', era: '1980–1995' },
  { answer: 'DAVIDS', display: 'Edgar Davids', nat: 'Holanda', pos: 'Meia', era: '1991–2014' },
  { answer: 'VANNISTELROOY', display: 'Ruud van Nistelrooy', nat: 'Holanda', pos: 'Atacante', era: '1993–2012' },
  { answer: 'VANDERSAR', display: 'Edwin van der Sar', nat: 'Holanda', pos: 'Goleiro', era: '1990–2011' },
  { answer: 'SNEIJDER', display: 'Wesley Sneijder', nat: 'Holanda', pos: 'Meia', era: '2003–2019' },
  { answer: 'SEEDORF', display: 'Clarence Seedorf', nat: 'Holanda', pos: 'Meia', era: '1992–2013' },

  // Alemanha
  { answer: 'MATTHAUS', display: 'Lothar Matthäus', nat: 'Alemanha', pos: 'Meia', era: '1979–2000' },
  { answer: 'BALLACK', display: 'Michael Ballack', nat: 'Alemanha', pos: 'Meia', era: '1995–2012' },
  { answer: 'KAHN', display: 'Oliver Kahn', nat: 'Alemanha', pos: 'Goleiro', era: '1987–2008' },
  { answer: 'THOMASMULLER', display: 'Thomas Müller', nat: 'Alemanha', pos: 'Atacante', era: '2008–presente' },
  { answer: 'RUMMENIGGE', display: 'Karl-Heinz Rummenigge', nat: 'Alemanha', pos: 'Atacante', era: '1974–1989' },

  // Itália
  { answer: 'BAGGIO', display: 'Roberto Baggio', nat: 'Itália', pos: 'Atacante', era: '1983–2004' },
  { answer: 'DELPIERO', display: 'Alessandro Del Piero', nat: 'Itália', pos: 'Atacante', era: '1992–2014' },
  { answer: 'ROSSI', display: 'Paolo Rossi', nat: 'Itália', pos: 'Atacante', era: '1973–1987' },
  { answer: 'ZOFF', display: 'Dino Zoff', nat: 'Itália', pos: 'Goleiro', era: '1961–1983' },
  { answer: 'GATTUSO', display: 'Gennaro Gattuso', nat: 'Itália', pos: 'Meia', era: '1995–2013' },

  // Portugal
  { answer: 'DECO', display: 'Deco', nat: 'Portugal', pos: 'Meia', era: '1997–2013' },
  { answer: 'PEPE', display: 'Pepe', nat: 'Portugal', pos: 'Zagueiro', era: '2001–2024' },

  // Croácia / Leste Europeu
  { answer: 'MODRIC', display: 'Luka Modrić', nat: 'Croácia', pos: 'Meia', era: '2003–presente' },
  { answer: 'SUKER', display: 'Davor Šuker', nat: 'Croácia', pos: 'Atacante', era: '1984–2003' },
  { answer: 'HAGI', display: 'Gheorghe Hagi', nat: 'Romênia', pos: 'Meia', era: '1982–2001' },
  { answer: 'STOICHKOV', display: 'Hristo Stoichkov', nat: 'Bulgária', pos: 'Atacante', era: '1981–2003' },
  { answer: 'SHEVCHENKO', display: 'Andriy Shevchenko', nat: 'Ucrânia', pos: 'Atacante', era: '1994–2012' },
  { answer: 'NEDVED', display: 'Pavel Nedvěd', nat: 'Rep. Tcheca', pos: 'Meia', era: '1991–2009' },

  // Bélgica
  { answer: 'HAZARD', display: 'Eden Hazard', nat: 'Bélgica', pos: 'Ponta', era: '2007–2023' },
  { answer: 'DEBRUYNE', display: 'Kevin De Bruyne', nat: 'Bélgica', pos: 'Meia', era: '2009–presente' },

  // Norte / Leste
  { answer: 'LEWANDOWSKI', display: 'Robert Lewandowski', nat: 'Polônia', pos: 'Atacante', era: '2006–presente' },
  { answer: 'IBRAHIMOVIC', display: 'Zlatan Ibrahimović', nat: 'Suécia', pos: 'Atacante', era: '1999–2023' },
  { answer: 'LAUDRUP', display: 'Michael Laudrup', nat: 'Dinamarca', pos: 'Meia', era: '1981–1998' },

  // África
  { answer: 'WEAH', display: 'George Weah', nat: 'Libéria', pos: 'Atacante', era: '1981–2003' },
  { answer: 'DROGBA', display: 'Didier Drogba', nat: 'Costa do Marfim', pos: 'Atacante', era: '1998–2018' },
  { answer: 'ETOO', display: "Samuel Eto'o", nat: 'Camarões', pos: 'Atacante', era: '1997–2019' },
  { answer: 'SALAH', display: 'Mohamed Salah', nat: 'Egito', pos: 'Ponta', era: '2010–presente' },
  { answer: 'MANE', display: 'Sadio Mané', nat: 'Senegal', pos: 'Ponta', era: '2011–presente' },

  // Demais
  { answer: 'VALDERRAMA', display: 'Carlos Valderrama', nat: 'Colômbia', pos: 'Meia', era: '1981–2002' },
  { answer: 'JAMES', display: 'James Rodríguez', nat: 'Colômbia', pos: 'Meia', era: '2006–presente' },
  { answer: 'HUGOSANCHEZ', display: 'Hugo Sánchez', nat: 'México', pos: 'Atacante', era: '1976–1997' },
  { answer: 'BALE', display: 'Gareth Bale', nat: 'País de Gales', pos: 'Ponta', era: '2006–2022' },

  // Geração atual
  { answer: 'BENZEMA', display: 'Karim Benzema', nat: 'França', pos: 'Atacante', era: '2005–presente' },
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
  { answer: 'ENZO', display: 'Enzo Fernández', nat: 'Argentina', pos: 'Meia', era: '2020–presente' },
  { answer: 'MACALLISTER', display: 'Alexis Mac Allister', nat: 'Argentina', pos: 'Meia', era: '2016–presente' },
  { answer: 'DIBU', display: 'Emiliano Martínez', nat: 'Argentina', pos: 'Goleiro', era: '2012–presente' },
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
  { answer: 'RAFAELLEAO', display: 'Rafael Leão', nat: 'Portugal', pos: 'Ponta', era: '2017–presente' },

  // Espanha
  { answer: 'PEDRI', display: 'Pedri', nat: 'Espanha', pos: 'Meia', era: '2019–presente' },
  { answer: 'GAVI', display: 'Gavi', nat: 'Espanha', pos: 'Meia', era: '2021–presente' },
  { answer: 'RODRI', display: 'Rodri', nat: 'Espanha', pos: 'Meia', era: '2015–presente' },
  { answer: 'YAMAL', display: 'Lamine Yamal', nat: 'Espanha', pos: 'Ponta', era: '2023–presente' },
  { answer: 'NICOWILLIAMS', display: 'Nico Williams', nat: 'Espanha', pos: 'Ponta', era: '2021–presente' },

  // Alemanha
  { answer: 'MUSIALA', display: 'Jamal Musiala', nat: 'Alemanha', pos: 'Meia', era: '2020–presente' },
  { answer: 'WIRTZ', display: 'Florian Wirtz', nat: 'Alemanha', pos: 'Meia', era: '2020–presente' },
  { answer: 'KIMMICH', display: 'Joshua Kimmich', nat: 'Alemanha', pos: 'Meia', era: '2013–presente' },

  // Holanda
  { answer: 'VANDIJK', display: 'Virgil van Dijk', nat: 'Holanda', pos: 'Zagueiro', era: '2011–presente' },
  { answer: 'DEJONG', display: 'Frenkie de Jong', nat: 'Holanda', pos: 'Meia', era: '2015–presente' },
  { answer: 'GAKPO', display: 'Cody Gakpo', nat: 'Holanda', pos: 'Atacante', era: '2018–presente' },
  { answer: 'DEPAY', display: 'Memphis Depay', nat: 'Holanda', pos: 'Atacante', era: '2011–presente' },

  // Bélgica
  { answer: 'LUKAKU', display: 'Romelu Lukaku', nat: 'Bélgica', pos: 'Atacante', era: '2009–presente' },
  { answer: 'COURTOIS', display: 'Thibaut Courtois', nat: 'Bélgica', pos: 'Goleiro', era: '2009–presente' },

  // Uruguai
  { answer: 'VALVERDE', display: 'Federico Valverde', nat: 'Uruguai', pos: 'Meia', era: '2015–presente' },
  { answer: 'NUNEZ', display: 'Darwin Núñez', nat: 'Uruguai', pos: 'Atacante', era: '2017–presente' },

  // Marrocos
  { answer: 'HAKIMI', display: 'Achraf Hakimi', nat: 'Marrocos', pos: 'Lateral', era: '2017–presente' },

  // === Expansão 2: mais lendas e craques atuais ===

  // Brasil
  { answer: 'DIDI', display: 'Didi', nat: 'Brasil', pos: 'Meia', era: '1947–1966' },
  { answer: 'VAVA', display: 'Vavá', nat: 'Brasil', pos: 'Atacante', era: '1949–1969' },
  { answer: 'TOSTAO', display: 'Tostão', nat: 'Brasil', pos: 'Atacante', era: '1962–1973' },
  { answer: 'RIVELINO', display: 'Rivelino', nat: 'Brasil', pos: 'Meia', era: '1965–1981' },
  { answer: 'JAIRZINHO', display: 'Jairzinho', nat: 'Brasil', pos: 'Ponta', era: '1960–1982' },
  { answer: 'CARLOSALBERTO', display: 'Carlos Alberto Torres', nat: 'Brasil', pos: 'Lateral', era: '1963–1982' },
  { answer: 'JUNIOR', display: 'Júnior', nat: 'Brasil', pos: 'Lateral', era: '1974–1993' },
  { answer: 'CARECA', display: 'Careca', nat: 'Brasil', pos: 'Atacante', era: '1978–1999' },
  { answer: 'THIAGOSILVA', display: 'Thiago Silva', nat: 'Brasil', pos: 'Zagueiro', era: '2002–presente' },
  { answer: 'DAVIDLUIZ', display: 'David Luiz', nat: 'Brasil', pos: 'Zagueiro', era: '2006–presente' },
  { answer: 'MARCELO', display: 'Marcelo', nat: 'Brasil', pos: 'Lateral', era: '2005–2024' },
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
  { answer: 'HIGUAIN', display: 'Gonzalo Higuaín', nat: 'Argentina', pos: 'Atacante', era: '2005–2022' },
  { answer: 'MASCHERANO', display: 'Javier Mascherano', nat: 'Argentina', pos: 'Meia', era: '2003–2020' },

  // Uruguai
  { answer: 'RECOBA', display: 'Álvaro Recoba', nat: 'Uruguai', pos: 'Meia', era: '1994–2015' },
  { answer: 'GODIN', display: 'Diego Godín', nat: 'Uruguai', pos: 'Zagueiro', era: '2003–2023' },

  // Espanha
  { answer: 'DAVIDVILLA', display: 'David Villa', nat: 'Espanha', pos: 'Atacante', era: '2000–2020' },
  { answer: 'FABREGAS', display: 'Cesc Fàbregas', nat: 'Espanha', pos: 'Meia', era: '2003–2023' },
  { answer: 'DAVIDSILVA', display: 'David Silva', nat: 'Espanha', pos: 'Meia', era: '2004–2023' },
  { answer: 'BUSQUETS', display: 'Sergio Busquets', nat: 'Espanha', pos: 'Meia', era: '2008–2025' },
  { answer: 'HIERRO', display: 'Fernando Hierro', nat: 'Espanha', pos: 'Zagueiro', era: '1987–2005' },
  { answer: 'MORIENTES', display: 'Fernando Morientes', nat: 'Espanha', pos: 'Atacante', era: '1993–2010' },

  // França
  { answer: 'FONTAINE', display: 'Just Fontaine', nat: 'França', pos: 'Atacante', era: '1953–1962' },
  { answer: 'THURAM', display: 'Lilian Thuram', nat: 'França', pos: 'Zagueiro', era: '1991–2008' },
  { answer: 'BLANC', display: 'Laurent Blanc', nat: 'França', pos: 'Zagueiro', era: '1983–2003' },
  { answer: 'DESCHAMPS', display: 'Didier Deschamps', nat: 'França', pos: 'Meia', era: '1985–2001' },
  { answer: 'PAPIN', display: 'Jean-Pierre Papin', nat: 'França', pos: 'Atacante', era: '1984–1998' },
  { answer: 'RIBERY', display: 'Franck Ribéry', nat: 'França', pos: 'Ponta', era: '2000–2022' },
  { answer: 'GIROUD', display: 'Olivier Giroud', nat: 'França', pos: 'Atacante', era: '2006–presente' },

  // Itália
  { answer: 'RIVA', display: 'Gigi Riva', nat: 'Itália', pos: 'Atacante', era: '1962–1976' },
  { answer: 'RIVERA', display: 'Gianni Rivera', nat: 'Itália', pos: 'Meia', era: '1959–1979' },
  { answer: 'VIERI', display: 'Christian Vieri', nat: 'Itália', pos: 'Atacante', era: '1991–2009' },
  { answer: 'INZAGHI', display: 'Filippo Inzaghi', nat: 'Itália', pos: 'Atacante', era: '1991–2012' },
  { answer: 'CHIELLINI', display: 'Giorgio Chiellini', nat: 'Itália', pos: 'Zagueiro', era: '2000–2023' },
  { answer: 'BONUCCI', display: 'Leonardo Bonucci', nat: 'Itália', pos: 'Zagueiro', era: '2006–2024' },

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
  { answer: 'SCHWEINSTEIGER', display: 'Bastian Schweinsteiger', nat: 'Alemanha', pos: 'Meia', era: '2002–2019' },
  { answer: 'OZIL', display: 'Mesut Özil', nat: 'Alemanha', pos: 'Meia', era: '2006–2023' },
  { answer: 'PODOLSKI', display: 'Lukas Podolski', nat: 'Alemanha', pos: 'Atacante', era: '2003–2026' },

  // Holanda
  { answer: 'NEESKENS', display: 'Johan Neeskens', nat: 'Holanda', pos: 'Meia', era: '1968–1984' },
  { answer: 'KROL', display: 'Ruud Krol', nat: 'Holanda', pos: 'Zagueiro', era: '1968–1987' },
  { answer: 'KOEMAN', display: 'Ronald Koeman', nat: 'Holanda', pos: 'Zagueiro', era: '1980–1997' },
  { answer: 'OVERMARS', display: 'Marc Overmars', nat: 'Holanda', pos: 'Ponta', era: '1990–2009' },
  { answer: 'KLUIVERT', display: 'Patrick Kluivert', nat: 'Holanda', pos: 'Atacante', era: '1994–2008' },
  { answer: 'STAM', display: 'Jaap Stam', nat: 'Holanda', pos: 'Zagueiro', era: '1992–2007' },

  // Portugal
  { answer: 'RUICOSTA', display: 'Rui Costa', nat: 'Portugal', pos: 'Meia', era: '1990–2008' },
  { answer: 'NANI', display: 'Nani', nat: 'Portugal', pos: 'Ponta', era: '2005–presente' },
  { answer: 'JOAOFELIX', display: 'João Félix', nat: 'Portugal', pos: 'Atacante', era: '2016–presente' },
  { answer: 'VITINHA', display: 'Vitinha', nat: 'Portugal', pos: 'Meia', era: '2018–presente' },

  // Croácia / Leste Europeu
  { answer: 'BOBAN', display: 'Zvonimir Boban', nat: 'Croácia', pos: 'Meia', era: '1985–2002' },
  { answer: 'PROSINECKI', display: 'Robert Prosinečki', nat: 'Croácia', pos: 'Meia', era: '1987–2004' },
  { answer: 'RAKITIC', display: 'Ivan Rakitić', nat: 'Croácia', pos: 'Meia', era: '2005–2025' },
  { answer: 'PANENKA', display: 'Antonín Panenka', nat: 'Tchecoslováquia', pos: 'Meia', era: '1967–1985' },

  // América do Sul
  { answer: 'CHILAVERT', display: 'José Luis Chilavert', nat: 'Paraguai', pos: 'Goleiro', era: '1982–2004' },
  { answer: 'CUBILLAS', display: 'Teófilo Cubillas', nat: 'Peru', pos: 'Meia', era: '1966–1989' },
  { answer: 'ZAMORANO', display: 'Iván Zamorano', nat: 'Chile', pos: 'Atacante', era: '1985–2003' },
  { answer: 'SALAS', display: 'Marcelo Salas', nat: 'Chile', pos: 'Atacante', era: '1993–2008' },
  { answer: 'ALEXIS', display: 'Alexis Sánchez', nat: 'Chile', pos: 'Atacante', era: '2005–presente' },
  { answer: 'VIDAL', display: 'Arturo Vidal', nat: 'Chile', pos: 'Meia', era: '2006–presente' },
  { answer: 'ASPRILLA', display: 'Faustino Asprilla', nat: 'Colômbia', pos: 'Atacante', era: '1988–2004' },
  { answer: 'RADAMEL', display: 'Radamel Falcao', nat: 'Colômbia', pos: 'Atacante', era: '1999–presente' },
  { answer: 'MARQUEZ', display: 'Rafa Márquez', nat: 'México', pos: 'Zagueiro', era: '1996–2018' },
  { answer: 'CHICHARITO', display: 'Javier Hernández', nat: 'México', pos: 'Atacante', era: '2006–presente' },

  // África e Ásia
  { answer: 'OKOCHA', display: 'Jay-Jay Okocha', nat: 'Nigéria', pos: 'Meia', era: '1990–2008' },
  { answer: 'KANU', display: 'Nwankwo Kanu', nat: 'Nigéria', pos: 'Atacante', era: '1992–2012' },
  { answer: 'MILLA', display: 'Roger Milla', nat: 'Camarões', pos: 'Atacante', era: '1967–1996' },
  { answer: 'MAHREZ', display: 'Riyad Mahrez', nat: 'Argélia', pos: 'Ponta', era: '2009–presente' },
  { answer: 'AUBAMEYANG', display: 'Pierre-Emerick Aubameyang', nat: 'Gabão', pos: 'Atacante', era: '2008–presente' },
  { answer: 'PARKJISUNG', display: 'Park Ji-sung', nat: 'Coreia do Sul', pos: 'Meia', era: '2000–2014' },
  { answer: 'SON', display: 'Son Heung-min', nat: 'Coreia do Sul', pos: 'Atacante', era: '2010–presente' },
  { answer: 'NAKATA', display: 'Hidetoshi Nakata', nat: 'Japão', pos: 'Meia', era: '1995–2006' },

  // ===== Expansão da base =====
  // Brasil
  { answer: 'ZAGALLO', display: 'Mário Zagallo', nat: 'Brasil', pos: 'Ponta', era: '1951–1965' },
  { answer: 'DJALMASANTOS', display: 'Djalma Santos', nat: 'Brasil', pos: 'Lateral', era: '1948–1970' },
  { answer: 'NILTONSANTOS', display: 'Nílton Santos', nat: 'Brasil', pos: 'Lateral', era: '1948–1964' },
  { answer: 'GERSON', display: 'Gérson', nat: 'Brasil', pos: 'Meia', era: '1959–1974' },
  { answer: 'CEREZO', display: 'Toninho Cerezo', nat: 'Brasil', pos: 'Meia', era: '1972–1994' },
  { answer: 'RAI', display: 'Raí', nat: 'Brasil', pos: 'Meia', era: '1984–2000' },
  { answer: 'DUNGA', display: 'Dunga', nat: 'Brasil', pos: 'Meia', era: '1980–2000' },
  { answer: 'ALDAIR', display: 'Aldair', nat: 'Brasil', pos: 'Zagueiro', era: '1985–2005' },
  { answer: 'LEONARDO', display: 'Leonardo', nat: 'Brasil', pos: 'Meia', era: '1987–2003' },
  { answer: 'EDMUNDO', display: 'Edmundo', nat: 'Brasil', pos: 'Atacante', era: '1992–2008' },
  { answer: 'ZEROBERTO', display: 'Zé Roberto', nat: 'Brasil', pos: 'Meia', era: '1994–2017' },
  { answer: 'JUNINHO', display: 'Juninho Pernambucano', nat: 'Brasil', pos: 'Meia', era: '1993–2013' },
  { answer: 'GILBERTOSILVA', display: 'Gilberto Silva', nat: 'Brasil', pos: 'Meia', era: '1997–2013' },
  { answer: 'EMERSON', display: 'Emerson', nat: 'Brasil', pos: 'Meia', era: '1994–2010' },
  { answer: 'DANIALVES', display: 'Dani Alves', nat: 'Brasil', pos: 'Lateral', era: '2001–2023' },
  { answer: 'ROBINHO', display: 'Robinho', nat: 'Brasil', pos: 'Atacante', era: '2002–2020' },
  { answer: 'PATO', display: 'Alexandre Pato', nat: 'Brasil', pos: 'Atacante', era: '2006–2023' },
  { answer: 'GANSO', display: 'Paulo Henrique Ganso', nat: 'Brasil', pos: 'Meia', era: '2008–presente' },
  { answer: 'OSCAR', display: 'Oscar', nat: 'Brasil', pos: 'Meia', era: '2008–2025' },
  { answer: 'WILLIAN', display: 'Willian', nat: 'Brasil', pos: 'Ponta', era: '2006–presente' },
  { answer: 'LUCASMOURA', display: 'Lucas Moura', nat: 'Brasil', pos: 'Ponta', era: '2010–presente' },
  { answer: 'RODRYGO', display: 'Rodrygo', nat: 'Brasil', pos: 'Atacante', era: '2017–presente' },

  // Argentina
  { answer: 'DISTEFANO', display: 'Alfredo Di Stéfano', nat: 'Espanha', pos: 'Atacante', era: '1945–1966' },
  { answer: 'FILLOL', display: 'Ubaldo Fillol', nat: 'Argentina', pos: 'Goleiro', era: '1969–1991' },
  { answer: 'ARDILES', display: 'Osvaldo Ardiles', nat: 'Argentina', pos: 'Meia', era: '1973–1991' },
  { answer: 'CAMBIASSO', display: 'Esteban Cambiasso', nat: 'Argentina', pos: 'Meia', era: '1998–2017' },
  { answer: 'ZABALETA', display: 'Pablo Zabaleta', nat: 'Argentina', pos: 'Lateral', era: '2002–2020' },
  { answer: 'OTAMENDI', display: 'Nicolás Otamendi', nat: 'Argentina', pos: 'Zagueiro', era: '2008–presente' },
  { answer: 'DYBALA', display: 'Paulo Dybala', nat: 'Argentina', pos: 'Atacante', era: '2011–presente' },

  // Uruguai / Chile / Colômbia / Peru / México
  { answer: 'BRAVO', display: 'Claudio Bravo', nat: 'Chile', pos: 'Goleiro', era: '2002–2024' },
  { answer: 'CUADRADO', display: 'Juan Cuadrado', nat: 'Colômbia', pos: 'Ponta', era: '2008–presente' },
  { answer: 'GUERRERO', display: 'Paolo Guerrero', nat: 'Peru', pos: 'Atacante', era: '2004–presente' },
  { answer: 'BLANCO', display: 'Cuauhtémoc Blanco', nat: 'México', pos: 'Atacante', era: '1992–2016' },
  { answer: 'OCHOA', display: 'Guillermo Ochoa', nat: 'México', pos: 'Goleiro', era: '2004–2026' },

  // Inglaterra
  { answer: 'SHILTON', display: 'Peter Shilton', nat: 'Inglaterra', pos: 'Goleiro', era: '1966–1997' },
  { answer: 'GASCOIGNE', display: 'Paul Gascoigne', nat: 'Inglaterra', pos: 'Meia', era: '1985–2004' },
  { answer: 'ASHLEYCOLE', display: 'Ashley Cole', nat: 'Inglaterra', pos: 'Lateral', era: '1999–2019' },
  { answer: 'FODEN', display: 'Phil Foden', nat: 'Inglaterra', pos: 'Meia', era: '2017–presente' },
  { answer: 'PALMER', display: 'Cole Palmer', nat: 'Inglaterra', pos: 'Meia', era: '2020–presente' },

  // França
  { answer: 'BARTHEZ', display: 'Fabien Barthez', nat: 'França', pos: 'Goleiro', era: '1990–2007' },
  { answer: 'DESAILLY', display: 'Marcel Desailly', nat: 'França', pos: 'Zagueiro', era: '1986–2006' },
  { answer: 'LIZARAZU', display: 'Bixente Lizarazu', nat: 'França', pos: 'Lateral', era: '1988–2006' },
  { answer: 'PETIT', display: 'Emmanuel Petit', nat: 'França', pos: 'Meia', era: '1989–2004' },
  { answer: 'MAKELELE', display: 'Claude Makélélé', nat: 'França', pos: 'Meia', era: '1991–2011' },
  { answer: 'LLORIS', display: 'Hugo Lloris', nat: 'França', pos: 'Goleiro', era: '2005–presente' },
  { answer: 'VARANE', display: 'Raphaël Varane', nat: 'França', pos: 'Zagueiro', era: '2010–2024' },
  { answer: 'THEO', display: 'Theo Hernández', nat: 'França', pos: 'Lateral', era: '2016–presente' },

  // Itália
  { answer: 'SCIREA', display: 'Gaetano Scirea', nat: 'Itália', pos: 'Zagueiro', era: '1972–1988' },
  { answer: 'TARDELLI', display: 'Marco Tardelli', nat: 'Itália', pos: 'Meia', era: '1972–1988' },
  { answer: 'SCHILLACI', display: 'Salvatore Schillaci', nat: 'Itália', pos: 'Atacante', era: '1982–1999' },
  { answer: 'ZAMBROTTA', display: 'Gianluca Zambrotta', nat: 'Itália', pos: 'Lateral', era: '1994–2014' },
  { answer: 'MATERAZZI', display: 'Marco Materazzi', nat: 'Itália', pos: 'Zagueiro', era: '1995–2014' },
  { answer: 'VERRATTI', display: 'Marco Verratti', nat: 'Itália', pos: 'Meia', era: '2008–presente' },
  { answer: 'DONNARUMMA', display: 'Gianluigi Donnarumma', nat: 'Itália', pos: 'Goleiro', era: '2015–presente' },
  { answer: 'CHIESA', display: 'Federico Chiesa', nat: 'Itália', pos: 'Ponta', era: '2016–presente' },

  // Alemanha
  { answer: 'SEELER', display: 'Uwe Seeler', nat: 'Alemanha', pos: 'Atacante', era: '1953–1972' },
  { answer: 'BREITNER', display: 'Paul Breitner', nat: 'Alemanha', pos: 'Meia', era: '1970–1983' },
  { answer: 'VOLLER', display: 'Rudi Völler', nat: 'Alemanha', pos: 'Atacante', era: '1977–1996' },
  { answer: 'BIERHOFF', display: 'Oliver Bierhoff', nat: 'Alemanha', pos: 'Atacante', era: '1986–2003' },
  { answer: 'GOTZE', display: 'Mario Götze', nat: 'Alemanha', pos: 'Meia', era: '2009–presente' },
  { answer: 'REUS', display: 'Marco Reus', nat: 'Alemanha', pos: 'Meia', era: '2006–presente' },
  { answer: 'HUMMELS', display: 'Mats Hummels', nat: 'Alemanha', pos: 'Zagueiro', era: '2006–2025' },
  { answer: 'GUNDOGAN', display: 'İlkay Gündoğan', nat: 'Alemanha', pos: 'Meia', era: '2009–presente' },
  { answer: 'SANE', display: 'Leroy Sané', nat: 'Alemanha', pos: 'Ponta', era: '2014–presente' },

  // Holanda
  { answer: 'VANPERSIE', display: 'Robin van Persie', nat: 'Holanda', pos: 'Atacante', era: '2001–2019' },
  { answer: 'WIJNALDUM', display: 'Georginio Wijnaldum', nat: 'Holanda', pos: 'Meia', era: '2007–presente' },

  // Portugal
  { answer: 'PAULETA', display: 'Pedro Pauleta', nat: 'Portugal', pos: 'Atacante', era: '1990–2008' },
  { answer: 'QUARESMA', display: 'Ricardo Quaresma', nat: 'Portugal', pos: 'Ponta', era: '2001–presente' },
  { answer: 'CARVALHO', display: 'Ricardo Carvalho', nat: 'Portugal', pos: 'Zagueiro', era: '1997–2018' },
  { answer: 'MOUTINHO', display: 'João Moutinho', nat: 'Portugal', pos: 'Meia', era: '2004–2024' },
  { answer: 'RUIPATRICIO', display: 'Rui Patrício', nat: 'Portugal', pos: 'Goleiro', era: '2006–2025' },

  // Espanha
  { answer: 'BUTRAGUENO', display: 'Emilio Butragueño', nat: 'Espanha', pos: 'Atacante', era: '1984–1998' },
  { answer: 'GUARDIOLA', display: 'Pep Guardiola', nat: 'Espanha', pos: 'Meia', era: '1990–2006' },
  { answer: 'LUISENRIQUE', display: 'Luis Enrique', nat: 'Espanha', pos: 'Meia', era: '1989–2004' },
  { answer: 'VALDES', display: 'Víctor Valdés', nat: 'Espanha', pos: 'Goleiro', era: '2002–2017' },
  { answer: 'PIQUE', display: 'Gerard Piqué', nat: 'Espanha', pos: 'Zagueiro', era: '2004–2022' },
  { answer: 'JORDIALBA', display: 'Jordi Alba', nat: 'Espanha', pos: 'Lateral', era: '2006–2025' },
  { answer: 'ISCO', display: 'Isco', nat: 'Espanha', pos: 'Meia', era: '2010–presente' },
  { answer: 'MORATA', display: 'Álvaro Morata', nat: 'Espanha', pos: 'Atacante', era: '2010–presente' },

  // África
  { answer: 'YEKINI', display: 'Rashidi Yekini', nat: 'Nigéria', pos: 'Atacante', era: '1984–2005' },
  { answer: 'OSIMHEN', display: 'Victor Osimhen', nat: 'Nigéria', pos: 'Atacante', era: '2017–presente' },
  { answer: 'YAYATOURE', display: 'Yaya Touré', nat: 'Costa do Marfim', pos: 'Meia', era: '2001–2018' },
  { answer: 'ABEDIPELE', display: 'Abedi Pelé', nat: 'Gana', pos: 'Meia', era: '1978–2000' },
  { answer: 'ESSIEN', display: 'Michael Essien', nat: 'Gana', pos: 'Meia', era: '2000–2020' },
  { answer: 'GYAN', display: 'Asamoah Gyan', nat: 'Gana', pos: 'Atacante', era: '2003–2021' },
  { answer: 'DIOUF', display: 'El Hadji Diouf', nat: 'Senegal', pos: 'Atacante', era: '1998–2015' },
  { answer: 'KANOUTE', display: 'Frédéric Kanouté', nat: 'Mali', pos: 'Atacante', era: '1997–2012' },

  // Leste Europeu / Bálcãs
  { answer: 'BONIEK', display: 'Zbigniew Boniek', nat: 'Polônia', pos: 'Meia', era: '1975–1990' },
  { answer: 'LATO', display: 'Grzegorz Lato', nat: 'Polônia', pos: 'Ponta', era: '1966–1987' },
  { answer: 'BLOKHIN', display: 'Oleh Blokhin', nat: 'União Soviética', pos: 'Atacante', era: '1969–1990' },
  { answer: 'DASAEV', display: 'Rinat Dasaev', nat: 'União Soviética', pos: 'Goleiro', era: '1976–1991' },
  { answer: 'STOJKOVIC', display: 'Dragan Stojković', nat: 'Iugoslávia', pos: 'Meia', era: '1981–2001' },
  { answer: 'MIHAJLOVIC', display: 'Siniša Mihajlović', nat: 'Iugoslávia', pos: 'Zagueiro', era: '1986–2006' },
  { answer: 'DZEKO', display: 'Edin Džeko', nat: 'Bósnia', pos: 'Atacante', era: '2003–presente' },
  { answer: 'KVARATSKHELIA', display: 'Khvicha Kvaratskhelia', nat: 'Geórgia', pos: 'Ponta', era: '2017–presente' },
  { answer: 'VLAHOVIC', display: 'Dušan Vlahović', nat: 'Sérvia', pos: 'Atacante', era: '2016–presente' },

  // Escandinávia
  { answer: 'LARSSON', display: 'Henrik Larsson', nat: 'Suécia', pos: 'Atacante', era: '1989–2009' },
  { answer: 'SCHMEICHEL', display: 'Peter Schmeichel', nat: 'Dinamarca', pos: 'Goleiro', era: '1981–2003' },
  { answer: 'ERIKSEN', display: 'Christian Eriksen', nat: 'Dinamarca', pos: 'Meia', era: '2010–presente' },
  { answer: 'ODEGAARD', display: 'Martin Ødegaard', nat: 'Noruega', pos: 'Meia', era: '2014–presente' },

  // Bélgica / Ilhas Britânicas
  { answer: 'KOMPANY', display: 'Vincent Kompany', nat: 'Bélgica', pos: 'Zagueiro', era: '2003–2019' },
  { answer: 'BEST', display: 'George Best', nat: 'Irlanda do Norte', pos: 'Ponta', era: '1963–1984' },
  { answer: 'ROYKEANE', display: 'Roy Keane', nat: 'Irlanda', pos: 'Meia', era: '1989–2006' },
  { answer: 'GIGGS', display: 'Ryan Giggs', nat: 'País de Gales', pos: 'Ponta', era: '1991–2014' },
  { answer: 'RUSH', display: 'Ian Rush', nat: 'País de Gales', pos: 'Atacante', era: '1979–2000' },
  { answer: 'DALGLISH', display: 'Kenny Dalglish', nat: 'Escócia', pos: 'Atacante', era: '1968–1990' },

  // ===== Expansão (3ª leva) =====
  // Lendas mais antigas
  { answer: 'PUSKAS', display: 'Ferenc Puskás', nat: 'Hungria', pos: 'Atacante', era: '1943–1966' },
  { answer: 'GENTO', display: 'Francisco Gento', nat: 'Espanha', pos: 'Ponta', era: '1952–1971' },
  // Brasil
  { answer: 'DINAMITE', display: 'Roberto Dinamite', nat: 'Brasil', pos: 'Atacante', era: '1971–1993' },
  { answer: 'RENATOGAUCHO', display: 'Renato Gaúcho', nat: 'Brasil', pos: 'Atacante', era: '1979–1999' },
  { answer: 'MARCOS', display: 'Marcos', nat: 'Brasil', pos: 'Goleiro', era: '1992–2011' },
  { answer: 'JULIOCESAR', display: 'Júlio César', nat: 'Brasil', pos: 'Goleiro', era: '1997–2018' },
  { answer: 'MILITAO', display: 'Éder Militão', nat: 'Brasil', pos: 'Zagueiro', era: '2017–presente' },
  // Argentina / Colômbia
  { answer: 'GALLARDO', display: 'Marcelo Gallardo', nat: 'Argentina', pos: 'Meia', era: '1993–2011' },
  { answer: 'GARNACHO', display: 'Alejandro Garnacho', nat: 'Argentina', pos: 'Ponta', era: '2022–presente' },
  { answer: 'HIGUITA', display: 'René Higuita', nat: 'Colômbia', pos: 'Goleiro', era: '1985–2010' },
  // Itália
  { answer: 'VIALLI', display: 'Gianluca Vialli', nat: 'Itália', pos: 'Atacante', era: '1980–1999' },
  { answer: 'MANCINI', display: 'Roberto Mancini', nat: 'Itália', pos: 'Atacante', era: '1981–2000' },
  { answer: 'BERGOMI', display: 'Giuseppe Bergomi', nat: 'Itália', pos: 'Zagueiro', era: '1980–1999' },
  { answer: 'COSTACURTA', display: 'Alessandro Costacurta', nat: 'Itália', pos: 'Zagueiro', era: '1986–2007' },
  { answer: 'INSIGNE', display: 'Lorenzo Insigne', nat: 'Itália', pos: 'Ponta', era: '2010–presente' },
  { answer: 'BARELLA', display: 'Nicolò Barella', nat: 'Itália', pos: 'Meia', era: '2015–presente' },
  // Alemanha
  { answer: 'EFFENBERG', display: 'Stefan Effenberg', nat: 'Alemanha', pos: 'Meia', era: '1987–2004' },
  { answer: 'KHEDIRA', display: 'Sami Khedira', nat: 'Alemanha', pos: 'Meia', era: '2006–2021' },
  { answer: 'TERSTEGEN', display: 'Marc-André ter Stegen', nat: 'Alemanha', pos: 'Goleiro', era: '2010–presente' },
  // Espanha
  { answer: 'THIAGOALCANTARA', display: 'Thiago Alcântara', nat: 'Espanha', pos: 'Meia', era: '2009–2024' },
  { answer: 'CARVAJAL', display: 'Dani Carvajal', nat: 'Espanha', pos: 'Lateral', era: '2010–presente' },
  // Inglaterra
  { answer: 'WALKER', display: 'Kyle Walker', nat: 'Inglaterra', pos: 'Lateral', era: '2008–presente' },
  // França
  { answer: 'COMAN', display: 'Kingsley Coman', nat: 'França', pos: 'Ponta', era: '2013–presente' },
  { answer: 'CAMAVINGA', display: 'Eduardo Camavinga', nat: 'França', pos: 'Meia', era: '2019–presente' },
  // Portugal / Bélgica
  { answer: 'CANCELO', display: 'João Cancelo', nat: 'Portugal', pos: 'Lateral', era: '2012–presente' },
  { answer: 'MERTENS', display: 'Dries Mertens', nat: 'Bélgica', pos: 'Atacante', era: '2006–2025' },
  // Croácia / Eslováquia
  { answer: 'KOVACIC', display: 'Mateo Kovačić', nat: 'Croácia', pos: 'Meia', era: '2010–presente' },
  { answer: 'MANDZUKIC', display: 'Mario Mandžukić', nat: 'Croácia', pos: 'Atacante', era: '2004–2021' },
  { answer: 'PERISIC', display: 'Ivan Perišić', nat: 'Croácia', pos: 'Ponta', era: '2006–presente' },
  { answer: 'HAMSIK', display: 'Marek Hamšík', nat: 'Eslováquia', pos: 'Meia', era: '2004–2023' },
  // África
  { answer: 'KOULIBALY', display: 'Kalidou Koulibaly', nat: 'Senegal', pos: 'Zagueiro', era: '2010–presente' },
  { answer: 'ADEBAYOR', display: 'Emmanuel Adebayor', nat: 'Togo', pos: 'Atacante', era: '2001–2020' },

  // ===== Expansão (4ª leva) =====
  // Brasil
  { answer: 'BRANCO', display: 'Branco', nat: 'Brasil', pos: 'Lateral', era: '1983–1998' },
  // Argentina
  { answer: 'RUGGERI', display: 'Oscar Ruggeri', nat: 'Argentina', pos: 'Zagueiro', era: '1980–1997' },
  { answer: 'BURRUCHAGA', display: 'Jorge Burruchaga', nat: 'Argentina', pos: 'Meia', era: '1979–1998' },
  { answer: 'GOYCOCHEA', display: 'Sergio Goycochea', nat: 'Argentina', pos: 'Goleiro', era: '1983–1999' },
  // Paraguai / México
  { answer: 'SANTACRUZ', display: 'Roque Santa Cruz', nat: 'Paraguai', pos: 'Atacante', era: '1997–2021' },
  // Inglaterra
  { answer: 'BARNES', display: 'John Barnes', nat: 'Inglaterra', pos: 'Ponta', era: '1981–1999' },
  { answer: 'ADAMS', display: 'Tony Adams', nat: 'Inglaterra', pos: 'Zagueiro', era: '1983–2002' },
  // França
  { answer: 'GIRESSE', display: 'Alain Giresse', nat: 'França', pos: 'Meia', era: '1970–1988' },
  { answer: 'TIGANA', display: 'Jean Tigana', nat: 'França', pos: 'Meia', era: '1975–1991' },
  { answer: 'EVRA', display: 'Patrice Evra', nat: 'França', pos: 'Lateral', era: '1998–2018' },
  // Itália
  { answer: 'CABRINI', display: 'Antonio Cabrini', nat: 'Itália', pos: 'Lateral', era: '1973–1991' },
  { answer: 'CONTI', display: 'Bruno Conti', nat: 'Itália', pos: 'Ponta', era: '1973–1991' },
  { answer: 'ALTOBELLI', display: 'Alessandro Altobelli', nat: 'Itália', pos: 'Atacante', era: '1974–1989' },
  { answer: 'ANCELOTTI', display: 'Carlo Ancelotti', nat: 'Itália', pos: 'Meia', era: '1976–1992' },
  { answer: 'TONI', display: 'Luca Toni', nat: 'Itália', pos: 'Atacante', era: '1994–2016' },
  // Alemanha
  { answer: 'BREHME', display: 'Andreas Brehme', nat: 'Alemanha', pos: 'Lateral', era: '1980–1998' },
  { answer: 'LITTBARSKI', display: 'Pierre Littbarski', nat: 'Alemanha', pos: 'Ponta', era: '1978–1995' },
  { answer: 'HASSLER', display: 'Thomas Häßler', nat: 'Alemanha', pos: 'Meia', era: '1984–2004' },
  // Espanha
  { answer: 'GUTI', display: 'Guti', nat: 'Espanha', pos: 'Meia', era: '1995–2014' },
  { answer: 'JOAQUIN', display: 'Joaquín', nat: 'Espanha', pos: 'Ponta', era: '2000–2023' },
  { answer: 'DEGEA', display: 'David de Gea', nat: 'Espanha', pos: 'Goleiro', era: '2009–presente' },
  // Portugal
  { answer: 'FUTRE', display: 'Paulo Futre', nat: 'Portugal', pos: 'Ponta', era: '1983–1998' },
  // Holanda
  { answer: 'VANBOMMEL', display: 'Mark van Bommel', nat: 'Holanda', pos: 'Meia', era: '1992–2013' },
  { answer: 'DELIGT', display: 'Matthijs de Ligt', nat: 'Holanda', pos: 'Zagueiro', era: '2016–presente' },
  // Bélgica
  { answer: 'WITSEL', display: 'Axel Witsel', nat: 'Bélgica', pos: 'Meia', era: '2006–presente' },
  // Leste Europeu / Rep. Tcheca / Sérvia
  { answer: 'CECH', display: 'Petr Čech', nat: 'Rep. Tcheca', pos: 'Goleiro', era: '1999–2019' },
  { answer: 'ROSICKY', display: 'Tomáš Rosický', nat: 'Rep. Tcheca', pos: 'Meia', era: '1998–2016' },
  { answer: 'VIDIC', display: 'Nemanja Vidić', nat: 'Sérvia', pos: 'Zagueiro', era: '2000–2016' },
  { answer: 'GVARDIOL', display: 'Joško Gvardiol', nat: 'Croácia', pos: 'Zagueiro', era: '2019–presente' },
  { answer: 'SZOBOSZLAI', display: 'Dominik Szoboszlai', nat: 'Hungria', pos: 'Meia', era: '2016–presente' },
  // África
  { answer: 'MIKEL', display: 'John Obi Mikel', nat: 'Nigéria', pos: 'Meia', era: '2004–2022' },

  // ===== Lote 2 (set/2026): cada entrada verificada em fonte primária =====
  // Brasil — lendas
  { answer: 'ZIZINHO', display: 'Zizinho', nat: 'Brasil', pos: 'Meia', era: '1939–1961' },
  { answer: 'BELLINI', display: 'Bellini', nat: 'Brasil', pos: 'Zagueiro', era: '1948–1969' },
  { answer: 'GILMAR', display: 'Gilmar', nat: 'Brasil', pos: 'Goleiro', era: '1951–1969' },
  { answer: 'CLODOALDO', display: 'Clodoaldo', nat: 'Brasil', pos: 'Meia', era: '1966–1981' },
  { answer: 'DADA', display: 'Dadá Maravilha', nat: 'Brasil', pos: 'Atacante', era: '1967–1986' },
  { answer: 'EMERSONLEAO', display: 'Emerson Leão', nat: 'Brasil', pos: 'Goleiro', era: '1968–1987' },
  { answer: 'REINALDO', display: 'Reinaldo', nat: 'Brasil', pos: 'Atacante', era: '1973–1987' },
  { answer: 'NUNES', display: 'Nunes', nat: 'Brasil', pos: 'Atacante', era: '1973–1993' },
  { answer: 'EDER', display: 'Éder Aleixo', nat: 'Brasil', pos: 'Ponta', era: '1975–1996' },
  { answer: 'LEANDRO', display: 'Leandro', nat: 'Brasil', pos: 'Lateral', era: '1978–1990' },
  { answer: 'MOZER', display: 'Mozer', nat: 'Brasil', pos: 'Zagueiro', era: '1980–1996' },
  { answer: 'CASAGRANDE', display: 'Casagrande', nat: 'Brasil', pos: 'Atacante', era: '1980–1996' },
  { answer: 'ZETTI', display: 'Zetti', nat: 'Brasil', pos: 'Goleiro', era: '1983–2001' },
  { answer: 'EVAIR', display: 'Evair', nat: 'Brasil', pos: 'Atacante', era: '1985–2003' },
  { answer: 'ZINHO', display: 'Zinho', nat: 'Brasil', pos: 'Meia', era: '1986–2007' },
  { answer: 'MARCELINHO', display: 'Marcelinho Carioca', nat: 'Brasil', pos: 'Meia', era: '1988–2009' },
  { answer: 'DJALMINHA', display: 'Djalminha', nat: 'Brasil', pos: 'Meia', era: '1988–2004' },
  { answer: 'TULIO', display: 'Túlio Maravilha', nat: 'Brasil', pos: 'Atacante', era: '1988–2019' },
  { answer: 'ROGERIOCENI', display: 'Rogério Ceni', nat: 'Brasil', pos: 'Goleiro', era: '1990–2015' },
  { answer: 'JARDEL', display: 'Mário Jardel', nat: 'Brasil', pos: 'Atacante', era: '1991–2011' },
  { answer: 'AMOROSO', display: 'Márcio Amoroso', nat: 'Brasil', pos: 'Atacante', era: '1992–2010' },
  { answer: 'VAMPETA', display: 'Vampeta', nat: 'Brasil', pos: 'Meia', era: '1993–2008' },
  { answer: 'ROQUEJUNIOR', display: 'Roque Júnior', nat: 'Brasil', pos: 'Zagueiro', era: '1993–2010' },
  { answer: 'DANRLEI', display: 'Danrlei', nat: 'Brasil', pos: 'Goleiro', era: '1993–2009' },
  { answer: 'DENILSON', display: 'Denílson', nat: 'Brasil', pos: 'Ponta', era: '1994–2009' },
  { answer: 'ALEX', display: 'Alex', nat: 'Brasil', pos: 'Meia', era: '1995–2014' },
  { answer: 'JUAN', display: 'Juan', nat: 'Brasil', pos: 'Zagueiro', era: '1996–2019' },
  { answer: 'FERNANDAO', display: 'Fernandão', nat: 'Brasil', pos: 'Atacante', era: '1996–2011' },
  { answer: 'FABIO', display: 'Fábio', nat: 'Brasil', pos: 'Goleiro', era: '1997–presente' },
  { answer: 'LUISFABIANO', display: 'Luís Fabiano', nat: 'Brasil', pos: 'Atacante', era: '1998–2017' },
  { answer: 'LUISAO', display: 'Luisão', nat: 'Brasil', pos: 'Zagueiro', era: '1999–2018' },
  { answer: 'ELANO', display: 'Elano', nat: 'Brasil', pos: 'Meia', era: '2001–2016' },
  { answer: 'JEFFERSON', display: 'Jefferson', nat: 'Brasil', pos: 'Goleiro', era: '2000–2018' },
  { answer: 'FERNANDINHO', display: 'Fernandinho', nat: 'Brasil', pos: 'Meia', era: '2002–2024' },
  { answer: 'FRED', display: 'Fred', nat: 'Brasil', pos: 'Atacante', era: '2003–2022' },
  { answer: 'FILIPELUIS', display: 'Filipe Luís', nat: 'Brasil', pos: 'Lateral', era: '2003–2023' },
  { answer: 'MIRANDA', display: 'Miranda', nat: 'Brasil', pos: 'Zagueiro', era: '2004–2022' },
  { answer: 'HERNANES', display: 'Hernanes', nat: 'Brasil', pos: 'Meia', era: '2004–2021' },
  { answer: 'CASSIO', display: 'Cássio', nat: 'Brasil', pos: 'Goleiro', era: '2006–presente' },
  { answer: 'WEVERTON', display: 'Weverton', nat: 'Brasil', pos: 'Goleiro', era: '2006–presente' },
  { answer: 'DANILO', display: 'Danilo', nat: 'Brasil', pos: 'Lateral', era: '2009–presente' },
  { answer: 'FABINHO', display: 'Fabinho', nat: 'Brasil', pos: 'Meia', era: '2013–presente' },
  { answer: 'GABIGOL', display: 'Gabigol', nat: 'Brasil', pos: 'Atacante', era: '2013–presente' },
  { answer: 'MAGALHAES', display: 'Gabriel Magalhães', nat: 'Brasil', pos: 'Zagueiro', era: '2016–presente' },
  { answer: 'PAQUETA', display: 'Lucas Paquetá', nat: 'Brasil', pos: 'Meia', era: '2016–presente' },
  { answer: 'BREMER', display: 'Bremer', nat: 'Brasil', pos: 'Zagueiro', era: '2017–presente' },
  { answer: 'CUNHA', display: 'Matheus Cunha', nat: 'Brasil', pos: 'Atacante', era: '2017–presente' },
  { answer: 'ANTONY', display: 'Antony', nat: 'Brasil', pos: 'Ponta', era: '2018–presente' },
  { answer: 'SAVINHO', display: 'Savinho', nat: 'Brasil', pos: 'Ponta', era: '2020–presente' },
  { answer: 'ESTEVAO', display: 'Estêvão', nat: 'Brasil', pos: 'Ponta', era: '2023–presente' },

  // Argentina
  { answer: 'BOCHINI', display: 'Ricardo Bochini', nat: 'Argentina', pos: 'Meia', era: '1972–1991' },
  { answer: 'AYALA', display: 'Roberto Ayala', nat: 'Argentina', pos: 'Zagueiro', era: '1991–2010' },
  { answer: 'SORIN', display: 'Juan Pablo Sorín', nat: 'Argentina', pos: 'Lateral', era: '1994–2009' },
  { answer: 'SAMUEL', display: 'Walter Samuel', nat: 'Argentina', pos: 'Zagueiro', era: '1996–2016' },
  { answer: 'HEINZE', display: 'Gabriel Heinze', nat: 'Argentina', pos: 'Lateral', era: '1996–2014' },
  { answer: 'DALESSANDRO', display: "Andrés D'Alessandro", nat: 'Argentina', pos: 'Meia', era: '2000–2022' },
  { answer: 'PAREDES', display: 'Leandro Paredes', nat: 'Argentina', pos: 'Meia', era: '2010–presente' },
  { answer: 'DEPAUL', display: 'Rodrigo De Paul', nat: 'Argentina', pos: 'Meia', era: '2013–presente' },

  // Uruguai
  { answer: 'LOCOABREU', display: 'Loco Abreu', nat: 'Uruguai', pos: 'Atacante', era: '1995–2021' },
  { answer: 'LUGANO', display: 'Diego Lugano', nat: 'Uruguai', pos: 'Zagueiro', era: '1999–2017' },
  { answer: 'MUSLERA', display: 'Fernando Muslera', nat: 'Uruguai', pos: 'Goleiro', era: '2004–presente' },
  { answer: 'ARRASCAETA', display: 'Giorgian de Arrascaeta', nat: 'Uruguai', pos: 'Meia', era: '2012–presente' },
  { answer: 'GIMENEZ', display: 'José María Giménez', nat: 'Uruguai', pos: 'Zagueiro', era: '2012–presente' },
  { answer: 'BENTANCUR', display: 'Rodrigo Bentancur', nat: 'Uruguai', pos: 'Meia', era: '2015–presente' },

  // Colômbia / Chile / Paraguai / Peru / Equador
  { answer: 'RINCON', display: 'Freddy Rincón', nat: 'Colômbia', pos: 'Meia', era: '1986–2004' },
  { answer: 'CORDOBA', display: 'Iván Córdoba', nat: 'Colômbia', pos: 'Zagueiro', era: '1993–2012' },
  { answer: 'YEPES', display: 'Mario Yepes', nat: 'Colômbia', pos: 'Zagueiro', era: '1994–2015' },
  { answer: 'OSPINA', display: 'David Ospina', nat: 'Colômbia', pos: 'Goleiro', era: '2005–presente' },
  { answer: 'LUISDIAZ', display: 'Luis Díaz', nat: 'Colômbia', pos: 'Ponta', era: '2016–presente' },
  { answer: 'CASZELY', display: 'Carlos Caszely', nat: 'Chile', pos: 'Atacante', era: '1967–1986' },
  { answer: 'MEDEL', display: 'Gary Medel', nat: 'Chile', pos: 'Meia', era: '2006–presente' },
  { answer: 'VARGAS', display: 'Eduardo Vargas', nat: 'Chile', pos: 'Atacante', era: '2006–presente' },
  { answer: 'ROMERITO', display: 'Romerito', nat: 'Paraguai', pos: 'Meia', era: '1977–1998' },
  { answer: 'ARCE', display: 'Francisco Arce', nat: 'Paraguai', pos: 'Lateral', era: '1989–2006' },
  { answer: 'GAMARRA', display: 'Carlos Gamarra', nat: 'Paraguai', pos: 'Zagueiro', era: '1991–2007' },
  { answer: 'PIZARRO', display: 'Claudio Pizarro', nat: 'Peru', pos: 'Atacante', era: '1996–2020' },
  { answer: 'FARFAN', display: 'Jefferson Farfán', nat: 'Peru', pos: 'Ponta', era: '2001–2022' },
  { answer: 'VALENCIA', display: 'Enner Valencia', nat: 'Equador', pos: 'Atacante', era: '2010–presente' },
  { answer: 'CAICEDO', display: 'Moisés Caicedo', nat: 'Equador', pos: 'Meia', era: '2019–presente' },
  { answer: 'HINCAPIE', display: 'Piero Hincapié', nat: 'Equador', pos: 'Zagueiro', era: '2019–presente' },

  // Polônia / Rep. Tcheca / Bálcãs
  { answer: 'DUDEK', display: 'Jerzy Dudek', nat: 'Polônia', pos: 'Goleiro', era: '1991–2011' },
  { answer: 'SZCZESNY', display: 'Wojciech Szczęsny', nat: 'Polônia', pos: 'Goleiro', era: '2009–presente' },
  { answer: 'ZIELINSKI', display: 'Piotr Zieliński', nat: 'Polônia', pos: 'Meia', era: '2012–presente' },
  { answer: 'POBORSKY', display: 'Karel Poborský', nat: 'Rep. Tcheca', pos: 'Ponta', era: '1991–2007' },
  { answer: 'KOLLER', display: 'Jan Koller', nat: 'Rep. Tcheca', pos: 'Atacante', era: '1994–2011' },
  { answer: 'BAROS', display: 'Milan Baroš', nat: 'Rep. Tcheca', pos: 'Atacante', era: '1998–2020' },
  { answer: 'PETKOVIC', display: 'Dejan Petković', nat: 'Iugoslávia', pos: 'Meia', era: '1988–2011' },
  { answer: 'MITROVIC', display: 'Aleksandar Mitrović', nat: 'Sérvia', pos: 'Atacante', era: '2011–presente' },
  { answer: 'TADIC', display: 'Dušan Tadić', nat: 'Sérvia', pos: 'Meia', era: '2006–presente' },
  { answer: 'SRNA', display: 'Darijo Srna', nat: 'Croácia', pos: 'Lateral', era: '1999–2019' },
  { answer: 'BROZOVIC', display: 'Marcelo Brozović', nat: 'Croácia', pos: 'Meia', era: '2010–presente' },
  { answer: 'LIVAKOVIC', display: 'Dominik Livaković', nat: 'Croácia', pos: 'Goleiro', era: '2012–presente' },
  { answer: 'SKRINIAR', display: 'Milan Škriniar', nat: 'Eslováquia', pos: 'Zagueiro', era: '2012–presente' },
  { answer: 'OBLAK', display: 'Jan Oblak', nat: 'Eslovênia', pos: 'Goleiro', era: '2009–presente' },
  { answer: 'BERBATOV', display: 'Dimitar Berbatov', nat: 'Bulgária', pos: 'Atacante', era: '1998–2018' },
  { answer: 'MUTU', display: 'Adrian Mutu', nat: 'Romênia', pos: 'Atacante', era: '1996–2016' },
  { answer: 'MKHITARYAN', display: 'Henrikh Mkhitaryan', nat: 'Armênia', pos: 'Meia', era: '2006–presente' },

  // Bélgica / Ilhas Britânicas
  { answer: 'PFAFF', display: 'Jean-Marie Pfaff', nat: 'Bélgica', pos: 'Goleiro', era: '1972–1990' },
  { answer: 'VERTONGHEN', display: 'Jan Vertonghen', nat: 'Bélgica', pos: 'Zagueiro', era: '2006–2025' },
  { answer: 'DOKU', display: 'Jérémy Doku', nat: 'Bélgica', pos: 'Ponta', era: '2018–presente' },
  { answer: 'JENNINGS', display: 'Pat Jennings', nat: 'Irlanda do Norte', pos: 'Goleiro', era: '1963–1986' },
  { answer: 'ROBBIEKEANE', display: 'Robbie Keane', nat: 'Irlanda', pos: 'Atacante', era: '1997–2018' },
  { answer: 'SOUNESS', display: 'Graeme Souness', nat: 'Escócia', pos: 'Meia', era: '1970–1991' },
  { answer: 'ROBERTSON', display: 'Andy Robertson', nat: 'Escócia', pos: 'Lateral', era: '2012–presente' },
  { answer: 'MCTOMINAY', display: 'Scott McTominay', nat: 'Escócia', pos: 'Meia', era: '2017–presente' },

  // Itália / Espanha / França / Alemanha
  { answer: 'DIEGOCOSTA', display: 'Diego Costa', nat: 'Espanha', pos: 'Atacante', era: '2006–2024' },
  { answer: 'JORGINHO', display: 'Jorginho', nat: 'Itália', pos: 'Meia', era: '2010–presente' },
  { answer: 'MAIGNAN', display: 'Mike Maignan', nat: 'França', pos: 'Goleiro', era: '2012–presente' },
  { answer: 'RUDIGER', display: 'Antonio Rüdiger', nat: 'Alemanha', pos: 'Zagueiro', era: '2011–presente' },

  // Suíça / Áustria
  { answer: 'CHAPUISAT', display: 'Stéphane Chapuisat', nat: 'Suíça', pos: 'Atacante', era: '1986–2006' },
  { answer: 'SOMMER', display: 'Yann Sommer', nat: 'Suíça', pos: 'Goleiro', era: '2007–presente' },
  { answer: 'SHAQIRI', display: 'Xherdan Shaqiri', nat: 'Suíça', pos: 'Ponta', era: '2009–presente' },
  { answer: 'XHAKA', display: 'Granit Xhaka', nat: 'Suíça', pos: 'Meia', era: '2010–presente' },
  { answer: 'AKANJI', display: 'Manuel Akanji', nat: 'Suíça', pos: 'Zagueiro', era: '2014–presente' },
  { answer: 'KRANKL', display: 'Hans Krankl', nat: 'Áustria', pos: 'Atacante', era: '1970–1989' },
  { answer: 'ARNAUTOVIC', display: 'Marko Arnautović', nat: 'Áustria', pos: 'Atacante', era: '2007–presente' },
  { answer: 'ALABA', display: 'David Alaba', nat: 'Áustria', pos: 'Zagueiro', era: '2009–presente' },
  { answer: 'SABITZER', display: 'Marcel Sabitzer', nat: 'Áustria', pos: 'Meia', era: '2010–presente' },

  // Turquia / Grécia
  { answer: 'SUKUR', display: 'Hakan Şükür', nat: 'Turquia', pos: 'Atacante', era: '1987–2008' },
  { answer: 'RUSTU', display: 'Rüştü Reçber', nat: 'Turquia', pos: 'Goleiro', era: '1988–2012' },
  { answer: 'ARDATURAN', display: 'Arda Turan', nat: 'Turquia', pos: 'Meia', era: '2005–2022' },
  { answer: 'CALHANOGLU', display: 'Hakan Çalhanoğlu', nat: 'Turquia', pos: 'Meia', era: '2011–presente' },
  { answer: 'ARDAGULER', display: 'Arda Güler', nat: 'Turquia', pos: 'Meia', era: '2021–presente' },
  { answer: 'ZAGORAKIS', display: 'Theodoros Zagorakis', nat: 'Grécia', pos: 'Meia', era: '1988–2007' },
  { answer: 'KARAGOUNIS', display: 'Giorgos Karagounis', nat: 'Grécia', pos: 'Meia', era: '1996–2014' },
  { answer: 'CHARISTEAS', display: 'Angelos Charisteas', nat: 'Grécia', pos: 'Atacante', era: '1997–2013' },

  // Escandinávia / Finlândia
  { answer: 'RAVELLI', display: 'Thomas Ravelli', nat: 'Suécia', pos: 'Goleiro', era: '1976–1999' },
  { answer: 'BROLIN', display: 'Tomas Brolin', nat: 'Suécia', pos: 'Atacante', era: '1987–1998' },
  { answer: 'LJUNGBERG', display: 'Freddie Ljungberg', nat: 'Suécia', pos: 'Ponta', era: '1994–2014' },
  { answer: 'GYOKERES', display: 'Viktor Gyökeres', nat: 'Suécia', pos: 'Atacante', era: '2015–presente' },
  { answer: 'ISAK', display: 'Alexander Isak', nat: 'Suécia', pos: 'Atacante', era: '2016–presente' },
  { answer: 'ELKJAER', display: 'Preben Elkjær', nat: 'Dinamarca', pos: 'Atacante', era: '1976–1990' },
  { answer: 'TOMASSON', display: 'Jon Dahl Tomasson', nat: 'Dinamarca', pos: 'Atacante', era: '1992–2011' },
  { answer: 'KJAER', display: 'Simon Kjær', nat: 'Dinamarca', pos: 'Zagueiro', era: '2007–2024' },
  { answer: 'HOJLUND', display: 'Rasmus Højlund', nat: 'Dinamarca', pos: 'Atacante', era: '2020–presente' },
  { answer: 'LITMANEN', display: 'Jari Litmanen', nat: 'Finlândia', pos: 'Meia', era: '1987–2011' },

  // África
  { answer: 'NKONO', display: "Thomas N'Kono", nat: 'Camarões', pos: 'Goleiro', era: '1974–1997' },
  { answer: 'MBOMA', display: 'Patrick Mboma', nat: 'Camarões', pos: 'Atacante', era: '1992–2005' },
  { answer: 'SONG', display: 'Rigobert Song', nat: 'Camarões', pos: 'Zagueiro', era: '1993–2010' },
  { answer: 'ONANA', display: 'André Onana', nat: 'Camarões', pos: 'Goleiro', era: '2015–presente' },
  { answer: 'MADJER', display: 'Rabah Madjer', nat: 'Argélia', pos: 'Atacante', era: '1978–1992' },
  { answer: 'RADEBE', display: 'Lucas Radebe', nat: 'África do Sul', pos: 'Zagueiro', era: '1989–2005' },
  { answer: 'KOLOTOURE', display: 'Kolo Touré', nat: 'Costa do Marfim', pos: 'Zagueiro', era: '1999–2017' },
  { answer: 'MENDY', display: 'Édouard Mendy', nat: 'Senegal', pos: 'Goleiro', era: '2011–presente' },
  { answer: 'LOOKMAN', display: 'Ademola Lookman', nat: 'Nigéria', pos: 'Ponta', era: '2015–presente' },

  // Ásia / Oceania
  { answer: 'DAEI', display: 'Ali Daei', nat: 'Irã', pos: 'Atacante', era: '1987–2007' },
  { answer: 'NAKAMURA', display: 'Shunsuke Nakamura', nat: 'Japão', pos: 'Meia', era: '1997–2022' },
  { answer: 'KAGAWA', display: 'Shinji Kagawa', nat: 'Japão', pos: 'Meia', era: '2007–presente' },
  { answer: 'KUBO', display: 'Takefusa Kubo', nat: 'Japão', pos: 'Ponta', era: '2016–presente' },
  { answer: 'KIMMINJAE', display: 'Kim Min-jae', nat: 'Coreia do Sul', pos: 'Zagueiro', era: '2016–presente' },
  { answer: 'CAHILL', display: 'Tim Cahill', nat: 'Austrália', pos: 'Meia', era: '1997–2019' },

  // América do Norte e Central
  { answer: 'CAMPOS', display: 'Jorge Campos', nat: 'México', pos: 'Goleiro', era: '1988–2003' },
  { answer: 'GUARDADO', display: 'Andrés Guardado', nat: 'México', pos: 'Meia', era: '2005–2025' },
  { answer: 'LOZANO', display: 'Hirving Lozano', nat: 'México', pos: 'Ponta', era: '2014–presente' },
  { answer: 'HOWARD', display: 'Tim Howard', nat: 'Estados Unidos', pos: 'Goleiro', era: '1997–2019' },
  { answer: 'DEMPSEY', display: 'Clint Dempsey', nat: 'Estados Unidos', pos: 'Atacante', era: '2004–2018' },
  { answer: 'PULISIC', display: 'Christian Pulisic', nat: 'Estados Unidos', pos: 'Ponta', era: '2016–presente' },
  { answer: 'NAVAS', display: 'Keylor Navas', nat: 'Costa Rica', pos: 'Goleiro', era: '2005–presente' },
  { answer: 'DAVIES', display: 'Alphonso Davies', nat: 'Canadá', pos: 'Lateral', era: '2015–presente' },

  // ===== Lote 3 (out/2026): estreia = 1º jogo oficial pelo time principal =====
  // Brasil — seleção atual / recente
  { answer: 'MARTINELLI', display: 'Gabriel Martinelli', nat: 'Brasil', pos: 'Ponta', era: '2018–presente' }, // EN Gabriel_Martinelli (Ituano, 17/03/2018)
  { answer: 'JOAOPEDRO', display: 'João Pedro', nat: 'Brasil', pos: 'Atacante', era: '2019–presente' }, // EN João_Pedro_(footballer,_born_2001)
  { answer: 'DOUGLASLUIZ', display: 'Douglas Luiz', nat: 'Brasil', pos: 'Meia', era: '2016–presente' }, // EN Douglas_Luiz (Vasco)
  { answer: 'VITORROQUE', display: 'Vitor Roque', nat: 'Brasil', pos: 'Atacante', era: '2021–presente' }, // EN Vitor_Roque (Cruzeiro)
  { answer: 'JOAOGOMES', display: 'João Gomes', nat: 'Brasil', pos: 'Meia', era: '2020–presente' }, // EN João_Gomes_(footballer,_born_2001) (Flamengo)
  { answer: 'LUIZHENRIQUE', display: 'Luiz Henrique', nat: 'Brasil', pos: 'Ponta', era: '2020–presente' }, // EN Luiz_Henrique_(footballer,_born_2001) (Fluminense)
  { answer: 'ALEXSANDRO', display: 'Alex Sandro', nat: 'Brasil', pos: 'Lateral', era: '2008–presente' }, // EN Alex_Sandro (Athletico)
  { answer: 'DOUGLASCOSTA', display: 'Douglas Costa', nat: 'Brasil', pos: 'Ponta', era: '2008–presente' }, // EN Douglas_Costa (Grêmio)
  { answer: 'EVERTONRIBEIRO', display: 'Everton Ribeiro', nat: 'Brasil', pos: 'Meia', era: '2007–presente' }, // EN Éverton_Ribeiro (Corinthians)
  { answer: 'BRUNOHENRIQUE', display: 'Bruno Henrique', nat: 'Brasil', pos: 'Ponta', era: '2012–presente' }, // EN Bruno_Henrique_(footballer,_born_1990) (Uberlândia)
  { answer: 'DUDU', display: 'Dudu', nat: 'Brasil', pos: 'Ponta', era: '2009–presente' }, // EN Dudu_(footballer,_born_1992) (Coritiba)
  // Brasil — ídolos 1990–2020
  { answer: 'DIEGORIBAS', display: 'Diego Ribas', nat: 'Brasil', pos: 'Meia', era: '2002–2022' }, // EN Diego_(footballer,_born_1985) (Santos)
  { answer: 'FELIPEMELO', display: 'Felipe Melo', nat: 'Brasil', pos: 'Meia', era: '2001–2024' }, // EN Felipe_Melo (Flamengo; último jogo Fluminense 2024)
  { answer: 'LUCASLEIVA', display: 'Lucas Leiva', nat: 'Brasil', pos: 'Meia', era: '2005–2022' }, // EN Lucas_Leiva (Grêmio; último jogo 2022)
  { answer: 'THIAGONEVES', display: 'Thiago Neves', nat: 'Brasil', pos: 'Meia', era: '2005–2021' }, // EN Thiago_Neves (Paraná)
  { answer: 'DIEGOTARDELLI', display: 'Diego Tardelli', nat: 'Brasil', pos: 'Atacante', era: '2003–2021' }, // EN Diego_Tardelli (São Paulo, 09/07/2003)
  { answer: 'KLEBERSON', display: 'Kléberson', nat: 'Brasil', pos: 'Meia', era: '1999–2016' }, // EN Kléberson (Athletico)
  { answer: 'MAUROSILVA', display: 'Mauro Silva', nat: 'Brasil', pos: 'Meia', era: '1986–2005' }, // https://www.ogol.com.br/jogador/mauro-silva/847 (Guarani)
  { answer: 'CESARSAMPAIO', display: 'César Sampaio', nat: 'Brasil', pos: 'Meia', era: '1986–2004' }, // EN César_Sampaio (Santos)
  { answer: 'MAZINHO', display: 'Mazinho', nat: 'Brasil', pos: 'Meia', era: '1985–2001' }, // https://www.ogol.com.br/jogador/mazinho/57549 (Vasco)
  { answer: 'SAVIO', display: 'Sávio', nat: 'Brasil', pos: 'Ponta', era: '1992–2010' }, // https://www.ogol.com.br/jogador/savio/1164 (Flamengo)
  { answer: 'ELBER', display: 'Giovane Élber', nat: 'Brasil', pos: 'Atacante', era: '1990–2006' }, // https://www.ogol.com.br/jogador/elber/3621 (Londrina)
  { answer: 'BELLETTI', display: 'Juliano Belletti', nat: 'Brasil', pos: 'Lateral', era: '1994–2010' }, // https://www.ogol.com.br/jogador/belletti/1130 (Cruzeiro, 06/11/1994)
  { answer: 'EDMILSON', display: 'Edmílson', nat: 'Brasil', pos: 'Zagueiro', era: '1993–2011' }, // https://www.ogol.com.br/jogador/edmilson/3608 (São Paulo)
  { answer: 'RICARDOGOMES', display: 'Ricardo Gomes', nat: 'Brasil', pos: 'Zagueiro', era: '1982–1996' }, // EN Ricardo_Gomes (Fluminense)
  // Estrangeiros ídolos em clubes brasileiros
  { answer: 'GUSTAVOGOMEZ', display: 'Gustavo Gómez', nat: 'Paraguai', pos: 'Zagueiro', era: '2011–presente' }, // EN Gustavo_Gómez (Libertad)
  { answer: 'VALDIVIA', display: 'Jorge Valdivia', nat: 'Chile', pos: 'Meia', era: '2003–2022' }, // EN Jorge_Valdivia (Colo-Colo)
  { answer: 'PIQUEREZ', display: 'Joaquín Piquerez', nat: 'Uruguai', pos: 'Lateral', era: '2017–presente' }, // EN Joaquín_Piquerez (River Plate-URU)
  { answer: 'MONTILLO', display: 'Walter Montillo', nat: 'Argentina', pos: 'Meia', era: '2002–2021' }, // EN Walter_Montillo (San Lorenzo; último jogo 13/02/2021)
  { answer: 'JHONARIAS', display: 'Jhon Arias', nat: 'Colômbia', pos: 'Ponta', era: '2018–presente' }, // EN Jhon_Arias_(footballer) (Llaneros)
  { answer: 'CUEVA', display: 'Christian Cueva', nat: 'Peru', pos: 'Meia', era: '2008–presente' }, // EN Christian_Cueva (Universidad San Martín)
  { answer: 'ARANGUIZ', display: 'Charles Aránguiz', nat: 'Chile', pos: 'Meia', era: '2006–presente' }, // EN Charles_Aránguiz (Cobreloa)
  { answer: 'BORJA', display: 'Miguel Borja', nat: 'Colômbia', pos: 'Atacante', era: '2011–presente' }, // EN Miguel_Borja (Cortuluá)
  { answer: 'PLATA', display: 'Gonzalo Plata', nat: 'Equador', pos: 'Ponta', era: '2018–presente' }, // EN Gonzalo_Plata (Independiente del Valle)
  { answer: 'ZIYECH', display: 'Hakim Ziyech', nat: 'Marrocos', pos: 'Ponta', era: '2012–presente' }, // EN Hakim_Ziyech (Heerenveen, 02/08/2012)
  // Craques estrangeiros marcantes
  { answer: 'KEEGAN', display: 'Kevin Keegan', nat: 'Inglaterra', pos: 'Atacante', era: '1968–1984' }, // EN Kevin_Keegan (Scunthorpe)
  { answer: 'SCHUSTER', display: 'Bernd Schuster', nat: 'Alemanha', pos: 'Meia', era: '1978–1997' }, // EN Bernd_Schuster (Köln)
  { answer: 'LAW', display: 'Denis Law', nat: 'Escócia', pos: 'Atacante', era: '1956–1974' }, // EN Denis_Law (Huddersfield, 24/12/1956)
  { answer: 'MATTHEWS', display: 'Stanley Matthews', nat: 'Inglaterra', pos: 'Ponta', era: '1932–1965' }, // EN Stanley_Matthews (Stoke, 19/03/1932)
  { answer: 'MAZZOLA', display: 'Sandro Mazzola', nat: 'Itália', pos: 'Atacante', era: '1961–1977' }, // EN Sandro_Mazzola (Inter, 10/06/1961)
  { answer: 'VALDANO', display: 'Jorge Valdano', nat: 'Argentina', pos: 'Atacante', era: '1973–1987' }, // https://es.wikipedia.org/wiki/Jorge_Valdano (Newell's, 05/08/1973)
  { answer: 'ALBERTINI', display: 'Demetrio Albertini', nat: 'Itália', pos: 'Meia', era: '1989–2005' }, // https://it.wikipedia.org/wiki/Demetrio_Albertini (Milan, 15/01/1989)
  { answer: 'DEROSSI', display: 'Daniele De Rossi', nat: 'Itália', pos: 'Meia', era: '2001–2019' }, // EN Daniele_De_Rossi (Roma, 30/10/2001)
  { answer: 'MARCHISIO', display: 'Claudio Marchisio', nat: 'Itália', pos: 'Meia', era: '2006–2019' }, // EN Claudio_Marchisio (Juventus, 19/08/2006)
  { answer: 'LAVEZZI', display: 'Ezequiel Lavezzi', nat: 'Argentina', pos: 'Atacante', era: '2003–2019' }, // EN Ezequiel_Lavezzi (Estudiantes BA)
  { answer: 'DIEGOMILITO', display: 'Diego Milito', nat: 'Argentina', pos: 'Atacante', era: '1999–2016' }, // EN Diego_Milito (Racing)
  { answer: 'ICARDI', display: 'Mauro Icardi', nat: 'Argentina', pos: 'Atacante', era: '2012–presente' }, // EN Mauro_Icardi (Sampdoria, 12/05/2012)
  { answer: 'BANEGA', display: 'Éver Banega', nat: 'Argentina', pos: 'Meia', era: '2007–presente' }, // EN Éver_Banega (Boca, 10/02/2007)
  { answer: 'PASTORE', display: 'Javier Pastore', nat: 'Argentina', pos: 'Meia', era: '2007–2023' }, // EN Javier_Pastore (Talleres)
  { answer: 'LISANDROMARTINEZ', display: 'Lisandro Martínez', nat: 'Argentina', pos: 'Zagueiro', era: '2017–presente' }, // EN Lisandro_Martínez (Newell's)
  { answer: 'VANDERVAART', display: 'Rafael van der Vaart', nat: 'Holanda', pos: 'Meia', era: '2000–2018' }, // EN Rafael_van_der_Vaart (Ajax, 19/04/2000)
  { answer: 'HUNTELAAR', display: 'Klaas-Jan Huntelaar', nat: 'Holanda', pos: 'Atacante', era: '2002–2021' }, // EN Klaas-Jan_Huntelaar (PSV, 23/11/2002)
  { answer: 'KUYT', display: 'Dirk Kuyt', nat: 'Holanda', pos: 'Atacante', era: '1998–2017' }, // EN Dirk_Kuyt (Utrecht, 30/08/1998)
  { answer: 'SCHURRLE', display: 'André Schürrle', nat: 'Alemanha', pos: 'Ponta', era: '2009–2020' }, // EN André_Schürrle (Mainz)
  { answer: 'RAULJIMENEZ', display: 'Raúl Jiménez', nat: 'México', pos: 'Atacante', era: '2011–presente' }, // EN Raúl_Jiménez (América, 09/10/2011)
  { answer: 'MINA', display: 'Yerry Mina', nat: 'Colômbia', pos: 'Zagueiro', era: '2013–presente' }, // EN Yerry_Mina (Deportivo Pasto, 20/03/2013)
  { answer: 'ARAUJO', display: 'Ronald Araújo', nat: 'Uruguai', pos: 'Zagueiro', era: '2016–presente' }, // EN Ronald_Araújo (Rentistas, 24/09/2016)
  { answer: 'UGARTE', display: 'Manuel Ugarte', nat: 'Uruguai', pos: 'Meia', era: '2016–presente' }, // EN Manuel_Ugarte_(footballer) (Fénix, 04/12/2016)
  { answer: 'KUDUS', display: 'Mohammed Kudus', nat: 'Gana', pos: 'Ponta', era: '2018–presente' }, // EN Mohammed_Kudus (Nordsjælland)
  { answer: 'MITOMA', display: 'Kaoru Mitoma', nat: 'Japão', pos: 'Ponta', era: '2020–presente' }, // EN Kaoru_Mitoma (Kawasaki Frontale, J1 2020)
  // Inglaterra / Alemanha / Espanha / Portugal / França / Holanda — geração atual
  { answer: 'RASHFORD', display: 'Marcus Rashford', nat: 'Inglaterra', pos: 'Atacante', era: '2016–presente' }, // EN Marcus_Rashford (25/02/2016)
  { answer: 'ALEXANDERARNOLD', display: 'Trent Alexander-Arnold', nat: 'Inglaterra', pos: 'Lateral', era: '2016–presente' }, // EN Trent_Alexander-Arnold (25/10/2016)
  { answer: 'SANCHO', display: 'Jadon Sancho', nat: 'Inglaterra', pos: 'Ponta', era: '2017–presente' }, // EN Jadon_Sancho (Dortmund, 21/10/2017)
  { answer: 'HAVERTZ', display: 'Kai Havertz', nat: 'Alemanha', pos: 'Atacante', era: '2016–presente' }, // EN Kai_Havertz (Leverkusen, 15/10/2016)
  { answer: 'OLMO', display: 'Dani Olmo', nat: 'Espanha', pos: 'Meia', era: '2015–presente' }, // EN Dani_Olmo (Dinamo Zagreb, 07/02/2015)
  { answer: 'CUBARSI', display: 'Pau Cubarsí', nat: 'Espanha', pos: 'Zagueiro', era: '2024–presente' }, // EN Pau_Cubarsí (Barcelona, 18/01/2024)
  { answer: 'HUIJSEN', display: 'Dean Huijsen', nat: 'Espanha', pos: 'Zagueiro', era: '2023–presente' }, // EN Dean_Huijsen (Juventus, 22/10/2023)
  { answer: 'JOAONEVES', display: 'João Neves', nat: 'Portugal', pos: 'Meia', era: '2023–presente' }, // EN João_Neves (Benfica, 01/01/2023)
  { answer: 'NUNOMENDES', display: 'Nuno Mendes', nat: 'Portugal', pos: 'Lateral', era: '2020–presente' }, // EN Nuno_Mendes_(footballer,_born_2002) (Sporting, 12/06/2020)
  { answer: 'DOUE', display: 'Désiré Doué', nat: 'França', pos: 'Meia', era: '2022–presente' }, // EN Désiré_Doué (Rennes, 07/08/2022)
  { answer: 'OLISE', display: 'Michael Olise', nat: 'França', pos: 'Ponta', era: '2019–presente' }, // EN Michael_Olise (Reading, 12/03/2019)
  { answer: 'BARCOLA', display: 'Bradley Barcola', nat: 'França', pos: 'Ponta', era: '2021–presente' }, // EN Bradley_Barcola (Lyon, 04/11/2021)
  { answer: 'MARCUSTHURAM', display: 'Marcus Thuram', nat: 'França', pos: 'Atacante', era: '2015–presente' }, // EN Marcus_Thuram (Sochaux, 20/03/2015)
  { answer: 'ZAIREEMERY', display: 'Warren Zaïre-Emery', nat: 'França', pos: 'Meia', era: '2022–presente' }, // EN Warren_Zaïre-Emery (PSG, 06/08/2022)
  { answer: 'EKITIKE', display: 'Hugo Ekitike', nat: 'França', pos: 'Atacante', era: '2020–presente' }, // EN Hugo_Ekitike (Reims, 17/10/2020)
  { answer: 'XAVISIMONS', display: 'Xavi Simons', nat: 'Holanda', pos: 'Meia', era: '2021–presente' }, // EN Xavi_Simons (PSG, 10/02/2021)
  { answer: 'ZIRKZEE', display: 'Joshua Zirkzee', nat: 'Holanda', pos: 'Atacante', era: '2019–presente' }, // EN Joshua_Zirkzee (Bayern, 11/12/2019)
  { answer: 'MASTANTUONO', display: 'Franco Mastantuono', nat: 'Argentina', pos: 'Meia', era: '2024–presente' }, // EN Franco_Mastantuono (River, jan/2024)
  { answer: 'NICOPAZ', display: 'Nico Paz', nat: 'Argentina', pos: 'Meia', era: '2023–presente' }, // EN Nico_Paz (Real Madrid, 08/11/2023)
  { answer: 'YILDIZ', display: 'Kenan Yıldız', nat: 'Turquia', pos: 'Ponta', era: '2023–presente' }, // EN Kenan_Yıldız (Juventus, 20/08/2023)
]
