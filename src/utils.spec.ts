import { isComponentClassConstructor, isStatelessComponent, toDashCase, isComponentClass } from './utils';

describe("utils", () => {
    it("toDashCase", () => {
        expect(toDashCase('fooBarBar')).toEqual('foo-bar-bar')
        expect(toDashCase('acceptCharset')).toEqual('accept-charset')
        expect(toDashCase('accept')).toEqual('accept')
    })

    it('isStatelessComponent', () => {
        expect(isStatelessComponent(() => "")).toBeTruthy()
        expect(isStatelessComponent("")).toBeFalsy()
    })

    class NotComponent { }
    class Good { render() { return "" } }

    it('isComponentClassConstructor', () => {
        expect(isComponentClassConstructor(NotComponent)).toBeFalsy()
        expect(isComponentClassConstructor(Good)).toBeTruthy()
    })

    it('isComponentClass', () => {
        expect(isComponentClass(new NotComponent())).toBeFalsy()
        expect(isComponentClass(new Good())).toBeTruthy()
    })
})
