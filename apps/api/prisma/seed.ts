import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
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

  const settingsCount = await prisma.storeSettings.count();
  if (settingsCount === 0) {
    await prisma.storeSettings.create({
      data: {
        storeName: 'Loja Demo',
        whatsappNumber: '5551999999999',
        primaryColor: '#1976d2',
      },
    });
  }

  const productsCount = await prisma.product.count();
  if (productsCount === 0) {
    await prisma.product.createMany({
      data: [
        {
          title: 'Consultoria (1h)',
          description: 'Sessão de consultoria online de 1 hora via WhatsApp.',
          priceCents: 15000,
          imageUrl: 'https://picsum.photos/seed/consultoria/800/600',
          active: true,
        },
        {
          title: 'Serviço Premium',
          description:
            'Serviço sob demanda, combinado diretamente pelo WhatsApp.',
          priceCents: 29900,
          imageUrl: 'https://picsum.photos/seed/premium/800/600',
          active: true,
        },
      ],
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
