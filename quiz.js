(function($) {
    function init(){
        axios
            .get(Base.URL_QUIZ, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("token"),
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
    init();
    function renderQuiz(quizs){
        var html = '';
        quizs.forEach(function(e){
            html = html + " <tr class=\"quiz odd\" data-id='"+e.id+"' class='odd'>\n" +
            "              <td>"+e.title+"</td>\n" +
            "              <td>\n" +
            "                "+e.name +
            "              </td>\n" +
            "              <td>"+e.startDate.substring(0,10)+"</td>\n" +
            "              <td>"+e.endDate.substring(0,10)+"</td>\n" +
            "            </tr>"
        })
        $('#content').append(html);
        $('.quiz').click(function(events){
            var id = $(this).data("id");
            getAllQuestion(id);
        });
    }
    function getAllQuestion(id){
        $.ajax({
            url: base_url +"quiz/"+id,
            type: 'GET',
            // Fetch the stored token from localStorage and set in the header
            headers: {"Authorization": "Bearer "+ localStorage.getItem("token")},
            success : function (result){
                console.log("getAllQuestion success");
                if(result.questionList.length){
                    localStorage.setItem("listQue",JSON.stringify(result.questionList));
                    window.location.href = "quiz/index.html?index=0";
                }
                else{
                    swal(
                        "Thất bại",
                         "Không có câu hỏi nào để tiếp tục !!",
                          "error"
                    );
                }
               
            },
            error: function(xhr, textStatus, error){
                if(xhr.status == 401){                   
                    swal(
                        "Thất bại",
                         "Bạn cần đăng nhập để tiếp tục !!",
                          "error"
                    );
                }
            }
        });
    }
})(jQuery);