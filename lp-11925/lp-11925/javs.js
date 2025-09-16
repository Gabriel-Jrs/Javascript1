$(document).ready(function () {
    //Controla o botão "Mostar" do campo senha
    $(".btnExibirSenha").click(function () {

        var inputGroupSenha = $(this).closest(".inputGroupSenha");

        if (inputGroupSenha.find(".inputSenha").attr("type") == "password") {
            inputGroupSenha.find(".inputSenha").attr("type", "text");
            inputGroupSenha.find(".btnExibirSenhaIconOpen").addClass("hide");
            inputGroupSenha.find(".btnExibirSenhaIconClosed").removeClass("hide");
        } else {
            inputGroupSenha.find(".inputSenha").attr("type", "password");
            inputGroupSenha.find(".btnExibirSenhaIconOpen").removeClass("hide");
            inputGroupSenha.find(".btnExibirSenhaIconClosed").addClass("hide");
        }
    });


    //Mostra o bloco de recuperação de senha
    $("#btnEsqueciSenha").click(function (e) {
        e.preventDefault();
        $("#bloco-recuperar-senha").removeClass("hide");
    });

    //Mostra o bloco de criação de senha
    $("#btnPrimeiroAcessoAluno").click(function (e) {
        e.preventDefault();
        $("#bloco-primeiro-acesso-aluno").removeClass("hide");
    });

    //Esconde o bloco de recuperação de senha
    $("#bloco-recuperar-senha .close").click(function () {
        $(this).parent().addClass("hide");
    });

    //Esconde o bloco de criação de senha
    $("#bloco-primeiro-acesso-aluno .close").click(function () {
        $(this).parent().addClass("hide");
    });

    //Esconde o bloco de recuperação de senha
    $("#bloco-mensagem-senha .close").click(function () {
        $(this).parent().addClass("hide");
    });


    //Passa o foco para o campo de senha ao pressionar ENTER no campo do email
    $('#usuario').keydown(function (e) {
        if ((e.which == 13)) {
            $('#senha').focus();
        }
    });
    //Ativa o botão ENTRAR ao acionar ENTER no campo senha
    $("#senha").keydown(function (e) {
        if (e.which == 13) {
            $("#btnEntrar").click();
        }
    })

    //Ação do botão "Entrar"
    $("#btnEntrar").click(function () {
        if ($("#sistema_ocupado").val() == "true") {
            $("#status-login").html("Aguarde, processando...");
            return;
        }

        var paramUsuario = $("#usuario").val();
        var paramSenha = $("#senha").val();

        if (isNaN(paramUsuario)) {
            if (paramUsuario.includes("@") && !(paramUsuario.includes("@iftm.edu.br") || paramUsuario.includes("@estudante.iftm.edu.br"))) {
                $("#usuario").focus();
                return false;
            }
        }

        $.ajax({
            dataType: 'json',
            type: 'post',
            url: "/VRTL/controlador/ctrl_login/autenticarUsuario.php",
            data: {
                usuario: paramUsuario,
                senha: paramSenha
            },
            beforeSend: function () {
                $("#sistema_ocupado").val("true");
                $("#status-login").removeClass("text-danger text-success");
                $("#status-login").html("");
                $("#loading-animation-login").removeClass("hide");
            },
            success: function (data) {
                switch (data.status) {
                    case "ok":
                        break;
                    case "erro":
                        $("#status-login").addClass("text-danger");
                        $("#status-login").html(data.msg);
                        break;
                    case "redir":
                        $("#status-login").addClass("text-success");
                        $("#status-login").html("Aguarde, redirecionando...");
                        var url = data.url;
                        location.href = url;
                        break;
                }
            },
            error: function () {
                $("#status-login").addClass("text-danger");
                $("#status-login").html("Desculpe, sem conexão com o servidor.");
            },
            complete: function () {
                $("#sistema_ocupado").val("false");
                $("#loading-animation-login").addClass("hide");
            }
        });
        return false;
    });


    //Ação do botão "Entrar Gov.br"
    $("#btnEntrarGov").click(function () {
        window.location.href = "/govbr/controlador/login/loginGov.php";
    });

    $("#btnPrimeiroAcessoServidorUE").click(function () {
        window.location.href = "/govbr/controlador/login/loginGov.php";
    });

    //Ação do botão "Primeiro acesso para responsável Acompanhamento Academico"
    $("#btnAcessoAcompanhamentoAcademico").click(function () {
        window.location.href = "/cadastroResponsavel.php";
    });

    //Ação do botão "Enviar Email" para recuperar senha ou criar primeiro acesso
    $(".frm-login-btn-recuperar-senha").click(function () {
        if ($("#usuario").val() == "") {
            $("#usuario").focus();
        } else {

            if ($("#sistema_ocupado").val() == "true") {
                $("#status-login").html("Aguarde, processando...");
                return;
            }

            var paramUsuario = $("#usuario").val();

            if (isNaN(paramUsuario)) {
                if (paramUsuario.includes("@") && !(paramUsuario.includes("@iftm.edu.br") || paramUsuario.includes("@estudante.iftm.edu.br"))) {
                    $("#usuario").focus();
                    return false;
                }
            }

            $.ajax({
                dataType: 'json',
                type: 'post',
                url: "/VRTL/controlador/ctrl_login/recuperarSenha.php",
                data: {
                    usuario: paramUsuario
                },
                beforeSend: function () {
                    $("#sistema_ocupado").val("true");
                    $("#status-login").removeClass("text-danger text-success");
                    $("#status-login").html("");
                    $(".loading-animation-email").removeClass("hide");
                },
                success: function (data) {
                    switch (data.status) {
                        case "ok":
                            $("#emailusuario").html(data.obj);
                            $("#bloco-recuperar-senha").addClass("hide");
                            $("#bloco-primeiro-acesso-aluno").addClass("hide");
                            $("#bloco-mensagem-senha").removeClass("hide");
                            break;
                        case "erro":
                            $("#status-login").addClass("text-danger");
                            $("#status-login").html(data.msg);
                            break;
                        case "redir":
                            $("#status-login").addClass("text-success");
                            $("#status-login").html("Aguarde, redirecionando...");
                            var url = data.url;
                            location.href = url;
                            break;
                    }
                },
                error: function () {
                    $("#status-login").html("Desculpe, sem conexão com o servidor.");
                },
                complete: function () {
                    $("#sistema_ocupado").val("false");
                    $(".loading-animation-email").addClass("hide");
                }
            });
            return false;
        }
    });

    $("#btnRedefinirSenha").click(function () {
        $("#status-redefinicao-senha").removeClass("text-danger text-success");
        if ($("#sistema_ocupado").val() == "true") {
            $("#status-redefinicao-senha").html("Aguarde, processando...");
            return;
        }
        if ($("#senha1").val() == "") {
            $("#senha1").focus();
            return;
        }
        if ($("#senha2").val() == "") {
            $("#senha2").focus();
            return;
        }
        if ($("#senha1").val() !== $("#senha2").val()) {
            $("#status-redefinicao-senha").addClass("text-danger");
            $("#status-redefinicao-senha").html("As senhas informadas são diferentes.");
            $("#senha1").focus();
            return;
        }

        var params = $("#form-redefinir-senha").serialize();

        $.ajax({
            dataType: 'json',
            type: 'post',
            url: "/VRTL/controlador/ctrl_login/trocarSenhaUsuario.php",
            data: params,
            beforeSend: function () {
                $("#sistema_ocupado").val("true");
                $("#status-redefinicao-senha").html("");
                $("#loading-animation-redefinir-senha").removeClass("hide");
            },
            success: function (data) {
                switch (data.status) {
                    case "ok":
                        break;
                    case "erro":
                        $("#status-redefinicao-senha").addClass("text-danger");
                        $("#status-redefinicao-senha").html(data.msg);
                        break;
                    case "redir":
                        $("#status-redefinicao-senha").addClass("text-success");
                        $("#status-redefinicao-senha").html("Aguarde, redirecionando...");
                        var url = data.url;
                        location.href = url;
                        break;
                }
            },
            error: function () {
                $("#status-redefinicao-senha").html("Desculpe, sem conexão com o servidor.");
            },
            complete: function () {
                $("#sistema_ocupado").val("false");
                $("#loading-animation-redefinir-senha").addClass("hide");
            }
        });
        return false;
    });

    $('[data-toggle="popover"]').popover();
    $('#usuario').focus();
    notificacaoUsuario($("#usuario"));


    util.forcaSenhaEx($("#senha1"));

    /*
    $("#senha1").on("keyup", function () {
        let forca = util.forcaSenha($(this).val());
        $("#forcasenha").css("width", `${forca}%`);
        $("#forcasenha").prop("aria-valuenow", `${forca}`);
        let obs = ``;
        if (forca < 90) {
            obs = 'Senha fraca';
        } else if (forca < 100) {
            obs = 'Senha aceitável';
        } else {
            obs = 'Senha forte';
        }
        $("#forcasenha").html(obs);
    });
    */

});


function onSignGoogle(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    var paramUsuario = profile.getEmail();
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        dataType: 'json',
        type: 'post',
        url: "/VRTL/controlador/ctrl_login/autenticarUsuario.php",
        data: {
            usuario: paramUsuario,
            gtoken: id_token,
        },
        beforeSend: function () {
            $("#sistema_ocupado").val("true");
            $("#status-login").html("");
            $("#loading-animation").removeClass("hide");
        },
        success: function (data) {
            switch (data.status) {
                case "ok":
                    break;
                case "erro":
                    $("#status-login").html(data.msg);
                    break;
                case "redir":
                    $("#status-login").html("Aguarde, redirecionando...");
                    var url = data.url;
                    location.href = url;
                    break;
            }
        },
        error: function () {
            $("#status-login").html("Desculpe, sem conexão com o servidor.");
        },
        complete: function () {
            $("#sistema_ocupado").val("false");
            $("#loading-animation").addClass("hide");
        }
    });
    return false;
};


function logarFacebook(id_token) {
    $.ajax({
        dataType: 'json',
        type: 'post',
        url: "/VRTL/controlador/ctrl_login/autenticarUsuario.php",
        data: {
            ftoken: id_token,
        },
        beforeSend: function () {
            $("#sistema_ocupado").val("true");
            $("#status-login").html("");
            $("#loading-animation").removeClass("hide");
        },
        success: function (data) {
            switch (data.status) {
                case "ok":
                    break;
                case "erro":
                    $("#status-login").html(data.msg);
                    break;
                case "redir":
                    $("#status-login").html("Aguarde, redirecionando...");
                    var url = data.url;
                    location.href = url;
                    break;
            }
        },
        error: function () {
            $("#status-login").html("Desculpe, sem conexão com o servidor.");
        },
        complete: function () {
            $("#sistema_ocupado").val("false");
            $("#loading-animation").addClass("hide");
        }
    });
    return false;
}

function notificacaoUsuario(input) {
    let div = $(`<div style="display: block"></div>`);
    div.load("/VRTL/visao/html/aviso.html?" + Math.random());
    div.insertAfter(input);
    input.on('focus', function () {
        div.show("fast");
    });
    input.on('blur', function () {
        div.hide("slow");
    })
}