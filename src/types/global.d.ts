/** Tipos globais do projeto (modelo Prisma) */

interface Category {
  id: string;
  slug: string;
  title: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface Product {
  id: string;
  title: string;
  price: number; // em centavos ou reais, dependendo da configuração
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  categoryId?: string | null;
  category?: Category | null;

  /** Technical Specs (para comparação) */
  batteryLife?: number | null;
  maxSpeed?: number | null;
  cameraResolution?: string | null;
  weight?: number | null; // gramas
}

