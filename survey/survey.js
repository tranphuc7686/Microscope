(function ($) {
    function getDataRadio() {
        let resulf = [];

        let dataQuestion = $(".question").parent();
        let idUser = localStorage.getItem("idUser");
        $.each(dataQuestion, function (index, value) {
            let radio = _.find($(value).parent().children(), function (value) {
                if (value.control != undefined) {
                    return value.control.checked == true;
                }
            });
            let answer = '';
            if (radio != undefined) {
                answer = radio.innerText;
                if (answer == 'Ý kiến khác') {
                    answer = $(radio).parent().children().last().val();
                }

            }
            if (index == 8) {
                answer = $(value).parent().children().get(2).value
            }
            resulf.push({
                stt: index,
                answer: answer
            });

        });
        return {
            survey: JSON.stringify(resulf),
            idUser: idUser
        };
    }

    $('#btnSubmit').on('click', (function (e) {
        addListSurvey();
    }));
    $('input[type=radio]').click(function () {
        if (this.parentElement.innerText == 'Ý kiến khác') {
            $(this.parentElement.parentElement).children().last().prop('disabled', false);
        } else {
            $(this.parentElement.parentElement).children().last().val("");
            $(this.parentElement.parentElement).children().last().prop('disabled', true);
        }
    });

    function addListSurvey() {
        $.blockUI({message: '<h1><img src="busy.gif" /> Just a moment...</h1>'});
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": base_url + "survey/add",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            "processData": false,
            "data": JSON.stringify(getDataRadio())
        };

        $.ajax(settings).done(function (response) {
            swal("Thành Công", "Gửi thành công khảo sát", "success");
        }).fail(function (response) {
            if (response != 200) {
                swal("Thất bại", "Gửi khảo sát lỗi", "error");
            }
        }).always(function (response) {
            $.unblockUI();

        })
    }

    function initScreen() {
        $.blockUI({message: '<h1><img src="busy.gif" /> Just a moment...</h1>'});
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": base_url + "survey/" + localStorage.getItem("idUser"),
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            "processData": false
        };

        $.ajax(settings).done(function (response) {
            if(response != ""){
                response = JSON.parse(response);
                let dataQuestion = [];
                dataQuestion = $('.question');
                $.each(response, function (index, value) {
                    let question = dataQuestion.get(index);
                    let listChildren = $(question).parent().parent().children();
                    if (value.answer != "") {
                        let elementRadio = _.find(listChildren, function (o) {
                            return o.innerText == value.answer;

                        });
                        if (elementRadio == undefined && value.answer != '') {
                            listChildren.last().val(value.answer);
                            let control = listChildren.get(listChildren.length - 2).control;
                            if (control != undefined) {
                                control.click();
                            }

                        } else {
                            elementRadio.control.checked = true;
                        }
                    }

                });
            }

        }).fail(function (response) {
            if (response != 200) {
                swal("Thất bại", "Lỗi lấy dữ liệu khảo sát", "error");
            }
        }).always(function (response) {
            $.unblockUI();

        })
    }

    initScreen();
})(jQuery);
