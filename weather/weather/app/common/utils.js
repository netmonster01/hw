function Enum() {
    for (var i = 0; i < arguments.length; ++i) {
        this[arguments[i]] = i;
    }
    return this;
}
