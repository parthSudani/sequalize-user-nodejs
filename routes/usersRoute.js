const express = require('express')
const router = express()
const user = require("../libs/jwt").verifyTokenUser

/**
 * IMPORT CONTROLLER 
 */
const {
    createUser,
    usersList,
    getByUserid,
    updateUser,
    deleteUser,
    loginUser,
} = require('../controller/userController/index')

/**
 * REGISTER USER
 */
router.post('/',
    async(req, res) => {
        try {
            var ctrlResponse = await createUser.create(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

/**
 * USERS LIST
 */
router.get('/',
    async(req, res) => {
        try {
            var ctrlResponse = await usersList.findAll(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

/**
 * LOGIN USER
 */
router.post('/login',
    async(req, res) => {
        try {
            var ctrlResponse = await loginUser.login(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

/**
 * USER DETAIL
 */
router.get('/:id', user,
    async(req, res) => {
        try {
            var ctrlResponse = await getByUserid.findById(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

/**
 * UPDATE USER
 */
router.put('/:id', user,
    async(req, res) => {
        try {
            var ctrlResponse = await updateUser.update(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })


/**
 * DELETE USER
 */
router.delete('/:id', user,
    async(req, res) => {
        try {
            var ctrlResponse = await deleteUser.delete(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

module.exports = router