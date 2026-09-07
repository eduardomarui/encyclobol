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

  // ===== Lote 2 (set/2026). `check:` prova a resposta única de cada puzzle =====
  // ===== Posição =====

  // check: Kahn GK ALE (Bayern; 1987) | Schmeichel GK DIN (Man Utd, Man City; 1981) |
  // Seaman GK ING (Arsenal, Man City; 1982) | Koeman ZAG HOL (Ajax, PSV, Barça; 1980).
  // Nacionalidades todas diferentes; todos estrearam nos anos 1980; Man City 2-2; sem Copa.
  { players: ['Kahn', 'Schmeichel', 'Seaman', 'Koeman'], intruder: 'Koeman', cat: 'Posição', rule: 'Os outros são goleiros; Koeman é zagueiro.' },

  // check: Dani Alves LAT BRA (Sevilla, Barça, Juve, PSG; 2001) | Maicon LAT BRA (Inter, Roma; 2001) |
  // Zanetti LAT ARG (Inter; 1992) | Terry ZAG ING (Chelsea; 1998).
  // BRA 2-2; Inter 2-2; estreias 2000s 2 x 1990s 2; sem Copa; todos destros.
  { players: ['Dani Alves', 'Maicon', 'Zanetti', 'Terry'], intruder: 'Terry', cat: 'Posição', rule: 'Os outros são laterais; Terry é zagueiro.' },

  // check: Kroos MEI ALE (Bayern, Real; 2007) | Modrić MEI CRO (Tottenham, Real; 2003) |
  // Xabi Alonso MEI ESP (Liverpool, Real, Bayern; 2000) | Benzema ATA FRA (Lyon, Real; 2004).
  // Todos Real Madrid; Bayern 2-2; todos 2000s; Copa: Kroos 2014 e Alonso 2010 (2-2); nacionalidades distintas.
  { players: ['Kroos', 'Modrić', 'Xabi Alonso', 'Benzema'], intruder: 'Benzema', cat: 'Posição', rule: 'Os outros são meias; Benzema é atacante.' },

  // check: Van Nistelrooy CA HOL (PSV, Man Utd, Real; 1993) | Crespo CA ARG (Parma, Lazio, Inter, Chelsea, Milan; 1993) |
  // Vieri CA ITA (Juve, Lazio, Inter, Milan; 1991) | Overmars PONTA HOL (Ajax, Arsenal, Barça; 1990).
  // HOL 2-2; Inter/Lazio/Milan 2-2; todos anos 1990; sem Copa.
  { players: ['Van Nistelrooy', 'Crespo', 'Vieri', 'Overmars'], intruder: 'Overmars', cat: 'Posição', rule: 'Os outros são centroavantes; Overmars é ponta.' },

  // check: Thuram ZAG FRA (Parma, Juve, Barça; 1990) | Desailly ZAG FRA (Marseille, Milan, Chelsea; 1986) |
  // Blanc ZAG FRA (Marseille, Barça, Inter, Man Utd; 1983) | Lloris GK FRA (Lyon, Tottenham; 2005).
  // Todos franceses campeões mundiais; Marseille 2-2; Barça 2-2; década de estreia isola só Lloris (reforça).
  { players: ['Thuram', 'Desailly', 'Blanc', 'Lloris'], intruder: 'Lloris', cat: 'Posição', rule: 'Os outros são zagueiros; Lloris é goleiro.' },

  // check: Robben PONTA HOL (PSV, Chelsea, Real, Bayern; 2000) | Bale PONTA GAL (Tottenham, Real; 2006) |
  // Di María PONTA ARG (Benfica, Real, Man Utd, PSG; 2005) | Xabi Alonso MEI ESP (Liverpool, Real, Bayern; 2000).
  // Todos Real Madrid; todos 2000s; Bayern 2-2; Copa: Di María 2022 e Alonso 2010 (2-2); canhotos 3 x Alonso (reforça).
  { players: ['Robben', 'Bale', 'Di María', 'Xabi Alonso'], intruder: 'Xabi Alonso', cat: 'Posição', rule: 'Os outros são pontas; Xabi Alonso é meia.' },

  // check: Alisson GK BRA (Roma, Liverpool; 2013) | Courtois GK BEL (Chelsea, Atlético, Real; 2011) |
  // Donnarumma GK ITA (Milan, PSG; 2015) | Salah PONTA EGI (Chelsea, Roma, Liverpool; 2010).
  // Nacionalidades distintas; todos 2010s; Liverpool 2-2; Roma 2-2; Chelsea 2-2; sem Copa.
  { players: ['Alisson', 'Courtois', 'Donnarumma', 'Salah'], intruder: 'Salah', cat: 'Posição', rule: 'Os outros são goleiros; Salah é ponta.' },

  // check: Materazzi ZAG ITA (Perugia, Inter; anos 1990) | Nesta ZAG ITA (Lazio, Milan; 1993) |
  // Cannavaro ZAG ITA (Parma, Inter, Juve, Real; 1992) | Totti ATA ITA (Roma; 1993).
  // Todos italianos campeões de 2006, todos anos 1990; Inter 2-2; nenhum clube com 3.
  { players: ['Materazzi', 'Nesta', 'Cannavaro', 'Totti'], intruder: 'Totti', cat: 'Posição', rule: 'Os outros são zagueiros; Totti é atacante.' },

  // check: Busquets MEI ESP (Barça; 2008) | Fàbregas MEI ESP (Arsenal, Barça, Chelsea; 2003) |
  // Iniesta MEI ESP (Barça; 2002) | Piqué ZAG ESP (Man Utd, Barça; 2004).
  // Todos espanhóis do Barça, campeões de 2010, estreia nos anos 2000; Euro 2008: Fàbregas e Iniesta (2-2).
  { players: ['Busquets', 'Fàbregas', 'Iniesta', 'Piqué'], intruder: 'Piqué', cat: 'Posição', rule: 'Os outros são meias; Piqué é zagueiro.' },

  // check: Agüero ATA ARG (Atlético, Man City, Barça; 2003) | Higuaín ATA ARG (River, Real, Napoli, Juve; 2004) |
  // Tévez ATA ARG (Boca, Corinthians, West Ham, Man Utd, Man City, Juve; 2001) | Mascherano VOL ARG (River, Corinthians, West Ham, Liverpool, Barça; 2003).
  // Todos argentinos, todos 2000s, sem Copa; City/Juve/Corinthians/West Ham/Barça/River todos 2-2.
  { players: ['Agüero', 'Higuaín', 'Tévez', 'Mascherano'], intruder: 'Mascherano', cat: 'Posição', rule: 'Os outros são atacantes; Mascherano é volante.' },

  // ===== Nacionalidade =====

  // check: Modrić MEI CRO (Tottenham, Real, Milan; 2003) | Rakitić MEI CRO (Sevilla, Barça; 2005) |
  // Boban MEI CRO (Dinamo, Milan; 1985) | Nedvěd MEI TCH (Lazio, Juve; 1991).
  // Todos meias; Milan 2-2; décadas 2000s 2 / 80s 1 / 90s 1; sem Copa.
  { players: ['Modrić', 'Rakitić', 'Boban', 'Nedvěd'], intruder: 'Nedvěd', cat: 'Nacionalidade', rule: 'Os outros são croatas; Nedvěd é tcheco.' },

  // check: Van Basten ATA HOL (Ajax, Milan; 1981) | Kluivert ATA HOL (Ajax, Milan, Barça; 1994) |
  // Van Persie ATA HOL (Feyenoord, Arsenal, Man Utd; 2001) | Larsson ATA SUE (Feyenoord, Celtic, Barça, Man Utd; 1992).
  // Todos atacantes; Ajax/Milan/Barça/Feyenoord/Man Utd todos 2-2; décadas 80/90/2000/90; sem Copa.
  { players: ['Van Basten', 'Kluivert', 'Van Persie', 'Larsson'], intruder: 'Larsson', cat: 'Nacionalidade', rule: 'Os outros são holandeses; Larsson é sueco.' },

  // check: Yekini ATA NIG (Vitória Setúbal; 1984) | Kanu ATA NIG (Ajax, Inter, Arsenal; 1993) |
  // Osimhen ATA NIG (Lille, Napoli; 2015) | Drogba ATA CIV (Marseille, Chelsea; 1998).
  // Todos atacantes; nenhum clube em comum; décadas 80/90/2010/90; sem Copa.
  { players: ['Yekini', 'Kanu', 'Osimhen', 'Drogba'], intruder: 'Drogba', cat: 'Nacionalidade', rule: 'Os outros são nigerianos; Drogba é marfinense.' },

  // check: Zamorano ATA CHI (Sevilla, Real, Inter; 1985) | Salas ATA CHI (River, Lazio, Juve; 1993) |
  // Alexis ATA CHI (River, Barça, Arsenal, Man Utd, Inter; 2005) | Asprilla ATA COL (Parma, Newcastle; 1988).
  // Todos atacantes; Inter 2-2; River 2-2; décadas 80/90/2000/80; sem Copa.
  { players: ['Zamorano', 'Salas', 'Alexis', 'Asprilla'], intruder: 'Asprilla', cat: 'Nacionalidade', rule: 'Os outros são chilenos; Asprilla é colombiano.' },

  // check: Rui Costa MEI POR (Benfica, Fiorentina, Milan; 1990) | Deco MEI POR (Porto, Barça, Chelsea; 1997) |
  // Moutinho MEI POR (Sporting, Porto, Monaco; 2004) | Kaká MEI BRA (São Paulo, Milan, Real; 2001).
  // Todos meias; Milan 2-2; Porto 2-2; décadas 90/90/2000/2000; Copa só Kaká (reforça).
  { players: ['Rui Costa', 'Deco', 'Moutinho', 'Kaká'], intruder: 'Kaká', cat: 'Nacionalidade', rule: 'Os outros são portugueses; Kaká é brasileiro.' },

  // check: Hugo Sánchez ATA MEX (Atlético, Real; 1976) | Blanco ATA MEX (América, Valladolid; 1992) |
  // Chicharito ATA MEX (Guadalajara, Man Utd, Real, Leverkusen; 2006) | Salas ATA CHI (River, Lazio, Juve; 1993).
  // Todos atacantes; Real 2-2; décadas 70/90/2000/90; sem Copa.
  { players: ['Hugo Sánchez', 'Blanco', 'Chicharito', 'Salas'], intruder: 'Salas', cat: 'Nacionalidade', rule: 'Os outros são mexicanos; Salas é chileno.' },

  // check: Kompany ZAG BEL (Hamburgo, Man City; 2003) | Hazard PONTA BEL (Lille, Chelsea, Real; 2007) |
  // De Bruyne MEI BEL (Chelsea, Man City; 2008) | Van Dijk ZAG HOL (Celtic, Southampton, Liverpool; 2011).
  // Zagueiros 2-2; City 2-2; Chelsea 2-2; década isola só Van Dijk (reforça); sem Copa.
  { players: ['Kompany', 'Hazard', 'De Bruyne', 'Van Dijk'], intruder: 'Van Dijk', cat: 'Nacionalidade', rule: 'Os outros são belgas; Van Dijk é holandês.' },

  // check: Lewandowski ATA POL (Dortmund, Bayern, Barça; 2006) | Boniek MEI POL (Widzew, Juve, Roma; 1975) |
  // Lato PONTA POL (Stal Mielec; 1971) | Hagi MEI ROM (Steaua, Real, Brescia, Barça, Galatasaray; 1982).
  // Meias 2-2; Barça 2-2; décadas 2000/70/70/80 (2-1-1); sem Copa.
  { players: ['Lewandowski', 'Boniek', 'Lato', 'Hagi'], intruder: 'Hagi', cat: 'Nacionalidade', rule: 'Os outros são poloneses; Hagi é romeno.' },

  // check: Vidić ZAG SER (Man Utd, Inter; 2000) | Mihajlović ZAG SER (Roma, Sampdoria, Lazio, Inter; 1990) |
  // Vlahović ATA SER (Fiorentina, Juve; 2016) | Modrić MEI CRO (Tottenham, Real, Milan; 2003).
  // Zagueiros 2-2; Inter 2-2; décadas 2000/90/2010/2000 (2-1-1); sem Copa.
  { players: ['Vidić', 'Mihajlović', 'Vlahović', 'Modrić'], intruder: 'Modrić', cat: 'Nacionalidade', rule: 'Os outros são sérvios; Modrić é croata.' },

  // check: Valderrama MEI COL (Montpellier, Valladolid; 1985) | Asprilla ATA COL (Parma, Newcastle; 1988) |
  // Cuadrado PONTA COL (Fiorentina, Chelsea, Juve, Inter; 2008) | Recoba MEI URU (Nacional, Inter; 1994).
  // Meias 2-2; Inter 2-2; décadas 80/80/2000/90 (2-1-1); sem Copa.
  { players: ['Valderrama', 'Asprilla', 'Cuadrado', 'Recoba'], intruder: 'Recoba', cat: 'Nacionalidade', rule: 'Os outros são colombianos; Recoba é uruguaio.' },

  // ===== Clube (o intruso nunca passou pelo clube, nem por empréstimo) =====

  // check: Romário ATA BRA (Vasco, PSV, Barça, Flamengo; 1985) | Bebeto ATA BRA (Flamengo, Vasco, Deportivo; 1983) |
  // Adriano ATA BRA (Flamengo, Inter, Parma; 2000) | Careca ATA BRA (Guarani, São Paulo, Napoli; 1978).
  // Todos atacantes brasileiros; Vasco 2-2; Copa: Romário e Bebeto 1994 (2-2); décadas 80/80/2000/70.
  { players: ['Romário', 'Bebeto', 'Adriano', 'Careca'], intruder: 'Careca', cat: 'Clube', rule: 'Os outros jogaram no Flamengo; Careca nunca.' },

  // check: Sócrates MEI BRA (Corinthians, Fiorentina, Flamengo; 1974) | Rivaldo MEI BRA (Corinthians, Palmeiras, Barça, Milan; 1991) |
  // Dunga MEI BRA (Internacional, Corinthians, Vasco, Fiorentina; 1983) | Zico MEI BRA (Flamengo, Udinese; 1971).
  // Todos meias brasileiros; Fiorentina 2-2; Flamengo 2-2; Copa: Rivaldo 2002 e Dunga 1994 (2-2); anos 1970: 2-2.
  { players: ['Sócrates', 'Rivaldo', 'Dunga', 'Zico'], intruder: 'Zico', cat: 'Clube', rule: 'Os outros jogaram no Corinthians; Zico nunca.' },

  // check: Kaká MEI BRA (São Paulo, Milan, Real; 2001) | Raí MEI BRA (São Paulo, PSG; 1985) |
  // Leonardo MEI BRA (Flamengo, São Paulo, PSG, Milan, Kashima; 1987) | Zico MEI BRA (Flamengo, Udinese, Kashima; 1971).
  // Todos meias brasileiros; Milan 2-2; PSG 2-2; Flamengo 2-2; Kashima 2-2; Copa: Kaká, Raí, Leonardo x Zico (reforça).
  { players: ['Kaká', 'Raí', 'Leonardo', 'Zico'], intruder: 'Zico', cat: 'Clube', rule: 'Os outros jogaram no São Paulo; Zico nunca.' },

  // check: Rivaldo MEI BRA (Palmeiras, Deportivo, Barça, Milan; 1991) | Marcos GK BRA (Palmeiras; 1992) |
  // Zé Roberto MEI BRA (Real, Flamengo, Leverkusen, Bayern, Palmeiras; 1991) | Careca ATA BRA (Guarani, São Paulo, Napoli; 1978).
  // Posições 2-1-1; Copa: Rivaldo e Marcos 2002 (2-2); todos os 3 dos anos 1990 x Careca (reforça); sem clube com 3.
  { players: ['Rivaldo', 'Marcos', 'Zé Roberto', 'Careca'], intruder: 'Careca', cat: 'Clube', rule: 'Os outros jogaram no Palmeiras; Careca nunca.' },

  // check: Romário ATA BRA (Vasco, PSV, Barça, Flamengo; 1985) | Bebeto ATA BRA (Flamengo, Vasco, Deportivo; 1983) |
  // Edmundo ATA BRA (Vasco, Palmeiras, Flamengo, Fiorentina; 1992) | Zico MEI BRA (Flamengo, Udinese; 1971).
  // Flamengo: os 4 (0-4, não isola); Copa: Romário e Bebeto (2-2); posição e década isolam só Zico (reforçam).
  { players: ['Romário', 'Bebeto', 'Edmundo', 'Zico'], intruder: 'Zico', cat: 'Clube', rule: 'Os outros jogaram no Vasco; Zico nunca.' },

  // check: Tévez ATA ARG (Boca, Corinthians, Man Utd, Man City, Juve; 2001) | Palermo ATA ARG (Boca, Villarreal; 1992) |
  // Batistuta ATA ARG (Boca, Fiorentina, Roma, Inter; 1988) | Crespo ATA ARG (River, Parma, Lazio, Inter, Chelsea, Milan; 1993).
  // Todos atacantes argentinos sem Copa; Inter 2-2; décadas 2000/90/80/90 (2-1-1). (Maradona ficou de fora: a Copa
  // de 1986 o isolaria; Riquelme/Verón ficaram de fora: 3 meias isolariam o atacante.)
  { players: ['Tévez', 'Palermo', 'Batistuta', 'Crespo'], intruder: 'Crespo', cat: 'Clube', rule: 'Os outros jogaram no Boca Juniors; Crespo nunca.' },

  // check: Adriano ATA BRA (Flamengo, Inter, Parma; 2000) | Maicon LAT BRA (Inter, Roma, Man City; 2001) |
  // Coutinho MEI BRA (Inter, Liverpool, Barça; 2009) | Neymar ATA BRA (Santos, Barça, PSG; 2009).
  // Todos brasileiros dos anos 2000, sem Copa; atacantes 2-2; Barça 2-2; nenhum clube com 3.
  { players: ['Adriano', 'Maicon', 'Coutinho', 'Neymar'], intruder: 'Neymar', cat: 'Clube', rule: 'Os outros jogaram na Inter de Milão; Neymar nunca.' },

  // check: Zidane MEI FRA (Bordeaux, Juve, Real; 1989) | Platini MEI FRA (Saint-Étienne, Juve; 1972) |
  // Trezeguet ATA FRA (Monaco, Juve; 1994) | Benzema ATA FRA (Lyon, Real; 2004).
  // Todos franceses; meias 2-2; Real 2-2; Copa: Zidane e Trezeguet 1998 (2-2); décadas 80/70/90/2000.
  { players: ['Zidane', 'Platini', 'Trezeguet', 'Benzema'], intruder: 'Benzema', cat: 'Clube', rule: 'Os outros jogaram na Juventus; Benzema nunca.' },

  // check: Ronaldo ATA BRA (Cruzeiro, PSV, Barça, Inter, Real, Milan, Corinthians; 1993) | Roberto Carlos LAT BRA (Palmeiras, Inter, Real, Fenerbahçe, Corinthians; 1992) |
  // Kaká MEI BRA (São Paulo, Milan, Real; 2001) | Romário ATA BRA (Vasco, PSV, Barça, Flamengo; 1985).
  // Todos brasileiros campeões mundiais; atacantes 2-2; Barça 2-2; PSV 2-2; Milan 2-2; Corinthians 2-2; Inter 2-2; décadas 90/90/2000/80.
  { players: ['Ronaldo', 'Roberto Carlos', 'Kaká', 'Romário'], intruder: 'Romário', cat: 'Clube', rule: 'Os outros jogaram no Real Madrid; Romário nunca.' },

  // ===== Era =====

  // check: Pelé ATA BRA (Santos; 1956) | Garrincha PONTA BRA (Botafogo; 1953) |
  // Zagallo PONTA BRA (Flamengo, Botafogo; 1950) | Tostão ATA BRA (Cruzeiro, Vasco; 1963).
  // Todos brasileiros campeões mundiais; posições 2-2; Botafogo 2-2; Copa 1970: Pelé e Tostão (2-2); bicampeões 1958/62: os 3 x Tostão (reforça).
  { players: ['Pelé', 'Garrincha', 'Zagallo', 'Tostão'], intruder: 'Tostão', cat: 'Era', rule: 'Os outros estrearam nos anos 1950; Tostão estreou em 1963.' },

  // check: Rivelino MEI BRA (Corinthians, Fluminense; 1965) | Tostão ATA BRA (Cruzeiro, Vasco; 1963) |
  // Carlos Alberto LAT BRA (Fluminense, Santos, Flamengo; 1963) | Zico MEI BRA (Flamengo, Udinese; 1971).
  // Todos brasileiros; meias 2-2; Fluminense 2-2; Flamengo 2-2; campeões de 1970: os 3 x Zico (reforça).
  { players: ['Rivelino', 'Tostão', 'Carlos Alberto', 'Zico'], intruder: 'Zico', cat: 'Era', rule: 'Os outros estrearam nos anos 1960; Zico estreou em 1971.' },

  // check: Sócrates MEI BRA (Corinthians, Fiorentina, Flamengo; 1974) | Falcão MEI BRA (Internacional, Roma, São Paulo; 1972) |
  // Roberto Dinamite ATA BRA (Vasco, Barcelona; 1971) | Romário ATA BRA (Vasco, PSV, Barça, Flamengo; 1985).
  // Todos brasileiros; posições 2-2; Vasco 2-2; Flamengo 2-2; Barça 2-2; Itália: Sócrates e Falcão (2-2); Copa só Romário (reforça).
  { players: ['Sócrates', 'Falcão', 'Roberto Dinamite', 'Romário'], intruder: 'Romário', cat: 'Era', rule: 'Os outros estrearam nos anos 1970; Romário estreou em 1985.' },

  // check: Mancini ATA ITA (Bologna, Sampdoria, Lazio; 1981) | Vialli ATA ITA (Cremonese, Sampdoria, Juve, Chelsea; 1980) |
  // Schillaci ATA ITA (Messina, Juve, Inter; 1982) | Totti ATA ITA (Roma; 1993).
  // Todos atacantes italianos; Sampdoria 2-2; Juve 2-2; Copa só Totti 2006 (reforça).
  { players: ['Mancini', 'Vialli', 'Schillaci', 'Totti'], intruder: 'Totti', cat: 'Era', rule: 'Os outros estrearam nos anos 1980; Totti estreou em 1993.' },

  // check: Raúl ATA ESP (Real, Schalke; 1994) | Guti MEI ESP (Real, Beşiktaş; 1995) |
  // Casillas GK ESP (Real, Porto; 1999) | Ramos ZAG ESP (Sevilla, Real, PSG; 2004).
  // Todos espanhóis do Real Madrid; posições todas diferentes; Copa: Casillas e Ramos 2010 (2-2).
  { players: ['Raúl', 'Guti', 'Casillas', 'Ramos'], intruder: 'Ramos', cat: 'Era', rule: 'Os outros estrearam nos anos 1990; Ramos estreou em 2004.' },

  // check: Neuer GK ALE (Schalke, Bayern; 2006) | Kroos MEI ALE (Bayern, Real; 2007) |
  // Müller ATA ALE (Bayern; 2008) | Kimmich LAT ALE (Stuttgart, Leipzig, Bayern; 2013).
  // Todos alemães do Bayern; posições todas diferentes; Copa 2014: os 3 x Kimmich (reforça).
  { players: ['Neuer', 'Kroos', 'Müller', 'Kimmich'], intruder: 'Kimmich', cat: 'Era', rule: 'Os outros estrearam nos anos 2000; Kimmich estreou em 2013.' },

  // check: Gerd Müller ATA ALE (Bayern; 1963) | Cruyff ATA HOL (Ajax, Barça; 1964) |
  // Riva ATA ITA (Cagliari; 1962) | Kempes ATA ARG (Instituto, Rosario Central, Valencia; 1973).
  // Todos atacantes; nacionalidades distintas; sem clube em comum; Copa: Müller 1974 e Kempes 1978 (2-2).
  { players: ['Gerd Müller', 'Cruyff', 'Riva', 'Kempes'], intruder: 'Kempes', cat: 'Era', rule: 'Os outros estrearam nos anos 1960; Kempes estreou em 1973.' },

  // check: Hagi MEI ROM (Steaua, Real, Barça, Galatasaray; 1982) | Laudrup MEI DIN (Lazio, Juve, Barça, Real, Ajax; 1981) |
  // Boban MEI CRO (Dinamo, Milan; 1985) | Nedvěd MEI TCH (Sparta, Lazio, Juve; 1991).
  // Todos meias; nacionalidades distintas; Real 2-2; Barça 2-2; Juve 2-2; Lazio 2-2; sem Copa.
  { players: ['Hagi', 'Laudrup', 'Boban', 'Nedvěd'], intruder: 'Nedvěd', cat: 'Era', rule: 'Os outros estrearam nos anos 1980; Nedvěd estreou em 1991.' },

  // check: Cristiano Ronaldo ATA POR (Sporting, Man Utd, Real, Juve; 2002) | Messi ATA ARG (Barça, PSG; 2004) |
  // Kaká MEI BRA (São Paulo, Milan, Real; 2001) | Ronaldinho MEI BRA (Grêmio, PSG, Barça, Milan; 1998).
  // Atacantes 2-2; BRA 2-2; Real 2-2; Barça 2-2; Milan 2-2; PSG 2-2; Copa: Kaká e Ronaldinho 2002 (2-2); todos Bola de Ouro.
  { players: ['Cristiano Ronaldo', 'Messi', 'Kaká', 'Ronaldinho'], intruder: 'Ronaldinho', cat: 'Era', rule: 'Os outros estrearam nos anos 2000; Ronaldinho estreou em 1998.' },

  // check: Buffon GK ITA (Parma, Juve, PSG; 1995) | Casillas GK ESP (Real, Porto; 1999) |
  // Čech GK TCH (Rennes, Chelsea, Arsenal; 1999) | Courtois GK BEL (Chelsea, Atlético, Real; 2011).
  // Todos goleiros; nacionalidades distintas; Chelsea 2-2; Real 2-2; Copa: Buffon e Casillas (2-2).
  { players: ['Buffon', 'Casillas', 'Čech', 'Courtois'], intruder: 'Courtois', cat: 'Era', rule: 'Os outros estrearam nos anos 1990; Courtois estreou em 2011.' },
]
