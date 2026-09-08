# Adopet

Projeto de automação de testes end-to-end para a aplicação Adopet, com foco em validar fluxos críticos da interface e garantir maior confiabilidade no processo de cadastro, login e navegação.

## Objetivo

O objetivo deste projeto é automatizar testes de comportamento em nível de interface, simulando a interação do usuário com a aplicação e validando que as funcionalidades principais funcionam conforme o esperado.

## Tecnologias utilizadas

### Cypress
Cypress é a principal tecnologia deste projeto e foi escolhida por ser uma ferramenta moderna para automação de testes de front-end. Ele oferece:

- execução rápida e estável de testes end-to-end;
- fácil leitura e manutenção dos cenários;
- suporte a testes em navegadores modernos;
- recursos avançados de depuração, como execução passo a passo e screenshots;
- integração direta com a aplicação web, facilitando a validação de fluxos reais.

Para este projeto, o Cypress é ideal porque permite verificar interações reais do usuário, como cadastro, login, navegação e clique em elementos da interface.

### JavaScript
A linguagem JavaScript foi escolhida por ser nativa e amplamente utilizada no ecossistema de automação com Cypress. Sua sintaxe simples e a familiaridade com a stack de testes do projeto tornam o desenvolvimento dos cenários mais produtivo.

### Node.js
O Node.js é o ambiente de execução utilizado para rodar os testes e integrar as ferramentas de automação. Ele permite que o Cypress funcione de forma eficiente e compatível com o ambiente de desenvolvimento.

### Mochawesome
O Mochawesome foi adotado para gerar relatórios visuais de execução dos testes. Ele oferece uma interface mais amigável para análise dos resultados, permitindo visualizar:

- testes executados;
- status de aprovação ou falha;
- tempo de execução;
- relatórios em HTML para compartilhamento e revisão.

Esse tipo de relatório é importante para acompanhamento rápido do cenário de testes e para documentação do resultado da execução.

### Git e GitHub
O controle de versão é feito com Git e o projeto é versionado no GitHub. Essa escolha facilita:

- organização das alterações;
- histórico de commits;
- colaboração em equipe;
- revisão e rastreabilidade das mudanças do projeto.

## Estrutura do projeto

- cypress/e2e/: contém os cenários de automação;
- cypress/support/: arquivos de suporte e comandos personalizados;
- cypress/results/: relatórios gerados pela execução dos testes;
- cypress.config.js: configurações do Cypress e do reporter;
- package.json: dependências e scripts do projeto.

## Como executar os testes

### Instalar dependências

```bash
npm install
```

### Abrir o Cypress em modo interativo

```bash
npx cypress open
```

### Executar os testes em modo headless

```bash
npx cypress run
```

### Executar um cenário específico

```bash
npx cypress run --spec cypress/e2e/nome-do-cenario.cy.js
```

## Benefícios do projeto

- validação automatizada dos fluxos principais da aplicação;
- redução de erros manuais em testes repetitivos;
- maior confiança em alterações futuras;
- relatórios claros para análise de falhas;
- manutenção mais simples por meio de comandos reutilizáveis.

## Conclusão

A combinação de Cypress, JavaScript, Node.js e Mochawesome oferece uma solução prática, moderna e eficiente para automação de testes web. Essas tecnologias foram escolhidas para garantir produtividade, confiabilidade e qualidade na validação de funcionalidades da aplicação Adopet.
