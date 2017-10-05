export function toDashCase(attr: string) {
    return attr.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function isComponentClass<T>(e: any): e is IClassComponent {
    return typeof e === "object" && !!e.render
}

export function isComponentClassConstructor<T>(e: any): e is IClassComponent & Constructable<IClassComponent, T> {
    return !!e.prototype && !!e.prototype.constructor.name && !!e.prototype.render
}

export function isStatelessComponent<T>(e: any): e is StatelessComponent<T> {
    return typeof e === 'function' && !isComponentClassConstructor(e)
}
