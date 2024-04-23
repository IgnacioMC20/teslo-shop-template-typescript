# Online Shop Template

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d significa **detached**

MongoDB URL local:

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno

Renombrear el archibo **.env.template** a **.env**

## Getting Started

First, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Llenar la base de datos con la informacion de pruebas

llamar a:

```
http://localhost:3000/api/seed
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
