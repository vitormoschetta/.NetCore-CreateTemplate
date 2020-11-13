$(function () {

    "use script";

    window.Paginacao = window.Paginacao || {};

    Paginacao.Carregar = function () {
        $(document).on("keyup", "#input-pesquisa", function () {
            Paginacao.BuscarInformacao();
        });

        $(document).on("click", "#pageLink a[href]", function () {
            var paginaAtual = $("#pageLink").data("paginaatual");
            var tipo = $("#pageLink").data("tipo");
            var paginaHref = $(this).attr("href");
            var pg = Paginacao.TipoHaSerBuscado(tipo, paginaHref);
            var pagina = $(this).text();
            switch (pagina) {
                case "»":
                    pagina = paginaAtual + 1;
                    break;
                case "«":
                    pagina = paginaAtual - 1;
                    break;
                case "»»":
                    pagina = pg;
                    break;
                case "««":
                    pagina = pg;
                    break;
                default:
            }
            Paginacao.BuscarInformacao(pagina);
            return false;
        });
    };

    Paginacao.BuscarInformacao = function (pagina = 1) {
        var divQueCarregaItens = $(".carregar-itens");
        divQueCarregaItens.empty();
        var url = $(".carregar-itens").data("url");
        var textoDigitado = $("#input-pesquisa").val();
        $.ajax({
            url: url,
            data: { textoDigitado: textoDigitado, pagina },
            method: "POST",
            success: function (result) {
                divQueCarregaItens.empty();
                divQueCarregaItens.append(result);
            },
            error: function () {
                alert("Erro ao pesquisar informação");
            }
        });
    };

    Paginacao.TipoHaSerBuscado = function (tipo, paginaHref) {
        var pg;
        switch (tipo) {
            case "menu":
                pg = paginaHref.replace("/Menu/BuscarMenus?pagina=", "");
                break;

            default:
        }

        return pg;
    };

    Paginacao.Carregar();
});