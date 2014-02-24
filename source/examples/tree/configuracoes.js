var tree, tree2;
window.onload = function() {
    tree = new Tree("tree");
    tree.setTitle('Produtos');
    tree.setIcon('img/produtos.png');
    tree.setColapse(true);
    tree.setCheck(true);
    tree.setButtons([{
        name: "Salvar",
        icon: "img/add.png",
        eventReturn: "objectChecked",
        callback: function(json) {
            console.log(json);
        },
        width: 100
    }]);
    tree.setMonitorEvent("onCheck", function(id, check, obj) {
        console.log(id, check, obj);
    });
    tree.init(js);

    tree2 = new Tree("tree2");
    tree2.setTitle('Produtos');
    tree2.setIcon('img/produtos.png');
    tree2.setColapse(true);
    tree2.setCheck(true);
    tree2.setButtons([{
        name: "Salvar",
        icon: "img/add.png",
        eventReturn: "objectChecked",
        callback: function(json) {
            console.log(json);
        },
        width: 100
    }]);
    tree2.setMonitorEvent("onCheck", function(id, check, obj) {
        console.log(id, check, obj);
    });
    tree2.init(js);
};