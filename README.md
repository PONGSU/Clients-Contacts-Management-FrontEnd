Está aplicação depende da API https://github.com/PONGSU/Clients-Contacts-Management-Backend

Depois de fazer a cópia desse repositório é preciso instalar as bibliotecas necessarias utilizando o comanodo:
yarn install

após isso para rodar o servidor localmente execute:
yarn dev


ATENÇÂO:
Caso o endereço do servidor da API local NÂO SEJA: "127.0.0.1:8000", será preciso alterar a variavel baseURL em src/services/api.ts

Se mesmo assim aparecer algum erro, verifique qual endereço esta rodando o servidor do front end após o comando yarn dev.
Se esse endereço NÃO for http://localhost:5173. Sera preciso acessar o arquivo clients_contacts/settings.py no repositório da API, e alterar o endereço na linha 78:

 CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
  
