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
  url: '/api/get_seller_products',
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
        var i = clone.querySelectorAll("i");
        i[0].textContent = item.price;
        var p = clone.querySelectorAll("p");
        p[0].textContent = item.description;
        var button = clone.querySelectorAll("button");
        button[0].setAttribute('id', item._id.$oid);
        tbody.appendChild(clone);
      });
      $('.pdel').click(function (e) {
          e.preventDefault();
          var id = this.id;
          console.log(id);
          del_prod(id);
      });
    },
    500: function(msq) {
      console.log("Internal Server Error");
      alert("Server Error. Please try again later.");
    }
  }
});

$.ajax({
  url: '/api/get_seller_orders',
  type: 'GET',
  async: true,
  statusCode: {
    200: function(msg) {
      console.log("Success");
      console.log(msg);
      var data = msg.data;
      console.log(data);
      var tbody = document.querySelector("#orderrow");
      var template = document.querySelector('#otemplate');
      data.forEach((item, i) => {
        var clone = template.content.cloneNode(true);
        var strong = clone.querySelectorAll("strong");
        strong[0].textContent = item.name;
        var i = clone.querySelectorAll("i");
        i[0].textContent = item.price;
        var h6 = clone.querySelectorAll("h6");
        h6[0].textContent = item.buyer;
        h6[1].textContent = item.date;
        tbody.appendChild(clone);
      });
    },
    500: function(msq) {
      console.log("Internal Server Error");
      alert("Server Error. Please try again later.");
    }
  }
});

function create_new(data){
  $.ajax({
    url: '/api/add_new_product',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true,
    statusCode: {
      200: function() {
        console.log("Success");
        alert("Successfully Added!");
        location.reload();
      },
      500: function() {
        console.log("Internal Server Error");
        alert("Server Error. Please try again later.");
      }
    }
  });
}

$('#seller-add-new-product').submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeFormJSON();
    create_new(data);
});

function del_prod(data){
  $.ajax({
    url: '/api/delete_product',
    type: 'POST',
    data: JSON.stringify({'product_id':data}),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true,
    statusCode: {
      200: function() {
        console.log("Success");
        alert("Product Successfully Deleted");
        location.reload()
      },
      500: function() {
        console.log("Internal Server Error");
        alert("Server Error. Please try again later.");
      }
    }
  });
}

});
