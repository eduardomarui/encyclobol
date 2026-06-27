// Agrega os números dos 6 jogos (do localStorage) e calcula conquistas.
import { loadCareer, loadCareerToday } from './stats'
import { loadCopaStats, loadCopaToday } from './penaltisStats'
import { loadConCareer, loadConToday } from './conexoesStats'
import { loadTLCareer, loadTLToday } from './timelineStats'
import { loadIntrusoCareer, loadIntrusoToday } from './intrusoStats'
import { loadMystCareer, loadMystToday } from './misteriosoStats'

export type GameStat = {
  key: string
  name: string
  route: string
  total: number
  best: number
  days: number
  streak: number
  playedToday: boolean
}

export type Achievement = {
  id: string
  title: string
  desc: string
  unlocked: boolean
}

export function gatherGames(): GameStat[] {
  const tc = loadCareer()
  const cp = loadCopaStats()
  const qc = loadConCareer()
  const lc = loadTLCareer()
  const ic = loadIntrusoCareer()
  const mc = loadMystCareer()
  return [
    { key: 'tira', name: 'Tira-Teima', route: '/jogos/quem-sou-ele', total: tc.total, best: tc.best, days: tc.days, streak: 0, playedToday: !!loadCareerToday() },
    { key: 'copa', name: 'Copa de Pênaltis', route: '/jogos/penaltis', total: cp.total, best: cp.best, days: cp.days, streak: 0, playedToday: !!loadCopaToday() },
    { key: 'quarteto', name: 'Quarteto', route: '/jogos/conexoes', total: qc.total, best: qc.best, days: qc.days, streak: qc.streak, playedToday: !!loadConToday() },
    { key: 'tempo', name: 'Linha do Tempo', route: '/jogos/linha-do-tempo', total: lc.total, best: lc.best, days: lc.days, streak: lc.streak, playedToday: !!loadTLToday() },
    { key: 'intruso', name: 'O Intruso', route: '/jogos/o-intruso', total: ic.total, best: ic.best, days: ic.days, streak: ic.streak, playedToday: !!loadIntrusoToday() },
    { key: 'misterioso', name: 'Craque Misterioso', route: '/jogos/craque-misterioso', total: mc.total, best: mc.best, days: mc.days, streak: mc.streak, playedToday: !!loadMystToday() },
  ]
}

export function grandTotal(games: GameStat[]): number {
  return games.reduce((s, g) => s + g.total, 0)
}

export function gatherAchievements(games: GameStat[]): Achievement[] {
  const total = grandTotal(games)
  const maxStreak = Math.max(0, ...games.map((g) => g.streak))
  const maxDays = Math.max(0, ...games.map((g) => g.days))
  const playedAny = games.some((g) => g.days > 0 || g.playedToday)
  const playedAll = games.every((g) => g.days > 0 || g.playedToday)
  const playedAllToday = games.every((g) => g.playedToday)
  const cups = loadCopaStats().cups
  const bestCartas = loadTLCareer().bestScore
  const bestCaca = loadIntrusoCareer().bestRun
  const a = (id: string, title: string, desc: string, unlocked: boolean): Achievement => ({ id, title, desc, unlocked })
  return [
    a('estreante', 'Estreante', 'Jogue qualquer jogo', playedAny),
    a('colecionador', 'Colecionador', 'Jogue os 6 jogos ao menos uma vez', playedAll),
    a('fechou-dia', 'Fechei o dia', 'Jogue os 6 jogos no mesmo dia', playedAllToday),
    a('maratonista', 'Maratonista', '7 dias jogados num mesmo jogo', maxDays >= 7),
    a('em-chamas', 'Em chamas', 'Ofensiva de 5 dias seguidos', maxStreak >= 5),
    a('imparavel', 'Imparável', 'Ofensiva de 10 dias seguidos', maxStreak >= 10),
    a('centuriao', 'Centurião', '1.000 pontos no total', total >= 1000),
    a('almanaque', 'Almanaque vivo', '10.000 pontos no total', total >= 10000),
    a('campeao', 'Campeão', 'Vença a Copa de Pênaltis', cups >= 1),
    a('tricampeao', 'Tricampeão', 'Conquiste 3 Copas de Pênaltis', cups >= 3),
    a('viajante', 'Viajante do tempo', 'Empilhe 15 cartas na Linha do Tempo', bestCartas >= 15),
    a('cacador', 'Caçador de craques', 'Cace 10 intrusos numa só corrida', bestCaca >= 10),
  ]
}
