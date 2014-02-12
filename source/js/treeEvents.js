var TreeEvents = function() {

    //
    //
    //	Globais
    //
    //

    var object = {};


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
    //  Eventos
    //
    //

    /**
     * Função que faz ocultar ou desaparecer sub itens da arvore
     * @return {void}
     */
    var openCloseGroup = function() {
        var ele;

        if (this.className.substr(0, 5) === 'arrow') {
            ele = this.parentNode;
        } else {
            ele = this;
        }

        var grupo = ele.getAttribute('data-id');

        var element = object.selector('.mw-group[group-id="' + grupo + '"]');

        if (element.style.display === 'block') {
            element.style.display = 'none';
            object.replaceClass('arrowActive', 'arrowInactive', this.childNodes[0]);
        } else {
            element.style.display = 'block';
            object.replaceClass('arrowInactive', 'arrowActive', this.childNodes[0]);
        }
    };


    var markDesmarkCheck = function() {
        var ele;

        if (this.className.substr(0, 5) === 'check')
            ele = this;
        else
            ele = this.parentNode.childNodes[1];

        if (ele.className === "checkActive") {
            object.replaceClass("checkActive", "checkInative", ele);
        } else {
            object.replaceClass("checkInative", "checkActive", ele);
        }


    };
    
    var eventsTitle = function() {
        if(object.getCheck()) {
            
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
        eventsTitle: eventsTitle
    };

    return retorno;

};

