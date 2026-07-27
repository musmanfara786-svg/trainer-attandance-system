// =================================
// Student Details System
// =================================



let students =

JSON.parse(localStorage.getItem("students")) || [];



let attendance =

JSON.parse(localStorage.getItem("attendance")) || [];





// Get selected student

let selectedStudent =

localStorage.getItem("selectedStudent");






if(!selectedStudent){


alert("No student selected");


window.location.href="students.html";


}





// Find student


let student =

students.find(s =>

s.id === selectedStudent

);






if(student){


document.getElementById("studentId").innerHTML =
student.id;


document.getElementById("studentName").innerHTML =
student.name;


document.getElementById("studentContact").innerHTML =
student.phone || "Not Available";


document.getElementById("studentGender").innerHTML =
student.gender || "Not Available";


document.getElementById("studentClass").innerHTML =
student.classId || "Not Assigned";


document.getElementById("studentStatus").innerHTML =
student.status || "Active";



}









// =================================
// Attendance Calculation
// =================================

let studentAttendance = [];
if(student){
    studentAttendance = attendance.filter(a =>
        a.studentId === student.id
    );
}




let present = 0;

let absent = 0;

let leave = 0;





studentAttendance.forEach(a=>{


if(a.status==="Present")

present++;



if(a.status==="Absent")

absent++;



if(a.status==="Leave")

leave++;



});







document.getElementById("present").innerHTML =
present;



document.getElementById("absent").innerHTML =
absent;



document.getElementById("leave").innerHTML =
leave;







let total =

present + absent + leave;



let percentage =

total === 0

?

0

:

Math.round(

(present / total) * 100

);






document.getElementById("percentage").innerHTML =

percentage + "%";









// =================================
// Attendance History Table
// =================================



let historyTable =

document.getElementById("attendanceHistory");



historyTable.innerHTML="";





if(studentAttendance.length===0){


historyTable.innerHTML=`

<tr>

<td colspan="3"

class="p-6 text-gray-500">

No attendance record available.

</td>

</tr>

`;


}

else{



studentAttendance
.reverse()
.forEach(record=>{


let color = "";



if(record.status==="Present")

color="bg-green-100 text-green-600";



if(record.status==="Absent")

color="bg-red-100 text-red-600";



if(record.status==="Leave")

color="bg-yellow-100 text-yellow-600";





historyTable.innerHTML +=`


<tr class="border-b">


<td class="p-3">

${record.date}

</td>



<td>

${record.className}

</td>




<td>


<span class="px-3 py-1 rounded ${color}">

${record.status}

</span>


</td>



</tr>


`;



});


}