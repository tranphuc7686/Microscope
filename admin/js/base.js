var Base = (function () {
    // var URL_BASE = 'http://127.0.0.1:8080';
    var URL_BASE = 'http://52.43.108.161:8181';
    var URL_QUIZ = URL_BASE + '/quiz/';
    var URL_USER = URL_BASE + '/user/';
    var URL_QUESTION = URL_BASE + '/question/';
    var URL_REPORTS = URL_QUIZ + 'reports/';

    var UrlImages = [
        'img/img1',
        'img/p01-01',
        'img/p01-02',
        'img/p01-03',
        'img/p01-04',
        'img/p01-05',
        'img/p01-06',
        'img/p01-07',
        'zoom/am-tinh',
        'zoom/giun-dua-va-giun-moc',
        'zoom/giun-luong',
        'zoom/giun-moc-v2',
        'zoom/giun-toc',
        'zoom/giunmoc',
        'zoom/sanheo',
        'zoom/teanie',
        'zoom/trung-san-la-gan-lon',
        'zoom/teanie',
    ]
    function renderSideBar() {
        var $sideBar = $("#side-bar");
        if($sideBar){
            $sideBar.append(
                ` <aside class="menu-sidebar d-none d-lg-block">
                <div class="logo">
                    <a href="#">
                        <img src="images/icon/logo.png" alt="Cool Admin" />
                    </a>
                </div>
                <div class="menu-sidebar__content js-scrollbar1">
                    <nav class="navbar-sidebar">
                        <ul class="list-unstyled navbar__list">
                            <li>
                                <a href="campaigns.html">
                                    <i class="fas fa-chart-bar"></i>Campaigns</a>
                            </li>
                            <li>
                                <a href="questions.html">
                                    <i class="fas fa-table"></i>Questions</a>
                            </li>
                            <li>
                                <a href="report.html">
                                    <i class="fas fa-table"></i>Reports</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>`
            );
        }
       
    }
    function renderSideBarForMobile() {
        var $sideMobile=   $("#side-bar-mobile");
        if($sideMobile){
            $("#side-bar-mobile").append(`
            <nav class="navbar-mobile">
            <div class="container-fluid">
                <ul class="navbar-mobile__list list-unstyled">
                    <li class="has-sub">
                        <a class="js-arrow" href="#">
                            <i class="fas fa-tachometer-alt"></i>Dashboard</a>
                        <ul class="navbar-mobile-sub__list list-unstyled js-sub-list">
                            <li>
                                <a href="index.html">Dashboard 1</a>
                            </li>
                            <li>
                                <a href="index2.html">Dashboard 2</a>
                            </li>
                            <li>
                                <a href="index3.html">Dashboard 3</a>
                            </li>
                            <li>
                                <a href="index4.html">Dashboard 4</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="chart.html">
                            <i class="fas fa-chart-bar"></i>Charts</a>
                    </li>
                    <li>
                        <a href="table.html">
                            <i class="fas fa-table"></i>Tables</a>
                    </li>
                    <li>
                        <a href="form.html">
                            <i class="far fa-check-square"></i>Forms</a>
                    </li>
                    <li>
                        <a href="calendar.html">
                            <i class="fas fa-calendar-alt"></i>Calendar</a>
                    </li>
                    <li>
                        <a href="map.html">
                            <i class="fas fa-map-marker-alt"></i>Maps</a>
                    </li>
                    <li class="has-sub">
                        <a class="js-arrow" href="#">
                            <i class="fas fa-copy"></i>Pages</a>
                        <ul class="navbar-mobile-sub__list list-unstyled js-sub-list">
                            <li>
                                <a href="login.html">Login</a>
                            </li>
                            <li>
                                <a href="register.html">Register</a>
                            </li>
                            <li>
                                <a href="forget-pass.html">Forget Password</a>
                            </li>
                        </ul>
                    </li>
                    <li class="has-sub">
                        <a class="js-arrow" href="#">
                            <i class="fas fa-desktop"></i>UI Elements</a>
                        <ul class="navbar-mobile-sub__list list-unstyled js-sub-list">
                            <li>
                                <a href="button.html">Button</a>
                            </li>
                            <li>
                                <a href="badge.html">Badges</a>
                            </li>
                            <li>
                                <a href="tab.html">Tabs</a>
                            </li>
                            <li>
                                <a href="card.html">Cards</a>
                            </li>
                            <li>
                                <a href="alert.html">Alerts</a>
                            </li>
                            <li>
                                <a href="progress-bar.html">Progress Bars</a>
                            </li>
                            <li>
                                <a href="modal.html">Modals</a>
                            </li>
                            <li>
                                <a href="switch.html">Switchs</a>
                            </li>
                            <li>
                                <a href="grid.html">Grids</a>
                            </li>
                            <li>
                                <a href="fontawesome.html">Fontawesome Icon</a>
                            </li>
                            <li>
                                <a href="typo.html">Typography</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        `);
        }
        
    }
    function renderModal(ops){
        var html = ops.html;
        $('body').append(html);
        var modal = $("#"+ops.id);
        ops.rendered(modal);
        modal.find('.ok-button').click(function(){
             if(ops.okCallback){
                ops.okCallback();
             }
        });
        modal.on('hidden.bs.modal', function (e) {
            if(ops.cancelCallBack){
                ops.cancelCallBack();
            }
        });
        // $(html).find('#staticModal').modal('show');
    }
    renderSideBar();
    renderSideBarForMobile();
    return {
        renderModal : renderModal,
        URL_QUIZ:URL_QUIZ,
        URL_USER:URL_USER,
        URL_BASE:URL_BASE,
        URL_QUESTION:URL_QUESTION,
        URL_REPORTS:URL_REPORTS,
        UrlImages:UrlImages

    }
})();
