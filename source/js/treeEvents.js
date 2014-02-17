var TreeEvents = function() {

    //
    //
    //	Globais
    //
    //

    var object = {};
    var checksSelect = [];

    var onCheckEvent;


    //
    //
    //	Inicialização do modulo
    //
    //

    /**
     * Função que inicializa o método
     * @param {Object} objeto
     * @return {void}
     */
    var init = function(objeto) {
        object = objeto;
        return;
    };

    //
    //
    //  Getters e Setters
    //
    //

    var setSelected = function(val) {
        checksSelect = val;
        return;
    };

    var getSelected = function() {
        return checksSelect;
    };


    //
    //
    //  Eventos
    //
    //

    /**
     * Função que faz ocultar ou desaparecer sub itens da arvore
     * @return {void}
     */
    var openCloseGroup = function() {
        var ele, element2;

        if (this.className.substr(0, 5) === 'arrow') {
            ele = this.parentNode;
            element2 = this;
        } else {
            ele = this;
            element2 = this.childNodes[this.childNodes.length - 1];
        }

        var grupo = ele.getAttribute('data-id');
        var element = object.selector('.mw-group[group-id="' + grupo + '"]')[0];

        if (element.style.display === 'block') {
            element.style.display = 'none';
            object.replaceClass('arrowActive', 'arrowInactive', element2);
        } else {
            element.style.display = 'block';
            object.replaceClass('arrowInactive', 'arrowActive', element2);
        }
    };

    /**
     * Método que marca e desmarca o elemento
     * @return {void}
     */
    var markDesmarkCheck = function() {
        var ele;

        if (this.className.substr(0, 5) === 'check')
            ele = this;
        else
            ele = this.parentNode.childNodes[1];

        check(ele);
    };

    /**
     * Função que da eventos ao titulo
     * @return {void}
     */
    var eventsTitle = function() {
        var id = this.parentNode.getAttribute('data-id');
        if (object.getCheck()) {
            check(object.selector('.mw-topic[data-id="' + id + '"] #mw-check'));
        }
    };

    /**
     * Função que executa o checked solitário ou do grupo inteiro
     * @param  {DON}        ele
     * @return {void}
     */
    var check = function(ele) {
        var id = ele.parentNode.getAttribute('data-id');
        var grupo = ele.parentNode.getAttribute('group-id');
        var mark = false;

        // Marcar Elemento 
        if (ele.className === "checkMediate") {
            mark = true;
            object.replaceClass("checkMediate", "checkActive", ele);
            addSelectCheck(id);
        } else if (ele.className === "checkActive") {
            mark = false;
            object.replaceClass("checkActive", "checkInative", ele);
            removeSelectCheck(id);
        } else {
            mark = true;
            object.replaceClass("checkInative", "checkActive", ele);
            addSelectCheck(id);
        }

        // Marcar todo grupo
        var tree = object.treeCreate.returnTreeDown(object.getObject(), id);
        if (tree) {
            checkUncheckGroup(tree, mark);
        }

        // Marcar Pai
        marcarPai(grupo, object.getObject());

    };

    /**
     * Função que selected o grupo todo da treeView
     * @param  {Object} tree
     * @param  {Bollean} mark
     * @return {void}
     */
    var checkUncheckGroup = function(tree, mark) {
        var quant = tree.length;

        for (var i = 0; i < quant; i++) {
            var element = object.selector('.mw-topic[data-id="' + tree[i].id + '"][group-id="' + tree[i].idGroup + '"] #mw-check');

            if (!mark) {
                object.replaceClass("checkActive", "checkInative", element);
                removeSelectCheck(tree[i].id);
            } else {
                object.replaceClass("checkInative", "checkActive", element);
                addSelectCheck(tree[i].id);
            }

            if (tree[i].filho) {
                checkUncheckGroup(tree[i].filho, mark);
            }

        }
    };

    /**
     * Função que remove os ids da variavel de controle de itens marcados
     * @param  {integer} id
     * @return {void}
     */
    var removeSelectCheck = function(id) {
        if (!(checksSelect.length > 0))
            return;

        var index = checksSelect.indexOf(id);
        checksSelect.splice(index, 1);

        if (onCheckEvent) {
            onCheckEvent(id, false, checksSelect);
        }
    };

    /**
     * Função que adiciona os ids na variavel de controle de itens marcados
     * @param {integer} id
     * @return {void}
     */
    var addSelectCheck = function(id) {
        var index = checksSelect.indexOf(id);

        if (index === -1) {
            checksSelect.push(id);
        }

        if (onCheckEvent) {
            onCheckEvent(id, true, checksSelect);
        }
    };
    
    /**
     * Funçãp que marca o checkbox do pai caso um filho for marcado
     * @param {integer} grupo
     * @param {Object} obj
     * @return {void}
     */
    var marcarPai = function(grupo, obj) {
        var pai = object.treeCreate.returnTreeUp(obj, grupo);
        if (!pai)
            return;

        var quantFilhos = pai.filho.length;
        var elementPai = object.selector('#mw-content-tree[group-id="' + pai.id + '"] div.mw-topic div#mw-check');
        var contador = 0;
        for (var i = 0; i < quantFilhos; i++) {
            if(!elementPai.length){
                elementPai = [elementPai];
            }
            
            if (elementPai[i].className === "checkActive") {
                contador++;
            }
        }
        
        var element = object.selector('.mw-topic[data-id="' + pai.id + '"] #mw-check');
        if (contador === quantFilhos) {
            element.className = 'checkActive';
        } else if (contador === 0) {
            element.className = 'checkInative';
        } else {
            element.className = 'checkMediate';
        }

    };
    
    /**
     * Função que retorna para o usuário os callback dos botões
     * @param {DON} element
     * @param {string} event
     * @param {Function} callback
     * @return {void}
     */
    var eventButton = function(element, event, callback) {
        switch (event) {
            case "objectChecked":
                callback(checksSelect);
                break;
        }
    };

    //
    //
    //  Monitor de Eventos
    //
    //

    /**
     * Função de callback para o usuário para customização da ação
     * @param {string}   evento 
     * @param {Function} callback
     */
    var setMonitorEvents = function(evento, callback) {
        switch (evento) {
            case "OnCheck":
                onCheckEvent = callback;
                break;
        }
    };

    //
    //
    //	Objeto de Retorno
    //
    //
    var retorno = {
        init: init,
        openCloseGroup: openCloseGroup,
        markDesmarkCheck: markDesmarkCheck,
        eventsTitle: eventsTitle,
        eventButton: eventButton,
        //Gets Sets
        setSelected: setSelected,
        getSelected: getSelected,
        // Monitor Events
        setMonitorEvents: setMonitorEvents
    };

    return retorno;

};

