var TreeCreate = function() {

    //
    //
    //	Globais
    //
    //

    var object = {};
    var tamanhoContent = 0;

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

    var getTamanhoContent = function() {
        return tamanhoContent;
    };


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
     * Função que Retorna Arvores posterior ao id informado
     * @param {Object} obj
     * @param {integer} id
     * @return {Object}
     */
    var returnTreePosition = function(obj, id) {
        var quant = obj.length;

        for (var i = 0; i < quant; i++) {
            if (obj[i].id === id) {
                return obj[i];
            }
        }

        var resp;
        for (var i = 0; i < quant; i++) {
            var child = (obj[i].filho) ? 1 : 0;
            if (child) {
                resp = returnTreePosition(obj[i].filho, id);
            }

            if (resp)
                return resp;
        }

    };

    var returnTreePositionDown = function(obj, id) {
        var quant = obj.length;

        for (var i = 0; i < quant; i++) {
            if (obj[i].id === id) {
                return obj[i];
            }
        }

        var resp;
        for (var i = 0; i < quant; i++) {
            var child = (obj[i].filho) ? 1 : 0;
            if (child) {
                resp = returnTreePositionDown(obj[i].filho, id);
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
            var child;
            if (obj[i].filho) {
                child = (obj[i].filho.length > 0) ? 1 : 0;
            } else {
                child = 0;
            }

            var ele = object.create('div');
            ele.className = 'mw-topic';
            ele.setAttribute('data-id', obj[i].id);
            ele.setAttribute('group-id', obj[i].idGroup);

            // Recuo
            var recuo = object.create('div');
            recuo.className = 'mw-topic-recuo';
            recuo.style.width = calculoRecuoDiv(posicao) + 'px';
            ele.appendChild(recuo);

            var clear = object.create('div');
            clear.style.clear = 'both';
            var clear2 = object.create('div');
            clear2.style.clear = 'both';

            if (!object.getCheck()) {
                ele.onclick = object.treeEvents.openCloseGroup;
            }

            // Seta
            if (child) {
                var icon = createArrow();

                if (object.getCheck()) {
                    icon.onclick = object.treeEvents.openCloseGroup;
                }

                ele.appendChild(icon);
            } else {
                var recuoSeta = object.create('i');
                recuoSeta.className = 'recuoSeta';
                ele.appendChild(recuoSeta);
            }

            // CheckBox
            if (object.getCheck()) {
                var check = object.create('div');
                check.className = (obj[i].check) ? "checkActive" : "checkInative";
                check.setAttribute('id', 'mw-check');

                check.onclick = object.treeEvents.markDesmarkCheck;

                ele.appendChild(check);
            }

            // Titulo
            var text = object.create('div');
            text.className = 'mw-title-tree';
            text.innerHTML = obj[i].nome;
            text.onclick = object.treeEvents.eventsTitle;

            ele.appendChild(text);

            // Titulo Colocado
            div.appendChild(ele);
            div.appendChild(clear);

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

            div.appendChild(clear2);

            var tamanhoCont = calculoRecuoDiv(posicao) + ((child) ? 20 : 0) + ((object.getCheck()) ? 20 : 0) + (obj[i].nome.length * 9);
            if (tamanhoContent < tamanhoCont) {
                tamanhoContent = tamanhoCont;
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

        if (!obj.width)
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
        //var width = object.element.offsetWidth - (((posicao) ? posicao : 0) * 20);
        var width = (((posicao) ? posicao : 0) * 20);
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
    
    /**
     * Função que plota na tela um carregando
     * @param {DOn} element
     * @return {void}
     */
    var load = function(element) {

        var div = object.create('div');
        div.style.width = object.getDimension().width + 'px';
        div.style.height = object.getDimension().height + 'px';
        object.addClass('mw-carregando', div);

        var div2 = object.create('div');
        div2.style.top = (object.getDimension().height / 2 - (128 / 2)) + 'px';
        div2.style.left = (object.getDimension().width / 2 - (128 / 2)) + 'px';
        object.addClass('mw-centralizado', div2);

        for (var i = 0; i < 8; i++) {
            var circulo = object.create('div');
            circulo.setAttribute('id', 'circ' + i);
            object.addClass('circulo', circulo);

            div2.appendChild(circulo);
        }

        div.appendChild(div2);
        element.appendChild(div);
    };

    var remove = function(element) {
        var ele = object.selector('#' + element.id + ' .mw-carregando');
        element.removeChild(ele);
    };

    /**
     * Reinicia o grid apartir de um novo objeto
     * @param {Object} obj
     * @return {void}
     */
    var refreshTree = function(obj) {
        var elemento = object.getElement();
        elemento.childNodes[1].innerHTML = "";
        elemento.childNodes[1].appendChild(createTree2(obj, object.treeEvents.getSelected()));

        var quant = object.selector('#mw-content-tree').length;
        for (var i = 0; i < quant; i++) {
            object.selector('#mw-content-tree')[i].style.width = getTamanhoContent() + 'px';
        }
    };

    /**
     * Função que cria toda estrutura de procedimento da tree view
     * @param {Obejct} obj
     * @param {Array} selecteds
     * @return {void}
     */
    var createTree2 = function(obj, selecteds) {
        var quant = obj.length;

        var div = object.create('div');
        div.setAttribute('id', 'mw-content-tree');

        for (var i = 0; i < quant; i++) {
            obj[i] = checksSelecteds(selecteds, obj[i]);

            var posicao = returnPosition(object.getObject(), obj[i].id);
            var child;
            if (obj[i].filho) {
                child = (obj[i].filho.length > 0) ? 1 : 0;
            } else {
                child = 0;
            }

            var ele = object.create('div');
            ele.className = 'mw-topic';
            ele.setAttribute('data-id', obj[i].id);
            ele.setAttribute('group-id', obj[i].idGroup);

            // Recuo
            var recuo = object.create('div');
            recuo.className = 'mw-topic-recuo';
            recuo.style.width = calculoRecuoDiv(posicao) + 'px';
            ele.appendChild(recuo);

            var clear = object.create('div');
            clear.style.clear = 'both';
            var clear2 = object.create('div');
            clear2.style.clear = 'both';

            if (!object.getCheck()) {
                ele.onclick = object.treeEvents.openCloseGroup;
            }

            // Seta
            if (child) {
                var icon = createArrow();

                if (object.getCheck()) {
                    icon.onclick = object.treeEvents.openCloseGroup;
                }

                ele.appendChild(icon);
            } else {
                var recuoSeta = object.create('i');
                recuoSeta.className = 'recuoSeta';
                ele.appendChild(recuoSeta);
            }

            // CheckBox
            if (object.getCheck()) {
                var check = object.create('div');
                check.className = (obj[i].check) ? "checkActive" : "checkInative";
                check.setAttribute('id', 'mw-check');

                check.onclick = object.treeEvents.markDesmarkCheck;

                ele.appendChild(check);
            }

            // Titulo
            var text = object.create('div');
            text.className = 'mw-title-tree';
            text.innerHTML = obj[i].nome;
            text.onclick = object.treeEvents.eventsTitle;

            ele.appendChild(text);

            // Titulo Colocado
            div.appendChild(ele);
            div.appendChild(clear);

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
                var filhos = createTree2(obj[i].filho, selecteds);
                div.appendChild(filhos);
            }

            div.appendChild(clear2);

            var tamanhoCont = calculoRecuoDiv(posicao) + ((child) ? 20 : 0) + ((object.getCheck()) ? 20 : 0) + (obj[i].nome.length * 9);
            if (tamanhoContent < tamanhoCont) {
                tamanhoContent = tamanhoCont;
            }
        }
        return div;
    };
    
    /**
     * Função que verifica os itens checados
     * @param {Array} selecteds
     * @param {Object} obj
     * @return {Object}
     */
    var checksSelecteds = function(selecteds, obj) {
        obj.check = false;

        if (selecteds) {
            for (var k = 0; k < selecteds.length; k++) {
                if (obj.id === selecteds[k]) {
                    obj.check = true;
                    break;
                }
            }
            
            if (obj.filho) {
                for (var i =0; i< obj.filho.length; i++) {
                    obj.filho[i] = checksSelecteds(selecteds, obj.filho[i]);
                }
            }
        }
        return obj;
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
        returnTreePosition: returnTreePosition,
        returnTreePositionDown: returnTreePositionDown,
        createButton: createButton,
        calculoElementos: calculoElementos,
        tamanhoContent: getTamanhoContent,
        load: load,
        remove: remove,
        refreshTree: refreshTree
    };

    return retorno;
};