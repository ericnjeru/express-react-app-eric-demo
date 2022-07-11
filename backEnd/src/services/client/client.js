const {validationResult} = require("express-validator");
const fs = require("fs");
const path = require("path");

const readClientJson =  new Promise(function(resolve, reject) {
    fs.readFile(path.join(__dirname, "../../config/clients.json"), "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            reject(new Error(`Error reading file from disk: ${err}`));
        }
        try {
            const clients = JSON.parse(jsonString);
            resolve(clients);

        } catch (err) {
            console.log("Error parsing JSON string:", err);
            reject(new Error(`Error parsing JSON string: ${err}`));
        }
    })
});

const writeClientJson = (clients)  => new Promise(function(resolve, reject) {
    const jsonString = JSON.stringify(clients)
    fs.writeFile(path.join(__dirname, "../../config/clients.json"), jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
            reject(new Error(`Error writing file to disk: ${err}`));
        } else {
            resolve("Updated successful.");
        }
    })
});

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    let clients = []
    await readClientJson.then(data =>{
        clients = data
        clients.push({
            id: clients[clients.length-1].id +1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            image: req.body.image,
        })

    }).catch(error =>{
        return res.status(500).json({
            success: false,
            errors: error,
        });
    })

    await writeClientJson(clients).then(data=>{
        return res.json(data);

    }).catch(error =>{
        return res.status(500).json({
            success: false,
            errors: error,
        });
    })
}

exports.list = async (req, res) => {
    await readClientJson.then(data =>{
        return res.json(data);
    }).catch(error =>{
        return res.status(500).json({
            success: false,
            errors: error,
        });
    })
}

exports.getClient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    await readClientJson.then(data =>{
        const client = data?.find(item => item.id === parseInt(req.params.id) )
        return res.json(client);
    }).catch(error =>{
        return res.status(500).json({
            success: false,
            errors: error,
        });
    })
}

exports.deleteClient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    let clients = []
    await readClientJson.then(data =>{
        const index = data?.findIndex(item => item.id === parseInt(req.params.id) )
        clients = data
        if (index !== -1){
            clients.splice(index, 1)
        }

    }).catch(error =>{
        return res.status(500).json({
            success: false,
            errors: error,
        });
    })

    await writeClientJson(clients).then(data=>{
        return res.json(data);

    }).catch(error =>{
        return res.status(500).json({
            success: false,
            errors: error,
        });
    })
}