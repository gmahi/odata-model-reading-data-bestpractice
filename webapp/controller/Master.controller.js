sap.ui.define(["sapui5/demo/odata/readingdata/bestpractice/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter"

], function(BaseController, Filter, FilterOperator, Sorter) {

	"use strict";
	return BaseController.extend("sapui5.demo.odata.readingdata.bestpractice.controller.Master", {

		onInit: function() {
			this._sorter = new Sorter("ProductName", false);
		},
		onFilterProducts: function(oEvent) {
			// build the filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter(
					"ProductName", FilterOperator.Contains, sQuery
				));
			}
			var oList = this.getView().byId("productList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);

		},
		onSortProductName: function() {
			/*this._sorter.bDescending = !this._sorter.bDescending;
			this.getView().byId("productList").getBinding("items")
				.sort(this._sorter);*/

			// re use the current sorter
			var aSorter = [];
			var oListBinding =
				this.getView().byId("productList").getBinding("items");
			var aListSorters = oListBinding.aSorters;
			var oSorter;
			if (aListSorters.length > 0) {
				oSorter = aListSorters[0];
				oSorter.bDescending = !oSorter.bDescending;
				oListBinding.sort(oSorter);

			}
		}

	});

});