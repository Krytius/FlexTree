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
    var button;

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

    var setCheck = function(val) {
        check = val;
        return;
    };

    var getCheck = function() {
        return check;
    };

    var setButons = function(val) {
        button = val;
        return;
    };

    var getButons = function(val) {
        return button;
    };

    //	
    //	
    //	Inicialização do treeview
    //
    //    	

    /**
     * Função que inicia os processos do plugin
     * @param  {Object} json
     * @return {void}
     */
    var init = function(json) {
        object = json;

        start();
        return;
    };

    /**
     * Bootstrap do plugin
     * @return {void}
     */
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

        var quant = document.querySelectorAll('#mw-content-tree').length;
        for(var i=0; i<quant; i++) {
            document.querySelectorAll('#mw-content-tree')[i].style.width = treeCreate.tamanhoContent() + 'px';
        }

        if (button) {
            var documentButton = createButton();
            element.appendChild(documentButton);
        }

    };

    //
    //
    //	Regras
    //
    //

    /**
     * Função que inicializa os modulos ou classes para haver um trabalho em conjunto dos elementos
     * @return {void}
     */
    var initModules = function() {
        treeCreate.init(retorno);
        treeEvents.init(retorno);
    };

    //	
    //	
    //	Manipulação de DON
    //	
    //	

    /**
     * Função que cria o cabeçalho da tree View
     * @return {DON|Element}
     */
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

    /**
     * Função que cria arvore da tree
     * @return {DON|Element}
     */
    var createContent = function() {
        var div = create('div');
        div.className = 'mw-tree-view';
        div.style.height = treeCreate.calculoElementos() + 'px';
        var elementTree = treeCreate.createTree(object);
        div.appendChild(elementTree);
        return div;
    };

    /**
     * Função que cria o botões da tree view
     * @return {DON|Element}
     */
    var createButton = function() {
        var div = create('div');
        div.className = "mw-tree-buttons";
        var quant = button.length;

        for (var i = quant - 1; i >= 0; i--) {
            var elementButton = treeCreate.createButton(button[i]);
            div.appendChild(elementButton);
        }

        return div;
    };

    /**
     * Função que cria elementos na DON
     * @param  {string}     don
     * @return {DON|Element}
     */
    var create = function(don) {
        return document.createElement(don);
    };

    /**
     * Função que funciona como um seletor de elementos do document
     * @param  {string}     don
     * @return {DON|Element}
     */
    var selector = function(don) {
        var resp = document.querySelectorAll(don);

        if (resp.length < 2)
            return resp[0];
        else
            return resp;
    };

    /**
     * Função que adiciona classes
     * @param {string}          classe
     * @param {DON|Elemento}    element
     * @return {DON|Element}
     */
    var addClass = function(classe, element) {
        if (element)
            element.className += classe;
    };

    /**
     * Função que remove as classes do elemento solicitado
     * @param  {string}     classe
     * @param  {DON}        element 
     * @return {void}         
     */
    var removeClass = function(classe, element) {
        if (element)
            element.className = element.className.replace(classe, "");
    };

    /**
     * Função que troca classe uma pela outra
     * @param  {string}     next    
     * @param  {string}     prev    
     * @param  {DON}        element
     * @return {void}          
     */
    var replaceClass = function(next, prev, element) {
        if (element)
            element.className = element.className.replace(next, prev);
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
        setButtons: setButons,
        getButtons: getButons,
        // Manipuladores de DON
        create: create,
        selector: selector,
        addClass: addClass,
        removeClass: removeClass,
        replaceClass: replaceClass,
        element: element,
        setMonitorEvent: treeEvents.setMonitorEvents
    };

    return retorno;
};