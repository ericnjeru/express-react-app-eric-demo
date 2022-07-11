const client = require('./client')

module.exports = {
    create: client.create,
    list: client.list,
    getClient: client.getClient,
    deleteClient: client.deleteClient,
}