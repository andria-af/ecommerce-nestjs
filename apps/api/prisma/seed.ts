import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // =========================
  // ADMIN
  // =========================
  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      name: 'Admin Demo',
      email: 'admin@demo.com',
      passwordHash,
      role: 'ADMIN',
    },
  });

  // =========================
  // STORE SETTINGS
  // =========================
  await prisma.storeSettings.upsert({
    where: { id: '6020d9f9-a0d4-4281-ab2c-c81f2696935' }, // id do print
    update: {},
    create: {
      id: '6020d9f9-a0d4-4281-ab2c-c81f2696935',
      storeName: 'Loja Demo',
      whatsappNumber: '555199252389',
      primaryColor: '#795380',
      homeImageUrl: '/uploads/7f562dc0-81ad-4c5f-ac37-3ba89bf3cadb.png',
      instagramUrl: 'https://www.instagram.com/drabrunafukami/',
      logoUrl: null,
    },
  });

  // =========================
  // PRODUCTS
  // =========================
  const products = [
    {
      id: '210f8f8c-e4dd-43ef-995d-c6ec84b2e26e',
      title: 'Consultoria',
      description:
        'Sessão de consulta biomédica para avaliar e esclarecer sobre procedimentos.',
      priceCents: 25000,
      imageUrl: '/uploads/44a68684-8378-4c65-8de8-22fc5e8d1707.png',
      active: true,
    },
    {
      id: '28777fbf-8cbe-4d8f-a9ef-1f6831a863bc',
      title: 'Toxina Botulínica (Botox)',
      description:
        'A aplicação de toxina botulínica é um procedimento seguro e eficaz.',
      priceCents: 120000,
      imageUrl: '/uploads/6f652dc3-d223-4de9-b7ca-7a04e83ff404.jpg',
      active: true,
    },
    {
      id: '8c01b9dd-867a-454b-9627-89215ce499c5',
      title: 'Aplicação de Ácido Hialurônico',
      description: 'Procedimento estético indicado para reposição de volume.',
      priceCents: 180000,
      imageUrl: '/uploads/24997bcd-5870-41e3-bc24-511626d0653.jpg',
      active: true,
    },
    {
      id: '5b46bcd9-9531-4119-8b5e-23c57567fa6e',
      title: 'Limpeza de Pele Profunda + Tratamento Facial',
      description:
        'Tratamento facial completo que promove a remoção de impurezas.',
      priceCents: 25000,
      imageUrl: '/uploads/71da4668-9992-4aab-9392-d84c8724454c.jpg',
      active: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
