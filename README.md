# Prisma-Crash-Course

### Create package.json
`npm init -y`

### Install nodejs and typescript as Development dependencies
`npm i typescript ts-node @types/node -D`

### Create tsconfig.json
`npx tsc --init`

### Install Prisma
`npm install prisma`

### Initialize Prisma with Datasource Provider (SQLITE/POSTGRESQL/MYSQL/MONGODB)
`npx prisma init --datasource-provider sqlite`

### Database Migration for schema changes update
`npx prisma migrate dev --name init`