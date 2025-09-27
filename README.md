
# 🎬 Seleção VLAB - Catálogo de Filmes & Séries com Perfis de Usuário

Este projeto foi desenvolvido como parte do processo seletivo da **VLAB**, com o objetivo de demonstrar conhecimento técnico em **Angular** e **TypeScript**.  
A aplicação consome a API pública do **The Movie Database (TMDb)** e oferece recursos de busca, listagem e criação de maratonas personalizadas de filmes.

## 🚀 Tecnologias Utilizadas
- **Angular 17+**
- **TypeScript**
- **RxJS**
- **Angular CLI**
- **SCSS (estilização)**
- **The Movie Database API (TMDb)**
- **LocalStorage (persistência de dados)**

## ⚙️ Funcionalidades Implementadas

### ✅ Listagem e Busca de Filmes
- Exibe título, pôster e gêneros.
- Filtro por **nome**.
- Ordenação por:
  - Ano de lançamento
  - Nota
  - Popularidade

### ✅ Maratona de Filmes
- Adição de filmes à **Lista da Maratona**.
- Exibição dinâmica do **tempo total da maratona** (horas e minutos).
- Remoção de filmes da lista.

### ✅ Persistência de Maratonas
- Salvar maratonas personalizadas no **LocalStorage**.
- Dar nome às maratonas (ex.: *Maratona do Oscar 2024*).
- Visualizar, carregar ou excluir maratonas salvas.

### ✅ Testes
- Implementados **testes unitários** para validação da lógica central do projeto.
- Validação de funcionalidades como busca e persistência em LocalStorage.

## 🛠️ Arquitetura

Foi utilizada a **arquitetura Facade** para centralizar a lógica de negócios e desacoplar os componentes.  
Principais camadas:
- **Componentes** → Responsáveis pela UI.
- **Facade** → Camada intermediária entre componentes e serviços.
- **Serviços** → Comunicação com a API e manipulação de dados.
- **LocalStorage Service** → Persistência local de maratonas.

## Projeto

https://github.com/user-attachments/assets/5b79f432-bace-4f2c-ad50-9a37e16757d2

## Como rodar o projeto localmente

Siga os passos abaixo para clonar, instalar dependências e executar o projeto no ambiente de desenvolvimento.

---

### Requisitos

- Node.js (versão compatível — verifique no `package.json`)  
- Angular CLI instalado globalmente:  
  ```bash
  npm install -g @angular/cli

### Passos

1. Clone o repositório  
   ```bash
   git clone https://github.com/WeldonPereira/SelecaoVlab.git
   cd SelecaoVlab

2. Instale as dependências do projeto
   ```bash
   npm install
   # ou, se preferir usar yarn

3. Execute o servidor de desenvolvimento
   ```bash
   ng serve

4. Acesse a aplicação no navegador
   ```bash
   http://localhost:4200/
