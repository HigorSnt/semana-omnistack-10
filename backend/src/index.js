/*
Tipos de parâmetros:

Query Params: req.query (Filtros, Ordenação, Paginação...)
Route Params: req.params (Identificar recurso na alteração ou remoção)
Body: req.body (Dados para a criação ou alteração de um registro)

*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setUpWebSocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setUpWebSocket(server);

mongoose.connect('mongodb+srv://higor:121PassWord@cluster0-q7ten.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);