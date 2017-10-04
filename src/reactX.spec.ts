import { JSDOM } from 'jsdom'
import { setRenderTarget, createElement, render } from './reactx'

describe("reactX", () => {
    const HELLO = "Hello"
    const WORLD = "world"
    let root: HTMLDivElement

    beforeEach(() => {
        const document = new JSDOM('<!DOCTYPE html><body><div></div></body></html>').window.document
        setRenderTarget(document)
        root = document.body.querySelector('div')
    })

    it("renders html tag", () => {
        const helloDiv = createElement('div', null, HELLO)
        render(helloDiv, root)
        expect(root.innerHTML).toEqual(`<div>${HELLO}</div>`)
    })

    it("renders several children in html tag", () => {
        const div = createElement('div', null, HELLO + " ", WORLD)
        render(div, root)
        expect(root.innerHTML).toEqual(`<div>${HELLO} ${WORLD}</div>`)
    })

    const HelloComponent = () => createElement('div', null, HELLO)
    it("renders stateless component", () => {
        const hello = createElement(HelloComponent)
        render(hello, root)
        expect(root.innerHTML).toEqual(`<div>${HELLO}</div>`)
    })

    it("renders html and stateless child components", () => {
        const hello = createElement(HelloComponent)
        const world = createElement('span', null, WORLD)
        const wrapper = createElement('section', null, hello, world)
        render(wrapper, root)
        expect(root.innerHTML).toEqual(`<section><div>${HELLO}</div><span>${WORLD}</span></section>`)
    })

    class Hello implements Component {
        render(): HTMLElement {
            return createElement('div', null, HELLO)
        }
    }

    it("renders html and stateless child components", () => {
        const wrapper = createElement(Hello)
        render(wrapper, root)
        expect(root.innerHTML).toEqual(`<div>${HELLO}</div>`)
    })
})
