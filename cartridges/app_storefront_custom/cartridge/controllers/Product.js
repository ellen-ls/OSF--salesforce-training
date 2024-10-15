'use strict';

var server = require('server');
server.extend(module.superModule);

var productHelper = require('*/cartridge/scripts/helpers/productHelpers');

server.append('Show', function(req, res, next) {
    var productId = res.getViewData().product.id;
    var suggestedProducts = productHelper.getSuggestedProducts(productId);

    res.setViewData({
        suggestedProducts: suggestedProducts
    });

    next();
});

module.exports = server.exports();