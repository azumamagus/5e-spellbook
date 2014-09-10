/* global Controllers */
"use strict";

var spelllistApp = angular.module("spelllist", ["ui.router"]);

spelllistApp.config(function ($stateProvider, $urlRouterProvider) {
	// Default
	$urlRouterProvider.otherwise("/list");

	// Main spell list
	$stateProvider.state("list", {
		url: "/list",
		templateUrl: "pages/list.html",
		controller: Controllers.list,
	});
	$stateProvider.state("list.class", {
		url: "/:className",
		templateUrl: "pages/list.html",
		controller: Controllers.list,
	});
	$stateProvider.state("list.class.subclass", {
		url: "/:subclassName",
		templateUrl: "pages/list.html",
		controller: Controllers.list,
	});
});

spelllistApp.filter("normalizedClass", function () {
	return function (input) {
		return input.replace(/(\w+):(.+)/, "$1 ($2)");
	};
});

spelllistApp.filter("spellsFilter", function () {
	return function (input, spellFilters) {
		var out = [],
			className,
			subclassName,
			i;

		if ( spellFilters.selectedClass ) {
			className = spellFilters.selectedClass.name;

			if ( spellFilters.subclass ) {
				subclassName = className + ":" + spellFilters.subclass.name;
			}
		}

		for ( i = 0; i < input.length; i++ ) {
			if (
				!className ||
				(input[i].classes.indexOf(className) !== -1) ||
				(subclassName && input[i].classes.indexOf(subclassName) !== -1)
			) {
				out.push(input[i]);
			}
		}

		return out.sort(function (a, b) {
			if ( a.level !== b.level ) {
				return a.level > b.level;
			} else {
				return a.name > b.name;
			}
		});
	};
});