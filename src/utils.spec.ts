import { isComponentClass, isStatelessComponent, toDashCase } from './utils';

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

    it('isComponentClass', () => {
        class NotComponent { }
        expect(isComponentClass(NotComponent)).toBeFalsy()
        class Good { render() { return "" } }
        expect(isComponentClass(Good)).toBeTruthy()
    })
})