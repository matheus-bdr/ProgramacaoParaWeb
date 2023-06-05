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
function validarEmail (email)
{
   var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
   if (email.match(emailRegex)) {
     return true; 
   } else {
     return false; 
   }
}
function formatarCEP(cep)
{
	var cepRegex = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/; // Pode usar ? no lugar do *

	if (cep.match(cepRegex)) {
        return true; 
      } else {
        return false; 
      }
}
function validarTelefone(telefone)
{
	var telRegex = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g; 

	if (telefone.match(telRegex)) {
        return true; 
      } else {
        return false; 
      }
}
app.post('/marcar_consulta', function (req, res) {
    let marcar_consulta = {
        nome: req.body.name,
        cpf: req.body.cpf,
        dataNascimento: req.body.date,
        cep: req.body.cep,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: req.body.password,
        especialidade: req.body.especialidade,
        datetime: req.body.dataHora,
        allergic: req.body.allergic,
        infoField: req.body.infoField,
        estado: req.body.estado
    }
    let erros = []
    
    if(!validarCPF(marcar_consulta.cpf)){
        erros.push({campo: "CPF", msg: "inválido"})
    }
    if(!validarEmail(marcar_consulta.email)){
        erros.push({campo: "Email", msg: "inválido"})
    }
    if(!formatarCEP(marcar_consulta.cep)){
        erros.push({campo: "Cep", msg: "inválido"})
    }
    if(!validarTelefone(marcar_consulta.telefone)){
        erros.push({campo: "Telefone", msg: "inválido"})
    }
    if(marcar_consulta.dataNascimento == ""){
        erros.push({campo: "Data", msg: "Não pode ser vazio"})
    }
    if(marcar_consulta.senha == ""){
        erros.push({campo: "Senha", msg: "Não pode ser vazio"})
    }
    if(marcar_consulta.especialidade == ""){
        erros.push({campo: "Data", msg: "Não pode ser vazio"})
    }
    if(marcar_consulta.datetime == ""){
        erros.push({campo: "Data", msg: "Não pode ser vazio"})
    }
    if(marcar_consulta.allergic == ""){
        erros.push({campo: "Allergic", msg: "Não pode ser vazio"})
    }
    if(marcar_consulta.infoField == ""){
        erros.push({campo: "Info Field", msg: "Não pode ser vazio"})
    }
    if(marcar_consulta.nome == ""){
        erros.push({campo: "Nome", msg: "Não pode ser vazio"})
    }
    if(marcar_consulta.estado == ""){
        erros.push({campo: "Estado", msg: "Não pode ser vazio"})
    }
    if(erros.length > 0){
        res.render('index.html', {erros, marcar_consulta})
    }else{
        res.render('apresenta_dados.html', {marcar_consulta})
    }
})