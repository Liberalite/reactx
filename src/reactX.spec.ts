import { JSDOM } from 'jsdom';

import { Component, createElement, render, setRenderTarget } from './reactx';

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

    it("renders class Component", () => {
        const wrapper = createElement(Hello)
        render(wrapper, root)
        expect(root.innerHTML).toEqual(`<div>${HELLO}</div>`)
    })

    it("renders stateless component with props", () => {
        const HelloComponent = (props: { firstname: string, lastname: string }) =>
            createElement('b', null, `${HELLO} ${props.firstname} ${props.lastname}!`)
        const hello = createElement(HelloComponent, { firstname: 'Edsger', lastname: 'Dijkstra' })
        render(hello, root)
        expect(root.innerHTML).toEqual(`<b>${HELLO} Edsger Dijkstra!</b>`)
    })

    class Hey extends Component<{ name: string }> {
        render(): HTMLElement {
            return createElement('b', null, `hey ${this.props.name}!`)
        }
    }

    it("renders class Component with props", () => {
        const hello = createElement(Hey, { name: 'Joe' })
        render(hello, root)
        expect(root.innerHTML).toEqual(`<b>hey Joe!</b>`)
    })
})
