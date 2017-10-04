interface Constructable<T, TProps> {
    new(props: TProps): T

}

type StatelessComponent<T> = (props: T) => HTMLElement

interface IClassComponent {
    render: () => HTMLElement
}

type NodeElement<T> = string | Constructable<IClassComponent, T> | StatelessComponent<T>

type Children = (string | HTMLElement)[]

