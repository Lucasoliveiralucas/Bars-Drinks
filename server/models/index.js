import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //   await prisma.user.create({
  //     data: {
  //       name: "Lucas",
  //       email: "lucas@email",
  //       Reviews: {
  //         create: [
  //           {
  //             drink_id: "1237863",
  //             rating_: 33,
  //             bar: "wilson2",
  //           },
  //         ],
  //       },
  //     },
  //   });
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
