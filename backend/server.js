
//import cors from 'cors'
import express from 'express';
import cors from 'cors';

const app = express();
import { PrismaClient } from './generated/prisma/index.js'
const prisma = new PrismaClient()

app.use(cors());        // ← 2. use it before routes
app.use(express.json());

const users = []

app.post('/usuarios', async (req,res) => {

  await prisma.user.create({
      data:{
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
      
    }

  })
  
  res.status(201).json(req.body)
})
app.get('/usuarios', async (req, res) =>{

    const users = await prisma.user.findMany()

    res.status(200).json(users)
} )
app.put('/usuarios/:id', async (req, res) =>{
  await prisma.user.update({
    where: {
      id: req.params.id
    },
      data:{
      email: req.body.email,
      name: req.body.nome,
      age: req.body.age
      
    }

  })
  res.status(201).json(req.body)

} )

app.delete('/usuarios/:id', async (req,res) => {
  await prisma.user.delete({
    where:{
      id: req.params.id
    }
  })
  res.status(200).json({message: 'Usuario Deletado com Sucesso!'})
})
app.listen(3000)






// IIywWTgrHxiEtpFb
// gsz