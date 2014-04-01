var tree;
window.onload = function() {
    tree = new Tree("tree");
    tree.setTitle('Mercados');
    tree.setIcon('img/produtos.png');
    tree.setColapse(true);
    tree.setCheck(true);
    tree.setFilter(true);
    tree.setMonitorEvent("onCheck", function(id, check, obj, arvore) {
        console.log(id, check, obj, arvore);
    });
    tree.init(js, 'object');
};