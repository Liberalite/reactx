import { setDocument, React, ReactDOM } from './reactx'
import { JSDOM } from "jsdom"


describe("test test", () => {
    it("renders html tag", () => {
        const document = new JSDOM('<!DOCTYPE html><body><div></div></body></html>').window.document
        setDocument(document)
        const root = document.body.querySelector('div')
        const helloWorld = React.createElement('div', null, "Hello World")
        ReactDOM.render(helloWorld, root)
        expect(root.textContent).toEqual("Hello World")
    })

})