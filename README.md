<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Sobre o projeto
Para a resolução do desafio eu utilizei o framework `NestJs` por ser robusto e poderoso para aplicações node. Utilizei a biblioteca `Puppeteer` para fazer a leitura das páginas e extrair os dados necessários, o orm `MikroORM` e o banco de dados `PostgreSQL`. <br/>
Utilizei a cloud da `AWS` para criar um servidor com o `Jenkins` e utilizá-lo para criar imagens docker, enviar para o meu `Dockerhub` e então fazer o deploy em um cluster kubernetes na cloud da `DigitalOcean`. Para para me ajudar a gerenciar a criação/destruição desses recursos cloud eu utilizei o `Terraform`.


# Documentação
`http://localhost:8081/api/docs` para acessar o Swagger

# **Executando localmente**

## Instruções
- Para executar localmente utilize `docker-compose up`

# **Executando em núvem**

## Pre-setup

-	Crie um usuário no console ***`AWS`*** e gere suas credenciais de acesso
-	Em ***`cloud.digitalocean`*** na aba `API` crie seu token de acesso
-	Crie um arquivo `main.tf` e copie as instruções no arquivo `infra-provisioning-example.txt` e cole no arquivo terraform


## Setup

```bash
# Inicializando terraform plugins
$ terraform init

# Verificando recursos a serem criados ou destruídos
$ terraform plan

# Aplicar alterações
$ terraform apply

# Deletar recursos no cluster k8s da DigitalOcean
$ kubectl delete all --all -n desafio-npl

# Destruir recursos cloud
$ terraform destroy
```

## **Após a infra ser provisionada (AWS e DigitalOcean)**

-	# AWS
-	Conecte-se ao EC2
-	Instale o Docker e o Jenkins (pasta scripts)
-	Acesse o jenkins `http://URL-EC2:8080` e faça as configurações iniciais do Jenkins (instale os plugins sugeridos)
-	Em `Manage Jenkins > Plugins > Available plugins` instale os plugins do `nodejs`, `docker` e `docker-build-steps`
-	Em `Manage Jenkins > Credentials > System > Global credentials` adicione suas credenciais de acesso ao seu Dockerhub
-	Em `Manage Jenkins > Tools` adicione `Git installations - install automatically`, `NodeJS installations - name 21.1.0 - install automatically - version 21.1.0`, `Docker installations - name docker - install automatically - Add installer - Download from docker.com`. Aplique e salve as alterações
-	Na tela Dashboard crie um item do tipo Pipeline e na seção Pipeline selecione `Pipeline script from SCM`, em SCM selecione `git` e coloque a url do repositório público `https://github.com/matheusjustino/desafio-npl.git`, em `branches to build` troque de `master` para `main`
-	Após finalizar a criação do novo item volte para a tela do job criado e clique em `Build Now` para gerar a imagem docker do projeto e enviar para o seu dockerhub


-	# DIGITALOCEAN
-	Conecte-se ao cluster k8s
-	Na pasta k8s é possível encontrar os recursos utilizados nesse projeto
-	Utilize o comando `kubectl create namespace desafio-npl`
-	Utilize o comando `kubectl apply -f ./<pasta_com_arquivos.yml>` para criar os recursos no cluster k8s. Em caso de erro de `namespace not found` tente executar o comando novamente.
-	O deploy da aplicação será feito no cluster e uma url de acesso será providenciada. Utilize o comando `kubectl get svc -n desafio-npl` para checar a url de acesso da aplicação. Esse processo pode levar alguns minutos.


## **`Pontos de melhoria`**

-	Automatizando o deploy
	-	Um repositório separado com os arquivos .yml para o deploy da aplicação é uma boa prática pois pode evitar que alterações não desejadas aconteçam
	-	Adicionar um job no Jenkins para implementar a atualização da imagem docker no arquivo yml. Dessa forma após a criação da nova imagem docker o arquivo do deploy seria atualizado automaticamente
	-	Utilizar o ArgoCD para "ouvir" o projeto que possui os arquivos yml responsáveis pelo deploy. A cada nova alteração nesse projeto o ArgoCD irá entender que um novo deploy deve ser feito e então executar essa tarefa de forma automática
	-	Adicionar um trigger ao job criado para a aplicação no Jenkins. Dessa forma após alguma nova alteração no código todo o processo seria disparado automaticamente
-	Observabilidade
	-	Adicionar o Prometheus & Grafana, APM Node & ElasticSearch & Kibana, ou alguma outra ferramenta, seria um ótima adição ao projeto pois nos ajudaria a ver e entender a utilização da aplicação por parte dos usuários, além de nos ajudar a encontrar os erros e todo o trajeto até aquele ponto, incluindo os logs.
