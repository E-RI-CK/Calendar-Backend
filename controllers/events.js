const { response } = require("express");
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    const { uid } = req;

    const events = await Event.find({ user: uid }).populate('user', 'name');

    return res.status(200).json({
        ok: true,
        events
    })

}

const createEvents = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const savedEvent = await event.save();

        res.json({
            ok: true,
            event: savedEvent
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            event: 'Talk with the admin'
        })
    }
}

const updateEvents = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event doesn\'t exists'
            })
        }

        if (event.user.toString() != uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You don\'t have privilige to edit'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true }); //new return event updated

        res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk with the admin'
        })
    }
}

const deleteEvents = async (req, res = response) => {

    const { uid } = req;

    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'This event doesn\'t exists'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You don\'t have privilege to delete this event'
            })
        }

        //Another option to delete an event
        //const deletedEvent = await Event.findByIdAndDelete(eventId); 

        const deletedEvent = await Event.deleteOne({ _id: eventId });

        return res.status(200).json({
            ok: true,
            msg: `Event deleted`,
            deletedEvent
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Talk with the admin'
        })
    }

}

module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}

// const a = {
//     ok: true,
//     msg: getEvents
// }


// const a = {
//     ok: true,
//     msg: createEvent
// }

// const a = {
//12345645
//     ok: true,
//     msg: createEvent
// }


// const a = {
//12345645
//     ok: true,
//     msg: deleteEvent
// }