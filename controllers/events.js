const { response } = require('express')

const getEvents =({ body }, res = response)=>{
    res.json({
        ok: true,
        msg: 'getEvents'
    })

}

const createEvent =({ body }, res = response)=>{

    console.log(body)

    res.json({
        ok: true,
        msg: 'createEvents'
    })
}

const updateEvent =({ body }, res = response)=>{
    res.json({
        ok: true,
        msg: 'updateEvent'
    })
}

const deleteEvent =({ body }, res = response)=>{
    res.json({
        ok: true,
        msg: 'deleteEvent'
    })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}