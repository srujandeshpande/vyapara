(function ($) {
    $.fn.serializeFormJSON = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (this.value) {
              o[this.name] = this.value
            }
        });
        return o;
    };
})(jQuery);

$(function() {

function login(data){
  $.ajax({
    url: '/api/login_buyer',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true,
    success: function(msg) {
      console.log("worked");
      console.log(msg.Response);
    },
    error: function(msg) {
      console.log("lel nope");
      console.log(msg.Response);
    }
  });
}

$('#buyer-login-form').submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeFormJSON();
    console.log(data);
    login(data);
});

});
