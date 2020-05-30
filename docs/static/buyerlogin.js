$(function() {

function searchMore(data){
  $.ajax({
    url: '/api/ema_search_user_data',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true,
    success: function(msg) {
      var count = msg['count']
      m = msg
      var r = "record"
      $("#singleUserData").html('')
      if(count == 0){
        $("#singleUserData").append('<tr><th>No records found. Please try again</th></tr>');
        return;
      }
      $("#singleUserData").append('<tr><th>Ph Number</th><th>Date Quarantined</th><th>First Name</th><th>Last Name</th><th>DOB</th><th>Currently Under Quarantine</th><th>Email</th><th>Mo Phno</th></tr>');
      for (var i=0;i<count;i++){
        msg = m[r+i]
        $("#singleUserData").append('<tr><td>'+msg['phone_number']+'</td><td>'+msg['date_time_quarantined']+'</td><td>'+msg['first_name']+'</td><td>'+msg['last_name']+'</td><td>'+msg['dob']+'</td><td>'+msg['currently_under_quarantine']+'</td><td>'+msg['email']+"</td><td>"+msg['mo_phone_number']+'</td></tr>');
      }
    }
  });
}

$('#buyer-login-form').submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeFormJSON();
    console.log(data);
});
