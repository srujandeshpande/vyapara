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
  url: '/api/get_all_products',
  type: 'GET',
  async: true,
  statusCode: {
    200: function(msg) {
      console.log("Success");
      console.log(msg);
      var data = msg.data;
      console.log(data);
      var tbody = document.querySelector("#prodrow");
      var template = document.querySelector('#ptemplate');
      data.forEach((item, i) => {
        var clone = template.content.cloneNode(true);
        var strong = clone.querySelectorAll("strong");
        strong[0].textContent = item.name;
        var h6 = clone.querySelectorAll("h6");
        h6[0].textContent = item.seller;
        var i = clone.querySelectorAll("i");
        i[0].textContent = item.price;
        var p = clone.querySelectorAll("p");
        p[0].textContent = item.description;
        tbody.appendChild(clone);
      });
    },
    500: function(msq) {
      console.log("Internal Server Error");
      alert("Server Error. Please try again later.");
    }
  }
});

});
