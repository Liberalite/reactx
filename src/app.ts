import { Component, createElement, render } from './reactx'

const Button = (onClick: Function, label: string) => createElement('button', { onClick }, label)
const H2 = (value: any) => createElement('h2', null, `${value}`)
const DIV = (...children: ReactChildren) => createElement('div', null, ...children)

class Counter extends Component<void, { value: number }> {
    state = { value: 42 }

    private onPlusClick() {
        this.setState({ value: this.state.value + 1 });
    }

    private onMinusClick() {
        this.setState({ value: this.state.value - 1 });
    }

    render() {
        return DIV(
            H2(this.state.value),
            Button(this.onPlusClick, '+'),
            Button(this.onMinusClick, '-'),
            ...this.children
        )
    }
}

const counter = createElement(Counter, null, DIV('reactx counter'))
render(counter, document.getElementById('app'))
