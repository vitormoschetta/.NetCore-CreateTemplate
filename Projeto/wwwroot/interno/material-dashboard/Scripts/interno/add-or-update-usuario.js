$(function () {

    "use string";

    window.AddOrUpdateUsuario = window.AddOrUpdateUsuario || {};

    AddOrUpdateUsuario.CarregarEvento = function () {
        $(document).ready(function () {
            $(document).on("click", "#btn-adicionar-usuario", function () {
                AddOrUpdateUsuario.Adicionar();
            });

            $(document).on("click", "#btn-atualizar-usuario", function () {
                AddOrUpdateUsuario.Atualizar();
            });
        });
    };

    AddOrUpdateUsuario.CriarEntidadeUsuario = function () {
        this.usuarioId = $("#usuarioId").val();
        this.nome = $("#nomeUsuario").val();
        this.login = $("#loginUsuario").val();
        this.senha = $("#senhaUsuario").val();
        this.grupoId = $("#GrupoId").val();
    };

    AddOrUpdateUsuario.Adicionar = function () {
        var tblUsuario = $(".tbl-usuario");
        var url = $("#formAddUsuario").attr("action");
        var dados = new AddOrUpdateUsuario.CriarEntidadeUsuario();
        $.ajax({
            url: url,
            data: { usuario: dados },
            method: "POST",
            success: function (result) {
                tblUsuario.empty();
                tblUsuario.append(result);
                $(".abrir-modal").modal("hide");
            },
            error: function (e) {
                alert(e);
            }
        });
    };

    AddOrUpdateUsuario.Atualizar = function () {
        var tblUsuario = $(".tbl-usuario");
        var url = $("#formUpdateUsuario").attr("action");
        var dados = new AddOrUpdateUsuario.CriarEntidadeUsuario();
        $.ajax({
            url: url,
            data: { usuario: dados },
            method: "POST",
            success: function (result) {
                tblUsuario.empty();
                tblUsuario.append(result);
                $(".abrir-modal").modal("hide");
            },
            error: function (e) {
                alert(e);
            }
        });
    };

    AddOrUpdateUsuario.CarregarEvento();
});