import { isComponentClass, isStatelessComponent, toDashCase } from './utils';

let document: Document
export const setRenderTarget = (d: Document) => document = d

export abstract class Component<TProps = void, TState = void> implements IClassComponent {
    constructor(public props?: TProps) { }
    render(): HTMLElement { return null }
}

function createTagElement<T>(tag: string, props: T, children: Children) {
    const domElement = document.createElement(tag)
    children.forEach(child => {
        if (typeof child === 'string')
            domElement.innerHTML += child
        else
            domElement.appendChild(child)
    })
    if (!props) {
        Object.keys(props).forEach(propName => {
            if (/^on.*$/.test(propName))
                domElement.addEventListener(propName.substring(2).toLowerCase(), (props as any)[propName]);
            else
                domElement.setAttribute(toDashCase(propName), (props as any)[propName]);
        })
    }

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
