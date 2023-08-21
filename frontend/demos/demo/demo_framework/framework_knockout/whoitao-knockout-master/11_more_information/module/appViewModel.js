// Main viewmodel class
define(['knockout', 'customBindings/hasFocus', 'domReady!'], function(ko) {

  return function appViewModel() {
    // 是否可编辑
    this.editingName = ko.observable(true);

    this.firstName = ko.observable('Bert');
    this.firstNameCaps = ko.pureComputed(function() {
      return this.firstName().toUpperCase();
    }, this);
  };
});