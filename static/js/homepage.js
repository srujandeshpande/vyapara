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

$.ajax({
  url: '/api/get_products',
  type: 'GET',
  async: true,
  statusCode: {
    200: function() {
      console.log("Success");

    }
    500: function() {
      console.log("Internal Server Error");
      alert("Server Error. Please try again later.");
    }
  }
});

});
