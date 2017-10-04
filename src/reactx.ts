let doc: Document = document
export function setDocument(d: Document) {
    doc = d
}
function createElement(tagName: string, props: any, children: any) {
    const domElement = doc.createElement(tagName)
    domElement.innerHTML = children
    return domElement
}

export const React = {
    createElement
}

function render<T extends Node>(element: any, root: T) {
    root.appendChild(element)
}

export const ReactDOM = {
    render
}