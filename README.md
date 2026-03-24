# 💰 Finance App - Controle Financeiro SaaS

Aplicação completa de controle financeiro pessoal, com arquitetura moderna baseada em **Spring Boot + Angular**, projetada para escalar como um **MicroSaaS**.

---

## 🚀 Visão Geral

O Finance App é uma plataforma para gerenciamento financeiro que permite:

- Controle de contas
- Registro de receitas e despesas
- Organização por categorias
- Dashboard com visão consolidada
- Sistema multi-tenant (base para SaaS)

A aplicação foi desenvolvida com foco em **performance, escalabilidade e experiência do usuário**.

---

## 🖼️ Preview

### Landing Page
![Landing Page](https://raw.githubusercontent.com/Dev-Paulo-Matos/finance-frontend/master/public/landing_page_plans_1774007688160.png)

### Dashboard
![Dashboard](https://raw.githubusercontent.com/Dev-Paulo-Matos/finance-frontend/master/public/dashboard_and_charts_1774008320338.webp)

### Login
![Login](https://raw.githubusercontent.com/Dev-Paulo-Matos/finance-frontend/master/public/landing_and_register_1774007499172.webp)

### Cadastro

![Criando Contas](https://raw.githubusercontent.com/Dev-Paulo-Matos/finance-frontend/master/public/creating_accounts_1774007779936.webp)

![Criando Categorias](https://raw.githubusercontent.com/Dev-Paulo-Matos/finance-frontend/master/public/creating_categories_1774007957846.webp)

![Criando Transações](https://raw.githubusercontent.com/Dev-Paulo-Matos/finance-frontend/master/public/creating_transactions_1774008127660.webp)

### Relatórios
![Relatórios](https://raw.githubusercontent.com/Dev-Paulo-Matos/finance-frontend/master/public/reports_csv_export_1774008430546.webp)

### Lista de Categorias
![Categorias](https://raw.githubusercontent.com/Dev-Paulo-Matos/finance-frontend/master/public/categories_list_final_1774008086102.png)

---

## 🧱 Arquitetura

### 🔙 Backend
- Java 21
- Spring Boot 3
- Spring Security + JWT
- Spring Data JPA (Hibernate)
- PostgreSQL
- Docker

### 🔜 Frontend
- Angular
- TypeScript
- Tailwind CSS
- Deploy via GitHub Pages

### ☁️ Infraestrutura
- Backend: Railway
- Banco de dados: PostgreSQL (Railway)
- Frontend: GitHub Pages

---

## 📦 Funcionalidades

### 👤 Autenticação
- Registro de usuários
- Login com JWT
- Proteção de rotas

### 🏢 Multi-tenant
- Cada usuário pertence a um tenant
- Base para modelo SaaS

### 💳 Contas
- Cadastro de contas financeiras
- Controle de saldo

### 📊 Transações
- Registro de entradas e saídas
- Associação com categorias

### 🗂️ Categorias
- Organização financeira
- Classificação de despesas e receitas

### 📈 Dashboard
- Visão consolidada
- Base para relatórios futuros

---

## 🔐 Segurança

- Autenticação via JWT
- Senhas criptografadas com BCrypt
- CORS configurado
- Uso de variáveis de ambiente para dados sensíveis

---

## ⚙️ Variáveis de Ambiente

### Backend (Railway)

```env
DB_URL=jdbc:postgresql://HOST:PORT/DB
DB_USER=postgres
DB_PASSWORD=senha

JWT_SECRET=chave_super_secreta
JWT_EXPIRATION=86400000
```

⚠️ **Nunca versionar `.env`**

---

## 🐳 Docker

### Dockerfile

```dockerfile
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Build local

```bash
mvn clean package
docker build -t finance-app .
docker run -p 8080:8080 finance-app
```

---

## 🌍 Deploy

### Backend (Railway)

1. Criar projeto no Railway  
2. Conectar com GitHub  
3. Adicionar variáveis de ambiente  
4. Deploy automático via Docker  

---

### Frontend (GitHub Pages)

```bash
ng build --configuration production --base-href="/finance-frontend/"
npx angular-cli-ghpages --dir=dist
```

---

## 🔗 API Base URL

```
https://financeapi-production-b009.up.railway.app/api
```

---

## 🧪 Teste de API

### Registro de usuário

```bash
curl -X POST https://financeapi-production-b009.up.railway.app/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "userName":"teste@email.com",
  "name":"Usuário",
  "email":"teste@email.com",
  "password":"123456",
  "passCode":"default",
  "phone":"(11)99999-9999"
}'
```

---

## 📁 Estrutura do Projeto

### Backend

```
finance/
 ├── security/
 ├── user/
 ├── tenant/
 ├── config/
 ├── repository/
 ├── service/
 └── controller/
```

### Frontend

```
src/
 ├── app/
 ├── components/
 ├── services/
 ├── pages/
 └── environments/
```

---

## 📌 Roadmap

- Plano Premium
- Relatórios avançados
- Integração com pagamentos
- Notificações (WhatsApp / Email)
- Controle de boletos
- Dashboard analítico completo

---

## 🧠 Diferenciais

- Estrutura pronta para SaaS
- Backend escalável
- Separação clara de responsabilidades
- Deploy cloud-ready
- Integração real frontend + backend

---

## 👨‍💻 Autor

**Paulo Matos**  
Desenvolvedor Full Stack  
Especialista em sistemas financeiros e SaaS

---

## 📄 Licença

Este projeto está sob a licença MIT.
