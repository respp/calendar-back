const { response } = require('express')
const Event = require('../models/event')

const getEvents = async({ body }, res = response)=>{
    const events = await Event.find() 
                              .populate('user', 'name')

    res.json({
        ok: true,
        events
    })

}

const createEvent =async({ body, uid }, res = response)=>{

    const event = new Event( body )

    try {
        event.user = uid

        const eventSaved = await event.save()

        res.json({
            ok: true,
            event: eventSaved
        })
        
    } catch (err) {
        return res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })
    }
}

const updateEvent = async({ body, params, uid }, res = response)=>{
    const eventId = params.id

    try {
        const event = await Event.findById( eventId )

        if ( !event ){
            res.status(404).json({
                ok: false,
                msg:'Evento no existe por ese id'
            })
        }

        if ( event.user.toString() !== uid ){
            res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar evento'
            })
        }

        const newEvent = {
            ...body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } )

        res.json({
            ok:true,
            event: eventUpdated
        })

        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
        
    }
}

const deleteEvent =async({ body, params, uid }, res = response)=>{
    const eventId = params.id

    try {
        const event = await Event.findById( eventId )

        if ( !event ){
            res.status(404).json({
                ok: false,
                msg:'Evento no existe por ese id'
            })
        }

        if ( event.user.toString() !== uid ){
            res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar evento'
            })
        }

        await Event.findByIdAndDelete( eventId )

        res.json({
            ok:true
        })

        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
        
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}