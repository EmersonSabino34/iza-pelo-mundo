# Iza Pelo Mundo — Izabelle Lessa Viagens

Projeto Next.js (App Router) para apresentar viagens e experiências no Brasil.

Resumo / Summary
- Página principal bilíngue (PT/EN) com opções de cidade.
- Páginas separadas por cidade em `/city/[id]` com slider, galerias, likes e comentários.
- API simples em `app/api/cities/[id]/route.ts` que persiste em `data/city-data.json`.

Requisitos / Requirements
- Node.js 18+ (recomendado)
- npm

Instalação / Install
```bash
cd iza-pelo-mundo
npm install
```
Rodar em desenvolvimento / Run dev
```bash
npm run dev
# A aplicação estará disponível em http://localhost:3000
```
Build / Production
```bash
npm run build
npm start
```
API & Persistência
- Endpoints: `GET /api/cities/{id}` e `POST /api/cities/{id}`
- Os POSTs exigem header `x-api-key`. Configure `CITY_API_KEY` no ambiente (padrão de desenvolvimento: `dev-key`).
- Dados persistidos em: `data/city-data.json` (arquivo JSON simples).

Como funciona (curto)
- Dados das cidades e imagens: `lib/cities.ts`.
- Slider: `components/slider.tsx` (suporta legendas em PT/EN).
- Páginas de cidade: `app/city/[id]/page.tsx` (usa API para likes/comentários; com fallback para localStorage).

Personalização rápida
- Alterar número do WhatsApp: busque pelo número `+351938983505` no código e substitua.
- Alterar chave da API: defina `CITY_API_KEY` no ambiente.

Notas
- Não houve commits automáticos por pedido do usuário — revise e commite quando quiser.
- Para produção, use uma chave segura e remova o fallback para localStorage se desejar consistência centralizada.

---------------
# English

Iza Pelo Mundo — travel showcase built with Next.js (App Router).

Quick start
```bash
cd iza-pelo-mundo
npm install
npm run dev
```

Production
```bash
npm run build
npm start
```

API
- GET `/api/cities/{id}` — public
- POST `/api/cities/{id}` — requires `x-api-key` header (env: `CITY_API_KEY`)
- Data stored in `data/city-data.json`

Files of interest
- `app/page.tsx` — main index (links to city pages)
- `app/city/[id]/page.tsx` — dynamic city pages
- `lib/cities.ts` — city metadata and image captions
- `components/slider.tsx` — image carousel with captions
- `app/api/cities/[id]/route.ts` — simple file-based persistence API

If you want, I can prepare a commit next or help configure an external DB for production persistence.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
