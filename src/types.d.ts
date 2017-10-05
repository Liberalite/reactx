interface Constructable<T, TProps> {
    new(props: TProps): T
}

type ReactElement = HTMLElement | IClassComponent
type ReactChild = string | ReactElement
type ReactChildren = (ReactChild | ReactChild[])[]

type StatelessComponent<T = void> = (props: T) => ReactElement
interface IClassComponent {
    render: () => ReactElement
    children: ReactChildren
}

type ReactComponentConstructor<TProps> = string | Constructable<IClassComponent, TProps> | StatelessComponent<TProps>

