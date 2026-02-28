# Zenith Drones

E-commerce de demonstração com catálogo de produtos, carrinho e checkout via Stripe. Conteúdo gerenciado no Sanity Studio (embutido na aplicação).

## ✨ Stack

- **[Next.js 15](https://nextjs.org/)** (App Router) + **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Sanity](https://www.sanity.io/)** (CMS, Studio em `/studio`)
- **[Stripe](https://stripe.com/)** (Checkout)
- **[Zustand](https://zustand-demo.pmnd.rs/)** (estado do carrinho)
- **[NextAuth.js](https://next-auth.js.org/)** (autenticação)
- **[Tailwind CSS 4](https://tailwindcss.com/)**
- [Headless UI](https://headlessui.com/), [Heroicons](https://heroicons.com/), [react-hot-toast](https://react-hot-toast.com/)

## 📁 Estrutura

- `src/app/` — rotas (home, checkout, API, studio)
- `src/components/` — Header, Basket, Products, etc.
- `src/sanity/` — cliente, config, schemas e plugin de barcode
- `src/store/` — store Zustand do carrinho
- `src/utils/` — helpers (API, Stripe)
- `src/types/` — tipos globais (Product, Category, Image)

## 🚀 Como rodar

1. **Instalar dependências**

```bash
pnpm install
```

2. **Variáveis de ambiente**

- Copie `.env.example` para `.env.local`.
- Preencha no mínimo:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` (Sanity)
  - `AUTH_SECRET` (NextAuth; gere com `openssl rand -base64 32`)
  - Para checkout: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` e `STRIPE_SECRET_KEY` ([Stripe](https://stripe.com/))

3. **Subir o servidor**

```bash
pnpm dev
```

- **App:** [http://localhost:3000](http://localhost:3000)
- **Sanity Studio:** [http://localhost:3000/studio](http://localhost:3000/studio)

## 📜 Scripts

| Comando        | Descrição              |
|----------------|------------------------|
| `pnpm dev`     | Servidor de desenvolvimento |
| `pnpm build`   | Build de produção      |
| `pnpm start`   | Servidor de produção   |
| `pnpm format`  | Formatar com Prettier  |
| `pnpm run seed:sanity` | Insere categorias e drones fictícios no Sanity (requer `SANITY_API_TOKEN` no `.env.local`) |

## 🤝 Contribuindo

Sugestões, melhorias e correções são bem-vindas: abra uma issue ou envie um pull request.

## Autor

**Nikson Rotondaro**

- GitHub: [@NRotondaro](https://github.com/NRotondaro)
- LinkedIn: [nikson-rotondaro](https://www.linkedin.com/in/nikson-rotondaro/)
- Website: [Portfolio](https://www.nikson.dev/)
