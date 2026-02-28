/**
 * Script de inserção de dados no Sanity: categorias e drones fictícios Zenith.
 * Requer: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN no .env.local
 *
 * Uso: pnpm run seed:sanity
 */

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega .env.local a partir da raiz do projeto (pasta do script = scripts/, raiz = ..)
function loadEnvLocal() {
  const projectRoot = path.resolve(__dirname, '..');
  const envPath = path.join(projectRoot, '.env.local');
  if (!existsSync(envPath)) return;
  let content = readFileSync(envPath, 'utf8');
  content = content.replace(/^\uFEFF/, ''); // remove BOM (UTF-8 com BOM)
  content.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      process.env[key] = value; // sempre sobrescreve com o valor do arquivo
    }
  });
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    'Erro: defina NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_TOKEN no .env.local'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

/** Helper para criar um bloco de texto (blockContent) */
function blockParagraph(text: string, key: string) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
    markDefs: [],
  };
}

const CATEGORY_IDS = {
  cinematografia: 'category-cinematografia',
  inspecao: 'category-inspecao',
  esporte: 'category-esporte',
} as const;

async function seedCategories() {
  const categories = [
    { _id: CATEGORY_IDS.cinematografia, title: 'Cinematografia', slug: 'cinematografia' },
    { _id: CATEGORY_IDS.inspecao, title: 'Inspeção', slug: 'inspecao' },
    { _id: CATEGORY_IDS.esporte, title: 'Esporte', slug: 'esporte' },
  ];

  for (const cat of categories) {
    await client.createOrReplace({
      _id: cat._id,
      _type: 'category',
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
    });
    console.log(`Categoria criada: ${cat.title}`);
  }
}

async function seedProducts() {
  const products = [
    {
      title: 'Zenith Cine Pro',
      slug: 'zenith-cine-pro',
      categoryId: CATEGORY_IDS.cinematografia,
      price: 45900,
      description: [
        blockParagraph(
          'O Zenith Cine Pro é a escolha de cineastas e produtoras que não abrem mão de qualidade. Estabilização em 3 eixos, suporte a câmeras full-frame e um sistema de transmissão em 4K que entrega imagens cinematográficas em tempo real. Design em fibra de carbono e acabamento premium para sets profissionais.',
          'cine-desc'
        ),
      ],
      batteryLife: 42,
      maxSpeed: 65,
      cameraResolution: '6K RAW, 12MP stills',
      weight: 2890,
    },
    {
      title: 'Zenith Inspect X',
      slug: 'zenith-inspect-x',
      categoryId: CATEGORY_IDS.inspecao,
      price: 28900,
      description: [
        blockParagraph(
          'Desenvolvido para inspeção industrial e mapeamento de precisão, o Zenith Inspect X combina sensores térmicos e ópticos de alta resolução com software de análise integrado. Estrutura reforçada, IP54 e autonomia estendida para missões em ambientes exigentes. A solução de luxo para quem exige dados confiáveis.',
          'inspect-desc'
        ),
      ],
      batteryLife: 55,
      maxSpeed: 50,
      cameraResolution: '4K + térmico 640x512',
      weight: 1850,
    },
    {
      title: 'Zenith Sport One',
      slug: 'zenith-sport-one',
      categoryId: CATEGORY_IDS.esporte,
      price: 12900,
      description: [
        blockParagraph(
          'Leve, ágil e com design exclusivo, o Zenith Sport One foi pensado para acompanhar atletas e aventuras ao ar livre. Segue o alvo automaticamente, resiste a respingos e impactos e grava em 4K 60fps com estabilização de imagem de referência. Performance de luxo em um pacote acessível.',
          'sport-desc'
        ),
      ],
      batteryLife: 34,
      maxSpeed: 72,
      cameraResolution: '4K 60fps, 12MP',
      weight: 495,
    },
  ];

  for (const p of products) {
    await client.create({
      _type: 'product',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      category: { _type: 'reference', _ref: p.categoryId },
      price: p.price,
      description: p.description,
      image: [],
      batteryLife: p.batteryLife,
      maxSpeed: p.maxSpeed,
      cameraResolution: p.cameraResolution,
      weight: p.weight,
    });
    console.log(`Produto criado: ${p.title} — R$ ${p.price.toLocaleString('pt-BR')}`);
  }
}

async function main() {
  console.log('Iniciando seed do Sanity...\n');
  await seedCategories();
  console.log('');
  await seedProducts();
  console.log('\nSeed concluído com sucesso.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
