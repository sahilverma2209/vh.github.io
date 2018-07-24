var product = location.hash;
var length = product.length;
product = product.slice(1,length);

var selected_page = 1;

define([product], function(){
    var length = product_list.length-1;
    console.log('length', length);
    var pages = Math.ceil(length/8);
    console.log('pages = ', pages);
    var page_sections = Math.ceil(pages/9); 
    console.log('page_sections = ', page_sections);
    var nb = 9;
    
    // initialize directory link
    $('.directory').html('Home > Products > '+product+'');


    // initialize page buttons
    
    if(page_sections >1){
        for(var i=selected_page; i<= nb ; i++){
            $('.pagination').append('<button class="pb" data-id="'+i+'" id="page'+i+'">'+i+'</button>');
        }    
    } 
    else{
        for(var i=selected_page; i<= pages ; i++){
            $('.pagination').append('<button class="pb" data-id="'+i+'" id="page'+i+'">'+i+'</button>');
        }  
    }
    $("#page1").addClass("selected_button");

    // initialize images for page 1
    var display_products = product_list.slice((selected_page*8)-7, (selected_page*8)+1);
    for(var x=1; x<=8; x++){
        var div = '#p'+x;
        // $(div).append('<div id='+x+'>'+display_products[x-1]['FIELD2']+'</div>');
        $(div).append('<a class="prod_link" id="a'+x+'" href="item.html#'+product+'#'+display_products[x-1]['FIELD3']+'"><div class="prod_box"><div class="prod_img"></div><div class="prod_desc" id="'+x+'">'+display_products[x-1]['FIELD2']+'</div><div class="prod_id" id="i'+x+'">'+display_products[x-1]['FIELD3']+'</div></div></a>');
    }

    
    $(".pb").click(function(){
        $('.pb').removeClass("selected_button");
        

        selected_page = parseInt($(this).html());  
        console.log('selected pg = ',selected_page);
        var id = $(this).attr('id');

        if(id !== 'page9')$(this).addClass("selected_button");

        //update images 
        var display_products = product_list.slice((selected_page*8)-7, (selected_page*8)+1);
        console.log(product_list);
        console.log(display_products);
        for(var x=1; x<=8; x++){
            var div = '#'+x;
            var div2 = '#i'+x;
            var link_tag = '#a'+x;
            var new_link = "item.html#"+product+"#"+display_products[x-1]['FIELD3'];
            $(div).html(display_products[x-1]['FIELD2']);
            $(div2).html(display_products[x-1]['FIELD3']);
            $(link_tag).attr('href', new_link);
        }


        // update page buttons
        if(id == 'page9'){
            var new_page_no = selected_page;
            for(var i=1; i<= nb ; i++){
                if(new_page_no<=pages){
                    var idd = '#page'+i;
                    $(idd).attr('data-id', new_page_no);
                    $(idd).html(new_page_no);
                    new_page_no++;
                    $("#page1").addClass("selected_button");
                }
                else{
                    $(idd).remove();
                    $(this).addClass("selected_button");
                }
            }   
        }
    });
});