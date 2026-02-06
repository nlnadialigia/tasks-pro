# Próximos Passos (Roadmap)

Este documento descreve as melhorias planejadas e os próximos passos técnicos para a evolução do **Tasks Pro**.

## 🔌 Integração Backend

- [ ] **API Real**: Substituir `src/data/mockData.ts` por chamadas reais a uma API.
- [ ] **Banco de Dados**: Configurar um banco de dados (recomenda-se PostgreSQL) e um ORM (Prisma).
- [ ] **Server Actions**: Implementar Server Actions do Next.js para mutações de dados (criar, atualizar, deletar tarefas).

## 🔐 Autenticação e Segurança

- [ ] **Auth Real**: Substituir o `AuthContext` mockado por uma solução robusta (NextAuth.js / Auth.js, Clerk ou Supabase Auth).
- [ ] **Proteção de Rotas**: Reforçar o `ProtectedRoute` com validação de sessão server-side (Middleware).
- [ ] **Permissões Granulares**: Implementar controle de acesso baseado em função (RBAC) real no backend.

## 🧪 Qualidade e Testes

- [ ] **Testes Unitários**: Configurar Jest e React Testing Library para testar componentes isolados.
- [ ] **Testes E2E**: Configurar Playwright ou Cypress para testes de fluxo de usuário.
- [ ] **Validação de Dados**: Utilizar Zod para validação de esquemas em formulários e API.

## 🎨 UI/UX e Funcionalidades

- [ ] **Modo Escuro**: Finalizar a implementação do toggle de tema (Dark/Light mode).
- [ ] **Upload de Arquivos**: Implementar upload real de anexos (S3, R2 ou similar).
- [ ] **Kanban Board**: Adicionar visualização de tarefas em estilo Kanban com drag-and-drop (`dnd-kit`).
- [ ] **Notificações em Tempo Real**: Implementar WebSockets ou Polling para notificações ao vivo.

## 🚀 DevOps

- [ ] **Docker**: Criar `Dockerfile` e `docker-compose.yml` para facilitar o deployment.
- [ ] **CI/CD**: Configurar pipelines de integração e entrega contínua (GitHub Actions).
