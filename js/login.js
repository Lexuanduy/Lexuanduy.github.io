$(".btn-submit").click(function (){
  var formData = {
      "RollNumber" : $("#loginForm").find('input[name="RollNumber"]').val(),
      "Password" : $("#loginForm").find('input[name="Password"]').val(),
  };
  $.ajax({
      type: 'POST',
      accepts: 'application/json',
      contentType: 'application/json',
      url: API_LOGIN,
      data: JSON.stringify(formData),
      success: function (result, textStatus, jqXHR) {

          if(jqXHR.status == 204){
              swal("Account not exist");
          }
          else {
              Cookies.set("token" , result.credential.accessToken);
              Cookies.set("loggedUserName" , result.name);
              Cookies.set("loggedUserId" , result.id);
              history.back();
          }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          if(jqXHR.status == 401){
              swal("Wrong Password");
          }
      }
  });
});