# Zenith Drones

E-commerce de demonstração com catálogo de produtos, carrinho e checkout via Stripe. Conteúdo gerenciado diretamente via banco Postgres + Prisma.

## ✨ Stack

- **[Next.js 15](https://nextjs.org/)** (App Router) + **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **Postgres + [Prisma](https://www.prisma.io/)** (banco de dados e ORM)
- **[Stripe](https://stripe.com/)** (Checkout)
- **[Zustand](https://zustand-demo.pmnd.rs/)** (estado do carrinho)
- **[NextAuth.js](https://next-auth.js.org/)** (autenticação)
- **[Tailwind CSS 4](https://tailwindcss.com/)**
- **[HeroUI](https://heroui.com/)** (UI: Navbar com glassmorphism, etc.)
- **[Framer Motion](https://www.framer.com/motion/)** (animações e transições)
- **[Lucide React](https://lucide.dev/)** (ícones no Header/Navbar)

## 📁 Estrutura

- `src/app/` — rotas (home, checkout, API)
- `src/components/` — Header, Basket, Products, HeroExplosion, etc.
- `src/lib/` — utilidades globais (ex.: `prisma`)
- `src/data/` — funções de acesso a dados (queries com Prisma)
- `src/store/` — store Zustand do carrinho
- `src/utils/` — helpers (API, Stripe)
- `src/types/` — tipos globais (Product, Category, etc.)

## 🚀 Como rodar

1. **Instalar dependências**

```bash
pnpm install
```

2. **Variáveis de ambiente**

- Copie `.env.example` para `.env.local`.
- Preencha no mínimo:
  - `DATABASE_URL` (Postgres, ex.: `postgresql://user:pass@localhost:5432/zenith_drones`)
  - `AUTH_SECRET` (NextAuth; gere com `openssl rand -base64 32`)
  - Para checkout: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` e `STRIPE_SECRET_KEY` ([Stripe](https://stripe.com/))

3. **Subir o servidor**

```bash
pnpm dev
```

- **App:** [http://localhost:3000](http://localhost:3000)


## 📜 Scripts

| Comando        | Descrição              |
|----------------|------------------------|
| `pnpm dev`     | Servidor de desenvolvimento |
| `pnpm build`   | Build de produção      |
| `pnpm start`   | Servidor de produção   |
| `pnpm format`  | Formatar com Prettier  |
| `pnpm run prisma:migrate` | (sugestão) Rodar migrações Prisma para o Postgres |

## 📋 Project Management

O desenvolvimento é gerenciado no **Linear**.
Desenvolvido com metodologia ágil, com milestones e sprint tracking

Board do projeto: [Zenith Drones — Linear](https://linear.app/zenith-drones/project/zenith-drones-4a54a605468f)

## 🤝 Contribuindo

Sugestões, melhorias e correções são bem-vindas: abra uma issue ou envie um pull request.

## Autor

**Nikson Rotondaro**

- GitHub: [@NRotondaro](https://github.com/NRotondaro)
- LinkedIn: [nikson-rotondaro](https://www.linkedin.com/in/nikson-rotondaro/)
- Website: [Portfolio](https://www.nikson.dev/)
