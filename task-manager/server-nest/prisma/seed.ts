import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Predefined states
  const states = [{ name: 'pending' }, { name: 'working' }, { name: 'done' }];

  // Upsert states (create if they don't exist, update if they do)
  for (const state of states) {
    await prisma.state.upsert({
      where: { name: state.name },
      update: {},
      create: state,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
