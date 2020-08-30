(function(){
    var $modal = null;
    var idQuizSelected = 0;
    
    
    renderModal();
    function init(idQuiz){
        $("#btnCreate").click(function(){
            $modal.modal('show');
        });
        idQuizSelected = idQuiz;
        loadPage(idQuiz);
    }
    function loadPage(idQuiz){
        axios
        .get(Base.URL_QUIZ+idQuiz, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("tokenAdmin"),
            },
        })
        .then(function (response) {
            // handle success
            renderQuestions(response.data.questionList,idQuiz);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
    function initQuiz(){
        axios
        .get(Base.URL_QUIZ, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("tokenAdmin"),
            },
        })
        .then(function (response) {
            // handle success
            renderQuiz(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
    function renderModal(){
        var optionsImage = '';
        Base.UrlImages.forEach(function(e){
            optionsImage = optionsImage + "<option value='"+e+"'>"+e+"</option>"
        })
        var html = `
                <div class="modal fade" id="staticModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true"
                data-backdrop="static">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticModalLabel">Tạo câu hỏi</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row form-group">
                                <div class="col col-md-3">
                                    <label for="select" class=" form-control-label">Chọn hình ảnh</label>
                                </div>
                                <div class="col-12 col-md-9">
                                    <select name="select" id="urlImage" class="form-control">
                                        <option value="0">Hãy chọn 1 ảnh</option>`+
                                        optionsImage
                                    +`</select>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col col-md-3">
                                    <label for="textarea-input" class=" form-control-label">Nội dung</label>
                                </div>
                                <div class="col-12 col-md-9">
                                    <textarea name="textarea-input" id="content" rows="9" placeholder="Nội dung câu hỏi..." class="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy bỏ</button>
                            <button type="button" class="btn btn-primary ok-button">Tạo mới</button>
                        </div>
                    </div>
                </div>
            </div>`;
        Base.renderModal({
            id: 'staticModal',
            html,
            okCallback : function(){
                create();
            },
            rendered: function($_modal) {
                $modal = $_modal;
                $("#btnCreate").click(function(){
                    $modal.modal('show');
                });
            },
        });
    }
    function renderQuiz(quizs){
        var html = '';
        quizs.forEach(function(e){
            html = html + " <option value='"+e.id+"'>"+e.name+"</option>";
        });
        $('#contentQuizs').append(html);
        $('#contentQuizs').on('change', function (e) {
            init(this.value);
        });
    }
    function renderQuestions(questions,idQuiz){
        var html = '';
        $('#contentQuestions').empty();
        questions.forEach(function(e){
            html = html + "<tr data-id='"+e.id+"' class=\"quiz tr-shadow\">\n" +
            "                                                <td>"+e.id+"</td>\n" +
            "                                                <td>"+e.content+"</td>\n" +
            "                                                <td>"+e.urlImage+"</td>\n" +
            "                                                \n" +
            "                                                <td>\n" +
            "                                                    <div class=\"table-data-feature\">\n" +
            "                                                        \n" +
            "                                                        <button data-id='"+e.id+"' class=\"item btn-delete\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\">\n" +
            "                                                            <i class=\"zmdi zmdi-delete\"></i>\n" +
            "                                                        </button>\n" +
            "                                                    </div>\n" +
            "                                                </td>\n" +
            "                                            </tr>\n" +
            "                                            <tr class=\"spacer\"></tr>"
        });
        $('#contentQuestions').append(html);
        $('.btn-delete').on('click', function (e) {
            var id = $(this).data("id");
            deleteQuestion(id,idQuiz);
        });
    }
    function deleteQuestion(id,idQuiz){
        axios
        .delete(Base.URL_QUESTION+id, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("tokenAdmin"),
            },
        })
        .then(function (response) {
            // handle success
            swal(
                "Thành công",
                 "Xóa thành công !!",
                  "success"
            ).then(function(){
                reload(idQuiz);
            })
        })
        .catch(function (error) {
            console.log(error)
            swal(
                "Thất bại",
                 "Xóa thất bại !!",
                  "error"
            );
        })
        .then(function () {
            // always executed
        });
    }
    function reload(idQuiz){
        init(idQuiz)
    }
    
    initQuiz();
    function create(){
        if(idQuizSelected === "0"){
            swal(
                "Thất bại",
                 "Hãy chọn 1 đợt ngoại kiểm cụ thể",
                  "error"
            );
            return;
        }
        var data = {
            idQuiz : idQuizSelected,
            urlImage: $modal.find('#urlImage').val(),
            content: $modal.find('#content').val()
        }
        axios
            .post(Base.URL_QUESTION, data, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("tokenAdmin"),
                },
            })
            .then(function (response) {
                reload(idQuizSelected);
                // handle success
                $modal.modal('hide');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
})();
