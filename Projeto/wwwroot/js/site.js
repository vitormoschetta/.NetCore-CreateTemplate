
function Search(parametro, url) {
    $.get(url, { param: parametro }, function (data) {
        $("#tabela-index").empty();
        $("#tabela-index").html(data);
    });
}

function Pagination(pageNumber, url) {
    $.get(url, { pageNumber: pageNumber }, function (data) {
        $("#tabela-index").empty();
        $("#tabela-index").html(data);
    })
}





function Create(url) {
    $.get(url, function (data) {
        $("#carrega-modal").html(data);
        $('#modalCreate').modal('show');
    });
}


function Edit(id, url) {
    $.get(url, { id: id }, function (data) {
        $("#carrega-modal").html(data);
        $('#modalEdit').modal('show');
    });
}


function Delete(id, url) {
    $('#modalEdit').modal('hide');
    $.get(url, { id: id }, function (data) {
        $("#carrega-modal").html(data);
        $('#modalDelete').modal('show');
    });
}












function BuscaDinamica(texto, rota, params) {

    var url = $("#" + rota).data("url");
    params = $("#" + params).val();

    $.post(url, { texto: texto, parametro: params }, function (data) {
        $("#tabela-index").empty();
        $("#tabela-index").html(data);
    })

}




function PaginacaoDinamica(pageNumber, rotaTexto, params, rota) {
    var url = $("#" + rota).data("url");
    params = $("#" + params).val();
    var texto = $("#" + rotaTexto).val();

    $.post(url, { texto: texto, parametro: params, pageNumber: pageNumber }, function (data) {
        $("#tabela-index").empty();
        $("#tabela-index").html(data);
    })
}



// Liberar todos os campos text readonly
function EditIcon() {
    $('input[type="text"]').prop("readonly", false);
}



function Redireciona(params, rota) {

    var url = $("#" + rota).data("url");
    location.href = url + "/" + params;

}




/* Nao alterar ValidateState */
validateState = false;
/* Required message */
validateRequiredMsg = "Campo de preechimento obrigatório";
/* E-mail message */
validateMailMsg = "E-mail informado &eacute; inv&aacute;lido";
/* Numeric message */
validateNumericMsg = "O valor deve ser num&eacute;rico";
/* Min message */
validateMinMsg = "A quantidade m&iacute;nima de caracters &eacute;: ";
/* Max message */
validateMaxMsg = "A quantidade m&aacute;xima de caracters &eacute;: ";
/* Password message */
validatePasswordMsg = "Senhas n&atilde;o conferem";


function validate(form_id) {
    $('#' + form_id + ' :input').each(function () {
        /* required */
        if ($(this).hasClass('required') && $.trim($(this).val()) == "") {
            $(this).addClass('invalid');
            $(this).focus();
            $('#validate_message').html(validateRequiredMsg);
            validateState = false;
            return false;
        }
        else {
            $(this).removeClass('invalid');
            validateState = true;
        }

        /* numeric value */
        if ($(this).hasClass('required') && $(this).hasClass('numeric')) {
            var nan = new RegExp(/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/);
            if (!nan.test($.trim($(this).val()))) {
                $(this).addClass('invalid');
                $(this).focus();
                $('#validate_message').html(validateNumericMsg);
                validateState = false;
                return false;
            }
            else {
                $('#validate_message').html('');
                $(this).removeClass('invalid');
                validateState = true;
            }
        }

        /* mail */
        if ($(this).hasClass('email')) {
            var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
            if (!er.test($.trim($(this).val()))) {
                $(this).addClass('invalid');
                $(this).focus();
                $('#validate_message').html(validateMailMsg);
                validateState = false;
                return false;
            }
            else {
                $(this).removeClass('invalid');
                validateState = true;
            }
        }

        /* min value */
        if ($(this).attr('min') && $(this).hasClass('required')) {
            if ($.trim($(this).val()).length < $(this).attr('min')) {
                $(this).addClass('invalid');
                $(this).focus();
                $('#validate_message').html(validateMinMsg + $(this).attr('min'));
                validateState = false;
                return false;
            }
            else {
                $('#validate_message').html('');
                $(this).removeClass('invalid');
                validateState = true;
            }
        }

        /* max value */
        if ($(this).attr('max') && $(this).hasClass('required')) {
            if ($.trim($(this).val()).length > $(this).attr('max')) {
                $(this).addClass('invalid');
                $(this).focus();
                $('#validate_message').html(validateMaxMsg + $(this).attr('max'));
                validateState = false;
                return false;
            }
            else {
                $('#validate_message').html('');
                $(this).removeClass('invalid');
                validateState = true;
            }
        }
        /* password */
        if ($(this).hasClass('password') && $(this).nextAll('.password').hasClass('password')) {
            if ($.trim($(this).val()) != $.trim($(this).nextAll('.password').val())) {
                $(this).nextAll('.password').addClass('invalid');
                $(this).nextAll('.password').focus();
                $('#validate_message').html(validatePasswordMsg);
                validateState = false;
                return false;
            }
            else {
                $('#validate_message').html('');
                $(this).nextAll('.password').removeClass('invalid');
                validateState = true;
            }
        }
    })
}
