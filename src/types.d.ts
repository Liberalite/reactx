interface Constructable<T, TProps> {
    new(props: TProps): T
}
type ReactElement = HTMLElement | IClassComponent
type ReactChildren = ReactElement | string | (ReactElement | string)[]
type StatelessComponent<T = void> = (props: T) => ReactElement
interface IClassComponent {
    render: () => ReactElement
    children?: ReactChildren[]
}
type Constructors<TProps> = string | Constructable<IClassComponent, TProps> | StatelessComponent<TProps>

