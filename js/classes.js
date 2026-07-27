const classContainer =
document.getElementById("classContainer");


const searchClass =
document.getElementById("searchClass");


const modal =
document.getElementById("studentModal");


const classStudents =
document.getElementById("classStudents");


let classes =
JSON.parse(localStorage.getItem("classes")) || [];


let students =
JSON.parse(localStorage.getItem("students")) || [];



displayClasses();



function displayClasses(list = classes){


if(list.length===0){


classContainer.innerHTML=`

<div class="bg-white rounded-xl shadow p-8 col-span-2 text-center">

<h2 class="text-xl font-bold">

No Classes Found

</h2>

<p class="text-gray-500">

Add classes from timetable.

</p>

</div>

`;


return;

}



classContainer.innerHTML="";



list.forEach((c,index)=>{


let enrolled =
students.filter(s=>

s.classId===c.subject &&
!s.deleted

).length;



let percentage =
Math.round(
(enrolled/c.capacity)*100
);



let color =
percentage>=100
?
"bg-red-500"
:
"bg-green-500";



classContainer.innerHTML += `


<div class="bg-white rounded-xl shadow-lg p-6">


<div class="flex justify-between">


<h2 class="text-2xl font-bold text-blue-500">

${c.subject}

</h2>


<span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">

${c.batch}

</span>


</div>



<div class="mt-5 space-y-3">


<p>

📅 <b>Days:</b>

${c.day1} / ${c.day2}

</p>


<p>

⏰ <b>Time:</b>

${c.start} - ${c.end}

</p>


<p>

📍 <b>Room:</b>

${c.room}

</p>


<p>

👥 <b>Capacity:</b>

${c.capacity}

</p>


<p>

🎓 <b>Enrolled:</b>

${enrolled}

</p>


</div>



<!-- Progress -->

<div class="mt-5">

<div class="flex justify-between text-sm">

<span>

Occupancy

</span>

<span>

${percentage}%

</span>


</div>


<div class="bg-gray-200 rounded-full h-3 mt-2">


<div

class="${color} h-3 rounded-full"

style="width:${percentage}%">

</div>


</div>


</div>




<div class="flex gap-3 mt-6">


<button

onclick="viewStudents('${c.subject}')"

class="flex-1 bg-blue-500 text-white py-2 rounded-lg">

View Students

</button>



<button

onclick="openAttendance('${c.subject}')"

class="flex-1 bg-green-500 text-white py-2 rounded-lg">

Attendance

</button>



</div>


</div>



`;

});


}




// Search


searchClass.addEventListener(
"input",
function(){


let value=this.value.toLowerCase();


let filtered =
classes.filter(c=>

c.subject.toLowerCase()
.includes(value)

||
c.batch.toLowerCase()
.includes(value)

);



displayClasses(filtered);



});




// View Students


function viewStudents(className){


let list =
students.filter(s=>

s.classId===className &&
!s.deleted

);



classStudents.innerHTML="";



if(list.length===0){


classStudents.innerHTML=`

<p class="text-gray-500">

No students enrolled.

</p>

`;

}

else{


list.forEach(s=>{


classStudents.innerHTML +=`

<div class="border p-3 rounded-lg">


<b>${s.name}</b>

<br>

<span class="text-gray-500">

${s.id}

</span>


</div>


`;


});


}



modal.classList.remove("hidden");


}





document.getElementById("closeModal")
.onclick=function(){

modal.classList.add("hidden");

};




// Attendance


function openAttendance(className){


    // Save selected class

    localStorage.setItem(
        "selectedClass",
        className
    );


    // Open attendance page

    window.location.href =
    "attendance.html";


}