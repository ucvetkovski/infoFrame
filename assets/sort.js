function sortWarframes(niz){
    let sortType = document.getElementById("warframeSort");
    if(sortType.value == "nameAsc"){
        return proizvodi.sort((a,b) => a.name > b.name ? 1 : -1);
    }
    else if(sortType.value == "nameDesc"){
        return proizvodi.sort((a,b) => a.name < b.name ? 1 : -1);
    }
    else if(sortType.value == "releaseDateAsc"){
        return proizvodi.sort((a,b) => a.naziv > b.naziv ? 1 : -1);
    }
    else if(sortType.value == "releaseDateDesc"){
        return proizvodi.sort((a,b) => a.naziv < b.naziv ? 1 : -1);
    }
    else if(sortType.value == "genderMF"){
        return proizvodi.sort((a,b) => a.gender > b.gender ? 1 : -1);
    }
    else if(sortType.value == "genderFM"){
        return proizvodi.sort((a,b) => a.gender < b.gender? 1 : -1);
    }
}