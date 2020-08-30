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
            var reports = [
                {
                    id: 1,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV01-02062020'
                },
                {
                    id: 2,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV02-03062020'
                },
                {
                    id: 3,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV03-02062020'
                },
                {
                    id: 4,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV04-03062020'
                },
                {
                    id: 5,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV05-04062020'
                },
                {
                    id: 6,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV06-03062020'
                },
                {
                    id: 7,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV07-03062020'
                },
                {
                    id: 8,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV08-02062020'
                },
                {
                    id: 9,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV09-03062020'
                },
                {
                    id: 10,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV10-04062020'
                },
                {
                    id: 11,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV11-03062020'
                },
                {
                    id: 12,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV12-03062020'
                },
                {
                    id: 13,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV13-02062020'
                },
                {
                    id: 14,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV14-03062020'
                },
                {
                    id: 15,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV15-03062020'
                },
                {
                    id: 16,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV16-02062020'
                },
                {
                    id: 17,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV17-03062020'
                },
                {
                    id: 18,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV18-03062020'
                },{
                    id: 19,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV19-03062020'
                },{
                    id: 20,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV20-03062020'
                },{
                    id: 21,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV21-02062020'
                },{
                    id: 22,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV22-03062020'
                },{
                    id: 23,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV23-04062020'
                },
                {
                    id: 24,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV24-03062020'
                },
                {
                    id: 25,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV25-04062020'
                },
                {
                    id: 26,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV26-03062020'
                },
                {
                    id: 27,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV27-03062020'
                },
                {
                    id: 28,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV28-03062020'
                },
                {
                    id: 29,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV29-02062020'
                },
                {
                    id: 30,
                    departmentId:'DN0101',
                    sendTime:new Date().toString(),
                    fileName:'Report-PDV30-03062020'
                }
            ];
            renderReports(reports,idQuiz);
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
        var $contentQuiz = $('#contentQuizs');
        quizs.forEach(function(e){
            html = html + " <option value='"+e.id+"'>"+e.name+"</option>";
        });
        $contentQuiz.append(html);
        $contentQuiz.on('change', function (e) {
            init(this.value);
        });
    }
    function renderReports(reports,idQuiz){
        var html = '';
        var $contentReport = $('#contentReports');
        $contentReport.empty();
        reports.forEach(function(e){
            html = html + "<tr id='"+e.id+"' data-id='"+e.id+"' class=\"quiz tr-shadow\">\n" +
            "                                                <td>"+e.id+"</td>\n" +
            "                                                <td>"+idQuiz+"</td>\n" +
            "                                                <td>"+e.departmentId+"</td>\n" +
            "                                                <td>"+e.sendTime+"</td>\n" +
            "                                                <td class='file-name'>"+e.fileName+"</td>\n" +
            "                                                \n" +
            "                                                <td>\n" +
            "                                                    <div class=\"table-data-feature\">\n" +
            "                                                        \n" +
            "                                                        <button  data-id='"+e.id+"' class=\"item btn-download\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Download\">\n" +
            "                                                            <i class=\"zmdi zmdi-download\"></i>\n" +
            "                                                        </button>\n" +
            "                                                    </div>\n" +
            "                                                </td>\n" +
            "                                            </tr>\n" +
            "                                            <tr class=\"spacer\"></tr>"
        });
        $contentReport.append(html);
        $('.btn-download').on('click', function (e) {
            var reportId = $(this).data("id");
            var reportName =$("#"+reportId).find('.file-name').text() ;
            dowloadReport(reportName);
        });
    }


    function dowloadReport(reportName) {
        axios
            .get(Base.URL_REPORTS + reportName, {
                responseType: 'arraybuffer',
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("tokenAdmin"),
                },
            })
            .then(function (response) {
                // handle success
                const type = response.headers['content-type']
                const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = reportName+'.docx';
                link.click();
            })
            .catch(function (error) {
                swal(
                    "Thất bại",
                    "Tải tập tin thất bại !!",
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
        };
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
