$(function () {

    "use string";

    window.Mask = window.Mask || {};

    $(document).ready(function () {
        $('.date').mask('00/00/0000');
        $('.cep').mask('00000-000');
        $('.telefone').mask('(00) 0000-0000');
        $('.celular').mask('(00) 00000-0000');
        $('.cpf').mask('000.000.000-00', { reverse: true });

        var valor = $("#Valor").val();
        var valorPag = $("#ValorPagamento").val();

        if (valor !== undefined)
            $("#Valor").val($("#Valor").val().replace(",00", ""));

        if (valorPag !== undefined)
            $("#ValorPagamento").val($("#ValorPagamento").val().replace(",00", ""));
    });
});