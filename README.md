# Projeto: **FIPE+** Consulta de Tabela FIPE 🚗📊

Este projeto implementa uma interface web dinâmica que permite a consulta de veículos com base na **Tabela FIPE** e exibe informações detalhadas de preços, modelos e perguntas frequentes de forma intuitiva e responsiva.

## Descrição
O objetivo do projeto é fornecer uma ferramenta simples e eficiente para que os usuários consultem valores médios de veículos (novos e usados) a partir da Tabela FIPE. Além disso, apresenta funcionalidades como:
- Destaque de **modelos mais buscados**;
- Exibição de **marcas de veículos** com ícones interativos;
- Seção de **Perguntas Frequentes (FAQ)**;
- Interface responsiva para desktop e dispositivos móveis.

## Tecnologias Utilizadas
<div>
  <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-239120?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

## 🔗 Sobre a API Parallelum
Este projeto utiliza a [API da Tabela FIPE da Parallelum](https://deividfortuna.github.io/fipe/) como fonte de dados.

### 📘 Documentação da API
A API é uma fonte pública gratuita que fornece informações sobre preços de carros, motos e caminhões na Tabela FIPE. A estrutura da API segue o seguinte formato de endpoints:
- **Obter todas as marcas**:
  ```http
  GET https://parallelum.com.br/fipe/api/v1/carros/marcas

## Estrutura do Projeto
```
/
├── index.html              # Página principal
├── consulta.html           # Página de consulta de veículos
├── img/                    # Imagens utilizadas no projeto
│   ├── carros/             # Ícones de veículos
│   ├── fipe+/              # Logo Fipe+
│   ├── favicon             # Favicon da página
│   └── backgroundmain.png  # Imagem de fundo principal
├── css/                    # Estilização
│   └── style.css           # Arquivo principal de CSS
│   └── consulta.css        # Arquivo CSS da página de consulta
├── LICENSE                 # Arquivo de licença do projeto
└── js/                     # JavaScript
    └── main.js             # Interatividade (FAQ, interações, API etc)
        app.js              # Mapeamento de veículos e suas  respectivas imagens
```

## Estilização
### 1. Faixas de Destaque
- **Header** com uma mensagem de destaque sobre a ferramenta.
- **Header** contendo a logo da ferramenta, que redireciona para a página inicial ao ser clicada.

### 2. Consulta de Veículos
- **Formulário dinâmico** com opções de marca, modelo ano e versão.
- Consumo de API pública Parallelum: [Tabela FIPE API](https://fipe.online/).
- Apresentação de resultados com preços e detalhes específicos do veículo.

### 3. Modelos Mais Buscados
- Destaque visual com cartões interativos, contendo imagens dos modelos de veículos mais buscados.
- **Hover interativo**: Scale effect ao passar o mouse.

### 4. Marcas de Veículos
- Ícones representando as principais marcas.
- Disposição em **8 colunas** para desktop e **1 colunas** para dispositivos móveis.
- **Hover interativo**: Scale effect com transição suave.

### 5. Perguntas Frequentes (FAQ)
- Layout em formato **accordion** com perguntas e respostas interativas.
- Usuários clicam nas perguntas para expandir/ocultar respostas.

## Responsividade
O projeto é totalmente responsivo, adaptando-se para dispositivos de diversos tamanhos:
- **Desktop**: Layout completo com 8 colunas para marcas e cartões maiores.
- **Tablets**: Layout ajustado com 2-4 colunas para marcas.
- **Mobile**: Layout com 2 colunas ou 1 coluna para melhor visualização.

## Como Executar
1. Clone este repositório:
   ```bash
   git clone https://github.com/seuusuario/consulta-fipe-.git
   ```
2. Abra o arquivo `index.html` em qualquer navegador atual.
3. Explore as funcionalidades:
   - Preencha os formulários para consultar veículos;
   - Interaja com as marcas e modelos destacados;
   - Acesse as perguntas frequentes para tirar dúvidas.

## Pré-Requisitos
- Navegador atualizado (Google Chrome, Firefox, Edge, etc).
- Conexão com a internet para consumir a API FIPE (caso esteja conectada).
- Token API próprio, você pode obter seu Token acessando: [APITOKEN](https://fipe.online/register)

## Melhorias Futuras
- Incluir imagens a todos os veículos (no momento apenas os Chevrolet possuem imagens).
- Adicionar um campo de busca para facilitar a localização de marcas e modelos.
- Implementar um backend para armazenar consultas frequentes.
- Melhorar o carregamento de dados com paginadores e filtros avançados.

## 🖼 Screenshots

![](https://i.imgur.com/dQl3Za8.png)
![](https://i.imgur.com/zIRGMX4.png)
![](https://i.imgur.com/WhBnVgX.png)
![](https://i.imgur.com/xpIOWe8.png)

| ![](https://i.imgur.com/Z60oPE9.png) | ![](https://i.imgur.com/7QZiPly.png) |
|:------------------------------------:|:------------------------------------:|

| ![](https://i.imgur.com/9fZUBiJ.png) | ![](https://i.imgur.com/pAnmDnN.png) |
|:------------------------------------:|:------------------------------------:|

---
**Tabela FIPE+ - 2024** 🚗📊
