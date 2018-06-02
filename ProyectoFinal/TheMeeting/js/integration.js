$(
    function()
    {
        $("#send").click
        (
            function ()
            {
                $("#state").removeClass("badge badge-pill badge-success");
                $("#state").addClass("badge badge-pill badge-warning");
                $("#state").text("Registrando usuario... Espere un momento. ");
                

                var user =
                {
                    name:       $("#names").val(),
                    lastName:   $("#lastName").val(),
                    sex:        $('input:radio[name=optionsGender]:checked').val(),
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
                                $("#state").removeClass("badge badge-pill badge-warning");
                                $("#state").addClass("badge badge-pill badge-success");
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
                $("#loginStatus").removeClass("badge badge-pill badge-success");
                $("#loginStatus").addClass("badge badge-pill badge-warning");
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
                            $("#loginStatus").removeClass("badge badge-pill badge-warning");
                            $("#loginStatus").addClass("badge badge-pill badge-success");
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
                $("#stateCreation").removeClass("badge badge-pill badge-success");
                $("#stateCreation").addClass("badge badge-pill badge-warning");
                $("#stateCreation").text("Creando evento... ");

                var idUserString = $("#resultId").text();
                var idUser = parseInt(idUserString);

                var meeting =
                {
                    name: $("#title").val(),
                    description: $("#description").val(),
                    idUser: idUser,
                    isPublic: $('input:radio[name=typeEvent]:checked').val(),
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
                                $("#stateCreation").removeClass("badge badge-pill badge-warning");
                                $("#stateCreation").addClass("badge badge-pill badge-success");
                                $("#stateCreation").text("Se ha creado un evento con éxito. ");
                            }
                            else
                            {
                                $("#stateCreation").removeClass("badge badge-pill badge-warning");
                                $("#stateCreation").addClass("badge badge-pill badge-danger");
                                $("#stateCreation").text("No se pudo crear el evento. ");
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
                            $("#listEvents").empty();
                            var i = 0;
                            while (i < data.NumberEvents)
                            {
                                if (data.Events[i].IsPublic == 0)
                                {
                                    $("#listEvents").append('<div class="card text-center"> <div class="card-header">' + data.Events[i].Place + ' ' + data.Events[i].Date + '</div> <div class="card-body"> <h5 class="card-title">' + data.Events[i].Name + '</h5> <p class="card-text">' + data.Events[i].Description + '</p> <input id = "I' + (i) + '" class="form-control" placeholder="Especificar el username"> <br /> <button type = "button" id= "' + (i) + '" class="btn btn-outline-info my-2 my-sm-0">Invitar usuario.</button> <button type = "button" value = "' + (i) + '" class="btn btn-outline-info my-2 my-sm-0">Ver invitaciones.</button> </div> <div class="card-footer text-muted">' + data.Events[i].DateCreation + '</div> <div id = "L' + (i) + '" class="card-footer text-muted">' + data.Events[i].Id + '</div> <div id = "S' + (i) + '" class="card-footer text-muted"> </div> <div id = "containerUsers" class="card-footer text-muted"> </div> </div> <br/>');
                                }

                                else
                                {
                                    $("#listEvents").append('<div class="card text-center"> <div class="card-header">' + data.Events[i].Place + ' ' + data.Events[i].Date + '</div> <div class="card-body"> <h5 class="card-title">' + data.Events[i].Name + '</h5> <p class="card-text">' + data.Events[i].Description + '</p> <p class="card-text">Evento Público</p> <br /> </div> <div class="card-footer text-muted">' + data.Events[i].DateCreation + '</div> <div id = "S' + (i) + '" class="card-footer text-muted"> </div> </div> <br/>');
                                }
                                
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
                var idEvent = parseInt($("#L" + id).text());

                var parameters =
                {
                    usernameInvited: $("#I" + id).val(),
                    idEvent: idEvent
                };

                $("#S" + id).text("Invitando usuario... ");

                $.ajax
                (
                    {
                        url: '../api/eventuser',
                        type: 'POST',
                        data: JSON.stringify(parameters),
                        contentType: "application/json;charset=utf-8",

                        success:
                        function (data)
                        {
                            if (data.Status)
                            {
                                $("#S" + id).text("El usuario ha sido invitado con éxito. ");
                            }

                            else
                            {
                                $("#S" + id).text("Error al invitar el usuario. Es posible que ya lo haya invitado. ");
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

            function ()
            {
                var value = $(this).attr("value");
                var idEvent = parseInt($("#L" + value).text());
                alert(idEvent);

                
                $.ajax
                (
                    {
                        url: '../api/confirmedusers?id=' + idEvent,
                        type: 'GET',
                        contentType: "application/json;charset=utf-8",

                        success:
                        function (data)
                        {
                            $("#containerUsers").empty();
                            var i = 0;
                            while (i < data.SizeUsers)
                            {
                                alert("Usuario: " + data.Users[i].Username + " Nombre: " + data.Users[i].Name + " " + data.Users[i].LastName + " Acepto invitación: " + data.Users[i].IsAcepted);
                                //$("#containerUsers").append('<div>' + data.Users[i]. + '</div>');
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


        $("#privateEvents").click
        (
            function ()
            {
                $("#stateLoadEvents").removeClass("badge badge-pill badge-success");
                $("#stateLoadEvents").addClass("badge badge-pill badge-warning");
                $("#stateLoadEvents").text("Cargando eventos ...");
                var idUserString = $("#resultId").text();
                var idUser = parseInt(idUserString);

                $.ajax
                (
                    {
                        url: '../api/eventuser?id=' + idUser,
                        type: 'GET',
                        contentType: "application/json;charset=utf-8",

                        success:
                        function (data)
                        {
                            $("#listPrivate").empty();
                            var i = 0;
                            while (i < data.SizeReplies)
                            {
                                $("#listPrivate").append('<div class="col-md-4"> <div class="card mb-4 box-shadow"> <img class="card-img-top" src="img/evento.jpg"> <div class="card-body"> <p class="card-text">' + data.Replies[i].Title + '</p> <div class="d-flex justify-content-between align-items-center"> <small class="text-muted" style="text-align:justify">' + data.Replies[i].Description + '</small> </div> <div class="d-flex justify-content-between align-items-center"> <small class="text-muted" style="text-align:justify">' + data.Replies[i].DateEvent + '</small> </div> <div class="d-flex justify-content-between align-items-center"> <small class="text-muted" style="text-align:justify">' + data.Replies[i].Place + '</small> </div> <br /> <div class="d-flex justify-content-between align-items-center"> <div class="btn-group"> <button id="' + (i) + '" class="btn btn-outline-primary my-2 my-sm-0" type="submit">Aceptar invitación</button> </div> </div> <br /> <div class="d-flex justify-content-between align-items-center"> <small class="text-muted" style="text-align:justify">' + data.Replies[i].DateCreation + '</small> </div> <div class="d-flex justify-content-between align-items-center"> <small class="text-muted" style="text-align:justify">' + data.Replies[i].Creator + '</small> </div> <div class="d-flex justify-content-between align-items-center"> <small id = "L' + (i) + '" class="text-muted" style="text-align:justify">' + data.Replies[i].Id + '</small> </div> </div> </div> </div>');
                                i++;
                            }
                            $("#stateLoadEvents").text("");
                        },

                        error:
                        function ()
                        {

                        }
                    }
                );
            }
        );


        $("#publicEvents").click
        (
            function ()
            {
                $("#stateLoadEvents").removeClass("badge badge-pill badge-success");
                $("#stateLoadEvents").addClass("badge badge-pill badge-warning");
                $("#stateLoadEvents").text("Cargando eventos ...");
                var idUserString = $("#resultId").text();
                var idUser = parseInt(idUserString);

                $.ajax
                (
                    {
                        url: '../api/eventusertwo?id=' + idUser,
                        type: 'GET',
                        contentType: "application/json;charset=utf-8",

                        success:
                        function (data)
                        {
                            $("#listPublic").empty();
                            var i = 0;
                            while (i < data.SizeReplies)
                            {
                                $("#listPublic").append('<div class="col-md-4"> <div class="card mb-4 box-shadow"> <img class="card-img-top" src="img/evento.jpg"> <div class="card-body"> <p class="card-text">' + data.Replies[i].Title + '</p> <div class="d-flex justify-content-between align-items-center"> <small class="text-muted" style="text-align:justify">' + data.Replies[i].Description + '</small> </div> <div class="d-flex justify-content-between align-items-center"> <small class="text-muted" style="text-align:justify">' + data.Replies[i].DateEvent + '</small> </div> <div class="d-flex justify-content-between align-items-center"> <small class="text-muted" style="text-align:justify">' + data.Replies[i].Place + '</small> </div> <br /> <div class="d-flex justify-content-between align-items-center"> <div class="btn-group"> <button id="' + (i) + '" class="btn btn-outline-primary my-2 my-sm-0" type="submit">Aceptar invitación</button> </div> </div> <br /> <div class="d-flex justify-content-between align-items-center"> <small class="text-muted" style="text-align:justify">' + data.Replies[i].DateCreation + '</small> </div> <div class="d-flex justify-content-between align-items-center"> <small class="text-muted" style="text-align:justify">' + data.Replies[i].Creator + '</small> </div> <div class="d-flex justify-content-between align-items-center"> <small id = "L' + (i) + '" class="text-muted" style="text-align:justify">' + data.Replies[i].Id + '</small> </div> </div> </div> </div>');
                                i++;
                            }
                            $("#stateLoadEvents").text("");
                        },

                        error:
                        function ()
                        {

                        }
                    }
                );
            }
        );

        $("#listPrivate").on("click", ".btn",

            function ()
            {
                var id = $(this).attr("id");
                var idUserEvent = parseInt($("#L" + id).text());
                alert(idUserEvent);

                
                var parameters =
                    {
                        idUserEvent: parseInt($("#L" + id).text()),
                        isAcepted: 1
                    }

                $.ajax
                (
                    {
                        url: '../api/eventuser',
                        type: 'PUT',
                        data: JSON.stringify(parameters),
                        contentType: "application/json;charset=utf-8",
                        success:
                        function (data)
                        {
                            alert(data);
                        },
                        error:
                        function ()
                        {

                        }
                    }
                );
            }
        );

        $("#listPublic").on("click", ".btn",

            function ()
            {
                var id = $(this).attr("id");
                var idUserEvent = parseInt($("#L" + id).text());

                var parameters =
                    {
                        idUserEvent: parseInt($("#L" + id).text()),
                        isAcepted: 1
                    }

                $.ajax
                (
                    {
                        url: '../api/eventuser',
                        type: 'PUT',
                        data: JSON.stringify(parameters),
                        contentType: "application/json;charset=utf-8",
                        success:
                        function (data)
                        {
                            alert(data);
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