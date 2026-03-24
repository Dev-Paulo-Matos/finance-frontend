💰 Finance App - Controle Financeiro SaaS

Aplicação completa de controle financeiro pessoal, com arquitetura moderna baseada em Spring Boot + React, projetada para escalar como um MicroSaaS.

🚀 Visão Geral

O Finance App é uma plataforma para gerenciamento financeiro que permite:

Controle de contas
Registro de receitas e despesas
Organização por categorias
Dashboard com visão consolidada
Sistema multi-tenant (base para SaaS)

A aplicação foi desenvolvida com foco em performance, escalabilidade e experiência do usuário.

🧱 Arquitetura
🔙 Backend
Java 21
Spring Boot 3
Spring Security + JWT
Spring Data JPA (Hibernate)
PostgreSQL
Docker
🔜 Frontend
Angular
TypeScript
Tailwind CSS
Deploy via GitHub Pages
☁️ Infraestrutura
Backend: Railway
Banco de dados: PostgreSQL (Railway)
Frontend: GitHub Pages
📦 Funcionalidades
👤 Autenticação
Registro de usuários
Login com JWT
Proteção de rotas
🏢 Multi-tenant
Cada usuário pertence a um tenant
Base para modelo SaaS
💳 Contas
Cadastro de contas financeiras
Controle de saldo
📊 Transações
Registro de entradas e saídas
Associação com categorias
🗂️ Categorias
Organização financeira
Classificação de despesas e receitas
📈 Dashboard
Visão consolidada
Base para relatórios futuros
🔐 Segurança
Autenticação via JWT
Senhas criptografadas com BCrypt
CORS configurado para frontend
Variáveis de ambiente para dados sensíveis
⚙️ Variáveis de Ambiente
Backend (Railway)
DB_URL=jdbc:postgresql://HOST:PORT/DB
DB_USER=postgres
DB_PASSWORD=senha

JWT_SECRET=chave_super_secreta
JWT_EXPIRATION=86400000

⚠️ Nunca versionar .env

🐳 Docker
Dockerfile
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
Build local
mvn clean package
docker build -t finance-app .
docker run -p 8080:8080 finance-app
🌍 Deploy
Backend (Railway)
Criar projeto no Railway
Conectar com GitHub
Adicionar variáveis de ambiente
Deploy automático via Docker
Frontend (GitHub Pages)
ng build --configuration production --base-href="/finance-frontend/"
npx angular-cli-ghpages --dir=dist
🔗 API Base URL
https://financeapi-production.up.railway.app/api
🧪 Teste de API

Exemplo de registro:

curl -X POST https://financeapi-production.up.railway.app/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "userName":"teste@email.com",
  "name":"Usuário",
  "email":"teste@email.com",
  "password":"123456",
  "passCode":"default",
  "phone":"(11)99999-9999"
}'
📁 Estrutura do Projeto
Backend
finance/
 ├── security/
 ├── user/
 ├── tenant/
 ├── config/
 ├── repository/
 ├── service/
 └── controller/
Frontend
src/
 ├── app/
 ├── components/
 ├── services/
 ├── pages/
 └── environments/
📌 Roadmap

Plano Premium

Relatórios avançados

Integração com pagamentos

Notificações (WhatsApp / Email)

Controle de boletos

Dashboard analítico completo

🧠 Diferenciais
Estrutura pronta para SaaS
Backend escalável
Separação clara de responsabilidades
Deploy cloud-ready
Integração frontend + backend real
👨‍💻 Autor

Paulo Matos

Desenvolvedor Full Stack
Especialista em sistemas financeiros e SaaS
📄 Licença

Este projeto está sob a licença MIT.
