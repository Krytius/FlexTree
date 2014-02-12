var Tree = function(elem) {

    // 
    // 
    // Classes
    // 
    // 
    var treeCreate = new TreeCreate;
    var treeEvents = new TreeEvents;

    // 
    // 
    // Globais
    // 
    // 

    var element = document.getElementById(elem);
    var object = {};

    var dimensionElement = {};

    // 
    // 
    // Configurações
    //
    //  

    var title;
    var icon;
    var colapse;
    var check;


    //	
    //	
    //	Getters e Setters
    //	
    //	

    var getObject = function() {
        return object;
    };

    var setTitle = function(val) {
        title = val;
        return;
    };

    var getTitle = function() {
        return title;
    };

    var setIcon = function(val) {
        icon = val;
        return;
    };

    var getIcon = function() {
        return icon;
    };

    var setColapse = function(val) {
        colapse = val;
        return;
    };

    var getColapse = function() {
        return colapse;
    };
    
    var setCheck = function (val) {
        check = val;
        return;
    };
    
    var getCheck = function () {
        return check;
    };

    //	
    //	
    //	Inicialização do treeview
    //	
    //	

    var init = function(json) {
        object = json;

        start();
        return;
    };


    var start = function() {
        element.className = 'mw-flextreeview';

        dimensionElement = {
            width: element.offsetWidth,
            height: element.offsetHeight
        };

        initModules();

        if (title) {
            var documentTitle = createTitle();
            element.appendChild(documentTitle);
        }

        var documentContent = createContent();
        element.appendChild(documentContent);
    };

    //
    //
    //	Regras
    //
    //

    var initModules = function() {
        treeCreate.init(retorno);
        treeEvents.init(retorno);
    };

    //	
    //	
    //	Manipulação de DON
    //	
    //	

    var createTitle = function() {
        var div = create('div');
        div.className = 'mw-title';


        if (icon) {
            var i = create('i');
            i.className = 'icon';
            i.style.backgroundImage = 'url(' + icon + ')';

            div.appendChild(i);
        }

        var text = create('div');
        text.className = 'text';
        text.innerHTML = title;

        div.appendChild(text);

        return div;
    };

    var createContent = function() {
        var div = create('div');
        div.className = 'mw-tree-view';
        var elementTree = treeCreate.createTree(object);
        div.appendChild(elementTree);
        return div;
    };

    var create = function(don) {
        return document.createElement(don);
    };

    var selector = function(don) {
        return document.querySelectorAll(don)[0];
    };

    var addClass = function(classe, element) {
        if (element)
            return element.className += classe;
    };

    var removeClass = function(classe, element) {
        if (element)
            return element.className = element.className.replace(classe, "");
    };

    var replaceClass = function(next, prev, element) {
        if (element)
            return element.className = element.className.replace(next, prev);
    };

    //	
    //	
    //	Métodos Públicos
    //	
    //	

    var retorno = {
        //Classes
        treeCreate: treeCreate,
        treeEvents: treeEvents,
        // Object Padrão
        object: object,
        // Inicialização do TreeView
        init: init,
        // Getters Setters
        getObject: getObject,
        getTitle: getTitle,
        getIcon: getIcon,
        setTitle: setTitle,
        setIcon: setIcon,
        setColapse: setColapse,
        getColapse: getColapse,
        setCheck: setCheck,
        getCheck: getCheck,
        // Manipuladores de DON
        create: create,
        selector: selector,
        addClass: addClass,
        removeClass: removeClass,
        replaceClass: replaceClass,
        element: element
    };

    return retorno;
};