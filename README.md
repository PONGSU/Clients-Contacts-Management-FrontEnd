Aplicação hospedada em https://clients-contacts.vercel.app
onde pode ser apreciada já com a integração a API e o banco de dados.




_________________________________________________________


Se preferir rodar localmente siga as instruções a baixo:

Está aplicação depende da API https://github.com/PONGSU/Clients-Contacts-Management-Backend

Depois de fazer a cópia desse repositório é preciso instalar as bibliotecas necessarias utilizando o comanodo:
yarn install

após isso para rodar o servidor localmente execute:
yarn dev


ATENÇÂO:
Caso decida rodar localmente provavelmente não sera possivel interagir com o banco de dados e API que estão online, então será preciso rodar o back end localmente também. Por isso será preciso também alterar a variavel baseURL em src/services/api.ts, substituindo pela URL obtida apos o comando "runserver" descrito nas instruções de como rodar a API.

Se mesmo assim aparecer algum erro, verifique qual endereço esta rodando o servidor desta aplicação front end, que é exibido no terminal em resposta ao comando yarn dev.
Se esse endereço NÃO for http://localhost:5173. Sera preciso acessar o arquivo clients_contacts/settings.py no repositório da API, e alterar o endereço na linha 78, para o endereço obtido nesta aplicação Front End:

 CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
  
