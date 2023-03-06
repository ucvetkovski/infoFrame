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
            $.ajax({
                method: 'GET',
                url: 'https://oor0sh.github.io/infoFrame/warframe.php',
                data: { 
                    ime: frame.name,
                    description: frame.description,
                    armor: frame.stats.armor,
                    shields: frame.stats.shields,
                    health: frame.stats.health,
                    energy: frame.stats.energy,

                    passive: frame.abilities.passive.description,

                    firstName: frame.abilities.first.name,
                    firstIcon: frame.abilities.first.icon,
                    firstDesc :frame.abilities.first.desc,
                    firstVideo : frame.abilities.first.video,
                    firstVideoPH : frame.abilities.first.videoPH,

                    secondName: frame.abilities.second.name,
                    secondIcon: frame.abilities.second.icon,
                    secondDesc :frame.abilities.second.desc,
                    secondVideo : frame.abilities.second.video,
                    secondVideoPH : frame.abilities.second.videoPH,

                    thirdName: frame.abilities.third.name,
                    thirdIcon: frame.abilities.third.icon,
                    thirdDesc : frame.abilities.third.desc,
                    thirdVideo : frame.abilities.third.video,
                    thirdVideoPH : frame.abilities.third.videoPH,

                    fourthName: frame.abilities.fourth.name,
                    fourthIcon: frame.abilities.fourth.icon,
                    fourthDesc : frame.abilities.fourth.desc,
                    fourthVideo : frame.abilities.fourth.video,
                    fourthVideoPH : frame.abilities.fourth.videoPH,

                    background : frame.image.background
                     },
                success: function(response) {
                    localStorage.setItem('warframeData',response);
                    location.href = 'https://oor0sh.github.io/infoFrame/warframe.html';
                }
            });
        }
    })

}

})
