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

function validarCPF (cpf)
{
   let validarRegExCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
   if (cpf.match(validarRegExCPF)) {
     return true; 
   } else {
     return false; 
   }
}

app.post('/mostrar_dados', function (req, res) {
    let dados_formulario = {
        nome: req.body.nome,
        email: req.body.email,
        fone : req.body.fone,
        cpf: req.body.cpf,
        text: req.body.text

    }

    let erros = []

    if(dados_formulario.nome == ""){
        erros.push({campo: "Nome", msg: "Não pode ser vazio"})
    }
    
    if(dados_formulario.email == ""){
        erros.push({campo: "e-mail", msg: "Não pode ser vazio"})
    }

    if(!validarCPF(dados_formulario.cpf)){
        erros.push({campo: "CPF", msg: "inválido"})
    }
    
    if(erros.length > 0){
        res.render('index.html', {erros, dados_formulario})
    }
    else{
        res.render('dados.html', {dados_formulario})
    }
    
})