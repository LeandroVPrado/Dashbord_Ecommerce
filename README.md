# Nexo · Dashboard de e-commerce

Dashboard responsivo em português, criado com React, TypeScript, Vite, Recharts e Lucide. Todos os dados são demonstrativos; não há backend, autenticação ou integração com pagamentos.

## Desenvolvimento

Requer Node.js 24 e npm 11.

```sh
npm ci
npm run dev -- --host 0.0.0.0
```

## Validação e produção

```sh
npm run lint
npm run build
npm run preview -- --host 0.0.0.0
```

O build está em `dist/` e pode ser hospedado como site estático.

## Funcionalidades

- Indicadores e gráfico de receita com seleção de período.
- Distribuição demonstrativa de canais de venda.
- Pedidos com busca por cliente, código e produto, filtro de status e detalhes.
- Exportação dos pedidos filtrados em CSV.
- Catálogo de produtos mais vendidos e listagem de clientes.
- Layout adaptado para celular com menu lateral.

A seleção de período aplica uma simulação proporcional aos indicadores; os pedidos são uma amostra fixa. Alterações na interface não persistem após recarregar. As fontes Google são opcionais e possuem fallback local.

No ambiente de nuvem, use `npm --cache /tmp/dashboard-npm-cache ci` se o diretório padrão de cache não for gravável.

## Publicar no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` valida e publica automaticamente cada envio à branch `main`.

Na primeira publicação, abra **Settings → Pages** no GitHub e selecione **GitHub Actions** em **Source**. Depois, na aba **Actions**, abra **Publicar dashboard no GitHub Pages** e use **Run workflow** se precisar executar novamente.

Endereço esperado após uma publicação bem-sucedida: https://leandrovprado.github.io/Dashbord_Ecommerce/

O caminho base do site é aplicado apenas no build de publicação; o desenvolvimento local continua na raiz.
