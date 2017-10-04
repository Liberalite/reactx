import { React, ReactDOM } from './reactx'
import { JSDOM } from "jsdom"

const helloWorld = React.createElement('div', null, "Hello World")
ReactDOM.render(helloWorld, document.getElementById("root"))
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>')

