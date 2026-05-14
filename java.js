var type='';
var typeText="";
var flag;
var isindex=1;
$(function(){
    $("#currentType").click(function(){
        $("#disType").show();
    })

    $("#disType").click(function(){
        if($("#currentType").html()==applicationApp)
        {
            type='zx';
            $("#currentType").html(consult);
            $("#search-press").attr("placeholder",findConsult);
            $("#disType").html(applicationApp)
        }else
        {
            type='yy';
            $("#currentType").html(applicationApp);
            $("#search-press").attr("placeholder",findApp);
            $("#disType").html(consult);
        }
        if(isindex==0)
            window.location.href="/search/result?keyword="+$("#search-press").val()+"&type="+type;
        $("#disType").hide();
        $("#search-press").keyup();
    })

    $(".quxiaoBut").click(function(){
        if(isindex==0)
        {
            window.location.href="/search";
        }
        else
        {
            if(document.referrer.indexOf('/search')>0)
            {
                window.location.href="/";
                return true;
            }
            window.history.go(-1);
        }

    })

    $("#search-press").focus(function(){
        $("#selectdel").addClass("selectDel");
        $("#selectdel").show();
    })

    $("#search-press").bind("input propertychange keyup" , function(event){
        $("#disType").hide();
        $(".keyword-recommend").css({visibility:'hidden'});

        canappendtag = true;
        var press = $("#search-press").val();

        if(event.keyCode==13){

            window.location = "/search/result?keyword=" + press+"&type="+type;
            return true;

        }

        $(".sousuoxiala").empty();

        if(press.length == 0) {
            $(".keyword-recommend").removeAttr("style");
        }else{
            $("#selectdel").addClass("selectDel");
            $("#selectdel").show();
            addSearchResult(press);
        }

    });

    function addSearchResult(k){
        clearTimeout(flag);
        flag = setTimeout(function(){

            $.ajax({
                url :"/search/suggest",
                type : "get",
                async:false,
                data : {keyword:k,type:type},
                success:function(data){
                    sepllcheck = jQuery.parseJSON(data);
                },
            });

            rc = sepllcheck.code;


            rl = sepllcheck.data.sepllcheck.length;
            sv = sepllcheck.data.sepllcheck;

            var suggest = '';
            if(200 == rc){
                for(var i=0; i < rl; i++) {
                    suggest += (i == (rl -1)) ? "<li style='border:0;'><a href='/search/result?keyword=" + sv[i] + "&type="+type+"'>" + sv[i] + "</a></li>"
                        :
                    "<li><a href='/search/result?keyword=" + sv[i] + "&type="+type+"'>" + sv[i] + "</a></li>";
                }
            }

            if(suggest) {

                $('.sousuoxiala').append(suggest);

            }

        }, 200);
    }

    $("#selectdel").bind("click" , function(e) {
        $(".keyword-recommend").css("visibility" , "visible");
        $("#search-press").val('');
        $(".sousuoxiala").empty();
        $(this).removeClass("selectDel");
        $("#selectdel").hide();

    });
})
function initSeatch($type)
{
    type=$type;
    var url=window.location.href;
    if(url.indexOf('/search/result')>0)
        isindex=0;
}



