(function(){
    var $modal = null;
    function init(){
        renderModal();
        
    }
    function renderModal(){
        var html = `
                <div class="modal fade" id="staticModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true"
                data-backdrop="static">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticModalLabel">Đăng nhập</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Tên tài khoản:</label>
                                <input type="text" class="form-control" id="email">
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Mật khẩu:</label>
                                <input type="password" class="form-control" id="password">
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
                login();
            },
            rendered: function($_modal) {
                $modal = $_modal;
                $modal.modal('show');
            },
        });
    }
    function login(){
        var data = {
            username: $modal.find('#email').val(),
            password: $modal.find('#password').val(),
        }
        axios.post(Base.URL_BASE+"/authenticate",data)
            .then(function (response) {
                // handle success
                localStorage.setItem("tokenAdmin",response.data["jwttoken"]);
                location.href = "index.html"
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