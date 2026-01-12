# 🚌 BusoBRAS API - Uma oportunidade de aprendizado

Durante dois anos, eu não conseguia focar em desenvolver nada por conta própria; estava sempre delegando tarefas para a IA. Cansado disso e querendo realmente dominar o backend, decidi fazer esta API do zero, assumindo as rédeas de cada linha de código.

O **BusoBRAS** é uma plataforma de anúncios para venda de ônibus, construída para ser robusta, segura e performática.

## 🚀 Funcionalidades

### Autenticação e Usuários

* **Registro**: Implementei um fluxo de cadastro com validação robusta de senha via Regex, garantindo que o usuário crie contas seguras (mínimo de 8 caracteres, letras maiúsculas, minúsculas e caracteres especiais).


* **Login**: Focado em segurança, o sistema valida as credenciais e retorna um **Cookie assinado** contendo o JWT. O cookie é configurado como `httpOnly` e `secure`, com expiração de 15 minutos para o token, protegendo contra interceptações e acessos indevidos.



### Gestão de Anúncios (Ônibus)

* **Create**: Uma rota privada onde apenas usuários autenticados podem anunciar. O sistema utiliza o `userId` extraído do token para vincular automaticamente o anúncio ao seu criador.


* **Update**: Permite a atualização de dados de um anúncio existente. Apliquei uma regra de proteção onde apenas o proprietário do anúncio (o `advertiser`) tem permissão para modificar os dados.


* **Read**: Uma rota pública que permite a qualquer pessoa visualizar os detalhes de um ônibus pelo ID, incluindo o nome do anunciante, graças a uma integração eficiente entre as coleções de carros e usuários.



## 🧠 O que aprendi e apliquei "na mão"

Neste projeto, fiz questão de entender e implementar conceitos fundamentais de desenvolvimento backend moderno:

* **Validação rigorosa com Zod**: Em vez de confiar cegamente nos dados de entrada, utilizei o **Zod** para validar cada campo (marca, modelo, preço, combustível, etc.) tanto nas rotas quanto nas variáveis de ambiente.


* **Segurança em Camadas**: Além do JWT, utilizei o **Helmet** para configurar headers de segurança e o **Bcrypt** para o hashing de senhas antes de salvá-las no banco.


* **Arquitetura Limpa**: Organizei o código seguindo o padrão de **Controllers** (lidando com a requisição/resposta) e **Services** (onde reside a lógica de negócio), facilitando a manutenção futura.


* **Resiliência (Graceful Shutdown)**: Implementei uma lógica no `starter.ts` para que, ao encerrar o servidor, a aplicação feche as conexões com o banco de dados de forma limpa, evitando corrupção de dados.


* **Testes Automatizados**: Desenvolvi testes com **Vitest** e mocks para garantir que os serviços de busca e criação funcionem conforme o esperado sem depender de um banco de dados real durante os testes.



## 🛠️ Tecnologias Utilizadas

* **Runtime**: Node.js com TypeScript.


* **Framework**: Fastify (escolhido pela alta performance e baixo overhead).


* **Banco de Dados**: MongoDB com Mongoose.


* **Validação**: Zod & Fastify Type Provider Zod.


* **Testes**: Vitest e Supertest.


* **Documentação**: Swagger (disponível em `/docs` no ambiente de desenvolvimento).



## ⚙️ Como rodar o projeto

1. Clone o repositório.
2. Instale as dependências:
```bash
pnpm install

```


3. Configure o arquivo `.env` baseando-se no `env-config.ts` (é necessário informar `MONGO_URI`, `JWT_ACCESS_SECRET`, etc.).


4. Inicie em modo de desenvolvimento:
```bash
pnpm dev

```


5. Para rodar os testes:
```bash
pnpm test

```



---

**Desenvolvido por Gustavo da Silva Santos**.
