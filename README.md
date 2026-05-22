# Bertrand Automation Challenge

Este projeto contém uma framework de automação de testes E2E (End-to-End) desenvolvida com **Playwright** e **JavaScript**, com o objetivo de validar fluxos críticos do site [Bertrand Livreiros](https://www.bertrand.pt/).

## Como executar os testes

### Pré-requisitos
* Node.js instalado 

### Passos de instalação
1. Clone este repositório:
   git clone https://github.com/Peras92/broadvoice-automation-challenge
   cd broadvoice-automation-challenge

2. Instale as dependências:
    npm install

3. Instale os browsers do Playwright:
    npx playwright install

4. Execute os testes:
    npx playwright test

5. Para visualizar o relatório detalhado após a execução, correr:
    npx playwright show-report

Cenários Automatizados

    Cenário 1: Validação de detalhes de livro (ISBN, dimensões, autor).

    Cenário 2: Navegação cruzada entre livros do mesmo autor.

    Cenário 3: Validação de atributos de internacionalização (idioma e bandeira).

    Cenário 4: Validação de integridade de preço no carrinho de compras.

    Cenário 5: Teste de navegação e filtros de localização (Livrarias).