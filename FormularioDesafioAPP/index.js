const express  = require('express')
const mustacheExpress = require('mustache-express')

const app = express()

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', __dirname + '/views')
app.use(express.urlencoded({extended: true}))

const PORT = 8000
app.listen(PORT, function () {
    console.log('app rodando na porta ' + PORT)
})

app.get('/', function (req, res) {
    res.render('index.html')
})

app.post('/formulariofeito', function (req, res) {
    let dados_form = {
        nome: req.body.name,
        cpf: req.body.mail,
        telefone: req.body.tel,
        msg: req.body.mensagem
    }
    res.render('apresentaDados.html', {dados_form})
})
