import { Component, createElement, render } from './reactx'

const Button = (onClick: Function, label: string) => createElement('button', { onClick }, label)
const H2 = (value: any) => createElement('h2', null, `${value}`)

class Counter extends Component<void, { value: number }> {
    state = { value: 0 }

    private onPlusClick() {
        this.setState({ value: this.state.value + 1 });
    }

    private onMinusClick() {
        this.setState({ value: this.state.value - 1 });
    }

    render() {
        return createElement('div', null,
            H2(this.state.value),
            Button(this.onPlusClick, '+'),
            Button(this.onMinusClick, '-')
        )
    }
}

render(createElement(Counter), document.getElementById('app'))
