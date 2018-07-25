var item = location.hash;
item = item.replace(/%20/g, " ");
var prod_code="";
var category="";

//get category
for(var i=1;i<item.length;i++){
    category=category+item[i];
    if(item[i] == "#"){
        break;
    }
}
category = category.slice(0,category.length-1);

//get product code
for(var i=1;i<item.length;i++){
    if(item[i] == "#"){
        for(var k=i+1; k<item.length;k++){
            prod_code = prod_code+item[k];
        }
    }
}

console.log(category);
console.log(prod_code);
var item_details={};
define([category], function(){

    // initialize directory link
    $('.item_directory').html('Home > Products > '+category+' > '+prod_code);

    console.log(product_list);
    for(var i=1; i<product_list.length; i++){
        if(product_list[i]['FIELD3']==prod_code){
            item_details=product_list[i];
            break;
        }
    }

    // console.log(item_details);
    $(".item_name").html('Product Name : '+item_details['FIELD2']);
    $(".item_code").html('Product Code : '+item_details['FIELD3']);
    $(".item_dimensions").html('Dimensions : '+item_details['FIELD4']+'x'+item_details['FIELD5']+'x'+item_details['FIELD6']);
    
});
