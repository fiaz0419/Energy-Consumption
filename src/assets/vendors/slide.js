var myTimer;
var index =1;



function autoSlide(){
    console.log('auto slider called');
    var i;
    var x = $('.slider-card'); 
    var idx = $('.sel').attr('idx');
    for(i=0;i<x.length;i++){
    //x[i].style.display = "none";
    $(x[i]).fadeOut(1000);
    $(x[i]).removeClass('sel');

    }
    idx++;
    if(idx >= x.length){idx= 0}
    $(x[idx]).fadeIn(1000);
    $(x[idx]).addClass('sel');
    myTimer = setTimeout(autoSlide,3000);
        
}

function stopSlide(){
    clearInterval(myTimer);
}

 
 

function plusIndex(n){
console.log('clicked');
index = index + 1;
showImage(index);
}

function showImage(n){
    console.log('flowing');
    var i;
    var x = $('.slider-card');
    if(n > x.length){ index = 1};
    if(n < 1){ index = x.length};
    for(i=0;i<x.length;i++)
    {
    //x[i].style.display = "none";
    $(x[i]).fadeOut(1000);
    }
    //x[index-1].style.display = "block";
    $(x[index-1]).fadeIn(1000);

}


