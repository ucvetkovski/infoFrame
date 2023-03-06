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

function sortWarframes(niz){
    let sortType = document.getElementById("warframeSort");
    if(sortType.value == "nameAsc"){
        return niz.sort((a,b) => a.name > b.name ? 1 : -1);
    }
    else if(sortType.value == "nameDesc"){
        return niz.sort((a,b) => a.name < b.name ? 1 : -1);
    }
    else if(sortType.value == "releaseDateAsc"){
        return niz.sort((a,b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }
    else if(sortType.value == "releaseDateDesc"){
        return niz.sort((a,b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    }
    else if(sortType.value == "genderMF"){
        return niz.sort((a,b) => a.gender < b.gender ? 1 : -1);
    }
    else if(sortType.value == "genderFM"){
        return niz.sort((a,b) => a.gender > b.gender? 1 : -1);
    }
}

function sortChange(){
    prikazi(sortWarframes(frames));
    prikazi(showWarframes(frames));
}
$("#warframeSort").change(sortChange);


function showWarframes(niz){
    let radios = document.querySelectorAll('input[name="variant"]:checked');
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        if(radios[i].value != "default")
        {
          var rezultat =  niz.filter(element => element.prime == radios[i].value)
           return rezultat;
        }
        else{
            return niz;
        }
    }
}
}
function orderChange(){
    prikazi(showWarframes(frames));
}
$(".dugmad").change(orderChange);


//#endregion

function prikazi(niz){
    let content = "";
    niz.forEach(frame => {
        content += `<div id="${frame.id}" class="card m-3 warframe" style="width:160px;">
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

    $(".warframe").click(function(){
        pretraga(this.id);
    });

    function pretraga(id){
    frames.forEach(frame => {
        if(frame.id == id){

            var warframeData = `<div class='text-left' id='content'>

            <div style='background-image: url(${frame.image.background}); background-position: top right; background-repeat: no-repeat;'>
                    <div id='textInfo'>
                     <h1 class='display-3'>${frame.name}</h1>
                     <h2>${frame.description}</h2>
                        <br/>
                         <h3><b>Armor:</b> ${frame.stats.armor}</h3>
                        <h3><b>Shields:</b> ${frame.stats.shields}</h3>
                        <h3><b>Health:</b> ${frame.stats.health}</h3>
                        <h3><b>Energy:</b> ${frame.stats.energy}</h3>
                    </div>
            </div>
        
            <br/></br>
            <br/></br>
        
            <div id='info'>
            <div class='row'>
        
            <div id='abilitiesText'>
            <div class='text-center'><h2>Abilities<h2></div>
            <div class='text-center'><h3>Passive: ${frame.abilities.passive.description}<h3></div>
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

})
