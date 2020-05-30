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

function create_new(data){
  $.ajax({
    url: '/api/new_buyer',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true,
    statusCode: {
      200: function() {
        console.log("Success");
        document.location.href = '/buyer_login'
      },
      401: function() {
        console.log("Duplicate");
        alert("You already have an account. Please try logging in instead.");
      },
      500: function() {
        console.log("Internal Server Error");
        alert("Server Error. Please try again later.");
      }
    }
  });
}

$('#buyer-new-form').submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeFormJSON();
    create_new(data);
});

});
