// Check login

const currentTrainer =
JSON.parse(localStorage.getItem("currentTrainer"));


if(!currentTrainer && 
!window.location.pathname.includes("index.html")){

    window.location.href="index.html";

}


// Layout container

document.body.innerHTML = `


<div class="flex min-h-screen">


<!-- Sidebar -->

<aside id="sidebar"
class="w-64 bg-white shadow-lg fixed h-full">


<div class="p-6 border-b">

<h1 class="text-xl font-bold text-blue-500">

BQ Trainer System

</h1>

</div>



<nav class="p-4 space-y-2">


${menuItem(
"dashboard.html",
"fa-house",
"Dashboard"
)}


${menuItem(
"timetable.html",
"fa-calendar",
"Timetable"
)}


${menuItem(
"classes.html",
"fa-book",
"My Classes"
)}


${menuItem(
"students.html",
"fa-users",
"Students"
)}


${menuItem(
"attendance.html",
"fa-check",
"Attendance"
)}



<button
onclick="logout()"
class="w-full flex gap-3 items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg">


<i class="fa-solid fa-right-from-bracket"></i>

Logout


</button>


</nav>


</aside>




<!-- Main -->

<div class="ml-64 flex-1">



<header
class="bg-white shadow px-8 py-5 flex justify-between">


<div>


<h2 class="text-2xl font-bold text-blue-500"
id="pageTitle">

</h2>


<p class="text-gray-500">

Welcome,
<span id="trainerName"></span>

</p>


</div>



<div class="text-right">


<p id="date"></p>

<p id="clock"
class="text-blue-500 font-semibold">
</p>


</div>


</header>




<main id="content"
class="p-8">


</main>



</div>


</div>


`;



// Menu generator

function menuItem(link,icon,text){


let active =
window.location.pathname.includes(link)
?
"bg-blue-500 text-white"
:
"hover:bg-blue-50";


return `


<a href="${link}"

class="flex gap-3 items-center px-4 py-3 rounded-lg ${active}">


<i class="fa-solid ${icon}"></i>

${text}


</a>


`;

}



// Trainer Name

if(currentTrainer){

document.getElementById("trainerName")
.innerHTML=currentTrainer.name;

}



// Clock

function updateClock(){

let now=new Date();


document.getElementById("date")
.innerHTML=
now.toLocaleDateString();


document.getElementById("clock")
.innerHTML=
now.toLocaleTimeString();


}


setInterval(updateClock,1000);

updateClock();




// Logout

function logout(){

localStorage.removeItem(
"currentTrainer"
);


window.location.href="index.html";


}