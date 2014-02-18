var TreeCreate = function() {

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
     * Função que inicializa classe
     * @param  {Object} objeto
     * @return {void}
     */
    var init = function(objeto) {
        object = objeto;
        return;
    };

    //
    //
    //  Informações
    //
    //

    /**
     * Função recursiva que retorna no qual posicao de filiação da arvore encontra o id
     * @param {Object} obj
     * @param {integer} id
     * @param {integer} posicao
     * @return {integer} Posição no obj id
     */
    var returnPosition = function(obj, id, posicao) {
        if (!posicao)
            posicao = 1;
        else
            posicao += 1;

        var quant = obj.length;

        for (var i = 0; i < quant; i++) {
            if (obj[i].id === id) {
                return posicao;
            }
        }

        var resp;
        for (var i = 0; i < quant; i++) {
            var child = (obj[i].filho) ? 1 : 0;
            if (child) {
                resp = returnPosition(obj[i].filho, id, posicao);
            }

            if (resp)
                return resp;
        }

    };

    /**
     * Função que Retorna Arvores posterior ao id informado
     * @param {Object} obj
     * @param {integer} id
     * @return {Object}
     */
    var returnTreeDown = function(obj, id) {
        var quant = obj.length;

        for (var i = 0; i < quant; i++) {
            if (obj[i].id === id) {
                if (obj[i].filho) {
                    return obj[i].filho;
                }
            }
        }

        var resp;
        for (var i = 0; i < quant; i++) {
            var child = (obj[i].filho) ? 1 : 0;
            if (child) {
                resp = returnTreeDown(obj[i].filho, id);
            }

            if (resp)
                return resp;
        }

    };

    /**
     * Função que retorna o pai do id informado
     * @param {Object} obj
     * @param {id} id
     * @return {Object}
     */
    var returnTreeUp = function(obj, id) {
        var quant = obj.length;

        for (var i = 0; i < quant; i++) {
            if (obj[i].id === id) {
                if (obj[i].filho) {
                    return obj[i];
                }
            }
        }

        var resp;
        for (var i = 0; i < quant; i++) {
            var child = (obj[i].filho) ? 1 : 0;
            if (child) {
                resp = returnTreeUp(obj[i].filho, id);
            }

            if (resp)
                return resp;
        }
    };

    //
    //
    //  Manipulação de DON
    //
    //

    /**
     * Método que cria a estrutura da tree view
     * @param  {object}     obj
     * @return {void}
     */
    var createTree = function(obj) {
        var quant = obj.length;

        var div = object.create('div');
        div.setAttribute('id', 'mw-content-tree');

        for (var i = 0; i < quant; i++) {

            var posicao = returnPosition(object.getObject(), obj[i].id);
            var child = (obj[i].filho) ? 1 : 0;

            var ele = object.create('div');
            ele.className = 'mw-topic';
            ele.setAttribute('data-id', obj[i].id);
            ele.setAttribute('group-id', obj[i].idGroup);
            ele.style.width = calculoRecuoDiv(posicao) + 'px';

            if (!object.getCheck()) {
                ele.onclick = object.treeEvents.openCloseGroup;
            }

            // Titulo
            var text = object.create('div');
            text.className = 'mw-title-tree';
            text.innerHTML = obj[i].nome;
            text.style.width = calculoRecuoTitle(ele) + 'px';
            text.onclick = object.treeEvents.eventsTitle;

            ele.appendChild(text);

            // CheckBox
            if (object.getCheck()) {
                var check = object.create('div');
                check.className = (obj[i].check) ? "checkActive" : "checkInative";
                check.setAttribute('id', 'mw-check');

                check.onclick = object.treeEvents.markDesmarkCheck;

                ele.appendChild(check);
            }

            // Seta
            if (child) {
                var icon = createArrow();

                if (object.getCheck()) {
                    icon.onclick = object.treeEvents.openCloseGroup;
                }

                ele.appendChild(icon);
            }

            // Titulo Colocado
            div.appendChild(ele);

            if (posicao > 1) {
                ele.parentNode.setAttribute('data-id', obj[i].id);
                ele.parentNode.setAttribute('group-id', obj[i].idGroup);
                ele.parentNode.className = "mw-group";

                if (object.getColapse()) {
                    ele.parentNode.style.display = 'block';
                } else {
                    ele.parentNode.style.display = 'none';
                }

            }

            // Filhos
            if (child) {
                var filhos = createTree(obj[i].filho);
                div.appendChild(filhos);
            }
        }

        return div;
    };

    /**
     * Função que cria os elementos que tem arvore
     * @return {DON|Element}
     */
    var createArrow = function() {
        var div = object.create('i');
        div.className = (object.getColapse()) ? 'arrowActive' : 'arrowInactive';
        return div;
    };

    /**
     * Função que cria botões do tree
     * @param {Object} obj
     * @return {DON|Element}
     */
    var createButton = function(obj) {
        var div = object.create('div');
        div.className = "mw-button-custom";

        if (!obj.width)
            div.style.width = calculaEspacoButton() + 'px';
        else
            div.style.width = obj.width + 'px';

        var text = object.create('div');
        text.innerHTML = obj.name;
        text.style.backgroundImage = 'url(' + obj.icon + ')';
        text.className = "mw-text-button";
        
        if(!obj.width)
            text.style.width = (calculaEspacoButton() - 20) + "px";
        else
            text.style.width = (obj.width - 20) + "px";

        div.appendChild(text);

        div.onclick = function() {
            object.treeEvents.eventButton(this, obj.eventReturn, obj.callback);
        };

        return div;
    };

    /**
     * Método que calcula o recuo da div topic
     * @param  {integer} posicao
     * @return {integer}         
     */
    var calculoRecuoDiv = function(posicao) {
        var width = object.element.offsetWidth - (((posicao) ? posicao : 0) * 20);
        return width;
    };

    /**
     * Função que calcula o tamanho que o titulo pode ter
     * @param  {DON}        element
     * @return {integer}    
     */
    var calculoRecuoTitle = function(element) {
        var width = parseInt(element.style.width) - (((!object.getCheck()) ? 25 : 40));
        return width;
    };

    /**
     * Função que calcula o tamanho máximo de onde vai ser colocado o conteudo da tree
     * @return {integer}
     */
    var calculoElementos = function() {
        var title = (object.getTitle()) ? 28 : 0;
        var button = (object.getButtons()) ? 35 : 0;
        var content = object.element.offsetHeight - title - button;
        return content;
    };

    /**
     * Calcula tamanho máximo do botão
     * @return {integer}
     */
    var calculaEspacoButton = function() {
        var tamanho = object.element.offsetWidth;
        var content = tamanho / object.getButtons().length;
        var tamanhoMaximo = tamanho * 0.20;

        if (content > tamanhoMaximo)
            content = tamanhoMaximo;

        return content;
    };

    //
    //
    //	Objeto de Retorno
    //
    //
    var retorno = {
        init: init,
        createTree: createTree,
        returnTreeDown: returnTreeDown,
        returnTreeUp: returnTreeUp,
        createButton: createButton,
        calculoElementos: calculoElementos
    };

    return retorno;
};