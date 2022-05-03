# Front End


Este repositório contém a parte de Front End do desafio

---
## Como rodar o projeto


Para rodar o Back End, siga estas etapas:

- Clone o repositório

```bash
  $ git clone git@github.com:alexsandron3/contato_seguro_front.git
```

- Entre na pasta

```bash
  $ cd contato_seguro_front
```

- Crie o container

```bash
  $ docker build -t react_frontend .
```

- Inicie o container

```bash
  $ docker container run -it -p 3000:3000 --name react_frontend react_frontend
```

---
## Documentação da API

### Usuário



#### Rota de usuários

```http
  GET usuario/
```
---

### Empresa


#### Rota de empresas

```http
  GET /app/empresa/
```

---
## Dificuldades e Desafios


### Relembrar a sintaxe de componentes de classse:
De longe a parte mais difícil foi no front. 
Fizemos alguns projetos na trybe utilizando componentes de classe, no entanto, apenas no início do módulo que trabalhamos com componentes funcionais. Relembrar todo funcionamento, como usar os ciclos de vida, boas práticas e peculiaridades de componentes de classe foi o que mais me complicou.
Resolvi este problema consultando o conteúdo de estudos, li documentação e revisitei projetos antigos.


## Conclusão

Gostei muito do desafio, componentes de classe foi algo que eu pouco pratiquei pois sempre tive o costume de usar mais os componentes funcionais. Foi uma ótimo oportunidade para colocar os conhecimentos de dia e praticar.

Algumas coisas ficaram faltando, como um feedback de que a ação está sendo processada - um círculo de loading por exemplo -, validações mais profundas e testes.

Dado o prazo do desafio, acho que fiz um bom trabalho.