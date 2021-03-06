$(document).ready(function(){

    if (cartId == null){
        alert("Session Time Out !!!");
        window.open("index.html","_self");
    }

});

$("#confirm").click(function(){
    //alert('dddddd');

    var cartId = sessionStorage.getItem("cart_id");
    updateStock(cartId);
    createOrderH(cartId);


});

function createOrderH(cartId){

    var fullname = $("#fullname").val();
        var address1 = $("#address1").val();
        var address2 = $("#address2").val();
        var city = $("#city").val();
        var province = $("#province").val();
        var postcode = $("#post_code").val();
        var email = $("#email").val();

        var data = {
                                "fullname" : fullname,
                                "address1" : address1,
                                "address2" : address2,
                                "city" : city,
                                "province" : province,
                                "postcode" : postcode,
                                "email" : email,
                            }
        return $.ajax({
            "url" : "/rest/orderH/",
            "type" : "POST",
            "contentType" : "application/json; charset=utf-8",
            "data" : JSON.stringify(data),
            "success" : function(response) {
    //                alert(response.id);
                    createOrderD(cartId,response);
            },
            "error" : function(response) {
                         alert ('Error1');
            }
        });
}

function updateStock(cart_id){

    /*return $.ajax({
            "url" : "/stock/product/"+cart_id,
            "type" : "GET",
            "contentType" : "application/json; charset=utf-8",
            "data" : null,
            "success" : function() {
            },
            "error" : function(response) {
            }
        }); */

        $.getJSON("rest/stock/product/"+cart_id, function (data) {
        });
}


function createOrderD(cart_id,orderH){

    return $.ajax({
            "url" : "/rest/orderD/"+cart_id,
            "type" : "POST",
            "contentType" : "application/json; charset=utf-8",
            "data" : JSON.stringify(orderH),
            "success" : function() {
                    //alert('send mail');
                    sendEmail(cart_id,orderH);
            },
            "error" : function(response) {
                    //alert ('Fail to create order');
                    //sendEmail(cart_id,orderH);
            }
        });
}

function sendEmail(cart_id,orderH){

    return $.ajax({
            "url" : "/rest/order/email/"+cart_id,
            "type" : "POST",
            "contentType" : "application/json; charset=utf-8",
            "data" : JSON.stringify(orderH),
            "success" : function(response) {
                    sessionStorage.removeItem("cart_id");
                    window.open("thankyou.html","_self");
            },
            "error" : function(response) {
                    //alert ('Fail to send e-mail');
                    //sessionStorage.removeItem("cart_id");
                    //window.open("thankyou.html","_self");
            }
        });
}