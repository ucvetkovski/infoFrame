<?php
$name = $_POST['ime'];
$desc = $_POST['description'];
$armor = $_POST['armor'];
$energy = $_POST['energy'];
$shields = $_POST['shields'];
$health = $_POST['health'];

$passive = $_POST['passive'];

$first = $_POST['firstName'];
$firstIcon = $_POST['firstIcon'];
$firstDesc = $_POST['firstDesc'];
$firstVideo = $_POST['firstVideo'];
$firstVideoPH = $_POST['firstVideoPH'];


$second = $_POST['secondName'];
$secondIcon = $_POST['secondIcon'];
$secondDesc = $_POST['secondDesc'];
$secondVideo = $_POST['secondVideo'];
$secondVideoPH = $_POST['secondVideoPH'];


$third = $_POST['thirdName'];
$thirdIcon = $_POST['thirdIcon'];
$thirdDesc = $_POST['thirdDesc'];
$thirdVideo = $_POST['thirdVideo'];
$thirdVideoPH = $_POST['thirdVideoPH'];


$fourth = $_POST['fourthName'];
$fourthIcon = $_POST['fourthIcon'];
$fourthDesc = $_POST['fourthDesc'];
$fourthVideo = $_POST['fourthVideo'];
$fourthVideoPH = $_POST['fourthVideoPH'];

$background = $_POST['background'];

//  echo( "<video autoplay loop width='280' height='200'>
//  <source src='$video' type='video/mp4'>
// </video>");

echo ("
<div class='text-left' id='content'>

    <div style='background-image: url($background); background-position: top right; background-repeat: no-repeat;'>
            <div id='textInfo'>
             <h1 class='display-3'>$name</h1>
             <h2>$desc</h2>
                <br/>
                 <h3><b>Armor:</b> $armor</h3>
                <h3><b>Shields:</b> $shields</h3>
                <h3><b>Health:</b> $health</h3>
                <h3><b>Energy:</b> $energy</h3>
            </div>
    </div>

    <br/></br>
    <br/></br>

    <div id='info'>
    <div class='row'>");

    echo("
    <div id='abilitiesText'>
    <div class='text-center'><h2>Abilities<h2></div>
    <div class='text-center'><h3>Passive: $passive<h3></div>
    </div>
    <div class='col'>
    <div class='card h-100' style='width: 18rem;'>");
        if(file_exists($firstVideo)){
            echo("<video autoplay loop width='280' height='160'>
                <source src='$firstVideo' type='video/mp4'>
                    </video>");}
        else{  
            echo("<img src='$firstVideoPH' alt='nema slike'/>");
        }
        echo("
         <div class='card-body'>
            <p class='card-title'><b>$first</b></p>
             <img src='$firstIcon'/>
             <br/> <br/>
             <p class='card-text'>$firstDesc</p>
        </div>
    </div>
    </div>

    <div class='col'>
        <div class='card h-100' style='width: 18rem;'>");
            if(file_exists($secondVideo)){
                echo(" <video autoplay loop width='280' height='160'>
                <source src='$secondVideo' type='video/mp4'>
                </video>");

            }
            else{
                echo("<img src='$secondVideoPH' alt='nema slike'/>");
            }
            echo("
             <div class='card-body'>
                <p class='card-title'><b>$second</b></p>
                 <img src='$secondIcon'/>
                 <br/> <br/>
                 <p class='card-text'>$secondDesc</p>
            </div>
        </div>
    </div>

    <div class='col'>
        <div class='card h-100' style='width: 18rem;'>");
            if(file_exists($thirdVideo)){
                echo(" <video autoplay loop width='280' height='160'>
                <source src='$thirdVideo' type='video/mp4'>
                </video>");

            }
            else{
                echo("<img src='$thirdVideoPH' alt='nema slike'/>");
            }
            echo("
             <div class='card-body'>
                <p class='card-title'><b>$third</b></p>
                 <img src='$thirdIcon'/>
                 <br/> <br/>
                 <p class='card-text'>$thirdDesc</p>
            </div>
        </div>
    </div>

    <div class='col'>
        <div class='card h-100' style='width: 18rem;'>");
            if(file_exists($fourthVideo)){
                echo(" <video autoplay loop width='280' height='160'>
                <source src='$fourthVideo' type='video/mp4'>
                </video>");

            }
            else{
                echo("<img src='$fourthVideoPH' alt='nema slike'/>");
            }
            echo("
             <div class='card-body'>
                <p class='card-title'><b>$fourth</b></p>
                 <img src='$fourthIcon'/>
                 <br/> <br/>
                 <p class='card-text'>$fourthDesc</p>
            </div>
        </div>
    </div>

    </div>
    </div>
</div></div>");

?>