const { createRandomClient, createNewClient, getAllClients, deleteAfterGet, updateClient } = require("../helpers/clientHelpers")
const { createNewReservation, getAllReservations, deleteReservationAfterGet, updateReservation } = require("../helpers/reservationHelpers")

describe('Backend test suite', function(){
    it('Test case 01, Create new client', function(){
        createNewClient(cy)
    })

    it('Test case 02, Update client', function(){
        updateClient(cy)
    })

    it('Test case 03, Create new reservation', function(){
        createNewReservation(cy)
    })

    it('Test case 04, update new reservation', function(){
        updateReservation(cy)
    })

    it('Test case 05, delete last reservation', function(){
        deleteReservationAfterGet(cy)
    })

    it('Test case 06, delete client', function(){
        deleteAfterGet(cy)
    })
})