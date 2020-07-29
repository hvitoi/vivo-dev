# Sistema para cadastro de vagas

Este é um sistema de candidatura a vagas de programação. Possui três serviços:

- Cliente
- Servidor
- Proxy Nginx (somente para k8s ou docker-compose)

## Regra de negócio

- O candidato preenche seus dados pessoais e preenche o nível de cada uma de suas habilidades técnicas
- Os campos nome e email são obrigatórios e o campo de email é validado no cliente e no servidor
- De acordo com a resposta dada sobre o nível das habilidades técnicas são enviados diferentes tipos de email para o endereço cadastrado

## Executando o sistema web

Para todas as formas de funcionamento, é necessário criar um arquivo `sendgrid.env` na raiz da pasta /server com os dados de email e apikey da [sendgrid](https://sendgrid.com/) para o serviço de envio de emails.

```env
SENDGRID_API_KEY=yourApiKeyHere
SENDGRID_EMAIL=yourEmailHere
```

### Rodando via docker-compose (sem orquestração)

- Necessário [Docker](https://docs.docker.com/get-docker/) e [Docker-Compose](https://docs.docker.com/compose/install/)
- Executar o docker-compose

```bash
docker-compose up --build
```

- Acessar via [localhost:3000](http://localhost:3000) (Linux) ou via [your-docker-machine-ip:3000](http://your-docker-machine-ip:3000) (Toolbox para Windows)

### Rodando via Kubernetes (modo de desenvolvimento com skaffold)

- Necessário instalar [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/), [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) (cluster local) e [skaffold](https://skaffold.dev/docs/install/) (modo desenvolvimento)
- Iniciar um nó no cluster

```bash
minikube start
```

- Obter o ip do cluster

```bash
minikube ip
```

- Executar o sistema em modo de desenvolvimento

```bash
skaffold dev
```

- Acessar via [your-cluster-ip](http://minikube-ip/)

### Rodando via npm

- Rodar via npm só é possível alterando a URL da requisição para envio do formulário (arquivo /client/src/Form.js:20)

```diff
try {
-   await axios.post('/api', data);
+   await axios.post('http://localhost:3001/api', data);
    history.push('/success');
} catch {
    history.push('/error');
}
```

- Necessário [Node.Js](https://nodejs.org/en/download/) para a execução
- Executar `npm start` nos diretórios /server e /client
- Acessar via [localhost:3000](http://localhost:3000)
- Desta forma o proxy nginx não é executado e fornecimento de arquivos e roteamento é feito diretamente pelo react (client) e pelo express (server)

## Frameworks utilizadas

- Client

  - React
  - Bootstrap

- Server

  - Express
  - Jest (test)

## Testes

- Execução de testes da api via npm (em /server)

```bash
npm test
```
