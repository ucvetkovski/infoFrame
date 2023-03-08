$(document).ready(function(){
    document.getElementById("warframeProfile").innerHTML = localStorage.getItem('warframeData');
    var empty = [];



    var page = document.querySelector(".fa");


    var fromLocalStorage = localStorage.getItem(page.id);
    
    if(fromLocalStorage){
        page.classList.add('fa-checked');
    }


        $(".fa").bind("click", function(){

            this.classList.toggle('fa-checked');

            if(fromLocalStorage){
                localStorage.removeItem(page.id,'fa-checked');
            }
            else{
                localStorage.setItem(page.id,'fa-checked');
            }

            
            var fromFavs = JSON.parse(localStorage.getItem('favs'));

            if(fromFavs){
                
            if(!fromFavs.includes(this.id)){
                fromFavs.push(this.id);
                localStorage['favs'] = JSON.stringify(fromFavs);
            }
            else{
                const index = fromFavs.indexOf(this.id);
                    fromFavs.splice(index, 1);
                    localStorage['favs'] = JSON.stringify(fromFavs);
            }
            }
            else{
                localStorage['favs'] = JSON.stringify(empty);

                var fromFavs = JSON.parse(localStorage.getItem('favs'));

                if(!fromFavs.includes(this.id)){
                    fromFavs.push(this.id);
                    localStorage['favs'] = JSON.stringify(fromFavs);
                }
                else{
                    const index = fromFavs.indexOf(this.id);
                        fromFavs.splice(index, 1);
                        localStorage['favs'] = JSON.stringify(fromFavs);
                }
            }

        })
})
