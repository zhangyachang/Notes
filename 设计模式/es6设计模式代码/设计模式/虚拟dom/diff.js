(function () {


    function diff(oldTree, newTree) {
        var index = 0; // 当前节点的标志
        var patches = {}; // 用来记录每个节点差异的对象

        dfWalk(oldTree, newTree, index, patches);
        return patches;
    }

    // 对两棵树进行深度优先遍历
    function dfsWalk(oldNode, newNode, index, patches) {
        // 对比oldNode 和 newNode的不同，记录下来

        // patches[index] = [...];

        diffChildren(oldNode, children, newNode.children, index, patches);
    }


    function diffChildren(oldChildren, newChildren, index, patches) {
        let leftNode = null;
        let currentNodeIndex = index;
        oldChildren.forEach((child, i) => {
            var newChild = newChildren[i];
            currentNodeIndex = (leftNode && leftNode.count) ? // 计算节点的标识
                currentNodeIndex + leftNode.count + 1 :
                currentNodeIndex + 1;
            dfsWalk(child, newChild, currentNodeIndex, patches); // 深度遍历子节点
            leftNode = child;
        })
    }








})();



























