$(
    function()
    {
        $("#send").click
        (
            function ()
            {
                $("#state").text("Registrando usuario... Espere un momento. ");

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
                $("#loginStatus").text("Validando...");

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
                            $("#loginStatus").text("Validación correcta. Revisar en el panel superior. ");
                            $("#titleUser").text("Información de usuario ");
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
                $("#stateCreation").text("Creando evento... ");

                var idUserString = $("#resultId").text();
                var idUser = parseInt(idUserString);

                var meeting =
                {
                    name: $("#title").val(),
                    description: $("#description").val(),
                    idUser: idUser,
                    isPublic: 0,
                    date: $("#date").val(),
                    place: $("#place").val(),
                    dateCreation: null
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


        $("#show").click
        (
            function ()
            {
                var idUserString = $("#resultId").text();
                var idUser = parseInt(idUserString);

                $.ajax
                (
                    {
                        url: '../api/event?id=' + idUser,
                        type: 'GET',
                        contentType: "application/json;charset=utf-8",

                        success:
                        function (data)
                        {
                            var i = 0;
                            while (i < data.NumberEvents)
                            {
                                $("#listEvents").append('<div class="card text-center"> <div class="card-header">' + data.Events[i].Place + ' ' + data.Events[i].Date + '</div> <div class="card-body"> <h5 class="card-title">' + data.Events[i].Name + '</h5> <p class="card-text">' + data.Events[i].Description + '</p> <input class="form-control" placeholder="Especificar el username"> <br /> <button type = "submit" id=' + (i) + 'class="btn btn-outline-info my-2 my-sm-0">Invitar usuario.</button> </div> <div class="card-footer text-muted">' + data.Events[i].DateCreation + '</div> <div class="card-footer text-muted">' + data.Events[i].Id + '</div> </div> <br/>');
                                i++;
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

        $("#listEvents").on("click", ".btn",

            function()
            {
                var id = $(this).attr("id");
                alert(id);
            }
        );
    }
);