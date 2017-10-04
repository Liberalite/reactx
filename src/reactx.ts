import { isComponentClass, isStatelessComponent, toDashCase } from './utils';

let document: Document
export const setRenderTarget = (d: Document) => document = d

export class Component<TProps = void, TState = void> implements IClassComponent {
    constructor(public props?: TProps) { }
    public state?: TState = {} as any
    render(): HTMLElement { return null }
    setState(state: TState) {
        this.state = { ...(this.state as any), state }
    }
}

function appendChildren(domElement: HTMLElement, children: Children) {
    (children || []).forEach(child => {
        if (typeof child === 'string')
            domElement.innerHTML += child
        else
            domElement.appendChild(child)
    })
}

function appendProp(domElement: HTMLElement, propName: string, value: any) {
    if (/^on.*$/.test(propName))
        domElement.addEventListener(propName.substring(2).toLowerCase(), value);
    else
        domElement.setAttribute(toDashCase(propName), value);
}

function appendProps<T>(domElement: HTMLElement, props: T) {
    Object.keys(props || {}).forEach(propName =>
        appendProp(domElement, propName, (props as any)[propName]))
}

function createTagElement<T>(tag: string, props: T, children: Children) {
    const domElement = document.createElement(tag)
    appendChildren(domElement, children)
    appendProps(domElement, props)
    return domElement
}

export function createElement<T>(e: NodeElement<T>, props: T = null, ...children: Children): HTMLElement {
    if (isComponentClass(e))
        return new e(props).render()

    if (isStatelessComponent(e))
        return e(props)

    if (typeof e === 'string')
        return createTagElement(e, props, children)
    return null
}

export function render<T extends Node>(element: any, root: T) {
    root.appendChild(element)
}
