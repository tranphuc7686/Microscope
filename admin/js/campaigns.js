(function(){
    var $modal = null;
    function init(){
        renderModal();
        $("#btnCreate").click(function(){
            $modal.modal('show');
        });
        axios
            .get(Base.URL_QUIZ, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("tokenAdmin"),
                },
            })
            .then(function (response) {
                // handle success
                renderPage(response.data);
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
        var html = `
                <div class="modal fade" id="staticModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true"
                data-backdrop="static">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticModalLabel">Tạo đợt mới</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row form-group">
                                <div class="col col-sm-5">
                                    <label for="input-small" class=" form-control-label">Đợt</label>
                                </div>
                                <div class="col col-sm-6">
                                    <input type="text" id="title" name="input-normal"  class="input-sm form-control-sm form-control">
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col col-sm-5">
                                    <label for="input-normal" class=" form-control-label">Tên chương trình</label>
                                </div>
                                <div class="col col-sm-6">
                                    <input type="text" id="name" name="input-normal"  class="form-control">
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col col-sm-5">
                                    <label for="input-large" class=" form-control-label">Ngày bắt đầu</label>
                                </div>
                                <div class="col col-sm-6">
                                    <input type="date" id="startDate" name="input-normal"  class="input-sm form-control-sm form-control">
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col col-sm-5">
                                    <label for="input-large" class=" form-control-label">Ngày kết thúc</label>
                                </div>
                                <div class="col col-sm-6">
                                    <input type="date" id="endDate" name="input-normal" class="input-sm form-control-sm form-control">
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
            },
        });
    }
    function renderPage(quizs){
        var html = '';
        quizs.forEach(function(e){
            html = html + "<tr data-id='"+e.id+"' class=\"quiz tr-shadow\">\n" +
            "                                                <td>"+e.title+"</td>\n" +
            "                                                <td>\n" +
            "                                                    <span class=\"block-email\">"+e.name +"</span>\n" +
            "                                                </td>\n" +
            "                                                <td>"+e.startDate.substring(0,10)+"</td>\n" +
            "                                                <td>"+e.endDate.substring(0,10)+"</td>\n" +
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
        })
        $('#content').append(html);
        $('.btn-delete').click(function(events){
            var id = $(this).data("id");
            deleteQuiz(id);
        });
    }
    function deleteQuiz(id){
        axios
        .delete(Base.URL_QUIZ+id, {
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
                reload();
            });
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
    function reload(){
        $("#content").empty();
        init();
    }
    function create(){
        var data = {
            title: $modal.find('#title').val(),
            name: $modal.find('#name').val(),
            startDate: $modal.find('#startDate').val(),
            endDate: $modal.find('#endDate').val(),
        }
        axios
            .post(Base.URL_QUIZ, data, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("tokenAdmin"),
                },
            })
            .then(function (response) {
                reload();
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
    init();
})();