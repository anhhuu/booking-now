jQuery(function() {
    $('#btn-booking').click(function() {
        // if (!user) {
        $('#loginModal').modal("show");
        // }
        // else {
        // $("#ConfirmModal").modal("show");
        // }
    })
    $("#btn-cancel-desktop").click(function() {
        $("#ConfirmModal").modal("hide");
    });
    $("#btn-ok-desktop").click(function() {
        $("#ConfirmModal").modal("hide");
        // if(tiepnhanthanhcong){        
        // $('#AlertModal').modal("show");
        // }
    });
});


// function n(n, t) {
//     n.length == 0 && (n = "THÔNG BÁO");
//     $("#tvTitle").html(n);
//     $("#tvBody").html(t);
//     $("#AlertModal").modal("show")
// }

// function t(n) {
//     $("#txtErMessage").html(n)
// }

// function i(n, t) {
//     $("#tvThongBao").html(n);
//     $("#tvSoNguoiDenDesktop").html(t.soNguoiDen + " người lớn");
//     $("#tvSoNguoiDenTreEmDesktop").html(t.soTreEm + " trẻ em");
//     $("#tvNgayDenDesktop").html(t.ngayDen);
//     $("#tvGioDenDesktop").html(t.gioDen);
//     $("#ConfirmModal").modal("show")
// }

// function r() {
//     var u = $("#txtArticleId").val(),
//         t, i, r;
//     return u == 0 ? (n("", "Vui lòng chọn nhà hàng bạn muốn đặt chỗ."), !1) : (t = $("#txtSoNguoiLon").val(), t < 0) ? (n("", "Số người lớn không hợp lệ."), !1) : (i = $("#txtSoTreEm").val(), i < 0) ? (n("", "Số trẻ em không hợp lệ."), !1) : (r = $("#txtNgayDen").val(), r.length < 10) ? (n("", "Thời gian đặt chỗ không hợp lệ."), !1) : !0
// }
// $("#txtNgayDen").change(function() {
//     formatDateSearchFast($("#txtNgayDen").val())
// });
// $("#btn-booking").click(function() {
//     if (r()) {
//         var f = getHost() + "Booking/ValidateReserve",
//             u = {
//                 articleId: $("#txtArticleId").val(),
//                 soNguoiDen: $("#txtSoNguoiLon").val(),
//                 soTreEm: $("#txtSoTreEm").val(),
//                 ngayDen: $("#txtNgayDen").val(),
//                 gioDen: $("#txtGioDen").val(),
//                 currentUrl: window.location.href.toString()
//             };
//         $.ajax({
//             type: "POST",
//             url: f,
//             data: JSON.stringify(u),
//             dataType: "json",
//             contentType: "application/json; charset=utf-8",
//             success: function(r) {
//                 r.IsLog && insertBookingLog(r.Message);
//                 switch (r.Type) {
//                     case 1:
//                         n(r.TieuDe, r.Message);
//                         break;
//                     case 2:
//                         t(r.Message);
//                         break;
//                     case 3:
//                         i(r.Message, u)
//                 }
//             },
//             error: function() {
//                 n("Đặt chỗ không thành công", "Rất tiếc bạn đã đặt chỗ không thành công.")
//             }
//         })
//     }
// });
// $("#btn-cancel-desktop").click(function() {
//     $("#ConfirmModal").modal("hide")
// });
// $("#btn-ok-desktop").click(function() {
//     $("#ConfirmModal").modal("hide");
//     var t = getHost() + "Booking/AddCheckIn",
//         i = {
//             articleId: $("#txtArticleId").val(),
//             soNguoiDen: $("#txtSoNguoiLon").val(),
//             soTreEm: $("#txtSoTreEm").val(),
//             ngayDen: $("#txtNgayDen").val(),
//             gioDen: $("#txtGioDen").val(),
//             ghiChu: $("#txtGhichu").val(),
//             loaiCheckin: $("#txtLoaiDatChoDK").val()
//         };
//     $.ajax({
//         type: "POST",
//         url: t,
//         data: JSON.stringify(i),
//         dataType: "json",
//         contentType: "application/json; charset=utf-8",
//         success: function(t) {
//             t.IsLog && insertBookingLog(t.Message);
//             n(t.TieuDe, t.Message)
//         },
//         error: function() {
//             n("Đặt chỗ không thành công", "Rất tiếc bạn đã đặt chỗ không thành công.")
//         }
//     })
// })