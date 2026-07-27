// BQ Trainer System Dashboard


let students =
JSON.parse(localStorage.getItem("students")) || [];


let classes =
JSON.parse(localStorage.getItem("classes")) || [];


let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];



// =============================
// Active Students
// =============================

let activeStudentCount = students.filter(student =>

    student.deleted !== true &&
    student.status === "Active"

).length;


document.getElementById("activeStudents").innerText =
activeStudentCount;



// =============================
// Total Classes
// =============================

document.getElementById("totalClasses").innerText =
classes.length;




// =============================
// Today's Class
// =============================

let today =
new Date().toLocaleDateString(
"en-US",
{
weekday:"long"
}
);


let todayClass = classes.find(cls =>

    cls.day1 === today ||
    cls.day2 === today

);



if(todayClass){
document.getElementById("todayClassDisplay").innerHTML =

`
${todayClass.subject}
<br>
${todayClass.start} - ${todayClass.end}
`;

}

else{

document.getElementById("todayClassDisplay").innerHTML =

"No Class";

}


// =============================
// Attendance Percentage
// =============================

let todayDate =
new Date().toISOString().split("T")[0];


let todayAttendance =
attendance.filter(a=>

a.date === todayDate

);



if(todayAttendance.length > 0){


let present =
todayAttendance.filter(a=>

a.status==="Present"

).length;



let percentage =
Math.round(
(present / todayAttendance.length) * 100
);



document.getElementById("attendancePercent").innerText =
percentage+"%";


}
else{


document.getElementById("attendancePercent").innerText =
"0%";


}





// =============================
// Recent Attendance
// =============================


let recentBox =
document.getElementById("recentAttendance");


if(attendance.length === 0){

    recentBox.innerHTML = `
    
    <p class="text-gray-500">
    No attendance records.
    </p>

    `;

}

else{


let recent =
attendance
.slice()
.reverse()
.slice(0,5);



recentBox.innerHTML="";


recent.forEach(record=>{


recentBox.innerHTML += `

<div class="border-b py-3">

<div class="font-semibold">

${record.studentName}

</div>


<div class="text-gray-500 text-sm">

${record.className}

</div>


<div class="
text-sm
${record.status==="Present"
?"text-green-600"
:
record.status==="Absent"
?"text-red-600"
:
"text-yellow-600"}

">

${record.status}

</div>


</div>


`;

});


}