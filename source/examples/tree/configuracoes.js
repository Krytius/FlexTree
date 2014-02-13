var tree;
window.onload = function() {
    tree = new Tree("tree");
    tree.setTitle('Produtos');
    tree.setIcon('img/produtos.png');
    tree.setColapse(true);
    tree.setCheck(true);
    tree.setMonitorEvent("OnCheck", function(id, check, obj) {
        console.log(id, check, obj);
    });
    tree.init(js);
    
    console.log(tree);
};