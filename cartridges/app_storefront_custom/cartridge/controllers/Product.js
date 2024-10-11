'use strict';

var server = require('server');
server.extend(module.superModule);

var ProductMgr = require('dw/catalog/ProductMgr');
var CatalogMgr = require('dw/catalog/CatalogMgr');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var ProductSearch = require('*/cartridge/models/search/productSearch');

server.append('Show', function(req, res, next) {
    // Obtém o ID do produto a partir dos dados de visualização
    var productId = res.getViewData().product.id;
    var product = ProductMgr.getProduct(productId);
    var suggestedProducts = [];

    // Verifica se o produto é válido e categorizado
    if (product && product.isCategorized()) {
        // Cria uma nova instância do modelo de busca de produtos
        var apiProductSearch = new ProductSearchModel();
        apiProductSearch.setCategoryID(product.getPrimaryCategory().ID);
        apiProductSearch.search();

        // Cria uma instância do modelo de busca customizado
        var productSearch = new ProductSearch(
            apiProductSearch,
            req.querystring,
            req.querystring.srule,
            CatalogMgr.getSortingOptions(),
            CatalogMgr.getSiteCatalog().getRoot()
        );

        // Limita a busca a 4 produtos sugeridos
        var productIds = productSearch.productIds;
        for (var index = 0; index < Math.min(4, productIds.length); index++) {
            var suggestedProductId = productIds[index].productID;
            var suggestedProduct = ProductMgr.getProduct(suggestedProductId);
            if (suggestedProduct) {
                suggestedProducts.push(suggestedProduct);
            }
        }
    }

    // Define os produtos sugeridos nos dados de visualização
    res.setViewData({
        suggestedProducts: suggestedProducts
    });

    next();
});

module.exports = server.exports();