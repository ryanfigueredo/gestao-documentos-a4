const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const users = [
    {
      name: 'Master Ryan',
      email: 'ryan@elias.com',
      cpf: '00002000000',
      password: '123456',
      role: 'master',
      status: 'aprovado',
    },
    {
      name: 'Consultor João',
      email: 'joao@elias.com',
      cpf: '00003000000',
      password: '123456',
      role: 'consultor',
      status: 'aprovado',
    },
  ]

  for (const user of users) {
    const hashed = await bcrypt.hash(user.password, 10)
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        password: hashed,
        role: user.role,
        status: user.status,
        adminId: user.role === 'consultor' ? null : undefined,
      },
    })
  }

  console.log('✅ Usuários criados com sucesso.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
