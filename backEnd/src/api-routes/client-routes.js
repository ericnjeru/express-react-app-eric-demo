const express = require('express')
const router = express.Router()
const {body, param} = require("express-validator");
const {create, list, getClient, deleteClient} = require("../services/client");

router.post('/create',
    body("first_name", `first_name is required.`).exists(),
    body("last_name", `last_name is required.`).exists(),
    body("email", `email is required.`).exists(),
    body("gender", `gender is required.`).exists(),
    body("image", `image url is required.`).exists(),
    async (req, res) => {
        await create(req, res);
    });

router.get('/list', async (req, res) => {
    await list(req, res);

    });

router.get('/get/:id',
    param("id", `id is required.`).exists().toInt(),
    async (req, res) => {
    await getClient(req, res);

});

router.delete('/delete/:id',
    param("id", `id is required.`).exists().toInt(),
    async (req, res) => {
    await deleteClient(req, res);

});

module.exports = router;