
window.loadedDependencies = [
  // packages
  'ngAnimate',
  'ngMaterial',
  'ngMessages',
  'ngResource',
  'ngRoute',

];

var app = angular.module('umbracoApp', loadedDependencies);

console.log("jebac");

app.config(function($mdThemingProvider) {
    console.log("konfig");
	var greenCustom = $mdThemingProvider.extendPalette('green', {
    '500': '#BDBDBD',
    'A200': '#FF7575',
  });
	$mdThemingProvider.definePalette('greenCustom', greenCustom);
  $mdThemingProvider
    .theme('default')
    .primaryPalette('greenCustom')
    .accentPalette('greenCustom');
});

app.config(function($httpProvider) {
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.config(function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
    rewriteLinks: 'internal'
  });
});
                