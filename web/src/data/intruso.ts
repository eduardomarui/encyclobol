// Puzzles de "O Intruso": 4 craques, 3 compartilham um traço, 1 não.
// Cada puzzle tem resposta ÚNICA: só um traço divide 3-contra-1, e os
// demais traços nunca isolam um jogador diferente (no máximo reforçam).
// `cat` é o tipo do elo que liga os outros três (usado na 2ª etapa).
// `alsoCat` lista outros elos IGUALMENTE verdadeiros para os mesmos três
// (ex.: Maldini/Baresi/Nesta são italianos E do Milan); a 2ª etapa aceita
// qualquer um deles. Nunca isolam outro jogador: o intruso é sempre o mesmo.

export type IntrusoCat = 'Posição' | 'Nacionalidade' | 'Clube' | 'Era'

export type IntrusoPuzzle = {
  players: string[]
  intruder: string
  cat: IntrusoCat
  rule: string
  alsoCat?: IntrusoCat[]
}

export const intruso: IntrusoPuzzle[] = [
  {
    players: ['Cafu', 'Roberto Carlos', 'Lahm', 'Nesta'],
    intruder: 'Nesta',
    cat: 'Posição',
    rule: 'Os outros são laterais; Nesta é zagueiro.',
  },
  {
    players: ['Buffon', 'Casillas', 'Čech', 'Cannavaro'],
    intruder: 'Cannavaro',
    cat: 'Posição',
    rule: 'Os outros são goleiros; Cannavaro é zagueiro.',
  },
  {
    players: ['Maldini', 'Baresi', 'Nesta', 'Puyol'],
    intruder: 'Puyol',
    cat: 'Nacionalidade',
    rule: 'Os outros são zagueiros italianos e jogaram no Milan; Puyol não.',
    alsoCat: ['Clube'],
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
    rule: 'Os outros surgiram no século 21 e jogaram no PSG; Pelé é dos anos 1950 e nunca jogou lá.',
    alsoCat: ['Clube'],
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
    rule: 'Os outros são atacantes que estrearam nos anos 1990; Maldini é zagueiro e estreou em 1985.',
    alsoCat: ['Era'],
  },
  {
    players: ['Zico', 'Platini', 'Maradona', 'Buffon'],
    intruder: 'Buffon',
    cat: 'Posição',
    rule: 'Os outros eram meias e estrearam nos anos 1970; Buffon é goleiro e estreou em 1995.',
    alsoCat: ['Era'],
  },
  {
    players: ['Casillas', 'Buffon', 'Neuer', 'Ramos'],
    intruder: 'Ramos',
    cat: 'Posição',
    rule: 'Os outros são goleiros; Ramos é zagueiro.',
  },
  {
    players: ['Drogba', "Eto'o", 'Weah', 'Maldini'],
    intruder: 'Maldini',
    cat: 'Posição',
    rule: 'Os outros são atacantes africanos que jogaram no Chelsea; Maldini é zagueiro italiano.',
    alsoCat: ['Nacionalidade', 'Clube'],
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
    rule: 'Os outros são centroavantes uruguaios; Salah é ponta egípcio.',
    alsoCat: ['Posição'],
  },
  {
    players: ['Lewandowski', 'Lahm', 'Neuer', 'Drogba'],
    intruder: 'Drogba',
    cat: 'Clube',
    rule: 'Os outros jogaram no Bayern de Munique e estrearam nos anos 2000; Drogba nunca jogou lá e estreou ainda nos anos 1990.',
    alsoCat: ['Era'],
  },
  {
    players: ['Salah', 'Sterling', 'Robben', 'Lewandowski'],
    intruder: 'Lewandowski',
    cat: 'Posição',
    rule: 'Os outros são pontas e jogaram no Chelsea; Lewandowski é centroavante e nunca jogou lá.',
    alsoCat: ['Clube'],
  },
  {
    players: ['Pirlo', 'Xavi', 'Guardiola', 'Cannavaro'],
    intruder: 'Cannavaro',
    cat: 'Posição',
    rule: 'Os outros eram meias; Cannavaro é zagueiro.',
  },
  {
    players: ['Messi', 'Crespo', 'Batistuta', 'Suárez'],
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
    rule: 'Os outros jogaram por seleções africanas; Lukaku é belga.',
  },

  // ===== Expansão =====
  { players: ['Buffon', 'Casillas', 'Neuer', 'Cafu'], intruder: 'Cafu', cat: 'Posição', rule: 'Os outros são goleiros; Cafu é lateral.' },
  { players: ['Ronaldo', 'Careca', 'Bebeto', 'Figo'], intruder: 'Figo', cat: 'Nacionalidade', rule: 'Os outros são atacantes brasileiros; Figo é ponta português.', alsoCat: ['Posição'] },
  { players: ['Crespo', 'Batistuta', 'Lautaro', 'Forlán'], intruder: 'Forlán', cat: 'Nacionalidade', rule: 'Os outros são argentinos; Forlán é uruguaio.' },
  { players: ['Pirlo', 'Riquelme', 'Xavi', 'Buffon'], intruder: 'Buffon', cat: 'Posição', rule: 'Os outros eram meias; Buffon é goleiro.' },
  { players: ['Osimhen', 'Haaland', 'Kane', 'Van Dijk'], intruder: 'Van Dijk', cat: 'Posição', rule: 'Os outros são centroavantes; Van Dijk é zagueiro.' },
  { players: ['Zidane', 'Henry', 'Platini', 'Maldini'], intruder: 'Maldini', cat: 'Nacionalidade', rule: 'Os outros são franceses e jogaram na Juventus; Maldini não.', alsoCat: ['Clube'] },
  { players: ['Yashin', 'Banks', 'Zoff', 'Beckenbauer'], intruder: 'Beckenbauer', cat: 'Posição', rule: 'Os outros são goleiros; Beckenbauer é zagueiro.' },
  { players: ['Vinícius', 'Rodrygo', 'Raphinha', 'Messi'], intruder: 'Messi', cat: 'Nacionalidade', rule: 'Os outros são brasileiros que estrearam no fim dos anos 2010; Messi é argentino e estreou em 2004.', alsoCat: ['Era'] },
  { players: ['Robben', 'Figo', 'Bale', 'Shearer'], intruder: 'Shearer', cat: 'Posição', rule: 'Os outros são pontas e jogaram no Real Madrid; Shearer não.', alsoCat: ['Clube'] },
  { players: ['Totti', 'Del Piero', 'Toni', 'Raúl'], intruder: 'Raúl', cat: 'Nacionalidade', rule: 'Os outros são italianos; Raúl é espanhol.' },
  { players: ['Klose', 'Völler', 'Bierhoff', 'Cruyff'], intruder: 'Cruyff', cat: 'Nacionalidade', rule: 'Os outros são alemães; Cruyff é holandês.' },
  { players: ['Cafu', 'Roberto Carlos', 'Maicon', 'Gattuso'], intruder: 'Gattuso', cat: 'Posição', rule: 'Os outros são laterais brasileiros; Gattuso é volante italiano.', alsoCat: ['Nacionalidade'] },
  { players: ['Neuer', 'Courtois', 'Ochoa', 'Vinícius'], intruder: 'Vinícius', cat: 'Posição', rule: 'Os outros são goleiros; Vinícius é atacante.' },
  { players: ['Xavi', 'Puyol', 'Casillas', 'Cannavaro'], intruder: 'Cannavaro', cat: 'Nacionalidade', rule: 'Os outros são espanhóis; Cannavaro é italiano.' },

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
  // Xabi Alonso MEI ESP (Liverpool, Real, Bayern; 1999) | Benzema ATA FRA (Lyon, Real; 2005).
  // Todos Real Madrid; Bayern 2-2; década isola Xabi Alonso (1999, outro tema); Copa: Kroos 2014 e Alonso 2010 (2-2); nacionalidades distintas.
  { players: ['Kroos', 'Modrić', 'Xabi Alonso', 'Benzema'], intruder: 'Benzema', cat: 'Posição', rule: 'Os outros são meias; Benzema é atacante.' },

  // check: Van Nistelrooy CA HOL (PSV, Man Utd, Real; 1993) | Crespo CA ARG (Parma, Lazio, Inter, Chelsea, Milan; 1993) |
  // Vieri CA ITA (Juve, Lazio, Inter, Milan; 1991) | Overmars PONTA HOL (Ajax, Arsenal, Barça; 1990).
  // HOL 2-2; Inter/Lazio/Milan 2-2; todos anos 1990; sem Copa.
  { players: ['Van Nistelrooy', 'Crespo', 'Vieri', 'Overmars'], intruder: 'Overmars', cat: 'Posição', rule: 'Os outros são centroavantes; Overmars é ponta.' },

  // check: Thuram ZAG FRA (Parma, Juve, Barça; 1991) | Desailly ZAG FRA (Marseille, Milan, Chelsea; 1986) |
  // Blanc ZAG FRA (Marseille, Barça, Inter, Man Utd; 1983) | Lloris GK FRA (Lyon, Tottenham; 2005).
  // Todos franceses campeões mundiais; Marseille 2-2; Barça 2-2; década de estreia isola só Lloris (reforça).
  { players: ['Thuram', 'Desailly', 'Blanc', 'Lloris'], intruder: 'Lloris', cat: 'Posição', rule: 'Os outros são zagueiros; Lloris é goleiro.' },

  // check: Robben PONTA HOL (PSV, Chelsea, Real, Bayern; 2000) | Bale PONTA GAL (Tottenham, Real; 2006) |
  // Di María PONTA ARG (Benfica, Real, Man Utd, PSG; 2005) | Xabi Alonso MEI ESP (Liverpool, Real, Bayern; 1999).
  // Todos Real Madrid; década isola só Xabi Alonso (reforça); Bayern 2-2; Copa: Di María 2022 e Alonso 2010 (2-2); canhotos 3 x Alonso (reforça).
  { players: ['Robben', 'Bale', 'Di María', 'Xabi Alonso'], intruder: 'Xabi Alonso', cat: 'Posição', rule: 'Os outros são pontas; Xabi Alonso é meia.' },

  // check: Alisson GK BRA (Roma, Liverpool; 2013) | Courtois GK BEL (Chelsea, Atlético, Real; 2009) |
  // Donnarumma GK ITA (Milan, PSG; 2015) | Salah PONTA EGI (Chelsea, Roma, Liverpool; 2010).
  // Nacionalidades distintas; décadas 2010s 3 x Courtois 2009 (outro tema); Liverpool 2-2; Roma 2-2; Chelsea 2-2; sem Copa.
  { players: ['Alisson', 'Courtois', 'Donnarumma', 'Salah'], intruder: 'Salah', cat: 'Posição', rule: 'Os outros são goleiros; Salah é ponta.' },

  // check: Materazzi ZAG ITA (Perugia, Inter; 1995) | Nesta ZAG ITA (Lazio, Milan; 1993) |
  // Cannavaro ZAG ITA (Parma, Inter, Juve, Real; 1993) | Totti ATA ITA (Roma; 1993).
  // Todos italianos campeões de 2006, todos anos 1990; Inter 2-2; nenhum clube com 3.
  { players: ['Materazzi', 'Nesta', 'Cannavaro', 'Totti'], intruder: 'Totti', cat: 'Posição', rule: 'Os outros são zagueiros; Totti é atacante.' },

  // check: Busquets MEI ESP (Barça; 2008) | Fàbregas MEI ESP (Arsenal, Barça, Chelsea; 2003) |
  // Iniesta MEI ESP (Barça; 2002) | Piqué ZAG ESP (Man Utd, Barça; 2004).
  // Todos espanhóis do Barça, campeões de 2010, estreia nos anos 2000; Euro 2008: Fàbregas e Iniesta (2-2).
  { players: ['Busquets', 'Fàbregas', 'Iniesta', 'Piqué'], intruder: 'Piqué', cat: 'Posição', rule: 'Os outros são meias; Piqué é zagueiro.' },

  // check: Agüero ATA ARG (Atlético, Man City, Barça; 2003) | Higuaín ATA ARG (River, Real, Napoli, Juve; 2005) |
  // Tévez ATA ARG (Boca, Corinthians, West Ham, Man Utd, Man City, Juve; 2001) | Mascherano VOL ARG (River, Corinthians, West Ham, Liverpool, Barça; 2003).
  // Todos argentinos, todos 2000s, sem Copa; City/Juve/Corinthians/West Ham/Barça/River todos 2-2.
  { players: ['Agüero', 'Higuaín', 'Tévez', 'Mascherano'], intruder: 'Mascherano', cat: 'Posição', rule: 'Os outros são atacantes; Mascherano é volante.' },

  // ===== Nacionalidade =====

  // check: Modrić MEI CRO (Tottenham, Real, Milan; 2003) | Rakitić MEI CRO (Sevilla, Barça; 2005) |
  // Boban MEI CRO (Dinamo, Milan; 1985) | Nedvěd MEI TCH (Lazio, Juve; 1991).
  // Todos meias; Milan 2-2; décadas 2000s 2 / 80s 1 / 90s 1; sem Copa.
  { players: ['Modrić', 'Rakitić', 'Boban', 'Nedvěd'], intruder: 'Nedvěd', cat: 'Nacionalidade', rule: 'Os outros são croatas; Nedvěd é tcheco.' },

  // check: Van Basten ATA HOL (Ajax, Milan; 1982) | Kluivert ATA HOL (Ajax, Milan, Barça; 1994) |
  // Van Persie ATA HOL (Feyenoord, Arsenal, Man Utd; 2001) | Larsson ATA SUE (Feyenoord, Celtic, Barça, Man Utd; 1989).
  // Todos atacantes; Ajax/Milan/Barça/Feyenoord/Man Utd todos 2-2; décadas 80/90/2000/80; sem Copa.
  { players: ['Van Basten', 'Kluivert', 'Van Persie', 'Larsson'], intruder: 'Larsson', cat: 'Nacionalidade', rule: 'Os outros são holandeses; Larsson é sueco.' },

  // check: Yekini ATA NIG (Vitória Setúbal; 1984) | Kanu ATA NIG (Ajax, Inter, Arsenal; 1992) |
  // Osimhen ATA NIG (Lille, Napoli; 2017) | Drogba ATA CIV (Marseille, Chelsea; 1998).
  // Todos atacantes; nenhum clube em comum; décadas 80/90/2010/90; sem Copa.
  { players: ['Yekini', 'Kanu', 'Osimhen', 'Drogba'], intruder: 'Drogba', cat: 'Nacionalidade', rule: 'Os outros são nigerianos; Drogba é marfinense.' },

  // check: Zamorano ATA CHI (Sevilla, Real, Inter; 1985) | Salas ATA CHI (River, Lazio, Juve; 1993) |
  // Alexis ATA CHI (River, Barça, Arsenal, Man Utd, Inter; 2005) | Asprilla ATA COL (Parma, Newcastle; 1988).
  // Todos atacantes; Inter 2-2; River 2-2; décadas 80/90/2000/80; sem Copa.
  { players: ['Zamorano', 'Salas', 'Alexis', 'Asprilla'], intruder: 'Asprilla', cat: 'Nacionalidade', rule: 'Os outros são chilenos; Asprilla é colombiano.' },

  // check: Rui Costa MEI POR (Benfica, Fiorentina, Milan; 1990) | Bruno Fernandes MEI POR (Novara, Udinese, Sampdoria, Sporting, Man Utd; 2012) |
  // Moutinho MEI POR (Sporting, Porto, Monaco; 2004) | Kaká MEI BRA (São Paulo, Milan, Real; 2001).
  // Todos meias; Milan 2-2; Sporting 2-2; décadas 90/2010/2000/2000. (Deco saiu: nasceu em
  // São Bernardo do Campo, e o torcedor contaria dois brasileiros.)
  { players: ['Rui Costa', 'Bruno Fernandes', 'Moutinho', 'Kaká'], intruder: 'Kaká', cat: 'Nacionalidade', rule: 'Os outros são portugueses; Kaká é brasileiro.' },

  // check: Hugo Sánchez ATA MEX (Atlético, Real; 1976) | Blanco ATA MEX (América, Valladolid; 1992) |
  // Chicharito ATA MEX (Guadalajara, Man Utd, Real, Leverkusen; 2006) | Salas ATA CHI (River, Lazio, Juve; 1993).
  // Todos atacantes; Real 2-2; décadas 70/90/2000/90; sem Copa.
  { players: ['Hugo Sánchez', 'Cuauhtémoc Blanco', 'Chicharito', 'Salas'], intruder: 'Salas', cat: 'Nacionalidade', rule: 'Os outros são mexicanos; Salas é chileno.' },

  // check: Kompany ZAG BEL (Hamburgo, Man City; 2003) | Hazard PONTA BEL (Lille, Chelsea, Real; 2007) |
  // De Bruyne MEI BEL (Chelsea, Man City; 2009) | Van Dijk ZAG HOL (Celtic, Southampton, Liverpool; 2011).
  // Zagueiros 2-2; City 2-2; Chelsea 2-2; década isola só Van Dijk (reforça); sem Copa.
  { players: ['Kompany', 'Hazard', 'De Bruyne', 'Van Dijk'], intruder: 'Van Dijk', cat: 'Nacionalidade', rule: 'Os outros são belgas que estrearam nos anos 2000; Van Dijk é holandês e estreou em 2011.', alsoCat: ['Era'] },

  // check: Lewandowski ATA POL (Dortmund, Bayern, Barça; 2006) | Boniek MEI POL (Widzew, Juve, Roma; 1975) |
  // Lato PONTA POL (Stal Mielec; 1966) | Hagi MEI ROM (Steaua, Real, Brescia, Barça, Galatasaray; 1982).
  // Meias 2-2; Barça 2-2; décadas 2000/70/60/80 (todas diferentes); sem Copa.
  { players: ['Lewandowski', 'Boniek', 'Lato', 'Hagi'], intruder: 'Hagi', cat: 'Nacionalidade', rule: 'Os outros são poloneses; Hagi é romeno.' },

  // check: Vidić ZAG SER (Man Utd, Inter; 2000) | Tadić MEI SER (Groningen, Twente, Southampton, Ajax, Fenerbahçe; 2006) |
  // Vlahović ATA SER (Fiorentina, Juve; 2016) | Modrić MEI CRO (Tottenham, Real, Milan; 2003).
  // Tema Nacionalidade: no players.ts os três são Sérvia (Mihajlović saiu: lá ele é Iugoslávia).
  { players: ['Vidić', 'Tadić', 'Vlahović', 'Modrić'], intruder: 'Modrić', cat: 'Nacionalidade', rule: 'Os outros são sérvios; Modrić é croata.' },

  // check: Valderrama MEI COL (Montpellier, Valladolid; 1981) | Asprilla ATA COL (Parma, Newcastle; 1988) |
  // Cuadrado PONTA COL (Fiorentina, Chelsea, Juve, Inter; 2008) | Recoba MEI URU (Nacional, Inter; 1994).
  // Meias 2-2; Inter 2-2; décadas 80/80/2000/90 (2-1-1); sem Copa.
  { players: ['Valderrama', 'Asprilla', 'Cuadrado', 'Recoba'], intruder: 'Recoba', cat: 'Nacionalidade', rule: 'Os outros são colombianos; Recoba é uruguaio.' },

  // ===== Clube (o intruso nunca passou pelo clube, nem por empréstimo) =====

  // check: Romário ATA BRA (Vasco, PSV, Barça, Flamengo; 1985) | Bebeto ATA BRA (Flamengo, Vasco, Deportivo; 1983) |
  // Adriano ATA BRA (Flamengo, Inter, Parma; 2000) | Careca ATA BRA (Guarani, São Paulo, Napoli; 1978).
  // Todos atacantes brasileiros; Vasco 2-2; Copa: Romário e Bebeto 1994 (2-2); décadas 80/80/2000/70.
  { players: ['Romário', 'Bebeto', 'Adriano', 'Careca'], intruder: 'Careca', cat: 'Clube', rule: 'Os outros jogaram no Flamengo; Careca nunca.' },

  // check: Sócrates MEI BRA (Corinthians, Fiorentina, Flamengo; 1974) | Rivaldo MEI BRA (Corinthians, Palmeiras, Barça, Milan; 1991) |
  // Dunga MEI BRA (Internacional, Corinthians, Vasco, Fiorentina; 1980) | Zico MEI BRA (Flamengo, Udinese; 1971).
  // Todos meias brasileiros; Fiorentina 2-2; Flamengo 2-2; Copa: Rivaldo 2002 e Dunga 1994 (2-2); anos 1970: 2-2.
  { players: ['Sócrates', 'Rivaldo', 'Dunga', 'Zico'], intruder: 'Zico', cat: 'Clube', rule: 'Os outros jogaram no Corinthians; Zico nunca.' },

  // check: Kaká MEI BRA (São Paulo, Milan, Real; 2001) | Raí MEI BRA (São Paulo, PSG; 1984) |
  // Leonardo MEI BRA (Flamengo, São Paulo, PSG, Milan, Kashima; 1987) | Zico MEI BRA (Flamengo, Udinese, Kashima; 1971).
  // Todos meias brasileiros; Milan 2-2; PSG 2-2; Flamengo 2-2; Kashima 2-2; Copa: Kaká, Raí, Leonardo x Zico (reforça).
  { players: ['Kaká', 'Raí', 'Leonardo', 'Zico'], intruder: 'Zico', cat: 'Clube', rule: 'Os outros jogaram no São Paulo; Zico nunca.' },

  // check: Rivaldo MEI BRA (Palmeiras, Deportivo, Barça, Milan; 1991) | Marcos GK BRA (Palmeiras; 1992) |
  // Zé Roberto MEI BRA (Real, Flamengo, Leverkusen, Bayern, Palmeiras; 1994) | Careca ATA BRA (Guarani, São Paulo, Napoli; 1978).
  // Posições 2-1-1; Copa: Rivaldo e Marcos 2002 (2-2); todos os 3 dos anos 1990 x Careca (reforça); sem clube com 3.
  { players: ['Rivaldo', 'Marcos', 'Zé Roberto', 'Careca'], intruder: 'Careca', cat: 'Clube', rule: 'Os outros jogaram no Palmeiras e estrearam nos anos 1990; Careca nunca jogou lá e estreou em 1978.', alsoCat: ['Era'] },

  // check: Romário ATA BRA (Vasco, PSV, Barça, Flamengo; 1985) | Bebeto ATA BRA (Flamengo, Vasco, Deportivo; 1983) |
  // Edmundo ATA BRA (Vasco, Palmeiras, Flamengo, Fiorentina; 1992) | Zico MEI BRA (Flamengo, Udinese; 1971).
  // Flamengo: os 4 (0-4, não isola); Copa: Romário e Bebeto (2-2); posição e década isolam só Zico (reforçam).
  { players: ['Romário', 'Bebeto', 'Edmundo', 'Zico'], intruder: 'Zico', cat: 'Clube', rule: 'Os outros são atacantes que jogaram no Vasco; Zico é meia e nunca jogou lá.', alsoCat: ['Posição'] },

  // check: Tévez ATA ARG (Boca, Corinthians, Man Utd, Man City, Juve; 2001) | Palermo ATA ARG (Boca, Villarreal; 1992) |
  // Batistuta ATA ARG (Boca, Fiorentina, Roma, Inter; 1988) | Crespo ATA ARG (River, Parma, Lazio, Inter, Chelsea, Milan; 1993).
  // Todos atacantes argentinos sem Copa; Inter 2-2; décadas 2000/90/80/90 (2-1-1). (Maradona ficou de fora: a Copa
  // de 1986 o isolaria; Riquelme/Verón ficaram de fora: 3 meias isolariam o atacante.)
  { players: ['Tévez', 'Palermo', 'Batistuta', 'Crespo'], intruder: 'Crespo', cat: 'Clube', rule: 'Os outros jogaram no Boca Juniors; Crespo nunca.' },

  // check: Adriano ATA BRA (Flamengo, Inter, Parma; 2000) | Maicon LAT BRA (Inter, Roma, Man City; 2001) |
  // Coutinho MEI BRA (Inter, Liverpool, Barça; 2009) | Neymar ATA BRA (Santos, Barça, PSG; 2009).
  // Todos brasileiros dos anos 2000, sem Copa; atacantes 2-2; Barça 2-2; nenhum clube com 3.
  { players: ['Adriano', 'Maicon', 'Coutinho', 'Neymar'], intruder: 'Neymar', cat: 'Clube', rule: 'Os outros jogaram na Inter de Milão; Neymar nunca.' },

  // check: Zidane MEI FRA (Bordeaux, Juve, Real; 1989) | Platini MEI FRA (Saint-Étienne, Juve; 1973) |
  // Trezeguet ATA FRA (Monaco, Juve; 1994) | Benzema ATA FRA (Lyon, Real; 2005).
  // Todos franceses; meias 2-2; Real 2-2; Copa: Zidane e Trezeguet 1998 (2-2); décadas 80/70/90/2000.
  { players: ['Zidane', 'Platini', 'Trezeguet', 'Benzema'], intruder: 'Benzema', cat: 'Clube', rule: 'Os outros jogaram na Juventus; Benzema nunca.' },

  // check: Ronaldo ATA BRA (Cruzeiro, PSV, Barça, Inter, Real, Milan, Corinthians; 1993) | Roberto Carlos LAT BRA (Palmeiras, Inter, Real, Fenerbahçe, Corinthians; 1991) |
  // Kaká MEI BRA (São Paulo, Milan, Real; 2001) | Romário ATA BRA (Vasco, PSV, Barça, Flamengo; 1985).
  // Todos brasileiros campeões mundiais; atacantes 2-2; Barça 2-2; PSV 2-2; Milan 2-2; Corinthians 2-2; Inter 2-2; décadas 90/90/2000/80.
  { players: ['Ronaldo', 'Roberto Carlos', 'Kaká', 'Romário'], intruder: 'Romário', cat: 'Clube', rule: 'Os outros jogaram no Real Madrid; Romário nunca.' },

  // ===== Era =====

  // check: Pelé ATA BRA (Santos; 1956) | Garrincha PONTA BRA (Botafogo; 1953) |
  // Zagallo PONTA BRA (Flamengo, Botafogo; 1951) | Tostão ATA BRA (Cruzeiro, Vasco; 1962).
  // Todos brasileiros campeões mundiais; posições 2-2; Botafogo 2-2; Copa 1970: Pelé e Tostão (2-2); bicampeões 1958/62: os 3 x Tostão (reforça).
  { players: ['Pelé', 'Garrincha', 'Zagallo', 'Tostão'], intruder: 'Tostão', cat: 'Era', rule: 'Os outros estrearam nos anos 1950; Tostão estreou em 1962.' },

  // check: Rivelino MEI BRA (Corinthians, Fluminense; 1965) | Tostão ATA BRA (Cruzeiro, Vasco; 1962) |
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
  { players: ['Roberto Mancini', 'Vialli', 'Schillaci', 'Totti'], intruder: 'Totti', cat: 'Era', rule: 'Os outros estrearam nos anos 1980; Totti estreou em 1993.' },

  // check: Raúl ATA ESP (Real, Schalke; 1994) | Guti MEI ESP (Real, Beşiktaş; 1995) |
  // Casillas GK ESP (Real, Porto; 1999) | Ramos ZAG ESP (Sevilla, Real, PSG; 2004).
  // Todos espanhóis do Real Madrid; posições todas diferentes; Copa: Casillas e Ramos 2010 (2-2).
  { players: ['Raúl', 'Guti', 'Casillas', 'Ramos'], intruder: 'Ramos', cat: 'Era', rule: 'Os outros estrearam nos anos 1990; Ramos estreou em 2004.' },

  // check: Neuer GK ALE (Schalke, Bayern; 2006) | Kroos MEI ALE (Bayern, Real; 2007) |
  // Müller ATA ALE (Bayern; 2008) | Kimmich MEI ALE (Stuttgart, Leipzig, Bayern; 2013).
  // Todos alemães do Bayern; meias 2-2; Copa 2014: os 3 x Kimmich (reforça).
  { players: ['Neuer', 'Kroos', 'Müller', 'Kimmich'], intruder: 'Kimmich', cat: 'Era', rule: 'Os outros estrearam nos anos 2000; Kimmich estreou em 2013.' },

  // check: Gerd Müller ATA ALE (Bayern; 1963) | Cruyff ATA HOL (Ajax, Barça; 1964) |
  // Riva ATA ITA (Cagliari; 1962) | Kempes ATA ARG (Instituto, Rosario Central, Valencia; 1973).
  // Todos atacantes; nacionalidades distintas; sem clube em comum; Copa: Müller 1974 e Kempes 1978 (2-2).
  { players: ['Gerd Müller', 'Cruyff', 'Riva', 'Kempes'], intruder: 'Kempes', cat: 'Era', rule: 'Os outros estrearam nos anos 1960; Kempes estreou em 1973.' },

  // check: Hagi MEI ROM (Steaua, Real, Barça, Galatasaray; 1982) | Laudrup MEI DIN (Lazio, Juve, Barça, Real, Ajax; 1981) |
  // Boban MEI CRO (Dinamo, Milan; 1985) | Nedvěd MEI TCH (Sparta, Lazio, Juve; 1991).
  // Todos meias; nacionalidades distintas; Real 2-2; Barça 2-2; Juve 2-2; Lazio 2-2; sem Copa.
  { players: ['Hagi', 'Michael Laudrup', 'Boban', 'Nedvěd'], intruder: 'Nedvěd', cat: 'Era', rule: 'Os outros estrearam nos anos 1980; Nedvěd estreou em 1991.' },

  // check: Cristiano Ronaldo ATA POR (Sporting, Man Utd, Real, Juve; 2002) | Messi ATA ARG (Barça, PSG; 2004) |
  // Kaká MEI BRA (São Paulo, Milan, Real; 2001) | Ronaldinho MEI BRA (Grêmio, PSG, Barça, Milan; 1998).
  // Atacantes 2-2; BRA 2-2; Real 2-2; Barça 2-2; Milan 2-2; PSG 2-2; Copa: Kaká e Ronaldinho 2002 (2-2); todos Bola de Ouro.
  { players: ['Cristiano Ronaldo', 'Messi', 'Kaká', 'Ronaldinho'], intruder: 'Ronaldinho', cat: 'Era', rule: 'Os outros estrearam nos anos 2000; Ronaldinho estreou em 1998.' },

  // check: Buffon GK ITA (Parma, Juve, PSG; 1995) | Casillas GK ESP (Real, Porto; 1999) |
  // Čech GK TCH (Rennes, Chelsea, Arsenal; 1999) | Courtois GK BEL (Chelsea, Atlético, Real; 2009).
  // Todos goleiros; nacionalidades distintas; Chelsea 2-2; Real 2-2; Copa: Buffon e Casillas (2-2).
  { players: ['Buffon', 'Casillas', 'Čech', 'Courtois'], intruder: 'Courtois', cat: 'Era', rule: 'Os outros estrearam nos anos 1990; Courtois estreou em 2009.' },

  // ===== Lote 3 (out/2026). O tema (cat) aparece na rodada: a resposta só
  // precisa ser única dentro do tema; títulos e outros temas não contam. =====
  { players: ['Eusébio', 'Seedorf', 'Tigana', 'Pauleta'], intruder: 'Pauleta', cat: 'Nacionalidade', rule: 'Os outros nasceram fora do país que defenderam; Eusébio em Moçambique, Seedorf no Suriname, Tigana no Mali — e Pauleta nasceu nos Açores, em Portugal.' },
  { players: ['Xavi', 'Iniesta', 'Busquets', 'Pedri'], intruder: 'Pedri', cat: 'Clube', rule: 'Os outros foram formados na base do Barça; os três são crias da La Masia, e Pedri chegou pronto do Las Palmas.' },
  { players: ['Deco', 'Diego Costa', 'Jorginho', 'Adriano'], intruder: 'Adriano', cat: 'Nacionalidade', rule: 'Os outros nasceram no Brasil mas jogaram por outra seleção; Adriano só defendeu o Brasil. (Bônus: os três jogaram no Chelsea.)', alsoCat: ['Clube'] },
  { players: ['Di Stéfano', 'Puskás', 'Sívori', 'Pelé'], intruder: 'Pelé', cat: 'Nacionalidade', rule: 'Os outros defenderam mais de uma seleção; Pelé só jogou pelo Brasil.' },
  { players: ['Seedorf', 'Forlán', 'Depay', 'Kroos'], intruder: 'Kroos', cat: 'Clube', rule: 'Os outros jogaram no futebol brasileiro; Seedorf no Botafogo, Forlán no Internacional, Depay no Corinthians — Kroos nunca.' },
  { players: ['Tévez', 'Paolo Guerrero', 'Depay', 'Loco Abreu'], intruder: 'Loco Abreu', cat: 'Clube', rule: 'Os outros jogaram no Corinthians; Loco Abreu nunca.' },
  { players: ['Desailly', 'Vieira', 'Tigana', 'Benzema'], intruder: 'Benzema', cat: 'Nacionalidade', rule: 'Os outros nasceram na África; Desailly em Gana, Vieira no Senegal, Tigana no Mali — Benzema nasceu em Lyon.' },
  { players: ['Klose', 'Podolski', 'Lewandowski', 'Haaland'], intruder: 'Haaland', cat: 'Nacionalidade', rule: 'Os outros nasceram na Polônia; Haaland nasceu na Inglaterra, em Leeds. (E os três jogaram no Bayern.)', alsoCat: ['Clube'] },
  { players: ['Higuaín', 'Trezeguet', 'Zidane', 'Nedvěd'], intruder: 'Nedvěd', cat: 'Nacionalidade', rule: 'Os outros nasceram na França; Higuaín nasceu em Brest, e Nedvěd na antiga Tchecoslováquia. Os quatro jogaram na Juventus.' },
  { players: ['Raúl', 'Michael Owen', 'Ronaldo', 'Rooney'], intruder: 'Rooney', cat: 'Era', rule: 'Os outros estrearam nos anos 1990; Rooney estreou em 2002. (E os três jogaram no Real Madrid.)', alsoCat: ['Clube'] },
  { players: ['Ibrahimović', 'Suárez', 'Eriksen', 'Foden'], intruder: 'Foden', cat: 'Clube', rule: 'Os outros jogaram no Ajax; Foden só jogou no Manchester City.' },
  { players: ['Otamendi', 'Enzo Fernández', 'Darwin Núñez', 'Cristiano Ronaldo'], intruder: 'Cristiano Ronaldo', cat: 'Clube', rule: 'Os outros jogaram no Benfica; Cristiano Ronaldo foi revelado pelo rival Sporting.' },
  { players: ['Davids', 'Pirlo', 'Ronaldo', 'Pato'], intruder: 'Pato', cat: 'Clube', rule: 'Os outros jogaram no Milan e na Inter; Pato só no Milan.', alsoCat: ['Era'] },
  { players: ['Hugo Sánchez', 'Courtois', 'Morata', 'Oblak'], intruder: 'Oblak', cat: 'Clube', rule: 'Os outros jogaram no Real Madrid e no Atlético; Oblak só no Atlético.' },
  { players: ['Figo', 'Ronaldo', "Eto'o", 'Arda Turan'], intruder: 'Arda Turan', cat: 'Clube', rule: 'Os outros jogaram no Barça e no Real Madrid; Arda Turan só no Barça.', alsoCat: ['Era'] },
  { players: ['Haaland', 'Vinícius', 'Salah', 'Neymar'], intruder: 'Neymar', cat: 'Era', rule: 'Os outros estrearam nos anos 2010; Neymar estreou em 2009.' },
  { players: ['De Bruyne', 'Lukaku', 'McTominay', 'Haaland'], intruder: 'Haaland', cat: 'Clube', rule: 'Os outros jogaram no Napoli; Haaland nunca.' },
  { players: ['Arrascaeta', 'Vidal', 'Jorginho', 'Bochini'], intruder: 'Bochini', cat: 'Clube', rule: 'Os outros jogaram no Flamengo; Bochini só jogou no Independiente.' },
  { players: ['Cafu', 'Endrick', 'Estêvão', 'Vinícius'], intruder: 'Vinícius', cat: 'Clube', rule: 'Os outros jogaram no Palmeiras; Vinícius Júnior foi revelado pelo Flamengo.' },
  { players: ['Palermo', 'Verón', 'Aimar', 'Trezeguet'], intruder: 'Trezeguet', cat: 'Nacionalidade', rule: 'Os outros são argentinos; Trezeguet é francês — mesmo tendo crescido na Argentina e jogado no River.' },
  { players: ['Klinsmann', 'Brehme', 'Matthäus', 'Völler'], intruder: 'Völler', cat: 'Clube', rule: 'Os outros jogaram na Inter de Milão; Völler nunca. (E os três também jogaram no Bayern.)' },
  { players: ['Gullit', 'Vialli', 'Higuaín', 'Riquelme'], intruder: 'Riquelme', cat: 'Clube', rule: 'Os outros jogaram no Chelsea; Riquelme nunca.' },
  { players: ['Mascherano', 'Xabi Alonso', 'Coutinho', 'Modrić'], intruder: 'Modrić', cat: 'Clube', rule: 'Os outros jogaram no Liverpool; Modrić nunca.' },
  { players: ['Forlán', 'Verón', 'Radamel Falcao', 'Reus'], intruder: 'Reus', cat: 'Clube', rule: 'Os outros jogaram no Manchester United; Reus nunca.' },
  { players: ['Pepe', 'Rui Costa', 'Bernardo Silva', 'Neymar'], intruder: 'Neymar', cat: 'Nacionalidade', rule: 'Os outros são portugueses; Neymar é brasileiro — e, sim, Pepe nasceu em Maceió.' },
  { players: ['Neuer', 'De Gea', 'Oblak', 'Čech'], intruder: 'Čech', cat: 'Era', rule: 'Os outros estrearam nos anos 2000; Čech estreou em 1999.' },
  { players: ['Vieri', 'Forlán', 'Mandžukić', 'Cavani'], intruder: 'Cavani', cat: 'Clube', rule: 'Os outros jogaram no Atlético de Madrid; Cavani nunca.' },
  { players: ['Ibrahimović', 'Larsson', 'Gyökeres', 'Haaland'], intruder: 'Haaland', cat: 'Nacionalidade', rule: 'Os outros são suecos; Haaland é norueguês (e nasceu em Leeds).' },
  { players: ['Henry', 'Bergkamp', 'Pirès', 'Park Ji-sung'], intruder: 'Park Ji-sung', cat: 'Clube', rule: 'Os outros jogaram no Arsenal; Park Ji-sung nunca — ele foi do rival United.' },
  { players: ['Klinsmann', 'Ardiles', 'Gascoigne', 'Michael Owen'], intruder: 'Michael Owen', cat: 'Clube', rule: 'Os outros jogaram no Tottenham; Owen nunca.' },
  { players: ['Hagi', 'Drogba', 'Sneijder', 'Harry Kane'], intruder: 'Harry Kane', cat: 'Clube', rule: 'Os outros jogaram no Galatasaray; Kane nunca.' },
  { players: ['Weah', 'Klinsmann', 'Fàbregas', 'Ødegaard'], intruder: 'Ødegaard', cat: 'Clube', rule: 'Os outros jogaram no Monaco; Ødegaard nunca.' },
  { players: ['Lamine Yamal', 'Garnacho', 'Estêvão', 'Vinícius'], intruder: 'Vinícius', cat: 'Era', rule: 'Os outros estrearam nos anos 2020; Vinícius Júnior estreou em 2017.' },
  { players: ['Saka', 'Cole Palmer', 'Harry Kane', 'Musiala'], intruder: 'Musiala', cat: 'Nacionalidade', rule: 'Os outros são ingleses; Musiala é alemão — mesmo tendo crescido em Londres e jogado nas seleções de base da Inglaterra.' },
  { players: ['Larsson', 'Van Dijk', 'Roy Keane', 'Lewandowski'], intruder: 'Lewandowski', cat: 'Clube', rule: 'Os outros jogaram no Celtic; Lewandowski nunca.' },
]
