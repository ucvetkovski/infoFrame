$(document).ready(function(){


    // var myfunc = setInterval(function() {
    //     var now = new Date().getTime();
    //     var timeRemaining = countDownDate - now;
    
    //     var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    //     var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    //     var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    //     }, 1000)


    var sviPodaci;

    function loadEverything(){
        $.ajax({
            async : false,
            url : "https://api.warframestat.us/pc",
            language : "en",
            method : "get",
            dataType : "json",
            success : function (nizPodataka){
                sviPodaci = nizPodataka;
                setInterval(archonGet,1000);
                setInterval(sortieGet,1000);
                setInterval(baroGet,1000);
                setInterval(arbitrationGet,1000);
                setInterval(earthGet,1000);
                setInterval(cetusGet,1000);
                setInterval(cambionGet,1000);
                setInterval(vallisGet,1000);
                setInterval(eventsGet,1000);
                newsGet();
                setInterval(newsGet,1800000);
            }
        });
    }

    loadEverything();
    setInterval(loadEverything,600000);


//#region NEWS
function newsGet(){
    news(sviPodaci.news);
}


function news(niz){
    var sorted = niz.sort((a,b) => new Date(b.date) - new Date(a.date));
    let newsAll = ``;
        sorted.forEach(news => {
            
        let now = new Date().getTime();
        let timeleft =  now - new Date(news.date);
        
        let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let timeRemaining = days + "d " + hours + "h ";
            newsAll += `<li>${timeRemaining} ago - <a href="${news.link}"><b>${news.message}</b></a></li>`;
        });
    
        document.getElementById("news").innerHTML = newsAll;

}
//#endregion

//#region SORTIE

function sortieGet(){
    sortie(sviPodaci.sortie)
}


function sortie(niz){
    let missionsAll = `Missions: `;
    let missions = niz.variants;
    missions.forEach(mission => {
        missionsAll += `<li><b>${mission.missionType}</b> - ${mission.modifier}`;
    });
        let now = new Date().getTime();
        let timeleft = new Date(niz.expiry) - now;
        
        let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        let timeRemaining = "Expires in : " + hours + "h " + minutes + "m " + seconds + "s";
    
        document.getElementById("sortieMissions").innerHTML = missionsAll;
        document.getElementById("sortieExpiresIn").innerHTML = timeRemaining;

}
//#endregion

//#region BARO
function baroGet(){
    voidTrader(sviPodaci.voidTrader)
}

    function voidTrader(niz){

        if(niz.active){
            let baroLocation = `Location: <b>${niz.location}</b>`;

            let now = new Date().getTime();
            let timeleft = new Date(niz.expiry) - now;
            
            let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            let timeRemaining = "Leaves in : " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
            
                
            document.getElementById("baroLeaves").innerHTML = timeRemaining;
            document.getElementById("baroLocation").innerHTML = baroLocation;
        }
        else{
            
            let now = new Date().getTime();
            let timeleft = new Date(niz.expiry) - now;
            
            let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            let timeRemaining = "Arrives in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
            document.getElementById("baroArrives").innerHTML = timeRemaining
        }
}
//#endregion

//#region ARBITRATION
function arbitrationGet(){
    arbitration(sviPodaci.arbitration);
}
  
function arbitration(niz){
    if(niz){
    if(!niz.active == true){
        let missionArb = `Arbitration node: <b>${niz.node}</b>`;
        let missionType = `Mission type: <b>${niz.type}</b>`;
        
        
        let now = new Date().getTime();
        let timeleft = new Date(niz.expiry) - now;
        
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        let timeRemaining = "Ends in: " + hours + "h " + minutes + "m " + seconds + "s";
    
        document.getElementById("currentArbitrationNode").innerHTML = missionArb;
        document.getElementById("arbitrationMissionType").innerHTML = missionType;
        document.getElementById("arbitrationExpiresIn").innerHTML = timeRemaining;
    }
    else{
        document.getElementById("currentArbitrationNode").textContent = "No available Arbitration.";
    }
    }
    else{
        document.getElementById("currentArbitrationNode").textContent = "No available Arbitration.";
    }


}
//#endregion

//#region ARCHON

function archonGet(){
    archon(sviPodaci.archonHunt);
}

function archon(niz){
    var currentArchon = `The current archon is <b>${niz.boss}</b>.`;
    document.getElementById("currentArchon").innerHTML = currentArchon;

        let now = new Date().getTime();
        let timeleft = new Date(niz.expiry) - now;
        
        let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        let timeRemaining = "Expires in : " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
        document.getElementById("expiresIn").innerHTML = timeRemaining;
    }


function missionTypes(niz){
    var types = niz.missions;
    let missions = '';
    types.forEach(type => {
        missions += `<li>${type.type}</li>`
    });
  
}

//#endregion

//#region EARTH

function earthGet(){
    earthCycle(sviPodaci.earthCycle);
}
  
function earthCycle(niz){
    let cycle = '';
    if(niz.isDay){
        cycle = "The current cycle is <b>Day</b>.";
    }
    else{
        cycle = "The current cycle is <b>Night</b>.";
    }
    let now = new Date().getTime();
    let timeleft = new Date(niz.expiry) - now;
    
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    let timeRemaining = "Cycle ends in: " + hours + "h " + minutes + "m " + seconds + "s";
    document.getElementById("currentEarthCycle").innerHTML = cycle;
    document.getElementById("remainingEarthCycle").innerHTML = timeRemaining;
}

//#endregion

//#region CETUS

function cetusGet(){
    cetusCycle(sviPodaci.cetusCycle);
}
  
function cetusCycle(niz){
    let cycle = '';
    if(niz.isDay){
        cycle = "The current cycle is <b>Day</b>.";
    }
    else{
        cycle = "The current cycle is <b>Night</b>.";
    }
    let now = new Date().getTime();
    let timeleft = new Date(niz.expiry) - now;
    
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    let timeRemaining = "Cycle ends in: " + hours + "h " + minutes + "m " + seconds + "s";
    document.getElementById("currentCetusCycle").innerHTML = cycle;
    document.getElementById("remainingCetusCycle").innerHTML = timeRemaining;
}

//#endregion

//#region CAMBION

function cambionGet(){
    cambionCycle(sviPodaci.cambionCycle);
}
  
function cambionCycle(niz){
    let cycle = '';
    if(niz.active == "vome"){
        cycle = "The current cycle is <b>Vome</b>.";
    }
    else{
        cycle = "The current cycle is <b>Fass</b>.";
    }
    let now = new Date().getTime();
    let timeleft = new Date(niz.expiry) - now;
    
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    let timeRemaining = "Cycle ends in: " + hours + "h " + minutes + "m " + seconds + "s";
    document.getElementById("currentCambionCycle").innerHTML = cycle;
    document.getElementById("remainingCambionCycle").innerHTML = timeRemaining;
}
//#endregion

//#region VALLIS
function vallisGet(){
    vallisCycle(sviPodaci.cambionCycle);
}
  
function vallisCycle(niz){
    let cycle = '';
    if(niz.active == "cold"){
        cycle = "The current cycle is <b>Cold</b>.";
    }
    else{
        cycle = "The current cycle is <b>Warm</b>.";
    }
    let now = new Date().getTime();
    let timeleft = new Date(niz.expiry) - now;
    
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    let timeRemaining = "Cycle ends in: " + hours + "h " + minutes + "m " + seconds + "s";
    document.getElementById("currentVallisCycle").innerHTML = cycle;
    document.getElementById("remainingVallisCycle").innerHTML = timeRemaining;
}
//#endregion

//#region EVENTS
function eventsGet(){
    events(sviPodaci.events);
}

function events(niz){
    if(niz.length <= 0){
        document.getElementById("eventsList").textContent = "There are no events currently going on.";
    }
    else{
        let eventsAll = `Events: `;
        niz.forEach(event => {
          
        let now = new Date().getTime();
        let timeleft = new Date(event.expiry) - now;

        let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        let timeRemaining = "Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
            eventsAll += `<li><b>${event.description}</b></li>Status: ${event.health}% <br/> ${timeRemaining}`;
    });
    document.getElementById("eventsList").innerHTML = eventsAll;
    }
    
}
//#endregion

//#region DATA CHECK


resetForms();

function resetForms() {
    document.forms['forma'].reset();
}

    var errorArray = [];
    var formMail = document.getElementById("formEmail");
    var formName = document.getElementById("formName");
    const mailRegEx = /^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    $("#formName").focus(function () {
        formName.classList.remove("error");
        formName.classList.add("contactus");
        nameError.textContent = '';
    });
    $("#formName").blur(function () {
        if (formName.value == ""){
            formName.classList.remove("contactus");
            formName.classList.add("error");
            nameError.textContent = nameErrorMessage;
        }
        else {
            formName.classList.remove("error");
            formName.classList.add("contactus");
            nameError.textContent = '';
        }
    });

    $("#formEmail").focus(function () {
        formMail.classList.remove("error");
        formMail.classList.add("contactus");
        emailError.textContent = '';
    });
    $("#formEmail").blur(function () {
        var mailCheck = document.getElementById("formEmail").value;
        if(mailCheck == ""){
            formMail.classList.remove("contactus");
            formMail.classList.add("error");
            emailError.textContent = emailErrorMessage;
        }
        else if(!(mailRegEx.test(mailCheck))) {
            formMail.classList.remove("contactus");
            formMail.classList.add("error");
            emailError.textContent = emailFormatErrorMessage;
        }
        else {
            $("#emailError").text('');
            formMail.classList.remove("error");
            formMail.classList.add("contactus");
            emailError.textContent = '';
        }
    });

    var lista = document.getElementById("listQuery");
    $("#listQuery").focus(function () {
        lista.classList.remove("error");
        lista.classList.add("contactus");
        listError.textContent = '';
    });
    $("#listQuery").blur(function () {
        if ((lista.value == -1)) {
            lista.classList.remove("contactus");
            lista.classList.add("error");
            listError.textContent = listErrorMessage;
        }
        else {
            lista.classList.remove("error");
            lista.classList.add("contactus");
            listError.textContent = '';
        }
    });

    var message = document.getElementById("formMessage");
    $("#formMessage").focus(function () {
        message.classList.remove("textAreaError");
        message.classList.add("textarea");
        messageError.textContent = '';
    });
    $("#formMessage").blur(function () {
        if (message.value == ""){
            message.classList.remove("textarea");
            message.classList.add("textAreaError");
            messageError.textContent = messageErrorMessage;
        }
        else {
            message.classList.remove("textAreaError");
            message.classList.add("textarea");
            messageError.textContent = '';
        }
    });

    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var listError = document.getElementById("listError");
    var messageError = document.getElementById("messageError");
    var subMail = document.getElementById("subMail");

    var nameErrorMessage = "Tell us how we should address You.";
    var emailErrorMessage = "Please enter an email.";
    var emailFormatErrorMessage = "Email must be in the following format: 'example@anymail.com'.";
    var listErrorMessage = "Please select a reason for contacting us.";
    var messageErrorMessage = "Please fill out Your message.";


$("#sendRequest").click(function(){
    if(formName.value == ""){
        formName.classList.remove("contactus");
        formName.classList.add("error");
        nameError.textContent = nameErrorMessage;
    }
    if(lista.value == -1){
        lista.classList.remove("contactus");
        lista.classList.add("error");
        listError.textContent = listErrorMessage;
    }
    if(formMail.value == ""){
        formMail.classList.remove("contactus");
        formMail.classList.add("error");
        emailError.textContent = emailErrorMessage;
    }
    else if(!mailRegEx.test(formMail.value)){
        formMail.classList.remove("contactus");
        formMail.classList.add("error");
        emailError.textContent = emailFormatErrorMessage;
    }
    if(message.value == ""){
        message.classList.remove("textarea");
        message.classList.add("textAreaError");
        messageError.textContent = messageErrorMessage;
    }
    if(mailRegEx.test(formMail.value) && formName.value != "" && lista.value != -1 && message.value != ""){
       alert("Thank you for contacting us!");
       resetForms();
    }});

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

//#endregion

});