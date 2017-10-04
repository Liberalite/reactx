interface Constructable<T, TProps> {
    new(props: TProps): T
}

type StatelessComponent<T> = (props: T) => HTMLElement

interface IClassComponent {
    render: () => HTMLElement & { type?: string, kids?: Children }
}

type NodeElement<TProps> = string | Constructable<IClassComponent, TProps> | StatelessComponent<TProps>

type Children = (string | HTMLElement)[]

