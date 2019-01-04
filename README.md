# Notflix

Um aplicativo feito com *Ionic4*, *Angular4+* com integração do *FireBase* e da api do *MovieDB* que copia o look and feel de um aplicativo famoso de streaming de filmes. 

## Como rodar:
Para conseguir rodar este projeto localmente, é necessário ter o seguinte instalado na máquina:

- *Node.js 8* ou superior e *NPM* (https://nodejs.org/en/download/)
- *Ionic CLI* (https://beta.ionicframework.com/docs/installation/cli)
- *Git*

Caso queira testar com o emulador nativo do *Ios* ou *Android*:

- https://beta.ionicframework.com/docs/installation/ios
- https://beta.ionicframework.com/docs/installation/android

Os testes feitos para este app foram todos no browser usando o comando `ionic serve -g` ou no android usando um .apk gerado pelo comando `ionic cordova build android --prod`. O comando de build de .apk está no arquivo package.json como `npm run build-android`.

Clone o repositório em alguma pasta seguindo o comando

`git clone https://github.com/PauloGasparSv/Notflix.git`

`cd Notfix`

Todos os arquivos de source do projeto estão baixados localmente agora. Instale todas as dependências com os comandos

`npm install`

`ionic cordova prepare`

Após as instalações

`ionic serve -g`

## Comentários:

O app foi feito, de inicio, seguindo fielmente os padrões da documentação do Ionic4, como pode ser visto no histórico de commits. No entanto, durante o desenvolvimento, vi que certos procedimentos poderiam ser feitos melhor ou igualmente por *WebApis*, *Sass* ou *Js* puro como por exemplo o caso das chamadas Http.

Implementei o modulo *nativo de Http*, fiz os testes dele tanto no browser quanto no apk mas percebi que, para mim, não fez nenhuma diferença usar este módulo Http ou *FetchApi*. Imagino que, pelo fetch ser relativamente novo no JS isso possa gerar problemas de compatibilidade dependendo da build do cordova que eu faço. Mas no meu caso não houve problema.

Guardei todas as credências usadas no app em arquivos .ts externos pois, por padrão, eu não subiria as credências no git.

Deixei bastante de lado o sistema de grids do ionic e optei usar muito mais *FlexBox* do css pois é uma das minhas tecnologias de css mais novas e mais favoritas.

Encontrei uma facilidade grande em criar os layouts e implementar as lógicas da controller. Eu sinto que com a experiência que eu tenho eu consigo implementar outros aplicativos fácilmente.

Várias filosofias de design do angular me parecem complicadas demais de um modo desnecessário primeiramente (o elseIf do ng, os emissores de evento). Não é framework amigável para iniciantes. Problemas como falta de importanção de modules (como reactiveForm por exemplo) que mostram logs de erro grandes demais e que levam a mais de um caminho e que só quebram em certas situações me empacaram bastante no começo do projeto pois, mesmo com experiência, nunca tinha implementado um projeto sozinho.

Apesar do usuário não ter acesso as rotas, fiz redirecionamento de rotas quando um acesso não autorizado ocorre via código e não pela classe de Routes do angular.

Tive um grande problema para implementar os testes unitários. Nunca tinha implementado mas consegui aprender *Jasmine*. Meu problema foi implementar com o Angular. Eu trabalhei bastante com *Vue.js* e moderadamente com Angular 4 mas sem implementar nenhum teste unitário. Eu sinto que preciso dedicar bastante tempo em implementar testes untiários com frameworks e bibliotecas de terceiros já que em javascript vanilla do meu código ou com *Express.js* foi fácil implementar.
