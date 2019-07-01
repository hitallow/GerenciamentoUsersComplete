const express = require('express');

// gerenciador de rotas
const consign = require('consign');

const expressValidator = require("express-validator");

const bodyParser = require("body-parser");


// crio uma instancia do express gerando um servidor
const app = express();

// validações
app.use(expressValidator());

// visualização de json
app.use(bodyParser.json());

// usando bodyParser para enteder urlEnconded
app.use(bodyParser.urlencoded({extended:false}));

/* 
    faz o autoload dos modulos 
    dentro da variavel passada ele cria um atributo que pode ser acessado

*/
consign().include('routers').include('utils').into(app);


// app está ouvindo 
app.listen(3000, '127.0.0.1', () => {
    console.log("servidor rodando");
});