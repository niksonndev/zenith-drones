# Sanity Studio v3 (Zenith Drones)

Content studio for the Zenith Drones project. Built with Sanity Studio v3.

## Setup

```bash
pnpm install
# or: npm install / yarn
```

## Commands

- **`pnpm dev`** or **`pnpm start`** – start the studio (default: http://localhost:3333)
- **`pnpm build`** – build the studio for production

## Config

- **sanity.config.js** – Studio config (projectId, dataset, plugins, schema)
- **sanity.cli.js** – CLI config (projectId, dataset for `sanity` commands)
- **schemas/** – Document and object types (product, category, blockContent, locale, barcode)
- **plugins/barcode-input/** – Custom barcode object type with preview
