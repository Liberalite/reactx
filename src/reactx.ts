let doc: Document = document
export function setDocument(d: Document) {
    doc = d
}

type Component<T> = (props: T) => HTMLElement
function createElement<T = void>(tagName: string | Component<T>, props: T, children: any): HTMLElement {
    console.log(typeof tagName, tagName)
    if (typeof tagName === 'function') {
        return tagName(props)
    }

    const domElement = doc.createElement(tagName)
    domElement.innerHTML = children
    return domElement
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
