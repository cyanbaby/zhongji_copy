require.config({
  // baseUrl: "",
  paths: {
    domReady: '../../assets/domReady',
    knockout: '../../assets/knockout-3.5.1',
    jquery: '../../assets/jquery-1.7.2/jquery.min'
  }
});

// require(['domReady!'], function (doc){
//   // called once the DOM is ready
// });

require(['knockout', 'appViewModel'], function(ko, appViewModel) {
  ko.applyBindings(new appViewModel());
});
