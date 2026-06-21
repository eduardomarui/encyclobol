# ⚽ Encyclobol

A enciclopédia **jogável** do futebol — quizzes, escalações de lendas e desafios diários sobre toda a história do futebol mundial.

> Stack: React + Vite + TypeScript + Tailwind CSS · arquitetura 100% containerizada (Docker).

## Pré-requisitos

Só precisa de **Docker** instalado. Não é necessário ter Node na máquina — tudo roda em container.

## Desenvolvimento (hot-reload)

```bash
docker compose up --build
```

Abra **http://localhost:5173** — o Vite recarrega automaticamente ao salvar arquivos em `web/src`.

Para parar:

```bash
docker compose down
```

## Produção (build otimizado + nginx)

```bash
docker compose -f docker-compose.prod.yml up --build
```

Abra **http://localhost:8080**.

## Estrutura

```
encyclobol/
├── docker-compose.yml          # ambiente de desenvolvimento
├── docker-compose.prod.yml     # ambiente de produção
└── web/                        # frontend
    ├── Dockerfile              # build multi-stage → nginx (prod)
    ├── Dockerfile.dev          # node + vite (dev)
    ├── nginx.conf
    └── src/
        ├── App.tsx
        └── components/landing/ # seções da landing page
```

## Roadmap

- [x] Landing page
- [ ] Banco de dados de jogadores (seleções e clubes históricos)
- [ ] Minigame: Quem sou eu?
- [ ] Minigame: Quiz Relâmpago
- [ ] Minigame: Escalação Rápida
- [ ] Autenticação e ranking global
- [ ] Plano Pro (pagamentos)
