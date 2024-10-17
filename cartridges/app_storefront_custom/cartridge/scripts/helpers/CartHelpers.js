'use strict';

var BasketMgr = require('dw/order/BasketMgr');
var Site = require('dw/system/Site');
var ContentMgr = require('dw/content/ContentMgr');

/**
 * Checks if the cart total exceeds the configurable threshold and returns a custom message.
 * @returns {Object} An object containing the message state and the custom message, if available.
 */
function getCartExceedMessage() {
    var currentBasket = BasketMgr.getCurrentBasket();

    if (!currentBasket || !currentBasket.totalGrossPrice) {
        return {
            showCartMessage: false,
            cartMessage: null
        };
    }

    var cartTotal = currentBasket.totalGrossPrice.value;
    var cartTotalThreshold = Site.getCurrent().getCustomPreferenceValue('cartTotalThreshold');

    if (cartTotal < cartTotalThreshold) {
        return {
            showCartMessage: false,
            cartMessage: null
        };
    }

    var contentAsset = ContentMgr.getContent('cartTotalExceedMessage');

    return {
        showCartMessage: !!contentAsset,
        cartMessage: contentAsset ? contentAsset.custom.body : null
    };
}

module.exports = {
    getCartExceedMessage: getCartExceedMessage
};