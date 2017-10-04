import { Reactx, ReactxDOM } from './reactx'
import { JSDOM } from "jsdom"

const helloWorld = Reactx.createElement('div', null, "Hello World")
ReactxDOM.render(helloWorld, document.getElementById("root"))
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>')

