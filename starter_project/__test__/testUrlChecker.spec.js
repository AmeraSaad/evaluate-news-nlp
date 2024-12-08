const { checkForUrl } = require("../src/client/js/urlChecker")

describe('Test check URL functionality', ()=> {
    test('Testing the checkURL function', () => {
        expect(checkForUrl).toBeDefined()
    })
    
    test('emails are not considered valid urls', () => {
        expect(checkForUrl("mailto:ahmed@gmail.com")).toBeFalsy();
    })
    
    test('checkForUrl return false for invalid url', () => {
        expect(checkForUrl('noway')).toBeFalsy()
    })

    test('checkForUrl return true for valid url', () => {
        expect(checkForUrl('http://example.com')).toBeTruthy()
    })

    test('expect empty string to be falsy', () => {
        expect(checkForUrl("")).toBeFalsy();
    })
})
