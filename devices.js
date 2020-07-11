(function ($) {
    $('input[type=radio]').click(function () {
        if (this.previous) {
            this.checked = false;
        }
        this.previous = this.checked;
    });

    function initScreen() {
        $.blockUI({message: '<h1><img src="busy.gif" /> Just a moment...</h1>'});

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": base_url + "users/" + localStorage.getItem("idUser"),
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            "processData": false
        };

        $.ajax(settings).done(function (response) {
if(!response.devices)
return;
            let devices = response.devices.split('-');
            let checkBoxes = [];
            checkBoxes = $("input[type='radio']");
            _.forEach(devices, function (value) {
                checkBoxes.get(parseInt(value)).click();
            });
            //set name
            $('#nameUser').text('Tên sinh viên: '+response.email);
        }).fail(function (response) {
            if (response != 200) {
                swal("Thất bại", "Lỗi, vui lòng liên hệ admin", "error");
            }
        }).always(function (response) {
            $.unblockUI();

        })
    }

    initScreen();

    $('#btnCreateDevices').on('click', function (e) {
        $.blockUI({message: '<h1><img src="busy.gif" /> Just a moment...</h1>'});
        var devices = _.map($('input[type="radio"]:checked'), function (n) {
            return n.value;
        });
        devices = _.join(devices, '-');
        var data = {
            id: localStorage.getItem("idUser"),
            devices: devices
        };
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": base_url + "users/devices",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            "processData": false,
            "data": JSON.stringify(data)
        };

        $.ajax(settings).done(function (response) {
            swal("Thành Công", "Đăng kí thiết bị thành công!", "success");
        }).fail(function (response) {
            if (response.status == 401) {
                swal("Thất bại", "Bạn cần đăng nhập để thao tác", "error");
                return;
            }
            if (response != 200) {
                swal("Thất bại", "Đăng kí thiết bị bại", "error");
            }
        }).always(function (response) {
            $.unblockUI();

        })
    });


})(jQuery);
