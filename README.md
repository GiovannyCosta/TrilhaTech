## problemática

boa parte dos jovens não sabem exatamente sobre as areas de TI, pensam que é somente um Técnico que conserta computadores, não sabem como um programa, sistema e outras processos são feitos, não conhecem as diversas áreas que uma pessoa pode trilhar.

## solução

É realmente bom quando temos por onde começar sem saber nada, onde procurar informações sobre algo que é novidade. Então criar um projeto que guie de forma simples o usuario dentro do eccossistema de TI com roadmaps e trilhas bem estruturadas é o que buscamos no projeto.

## Quem é o usuário?

nosso projeto é voltado principalmente para jovens que desejam iniciar nas areas de TI, aos que não sabem nada de programação ou que já sabem algo, não é um requisito, pois nosso projeto vai açém da aréa de programação.

### Requisitos Funcionais (RF) - O que o software faz

- RF01 - Consultar Carreiras: O sistema deve permitir que o usuário busque e visualize detalhes sobre diferentes áreas de TI (backend, frontend, suporte, etc.). (Era: "permitir a busca de areas" e "mostrar guia completo")

- RF02 - Glossário Técnico: O sistema deve exibir um dicionário de termos técnicos (acervo) com explicações simples. (Era: "ter acervo de palavras tech")

- RF03 - Gerenciar Perfil: O sistema deve permitir que o usuário crie uma conta, faça login e edite seus dados. (Era: "ter perfil único" e "poder mudar perfil")

- RF04 - Sistema de Progresso (Gamificação): O sistema deve registrar quais módulos o usuário já leu e atribuir pontuação/conquistas. (Era: "ter gamificação")

- RF05 - Conteúdo Educativo: O sistema deve apresentar textos explicativos diferenciando Hardware de Software e desmistificando a área. (Era: "mostrar claramente a diferença...")

### Requisitos Não-Funcionais (RNF) - Qualidade e Restrições

- RNF01 - Usabilidade: A interface deve seguir padrões minimalistas e intuitivos para público leigo. (Era: "design simples")

- RNF02 - Linguagem: Todo o conteúdo textual deve ser escrito em português acessível, evitando jargões técnicos sem explicação. (Era: "linguagem... não pode ser técnica demais")

- RNF03 - Portabilidade: O sistema deve ser responsivo, adaptando-se a telas de computadores, tablets e smartphones. (Era: "responsividade")

- RNF04 - Desempenho: As páginas devem carregar em no máximo 3 segundos em conexões 4G padrão. (Era: "rapidez" - aqui definimos uma métrica!)

```
trilha-tech/
│
├── index.html          (Página Inicial - Onde tudo começa)
├── carreiras.html      (O Guia de Profissões)
├── glossario.html      (O Dicionário Tech)
├── fundamentos.html    (A explicação Hardware vs Software)
│
├── css/                (Pasta para o estilo/design)
│   └── style.css
│
├── img/                (Pasta para as imagens)
│   ├── logo.png
│   └── banner.jpg
│
└── js/                 (Pasta para a interatividade)
    └── script.js

```
