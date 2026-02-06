# Tasks Pro

Um painel de gerenciamento de tarefas moderno e responsivo, construído com as mais recentes tecnologias web.

## 🚀 Tecnologias

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes**: [shadcn/ui](https://ui.shadcn.com/)
- **Tabelas**: [AG Grid](https://www.ag-grid.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Gerenciador de Pacotes**: [pnpm](https://pnpm.io/)

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (v18 ou superior)
- pnpm

### Passos

1. Clone o repositório e instale as dependências:
   ```bash
   pnpm install
   ```

2. Execute o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

3. Para criar uma build de produção:
   ```bash
   pnpm build
   pnpm start
   ```

## 📂 Estrutura do Projeto

- `src/app`: Rotas e páginas da aplicação (Next.js App Router).
  - `(protected)`: Rotas protegidas (Dashboard, Tarefas, etc.) que requerem autenticação.
- `src/components`: Componentes reutilizáveis.
  - `layout`: Componentes de layout (Sidebar, Header).
  - `ui`: Componentes base do shadcn/ui.
  - `tasks`: Componentes específicos de tarefas (Grid, Dialog).
- `src/data`: Dados mockados para desenvolvimento.
- `src/types`: Definições de tipos TypeScript.

## 🎨 Funcionalidades

- **Dashboard**: Visão geral com estatísticas e métricas.
- **Gerenciamento de Tarefas**: Listagem, criação, edição e exclusão de tarefas.
  - Visualização em Grade (AG Grid) com filtros e ordenação avançados.
- **Equipe**: Gerenciamento de membros e permissões.
- **Atividades**: Log de ações e auditoria.
- **Configurações**: Preferências de usuário e sistema.

## 📝 Licença

Este projeto está sob a licença MIT.
