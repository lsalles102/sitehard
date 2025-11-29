# Guia de Deploy - Render + Supabase

## 1. Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Vá em **Project Settings** > **Database**
4. Copie a **Connection string** (URI) - escolha a opção "Connection pooling" com modo "Transaction"
5. A URL terá este formato: `postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

## 2. Criar as Tabelas no Supabase

Depois de ter a DATABASE_URL, você precisa criar as tabelas. Execute localmente:

```bash
# Configure a variável de ambiente localmente
export DATABASE_URL="sua_url_do_supabase"

# Execute a migração
npm run db:push
```

## 3. Deploy no Render

1. Acesse [render.com](https://render.com) e crie uma conta
2. Conecte seu repositório GitHub/GitLab
3. Clique em **New +** > **Web Service**
4. Selecione seu repositório
5. Configure:
   - **Name**: hardzera (ou o nome que preferir)
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

6. Em **Environment Variables**, adicione:
   - `DATABASE_URL` = sua URL do Supabase
   - `NODE_ENV` = production

7. Clique em **Create Web Service**

## Variáveis de Ambiente Necessárias

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL de conexão do Supabase PostgreSQL |
| `NODE_ENV` | Ambiente (production para deploy) |

## Estrutura do Projeto

- `/client` - Frontend React com Vite
- `/server` - Backend Express
- `/shared` - Schema do banco de dados (Drizzle ORM)
- `/dist` - Arquivos de produção (gerados pelo build)

## Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm run start

# Push do schema para o banco
npm run db:push
```
