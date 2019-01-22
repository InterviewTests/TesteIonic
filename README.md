# FakeFlix

Projeto desenvolvido por Daniel de Freitas Gonçalves @ 2019

Resumo:
  Para o desenvolvimento deste projeto primeiramente foi elaborado um protótipo para definir a usabilidade
e navegação de cada tela sempre com o foco em abordar todas as tecnologias esperadas e desejadas parte este projeto.
Com a primeira etapa pronta, foi estruturado uma primeira parte dos testes unitários*.
Com seu escopo de uso e de front-end definidos, foi sendo implementado as tecnologias e abordagens para a finalização
da aplicação.
  A aplicação final possui um sistema de registro e autenticação através do Google Firebase e
tem como principal funcionalidade a busca por filmes e série inspirado no tema do Netflix.
Através da busca pode-se ver detalhes e informações sobre as séries e filmes disponibilizados
na API do MovieDB.

* A parte de teste do sistema pode estar muito superficial e alguns casos inexistente pela falta de conhecimento
no conceito e na ferramenta.

Considerações:
  Este projeto necessitou de mim uma aprendizagem em diversos aspectos por não possuir uma experiência anterior
em algumas das tecnologias e ferramentas exigidas.
O Ionic versão 4 trouxe algumas novidades e diferenças ao 3 em que eu estava mais familiarizado.
A maior dificuldade foi a implementação dos Testes Unitários por ter sido a primeira vez que
lidei com a elaboração destes.

Instalação e Uso:
  Dependências:
    - Node
    - Android SDK / XCode
    - Ionic Cordova
    - GIT (opcional)

  Instalação:
    No terminal:
    - git clone https://github.com/daniielf/TesteIonic    // Clonar repositório
    - cd /TesteIonic                                      // Navegar até a pasta do projeto
    - npm install                                         // Instalar dependências do projeto
    - ionic cordova run android / ionic cordova run ios   // Iniciar instalação no dispositivo de destino

OBS:  DEVIDO A IMPOSSIBILIDADE DE TESTAR EM SISTEMAS IOS ESTE PROJETO PODE TER DIFICULDADES E INCOMPATIBILIDADES
COM DISPOSITIVOS COM SISTEMA OPERACIONAL IOS.

Tecnologias abordadas:
  - Ionic 4 (v Beta)
  - Autenticação por Digital
  - Google Firebase
  - Google Cloud FireStore
  - MovieDB API (https://developers.themoviedb.org/3/)
  - Karma & Jasmine

  Esta aplicação não possui fins comerciais, apenas uma breve abordagem sobre conceitos e ferramentas citadas acima.
