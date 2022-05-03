# Front end


Este repositório contém a parte de Front End do desafio
## Criando o container

Para criar o container do front, utilize o seguinte comando:

```bash
  $ docker build -t react_frontend .
```

Após o container ser buildado com sucesso:

```bash
  $ docker container run -it -p 3000:3000 --name react_frontend react_frontend
```
