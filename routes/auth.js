/*
    User Routes / Auth
    host + api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createUser, userLogin, revalidateToken } = require('../controllers/auth');

const router = Router();
//TODO: auth 

router.post(
    '/new',
    [//middlewares
        check('name', 'name is obligatory').not().isEmpty(),
        check('email', "email is obligatory").isEmail(),
        check('password', "password should have at least 6 characters").isLength({ min: 6 }),
        validateFields
    ],
    createUser
);

router.post(
    '/',
    [
        //middlewares
        check('email', 'this email does not exist').isEmail(),
        check('password', 'password should have at least 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    userLogin
);

router.get('/renew',
    validateJWT,
    revalidateToken);

module.exports = router;