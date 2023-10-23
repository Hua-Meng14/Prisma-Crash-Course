import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Prisma Queries

    // <-------- CREATE USER --------->
    const user = await prisma.user.create({
        data:{
            name: 'Huameng',
            email: 'huameng@gmail.com'
        },
    });
    console.log(user)

    // <-------- GET ALL USERS --------->
    const users = await prisma.user.findMany();
    console.log(users);

    // <-------- CREATE ARTICLE AND ASSOCIATE IT WITH USER --------->
    const article = await prisma.article.create({
        data: {
            title: "Huameng First Article",
            body: "This is Huameng first article",
            author: {
                connect: {
                    id: 1
                }
            }
        }
    })
    console.log(article)


    // <-------- GET ALL ARTICLES --------->
    const articles = await prisma.article.findMany();
    console.log(articles);

    // <-------- CREATE USER AND ASSOCIATE WITH NEW ARTICLE --------->
    const user = await prisma.user.create({
        data: {
            name: "Chhivtieng",
            email: "chhivtieng@gmail.com",
            articles: {
                create: {
                    title: "Chhivtieng First Article",
                    body: "This is chhivtieng first article"
                }
            }
        }
    })
    console.log(user);


    // <-------- GET ALL USERS INCLUDE ARTICLES --------->
    const users = await prisma.user.findMany({
        include: {
            articles: true
        }
    });
    console.log(users);

    // <-------- CREATE ABITGER ARTICLE --------->
    const article = await prisma.article.create({
        data: {
            title: "Sample Article",
            body: "This is a sample article",
            author: {
                connect: {
                    id: 2
                }
            }
        }
    })
    console.log(article)

    // <-------- LOOP OVER USERS ARTICLES--------->
    const users = await prisma.user.findMany({
        include:{
            articles: true
        }
    })
    users.forEach((user) => {
        console.log(`User: ${user.name}, Email: ${user.email}.`);
        console.log('Articles: ');
        user.articles.forEach((article) => {
            console.log(`${article.id}). Ttile: ${article.title}, Body: ${article.body}.`)
        });
        console.log("\n");
    });

    // <-------- UPDATE USER NAME --------->
    const user = await prisma.user.update({
        where: {
            id: 1
        },
        data: {
            name: "GM Hua"
        }
    });
    console.log(user);

    // <-------- REMOVE ARTICLE/DATA --------->
    const article = await prisma.article.delete({
        where: {
            id: 2
        }
    });
    console.log(article);
}


// <------------ OPEN PRISMA GUI/PRISMA STUDIO ------------>
// CMD: npx prisma studio

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })