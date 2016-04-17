// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require react
//= require react_ujs
//= require react_bootstrap
//= require react-dropzone
//= require npm_packages
//= require modernizr.custom
//= require emotions
//= require components
//= require bootstrap
//= require jquery.Jcrop.min
//= require jquery.form
//= require jquery.query-object
//= require jquery.autocomplete
//= require dropzone
//= require my_scripts
//= require selectize_fixed
//= require select2.min
//= require autoresize.jquery.min
//= require avatar
//= require change_password
//= require notifications
//= require speech
//= require statistics
//= require explore
//= require imagesloaded.pkgd.min
//= require classie


Dropzone.autoDiscover = false;

function truncate(string, length){
  if (string.length < length){
    return string
  } else {
    return string.substr(0, length-3) + "..."
  }
}


var intervalID;
var currentUser;

var c = function(obj){//На время отладки
  console.log(obj);
};

function get_url_description(url, success_function){
  $.ajax({
    url: '/ajax/page_description',
    dataType: 'json',
    data: {url: url},
    cache: false,
    success: success_function,
    error: function(xhr, status, err) {
      console.error("Can't resolve host", status);
    }
  });
};

function getLocation(href) {
    var location = document.createElement("a");
    location.href = href;
    // IE doesn't populate all link properties when setting .href with a relative URL,
    // however .href will return an absolute URL which then can be used on itself
    // to populate these additional fields.
    if (location.host == "") {
      location.href = location.href;
    }
    return location;
};

function trim(str){
  if (str)
    return str.trim();
  return str;
}
