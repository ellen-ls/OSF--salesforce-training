'use strict';

var server = require('server');
var controller = require('app_storefront_base/cartridge/controllers/Tile');
server.extend(controller);

server.append('Show', function(req, res, next) {
    var productHelpers = require('*/cartridge/scripts/helpers/productHelpers');
    var Logger = require('dw/system/Logger');

    var viewData = res.getViewData();

    // Log viewData to inspect the structure
    Logger.debug('View Data: {0}', JSON.stringify(viewData));

    var discountPercentage = null;

    // Check if viewData and necessary properties are defined
    if (viewData && viewData.product && viewData.product.price && viewData.product.price.sales) {
        var standardPrice = viewData.product.price.standard.value;
        var salePrice = viewData.product.price.sales.value;
    
        Logger.debug('Standard Price: {0}, Sale Price: {1}', standardPrice, salePrice);
    
        if (salePrice < standardPrice) {
            discountPercentage = productHelpers.calculatePercentageOff(standardPrice, salePrice);
            Logger.debug('Discount Percentage Calculated: {0}', discountPercentage);
        }
    }
    
    res.setViewData({ discountPercentage: discountPercentage });
    next();
});

module.exports = server.exports();