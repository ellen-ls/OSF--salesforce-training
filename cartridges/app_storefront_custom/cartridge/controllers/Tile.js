'use strict';

var server = require('server');
// var controller = require('app_storefront_base/cartridge/controllers/Tile');
server.extend(module.superModule);


server.append('Show', function(req, res, next) {
    var productHelpers = require('*/cartridge/scripts/helpers/productHelpers');
    
    var viewData = res.getViewData();
    
    // Log viewData to inspect the structure
    var Logger = require('dw/system/Logger');
    Logger.debug('View Data: {0}', JSON.stringify(viewData));

    var discountPercentage = null;

    if (viewData && viewData.product && viewData.product.price && viewData.product.price.sales) {
        var standardPrice = viewData.product.price.standard.value;
        var salePrice = viewData.product.price.sales.value;

        // Log prices to inspect values
        Logger.debug('Standard Price: {0}, Sale Price: {1}', standardPrice, salePrice);

        if (salePrice < standardPrice) {
            discountPercentage = productHelpers.calculatePercentageOff(standardPrice, salePrice);
        }
    }

    res.setViewData({ discountPercentage: discountPercentage });

    next();
});



module.exports = server.exports();