
(function($) {
   function getDataQuestion(idQuiz) {
       $.ajax({
           url : "result.php", // gửi ajax đến file result.php
           type : "get", // chọn phương thức gửi là get
           dateType:"text", // dữ liệu trả về dạng text
           data : { // Danh sách các thuộc tính sẽ gửi đi
               idQuiz : idQuiz
           },
           success : function (result){
               // Sau khi gửi và kết quả trả về thành công thì gán nội dung trả về
               // đó vào thẻ div có id = result
               Z.showImage("myContainer", result.url);
               $('#result').html(result.questionContent);
           }
       });
   }
   getDataQuestion();



})(jQuery);
