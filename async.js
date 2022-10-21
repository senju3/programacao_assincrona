//                           1° EXERCÍCIO - ERROR NA PROGRAMAÇÃO ASSÍNCRONA -> CALLBACK
//Permite que outras tarefas sejam executadas, mesmo não tendo sido executada 
function sendEmail (body, to) {
    setTimeout(() => { //simular o tempo de envio de um email
        console.log(`
            Para: ${to}
            -----------
            ${body}
            -----------
            De: Pedro
        `)

    }, 2000);
};
console.log("Antes de enviar o email");
sendEmail("Email de boas vindas a comunidade....", "pedro@gmail.com", () => {});
console.log("Depois. Email enviado"); //dessa forma não está correta, pois nesse caso a função vai ser chamada e antes de ser executada o console.log ja é executado



//                           2° EXERCÍCIO - PROGRAMAÇÃO ASSÍNCRONA DE FORMA CORRETA -> CALLBACK
//SOLUÇÃO
function sendEmail2 (body, to, callback) {
    setTimeout(() => { //simular o tempo de envio de um email
        console.log(`
            Para: ${to}
            -----------
            ${body}
            -----------
            De: Pedro
        `);
        let error = false;
        if(error){ 
            callback("not okay", 0 , "2s", "O envio do email falhou")
        }else{
            callback("ok", 5, "2s")//chamo e executo a callback apenas após o envio do email
        };
         
    }, 6000);
};
setTimeout(() => {console.log("bem antes de enviar o email")},5000); //tive q usar o setTimeOut pq esse console tava sendo executado antes do 1° email ser enviado 
sendEmail2("Enviando o email de forma correta....", "bueno@gmail.com", (status, amount, time, error) => {
    if(error == undefined){ //tratamento de erros
        console.log("Bem depois. Email enviado")
        console.log(/*Apenas para estudo de parâmetros*/
        `Status: ${status}
        --------------------
        Contatos: ${amount}
        --------------------
        Tempo: ${time}`
        )    
    }else {
        console.log("Ocorreu um error: " +error)
    };
    
}); //Essa é a forma correta, passando uma callback







//                           3° EXERCÍCIO - USANDO PROMISES
/*               Trabalhando com Promises
    Promise é basicamente uma evolução da callback
    Já que não usa o 3° parâmetro de callback...    vamos vê                           */
function sendEmail3 (body, to){
    return new Promise((resolve, reject) => { //sempre que for usar promise eu devo retornar essa promise sempre que a função for chamada. A promise receber dois parâmetros que estão ligados ao then e catch respectivamente
        setTimeout(()=>{ //toda lógica de envio de email
            console.log(`
                Para: ${to}
                ----------------
                ${body}
                ----------------
                De: Pedriin
            `);
            // a partir daqui é o tratamente de erros
            let error = false; 
            if(!error){ 
                resolve({time: "6s", to: "ferreira@gmail.com"}) //chama quando a promise "acerta", está ligado diretamente ao then() e só pode receber 1 unico parâmetro, porém pode ser um json
            }else{
                reject("O envio do email falhou") //chama quando a promise falha, está ligado diretamente ao catch()
            };
        }, 9000);
    });
};
setTimeout(() => {console.log("muito antes de enviar o email")},8000); //tive q usar o setTimeOut pq esse console tava sendo executado antes do 1° email ser enviado 
sendEmail3("Corpo do email", "ferreira@gmail.com").then((dados)=>{
    console.log("Muito depois. Email enviado com sucesso!")
    console.log(`
        Time: ${dados.time} 
        --------------------
        To: ${dados.to}
    `)
}).catch((error)=>{
    console.log("Ocorreu um error: " +error)
});






//                           4° EXERCÍCIO - ANINHAMENTO DE PROMISES
// Trabalhando com aninhamento de promises
//Cuidado para não se tornar uma promise hell
function takeId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5)
        }, 9000)
    })
};
function searchEmailInDatabases (id) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(id == 5){
                resolve("buenoferreira@gmail.com")
            }            
        }, 2000)
    })
}
function sendEmail4 (body, to){
    return new Promise((resolve, reject) => { //sempre que for usar promise eu devo retornar essa promise sempre que a função for chamada. A promise receber dois parâmetros que estão ligados ao then e catch respectivamente
        setTimeout(()=>{ //toda lógica de envio de email
            console.log(`
                Para: ${to}
                ----------------
                ${body}
                ----------------
                De: Pedriin
            `);
            // a partir daqui é o tratamente de erros
            let error = false; 
            if(!error){ 
                resolve({time: "12s", to: "ferreira@gmail.com"}) //chama quando a promise "acerta", está ligado diretamente ao then() e só pode receber 1 unico parâmetro, porém pode ser um json
            }else{
                reject("O envio do email falhou") //chama quando a promise falha, está ligado diretamente ao catch()
            };
        }, 2000);
    });
};
setTimeout(() => {console.log("Antes bem antes de enviar o email")},9000);
takeId().then(id => {
    searchEmailInDatabases(id).then(email => {
        sendEmail4("Fazendo um aninhamento de promises", email).then(()=>{
            console.log(`Email enviado para o usuário do id: ${id}`)
        }).catch(error => {console.log(error)})
    })
})





/***************************************************6° EXERCÍCIO - ASYNC AWAIT ***************************************************/ 
function takeId2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(88)
        }, 10000)
    })
};
function searchEmailInDatabases2 (id) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(id == 88){
                resolve("jubileu@gmail.com")
            }            
        }, 2000)
    })
}
function sendEmail5 (body, to){
    return new Promise((resolve, reject) => { //sempre que for usar promise eu devo retornar essa promise sempre que a função for chamada. A promise receber dois parâmetros que estão ligados ao then e catch respectivamente
        setTimeout(()=>{ //toda lógica de envio de email
            console.log(`
                Para: ${to}
                ----------------
                ${body}
                ----------------
                De: Pedriin
            `);
            // a partir daqui é o tratamente de erros
            let error = false; 
            if(!error){ 
                resolve({time: "12s", to: "jubileu@gmail.com"}) //chama quando a promise "acerta", está ligado diretamente ao then() e só pode receber 1 unico parâmetro, porém pode ser um json
            }else{
                reject("O envio do email falhou") //chama quando a promise falha, está ligado diretamente ao catch()
            };
        }, 2000);
    });
};
/*****************solução visual para as promises hell ******/
async function solution () {
    const id = await takeId2()
    const email = await searchEmailInDatabases2(id)
    sendEmail5("Organizando o promise hell usando o async await", email).then(()=>{
        console.log(`Email enviado para o usuário do id: ${id}`)
    }).catch(error => {console.log(error)})
}
solution()