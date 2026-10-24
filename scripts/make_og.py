#!/usr/bin/env python3
"""Gera as imagens de prévia (1200x630) que aparecem quando o link é colado
no WhatsApp/Twitter. Uma por jogo + uma geral. Rode: python3 scripts/make_og.py
Saída: web/public/og/<slug>.png (commitadas no repo)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'web' / 'public' / 'og'
LOGO = ROOT / 'web' / 'public' / 'logo.png'
F = '/System/Library/Fonts/Supplemental/'
HEAD = ImageFont.truetype(F + 'Impact.ttf', 118)
KICK = ImageFont.truetype(F + 'DIN Condensed Bold.ttf', 40)
SUB = ImageFont.truetype(F + 'DIN Condensed Bold.ttf', 46)
FOOT = ImageFont.truetype(F + 'DIN Condensed Bold.ttf', 34)

W, H = 1200, 630
PAPER = (11, 36, 28)
CHALK = (238, 245, 241)
CORN = (230, 183, 62)
INK2 = (155, 182, 171)

GAMES = {
    'default': ('O almanaque jogável do futebol', 'ENCYCLOBOL', 'Sete desafios por dia. Sem chute, sem Google.'),
    'jogos': ('Os jogos de hoje', 'ENCYCLOBOL · EDIÇÃO DO DIA', 'Sete desafios novos todo dia. Quantos você fecha?'),
    'quem-sou-ele': ('Tira-Teima', 'JOGO 01 · CARREIRA', 'Adivinhe o craque letra por letra, contra o relógio.'),
    'penaltis': ('Copa de Pênaltis', 'JOGO 02 · MATA-MATA', 'Acertou a pergunta, é gol. Levante a taça.'),
    'penaltis-online': ('Duelo de Pênaltis', 'AO VIVO · 1 CONTRA 1', 'Um bate, o outro defende. Te desafiei.'),
    'penaltis-ranqueada': ('Ranqueada', 'DA SÉRIE D À ELITE', 'Suba de divisão na temporada do mês.'),
    'conexoes': ('Quarteto', 'JOGO 03 · LÓGICA', '16 craques, 4 grupos. Cuidado com a isca.'),
    'linha-do-tempo': ('Linha do Tempo', 'JOGO 04 · CRONOLOGIA', 'Coloque os craques na ordem da história.'),
    'o-intruso': ('O Intruso', 'JOGO 05 · DEDUÇÃO', 'Três têm algo em comum. Um é o infiltrado.'),
    'craque-misterioso': ('Craque Misterioso', 'JOGO 06 · DETETIVE', 'Seleção, posição, época: descubra quem é.'),
    'ranking': ('Ranking', 'GLOBAL · AMIGOS · TORCIDAS', 'Sua torcida contra a do seu amigo. Toda semana.'),
    'escalacao': ('Quem sabe todos é mago', 'JOGO 07 · MEMÓRIA', 'Escale os 11 titulares de memória em 3 minutos.'),
}


def card(title: str, kicker: str, sub: str) -> Image.Image:
    img = Image.new('RGB', (W, H), PAPER)
    # refletores
    glow = Image.new('L', (W, H), 0)
    g = ImageDraw.Draw(glow)
    for cx in (140, W - 140):
        g.ellipse((cx - 520, -560, cx + 520, 360), fill=60)
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img = Image.composite(Image.new('RGB', (W, H), (60, 88, 76)), img, glow)
    d = ImageDraw.Draw(img)
    # trama de meio-tom
    for y in range(30, H, 22):
        for x in range(30, W, 22):
            d.ellipse((x - 1, y - 1, x + 1, y + 1), fill=(22, 52, 42))
    # moldura de giz dupla
    d.rectangle((28, 28, W - 28, H - 28), outline=(120, 140, 132), width=4)
    d.rectangle((40, 40, W - 40, H - 40), outline=(70, 96, 86), width=2)
    # logo
    if LOGO.exists():
        lg = Image.open(LOGO).convert('RGBA')
        lh = 300
        lg = lg.resize((int(lg.width * lh / lg.height), lh))
        img.paste(lg, (W - lg.width - 90, (H - lh) // 2), lg)
    x = 90
    d.text((x, 150), kicker, font=KICK, fill=CORN)
    # título: quebra em linhas e diminui a fonte até caber acima do rodapé
    # (antes o título de 3 linhas invadia o rodapé e a frase de baixo).
    foot_y = H - 95
    for size in range(118, 59, -6):
        head = ImageFont.truetype(F + 'Impact.ttf', size)
        words, lines, cur = title.upper().split(), [], ''
        for w in words:
            t = (cur + ' ' + w).strip()
            if d.textlength(t, font=head) > 740 and cur:
                lines.append(cur)
                cur = w
            else:
                cur = t
        lines.append(cur)
        lh = int(size * 1.05)
        bottom = 205 + lh * len(lines) + 12 + 50
        if bottom <= foot_y - 14 and all(d.textlength(ln, font=head) <= 760 for ln in lines):
            break
    y = 205
    for ln in lines:
        d.text((x, y), ln, font=head, fill=CHALK)
        y += lh
    d.text((x, y + 12), sub, font=SUB, fill=INK2)
    d.text((x, foot_y), 'ENCYCLOBOL · O ALMANAQUE JOGÁVEL DO FUTEBOL', font=FOOT, fill=CORN)
    return img


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, (t, k, s) in GAMES.items():
        card(t, k, s).save(OUT / f'{slug}.png', optimize=True)
        print('ok', slug)
