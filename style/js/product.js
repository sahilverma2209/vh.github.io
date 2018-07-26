var product = location.hash;
var length = product.length;
product = product.slice(1,length);
console.log('hash = ', product);
var cat=''; 
var selected_page='';
for(var i=0; i<product.length; i++){
    if(product[i]!='/'){
        cat+=product[i];
    }else break;
}
for(var i=0; i<product.length; i++){
    if(product[i]=='/'){
        for(var k=i+1; k<product.length; k++){
            selected_page += product[k];
        }
    }
}
console.log('category = ',cat);
console.log('s page = ',selected_page);

define([cat], function(){

    var length = product_list.length-1;
    // console.log('length', length);
    var pages = Math.ceil(length/8);
    // console.log('pages = ', pages);
    var page_sections = Math.ceil(pages/9); 
    console.log('page_sections = ', page_sections);
    var nb = 9;

    var section_no = Math.ceil(selected_page/8);
    console.log('section no = ', section_no);
    var page_start = (8*(section_no-1)+1);
    var page_end = (8*(section_no)+1);
    
    // console.log('page start =', page_start);
    // console.log('page end = ', page_end);
    if(page_end>pages)page_end=pages;
    // initialize directory link
    $('.directory').html('Home > Products > '+directory_tag+'');


    // initialize page buttons
    if(selected_page>=9)$('.pagination').append('<button id="prev_section"><</button>');
    if(page_sections >1){
        var id_no=1;
        for(var i=page_start; i<= page_end ; i++){
            $('.pagination').append('<button class="pb" data-id="'+i+'" id="page'+id_no+'">'+i+'</button>');
            id_no++;
        }    
    } 
    else{
        for(var i=page_start; i<= pages ; i++){
            $('.pagination').append('<button class="pb" data-id="'+i+'" id="page'+i+'">'+i+'</button>');
        }  
    }
    if(section_no<page_sections)$('.pagination').append('<button id="next_section">></button>');
    var btn_mod = selected_page%8;
    if(btn_mod == 0)btn_mod = 8;
    var btn_higlight = "#page"+btn_mod;
    console.log('btn hgl = ', btn_higlight);
    $(btn_higlight).addClass("selected_button");

    // initialize images for page 1
    var display_products = product_list.slice((selected_page*8)-7, (selected_page*8)+1);
    for(var x=1; x<=display_products.length; x++){

        var div = '#p'+x;
        // $(div).append('<div id='+x+'>'+display_products[x-1]['FIELD2']+'</div>');
        var img_ref = '../assets/'+cat+'/'+display_products[x-1]['FIELD3']+'.jpg';
        console.log(img_ref);
        $(div).append('<a class="prod_link" id="a'+x+'" href="item.html#'+cat+'#'+display_products[x-1]['FIELD3']+'"><div class="prod_box"><div class="prod_img" id="img'+x+'"></div><div class="prod_desc" id="'+x+'">'+display_products[x-1]['FIELD2']+'</div><div class="prod_id" id="i'+x+'">'+display_products[x-1]['FIELD3']+'</div></div></a>');
        var img_append = '#img'+x;
        $(img_append).append('<center><img id="myimage'+x+'" src="'+img_ref+'" class="img_size" /></center>');
        
        // check height and width to adjust css ------------
        var check=document.getElementById('myimage'+x);
        console.log(check);
        check.addEventListener('load', function() {
            console.log('My width is: ', this.naturalWidth);
            console.log('My height is: ', this.naturalHeight);
            
            if(this.naturalHeight>this.naturalWidth){
                $(this).css("height", "85%");
                $(this).css("width", "auto");
                // vertically centering the image 
                var ph = $(img_append).height();
                var ih = $(this).height();
                var mtop = (ph-ih)/2+'px';
                $(this).css('margin-top', mtop );
                
            }else{
                $(this).css("width", "70%");
                $(this).css("height", "auto");
                // vertically centering the image  
                var ph = $(img_append).height();
                var ih = $(this).height();
                console.log(ph);console.log(ih);
                var mtop = (ph-ih)/2+'px';
                $(this).css('margin-top', mtop );

                if(this.naturalWidth/this.naturalHeight < 1.3){
                    $(this).css("width", "auto");
                    $(this).css("height", "90%");
                    var ph = $(img_append).height();
                    var ih = $(this).height();
                    var mtop = (ph-ih)/2+'px';
                    $(this).css('margin-top', mtop );
                }
                // var max_ht = ph-15+'px';
                // $(this).css('max-height', max_ht ); 
            }
        });

        

    }

    
    $(".pb").click(function(){
        location.reload();
        $('.pb').removeClass("selected_button");

        selected_page = parseInt($(this).html());  

        var section_no = Math.ceil(selected_page/8);
        var page_start = (8*(section_no-1)+1);
        var page_end = (8*(section_no)+1);

        console.log('selected pg = ',selected_page);
        location.hash = cat+'/'+selected_page;
        var id = $(this).attr('id');

        if(id !== 'page9')$(this).addClass("selected_button");

        //update images 
        var display_products = product_list.slice((selected_page*8)-7, (selected_page*8)+1);
        // console.log(product_list);
        console.log(display_products);
        for(var x=1; x<=8; x++){
            var div = '#'+x;
            var div2 = '#i'+x;
            var link_tag = '#a'+x;
            var new_link = "item.html#"+cat+"#"+display_products[x-1]['FIELD3'];
            var img_tag = '#img'+x;
            var new_img_ref = '../assets/barware/'+display_products[x-1]['FIELD3']+'.jpg';
            console.log('new img rref = ', new_img_ref);
            $(div).html(display_products[x-1]['FIELD2']);
            $(div2).html(display_products[x-1]['FIELD3']);
            $(link_tag).attr('href', new_link);
            $(img_tag).attr('src', new_img_ref);
        }


        // update page buttons
        if(id == 'page9'){
            location.reload();
            // var new_page_no = selected_page;
            // console.log('page start =', page_start);
            // console.log('page end = ', page_end);
            // var temp=1;
            // for(var i=page_start; i<= page_end ; i++){
            //     if(new_page_no<=pages){
            //         console.log('temp as i = ',temp);
            //         var idd = '#page'+temp;
            //         $(idd).attr('data-id', new_page_no);
            //         $(idd).html(new_page_no);
            //         new_page_no++;
            //         temp++;
            //         $("#page1").addClass("selected_button");
            //     }
                // else{
                //     i++;
                //     var idd = '#page'+i;
                //     $(idd).remove();
                //     $(this).addClass("selected_button");
                // }
            // }   
        }
    });

    // tooltips for next and prev section buttons ---------
    $("#prev_section").attr('data-toggle', 'tooltip');
    var prev_page =  parseInt($('#page1').html())-1;
    $("#prev_section").attr('title', 'Page '+prev_page);

    $("#next_section").attr('data-toggle', 'tooltip');
    var items = document.querySelectorAll(".pb");
    var lastchild = items[items.length-1];
    var next_page = parseInt(lastchild.getAttribute("data-id"))+1;
    $("#next_section").attr('title', 'Page '+next_page);



    $("#prev_section").click(function(){
        // var prev_page =  parseInt($('#page1').html())-1;
        location.hash = cat+'/'+prev_page;
        location.reload();

    });
    $("#next_section").click(function(){
        // var items = document.querySelectorAll(".pb");
        // var lastchild = items[items.length-1];
        // var next_page = parseInt(lastchild.getAttribute("data-id"))+1;
        location.hash = cat+'/'+next_page;
        location.reload();
    });
});