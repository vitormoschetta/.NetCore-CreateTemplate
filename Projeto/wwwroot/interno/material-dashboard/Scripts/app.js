webpackJsonp([1], {
    0: function (e, a, n) {
        n("F1kH"),
            e.exports = n("KqWi")
    },
    "Dlg+": function (e, a, n) {
        try {
            window.Popper = n("Zgw8").default,
                window.$ = window.jQuery = n("7t+N"),
                n("K3J8"),
                n("t+Rb")
        } catch (e) { }
    },
    F1kH: function (e, a, n) {
        var t;
        n("Dlg+"),
            n("pqX9"),
            n("PAcq"),
            $(function () {
                $("div.alert").not(".alert-important").delay(3e3).fadeOut(350),
                    $(".popover-dismiss").popover({
                        trigger: "focus"
                    })
            }),
            t = n("e7x4"),
            $(".alert-confirm").on("click", function (e) {
                e.preventDefault();
                var a = $(this).data("title");
                a = a || "";
                var n = $(this).data("text")
                    , i = $(this).data("text-cancel") ? $(this).data("text-cancel") : "Cancelado"
                    , r = $(this).closest("form")
                    , c = $(this).attr("href")
                    , o = $(this).data("btn-confirm");
                o = o || "Sim";
                var s = $(this).data("btn-cancel");
                return t({
                    title: a,
                    text: n,
                    type: "warning",
                    showCancelButton: !0,
                    confirmButtonText: o,
                    cancelButtonText: s = s || "CANCELAR"
                }).then(function (e) {
                    "cancel" != e.dismiss ? (r && r.submit(),
                        c && (window.location.href = c)) : t(i, "", "success")
                }),
                    !1
            }),
            $(function () {
                $(".mask-date").mask("00/00/0000"),
                    $(".mask-time").mask("00:00"),
                    $(".mask-cell-phone").mask("(00) 00000-0000"),
                    $(".mask-cpf").mask("000.000.000-00", {
                        reverse: !0
                    })
            }),
            function () {
                "use strict";
                window.addEventListener("load", function () {
                    var e = document.getElementsByClassName("needs-validation");
                    Array.prototype.filter.call(e, function (e) {
                        e.addEventListener("submit", function (a) {
                            !1 === e.checkValidity() && (a.preventDefault(),
                                a.stopPropagation()),
                                e.classList.add("was-validated")
                        }, !1)
                    })
                }, !1)
            }()
    },
    KqWi: function (e, a) { },
    PAcq: function (e, a, n) {
        var t = n("wFCU")
            , i = function (e) {
                return $("." + e + ".card-selected").removeClass("card-selected")
            }
            , r = function (e, a) {
                !function (e, a) {
                    $('input:radio[name="' + a + '"]').removeAttr("checked"),
                        e.find('input:radio[name="' + a + '"]').attr("checked", !0)
                }(e, a),
                    e.addClass("card-selected")
            }
            , c = function (e, a) {
                $("i.icon-circle-" + a).removeClass("fa-check-circle").removeClass("text-success").addClass("fa-circle"),
                    e.find("i.icon-circle-" + a).removeClass("fa-circle").addClass("fa-check-circle").addClass("text-success")
            };
        $(".card-candidatos.card-btn").on("click", function () {
            i("card-candidatos"),
                r($(this), "candidato_id"),
                c($(this), "candidatos"),
                $("#box-vagas").removeClass("d-none")
        }),
            $("#btn-reservar-vaga").on("click", function () {
                var e = $("#overlay");
                e.show(),
                    e.find(".message").empty().append("Estamos salvando sua reserva e gerando seu comprovante... Aguarde um momento!")
            }),
            function (e, a, n, t, i) {
                var r = a.mountSelectOptions
                    , c = a.mountOption
                    , o = e("#modalidade_id")
                    , s = e("#serie_id")
                    , d = e(".vagas-list")
                    , l = e("#municipio_id")
                    , u = e("#btn-reservar-vaga");
                function p(a) {
                    a.empty();
                    var n = c("carregando...", "");
                    e(n).appendTo(a)
                }
                l.on("change", function () {
                    o.empty(),
                        s.empty(),
                        d.empty(),
                        u.attr("disabled", !0),
                        p(o);
                    var a = "/api/vagas/municipios/:municipio_id/modalidades".replace(":municipio_id", e(this).val());
                    e.getJSON(a, function (e) {
                        var a = r(e, {
                            name: "Selecione uma modalidade",
                            value: ""
                        });
                        o.empty(),
                            o.prepend(a)
                    }).fail(function () {
                        var a = g("Erro ao buscar modalidade. Carregando novamente...", "info");
                        e(a).prependTo(d),
                            setTimeout(function () {
                                l.trigger("change")
                            }, 5e3)
                    })
                }),
                    o.on("change", function () {
                        s.empty(),
                            d.empty(),
                            u.attr("disabled", !0),
                            p(s);
                        var a = "/api/vagas/municipios/:municipio_id/modalidades/:modalidade_id/series".replace(":municipio_id", l.val()).replace(":modalidade_id", e(this).val());
                        e.getJSON(a, function (e) {
                            var a = r(e, {
                                name: "Selecione Uma Série",
                                value: ""
                            });
                            s.empty(),
                                s.prepend(a)
                        }).fail(function () {
                            var a = g("Erro ao buscar series. Carregando novamente...", "info");
                            e(a).prependTo(d),
                                setTimeout(function () {
                                    o.trigger("change")
                                }, 5e3)
                        })
                    });
                var v = 0;
                function m() {
                    d.empty();
                    var a = g("Buscando vagas disponíveis... <i class='fa fa-spinner fa-pulse fa-fw' aria-hidden='true'></i>");
                    e(a).prependTo(d);
                    var r = "/api/vagas/municipios/:municipio_id/modalidades/:modalidade_id/series/:serie_id/list".replace(":municipio_id", l.val()).replace(":modalidade_id", o.val()).replace(":serie_id", s.val());
                    e.getJSON(r, function (a) {
                        if (d.empty(),
                            u.attr("disabled", !0),
                            a.length > 0) {
                            var r = f(a);
                            e(r).prependTo(d),
                                e(".card-vagas.card-btn").on("click", function () {
                                    n("card-vagas"),
                                        t(e(this), "vaga_id"),
                                        i(e(this), "vagas"),
                                        u.removeAttr("disabled")
                                })
                        } else {
                            var c = g("Nenhuma vaga informada para esta série! Procure a Coordenadoria Regional de Educação.", "danger");
                            e(c).prependTo(d)
                        }
                        e("#overlay").hide()
                    }).fail(function () {
                        setTimeout(function () {
                            s.trigger("change")
                        }, 5e3)
                    })
                }
                s.on("change", function () {
                    clearInterval(v),
                        d.empty(),
                        u.attr("disabled", !0),
                        0 == v && m(),
                        e(this).val() && (v = setInterval(m(), 6e4))
                });
                var f = function (e) {
                    var a = "";
                    return e.forEach(function (e) {
                        a += h(e.escola, e.turno, e.vaga, e.total, e.id, e.endereco)
                    }),
                        a
                }
                    , g = function (e) {
                        return ('<div class="col-sm col-md-6">\n                            <div class="alert alert-' + (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "info") + ' alert-important" role="alert">\n                                :message\n                            </div>\n                        </div>').replace(":message", e)
                    }
                    , h = function (e, a, n, t, i, r) {
                        var c = b(a);
                        a = a.toLowerCase().replace(/^\w/, function (e) {
                            return e.toUpperCase()
                        });
                        var o = 0 === parseInt(t) ? "card-disabled" : "card-vagas";
                        return '<div class="col-md-4 mb-4">\n                            <div class="card-btn card-btn-hover :class">\n                                <div class="card-body">\n                                    <h6 class="card-title d-inline-block">:escola</h6>\n                                    \n                                    <span class="icons-vagas">\n                                        <i class="far fa-circle icon-circle-vagas"></i>\n                                    </span>\n\n                                    <p class="card-subtitle mb-2 text-muted">\n                                        <small>:turma</small>\n                                    </p>\n                                    \n                                    <p class="mb-2 text-muted">\n                                        <small>:endereco</small>\n                                    </p>\n\n\n                                    <input type="radio" name="vaga_id" value=":vagaId" class="d-none">\n\n                                    <p class="badge badge-pill :badgeTurno mb-0 d-inline-block" role="info">Turno :turno</p>\n\n                                    <p class="d-inline-block float-right">\n                                        <big class="text-danger"><b>:vagas</b></big> \n                                        <span class="text-muted">vagas restantes</span>\n                                    </p>\n                                </div>\n                            </div>\n                        </div>'.replace(":class", o).replace(":escola", e).replace(":turno", a).replace(":badgeTurno", c).replace(":turma", n).replace(":vagas", t).replace(":vagaId", i).replace(":endereco", r)
                    }
                    , b = function (e) {
                        return [{
                            turno: "MANHA",
                            class: "badge-primary"
                        }, {
                            turno: "TARDE",
                            class: "badge-warning"
                        }, {
                            turno: "NOITE",
                            class: "badge-secondary"
                        }, {
                            turno: "INTEGRAL",
                            class: "badge-info"
                        }].filter(function (a) {
                            return a.turno == e
                        })[0].class
                    }
            }(jQuery, t, i, r, c)
    },
    pqX9: function (e, a, n) {
        var t, i, r, c = n("wFCU");
        t = jQuery,
            i = c.mountSelectOptions,
            r = t("#cidade_id"),
            t("#estado_id").on("change", function () {
                r.empty();
                var e = "/api/estados/:state_id/cidades".replace(":state_id", t(this).val());
                t.getJSON(e, function (e) {
                    var a = i(e, {
                        name: "Selecione uma cidade",
                        value: ""
                    });
                    r.prepend(a)
                })
            }),
            function (e) {
                var a = e("#tipo_documento")
                    , n = [".dados-certidao-antiga", ".dados-certidao-nova", "#box-cpf-dependente"];
                function t() {
                    n.forEach(function (a) {
                        e(a).hide().find("input, select").removeAttr("required")
                    })
                }
                function i(a) {
                    switch (a) {
                        case "NOVO":
                            e(n[1]).show().find("input, select").attr("required", !0);
                            break;
                        case "ANTIGO":
                            e(n[0]).show().find("input, select").attr("required", !0);
                            break;
                        default:
                            e(n[2]).show().find("input, select").attr("required", !0)
                    }
                }
                t(),
                    i(a.val()),
                    a.on("change", function () {
                        var a = e(this).val();
                        t(),
                            i(a)
                    })
            }(jQuery)
    },
    wFCU: function (e, a) {
        var n = function (e, a) {
            return "<option value=':value'>:name</option>".replace(":value", a).replace(":name", e)
        }
            , t = function (e) {
                return 0 === Object.keys(e).length
            };
        a.mountOption = n,
            a.mountSelectOptions = function (e) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                    , i = Object.keys(e).map(function (a) {
                        return n(e[a], a)
                    }).join("");
                return (t(a) ? n("Selecione...", "") : n(a.name, a.value)).concat(i)
            }
            ,
            a.isEmpty = t,
            a.getIdade = function (e) {
                var a = new Date
                    , n = new Date(e)
                    , t = a.getFullYear() - n.getFullYear()
                    , i = a.getMonth() - n.getMonth();
                return (i < 0 || 0 === i && a.getDate() < n.getDate()) && t-- ,
                    t
            }
    }
}, [0]);
