'use strict';

var server = require('server');
server.extend(module.superModule);

var productHelper = require('*/cartridge/scripts/helpers/productHelpers');

server.append('Show', function(req, res, next) {
    // Obtenha o ViewData atual
    var viewData = res.getViewData();
    
    // Verifique se o produto está definido e obtenha o ID do produto
    var productId = viewData.product ? viewData.product.id : null;

    if (productId) {
        // Obtenha os produtos sugeridos usando o helper
        var suggestedProducts = productHelper.getSuggestedProducts(productId);

        // Adicione os produtos sugeridos ao ViewData
        res.setViewData({
            suggestedProducts: suggestedProducts
        });
    } else {
        // Se o ID do produto não estiver disponível, defina uma lista vazia de produtos sugeridos
        res.setViewData({
            suggestedProducts: []
        });
    }

    next();
});

module.exports = server.exports();