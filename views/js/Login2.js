$(document).ready(function() {
    var i = 2;
    $("#btnDK").on("click", function() {
        $("#myModal").modal();
    });

    function kiemTraHT() {
        var re = /^[A-Z]{1}[a-z]+(\s[A-Z]{1}([a-z]+))*$/;
        if ($("#txtHT").val() == "") {
            $("#tbTen").html("Bắt buộc nhập");
            $("#tbTen").addClass("mauDo");
            return false;
        }
        if (!re.test($("#txtHT").val())) {
            $("#tbTen").html("Chu cai dau moi tu phai viet hoa");
            $("#tbTen").addClass("mauDo");
            return false;
        }
        $("#tbTen").html("*");
        return true;
    }
    $("#txtHT").blur(kiemTraHT);

    

    function kiemTraQQ() {
        var re = /^[A-Z]*(\s[A-Z]+)*$/;
        if ($("#txtQQ").val() == "") {
            $("#tbQQ").html("Bắt buộc nhập");
            $("#tbQQ").addClass("mauDo");
            return false;
        }
        if (!re.test($("#txtQQ").val())) {
            $("#tbQQ").html("Quê quán chữ in hoa");
            $("#tbQQ").addClass("mauDo");
            return false;
        }
        $("#tbQQ").html("*");
        return true;
    }
    $("#txtQQ").blur(kiemTraQQ);

    function kiemTraEmail() {
        var re = /[A-Za-z0-9-_.]*(@gmail.com)/;
        if ($("#txtEmail").val() == "") {
            $("#tbEmail").html("Bắt buộc nhập");
            $("#tbEmail").addClass("mauDo");
            return false;
        }
        if (!re.test($("#txtEmail").val())) {
            $("#tbEmail").html("Email phải đúng định dạng");
            $("#tbEmail").addClass("mauDo");
            return false;
        }
        $("#tbEmail").html("*");
        return true;
    }
    $("#txtEmail").blur(kiemTraEmail);

    function kiemTraSDT() {
        var re = /^0[0-9]{9}/;
        if ($("#txtDT").val() == "") {
            $("#tbDT").html("Bắt buộc nhập");
            $("#tbDT").addClass("mauDo");
            return false;
        }
        if (!re.test($("#txtDT").val())) {
            $("#tbDT").html("Số điện thoại gồm 10 số và bắt đầu bằng số 0");
            $("#tbDT").addClass("mauDo");
            return false;
        }
        $("#tbDT").html("*");
        return true;
    }
    $("#txtDT").blur(kiemTraSDT);
    $("#btnSave").click(function() {
        if (!kiemTraHT() || !kiemTraEmail() || !kiemTraQQ() || !kiemTraSDT()) {
            alert("Vui lòng kiểm tra lại thông tin đã nhập");
            return false;
        }
        var ht = $("#txtHT").val();
        var qq = $("#txtQQ").val();
        var email = $("#txtEmail").val();
        var dt = $("#txtDT").val();
        var anh = $("#txtAnh").val();
        var them = "<tr><td>" + (i++) + "</td><td>" + ht + "</td><td>" + qq + "</td><td>" + email + "</td><td>" + dt +
            "</td><td>" + anh + "</td></tr>"
        $("table").append(them);
        $("#myModal").modal("hide");
        return true;
    });
});