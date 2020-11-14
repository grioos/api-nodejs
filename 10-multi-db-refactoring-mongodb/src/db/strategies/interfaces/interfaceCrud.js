class NotImplementedException extends Error {
    constructor() {
        super('Not implemented exception')
    }
}

class ICrud {
    create(item) {
        throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException()
    }

    update(id, item) {
        throw NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }

    isConnected() {
        throw new NotImplementedException()
    }
    
    connected() {
        throw new NotImplementedException()
    }
}

module.exports = ICrud