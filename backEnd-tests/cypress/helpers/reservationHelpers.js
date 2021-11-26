const faker = require ('faker')
const ENDPOINT_GET_RESERVATIONS = 'http://localhost:3000/api/reservations'
const ENDPOINT_POST_RESERVATION = 'http://localhost:3000/api/reservation/new'
const ENDPOINT_GET_RESERVATION = 'http://localhost:3000/api/reservation/'


function createRandomReservation(){

    const newReservation = {

        "client": 3,
        "room": 1,
        "bill": 1,
        "start": "2021-02-22",
        "end": "2021-03-22"
    }

    return newReservation
}
function createNewReservation(cy){
    cy.authenticateSession().then((response =>{
        let newReservation = createRandomReservation()
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_RESERVATION,
            headers:{
                'content-type': 'application/json',
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
            },
            body:newReservation
        }).then((response =>{
            expect(response.status).to.eq(200)
        }))
        getAllReservationAssertion(cy, newReservation.client, newReservation.bill, newReservation.room,
        newReservation.start, newReservation.end)
    }))
}

function getAllReservations(cy){
    cy.request({
        method: "GET",
    url: ENDPOINT_GET_RESERVATIONS,
    headers:{
        'content-type': 'application/json',
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
    },
    }).then((response =>{
        //Kolla ifall reservationen har rätt client ID
        cy.log("ID på clienten är " + response.body[1].client)
}))
}
function getAllReservationAssertion(cy, client, bill, room, start, end){
    cy.request({
        method: "GET",
    url: ENDPOINT_GET_RESERVATIONS,
    headers:{
        'content-type': 'application/json',
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
    },
    }
    ).then((response =>{
        //se information från den nya reservationen
        const responseAsString = JSON.stringify(response.body[1])
        cy.log(responseAsString)
}))
}

function deleteReservationAfterGet(cy){
    cy.request({
        method: "GET",
    url: ENDPOINT_GET_RESERVATIONS,
    headers:{
        'content-type': 'application/json',
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
    },
    }).then((response =>{
        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_RESERVATION+lastId,
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
function updateReservation(cy){
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_RESERVATIONS,
        headers:{
            'content-type': 'application/json',
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
        },
    }).then((response =>{
        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "PUT",
            url: ENDPOINT_GET_RESERVATION+lastId,
            headers:{
                'content-type': 'application/json',
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken)
            },
            body:{
                "client": 3,
                "room": 2,
                "bill": 1,
                "start": "2021-02-22",
                "end": "2022-03-22",
                "id": 2,
                "created": "2021-11-22T20:05:01.200Z"
              }
        }).then((response =>{
            //assert that the reservation is updated
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string('2022-03-22')
        }))        
    }))
}

module.exports = {
    createNewReservation,
    getAllReservations,
    deleteReservationAfterGet,
    updateReservation,
}