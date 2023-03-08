$(document).ready(function(){

var frames;

$.ajax({
    async: false,
    url : "assets/warframes.json",
    method : "get",
    dataType: "json",
    success : function(nizPodataka){
        frames = nizPodataka;
        prikazi(nizPodataka);

    }
})

//#region SORT


//#region SEARCH BAR
$("#searchBar").keyup(changeWarframes);

function searchWarframes(niz){
    let searchValue = document.getElementById("searchBar").value;
    return niz.filter(a => a.name.toUpperCase().match(searchValue.toUpperCase()));
}

function changeWarframes(){
    if(sortType.value == -1){
    prikazi(showWarframes(searchWarframes(frames)));
    }
    else{
    prikazi(showWarframes(sortWarframes(searchWarframes(frames))));
    }
}

//#endregion


//#region SORT FUNCTIONS
var sortType = document.getElementById("warframeSort");
function sortWarframes(niz){

    if(sortType.value == "nameAsc"){
        return niz.sort((a,b) => a.name > b.name ? 1 : -1);
    }
    if(sortType.value == "nameDesc"){
        return niz.sort((a,b) => a.name < b.name ? 1 : -1);
    }
    if(sortType.value == "releaseDateAsc"){
        return niz.sort((a,b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }
    if(sortType.value == "releaseDateDesc"){
        return niz.sort((a,b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    }
    if(sortType.value == "genderMF"){
        return niz.sort((a,b) => a.gender < b.gender ? 1 : -1);
    }
    if(sortType.value == "genderFM"){
        return niz.sort((a,b) => a.gender > b.gender ? 1 : -1);
    }
}

//#endregion

function sortChange(){
    prikazi(showWarframes(sortWarframes(searchWarframes(frames))));
}


$("#warframeSort").change(sortChange);

if(localStorage.getItem('favs')){
    var favourites = JSON.parse(localStorage.getItem('favs'));
    var parsedFavourites = favourites.map((x) =>parseInt(x));
}

function showWarframes(niz){
    let radios = document.querySelectorAll('input[name="variant"]:checked');
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        if(radios[i].value != "default" && radios[i].value != "2")
        {
          var rezultat =  niz.filter(element => element.prime == radios[i].value)
           return rezultat;
        }
        else if(radios[i].value == "2"){
            if(parsedFavourites.length != 0){
                return niz.filter(f => parsedFavourites.some(item => item === f.id));
                }
            else{
                return niz;
            }
        }
        else{
            return niz;
        }
    }
}}


function variantChange(){
    if(sortType.value == -1){
    prikazi(showWarframes((searchWarframes(frames))));
    }
    else{
        prikazi(showWarframes(sortWarframes(searchWarframes(frames))));
    }
}
$(".dugmad").change(variantChange);


//#endregion

function prikazi(niz){
    let content = "";
    niz.forEach(frame => {
        content += `<div id="${frame.id}" class="card m-3 warframe" style="width:150px;">
        <img class="card-img-top" src="${frame.image.thumb}" alt="Card image">
        <div class="card-body">
          <div class="wfTitleCorrect">
          <div class="innerWfTitle">${frame.name}
          </div>
          </div>
        </div>
      </div>`;
     document.getElementById("frames").innerHTML =  content;
    })
}

// $(".warframe").bind('click', function(){
//     pretraga(this.id);
// });

$(document).on('click', '.warframe', function() {
    pretraga(this.id);
});



    function pretraga(id){
    frames.forEach(frame => {
        if(frame.id == id){

            var warframeData = `<div class='text-left' id='content'>

            <div class="row">
                    <div class="col-md-8" id='textInfo'>
                     <h1 class='display-3'>${frame.name}   <span id=${frame.id} class='fa fa-star'></span></h1>
                     <h2>${frame.description}</h2>
                        <br/>
                         <h3><b>Armor:</b> ${frame.stats.armor}</h3>
                        <h3><b>Shields:</b> ${frame.stats.shields}</h3>
                        <h3><b>Health:</b> ${frame.stats.health}</h3>
                        <h3><b>Energy:</b> ${frame.stats.energy}</h3>
                    </div>
                    <div class="col-md-4" style='background-image: url(${frame.image.background}); background-position: top right; background-repeat: no-repeat; height: 325px;'></div>
            </div>
        
            <br/></br>
            <br/></br>
        
            <div id='info'>
            <div class='row'>
        
            <div id='abilitiesText'>
            <div class='text-center'><h2>Abilities<h2></div>
            <div class='text-center'><h3><b>Passive:</b> ${frame.abilities.passive.description}<h3></div>
            </div>
            <div class='col'>
            <div class='card h-100' style='width: 18rem;'>
                    <video autoplay loop width='280' height='160'>
                        <source src='${frame.abilities.first.video}' type='video/mp4'></video>
                 <div class='card-body'>
                    <p class='card-title'><b>${frame.abilities.first.name}</b></p>
                     <img src='${frame.abilities.first.icon}'/>
                     <br/> <br/>
                     <p class='card-text'>${frame.abilities.first.desc}</p>
                </div>
            </div>
            </div>
        
            <div class='col'>
                <div class='card h-100' style='width: 18rem;'>
                        <video autoplay loop width='280' height='160'>
                        <source src='${frame.abilities.second.video}' type='video/mp4'>
                        </video>
                     <div class='card-body'>
                        <p class='card-title'><b>${frame.abilities.second.name}</b></p>
                         <img src='${frame.abilities.second.icon}'/>
                         <br/> <br/>
                         <p class='card-text'>${frame.abilities.second.desc}</p>
                    </div>
                </div>
            </div>
        
            <div class='col'>
                <div class='card h-100' style='width: 18rem;'>
                        <video autoplay loop width='280' height='160'>
                        <source src='${frame.abilities.third.video}' type='video/mp4'>
                        </video>
                     <div class='card-body'>
                        <p class='card-title'><b>${frame.abilities.third.name}</b></p>
                         <img src='${frame.abilities.third.icon}'/>
                         <br/> <br/>
                         <p class='card-text'>${frame.abilities.third.desc}</p>
                    </div>
                </div>
            </div>
        
            <div class='col'>
                <div class='card h-100' style='width: 18rem;'>
                       <video autoplay loop width='280' height='160'>
                        <source src='${frame.abilities.fourth.video}' type='video/mp4'>
                        </video>
                     <div class='card-body'>
                        <p class='card-title'><b>${frame.abilities.fourth.name}</b></p>
                         <img src='${frame.abilities.fourth.icon}'/>
                         <br/> <br/>
                         <p class='card-text'>${frame.abilities.fourth.desc}</p>
                    </div>
                </div>
            </div>
        
            </div>
            </div>
        </div></div>`;

        localStorage.setItem('warframeData',warframeData);
        location.href = 'warframe.html';
        }
    })

}

$("#subButton").click(function(){
    event.preventDefault();
     if(subMail.value == ""){
         subMailError.textContent = emailErrorMessage;
     }
     else if(!mailRegEx.test(subMail.value)){
         subMailError.textContent = emailFormatErrorMessage;
     }
     else{
         subMailError.textContent = '';
         subMail.value = '';
         alert("Thank you for subscribing! ^^");
     }
 });

})
