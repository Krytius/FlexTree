var TreeFilter = function() {
    //
    //
    //	Globais
    //
    //

    var object = {};
    var ids = [];

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
     * Executa o procedimento de busca
     * @param {events} e
     * @returns {void}
     */
    var filterObject = function(e) {
        ids = [];
        search(this.value.toLowerCase(), object.getObject(), retornoFiltro);
    };
    
    /**
     * Executa filtro nas palavras que contém no objeto
     * @param {String} val
     * @param {Object} objeto
     * @param {Function} callback
     * @returns {void}
     */
    var search = function(val, objeto, callback) {

        var quant = objeto.length;

        for (var i = 0; i < quant; i++) {
            if (objeto[i].nome.toLowerCase().search(val) !== -1) {
                ids.push(objeto[i].id);
                continue;
            } else if (objeto[i].filho) {
                search(val, objeto[i].filho);
            }
        }
        ;

        if (callback)
            callback(ids);
        return;
    };
    
    /**
     * Retorno do filtro e apresentação do mesmo no layout
     * @param {Array} ids
     * @returns {void}
     */
    var retornoFiltro = function(ids) {
        var objectFiltro = [];
        for (var i = 0; i < ids.length; i++) {
            objectFiltro.push(object.treeCreate.returnTreePositionDown(object.getObject(), ids[i]));
        }
        object.refresh(objectFiltro);
    };

    //
    //
    //  Manipulação de DON
    //
    //

    /**
     * Criação do campo de busca e seus eventos
     * @return {void}
     */
    var createFilter = function() {
        var dimension = (object.getDimension().width * 0.40);

        var div = object.create('div');
        div.className = 'mw-filter';
        div.style.width = dimension + 'px';

        var imgSearch = object.create('div');
        imgSearch.className = 'mw-search';
        imgSearch.style.width = '20px';

        var input = object.create('input');
        input.className = 'mw-search-input';
        input.style.width = (dimension - 25) + 'px';
        input.onkeyup = filterObject;

        div.appendChild(input);
        div.appendChild(imgSearch);

        return div;
    };


    //
    //
    //	Objeto de Retorno
    //
    //
    var retorno = {
        init: init,
        createFilter: createFilter
    };

    return retorno;

};