$(
    function()
    {
        $("#send").click
        (
            function ()
            {
                var user =
                {
                    name:       $("#names").val(),
                    lastName:   $("#lastName").val(),
                    sex:        0,
                    username:   $("#userid").val(),
                    password:   $("#password").val(),
                    phone:      $("#phone").val(),
                    email:      $("#email").val()
                };

                $.ajax
                (
                    {
                        url: '../api/user',
                        type: 'POST',
                        data: JSON.stringify(user),
                        contentType: "application/json;charset=utf-8",

                        success:
                        function (data)
                        {
                            if (data.Status)
                            {
                                $("#state").text("El usuario ha sido registrado con éxito. ");
                            }

                            else
                            {
                                $("#state").text("Hubo un problema al registrarse, su username podría estar repetido. ");
                            }
                        },

                        error:
                        function ()
                        {

                        }
                    }
                );
            }
        );


        $("#login").click
        (
            function ()
            {
                var username = $("#useridLogin").val();
                var password = $("#passwordLogin").val();

                $.ajax
                (
                    {
                        url: '../api/user?username=' + username + '&password=' + password,
                        type: 'GET',
                        contentType: "application/json;charset=utf-8",

                        success:
                        function (data)
                        {
                            $("#resultName").text(data.Name + " " + data.LastName);
                            $("#resultUsername").text(data.Username);
                            $("#resultId").text(data.Id);
                        },

                        error:
                        function ()
                        {

                        }
                    }
                );
            }
        );


        $("#sendEvent").click
        (
            function ()
            {
                var idUserString = $("#resultId").text();
                var idUser = parseInt(idUserString);

                alert(idUser);
               
                var meeting =
                {
                    name: $("#title").val(),
                    description: $("#description").val(),
                    idUser: idUser,
                    isPublic: 0
                };

                $.ajax
                (
                    {
                        url: '../api/event',
                        type: 'POST',
                        data: JSON.stringify(meeting),
                        contentType: "application/json;charset=utf-8",

                        success:
                        function (data)
                        {
                            if (data.Status)
                            {
                                $("#stateCreation").text("Se ha creado un evento con éxito. ");
                            }
                        },

                        error:
                        function ()
                        {

                        }
                    }
                );
            }
        );
    }
);