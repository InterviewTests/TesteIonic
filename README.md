# Show me the code

Projeto desenvolvido por Daniel de Freitas Gonçalves @ 2019

### # DESAFIO:

Você deverá criar um aplicativo, que será um clone do aplicativo do Netflix.

São obrigatórias:
 * Página de cadastro.
 * Página de login, deve ser possivel autenticar-se utilizando a digital (Fingerprint/TouchId), para permitir que o cliente acesse seu app com mais facilidade.
 * Home, onde serão exibidas diversas listas horizontais de filmes, que você poderá organizar como quiser.
    Exemplo: Exibir listas de acordo com genêro, exibir listas de acordo com popularidade, etc. Consulte as opções de query disponíveis na API e use a criatividade. :smiley:
 * No topo das listas deve haver uma lista de "Favoritos", onde os filmes favoritados pelo cliente devem ser exibidos.
 * Página de informações sobre o filme, como sinopse, ano de lançamento e etc, esta deverá ser exibida quando o cliente clicar em um filme. Deve conter um botão para que o cliente possa favoritar o filme, esta deve ser a marcação utilizada para exibir o filme na lista de favoritos da Home.

 **Importante: Cada lista de filmes deve ser um componente isolado.**

### # Avaliação

Você será avaliado pela usabilidade, por respeitar o design e pela arquitetura do app. É esperado que você consiga explicar as decisões que tomou durante o desenvolvimento através de commits.

* Ionic 4
* SASS
* O app deve funcionar no iOS 9 e Android 4.4
* Splashscreen + Icones
* Testes unitários (Aqui você é livre pra usar o que quiser. Quer ir de Karma + Jasmine? Quer se aventurar no Jest? Quer sair da curva com Chai + Mocha? Não importa, só queremos que você teste. :heart:)
* Uso do git
* Fontes e Cores especificadas abaixo.

### # APIs e Biblioteca obrigatórias

* Para o cadastro e login: [FirebaseAuthentication](https://firebase.google.com/docs/auth/?hl=pt-br)
* Para a autenticação: [Fingerprint](https://ionicframework.com/docs/native/fingerprint-aio/)/[Touch ID](https://ionicframework.com/docs/native/touch-id/).
* Para listagem de filmes: [MovieDB](https://developers.themoviedb.org/3/getting-started/introduction)
* Exemplo de [lista horizontal e componente](https://www.imageupload.co.uk/images/2018/10/09/F28459C8-3212-472D-86D4-1616734C84AE.png)
* Para armazenar os filmes favoritados: [Cloud Firestore](https://firebase.google.com/docs/firestore/?hl=pt-br)

### Paleta de cores

$red: #E50914 (Para detalhes, colorir botões e etc);

$black: #221F1F (Backgrounds);

$white: #f5f5f1 (Texto)

### Fonte

https://fonts.google.com/specimen/K2D

### # Observações gerais

Adicione um arquivo [README.md](http://README.md) com os procedimentos para executar o projeto.

Comente qualquer coisa nele que você gostaria de nos contar, como a abordagem que você utilizou na solução do desafio, se você usou alguma arquitetura de CSS, como suas escolhas influenciaram na performance e etc.

Pedimos que trabalhe sozinho e não divulgue o resultado na internet.

Faça um fork desse desse repositório em seu Github e nos envie um Pull Request com o resultado, por favor informe por qual empresa você esta se candidatando.

### # Importante: não há prazo de entrega, faça com qualidade!

# BOA SORTE!
