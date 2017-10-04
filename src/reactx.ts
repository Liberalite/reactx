let document: Document = window.document
export const setRenderTarget = (d: Document) => document = d

export abstract class Component<TProps = void, TState = void> implements IClassComponent {
    constructor(public props?: TProps) { }
    render(): HTMLElement { return null }
}

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

function isComponentClass<T>(e: any): e is IClassComponent & Constructable<IClassComponent, T> {
    return !!e.prototype && !!e.prototype.constructor.name && !!e.prototype.render
}

function isStatelessComponent<T>(e: any): e is StatelessComponent<T> {
    return typeof e === 'function' && !isComponentClass(e)
}

export function createElement<T>(e: NodeElement<T>, props: T = null, ...children: Children): HTMLElement {
    if (isComponentClass(e))
        return new e(props).render()

    if (typeof e === 'function')
        return (e as StatelessComponent<T>)(props)

    if (typeof e === 'string')
        return createTagElement(e, children)
    return null
}

export function render<T extends Node>(element: any, root: T) {
    root.appendChild(element)
}
