$(function () {

    "use strict";

    window.MaskMoney = window.MaskMoney || {};

    MaskMoney.priceFormatScopo = function (scopo) {
        $(scopo).find(".money")
            .priceFormat({
                prefix: "R$ ",
                centsSeparator: ",",
                thousandsSeparator: ".",
                clearPrefix: true
            });
    };
    MaskMoney.priceFormat = function () {
        $(".money")
            .priceFormat({
                prefix: "R$ ",
                centsSeparator: ",",
                thousandsSeparator: ".",
                clearPrefix: true
            });
    };
    MaskMoney.priceFormatSetInput = function (input) {
        $(input)
            .priceFormat({
                prefix: "R$ ",
                centsSeparator: ",",
                thousandsSeparator: ".",
                clearPrefix: true
            });
    };
    MaskMoney.priceFormatParamsSetVal = function (seletor, val) {
        $(seletor)
            .val(val)
            .priceFormat({
                prefix: "R$ ",
                centsSeparator: ",",
                thousandsSeparator: ".",
                clearPrefix: true
            });
    };
    MaskMoney.priceFormatParamsSetText = function (seletor, val) {
        $(seletor)
            .text(val)
            .priceFormat({
                prefix: "R$ ",
                centsSeparator: ",",
                thousandsSeparator: ".",
                clearPrefix: true
            });
    };

    MaskMoney.priceFormat();
});