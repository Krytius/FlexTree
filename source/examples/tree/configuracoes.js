var tree, tree2;
window.onload = function() {
    tree = new Tree("tree");
    tree.setTitle('Produtos');
    tree.setIcon('img/produtos.png');
    tree.setColapse(true);
    tree.setCheck(true);
    tree.setFilter(true);
    tree.setButtons([{
        name: "Salvar",
        icon: "img/add.png",
        eventReturn: "objectChecked",
        callback: function(json) {
            console.log(json);
        },
        width: 100
    }]);
    tree.setMonitorEvent("onCheck", function(id, check, obj, arvore) {
        console.log(id, check, obj, arvore);
    });
    tree.init(js);
};