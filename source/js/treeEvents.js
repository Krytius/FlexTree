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


    var markDesmarkCheck = function() {
        var ele;

        if (this.className.substr(0, 5) === 'check')
            ele = this;
        else
            ele = this.parentNode.childNodes[1];

        check(ele);
    };

    var eventsTitle = function() {
        var id = this.parentNode.getAttribute('data-id');
        if (object.getCheck()) {
            check(object.selector('.mw-topic[data-id="' + id + '"] #mw-check')[0]);
        }
    };

    var check = function(ele) {
        var grupo = ele.parentNode.getAttribute('data-id');
        var mark = false;
        // Marcar Elemento 
        if (ele.className === "checkActive") {
            mark = false;
            object.replaceClass("checkActive", "checkInative", ele);
            removeSelectCheck(grupo);
        } else {
            mark = true;
            object.replaceClass("checkInative", "checkActive", ele);
            addSelectCheck(grupo);
        }

        // Marcar todo grupo
        var tree = object.treeCreate.returnTreeDown(object.getObject(), grupo);
        if (tree) {
            checkUncheckGroup(tree, mark);
        }
    };

    var checkUncheckGroup = function(tree, mark) {
        var quant = tree.length;

        for (var i = 0; i < quant; i++) {
            var element = object.selector('.mw-topic[data-id="' + tree[i].id + '"][group-id="' + tree[i].idGroup + '"] #mw-check')[0];
           
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
    
    var removeSelectCheck = function(id) {
        if(!(checksSelect.length > 0))
            return;
            
        var index = checksSelect.indexOf(id);
        checksSelect.splice(index, 1);
        
        onCheckEvent(id, false, checksSelect);
    };
    
    var addSelectCheck = function(id) {
        checksSelect.push(id);
        
        onCheckEvent(id, true, checksSelect);
    };
    
    //
    //
    //  Monitor de Eventos
    //
    //
    
    var setMonitorEvents = function(evento, callback) {
        switch(evento) {
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
        //Gets Sets
        setSelected: setSelected,
        getSelected: getSelected,
        
        // Monitor Events
        setMonitorEvents:setMonitorEvents
    };

    return retorno;

};

