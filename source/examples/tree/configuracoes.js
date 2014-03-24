var tree, tree2;
window.onload = function() {
//    tree = new Tree("tree");
//    tree.setTitle('Produtos');
//    tree.setIcon('img/produtos.png');
//    tree.setColapse(true);
//    tree.setCheck(true);
//    tree.setFilter(true);
//    tree.setMonitorEvent("onCheck", function(id, check, obj, arvore) {
//        console.log(id, check);
//    });
//    tree.init(js, 'object');
    
    tree2 = new Tree("tree2");
    tree2.setTitle('Produtos');
    tree2.setIcon('img/produtos.png');
    tree2.setColapse(true);
    tree2.setCheck(true);
    tree2.setFilter(true);
    tree2.setMonitorEvent("onCheck", function(id, check, obj, arvore) {
        console.log(id, check, obj, arvore);
    });
    tree2.init(js2, 'object');
};