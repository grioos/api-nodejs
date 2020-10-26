const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]

        if (state === 'Conectado') return state

        if (state === 'Connectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]
    }

    defineModel() {
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },

            poder: {
                type: String,
                required: true
            },

            insertedAt: {
                type: Date,
                dafault: new Date()
            }
        })

        this._herois = Mongoose.model('herois', heroiSchema)
    }

    connect() {
        Mongoose.connect('mongodb://grios:secreta@localhost:27017/herois',
            { useNewUrlParser: true, useUnifiedTopology: true }, error => {
                if (!error) return

                console.log('Falha na conexão', error)
            })

        const connection = Mongoose.connection
        connection.once('open', () => console.log('Database rodando'))

        this._driver = connection
        this.defineModel()
    }

    async create(item) {
        return this._herois.create(item)
    }

    read(item, skip = 0, limit = 10) {
        return this._herois.find(item).skip(skip).limit(limit)
    }

    update(id, item) {
        return this._herois.updateOne({ _id: id }, { $set: item })
    }
}

module.exports = MongoDB