const { handleSubmit } = require("../src/client/js/formHandler")

describe('Testing the submit functionality', ()=> {
    it('Testing the handleSubmit() fn', () => {
        expect(handleSubmit).toBeDefined();
    })
})

