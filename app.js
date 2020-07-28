(function($) {

  $("#container-menu").append("<ul class=\"nav navbar-nav\">\n" +
      "    <li class=\"active\"><a href=\"index.html\"><i class=\"fa fa-home\"></i></a></li>\n" +
      "    <li><a href=\"intro.html\">GIỚI THIỆU</a></li>\n" +
      "    <li class=\"dropdown\">\n" +
      "        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">NGOẠI KIỂM <b class=\"caret\"></b></a>\n" +
      "        <ul class=\"dropdown-menu\">\n" +
      "            <li><a href=\"lich-thuc-hien.html\">CHƯƠNG TRÌNH THỬ NGHIỆM NGOẠI KIỂM KST BẰNG TIÊU BẢN ẢO</a></li>\n" +
      "            <li><a href=\"lich-thuc-hien.html\">LỊCH THỰC HIỆN</a></li>\n" +
      "            <li><a href=\"huong-dan-ngoai-kiem.html\">HƯỚNG DẪN NGOẠI KIỂM</a></li>\n" +
      "            <li><a href=\"dang-ki-thiet-bi.html\">ĐĂNG KÍ THIẾT BỊ</a></li>\n" +
      "        </ul>\n" +
      "    </li>\n" +
      "    <li class=\"dropdown\">\n" +
      "        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">TÀI LIỆU <b class=\"caret\"></b></a>\n" +
      "        <ul class=\"dropdown-menu\">\n" +
      "            <li><a href=\"daotao/ancylostoma.html\"><i>Ancylostoma duodenale/Necator americanus</i></a></li>\n" +
      "            <li><a href=\"daotao/taenia.html\"><i>Taenia solium</i></a></li>\n" +
      "            <li><a href=\"daotao/saginata.html\"><i>Taenia saginata</i></a></li>\n" +
      "            <li><a href=\"daotao/ascaris.html\"><i>Ascaris lumbricoides</i></a></li>\n" +
      "            <li><a href=\"daotao/trichuris.html\"><i>Trichuris trichiura</i></a></li>\n" +
      "            <li><a href=\"daotao/enterobius.html\"><i>Enterobius vermicularis</i></a></li>\n" +
      "            <li><a href=\"daotao/strongyloides.html\"><i>Strongyloides stercoralis</i></a></li>\n" +
      "            <li><a href=\"daotao/giardia.html\"><i>Giardia Lamblia</i></a></li>\n" +
      "            <li><a href=\"daotao/fasciola.html\"><i>Fasciola gigantica/Fasciola hepatica</i></a></li>\n" +
      "            <li><a href=\"../daotao/timkisinhtrung.html\"><i>Tài liệu - KỸ THUẬT XÉT NGHIỆM PHÂN TÌM KÝ SINH TRÙNG</i></a></li>\n" +
      "        </ul>\n" +
      "    </li>\n" +
      "\n" +
      "</ul>");

  $('#btnSubmitLogin').on('click',(function(e)
  {
    $.blockUI({ message: '<h1><img src="busy.gif" /> Just a moment...</h1>' });

    email = $('#email').val();
    password =  $('#password').val();

    e.preventDefault();
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": base_url +"authenticate",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "0491f917-1f54-fc06-1103-84fda7385f29"
      },
      "processData": false,
      "data": "{\n\t\"username\":\""+email+"\",\n\t\"password\":\""+password+"\"\n}\n"
    };

    $.ajax(settings).done(function (response) {
      $.unblockUI();
      localStorage.setItem("token",response["jwttoken"]);
      localStorage.setItem("idUser",response["idUser"]);
      localStorage.setItem("idQuiz",0);
      swal("Thành Công", "Đăng nhập thành công!", "success");
    }).fail(function (response) {
        if(response != 200){
          swal("Thất bại", "Đăng nhập thất bại!", "error");
        }


    }).always(function () {
      $.unblockUI();
    });
  }))
  $('#btnDangki').on('click',function (e) {
    $.blockUI({ message: '<h1><img src="busy.gif" /> Just a moment...</h1>' });
    var name = $.trim($("#username").val());
    var pass = $.trim($("#unit_name").val());
    var rePass = $.trim($("#re_unit_name").val());
    if(pass !== rePass){
      swal("Thất bại", "Nhập pass không trùng nhau !!", "error");
      $.unblockUI();
      return;
    }
    var data = {
      userName: name,
      pass: pass
    };
    e.preventDefault();
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": base_url +"users/add",
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "processData": false,
      "data": JSON.stringify(data)
    };

    $.ajax(settings).done(function (response) {
      swal("Thành Công", "Đăng kí thành công!", "success");
    }).fail(function (response) {
      if (response != 200) {
        swal("Thất bại", "Đăng kí không thanfhh công", "error");
      }
    }).always(function (response) {
      $.unblockUI();

    })
  });

  $('#btnCreateDevices').on('click',function (e) {
    $.blockUI({ message: '<h1><img src="busy.gif" /> Just a moment...</h1>' });
    var id = $.trim($("#username").val());
    var devices = $.trim($("#unit_name").val());

    var data = {
      id: id,
      devices: devices
    };
    e.preventDefault();
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": base_url +"users/devices",
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "processData": false,
      "data": JSON.stringify(data)
    };

    $.ajax(settings).done(function (response) {
      swal("Thành Công", "Đăng kí thiết bị thành công!", "success");
    }).fail(function (response) {
      if (response != 200) {
        swal("Thất bại", "Đăng kí thiết bị bại", "error");
      }
    }).always(function (response) {
      $.unblockUI();

    })
  });


})(jQuery);
