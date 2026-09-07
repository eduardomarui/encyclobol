#!/usr/bin/env python3
"""Sanidade da base de dados do Encyclobol (roda sem Node, só Python 3).

Uso: python3 scripts/check_data.py
Lê web/src/data/*.ts com regex (os arquivos são listas literais simples) e
aponta duplicatas, campos fora do conjunto permitido e puzzles malformados.
Sai com código 1 se achar problema.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / 'web' / 'src'
DATA = ROOT / 'data'
POS = {'Atacante', 'Goleiro', 'Lateral', 'Meia', 'Ponta', 'Zagueiro'}
COLORS = {'corn', 'grass', 'ochre', 'ink'}
CATS_INTRUSO = {'Posição', 'Nacionalidade', 'Clube', 'Era'}
STR = r"(?:'(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")"
problems: list[str] = []


def warn(msg: str) -> None:
    problems.append(msg)


def read(name: str) -> str:
    p = DATA / name
    return p.read_text(encoding='utf-8') if p.exists() else ''


def strip_comments(src: str) -> str:
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
    return re.sub(r'^\s*//.*$', '', src, flags=re.M)


# ---------- players ----------
players_src = strip_comments(read('players.ts') + '\n' + read('players.extra.ts'))
players = re.findall(
    rf"\{{\s*answer:\s*'([^']*)',\s*display:\s*({STR}),\s*nat:\s*'([^']*)',\s*pos:\s*'([^']*)',\s*era:\s*'([^']*)'\s*\}}",
    players_src,
)
answers = [p[0] for p in players]
seen: dict[str, int] = {}
for a in answers:
    seen[a] = seen.get(a, 0) + 1
for a, n in seen.items():
    if n > 1:
        warn(f'players: answer duplicado {a} ({n}x)')
displays: dict[str, int] = {}
for _, d, *_ in players:
    d = d[1:-1]
    displays[d] = displays.get(d, 0) + 1
for d, n in displays.items():
    if n > 1:
        warn(f'players: display duplicado "{d}" ({n}x)')
for a, d, nat, pos, era in players:
    if not re.fullmatch(r'[A-Z]{3,15}', a):
        warn(f'players: answer inválido {a!r} ({d})')
    if pos not in POS:
        warn(f'players: posição fora do conjunto {pos!r} ({d})')
    if not re.fullmatch(r'\d{4}–(\d{4}|presente)', era):
        warn(f'players: era mal formatada {era!r} ({d})')
    else:
        y0 = int(era[:4])
        y1 = era[5:]
        if y1 != 'presente' and int(y1) < y0:
            warn(f'players: era invertida {era} ({d})')
        if y0 < 1880 or y0 > 2026:
            warn(f'players: ano de início suspeito {y0} ({d})')

nats = sorted({p[2] for p in players})
mist = read('../pages/Misterioso.tsx')
cont_keys = set(re.findall(r"^\s*'?([^':\n]+?)'?:\s*'(?:América do Sul|América do Norte|Europa|África|Ásia|Oceania)'", mist, flags=re.M))
for n in nats:
    if n not in cont_keys:
        warn(f'Misterioso.CONTINENT: falta nacionalidade {n!r}')

# clubs
clubs_src = strip_comments(read('clubs.ts') + '\n' + read('players.extra.ts'))
club_keys = re.findall(r"^\s*([A-Z]+):\s*'[^']+',?\s*$", clubs_src, flags=re.M)
for k in club_keys:
    if k not in seen:
        warn(f'clubs: dica para answer inexistente {k}')

# ---------- quiz ----------
quiz_src = strip_comments(read('quiz.ts') + '\n' + read('quiz.extra.ts'))
qs = re.findall(
    r"\{\s*q:\s*'((?:[^'\\]|\\.)*)',\s*options:\s*\[([^\]]*)\],\s*correct:\s*(\d+),\s*cat:\s*'([^']*)',\s*dif:\s*'([^']*)'\s*\}",
    quiz_src,
)
qtexts: dict[str, int] = {}
for q, opts, correct, cat, dif in qs:
    key = re.sub(r'\W+', '', q.lower())
    qtexts[key] = qtexts.get(key, 0) + 1
    n_opts = len(re.findall(STR, opts))
    if n_opts != 4:
        warn(f'quiz: {n_opts} opções em "{q[:60]}"')
    if correct != '0':
        warn(f'quiz: correct != 0 em "{q[:60]}"')
    if dif not in {'facil', 'dificil'}:
        warn(f'quiz: dif inválida {dif!r} em "{q[:60]}"')
    opt_list = re.findall(STR, opts)
    if len(set(opt_list)) != len(opt_list):
        warn(f'quiz: opção repetida em "{q[:60]}"')
for k, n in qtexts.items():
    if n > 1:
        warn(f'quiz: pergunta duplicada ({n}x): {k[:60]}')

# ---------- intruso ----------
intr_src = strip_comments(read('intruso.ts') + '\n' + read('intruso.extra.ts'))
puzzles = re.findall(
    r"players:\s*\[([^\]]*)\],\s*intruder:\s*'([^']*)',\s*cat:\s*'([^']*)',\s*rule:\s*'((?:[^'\\]|\\.)*)'",
    intr_src,
)
intr_sets: dict[str, int] = {}
for pl, intruder, cat, rule in puzzles:
    names = [n[1:-1] for n in re.findall(STR, pl)]
    if len(names) != 4 or len(set(names)) != 4:
        warn(f'intruso: precisa de 4 nomes distintos: {names}')
    if intruder not in names:
        warn(f'intruso: intruso {intruder!r} não está em {names}')
    if cat not in CATS_INTRUSO:
        warn(f'intruso: cat inválida {cat!r} ({names})')
    key = '|'.join(sorted(names))
    intr_sets[key] = intr_sets.get(key, 0) + 1
for k, n in intr_sets.items():
    if n > 1:
        warn(f'intruso: puzzle duplicado ({n}x): {k}')

# ---------- conexoes ----------
con_src = strip_comments(read('conexoes.ts') + '\n' + read('conexoes.extra.ts'))
all_groups = re.findall(rf"color:\s*'([^']*)',\s*label:\s*({STR}),\s*members:\s*\[([^\]]*)\]", con_src)
if len(all_groups) % 4:
    warn(f'conexoes: {len(all_groups)} grupos no total (não é múltiplo de 4)')
con_puzzles = [all_groups[i:i + 4] for i in range(0, len(all_groups) - len(all_groups) % 4, 4)]
for i, groups in enumerate(con_puzzles, 1):
    colors = [g[0] for g in groups]
    if set(colors) != COLORS:
        warn(f'conexoes #{i}: cores {colors}')
    members: list[str] = []
    for _, label, ms in groups:
        names = [n[1:-1] for n in re.findall(STR, ms)]
        if len(names) != 4:
            warn(f'conexoes #{i}: grupo {label} tem {len(names)} membros')
        members += names
    if len(set(members)) != len(members):
        dup = sorted({m for m in members if members.count(m) > 1})
        warn(f'conexoes #{i}: membro repetido {dup}')

print(f'players {len(players)} · quiz {len(qs)} · intruso {len(puzzles)} · conexoes {len(con_puzzles)} · nacionalidades {len(nats)}')
if problems:
    print('\n'.join(f'  ! {p}' for p in problems))
    sys.exit(1)
print('ok — sem problemas')
