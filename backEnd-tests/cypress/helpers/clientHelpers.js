const faker = require ('faker')
const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_NEWCLIENT = 'http://localhost:3000/api/client/new'
const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'


function createRandomClient(){
    //variabler för fakekonto till clients
    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()

    const newClient = {
        "name": fakeName,
        "email": fakeEmail,
        "telephone": fakePhone,
    }

    return newClient
}

function getAllClientsAssertion(cy, name, email, telephone){
    cy.request({
        method: "GET",
    url: ENDPOINT_GET_CLIENTS,
    headers:{
        'content-type': 'application/json',
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
    },
    }).then((response =>{
        //se information från den nya clienten
        const responseAsString = JSON.stringify(response.body[2])
        cy.log(responseAsString)
}))
}
function deleteAfterGet(cy){
    cy.request({
        method: "GET",
    url: ENDPOINT_GET_CLIENTS,
    headers:{
        'content-type': 'application/json',
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
    },
    }).then((response =>{
        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_CLIENT+lastId,
            headers:{
                'content-type': 'application/json',
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
            },      
        }).then((response =>{
            //assert that the client is deleted
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string('true')
        
        }))
        
        
}))
}

function getAllClients(cy){
    cy.request({
        method: "GET",
    url: ENDPOINT_GET_CLIENTS,
    headers:{
        'content-type': 'application/json',
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
    },
    }).then((response =>{
        let lastId = response.body[response.body.length -1].id
        expect(response.status).to.eq(200)
}))
}



function createNewClient(cy){
    cy.authenticateSession().then((response =>{
        let fakeClient = createRandomClient()
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_NEWCLIENT,
            headers:{
                'content-type': 'application/json',
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
            },
            body:fakeClient
        }).then((response =>{
            expect(response.status).to.eq(200)
        }))

        getAllClientsAssertion(cy, fakeClient.name, fakeClient.email, fakeClient.telephone)
    }))
}

function updateClient(cy){
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'content-type': 'application/json',
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
        },
    }).then((response =>{
        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "PUT",
            url: ENDPOINT_GET_CLIENT+lastId,
            headers:{
                'content-type': 'application/json',
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
            },
            body:{
                "name": "Marcus Ljungqvist",
                "email": "ljungqvist_marcus@hotmail.com",
                "telephone": "0736637003",
                "id": 3,
                "created": "2021-11-22T19:30:01.361Z"
              }
        }).then((response =>{
            //assert that the client is updated
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string('0736637003')
        
        }))        
    }))
}

module.exports = {
    createRandomClient,
    createNewClient,
    getAllClients,
    deleteAfterGet,
    updateClient,
}