'use strict';

/* Script Modules */
var app = require('sitegenesis_storefront_controllers/cartridge/scripts/app');
var guard = require('sitegenesis_storefront_controllers/cartridge/scripts/guard');
var productMgr = require('dw/catalog/ProductMgr');

function showArrayOfProducts() {
	var productIDs = request.httpParameterMap.pids.stringValue;
		
	if (!productIDs) {
		app.getView().render('common/demo01error');
		return;
	} else {
		var productUtils = require('~/cartridge/scripts/productUtils');
		var productsArray = productUtils.getProductsArray(productIDs);
	}
	
	session.custom.productsArray = productsArray;
	
	app.getView().render('common/demo01');
}

//exports.Start = app.getController('Home').Show;

exports.Start = guard.ensure(['get'], showArrayOfProducts);
