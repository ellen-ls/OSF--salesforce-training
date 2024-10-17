'use strict';

var server = require('server');
var BasketMgr = require('dw/order/BasketMgr');
var Site = require('dw/system/Site');
var CartHelper = require('*/cartridge/scripts/helpers/CartHelpers');
var ContentMgr = require('dw/content/ContentMgr');

// Extend the existing controller
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    // Retrieve the custom site preference for the cart total threshold
    var cartTotalThreshold = Site.getCurrent().getCustomPreferenceValue('cartTotalThreshold') || 200;

    // Get the current basket and calculate the total
    var currentBasket = BasketMgr.getCurrentBasket();
    var cartTotal = currentBasket.totalGrossPrice.value;

    // Check if the cart total exceeds the threshold
    if (cartTotal >= cartTotalThreshold) {
        // Retrieve the content asset for the cart message
        var contentAsset = ContentMgr.getContent('cartTotalMessage');
        var cartMessage = contentAsset ? contentAsset.custom.body : 'Your cart total exceeds $' + cartTotalThreshold + '!';

        // Set the view data to display the message
        res.setViewData({
            showCartMessage: true,
            cartMessage: cartMessage
        });
    }

    next();
});

module.exports = server.exports();

