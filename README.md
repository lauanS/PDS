# SalvaCão - Projeto e Desenvolvimento de Sistemas

Projeto de um sistema de denúncias de maus tratos a animais

## Getting started

### Pré-requisitos

É necessário ter o [NodeJS](https://nodejs.org/en/) _(~v14.16.X)_ instalado na sua máquina.

Possuir uma chave da [Google Cloud Platform](https://console.cloud.google.com/home) para usar a API do Google Maps

### Preparando o ambiente

#### Instalando as dependências

Baixe o repositório, abra a pasta dele no terminal e execute o comando abaixo para instalar as dependências:

``` bash
 cd caminho-para-o-repositório/devRadar/web
 yarn install # ou npm install
``` 

#### Configurando as variáveis de ambiente

Configure as variáveis de ambiente necessárias para rodar a aplicação, para isso crie dois novos arquivos chamados _.env.production_ e _.env.development_ na raiz do projeto, e cole neles o conteúdo dos arquivos [/.env.development.sample](https://github.com/lauanS/salvaCao/blob/main/.env.development.sample) e [/.env.production.sample](https://github.com/lauanS/salvaCao/blob/main/.env.production.sample).

Em ambos os arquivos, coloque a sua chave de API onde está escrito yourApiKey. 

#### Inicializando o servidor fake da API 

Utilizando o comando:

``` bash
 yarn server # ou npm server
``` 
Você inicializa um servidor em localhost para simular o funcionamento da API. Essêncial para a visualização de denúncias e login.

#### Visualização do projeto

Para visualizar o projeto, execute:

``` bash
yarn start # ou npm start
``` 

