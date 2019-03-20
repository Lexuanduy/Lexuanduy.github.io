$(document).ready(function () {
    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_FacultiesIndex,
        headers: {
            "Authorization": Cookies.get("token"),
        },
        success: function (result) {
            var content = "<option value=\"\" disabled selected>Select Faculty</option>\n";
            for (var i in result){
                content += "<option value='" + result[i].name + "'>" + result[i].name + "</option>"
            }
            $("#facultyList").html(content);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });

    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_DepartmentsIndex,
        headers: {
            "Authorization": Cookies.get("token"),
        },
        success: function (result) {
            var content = "<option value=\"\" disabled selected>Select Department</option>\n";
            for (var i in result){
                content += "<option value='" + result[i].name + "'>" + result[i].name + "</option>"
            }
            $("#departmentList").html(content);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });

    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_CreateAccount,
        headers: {
            "Authorization": Cookies.get("token"),
            "Role": Cookies.get("loggedUserRole")
        },
        success: function (result) {
            var content = "";
            for(var i in result){
                content += "<div class='checkbox'>";
                content += "<label>";
                content += "<input type='checkbox' name='roleIds[]' value='" + result[i].roleId + "'>";
                content += "<span class='label-text'>" + result[i].name + "</span>";
                content += "<label>";
                content += "</div>";
            }
            $("#roleCheckboxes").html(content);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });
});

$(".btn-submit").click(function (){
    if($("#accountCreateForm")[0].checkValidity()) {
        var roleIds = [];
        roleIds.push(1);
        var formData = {
            "Name" : $("#accountCreateForm").find('input[name="Name"]').val(),
            "Gender" : $("#accountCreateForm").find('input[name="Gender"]').val(),
            "Dob" : $("#accountCreateForm").find('input[name="Dob"]').val(),
            "Phone" : $("#accountCreateForm").find('input[name="Phone"]').val(),
            "Email" : $("#accountCreateForm").find('input[name="Email"]').val(),
            "FatherName" : $("#accountCreateForm").find('input[name="FatherName"]').val(),
            "MotherName" : $("#accountCreateForm").find('input[name="MotherName"]').val(),
            "ResidentialAddress" : $("#accountCreateForm").find('input[name="ResidentialAddress"]').val(),
            "PermanentAddress" : $("#accountCreateForm").find('input[name="PermanentAddress"]').val(),
            "Stream" : $("#accountCreateForm").find('select[name="Stream"]').val(),
            "Field" : $("#accountCreateForm").find('select[name="Field"]').val(),
            "PreviousUniversity" : $("#accountCreateForm").find('input[name="PreviousUniversity"]').val(),
            "EnrollmentNumber" : $("#accountCreateForm").find('input[name="EnrollmentNumber"]').val(),
            "PreviousStream" : $("#accountCreateForm").find('input[name="PreviousStream"]').val(),
            "PreviousField" : $("#accountCreateForm").find('input[name="PreviousField"]').val(),
            "Mark" : $("#accountCreateForm").find('input[name="Mark"]').val(),
            "ClazzObtained" : $("#accountCreateForm").find('input[name="ClazzObtained"]').val(),
            "OutOf" : $("#accountCreateForm").find('input[name="OutOf"]').val(),
            "SportDetails" : $("#accountCreateForm").find('textarea[name="SportDetails"]').val(),
        };
        $.ajax({
            type: 'POST',
            accepts: 'application/json',
            contentType: 'application/json',
            url: API_CreateAccount,
            traditional: true,
            headers: {
                "Authorization": Cookies.get("token"),
                "Role": Cookies.get("loggedUserRole"),
            },
            data: JSON.stringify({
                generalInformation: formData,
                roleIds : roleIds
            }),
            success: function (result) {
                swal("Create New Account Successful");
                console.log(result);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("error");
            }
        });
    }
    else {
        $("#accountCreateForm")[0].reportValidity();
    }
});