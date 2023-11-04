/*
    Event Route
    /api/events
*/


const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt')
const { getEvents, createEvents, updateEvents, deleteEvents } = require('../controllers/events');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields-validator');
const isDate = require('../helpers/isDate');




const router = Router();
//Get Events

router.use(validateJWT);

router.get('/', getEvents);

//Create a new event
router.post(
    '/',
    [
        check('title', 'Title is necesary').notEmpty(),
        check('start', 'The Date is necesary').custom(isDate),
        check('end', 'The Date is necesary').custom(isDate),
        validateFields
    ],
    createEvents);

//Update Event

router.put(
    '/:id',
    [
        check('title', 'Title is necesary').notEmpty(),
        check('start', 'The Date is necesary').custom(isDate),
        check('end', 'The Date is necesary').custom(isDate),
        validateFields
    ],
    updateEvents);

//Delete Event

router.delete('/:id', deleteEvents);

module.exports = router;