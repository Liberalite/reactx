import { JSDOM } from 'jsdom'
import { Reactx, ReactxDOM, setDocument } from './reactx'

describe("test test", () => {

    let doc: Document
    let root: HTMLDivElement

    beforeEach(() => {
        doc = new JSDOM('<html><body><div></div></body></html>').window.document
        setDocument(doc)
        root = doc.body.querySelector('div')
    })

    const HELLO_WORLD = "Hello World"
    it("renders html tag", () => {
        const helloWorld = Reactx.createElement('div', null, HELLO_WORLD)
        ReactxDOM.render(helloWorld, root)
        expect(root.textContent).toEqual(HELLO_WORLD)
    })

    it("renders stateless component", () => {
        const C = () => Reactx.createElement('div', null, HELLO_WORLD)
        const helloWorld = Reactx.createElement(C, null, null)
        ReactxDOM.render(helloWorld, root)
        expect(root.innerHTML).toEqual(`<div>${HELLO_WORLD}</div>`)
    })
})
