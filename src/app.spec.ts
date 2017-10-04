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

    const HELLO = "Hello"
    const WORLD = "world"
    it("renders html tag", () => {
        const helloWorld = Reactx.createElement('div', null, HELLO)
        ReactxDOM.render(helloWorld, root)
        expect(root.textContent).toEqual(HELLO)
    })

    it("renders several children in html tag", () => {
        const div = Reactx.createElement('div', null, HELLO + " ", WORLD)
        ReactxDOM.render(div, root)
        expect(root.textContent).toEqual(HELLO + " " + WORLD)
    })

    const HelloComponent = () => Reactx.createElement('div', null, HELLO)
    it("renders stateless component", () => {
        const HelloComponentWrapper = Reactx.createElement(HelloComponent)
        ReactxDOM.render(HelloComponentWrapper, root)
        expect(root.innerHTML).toEqual(`<div>${HELLO}</div>`)
    })

    it("renders html and stateless child components", () => {
        const hello = Reactx.createElement(HelloComponent)
        const world = Reactx.createElement('span', null, WORLD)
        const wrapper = Reactx.createElement('section', null, hello, world)
        ReactxDOM.render(wrapper, root)
        expect(root.innerHTML).toEqual(`<section><div>${HELLO}</div><span>${WORLD}</span></section>`)
    })
})
