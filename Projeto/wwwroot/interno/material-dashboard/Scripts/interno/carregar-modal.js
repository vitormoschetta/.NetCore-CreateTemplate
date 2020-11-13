$(function () {

    "use string";

    window.EventoModal = window.EventoModal || {};

    EventoModal.AbrirModal = function () {
        $(document).ready(function () {
            $(document).on("click", ".btn-abrirModal", function () {
                var carregarModal = $(".modal.abrir-modal");
                carregarModal.empty();
                var url = $(this).data("abrirmodal");
                $.ajax({
                    url: url,
                    method: "POST",
                    success: function (result) {
                        carregarModal.append(result);
                        carregarModal.modal("show");
                    },
                    error: function () {
                        alert("Error ao abrir informações!");
                        carregarModal.modal("hide");
                    }
                });
            });

            $(document).on("click", "#btn-fechar-modal", function () {
                $(".modal.abrir-modal").modal("hide");
            });
        });
    };

    EventoModal.AbrirModal();
});