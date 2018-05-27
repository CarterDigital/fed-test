
var $ = require('jquery')

// TODO: add year filter
// TODO: use aria controls

$(function () {
  var jsonData = 'http://prototype.carter-dev.net/fed-test/items.json'
  $.getJSON(jsonData, function (data) {
    // Renders the template - key grabs appropriate template named after json key
    var html = MyApp.templates['items'](data)
    $('#card-items-js').html(html)
  }) // getJSON data
}) // Self Invoked function
