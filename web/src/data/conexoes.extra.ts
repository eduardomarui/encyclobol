// Lote 3 (out/2026) do jogo Conexões. Mesmo formato de conexoes.ts:
// 16 craques, 4 grupos de 4, PARTIÇÃO ÚNICA. Antes de cada puzzle, o
// comentário `armadilha:` prova por que os 16 só se dividem de um jeito.
// Clubes, títulos e anos conferidos na Wikipédia (en/pt) em out/2026.

import type { Puzzle } from './conexoes'

export const conexoesExtra: Puzzle[] = [
  // 1 — armadilha: Eusébio (Bola de Ouro 1965) e Gerd Müller (Bola de Ouro
  // 1970) também cabem nas décadas da Bola de Ouro. Mas Yashin, Bobby Charlton,
  // Best e Rivera nunca foram artilheiros de Copa, nem Cruyff, Beckenbauer,
  // Blokhin e Keegan; os dois só fecham nos artilheiros. Yashin é goleiro, mas
  // nunca foi campeão mundial; Beckenbauer foi campeão em 1974, mas não é goleiro.
  {
    groups: [
      { color: 'corn', label: 'Goleiros campeões mundiais', members: ['Gilmar', 'Banks', 'Sepp Maier', 'Zoff'] },
      { color: 'grass', label: 'Bola de Ouro nos anos 1970', members: ['Cruyff', 'Beckenbauer', 'Blokhin', 'Keegan'] },
      { color: 'ochre', label: 'Bola de Ouro nos anos 1960', members: ['Yashin', 'Bobby Charlton', 'Best', 'Rivera'] },
      { color: 'ink', label: 'Artilheiros de uma Copa do Mundo', members: ['Eusébio', 'Gerd Müller', 'Lato', 'Kempes'] },
    ],
  },
  // 2 — armadilha: Zidane também foi eleito o melhor jogador da Copa de 2006.
  // Mas Kahn (2002), Forlán (2010), Maradona (1986) e Schillaci (1990) nunca
  // ganharam a Bola de Ouro, e o grupo dos anos 1990 só tem quatro candidatos
  // (Weah 95, Sammer 96, Zidane 98, Rivaldo 99): Zidane fica nos anos 1990.
  {
    groups: [
      { color: 'corn', label: 'Bola de Ouro nos anos 2000', members: ['Figo', 'Owen', 'Nedvěd', 'Shevchenko'] },
      { color: 'grass', label: 'Bola de Ouro nos anos 1980', members: ['Rummenigge', 'Platini', 'Belanov', 'Gullit'] },
      { color: 'ochre', label: 'Bola de Ouro nos anos 1990', members: ['Weah', 'Sammer', 'Zidane', 'Rivaldo'] },
      { color: 'ink', label: 'Eleitos o melhor jogador de uma Copa', members: ['Kahn', 'Forlán', 'Maradona', 'Schillaci'] },
    ],
  },
  // 3 — prêmios de Copa. armadilha: Ronaldo também foi eleito o melhor
  // jogador da Copa de 1998, mas o grupo dos artilheiros só tem quatro
  // candidatos (Ronaldo 2002, Klose 2006, James 2014, Kane 2018), então ele
  // fecha ali. Copa de 2026: melhor jogador Rodri, luva de ouro Unai Simón,
  // melhor jovem Pau Cubarsí. Mbappé (jovem 2018, artilheiro 2022/2026) ficou fora.
  {
    groups: [
      { color: 'corn', label: 'Melhor goleiro de uma Copa', members: ['Casillas', 'Courtois', 'Dibu Martínez', 'Unai Simón'] },
      { color: 'grass', label: 'Artilheiros de uma Copa', members: ['Ronaldo', 'Klose', 'James', 'Kane'] },
      { color: 'ochre', label: 'Melhor jogador de uma Copa', members: ['Romário', 'Zidane', 'Modrić', 'Rodri'] },
      { color: 'ink', label: 'Melhor jogador jovem de uma Copa', members: ['Podolski', 'Pogba', 'Enzo Fernández', 'Pau Cubarsí'] },
    ],
  },
  // 4 — Copa de 2026 (Espanha 1 x 0 Argentina na final). armadilha: são três
  // grupos de espanhóis. Nenhum campeão de 2010 (Casillas, Xavi, Iniesta, Puyol)
  // estava no elenco de 2026, e nenhum dos de 2026 (Rodri, Pedri, Yamal,
  // Cubarsí) estava em 2010; Raúl, Butragueño, Hierro e Luis Enrique pararam
  // antes de 2010. Os argentinos de 2022 não cabem em grupo espanhol.
  {
    groups: [
      { color: 'corn', label: 'Campeões mundiais em 2022', members: ['Messi', 'Di María', 'Dibu Martínez', 'Julián Álvarez'] },
      { color: 'grass', label: 'Campeões mundiais em 2010', members: ['Casillas', 'Xavi', 'Iniesta', 'Puyol'] },
      { color: 'ochre', label: 'Campeões mundiais em 2026', members: ['Rodri', 'Pedri', 'Lamine Yamal', 'Pau Cubarsí'] },
      { color: 'ink', label: 'Espanhóis que nunca ganharam a Copa', members: ['Raúl', 'Butragueño', 'Hierro', 'Luis Enrique'] },
    ],
  },
  // 5 — armadilha: Reinaldo também jogou no Cruzeiro (1986) e Charles Fabian
  // também (1991–92). Não trocam porque Tostão, Piazza, Sorín e Ronaldo nunca
  // jogaram no Atlético-MG nem no Bahia; sem vaga, Reinaldo fecha no Atlético e
  // Charles no Bahia. Vavá e Ademir de Menezes também jogaram no Vasco e Durval
  // no Athletico-PR e no Santos, que não são grupo. (Hulk está no Fluminense
  // desde 2026, que não é grupo aqui.)
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Cruzeiro', members: ['Tostão', 'Wilson Piazza', 'Sorín', 'Ronaldo'] },
      { color: 'grass', label: 'Jogaram no Atlético-MG', members: ['Hulk', 'Gilberto Silva', 'Guilherme Arana', 'Reinaldo'] },
      { color: 'ochre', label: 'Jogaram no Bahia', members: ['Bobô', 'Dani Alves', 'Talisca', 'Charles Fabian'] },
      { color: 'ink', label: 'Jogaram no Sport', members: ['Juninho Pernambucano', 'Durval', 'Vavá', 'Ademir de Menezes'] },
    ],
  },
  // 6 — armadilha: César Sampaio também jogou no Santos (1986–91) e Weverton
  // também jogou no Athletico-PR (2012–17). Não trocam: Zito, Clodoaldo,
  // Giovanni e Diego Ribas nunca jogaram no Palmeiras, e Kléberson, Jádson e
  // Bruno Guimarães nunca jogaram no Palmeiras; o Athletico só tem quatro
  // candidatos, então Weverton fecha ali, e Sampaio completa o Palmeiras.
  {
    groups: [
      { color: 'corn', label: 'Jogaram no Palmeiras', members: ['Ademir da Guia', 'Marcos', 'Endrick', 'César Sampaio'] },
      { color: 'grass', label: 'Jogaram no Santos', members: ['Zito', 'Clodoaldo', 'Giovanni', 'Diego Ribas'] },
      { color: 'ochre', label: 'Jogaram no Fluminense', members: ['Castilho', 'Rivellino', 'Conca', 'Germán Cano'] },
      { color: 'ink', label: 'Jogaram no Athletico-PR', members: ['Kléberson', 'Jádson', 'Bruno Guimarães', 'Weverton'] },
    ],
  },
  // 7 — técnicos. armadilha: Felipão também ganhou a Libertadores (Grêmio 95,
  // Palmeiras 99), Lippi também ganhou a Champions (Juventus 96) e Del Bosque
  // ganhou Copa, Champions e Euro. Mas Libertadores e Champions já têm quatro
  // campeões que só cabem ali, e a Euro só tem quatro candidatos (Fernando
  // Santos, Mancini, Rehhagel, Del Bosque): sobra a Copa para Felipão e Lippi.
  {
    groups: [
      { color: 'corn', label: 'Técnicos campeões da Champions', members: ['Guardiola', 'Klopp', 'Alex Ferguson', 'Zidane'] },
      { color: 'grass', label: 'Técnicos campeões da Libertadores', members: ['Telê Santana', 'Jorge Jesus', 'Abel Ferreira', 'Gallardo'] },
      { color: 'ochre', label: 'Técnicos campeões da Eurocopa', members: ['Fernando Santos', 'Mancini', 'Rehhagel', 'Del Bosque'] },
      { color: 'ink', label: 'Técnicos campeões da Copa do Mundo', members: ['Felipão', 'Lippi', 'Scaloni', 'Löw'] },
    ],
  },
  // 8 — camisas. armadilha: Messi vestiu a 10 do Barcelona, Benzema a 9 do
  // Real e Mbappé a 9 e a 10 do Real — nenhum vestiu a 9 do Barça nem a 7 do
  // Real. Ronaldo vestiu a 9 do Barça e a 11/9 do Real (nunca a 7). Números de
  // Copa conferidos nas listas oficiais: Kempes 78, Maradona 82–94, Riquelme
  // 2006, Messi 2010–26; Platini 82/86, Zidane 98–2006, Benzema 2014, Mbappé 2018–26.
  {
    groups: [
      { color: 'corn', label: 'Vestiram a 10 da Argentina em Copas', members: ['Kempes', 'Maradona', 'Riquelme', 'Messi'] },
      { color: 'grass', label: 'Vestiram a 7 do Real Madrid', members: ['Raúl', 'Cristiano Ronaldo', 'Hazard', 'Vinícius'] },
      { color: 'ochre', label: 'Vestiram a 9 do Barcelona', members: ['Ronaldo', "Eto'o", 'Suárez', 'Lewandowski'] },
      { color: 'ink', label: 'Vestiram a 10 da França em Copas', members: ['Platini', 'Zidane', 'Benzema', 'Mbappé'] },
    ],
  },
  // 9 — armadilha: Arce e Paulo Nunes ganharam a Libertadores pelo Grêmio
  // (1995) E pelo Palmeiras (1999). Mas Danrlei, Jardel (95), Renato Gaúcho
  // (83) e Geromel (2017) só ganharam pelo Grêmio, que fica cheio; o Palmeiras
  // só tem Marcos (99) e Weverton (2020/21) além deles. Cafu e Zetti jogaram
  // no Palmeiras, mas não ganharam a Libertadores lá.
  {
    groups: [
      { color: 'corn', label: 'Campeões da Libertadores pelo Flamengo', members: ['Zico', 'Júnior', 'Gabigol', 'Arrascaeta'] },
      { color: 'grass', label: 'Campeões da Libertadores pelo São Paulo', members: ['Raí', 'Zetti', 'Cafu', 'Lugano'] },
      { color: 'ochre', label: 'Campeões da Libertadores pelo Grêmio', members: ['Danrlei', 'Jardel', 'Renato Gaúcho', 'Geromel'] },
      { color: 'ink', label: 'Campeões da Libertadores pelo Palmeiras', members: ['Marcos', 'Weverton', 'Arce', 'Paulo Nunes'] },
    ],
  },
  // 10 — estrangeiros no Brasil. armadilha: Guerrero jogou no Corinthians, no
  // Flamengo E no Internacional. Mas Tévez, Mascherano, Memphis Depay e Garro
  // só jogaram no Corinthians e D'Alessandro, Forlán, Enner Valencia e Borré só
  // no Inter (entre os quatro clubes): Guerrero fecha no Flamengo. Petković
  // passou por Vasco, Fluminense, Santos e Atlético-MG, que não são grupo.
  {
    groups: [
      { color: 'corn', label: 'Estrangeiros que jogaram no Corinthians', members: ['Tévez', 'Mascherano', 'Memphis Depay', 'Garro'] },
      { color: 'grass', label: 'Estrangeiros que jogaram no Internacional', members: ["D'Alessandro", 'Forlán', 'Enner Valencia', 'Borré'] },
      { color: 'ochre', label: 'Estrangeiros que jogaram no Botafogo', members: ['Seedorf', 'Loco Abreu', 'Thiago Almada', 'Savarino'] },
      { color: 'ink', label: 'Estrangeiros que jogaram no Flamengo', members: ['Arrascaeta', 'Petković', 'Pulgar', 'Guerrero'] },
    ],
  },
  // 11 — África ocidental. armadilha: Abedi Pelé tem "Pelé" no nome, mas é
  // ganês; os dois Touré são marfinenses. Cada um defendeu só uma seleção.
  {
    groups: [
      { color: 'corn', label: 'Marfinenses', members: ['Drogba', 'Yaya Touré', 'Kolo Touré', 'Gervinho'] },
      { color: 'grass', label: 'Camaroneses', members: ["Eto'o", 'Roger Milla', 'Rigobert Song', 'Onana'] },
      { color: 'ochre', label: 'Nigerianos', members: ['Okocha', 'Kanu', 'Yekini', 'Osimhen'] },
      { color: 'ink', label: 'Ganeses', members: ['Abedi Pelé', 'Essien', 'Asamoah Gyan', 'Thomas Partey'] },
    ],
  },
  // 12 — África do norte + Senegal. armadilha: Hakimi (nascido na Espanha),
  // Bounou (no Canadá), Mahrez, Bennacer e Koulibaly (na França) não jogam
  // pelo país onde nasceram; na seleção principal, cada um defendeu uma só.
  {
    groups: [
      { color: 'corn', label: 'Egípcios', members: ['Salah', 'Aboutrika', 'Hossam Hassan', 'Marmoush'] },
      { color: 'grass', label: 'Senegaleses', members: ['Mané', 'Koulibaly', 'El Hadji Diouf', 'Édouard Mendy'] },
      { color: 'ochre', label: 'Marroquinos', members: ['Hakimi', 'Bounou', 'Ziyech', 'En-Nesyri'] },
      { color: 'ink', label: 'Argelinos', members: ['Mahrez', 'Madjer', 'Belloumi', 'Bennacer'] },
    ],
  },
  // 13 — Ásia e Oceania. armadilha: Ali Daei e Ali Karimi (iranianos) e os
  // dois "Mark" australianos (Viduka e Schwarzer) puxam pares; cada jogador
  // defendeu uma só seleção.
  {
    groups: [
      { color: 'corn', label: 'Sul-coreanos', members: ['Park Ji-sung', 'Son Heung-min', 'Kim Min-jae', 'Cha Bum-kun'] },
      { color: 'grass', label: 'Japoneses', members: ['Hidetoshi Nakata', 'Shunsuke Nakamura', 'Kagawa', 'Takefusa Kubo'] },
      { color: 'ochre', label: 'Australianos', members: ['Tim Cahill', 'Harry Kewell', 'Viduka', 'Schwarzer'] },
      { color: 'ink', label: 'Iranianos', members: ['Ali Daei', 'Ali Karimi', 'Taremi', 'Azmoun'] },
    ],
  },
  // 14 — apelidos. armadilha: Puskás é o "Major Galopante" (patente militar,
  // não bicho); Yashin, a "Aranha Negra", e Julián Álvarez, "La Araña",
  // dividem o mesmo bicho. Ninguém tem apelido de duas categorias: Rei (Pelé),
  // Kaiser (Beckenbauer), Imperador (Adriano), King Kenny (Dalglish); La Pulga
  // (Messi), El Toro (Lautaro); Der Bomber (Gerd Müller), El Pistolero
  // (Suárez), Dinamite (Roberto); Bruxo (Ronaldinho), La Brujita (Verón),
  // Divino (Ademir da Guia), Divin Codino (Baggio).
  {
    groups: [
      { color: 'corn', label: 'Apelido de realeza', members: ['Pelé', 'Beckenbauer', 'Adriano', 'Dalglish'] },
      { color: 'grass', label: 'Apelido de bicho', members: ['Messi', 'Lautaro', 'Julián Álvarez', 'Yashin'] },
      { color: 'ochre', label: 'Apelido de guerra', members: ['Puskás', 'Gerd Müller', 'Suárez', 'Roberto Dinamite'] },
      { color: 'ink', label: 'Apelido de bruxo ou divino', members: ['Ronaldinho', 'Verón', 'Ademir da Guia', 'Baggio'] },
    ],
  },
  // 15 — ouro olímpico. armadilha: Mascherano ganhou o ouro em 2004 E em 2008.
  // Mas Messi, Riquelme, Di María e Agüero só estavam em 2008, que fica cheio;
  // Mascherano completa 2004 com Tévez, Ayala e Heinze. Nenhum brasileiro de
  // 2016 estava em 2020.
  {
    groups: [
      { color: 'corn', label: 'Ouro olímpico em 2016 (Brasil)', members: ['Neymar', 'Gabriel Jesus', 'Marquinhos', 'Gabigol'] },
      { color: 'grass', label: 'Ouro olímpico em 2020 (Brasil)', members: ['Dani Alves', 'Richarlison', 'Bruno Guimarães', 'Matheus Cunha'] },
      { color: 'ochre', label: 'Ouro olímpico em 2008 (Argentina)', members: ['Messi', 'Riquelme', 'Di María', 'Agüero'] },
      { color: 'ink', label: 'Ouro olímpico em 2004 (Argentina)', members: ['Tévez', 'Ayala', 'Heinze', 'Mascherano'] },
    ],
  },
  // 16 — só argentinos, por posição. armadilha: a nacionalidade não separa
  // nada; vale a posição de ofício de cada um, sem ambiguidade (nenhum dos
  // laterais virou zagueiro, nenhum meia jogou na defesa).
  {
    groups: [
      { color: 'corn', label: 'Goleiros argentinos', members: ['Fillol', 'Pumpido', 'Goycochea', 'Dibu Martínez'] },
      { color: 'grass', label: 'Meio-campistas argentinos', members: ['Riquelme', 'Redondo', 'Verón', 'Aimar'] },
      { color: 'ochre', label: 'Zagueiros argentinos', members: ['Passarella', 'Ruggeri', 'Ayala', 'Walter Samuel'] },
      { color: 'ink', label: 'Laterais argentinos', members: ['Sorín', 'Zabaleta', 'Tagliafico', 'Montiel'] },
    ],
  },
  // 17 — duas posições x duas seleções. armadilha: o par de grupos de cada
  // seleção tenta a divisão "Italianos x Alemães" (8 e 8), que não fecha em
  // grupos de 4; é preciso cruzar posição e país. Lahm foi para o meio no fim
  // da carreira, mas fez história como lateral.
  {
    groups: [
      { color: 'corn', label: 'Goleiros italianos', members: ['Zoff', 'Zenga', 'Buffon', 'Donnarumma'] },
      { color: 'grass', label: 'Goleiros alemães', members: ['Sepp Maier', 'Kahn', 'Neuer', 'ter Stegen'] },
      { color: 'ochre', label: 'Laterais italianos', members: ['Facchetti', 'Cabrini', 'Zambrotta', 'Grosso'] },
      { color: 'ink', label: 'Laterais alemães', members: ['Berti Vogts', 'Brehme', 'Lahm', 'David Raum'] },
    ],
  },
  // 18 — duas posições x duas seleções. armadilha: a divisão "Espanhóis x
  // Ingleses" (8 e 8) não fecha em grupos de 4; é preciso cruzar posição e
  // país. Cada um tem uma só posição e uma só seleção.
  {
    groups: [
      { color: 'corn', label: 'Goleiros espanhóis', members: ['Zubizarreta', 'Casillas', 'De Gea', 'Unai Simón'] },
      { color: 'grass', label: 'Goleiros ingleses', members: ['Banks', 'Shilton', 'Seaman', 'Pickford'] },
      { color: 'ochre', label: 'Laterais espanhóis', members: ['Jordi Alba', 'Carvajal', 'Míchel Salgado', 'Capdevila'] },
      { color: 'ink', label: 'Laterais ingleses', members: ['Ashley Cole', 'Gary Neville', 'Alexander-Arnold', 'Kyle Walker'] },
    ],
  },
  // 19 — Mundial de Clubes (escalações das finais). armadilha: são dois grupos
  // do Corinthians, mas ninguém da final de 2000 (Dida, Rincón, Marcelinho,
  // Vampeta) estava em 2012, e vice-versa. Guerrero e Amoroso também jogaram
  // em outros clubes do puzzle (Inter; Corinthians), mas sem ser campeões
  // mundiais por eles. (Danilo, campeão em 2005 E 2012, ficou fora.)
  {
    groups: [
      { color: 'corn', label: 'Campeões mundiais pelo São Paulo (2005)', members: ['Rogério Ceni', 'Lugano', 'Mineiro', 'Amoroso'] },
      { color: 'grass', label: 'Campeões mundiais pelo Internacional (2006)', members: ['Clemer', 'Fernandão', 'Iarley', 'Adriano Gabiru'] },
      { color: 'ochre', label: 'Campeões mundiais pelo Corinthians (2012)', members: ['Cássio', 'Ralf', 'Guerrero', 'Emerson Sheik'] },
      { color: 'ink', label: 'Campeões mundiais pelo Corinthians (2000)', members: ['Dida', 'Rincón', 'Marcelinho Carioca', 'Vampeta'] },
    ],
  },
  // 20 — base. armadilha: Gabigol é ídolo do Flamengo, mas foi revelado pelo
  // Santos; Adriano passou por São Paulo e Corinthians, mas saiu da base do
  // Flamengo; Estêvão fez base no Cruzeiro (que não é grupo) e estreou no
  // Palmeiras. Cada um estreou como profissional em um só destes clubes.
  {
    groups: [
      { color: 'corn', label: 'Revelados pelo Santos', members: ['Neymar', 'Robinho', 'Rodrygo', 'Gabigol'] },
      { color: 'grass', label: 'Revelados pelo São Paulo', members: ['Kaká', 'Casemiro', 'Éder Militão', 'Antony'] },
      { color: 'ochre', label: 'Revelados pelo Flamengo', members: ['Vinícius', 'Paquetá', 'Adriano', 'Reinier'] },
      { color: 'ink', label: 'Revelados pelo Palmeiras', members: ['Endrick', 'Gabriel Jesus', 'Estêvão', 'Marcos'] },
    ],
  },
  // 21 — armadilha: Giovanni jogou no Olympiacos (Grécia) E no Al-Hilal
  // (Arábia Saudita). Mas Cristiano Ronaldo (Al-Nassr), Benzema (Al-Ittihad e
  // Al-Hilal), Neymar (Al-Hilal) e Mané (Al-Nassr) nunca jogaram na Grécia;
  // a Arábia fica cheia e Giovanni fecha na Grécia.
  {
    groups: [
      { color: 'corn', label: 'Jogaram na Arábia Saudita', members: ['Cristiano Ronaldo', 'Benzema', 'Neymar', 'Mané'] },
      { color: 'grass', label: 'Jogaram no Catar', members: ['Xavi', 'Raúl', 'Batistuta', 'Guardiola'] },
      { color: 'ochre', label: 'Jogaram na Escócia', members: ['Henrik Larsson', 'Gascoigne', 'Shunsuke Nakamura', 'Brian Laudrup'] },
      { color: 'ink', label: 'Jogaram na Grécia', members: ['Rivaldo', 'Gilberto Silva', 'Marcelo', 'Giovanni'] },
    ],
  },
  // 22 — técnicos. armadilha: Ancelotti, Luxemburgo e Capello treinaram o
  // Real Madrid. Mas Del Bosque, Benítez, Zidane e Xabi Alonso só treinaram o
  // Real entre os quatro, que fica cheio; a Seleção Brasileira só tem Tite,
  // Mano, Ancelotti e Luxemburgo, e a Inglaterra Eriksson, Southgate, Tuchel
  // e Capello.
  {
    groups: [
      { color: 'corn', label: 'Treinaram o Barcelona', members: ['Cruyff', 'Rijkaard', 'Guardiola', 'Flick'] },
      { color: 'grass', label: 'Treinaram a Inglaterra', members: ['Eriksson', 'Southgate', 'Tuchel', 'Capello'] },
      { color: 'ochre', label: 'Treinaram o Real Madrid', members: ['Del Bosque', 'Benítez', 'Zidane', 'Xabi Alonso'] },
      { color: 'ink', label: 'Treinaram a Seleção Brasileira', members: ['Tite', 'Mano Menezes', 'Ancelotti', 'Luxemburgo'] },
    ],
  },
  // 23 — Champions. armadilha: Giggs foi campeão pelo United em 1999 E em
  // 2008. Mas Beckham, Schmeichel, Solskjær e Sheringham só ganharam a de
  // 1999, que fica cheia; Giggs fecha em 2008. Fernando Torres jogou em
  // Liverpool e Chelsea e ficou fora.
  {
    groups: [
      { color: 'corn', label: 'Campeões da Champions pelo Liverpool (2005)', members: ['Gerrard', 'Xabi Alonso', 'Dudek', 'Carragher'] },
      { color: 'grass', label: 'Campeões da Champions pelo Chelsea (2012)', members: ['Drogba', 'Lampard', 'Čech', 'Mata'] },
      { color: 'ochre', label: 'Campeões da Champions pelo United (1999)', members: ['Beckham', 'Schmeichel', 'Solskjær', 'Sheringham'] },
      { color: 'ink', label: 'Campeões da Champions pelo United (2008)', members: ['Cristiano Ronaldo', 'Rooney', 'Van der Sar', 'Giggs'] },
    ],
  },
  // 24 — Espanha, quatro títulos (elencos oficiais). armadilha: Puyol e
  // Villa também foram campeões em 2010, Jesús Navas também em 2010, e Rodri
  // também em 2026. Mas Piqué, Busquets, Víctor Valdés e Mata só estavam em 2010
  // (não em 2008), que fica cheio; Cubarsí, Gavi, Porro e Eric García só em
  // 2026 (não na Euro 2024), que também fica cheio. Sobra: Puyol e Villa na
  // Euro 2008; Navas e Rodri na Euro 2024.
  {
    groups: [
      { color: 'corn', label: 'Campeões mundiais em 2010', members: ['Piqué', 'Busquets', 'Víctor Valdés', 'Mata'] },
      { color: 'grass', label: 'Campeões mundiais em 2026', members: ['Pau Cubarsí', 'Gavi', 'Pedro Porro', 'Eric García'] },
      { color: 'ochre', label: 'Campeões da Euro 2008', members: ['Marcos Senna', 'Güiza', 'Puyol', 'David Villa'] },
      { color: 'ink', label: 'Campeões da Euro 2024', members: ['Carvajal', 'Morata', 'Jesús Navas', 'Rodri'] },
    ],
  },
]
