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
                var credential =
                {
                    username: $("#useridLogin").val(),
                    password: $("#passwordLogin").val()
                };

                $.ajax
                (
                    {
                        url: '../api/user',
                        type: 'GET',
                        data: JSON.stringify(credential),
                        contentType: "application/json;charset=utf-8",

                        success:
                        function (data)
                        {
                            $("#useridLabel").text(data.Name + " " + data.LastName);
                            $("#nameLabel").text(data.Username); 
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