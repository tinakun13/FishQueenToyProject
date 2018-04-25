

    function getAge(){
                // EXTRACT JSON DATA.
                $.getJSON("rest/age", function (data) {
                    $.each(data, function (index, value) {
                        // APPEND OR INSERT DATA TO SELECT ELEMENT.
                        $('#age').append('<option value="' + value.id + '">' + value.age_name + '</option>');
                    });
                });
    }

    function getGender(){
                // EXTRACT JSON DATA.
                $.getJSON("rest/gender", function (data) {
                    $.each(data, function (index, value) {
                        // APPEND OR INSERT DATA TO SELECT ELEMENT.
                        $('#gender').append('<option value="' + value.id + '">' + value.gender_name + '</option>');
                    });
                });
    }
    function getProductInit(){
                renderProduct(10,1,1,1,1);
                var age = "all";
                var gender = "all";
                $.getJSON("rest/product/"+age+"/"+gender, function (data) {
                $( "#searchResult" ).text(data.length+" Toy Found");
                //renderProduct(data.length,data.id,data.product_name,data.price,data.availability);

                });


    }
    function getProduct(age,gender){

                $.getJSON("rest/product/"+age+"/"+gender, function (data) {
                $( "#searchResult" ).text(data.length+" Toy Found");
                });

    }


    $( "#btnSearch" ).click(function() {
                var age = $( "#age" ).val();
                var gender =$( "#gender" ).val();
                getProduct(age,gender);
    });//end change qty

    getAge();
    getGender();
    getProductInit();


    function renderProduct(searchResult,id,product_name,price,availability) {
    for(var i=1 ; i <= searchResult ; i++){
        var card  = "<div class='card float-left' style='width: 18rem;'>";
            card += "<img class='card-img-top' src='"+id[i]+".jpg' alt='Card image cap'>";
            card += "<div class='card-body'>";
            card += "<h5 class='card-title' id='productName'>"+product_name[i]+"</h5>";
            card += "<p class='card-text' id='productDetail'>"+price[i]+"</p>";
            card += "<a href='product_detail/"+price[i]+"' class='btn btn-chelsea float-right'>Product Detail</a>";
            card += "</div>";
            card += "</div>";
        $("#searchResultArea").append(card);     // Append new elements
    }

    }




