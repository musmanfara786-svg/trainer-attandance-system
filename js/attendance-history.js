// =============================
// Attendance History System
// =============================


const historyClass =
document.getElementById("historyClass");

const historyMonth =
document.getElementById("historyMonth");

const loadHistory =
document.getElementById("loadHistory");

const historyHeader =
document.getElementById("historyHeader");

const historyBody =
document.getElementById("historyBody");



// Load Data

let classes =
JSON.parse(localStorage.getItem("classes")) || [];


let students =
JSON.parse(localStorage.getItem("students")) || [];


let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];





// =============================
// Load Classes Dropdown
// =============================


classes.forEach(c=>{


historyClass.innerHTML +=`

<option value="${c.subject}">

${c.subject} (${c.batch})

</option>

`;


});






// Default Month

historyMonth.value =
new Date()
.toISOString()
.substring(0,7);







// Button

loadHistory.onclick=function(){

generateReport();

};







function generateReport(){


let className =
historyClass.value;


let month =
historyMonth.value;



if(!className || !month){

alert("Please select class and month");

return;

}





// Students of selected class


let classStudents =

students.filter(student =>

student.classId===className
&&
student.deleted===false

);





if(classStudents.length===0){


historyBody.innerHTML=`

<tr>

<td colspan="10"

class="p-8 text-gray-500">

No students found.

</td>

</tr>


`;

return;


}






// Number of days


let year =
month.split("-")[0];


let selectedMonth =
month.split("-")[1];



let days =
new Date(
year,
selectedMonth,
0
).getDate();







// Create Header


historyHeader.innerHTML=`

<th class="px-4 py-3">

Student ID

</th>


<th class="px-4 py-3">

Student Name

</th>

`;






for(let i=1;i<=days;i++){


historyHeader.innerHTML +=`

<th class="px-3 py-3">

${i}

</th>

`;


}




historyHeader.innerHTML +=`

<th>

P

</th>

<th>

A

</th>

<th>

L

</th>

<th>

%

</th>

`;






// Body


historyBody.innerHTML="";






classStudents.forEach(student=>{


let present=0;

let absent=0;

let leave=0;



let row=`


<tr class="border-b">


<td class="px-4 py-3">

${student.id}

</td>



<td class="px-4 py-3 text-left">

${student.name}

</td>


`;






for(let day=1;day<=days;day++){



let date =
`${month}-${String(day).padStart(2,"0")}`;



let record =
attendance.find(a=>

a.studentId===student.id
&&
a.date===date

);




let status =
record
?
record.status
:
"-";




let color="";



if(status==="Present"){

present++;

color="bg-green-100 text-green-700";

}



else if(status==="Absent"){

absent++;

color="bg-red-100 text-red-700";

}



else if(status==="Leave"){

leave++;

color="bg-yellow-100 text-yellow-700";

}




row +=`

<td class="px-3 py-2">

<span class="px-2 py-1 rounded ${color}">

${status}

</span>

</td>

`;



}





let total =
present+absent+leave;


let percentage =
total===0
?
0
:
Math.round(
(present/total)*100
);





row +=`


<td class="bg-green-50">

${present}

</td>


<td class="bg-red-50">

${absent}

</td>


<td class="bg-yellow-50">

${leave}

</td>


<td class="font-bold text-blue-600">

${percentage}%

</td>


</tr>



`;



historyBody.innerHTML += row;



});



}