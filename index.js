const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

    // Configurações
        // Template Engine
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
            }
        }));
        app.set('view engine', 'handlebars');

        // Body Parser
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

    // Rotas
    app.get('/', (req, res) => {
        Post.findAll({order: [['id', 'DESC']]}).then((posts) => { // Use o método correto, como `findAll()` em vez de `all()`
            res.render('layouts/home', { posts: posts });
        });
    });

    app.get('/cadastro', (req, res) => {
        res.render('layouts/formulario');
    });

    app.post('/adicionar', (req, res) => {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(() => {
            res.redirect('/');
        }).catch((error) => {
            'Erro ao criar o Post: ' + error
        });
    });

    app.get('/deletar/:id',(req,res)=>{
        Post.destroy({where: {'id': req.params.id}}).then(()=>{
            res.redirect('/');
        }).catch((error)=>{
            res.send('Esta postagem não existe!');
        });
    });

app.listen(8081, () => {
    console.log('Rodando!');
});