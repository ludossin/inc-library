$(document).ready(function(){

   var thisPage = $('.add-to-collection').attr('id'); //used in localStorage reading Position
   
//////////////////////////////////////////////////////////////////////////////////
////HIDE AND SHOW THE LIBRARY TREE ON SCROLL AFTER INFO-BOX
//////////////////////////////////////////////////////////////////////////////////
    var lastScrollTop = 0, delta = 10;

    $(window).scroll(function(){
      //get number of 'top most' visible paragraph (localStorage reading Position)
      var firstVisPar = $(window).scrollTop();
     
      $('.paragraph').each(function() {
          if ($(this).offset().top > firstVisPar) {
              var readingPosition = $(this).attr('id');
              localStorage.setItem(thisPage, readingPosition);
              //console.log(readingPosition);
              return false; 
          }
      });
      //end localStorage reading Position
      
        //if ($(document).scrollTop() < $('#info-box').outerHeight(true) - parseInt($('#up').css('top'))) {
        //} else {
        //    if (Math.floor($('#menu-right-wrapper').offset().left) < window_width) {
        //    } else {
        //    }
        //}

        var nowScrollTop = $(this).scrollTop();
        if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
            if (nowScrollTop > $('#info-box').outerHeight(true)) {
                if (nowScrollTop > lastScrollTop){
                    $('.affix').addClass('affix-up').removeClass('affix-down');
                } else {
                    $('.affix').addClass('affix-down').removeClass('affix-up');
                }
            }
           lastScrollTop = nowScrollTop;
        }
    });

////AFFIX THE LIBRARY-TREE TO THE TOP OF THE SCREEN
    $('#library-tree').affix({
            offset: {top: 55}
    });

//////////////////////////////////////////////////////////////////////////////////
////PUSH MENU ON THE RIGHT
//////////////////////////////////////////////////////////////////////////////////
    var menu_wrapper_width = $('#menu-right-wrapper').outerWidth();
    var window_width = $(window).width();

    $('.toggle_menu_right').on('click', function() {
        if ($(window).width() >= "768") {
            $(this).fadeIn();
                $('#menu-right').animate({left: 1});
                $('.toggle_menu_right').hide();
        }
    });

    $('#menu-right-close').on('click', function(e) {
        $('.toggle_menu_right').fadeIn(0);
        $("#live-search").removeClass('filter-clicked');
        $('.form-control').removeClass('form-clicked');
        $('#filter').removeClass('live-search-clicked');
        $('#buttons_wrapper').css('display', 'none');
        $('#filter-count').css('display', 'none');
        $('#menu-right').animate({left: + menu_wrapper_width});
    });
    

//////////////////////////////////////////////////////////////////////////////////
////PUSH MENU ON THE LEFT
//////////////////////////////////////////////////////////////////////////////////
////ON CLICKING THE TOGGLE THAT OPENS THE MENU-LEFT

    $('#menu_bar').click(function() {
          var menu_width = $('#toc_wrapper').width();
                $('#menu').animate({left: 0});
                $('#menu-left-close').show();
        
        if(window.innerWidth < 769) {
            $('#menu').animate({left: 0});
            $('#menu-left-close').hide();
        }
        
        });

////OPENS AND CLOSES THE MENU ON SMALL DEVICES
    $('#flip').click(function() {
        var menu_width = $('#toc_wrapper').width();
        if ($('#menu').offset().left == 0) {
            $('#menu').animate({left: -menu_width});
        } else {
            $('#menu').animate({left: 0});
        }
    });


////CLICKING THE CLOSE BUTTON CLOSES THE MENU, DUH
    $('#menu-left-close').click(function() {
        $(this).hide();
        $('#menu').animate({left: -menu_width});
    });
    
    
////ANIMATE SIDENOTES AND STUFF
    $('#content').animate({
        opacity: 1
    }, 1500, function() {
        alignSidenotes();
        alignVertically();
        fadeInSidenotes();
    });

////ON LOAD HIDE THE TWO MENUS AND OTHER ELEMENTS
    var menu_width = $('#toc_wrapper').width();
    $('#menu').animate({'left': -menu_width});
    $('#menu-right').animate({'left': + menu_wrapper_width});
    $('.toggle_menu_right').fadeIn(750);
    $('#menu-left-close').hide();
   // if ($(document).scrollTop() < $('#info-box').outerHeight(true) - parseInt($('#up').css('top'))) {
   // // if ($(document).scrollTop() > $('#info-box').offset().top) {
   ////    $('#arrows').hide();
   // } else {
   //  //   $('#arrows').show();
   // }




////ADD WORD COUNT, CHARACTER COUNT, AND AVERAGE TIME OF READING
    $('.section').each(function() {
        var section_text = $(this).children().not('.references, .words, .keyword-toggle').text();
        var aaa = section_text.match(/\S+/g);
        var charactersNoSpaces = section_text.replace(/\s+/g, '').length;
        var characterss = section_text.length;
        var wordss = aaa ? aaa.length : 0;
        var timee = (wordss / 250).toString();
        var deci = timee.split('.');
        //var secss = deci[1] *60;
        //var secs = secss.toString().substr(0,2);

        $(this).find('.words').html(""+wordss+" words");
        // $(this).find('.characters_no_spaces').html(charactersNoSpaces+" characters (no spaces)");
        $(this).find('.characterss').html("| "+charactersNoSpaces+" characters ("+characterss+" with spaces)");
        // $(this).find('.timee').html("| "+deci[0]+":"+secs+" min");
        $(this).find('.timee').html("| approx. "+deci[0]+" min");
    });




    
//////////////////////////////////////////////////////////////////////////////////
////SCROLL PROGRESSION BARS
//////////////////////////////////////////////////////////////////////////////////
    var nr = 1;
    $('.horizScroll').each(function() {
        $(this).attr('id', 'title'+nr);
        nr++;
    });

////////////////////////
////ON SCROLL HAPPENINGS
////////////////////////
    $(window).scroll(function() {
        // console.log($(document).scrollTop());
        // console.log($('#content').offset().top)

         if ($(document).scrollTop() > $('#content').offset().top) {
             $('#library-tree').slideUp(500);
         } else {
             $('#library-tree').slideDown(500);
         }

        var windowHeight = $(window).height();
        var scrollTop = $(document).scrollTop();					// height of scroll on top (=0)
        var bottom = $(document).height() - windowHeight;			// heigth from top at the end of doc
        var verticalBar = (scrollTop / bottom)*windowHeight;
        // var subtitleHeight = titleHeight*(90/100);				//SUBTITLE WIDTH
        var n = 1;
        var y = 1;
        $("#menu_bar_scroll").css('height', verticalBar);
 

////////MENU TITLE SCROLLBARS
        $('.section').each(function(){
            $('#title'+n).each(function(){
                var titleHeight = $(this).parent().outerHeight();
                var a = $('#chapter'+n).offset().top;
                var b = $('#chapter'+n).height();
                var c = scrollTop - a; // POSITION AT WHICH TO START SCROLL
                var f = (c / b) * titleHeight; // SUBSTITUTE OR CALCULATE E ABOVE FOR ANY DESIRED WIDTH OF THE SCROLL BAR

                $(this).css('height', f);

                if ($(this).height() > 0) { 
                    $(this).parent().css('color', '#8e8e8e');
                } else {
                    $(this).parent().css('color', '#cdcdcd');            
                }
            });

////////////ADD WINDOW HEIGHT TO THE LAST TITLE
            var lastTitleHeight = $('#title7').parent().outerHeight();
            var lastHeight = $('#chapter7').height()-windowHeight;
            var lastTop = $('#chapter7').offset().top;
            var lastStartScroll = scrollTop - lastTop;
            var lastHeight = (lastStartScroll/lastHeight)*lastTitleHeight;
            $('#title7').css('height', lastHeight);
            n++;
        });

////////HIDE SELECTION MENU ON SCROLL
        $('#asd, .delete-underline').fadeOut('3000');

////////UPDATE SCROLLTOP
        S = $(window).scrollTop();
        H = $(window).outerHeight(true);
        P = S/H;
        
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////
////SEARCH FUNCTION
/////////////////////////////////////////////////////////////////////////////////////////////////////
    var maxCount;
    var counter = 0;
    var topPos; //scrollTo position
    
   
    $("#live-search").click(function(){
        $(this).addClass('filter-clicked');
        $('.form-control').addClass('form-clicked');
        $('#filter').addClass('live-search-clicked');
        $('#buttons_wrapper').addClass('hide-show');
    });
    $("#cancel").click(function(){
        $("#live-search").removeClass('filter-clicked');
        $('.form-control').removeClass('form-clicked');
        $('#filter').removeClass('live-search-clicked');
        $('#buttons_wrapper').removeClass('hide-show');
    });

    
    $('#live-search').click(function(){
        evt.preventDefault();
    })
    
////CANCEL SEARCH AND REMOVE HIGHLIGHTING
    function cancelSearch() {
        //console.log('[from cancelSearch] -> ' + window_width);
        $('.highlight').each(function() {
            var par = $(this).parent();
            $(this).contents().unwrap();
            par[0].normalize();
        });
        $('.search-notfound').removeClass('search-notfound');
        if(window_width > 992){
            $("#filter-count").hide();
            $('#buttons_wrapper').hide();
           // $('#search_ui').hide(); 
        }else{
            $("#filter-count_xs").hide();
            $('#buttons_wrapper_xs').hide();
          //  $('#search_ui_xs').hide();
        }
    };


////////ON ENTER CLEAR RESULTS, THEN GO TO THE FIRST NEW INSTENCE

    $('#filter').keypress(function(e){
        if(window_width > 992){
            if(e.keyCode == 13){
                 //console.log('[from normal] width is ' +window_width);
                //console.log('filling ' + e.target.id);
                counter = 0;
                e.preventDefault();
                cancelSearch();
                //sending the id of the field that triggerd the function
                searchAndHighlight(e.target.id);
                //location.href="#hit0";
                //replaced by scrollTo due to offset issues
                topPos = $("#hit0").offset().top - 55;
                $('html, body').animate({scrollTop: topPos}, 400);
                $("#filter-count").show().text(''+(counter+1)+'/'+(maxCount+1));
                $('#next').focus();
                $('#hit0').css('background-color', '#00fab1');
                evt.preventDefault();
            }
        }
    });
    
      $('#live-search_xs').submit(function(e){
            //console.log('[from xs] width is ' +window_width);
            //console.log('mr. form_xs -> ' + e.target.id );
            if(window_width <= 992){
                counter = 0;
                e.preventDefault();
                cancelSearch();
                searchAndHighlight(e.target.id);
                //hides the keyboard
                $('#filter_xs').blur();
                //location.href="#hit0";
                topPos = $("#hit0").offset().top - 55;
                $('html, body').animate({scrollTop: topPos}, 400);
                $("#filter-count_xs").show().text(''+(counter+1)+'/'+(maxCount+1));
                $('#buttons_wrapper_xs').css('display','block');
                $('#next_xs').focus();
                $('#hit0').css('background-color', '#00fab1');
                return false;
            }
        });



////ON <ESC> CANCEL SEARCH AND BRING TEXT BACK TO NORMAL
    $(document).keyup(function(e){
        if (e.keyCode == 27){
            cancelSearch();
            if(window_width > 992){
               $('#filter, #next, #prev').blur();
                //empty search field value
                $("#filter").val(''); 
            }else{
                $('#filter_xs, #next_xs, #prev_xs').blur();
                //empty search field value
                $("#filter_xs").val(''); 
            }
            
        }
    });

////ON SHIFT+ENTER GO TO TH PREVIOUS INSTANCE
    $(document).bind('keydown', 'Shift+return', function() {
        if(counter > 0){
            counter--;
        }else{
            counter = maxCount;
        }

        //location.href="#hit"+counter;
        //replaced by scrollTo due to offset issues
        // topPos = $("#hit"+counter).offset().top - 55;
        topPos = $("#hit"+counter).offset().top ;
        $('html, body').animate({scrollTop: topPos}, 400);
        //if($('#filter').length){
        //if($(document).width() > 768){
        if(window_width > 992){
            $('#next').focus();
            $("#filter-count").show().text(''+(counter+1)+'/'+(maxCount+1));
        }else{
            $('#next_xs').focus();
            $("#filter-count_xs").show().text(''+(counter+1)+'/'+(maxCount+1));
        }


        $('#hit'+counter).css('background-color', '#00fab1');
        $('#hit'+(counter+1)).css('background-color', '#f4F4F4');
        return false;
    });

////THE 'SEARCH'
var filter;
    function searchAndHighlight(id) {
////////IF THE ELEMENT DOES NOT CONTAIN THE TEXT PHRASE FADE IT OUT
        $('.section > h2, .section > p, .section > ol > li, .section > span, .subchapter > h3, .subchapter > p, .subchapter > ol > li, .subchapter > span, blockquote > *, .references > h3, .references > p, #toc_wrapper  h2  a, #toc_wrapper > h3 > a, .btn-default, .author, .toc_author').each(function(){
            if(id=="filter"){
                filter = $('#filter').val().toLowerCase();
            }
            if(id=="live-search_xs"){
                filter = $('#filter_xs').val().toLowerCase();
            }
            
            if ($(this).text().toLowerCase().indexOf(filter) >= 0) {
                $(this).removeClass('search-notfound');
                $(this).addClass('search-found');

                $(this).unhighlight();	
                $(this).highlight(filter); // <-- wordsOnly: false if looking for exact words
            } else {
                $(this).addClass('search-notfound');
                $(this).removeClass('search-found');
            }

////////////HIDE CANCEL BUTTON WHEN NO INPUT
            if (0 < filter.length) {
                if(id == "filter"){
                    $('#search_ui').css('display', 'block');
                    $('#buttons_wrapper').css('display', 'block');
                }
                if(id == "live-search_xs"){
                    $('#search_ui_xs').css('display', 'block');
                    $('#buttons_wrapper_xs').css('display', 'block');
                }
                
            } else {
                if(id == "filter"){
                    $('#search_ui').css('display', 'none');
                    $('#buttons_wrapper').css('display', 'none');
                }
                if(id == 'live-search_xs'){
                    $('#search_ui_xs').css('display', 'none');
                    $('#buttons_wrapper_xs').css('display', 'none');
                }

            }

////////////HIDE CANCEL BUTTON WHEN CLICKED
            $('#search_ui').click(function() {
                $(this).css("display", "none");
                $('#buttons_wrapper').css('display', 'none');
                $("#filter").val('');
                cancelSearch();
            });

            $('#search_ui_xs').click(function() {
                $(this).css("display", "none");
                $('#buttons_wrapper_xs').css('display', 'none');
                $("#filter_xs").val('');
                cancelSearch();
            });
        });

////////GENERATE IDs FOR ALL HIGHLIGHTED HITS
        $('.highlight').each(function(number) {
            maxCount = number;
            $(this).attr('id', 'hit'+number);
        });
    }	

////////GET THE NUMBER OF HITS
    function getHitCount() {
        var i=0;
        while ($('#hit'+i).length) {
            i++;
        } 
        return i;
    }
////////GO TO THE NEXT INSTANCE
    
    function toNext(n){
        counter = n;
        if(counter < maxCount){
            counter++;
        }else{
            counter = 0;
        }
        //location.href="#hit"+counter;
        //replaced by scrollTop due to offset issues
        topPos = $("#hit"+counter).offset().top ; // 55px (#library-tree height) not needed here
        $('html, body').animate({scrollTop: topPos}, 400);
        //if($(document).width() > 768){
        if(window_width > 992){
            $("#filter-count").show().text(''+(counter+1)+'/'+(maxCount+1));
            $('#next').focus();
        }else{
            $("#filter-count_xs").show().text(''+(counter+1)+'/'+(maxCount+1));
            $('#next_xs').focus();
        }
        


        $('#hit'+counter).css('background-color',  'rgb(0, 250, 146)');
        $('#hit'+(counter-1)).css('background-color', ' rgba(0, 250, 146, 0.34902)');
        $('#hit'+(counter-1)).css('color', '#1c6a1c');
    }

    $('#next').click(function() {
        toNext(counter);
    });

     $('#next_xs').click(function() {
         toNext(counter);
     });

////ON CLICK GO TO THE PREVIOUS INSTANCE
    function toPrev(n) {
        counter = n;
        if(counter > 0){
            counter--;
        }else{
            counter = maxCount;
        }
        //location.href="#hit"+counter;
        //replaced by scrollTo due to offset issues
        topPos = $("#hit"+counter).offset().top - 55;
        $('html, body').animate({scrollTop: topPos}, 400);
        //if($(document).width() > 768){
        if(window_width > 992){
            $("#filter-count").show().text(''+(counter+1)+'/'+(maxCount+1));
            $('#prev').focus();
        }else{
            $("#filter-count_xs").show().text(''+(counter+1)+'/'+(maxCount+1));
            $('#prev_xs').focus();
        }


        $('#hit'+counter).css('background-color', 'rgb(0, 250, 146)');
        $('#hit'+(counter+1)).css('background-color', 'rgba(0, 250, 146, 0.34902)');
        $('#hit'+(counter+1)).css('color', '#1c6a1c');
    }

    $('#prev').click(function() {
        toPrev(counter);
    });

    $('#prev_xs').click(function() {
        toPrev(counter);
    });


////ARRAY OF ALL THE UNIQUE WORDS FOR AUTOCOMPLETE
    var someWords = allWords;
    var allWords = ["20th", "21st", "a", "ability", "about", "above", "Abram", "abstraction", "actions", "actors", "add", "addresses", "administrative", "aesthetic", "against", "Agency", "all", "alliance", "also", "although", "America", "an", "Ana", "analyses", "analysis", "analyzing", "AND", "another", "antagonize", "Antonio", "apartheids", "apparatus", "are", "areas", "art", "as", "aspiration", "assumes", "at", "attack", "attention", "author", "Autonomy", "be", "beginning", "Beller", "Berry", "between", "beyond", "biopolitical", "bloc", "Britain", "broader", "but", "by", "called", "CAPITAL", "capitalism", "capitalist", "carried", "Castro", "category", "centrality", "centre", "century", "certain", "change", "Chapter", "character", "characterized", "city", "class", "co", "cognitive", "cognitivities", "Collective", "colonial", "coloniality", "commodification", "commodified", "concept", "concepts", "concludes", "connection", "constitute", "contained", "contemporary", "context", "contribute", "control", "cooperation", "corpus", "creative", "CREATIVITY", "critical", "critically", "criticism", "criticizes", "critique", "culture", "current", "currently", "cusing", "dealing", "deals", "decolonialist", "defining", "degree", "democracies", "democracy", "democratic", "depoliticization", "derogation", "detects", "detriment", "devastating", "devastation", "dichotomy", "dictated", "different", "discourse", "discourses", "distinctive", "distribution", "division", "divisions", "does", "domain", "domains", "dominant", "domination", "economy", "editors", "effects", "elites", "Emmelheinz", "emphasizing", "Empire", "encompassed", "end", "Engaged", "engagement", "engineering", "entire", "entitled", "environments", "epistemological", "equal", "era", "establish", "establishes", "establishment", "ethnic", "ethnicity", "ethnocentric", "European", "Even", "exist", "expand", "exploitation", "extent", "Factory", "faire", "feature", "fiction", "figure", "financial", "First", "fo", "focus", "focused", "for", "Fordist", "form", "former", "forms", "Foucault", "framework", "free", "from", "function", "functional", "general", "generally", "gentrification", "Geography", "ghettoized", "global", "goes", "Gomez", "Gordana", "GRAY", "great", "guided", "Gómez", "Hardt", "has", "he", "hegemonic", "hegemony", "help", "heterogeneous", "hierarchies", "historical", "historicization", "huge", "idea", "ideological", "ideologies", "Image", "implies", "imposition", "impotence", "impotent", "in", "include", "industries", "initial", "instances", "institutions", "interpretation", "interpretations", "into", "Introduction", "introductory", "invested", "involved", "Irmgard", "is", "it", "its", "itself", "James", "Jonathan", "Josephine", "Lacan", "laissez", "large", "Latin", "led", "Leger", "legitimization", "level", "links", "Ljubljana", "locates", "logic", "logics", "longer", "Machine", "mainstream", "maintaining", "majority", "manner", "Marc", "market", "mass", "meaning", "mentioned", "merely", "Mexico", "Michael", "Missing", "model", "modern", "modernity", "modernization", "modernized", "monopoly", "most", "name", "nation", "necessary", "necessity", "needs", "Negri", "neoliberal", "Neoliberalism", "networked", "neutralization", "Neutralizing", "New", "niche", "Nikolić", "no", "normative", "not", "nullity", "obscene", "occupies", "occurs", "OF", "on", "only", "opposite", "optation", "or", "organization", "organizing", "Other", "out", "pan", "paradigm", "paradigmatic", "part", "partnership", "parts", "perception", "period", "periods", "periphery", "perpetuation", "perspective", "place", "plays", "point", "points", "political", "politically", "politicized", "politics", "popular", "position", "positioning", "positions", "post", "postfordist", "Postmodern", "power", "practices", "preceding", "precisely", "preparation", "presented", "primarily", "principles", "private", "privileges", "process", "processes", "produce", "producing", "production", "professional", "profit", "progress", "proponents", "psychoanalytic", "public", "publication", "publications", "racial", "radical", "radically", "rationalization", "reconfiguring", "reduced", "refer", "reflection", "Regardless", "regards", "regeneration", "region", "register", "regulation", "reinvented", "relation", "relations", "relationship", "relying", "remain", "reorganization", "reorganized", "reportedly", "representation", "repressive", "reproducing", "reproduction", "retain", "retains", "rhetorics", "Rog", "role", "roots", "ruling", "s", "same", "Sandi", "Santiago", "scene", "see", "sees", "sense", "separated", "separating", "Serbia", "serving", "she", "should", "significance", "similar", "Since", "Slater", "Slovenia", "so", "social", "societies", "society", "socio", "sorts", "space", "speak", "specific", "stance", "state", "still", "strategies", "strategy", "strives", "structural", "structuralist", "structurally", "structure", "subjected", "subjecting", "subjects", "subversive", "such", "supernarrative", "surpass", "surplus", "system", "takes", "taking", "Tatlić", "temporal", "text", "texts", "than", "that", "Thatcher", "THE", "their", "then", "theoretical", "theory", "therefore", "these", "this", "those", "though", "through", "title", "to", "today", "topics", "total", "towards", "transcend", "transcends", "transformation", "transforming", "transition", "treated", "treats", "try", "turning", "ultimately", "unbalanced", "Unconscious", "undergoing", "urban", "use", "utilization", "vagueness", "vast", "view", "viewed", "views", "Vilenica", "was", "way", "we", "wealth", "well", "West", "wherein", "whether", "which", "who", "whose", "will", "wish", "with", "within", "work", "world", "would", "yet", "Yugoslavia", "ZONES", "Šefik", "Žižek"
                   ];

    var stopWords = ["a","able","about","above","abst","accordance","according","accordingly","across","act","actually","added","adj","affected","affecting","affects","after","afterwards","again","against","ah","all","almost","alone","along","already","also","although","always","am","among","amongst","an","and","announce","another","any","anybody","anyhow","anymore","anyone","anything","anyway","anyways","anywhere","apparently","approximately","are","aren","arent","arise","around","as","aside","ask","asking","at","auth","available","away","awfully","b","back","be","became","because","become","becomes","becoming","been","before","beforehand","begin","beginning","beginnings","begins","behind","being","believe","below","beside","besides","between","beyond","biol","both","brief","briefly","but","by","c","ca","came","can","cannot","can't","cause","causes","certain","certainly","co","com","come","comes","contain","containing","contains","could","couldnt","d","date","did","didn't","different","do","does","doesn't","doing","done","don't","down","downwards","due","during","e","each","ed","edu","effect","eg","eight","eighty","either","else","elsewhere","end","ending","enough","especially","et","et-al","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","except","f","far","few","ff","fifth","first","five","fix","followed","following","follows","for","former","formerly","forth","found","four","from","further","furthermore","g","gave","get","gets","getting","give","given","gives","giving","go","goes","gone","got","gotten","h","had","happens","hardly","has","hasn't","have","haven't","having","he","hed","hence","her","here","hereafter","hereby","herein","heres","hereupon","hers","herself","hes","hi","hid","him","himself","his","hither","home","how","howbeit","however","hundred","i","id","ie","if","i'll","im","immediate","immediately","importance","important","in","inc","indeed","index","information","instead","into","invention","inward","is","isn't","it","itd","it'll","its","itself","i've","j","just","k","keep","kept","kg","km","know","known","knows","l","largely","last","lately","later","latter","latterly","least","less","lest","let","lets","like","liked","likely","line","little","'ll","look","looking","looks","ltd","m","made","mainly","make","makes","many","may","maybe","me","mean","means","meantime","meanwhile","merely","mg","might","million","miss","ml","more","moreover","most","mostly","mr","mrs","much","mug","must","my","myself","n","na","name","namely","nay","nd","near","nearly","necessarily","necessary","need","needs","neither","never","nevertheless","new","next","nine","ninety","no","nobody","non","none","nonetheless","noone","nor","normally","nos","not","noted","nothing","now","nowhere","o","obtain","obtained","obviously","of","off","often","oh","ok","okay","old","omitted","on","once","one","ones","only","onto","or","ord","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","owing","own","p","page","pages","part","particular","particularly","past","per","perhaps","placed","please","plus","poorly","possible","possibly","potentially","pp","predominantly","present","previously","primarily","probably","promptly","proud","provides","put","q","que","quickly","quite","qv","r","ran","rather","rd","re","readily","really","recent","recently","ref","refs","regarding","regardless","regards","related","relatively","research","respectively","resulted","resulting","results","right","run","s","said","same","saw","say","saying","says","sec","section","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sent","seven","several","shall","she","shed","she'll","shes","should","shouldn't","show","showed","shown","showns","shows","significant","significantly","similar","similarly","since","six","slightly","so","some","somebody","somehow","someone","somethan","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specifically","specified","specify","specifying","still","stop","strongly","sub","substantially","successfully","such","sufficiently","suggest","sup","sure","take","taken","taking","tell","tends","th","than","thank","thanks","thanx","that","that'll","thats","that've","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","thered","therefore","therein","there'll","thereof","therere","theres","thereto","thereupon","there've","these","they","theyd","they'll","theyre","they've","think","this","those","thou","though","thoughh","thousand","throug","through","throughout","thru","thus","til","tip","to","together","too","took","toward","towards","tried","tries","truly","try","trying","ts","twice","two","u","un","under","unfortunately","unless","unlike","unlikely","until","unto","up","upon","ups","us","use","used","useful","usefully","usefulness","uses","using","usually","v","value","various","'ve","very","via","viz","vol","vols","vs","w","want","wants","was","wasnt","way","we","wed","welcome","we'll","went","were","werent","we've","what","whatever","what'll","whats","when","whence","whenever","where","whereafter","whereas","whereby","wherein","wheres","whereupon","wherever","whether","which","while","whim","whither","who","whod","whoever","whole","who'll","whom","whomever","whos","whose","why","widely","willing","wish","with","within","without","wont","words","world","would","wouldnt","www","x","y","yes","yet","you","youd","you'll","your","youre","yours","yourself","yourselves","you've","z","zero"];

    var someWords = [];
    for (var i=0; i < allWords.length; i++) {
        word = allWords[i].toLowerCase();
        if (word.length < 3) {
            continue;
        }
        if (stopWords.indexOf(word) != -1) {
            continue;
        }
        someWords.push(word);
    }
////AUTOCOMPLETE
    $("#filter").autocomplete({
    	source: someWords
    });



//////////////////////////////////
////POP-OVER IN-TEXT REFERENCE BOX
//////////////////////////////////
    $('.references p').each(function(a){
        $(this).attr('id', 'ref'+(a+1));
    });

    $(".in-text").each(function(){
        var n = $(this).data("dref");
        var tx = $("#ref"+n).text();
        $(this).attr({"data-toggle": "popover", "role": "button", "data-trigger": "click",  "data-content": tx, "data-placement": "top", "href": "#"}).addClass("button");
        $(this).popover();
    });
    //prevents page to scroll to top
    $('a.in-text').on('click', function(e) {e.preventDefault(); return true;});

////////////////
////CITATION BOX
////////////////

////GENERATE ID TO p
    $('.section p').not('.references p').each(function(number){
        $(this).attr("id", "p"+(number+1));
    });


////ON MOUSEUP GET SELECTION AND DO THINGS TO IT
    var selection;
    var selection_text;

    $('.section a>sup').bind('mouseup', function(e){
        e.stopPropagation();
        //prevents indexError from being thrown
    });

    $('.section').bind('mouseup touchend', function(e){
       
        // try {
            if (window.getSelection) {
                selection = window.getSelection().getRangeAt(0); //MAKE THIS WORK ON EVERY BROWSER
            } else {
                selection = document.getSelection().getRangeAt(0);
            }
        // } catch (err) {

        // }
        selection_text = selection.toString();
        var scrollTop = $(window).scrollTop();
        var clickTop = e.pageY-scrollTop;
        var asd_height = $('#asd').outerHeight();
        //console.log(selection);
        if (selection_text.length > 0 ) {
            if (clickTop >= asd_height) {
                if ($(window).width >= 768) {
                clickTop -=asd_height;
                } else {
                clickTop = e.pageY - scrollTop;
                }
            }
            var left = e.pageX;
            $("#asd").css('display','block').css({top: clickTop, left: left});

////////////HIDE/SHOW UNHIGHLIGHT IF SELECTED AREA HAS HIGHLIGHT
            if (selection.commonAncestorContainer.children) {
                for (var i = 0; i < selection.commonAncestorContainer.children.length; i++ ) {
                  if (selection.commonAncestorContainer.children[i].classList[1] == 'underline') {
                    $('#erase').show();
                  }
                }
            } else if (selection.commonAncestorContainer.parentElement.classList[1] == 'underline') {
                $('#erase').show();
            } else if (selection.startContainer.parentElement.classList[1] == 'underline') {
                $('#erase').show();
            } else if (selection.endContainer.parentElement.classList[1] == 'underline') {
                $('#erase').show();
            } else {
                $('#erase').hide();
                //console.log('parent-hide');
            }
        }

        var par = $(e.target).closest('p').attr('id');
        if (par) {
            var blaaa = par.substr(1, 3);
        }
        var ref_article = $('#'+par).closest('.section').attr('data-article');
        var ref_authorName = $('#'+par).closest('.section').attr('data-authorName');
        if (ref_authorName) {
            var ref_apaAuthorName = ref_authorName.substr(0, 1);
        }
        var ref_intro = $('#'+par).closest('.section').attr('data-authorName');
        var ref_authorLastName = $('#'+par).closest('.section').attr('data-authorLastName');
        var ref_title = $('meta[name="title"]').attr('content');
        var ref_eds = $('meta[name="editors"]').attr('content');
        var ref_apaEds = $('meta[name="apa-editors"]').attr('content');
        var ref_year = $('meta[name="year"]').attr('content');
        var ref_place = $('meta[name="place"]').attr('content');
        var ref_pub = $('meta[name="publisher"]').attr('content');
        var MLA_date_of_access = moment().format('D MMMM YYYY');
        var chicago_date_of_access = moment().format('MMMM D, YYYY');
        var url = $(location).attr('pathname');



////////IF IT IS THE FIRST CHAPTER (INTRODUCTION) CITE IN THIS WAY
        if (blaaa < 15) {
////////////MLA STYLE 
            $('#mla, #mla_xs').html("Nikolić, Gordana and Tatlić Šefik"+", "+ref_title
                           +". Eds. "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". &lt;"+url+"#"+par+"&gt;. "+MLA_date_of_access+".");
////////////CHICAGO STYLE
            $('#chicago, #chicago_xs').html("Nikolić, Gordana &amp; Tatlić Šefik"+". '"+ref_article+".' In "+ref_title
                               +", edited by "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". "+url+"#"+par+". Accessed "+chicago_date_of_access+".");
////////////APA STYLE
            $('#apa, #apa_xs').html("Nikolić, G., Tatlić Š."+". ("+ref_year+"). "+ref_article+". In "+ref_apaEds+" (Eds.), "+ref_title
                           +". "+ref_place+": "+ref_pub+". Available from "+url+"#"+par+".");
////////OTHERWISE (NORMAL CHAPTERS) CITE IN THIS WAY
        } else {
////////////MLA STYLE 
            $('#mla, #mla_xs').html(ref_authorLastName +", "+ref_authorName+". '"+ref_article+", "+ref_title 
                           +". Eds. "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". &lt;"+url+"#"+par+"&gt;. "+MLA_date_of_access+".");
////////////CHICAGO STYLE
            $('#chicago, #chicago_xs').html(ref_authorLastName+", "+ref_authorName+". '"+ref_article+".' In "+ref_title
                               +", edited by "+ref_eds+". "+ref_place+": "+ref_pub+", "+ref_year+". "+url+"#"+par+". Accessed "+chicago_date_of_access+".");
////////////APA STYLE
            $('#apa, #apa_xs').html(ref_authorLastName +", "+ ref_apaAuthorName+". ("+ref_year+"). "+ref_article+". In "+ref_apaEds+" (Eds.), "+ref_title
                           +". "+ref_place+": "+ref_pub+". Available from "+url+"#"+par+".");
        }
    });


////DEFINE
    $('#lookup').click(function() {
        window.open('http://www.oxforddictionaries.com/definition/english/' + selection_text); 
        $('#asd').fadeOut('3000');
    });

////HIGHLIGHT
    $('#highlight').click(function() {
        $('#content').wrapSelection({
            fitToWord: true
        }).addClass('underline');
        $('#asd').fadeOut('3000');
    });

////ERASE HIGHLIGHT
    $('#erase').click(function() {
        $('#content').wrapSelection({
            fitToWord: true
        }).addClass('remove_highlight');
        $('#asd').fadeOut('3000');
    });

////APPEND P-SPANS TO THE COLUMN
    $('.section p').each(function() {
        $('#par_numbr').append('<div class="p_number"></div>');
        $(this).addClass('paragraph');
    });

////ALIGN PARAGRAPH NRS TO THE ATUAL PARAGRAPHS
    function alignParagraphNumbers() {
        var p_id_number = 1;
        setTimeout(function(){
            $('.p_number').each(function() {
                $(this).attr('id', 'pnr'+p_id_number);
                $('#pnr'+p_id_number).each(function() {
                    if ($('#p'+p_id_number).length) {
                        var p_offset = $('#p'+p_id_number).offset().top;
                        $(this).offset({top: p_offset}).html(p_id_number);
                    }
                });
                p_id_number++;
            });
        }, 400); //replaced 3000 with 400
    }

    alignParagraphNumbers();


    $('#menu-right h4 a').each(function() {
        $(this).addClass('toggle_panel_button');
    });

////OPEN 'REFERENCE TOOL' PANEL ON SELECTION MENU 'REFERENCE THIS' CLICK
    $('#get-reference').click(function() {
        if (Math.floor($('#menu-right-wrapper').offset().left) >= window_width) {
            $('#menu-right').animate({left: 1});
            $('.toggle_menu_right').fadeOut();
            if ($('#cite').hasClass('collapsed')) {
                $('#cite').trigger('click');
            }
        } else {
            if ($('#cite').hasClass('collapsed')) {
                $('#cite').trigger('click');
            }
        }
    });


////HIDE DELETE-UNDERLINE WHEN CLICKED OUTSIDE (EXCEPT THE TWO MENUS)
    $('body').mousedown(function(e) {
        if ($('#asd').is(':visible')
            && !$('#asd').is(e.target) // if the target of the click isn't the container...
            && !$('#menu').is(e.target)
            && !$('#menu-right').is(e.target)
            && $('#asd').has(e.target).length === 0 // ... nor a descendant of the container
            && $('#menu').has(e.target).length === 0
            && $('#menu-right').has(e.target).length === 0)
        {
            $('#asd').fadeOut('3000');
        }
    });


////HIDE SELECTION MENU WHEN CLICKED OUTSIDE (EXCEPT THE TWO MENUS)
    $('body').mousedown(function(e) {
        if ($('.delete-underline').is(':visible')
            && !$('.delete-underline').is(e.target) // if the target of the click isn't the container...
            && !$('#menu').is(e.target)
            && !$('#menu-right').is(e.target)
            && $('.delete-underline').has(e.target).length === 0 // ... nor a descendant of the container
            && $('#menu').has(e.target).length === 0
            && $('#menu-right').has(e.target).length === 0)
        {
            $('.delete-underline').fadeOut('3000');
        }
    });


//////////////////////
////COLLECTION
//////////////////////
$('.add').on('click', function() {
    if ( $(this).text()=='Add to collection +'){
        $(this).text('Remove -');
        //alert('You added this publication to your collection');
        //save element id to localStorage
        colElements.push($(".add-to-collection").attr("id"));
        localStorage.setItem("saved_collection", JSON.stringify(colElements));
        //console.log('adding ' +colElements);
    }else{
        //alert("You removed this publication from your collection");
        $(this).text('Add to collection +');
        //remove element id from localStorage
        var index = colElements.indexOf($(".add-to-collection").attr("id"));
        colElements.splice(index, 1);
        localStorage.setItem("saved_collection", JSON.stringify(colElements));
        //console.log('removed '+ index);
    }
}); 

////GET SAVED ITEMS
    //checks if localStorage is supported and if it has been set
    if(typeof(Storage) !== "undefined") {  //browser supports localStorage
      //reading position
      if(localStorage.getItem(thisPage)){
         $('html, body').stop().animate({
            scrollTop: $("#"+localStorage.getItem(thisPage)).offset().top
        }, 400);
      }else{
         //no position saved for this page
      }
        if(localStorage.getItem("saved_collection")) {
            colElements = JSON.parse(localStorage.getItem("saved_collection"));
            if(colElements.indexOf($(".add-to-collection").attr("id")) != -1){
                $('.add-to-collection').find(".add").text('Remove -');
            } else{
                $('.add-to-collection').find(".add").text('Add to collection +');
            }


        } else {
            //localStorage supported, but no values stored
            colElements = [];
        }
    } else {
        //browser does not support localStorage
    }



////EXECUTES WHEN NEW PIN IS DROPPED FOR THE FIRST TIME
    function createPin(e, ui) {
        //console.log('pin released  '+ pin_count);
        // increase last_pinID
        last_pinID++;

        var pinXPos = ui.offset.left;
        var pinYPos = ui.offset.top;
        var newPin =  $(ui.helper).clone(true);
        //var pinWidth;

////////DRAG IT, GET TAG NAME FROM USER, ASSIGN DEFAULT ID TO IT, AND UPDATE VALUES WHEN EDITED OR MOVED
        // newPin.appendTo('#content').offset({top: pinYPos, left: pinXPos}).attr('id', 'dragged-pin'+last_pinID).addClass('pin-clone').draggable({
        //     containment: '#main',
        //     cursor: 'move',
        //     snapTolerance: 100,
        //     snap: '#content',
        //     snapMode: "outer",
        //     stop: pinMoved
        // });


       //  t = newPin.find('.pin-input').val();
       // // pinWidth = newPin.find('.pin-form').width();
       //  pid = newPin.attr("id");
       //  ptop = newPin.offset().top / $(document).height();
       //  pleft = newPin.offset().left;
       //  pObj = {value : t, top: ptop, left: pleft, id: pid};
       //  pins.push(pObj);
       //  //console.log('t -> '+t);
       //  //css the trash icon left margin
       //  //newPin.find('.pin-close').css('margin-left',pinWidth - 30+'px');
       //  //update the list on the menu

        //MOVE INLINE CSS TO FILE
        // $('#pins-list').append('<li><a href="#dragged-pin'+last_pinID+'">new Pin</a> <i class="fa fa-ban delete-pin" style="color: red; cursor: pointer;"></i></li>');
        // //saves to localStorage
        // localStorage.setItem("saved_pins", JSON.stringify(pins));
        // localStorage.setItem("last_pinID", last_pinID);

        // newPin.find('.pin-form').css('display', 'inline');
        // newPin.find('.pin-input').focus();


////////ON SUBMIT (ENTER) 
        // newPin.find('.pin-form').submit(function(e){
        //     //alert(e.target);
        //     //$(this).find('.pin-form').hide();
        //    checkPin(pid,t); //return false there (not anymore)
        //     e.preventDefault();
        //    // return false;
        // });

////////ON FOCUSOUT UPDATE PIN DATA ETC
        // newPin.find('.pin-input').focusout(function() {
        // //$('#content').find('.pin-input').focusout(function() {
        //     $(this).blur();
        //     //console.log('focusout '+ $(this).closest('.pin-clone').attr("id"));
        //     t = $(this).val();
            
        //     var pid = $(this).closest('.pin-clone').attr("id");//.newPin.attr("id");
        //     var pidnr = pid.substr(11);
            
        //     ptop = $(this).closest('.pin-clone').offset().top / $(document).height();//newPin.offset().top;
        //     pleft = $(this).closest('.pin-clone').offset().left;//newPin.offset().left; //FIX THIS TOO
        //     pObj = {value : t, top: ptop, left: pleft, id: pid};

        //     checkPin(pid,t);
        //     $(this).closest('.pin-form, .pin-close').fadeOut();
        // });

        // newPin.find('.pin-input').mouseout(function() {
        // //$('#content').find('.pin-input').mouseout(function() {
        //     $(this).blur();
        //     //console.log('mouseleave '+ $(this).closest('.pin-clone').attr("id"));
        //     t = $(this).val();

        //     var pid = $(this).closest('.pin-clone').attr("id");//.newPin.attr("id");
        //     var pidnr = pid.substr(11);

        //     ptop = $(this).closest('.pin-clone').offset().top / $(document).height();//newPin.offset().top;
        //     pleft = $(this).closest('.pin-clone').offset().left;//newPin.offset().left; // FIX THIS TOO
        //     pObj = {value : t, top: ptop, left: pleft, id: pid};

        //     checkPin(pid,t);
        //     $(this).closest('.pin-form, .pin-close').fadeOut();
        // });
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////SHOW/HIDE KEYWORDS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var keywords = ['capitalism', 'capital', 'creativity', 'art', 'contemporary', 'culture', 'ideological', 'social', 'labor', 'attention', 'image', 'production', 'capitalism', 'art', 'state', 'life', 'public', 'city', 'economics', 'production', 'development', 'art', 'social', 'avant-garde', 'world', 'big', 'Other', 'art', 'urban', 'cultural', 'project', 'creativity', 'Belgrade', 'Rog', 'capital', 'creative', 'collective', 'urban', 'factory', 'gentrification', 'art', 'political', 'social', 'culture', 'autonomy', 'public', 'work'];

////CLICKING THE KEYWORD BUTTON TOGGLES ON AND OFF THE SELECTED KEYWORD
    $('.keyword-button').each(function(m){
        $('#keyword_toggle'+m).each(function() {
            $(this).click(function() {

                $(this).button('toggle');
                if ($(this).hasClass('active')) {
                    $(this).closest('.section').highlight(keywords[m], {
                        element: 'span', className: keywords[m], wordsOnly: true
                    });
                } else {
                    $(this).closest('.section').unhighlight({element: 'span', className: keywords[m], wordsOnly: true});	
                }
                
                $(this).children().css('color', 'black');
                $(this).children().css('background-color', 'transparent');


            });

        });

    });


////SHOW -ALL- KEYWORDS TOGGLE
    $('#keyword-show-all_xs, #keyword-show-all').on('click', function() {
        $(this).button('toggle');
        for (var i = 0; i < keywords.length; i++) {
            if ($(this).hasClass('active')) {
                if ($('#keyword_toggle'+i).hasClass('active')) {
                    $(this).addClass('active');
                    $('#keyword-hide-all').removeClass('active');
                } else {
                    $('#keyword_toggle'+i).button('toggle');
                    $('#keyword_toggle'+i).closest('.section').highlight(keywords[i], {element: 'span', className: keywords[i], wordsOnly: true});
                    $(this).addClass('active');
                    $('#keyword-hide-all').removeClass('active');
                }
            }
        }
    });


////HIDE -ALL- KEYWORDS TOGGLE
    $('#keyword-hide-all_xs, #keyword-hide-all').on('click', function() {
        $(this).button('toggle');
        $('.keyword-button.active').trigger('click');
        $(this).addClass('active');
        $('#keyword-show-all').removeClass('active');
    });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////ANIMATION SCROLL ON MENU ITEM CLICK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('a.page-scroll').bind('click', function(e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 400);
        e.preventDefault();
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////ARROW NAVIGATION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////ON ARROW-DOWN CLICK SCROLL TO NEXT SECTION
    $('#down').on('click', function (e) {
        e.preventDefault(); 
////////SET DATA-TOP FOR EVERY SECTION
        $('.section').each(function() {
            var scrollTop = $(document).scrollTop();
            var section_top = Math.floor($(this).offset().top);
            var first_section = Math.floor($('.section:first').offset().top);
            var last_section = Math.floor($('.section:last').offset().top);
          /*ERROR HERE: .offset().top */
          if ($(this).next('.section')) {
                var nextTop = Math.floor($(this).next('.section').offset().top);
            }
            if (scrollTop >= section_top && scrollTop < nextTop) {
                $('html, body').stop().animate({
                    scrollTop: nextTop
                }, 400);
            } else if (scrollTop < first_section || scrollTop >= last_section) {
                $('html, body').stop().animate({
                    scrollTop: first_section
                }, 400);
            } else {
                e.preventDefault();
            }
        });
    });


////ON ARROW-UP CLICK SCROLL TO PREVIOUS SECTION
    $('#up').on('click', function (e) {
        e.preventDefault();	
////////SET DATA-TOP FOR EVERY SECTION
        $('.section').each(function() {
            var scrollTop = $(document).scrollTop();
            var section_top = Math.floor($(this).offset().top);
            var first_section = Math.floor($('.section:first').offset().top);
            var last_section = Math.floor($('.section:last').offset().top);
            if ($(this).next('.section')) {
                var nextTop = Math.floor($(this).next('.section').offset().top);
            }
            if (scrollTop > section_top && scrollTop <= nextTop) {
                $('html, body').stop().animate({
                    scrollTop: section_top
                }, 400);
            } else if (scrollTop > last_section || scrollTop <= first_section) {
                $('html, body').stop().animate({
                    scrollTop: last_section
                }, 400);
            } else {
                e.preventDefault();
            }
        });
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////SIDENOTES
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    ////FOCUS ON RESPECTIVE SIDENOTE WHEN ANCHOR CLICKED
 if ($(window).width() > "480") {
        $('a sup').click(function(ev){
            var numbr = $(this).text();
            var aidee = $('#fn'+numbr);
            ev.stopPropagation();
            ev.preventDefault();
        });
    }
  
    ////FADES OUT SIDENOTES AND SLIDES THEM RIGHT
    function fadeOutSidenotes() {
        $('.sidenote').css('opacity',0);
    }

    ////FADES IN SIDENOTES AND SLIDES THEM LEFT
    function fadeInSidenotes() {
        $('.sidenote').css('opacity',1);
    }

    ////SIDENOTES BECOME POPOVER BOXES IF SCREEN IS SMALL, AND THEY ARE CENTERED
    function sideToBox() {
        //console.log('calling sideToBox');
        if ($(window).width() < "768") {    //SUBSTITUTE '400' WITH THE DESIRED MINIMUM SIZE
            //console.log('< 768');
            $(".footnoteRef").each(function(){
                var n = $(this).text();
                var tt = $("#fn"+n).text();
                $(this).attr({"data-toggle": "popover", "data-content": tt, "data-placement": "top", "href": "#", "role": "button", "data-trigger": "focus", "tabindex": n}).addClass("button");
                $("#fnref"+n).popover();
            });
            //prevents page to scroll to top
            $('a.footnoteRef').on('click', function(e) {e.preventDefault(); return true;});

        } else {
            //console.log('NOT < 768');
            $('[data-toggle="popover"]').popover('destroy');
        }
    }

    ////MAKES FOOTNOTES SIDENOTES
    var noteCount = $('.sidenote').length; //nr of sidenotes USED in alignSideNotes 
    function alignSidenotes() {
        $('.sidenote').each(function(tic){
            $('#fn'+tic).each(function(){
                var anchorposition = $('#fnref'+tic).offset().top;
                $(this).offset({top: anchorposition});
                //console.log(tic + ' alignSideNotes -> '+ anchorposition);
            });
        });
        //add last one manually
        var anchorposition = $('#fnref'+noteCount).offset().top;
        $('#fn'+noteCount).offset({top: anchorposition});
    }



    ////ALIGN SIDENOTES VERTICALL SO THEY DON'T OVERLAP

    function alignVertically() {
        $('.sidenote').each(function(count){
            //console.log('count ' + count);
            //noteCount = count + 1;
            $('#fn'+count).each(function() {
                var sideTop = $(this).offset().top;
                var sideBottom = sideTop+$(this).height();
                var newHeight = (sideBottom+10);
                var sideNext = $('#fn'+(count+1));
                
                if (sideNext) {
                    var sideNextTop = sideNext.offset().top;
                }
                if ((sideBottom-sideNextTop) > 0) {
                    $('#fn'+(count+1)).offset({top: newHeight});
                }
                //console.log(count + 'alignVertically -> '+ newHeight);
            });
        });       
    }

    sideToBox();

/*///////////////////////
ON RESIZE DO THESE THINGS
///////////////////////*/
    var html = $('html'),
        H = html.outerHeight(true),
        S = $(window).scrollTop(),
        P = S/H;

    $(window).resize(function() {
        //update vars
        menu_wrapper_width = $('#menu-right-wrapper').outerWidth();
        window_width = $(window).width();
////////ALIGNS SIDENOTES ON WINDOW RESIZE
        //save to local Storage too
        firstVisPar = $(window).scrollTop();
        $('.paragraph').each(function() {
          if ($(this).offset().top > firstVisPar) {
              var readingPosition = $(this).attr('id');
              localStorage.setItem(thisPage, readingPosition);
              //console.log(readingPosition);
              return false; 
          }
        });
        //
        fadeOutSidenotes();
        sideToBox();
        alignSidenotes();
        alignVertically();
        alignParagraphNumbers();
        fadeInSidenotes();
        H = html.outerHeight(true);
        //$(window).scrollTop(P*H);
        cancelSearch(); //trying to fix the empty page after submit
        //console.log('changed ' + window_width);
    });



////////////
////SETTINGS
////////////

////HIDE/SHOW ALL HIGHLIGHTED TEXT
    $('#highlight-hide-show-all, #highlight-show-all_xs').toggle(function() {
        $('.underline').css({'background-color': 'white'});
        $(this).removeClass('active');
    }, function() {
        $('.underline').css({'background-color': '#fcffb2'}); 
        $(this).addClass('active');
    });


////////////////////
////CHANGE FONT SIZE
////////////////////
var fontSize;
////DECREASE FONT SIZE AND ALIGN SIDENOTES
    $('#button_fontsizeminus, #button_fontsizeminus_xs').on('click', function(){
        fadeOutSidenotes();
        fontSize = parseInt($(".section").css('font-size'));
        //console.log('will DECREASE to' + fontSize );
        $('.section').not('.references').css('font-size',Number(fontSize-1)+'px');
        alignSidenotes();
        alignVertically();
        alignParagraphNumbers();
        fadeInSidenotes();
        H = html.outerHeight(true);
        S = $(window).scrollTop();
        P = S/H;
    });

////INCREASE FONT SIZE AND ALIGN SIDENOTES
    $('#button_fontsizeplus, #button_fontsizeplus_xs').on('click', function(){
        fadeOutSidenotes();
        fontSize = parseInt($(".section").css('font-size'));
        //console.log('will INCREASE ' + fontSize );
        $('.section').not('.references').css('font-size',Number(fontSize+1)+'px');
        alignSidenotes();
        alignVertically();
        alignParagraphNumbers();
        fadeInSidenotes();
        H = html.outerHeight(true);
        S = $(window).scrollTop();
        P = S/H;
    });

////TOOLTIP 
    $('[data-toggle="tooltip"]').tooltip(); 


    
  
    
    
    
    
    
    
    
}); // <-- document ready














