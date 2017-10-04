import { isComponentClass, isStatelessComponent, toDashCase } from './utils';

let document: Document
export const setRenderTarget = (d: Document) => document = d

export class Component<TProps = void, TState = void> implements IClassComponent {
    constructor(public props?: TProps) { }
    public state?: TState = {} as any
    render(): HTMLElement { return null }
    setState(state: TState) {
        this.state = { ...(this.state as any), ...(state as any) }
        refresh()
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
const REACT_CLASS = "reactClass"
function renderClass<T>(e: Constructable<IClassComponent, T>, props: T, ...children: Children) {
    const el = new e(props).render()
    el.kids = children
    el.type = REACT_CLASS
    return el
}
export function createElement<T>(e: NodeElement<T>, props: T = null, ...children: Children): HTMLElement {
    if (isComponentClass(e))
        return renderClass(e, props)

    if (isStatelessComponent(e))
        return e(props)

    if (typeof e === 'string')
        return createTagElement(e, props, children)
    return null
}

let rootReactElement: Component<any, any> | HTMLElement
let rootDOMElement: HTMLDivElement

export function render(element: Component<any, any> | HTMLElement, root: HTMLDivElement) {
    rootReactElement = element
    let currentDOM: HTMLElement
    if ((element as any).render)
        currentDOM = (element as any).render()
    else
        currentDOM = element as HTMLElement
    rootDOMElement = root
    rootDOMElement.appendChild(currentDOM)
}

function refresh() {
    rootDOMElement.innerHTML = ''
    render(rootReactElement, rootDOMElement)
}
