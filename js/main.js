$(function(){
    var books=[];
    var pages={};
    var nbImages={};
    var bookmark={};
    var currentBook=0;
    $.getJSON('https://bodmer.dlcm.ch/api/books', function(data) {
       var content = data.content;
       for(var i=0; i<content.length; i++){
          var barcode  = content[i].barcode;
          nbImages[barcode] = content[i].nbImages;
          bookmark[barcode] = 2;
          books.push(barcode);
          pages[barcode]=[];
          for(var j=2; j<nbImages[barcode]; j++){
              var pageNumber = ("00" + j).slice(-3);
              pages[barcode].push("https://bodmer.dlcm.ch/img/"+barcode+"/"+barcode+"_"+pageNumber+".jpg");
          }
       }
    });
    $('.top').click(function(){
        if(currentBook>0){
           currentBook--;
        }
        showPage();
    });
    $('.bottom').click(function(){
        if(currentBook<books.length-1){
           currentBook++;
        }
        showPage();
    });
    $('.left').click(function(){
        var barcode = books[currentBook];
        if(bookmark[barcode]>2){
           bookmark[barcode]--;
        }
        showPage();
    });
    $('.right').click(function(){
        var barcode = books[currentBook];
        if(bookmark[barcode]<nbImages[barcode]){
           bookmark[barcode]++;
        }
        showPage();
    });
    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomInt(min, max) {
       return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function randomImage(){
        var barcode = books[currentBook];
         $('.main-image').attr('src',pages[barcode][getRandomInt(2,nbImages[barcode]-1)])
    }
    function showPage(){
        var barcode = books[currentBook];
        $('.main-image').attr('src',pages[barcode][bookmark[barcode]]);
        $('.infobox').text(barcode+' '+bookmark[barcode]+'/'+nbImages[barcode]);
    }
});
