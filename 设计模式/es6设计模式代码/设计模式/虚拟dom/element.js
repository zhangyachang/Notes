function Element(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
}

Element.prototype.render = function(){
    let el = document.createElement(this.tagName);  // 根据tagName构建
    let props = this.props;
    for(let propsName in props){  // 设置节点和DOM属性
        el.setAttribute(propsName, props[propsName]);
    }

    let children = this.children || [];

    children.forEach(child => {
        let childEl = (child instanceof Element) ?
            child.render() :  // 如果子节点是虚拟dom，递归构建DOM节点
            document.createTextNode(child);  // 如果是字符串，只构建文本节点
        el.appendChild(childEl);
    });

    return el;
};

module.exports = function (tagName, props, children) {
    return new Element(tagName, props, children);
};
