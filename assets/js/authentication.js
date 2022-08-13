$(document).ready(function () {
    var users = sessionStorage.getItem("users");
    $("#account_creation_link").click(function (e) {
        e.preventDefault();
        $("#login_container").hide();
        $("#registration_form_container").show();
    });
    $("#registration_form").submit(function(e){
        e.preventDefault();
    }).validate({
        submitHandler: function (form) {
            var pwd1 = $("#reg_form_pwd1").val();
            var pwd2 = $("#reg_form_pwd2").val();
            var firstname = $("#reg_form_fname").val();
            var lastname = $("#reg_form_lname").val();
            var username = $("#reg_form_uname").val();
            var password = $("#reg_form_pwd1").val();
            var message = "";
            $("#registration_feedback").hide();

            if (pwd1 != pwd2) {
                message = " The confirmation password is not correct.";
                $("#registration_feedback").html(message);
                $("#registration_feedback").show();
            } else{
                users = JSON.parse(sessionStorage.getItem("users"));
                if(!users){
                    users = [
                        {
                            firstname: firstname,
                            lastname: lastname,
                            username: username,
                            password: password
                        }
                    ];
                    sessionStorage.setItem("users", JSON.stringify(users));
                    $("#login_container").show();
                    $("#registration_form_container").hide();
                } else{
                    var existingUser = users.find(u => u.username == username);
                    if(existingUser){
                        message = "There is already a user with the same username.";
                        $("#registration_feedback").html(message);
                        $("#registration_feedback").show();
                    } else{
                        users[users.length] = {
                            firstname: firstname,
                            lastname: lastname,
                            username: username,
                            password: password
                        };
                    
                        sessionStorage.setItem("users", JSON.stringify(users));
                        $("#login_container").show();
                        $("#login_feedback").html("");
                        $("#registration_form_container").hide();
                    }
                }
            }
        },
        invalidHandler: function(event, validator) {
            $("#registration_feedback").hide();
            var errors = validator.numberOfInvalids(); 
            if (errors) {
              var message = errors == 1 ? 'You missed 1 field. It has been highlighted' : 'You missed ' + errors + ' fields. They have been highlighted';
              $("#registration_feedback").html(message);
              $("#registration_feedback").show();
            } else {
              $("#registration_feedback").hide();
            }
          }
    });

    $("#login_form").submit(function(e){
        e.preventDefault();
    }).validate({
        submitHandler: function (form) {
            users = JSON.parse(sessionStorage.getItem("users"));
            if(users != null && users != undefined){
                var pwd = $("#login_password").val();
                var username = $("#login_username").val();
                var existingUser = users.find(u => u.username == username && u.password == pwd);
                if(existingUser){
                    sessionStorage.setItem("currentUser", JSON.stringify(existingUser));
                    $("#login_feedback").hide();
                    window.location.href = "quiz.html";
                } else{
                    var message = "Username or password incorrect";
                    $("#login_feedback").html(message);
                    $("#login_feedback").show();
                }
            } else{
                var message = "This user account does not exist. Please register first.";
                $("#login_feedback").html(message);
                $("#login_feedback").show();
            }
        },
        invalidHandler: function(event, validator) {
            $("#login_feedback").hide();
            var errors = validator.numberOfInvalids();
            if (errors) {
                var message = errors == 1 ? 'You missed 1 field. It has been highlighted' : 'You missed ' + errors + ' fields. They have been highlighted';
                $("#login_feedback").html(message);
                $("#login_feedback").show();
              } else {
                $("#login_feedback").hide();
              }
        }

    });
});