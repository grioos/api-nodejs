const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')
const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}
const context = new Context(new MongoDb())

describe('MongoDB Suite de Testes', function () {
    before(async () => {
        await context.connect()
    })

    it('verificar conexao', async () => {
        const result = await context.isConnected()

        assert.deepStrictEqual(result, expected)
    })

    it('cadastrar', async () => {
        const { nome, poder } = await context.create()

        assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })
})