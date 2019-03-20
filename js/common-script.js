$(document).ready(function () {
    var token = Cookies.get("token");
    if(token != null){
        $("#login-btn").text("Welcome " + Cookies.get("loggedUserName"));
        $(".login-dropdown").hide();
        $(".logout-dropdown").removeClass("hidden");
    }

    $(".logout-btn").click(function () {
        Cookies.remove('token');
        Cookies.remove("loggedUserName");
        window.location.href = "index.html";
    });
});