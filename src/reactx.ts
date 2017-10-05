import { isComponentClassConstructor, isStatelessComponent, toDashCase, isComponentClass } from './utils'

let DOC: Document = document
export const setRenderTarget = (d: Document) => DOC = d

export abstract class Component<TProps = void, TState = void> implements IClassComponent {
    constructor(public props?: TProps) {
        const that = this as any
        // to enable 'eta reduction' in tsx
        for (let fname in this)
            if (typeof (that[fname]) === "function")
                that[fname] = that[fname].bind(that)
    }
    children: ReactChildren = null
    public state?: TState = {} as any
    render(): ReactElement { return null }
    setState(state: TState) {
        this.state = { ...(this.state as any), ...(state as any) }
        refresh()
    }
}

function appendProp(domElement: HTMLElement, propName: string, value: any) {
    if (/^on.+$/.test(propName))
        domElement.addEventListener(propName.substring(2).toLowerCase(), value)
    else
        domElement.setAttribute(toDashCase(propName), value);
}

function appendProps<T>(domElement: HTMLElement, props: T) {
    Object.keys(props || {}).forEach(propName =>
        appendProp(domElement, propName, (props as any)[propName]))
}

function appendChild(domElement: HTMLElement, child: ReactChild | ReactChild[]) {
    if (Array.isArray(child))
        child.forEach(c => appendChild(domElement, c))
    else if (typeof child === 'string')
        domElement.innerHTML += child
    else if (isComponentClass(child))
        domElement.appendChild(flatten(child))
    else
        domElement.appendChild(child)
}

function appendChildren(domElement: HTMLElement, children: ReactChildren) {
    (children || []).forEach(child => appendChild(domElement, child))
}

function createTagElement<T>(tag: string, props: T, children: ReactChildren) {
    const domElement = DOC.createElement(tag)
    appendChildren(domElement, children)
    appendProps(domElement, props)
    return domElement
}

function createClass<T>(e: Constructable<IClassComponent, T>, props: T, ...children: ReactChildren) {
    const el = new e(props)
    el.children = children
    return el
}

export function createElement<T>(e: ReactComponentConstructor<T>,
    props: T = null, ...children: ReactChildren): ReactElement {
    if (isComponentClassConstructor(e))
        return createClass(e, props, ...children)

    if (isStatelessComponent(e))
        return e(props)

    if (typeof e === 'string')
        return createTagElement(e, props, children)
    return null
}

let reactSrc: ReactElement
let htmlDest: HTMLElement

function flatten(src: ReactElement): HTMLElement {
    if (isComponentClass(src))
        return flatten(src.render())
    return src
}

export function render(src: ReactElement, dest: HTMLElement) {
    reactSrc = src
    htmlDest = dest
    htmlDest.appendChild(flatten(src))
}

function refresh() {
    htmlDest.innerHTML = ''
    render(reactSrc, htmlDest)
}
