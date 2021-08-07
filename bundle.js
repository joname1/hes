    $(document).ready(function () {
        var font = new FontFaceObserver('Simple');
        font.load(null, 50000).then(function () {
            $("#submit").show();
        });
    });

    toastr.options = {
        "debug": false,
        "positionClass": "toast-center-center",
        "onclick": null,
        "fadeIn": 300,
        "fadeOut": 1000,
        "timeOut": 2000,
        "extendedTimeOut": 1000
    }

    var colo = "#18140F";
    var fonts = "38px Simple";

    var canv = document.getElementById("myCanvas");
    var ctx = canv.getContext("2d");
    var imageUpload = document.getElementById('imageUpload');
    // var img2 = document.createElement("img");
    // img2.src = $('#upload').val();
    var imgInstance;

    function readUrl(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#upload').val(e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    // imageUpload.onchange = function () {
    //     readUrl(this);
    // }

    var btn = document.getElementById('submit');
    var screenBox = document.getElementById('makePic');
    var img = document.createElement("img");
    btn.onclick = function (event) {
        $("#submit").addClass("disabled");
        screenBox.src = '';
        var name = $('#input-name').val();
        var sex = $("#input-sex option:selected").val()
        var idcard = $('#input-idn').val();
        var age = $('#input-age').val() + '岁';
        var dates = $('#input-date').val();
        var id = Math.round(Math.random() * 1000) < 10 ? '9210710000' + Math.round(Math.random() * 1000) :
            '921071000' + Math.round(Math.random() * 1000);
        var name7 = $('#input-address').val();
        var sid = Math.round(Math.random() * 1000) < 10 ? '00' + Math.round(Math.random() * 1000) + '-2' : Math
            .round(Math.random() * 1000) + '-2';
        if (isNull(name)) {
            toastr.error("请填写姓名");
            $("#submit").removeClass("disabled");
            return false;
        }
        if (sex === '请选择') {
            toastr.error("请选择性别");
            $("#submit").removeClass("disabled");
            return false;
        }
        // var timestamp = Date.parse(new Date());
        // img2.src = $('#upload').val();
        img = new Image();
        img.crossOrigin = "*";
        img.src = $('#local').val();
        img.onload = function (canvas) {
            canv.width = img.width;
            canv.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            // var scale = img2.height / img2.width;
            // var cheight = 160 * scale;
            // ctx.drawImage(img2, 290, 35, 160, cheight);
            setName(ctx, 50, 110, dates); //date

            setName(ctx, 180, 270, name); //name
            setName(ctx, 180, 320, sex); //sex
            setName(ctx, 180, 368, age); //age

            setName(ctx, 1055, 270, idcard); //idcard
            setName(ctx, 1055, 320, id); //id
            setName(ctx, 1055, 368, sid); //sample-id

            setName(ctx, 2025, 270, dates + ' ' + '16:37'); //t1
            setName(ctx, 2025, 320, dates + ' ' + '19:58'); //t2
            setName(ctx, 2025, 368, dates + ' ' + '19:58'); //t3

            setName(ctx, 1410, 1515, dates + ' ' + '23:15'); //t4
            setName(ctx, 2030, 1515, dates + ' ' + '23:19'); //t5
            setsex(ctx);
            var dataUrl = canv.toDataURL('image/jpg', 1);
            screenBox.src = dataUrl;
        }
        $("#submit").removeClass("disabled");
        $("#modal-demo").attr("class", "modal active");

        function setName(context, left, top, name) {
            context.shadowColor = 'rgba(0, 0, 0, 0.4)';
            context.shadowBlur = 2;
            context.fillStyle = colo;
            context.font = fonts;
            context.textAlign = "left";
            // var lineWidth = 0;
            var initHeight = top;
            var lastSubStrIndex = 0;
            context.fillText(name.substring(lastSubStrIndex, name.length), left, initHeight);
            context.fill();
        }

        function setsex(context) {
            context.shadowColor = 'rgba(0, 0, 0, 0.4)';
            context.shadowBlur = 2;
            context.fillStyle = colo;
            context.font = fonts;
            var lineWidth = 0;
            var canvasWidth = 190; //计算canvas的宽度
            var initHeight = 168; //绘制字体距离canvas顶部初始的高度
            var lastSubStrIndex = 0; //每次开始截取的字符串的索引
            for (var i = 0; i < name7.length; i++) {
                lineWidth += context.measureText(name7[i]).width;
                if (lineWidth > canvasWidth) {
                    context.fillText(name7.substring(lastSubStrIndex, i), '100', initHeight); //绘制截取部分
                    initHeight += 23; //25为字体的高度
                    lineWidth = 0;
                    canvasWidth = 190;
                    lastSubStrIndex = i;
                }
                if (i == name7.length - 1) { //绘制剩余部分
                    context.fillText(name7.substring(lastSubStrIndex, i + 1), '100', initHeight);
                }
            }
            context.stroke();
        }

        function isNull(str) {
            if (str == "") return true;
            var regu = "^[ ]+$";
            var re = new RegExp(regu);
            return re.test(str);
        }

    }

    function closegif() {
        $("#modal-demo").attr("class", "modal");
    }

    function getpdf() {
        var sources = document.getElementById('makePic')
        var jpdf = new jsPDF();
        jpdf.addImage(sources, 'JPEG', 10, 40, 192, 132, '', 'FAST')
        jpdf.save("report.pdf");
    }
