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

    //
    //
    //  Manipulação de DON
    //
    //

    var createTree = function(obj) {
        var quant = obj.length;

        var div = object.create('div');

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

            // Seta
            if (child) {
                var icon = createArrow();

                if (object.getCheck()) {
                    icon.onclick = object.treeEvents.openCloseGroup;
                }

                ele.appendChild(icon);
            }

            // CheckBox
            if (object.getCheck()) {
                var check = object.create('div');
                check.className = (obj[i].check) ? "checkActive" : "checkInative";

                check.onclick = object.treeEvents.markDesmarkCheck;

                ele.appendChild(check);
            }

            // Titulo
            var text = object.create('div');
            text.className = 'mw-title-tree';
            text.innerHTML = obj[i].nome;
            text.style.width = calculoRecuoTitle(ele) + 'px';
            text.onclick = object.treeEvents.eventsTitle;

            ele.appendChild(text);

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

    var createArrow = function() {
        var div = object.create('i');
        div.className = 'arrowInactive';

        return div;
    };

    var calculoRecuoDiv = function(posicao) {
        var width = object.element.offsetWidth - (((posicao) ? posicao : 0) * 20);
        return width;
    };

    var calculoRecuoTitle = function(element) {
        var width = parseInt(element.style.width) - (((!object.getCheck()) ? 25 : 40));
        return width;
    };

    //
    //
    //	Objeto de Retorno
    //
    //
    var retorno = {
        init: init,
        createTree: createTree
    };

    return retorno;
};