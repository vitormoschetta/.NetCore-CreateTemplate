$(function () {

    "use string";

    window.EventoAtivo = window.EventoAtivo || {};

    EventoAtivo.Ativo = function () {
        $(document).ready(function () {
            $(document).on("click", "#btn-ativo", function () {
                var paginaAtual = $("#pageLink").data("paginaatual");
                var divQueCarregaItens = $(".carregar-itens");
                var url = $(this).data("ativo");

                $.ajax({
                    url: url,
                    data: { pagina: paginaAtual },
                    method: "POST",
                    success: function (result) {
                        divQueCarregaItens.empty();
                        divQueCarregaItens.append(result);
                        Lobibox.notify('success', { position: 'top right', sound: '../../sounds/sound2', delay: 3000, msg: 'Informação ativada/desativada com sucesso', title: 'Sucesso', icon: 'smile icon' });
                    },
                    error: function () {
                        Lobibox.notify('error', { position: 'top right', sound: '../../sounds/sound4', delay: 3000, msg: 'Erro ao ativar/desativar informação', title: 'Erro', icon: 'frown icon' });
                    }
                });
            });
        });
    };


    EventoAtivo.AtivoUsuario = function () {
        $(document).ready(function () {
            $(document).on("click", "#btn-ativoUsuario", function () {
                var tblUsuario = $(".tbl-usuario");
                var url = $(this).data("ativo");
                $.ajax({
                    url: url,
                    method: "POST",
                    success: function (result) {
                        tblUsuario.empty();
                        tblUsuario.append(result);
                        Lobibox.notify('success', { position: 'top right', sound: '../../sounds/sound2', delay: 3000, msg: 'Informação ativada/desativada com sucesso', title: 'Sucesso', icon: 'smile icon' });
                    },
                    error: function () {
                        Lobibox.notify('error', { position: 'top right', sound: '../../sounds/sound4', delay: 3000, msg: 'Erro ao ativar/desativar informação', title: 'Erro', icon: 'frown icon' });
                    }
                });
            });
        });
    };

    EventoAtivo.Ativo();
    EventoAtivo.AtivoUsuario();
});