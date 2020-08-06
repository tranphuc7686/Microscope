(function ($) {
    var url_string = window.location.href;
    var idQuestion = null;
    var url = new URL(url_string);
    var index = url.searchParams.get("index");

    function initScreen(index) {
        var dataJson = JSON.parse(localStorage.getItem("listQue"));
        var data = dataJson[index];
        this.idQuestion = data.id;
        var urlImage = data.urlImage;
        if(urlImage.includes("img/")){
            $('#myContainer').css('background-image', 'url("' + urlImage + '.png")');
        }
        else{
            Z.showImage("myContainer", urlImage);
        }
        $('#question').html(data.content);
        $('#numOfQuestion').html("Câu hỏi :" + index + "/" + (dataJson.length - 1));
        //
        if (index == 0) {
            $('#previous').css("display", "none");
        } else {
            if (index == dataJson.length - 1) {
                $('#next').css("display", "none");
            }
        }
        var idUser = localStorage.getItem("idUser");
        $.ajax({
            url: base_url + "question/" + this.idQuestion+"/"+idUser,
            type: 'GET',
            // Fetch the stored token from localStorage and set in the header
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            success: function (result) {
                if (result.answer != null) {
                    $('#answer').html(result.answer.content);
                }
            },
            error: function (xhr, textStatus, error) {
                if (xhr.status == 401) {
                    swal("Thất bại", "Bạn cần đăng nhập để tiếp tục !!", "error");
                }
            }
        });
    }

    initScreen(index);
    $('#submit').on("click", function (e) {
        $.blockUI({message: '<h1><img src="busy.gif" /> Just a moment...</h1>'});
        var contentAnswer = $.trim($("#answer").val());
        var idQuestion = self.idQuestion;
        var idUser = localStorage.getItem("idUser");
        var data = {
            contentAnswer: contentAnswer,
            idUser: idUser,
            idQuestion: idQuestion
        };
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": base_url + "answer/add",
            "method": "POST",
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "content-type": "application/json"
            },
            "processData": false,
            "data": JSON.stringify(data)
        };

        $.ajax(settings).done(function (response) {
            swal("Thành Công", "Gửi câu trả lời thành công!", "success")
                .then(
                    function () {
                        redirectToSurvey();
                    },
                    function () {
                        return false;
                    });

        }).fail(function (response) {
            if (response != 200) {
                swal("Thất bại", "Gửi câu trả lời thất bại!", "error");
            }

        }).always(function (response) {
            $.unblockUI();

        })
    });
    $('#next').on("click", function (e) {
        index = parseInt(index) + 1;
        window.location.href = "index.html?index=" + index;
    });
    $('#previous').on("click", function (e) {
        index = parseInt(index) - 1;
        window.location.href = "index.html?index=" + index;
    });

    function redirectToSurvey() {
        if (index == JSON.parse(localStorage.getItem("listQue")).length - 1) {
            window.location.href = "../survey/survey.html";
        }
    }


})(jQuery);
