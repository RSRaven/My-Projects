var productMgr = require('dw/catalog/ProductMgr');

module.exports = {
	getProductsArray: function(pidsString) {
		var productIDsArray;
		
		if (!pidsString) {
			return false;
		} else {
			productIDsArray = pidsString.split(',');		
			var productsArray = productIDsArray.map(function(productID) {
				return productMgr.getProduct(productID);
			});
		}
		
		return productsArray;
	}	
};