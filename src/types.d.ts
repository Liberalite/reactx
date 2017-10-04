interface Constructable<T> {
    new(): T
}

type StatelessComponent<T> = (props: T) => HTMLElement

interface Component {
    render: () => HTMLElement
}

type NodeElement<T> = string | Constructable<Component> | StatelessComponent<T>

type Children = (string | HTMLElement)[]

