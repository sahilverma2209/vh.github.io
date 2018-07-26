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
    $('.item_directory').html('Home > Products > '+directory_tag+' > '+prod_code);

    console.log(product_list);
    for(var i=1; i<product_list.length; i++){
        if(product_list[i]['FIELD3']==prod_code){
            item_details=product_list[i];
            break;
        }
    }

    // console.log(item_details);
    var img_ref = '../assets/'+category+'/'+prod_code+'.jpg';
    $(".img_box").append('<center><img src="'+img_ref+'" id="item_image_style" /></center>');

    // check height and width to adjust css ------------
    var check=document.getElementById('item_image_style');
    console.log('element = ',check);
    check.addEventListener('load', function() {
        console.log('My width is: ', this.naturalWidth);
        console.log('My height is: ', this.naturalHeight);
        
        if(this.naturalHeight>this.naturalWidth){
            $(this).css("height", "90%");
            $(this).css("width", "auto");

            // vertically centering the image 
            var ph = $('.img_box').height();
            var ih = $('#item_image_style').height();
            var mtop = (ph-ih)/2+'px';
            $(this).css('margin-top', mtop );


        }else{
            $(this).css("width", "90%");
            $(this).css("height", "auto");

            // vertically centering the image 
            var ph = $('.img_box').height();
            var ih = $('#item_image_style').height();
            var mtop = (ph-ih)/2+'px';
            $(this).css('margin-top', mtop );
            var max_ht = ph-15+'px';
            $(this).css('max-height', max_ht );

        }
        
    });
    
    $(".item_name").html(item_details['FIELD2']);
    $(".item_code").html(item_details['FIELD3']);
    $(".item_dimensions").html(item_details['FIELD4']+'cm x '+item_details['FIELD5']+'cm x '+item_details['FIELD6']+'cm');

    
    
});
