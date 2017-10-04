let document: Document = window.document
export const setDocument = (d: Document) => document = d

type Component<T> = (props: T) => HTMLElement
type Element<T> = string | Component<T>
type Children = (string | HTMLElement)[]

function createTagElement<T>(tag: string, children: Children) {
    const domElement = document.createElement(tag)
    children.forEach(child => {
        if (typeof child === 'string')
            domElement.innerHTML += child
        else
            domElement.appendChild(child)
    })
    return domElement
}

function createElement<T = void>(e: Element<T>, props: T = null, ...children: Children): HTMLElement {
    if (typeof e === 'function')
        return e(props)
    return createTagElement(e, children)
}

export const Reactx = {
    createElement
}

function render<T extends Node>(element: any, root: T) {
    root.appendChild(element)
}

export const ReactxDOM = {
    render
}
