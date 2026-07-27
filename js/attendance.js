// =======================================
// BQ Trainer System - Attendance Module
// =======================================
// Elements
const classSelect = document.getElementById("classSelect");
const attendanceDate = document.getElementById("attendanceDate");
const attendanceTable = document.getElementById("attendanceTable");
const selectedInfo = document.getElementById("selectedInfo");

const presentCount = document.getElementById("presentCount");
const absentCount = document.getElementById("absentCount");
const leaveCount = document.getElementById("leaveCount");

const historyMonth = document.getElementById("historyMonth");
const historyHeader = document.getElementById("historyHeader");
const historyBody = document.getElementById("historyBody");

const saveBtn = document.getElementById("saveAttendance");

// Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];
let classes = JSON.parse(localStorage.getItem("classes")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

// Default Date
attendanceDate.value = new Date().toISOString().split("T")[0];

document.getElementById("todayDate").innerHTML =
new Date().toDateString();

// Default Month
historyMonth.value =
new Date().toISOString().slice(0,7);

// =======================================
// Load Classes
// =======================================

function loadClasses() {

    console.log("classes =", classes);
    console.log("Is array?", Array.isArray(classes));
    console.log("Length =", classes.length);

    classSelect.innerHTML = `
        <option value="">Select Class</option>
    `;

    classes.forEach(cls => {

        console.log("Adding:", cls);

        classSelect.innerHTML += `
            <option value="${cls.subject}">
                ${cls.subject} (${cls.batch})
            </option>
        `;

    });

    console.log("Options:", classSelect.options.length);
}


loadClasses();


// Auto Open Selected Class

let selectedClass =
localStorage.getItem("selectedClass");

if(selectedClass){

    classSelect.value = selectedClass;

}


// =======================================
// Load Students
// =======================================

function loadStudents(){

    let className = classSelect.value;

    selectedInfo.innerHTML =
    className
    ?
    "Selected Class : " + className
    :
    "";

   let classStudents = students.filter(s =>

    s.classId.trim().toLowerCase() ===
    className.trim().toLowerCase()

    &&

    !s.deleted

);

    attendanceTable.innerHTML="";

    if(classStudents.length===0){

        attendanceTable.innerHTML=`
        <tr>
            <td colspan="5"
            class="p-8 text-gray-500 text-center">
                No students enrolled in this class.
            </td>
        </tr>
        `;

        updateSummary();

        return;

    }

    classStudents.forEach(student=>{

        let oldRecord =
        attendance.find(a=>

            a.studentId===student.id &&
            a.date===attendanceDate.value

        );

        let status =
        oldRecord
        ?
        oldRecord.status
        :
        "Present";

        attendanceTable.innerHTML += `

        <tr class="border-b hover:bg-slate-50">

            <td class="p-3">
                ${student.id}
            </td>

            <td class="p-3 font-medium">
                ${student.name}
            </td>

            <td>
                <input
                type="radio"
                name="${student.id}"
                value="Present"
                ${status==="Present"?"checked":""}>
            </td>

            <td>
                <input
                type="radio"
                name="${student.id}"
                value="Absent"
                ${status==="Absent"?"checked":""}>
            </td>

            <td>
                <input
                type="radio"
                name="${student.id}"
                value="Leave"
                ${status==="Leave"?"checked":""}>
            </td>

        </tr>

        `;

    });

    updateSummary();

}

// =======================================
// Events
// =======================================

classSelect.addEventListener("change",()=>{

    loadStudents();

});

attendanceDate.addEventListener("change",()=>{

    loadStudents();

});
// =======================================
// Update Summary Cards
// =======================================

function updateSummary(){

    let p = 0;
    let a = 0;
    let l = 0;

    document
    .querySelectorAll('#attendanceTable input[type="radio"]:checked')
    .forEach(r=>{

        if(r.value==="Present") p++;
        if(r.value==="Absent") a++;
        if(r.value==="Leave") l++;

    });

    presentCount.innerHTML = p;
    absentCount.innerHTML = a;
    leaveCount.innerHTML = l;

}


// Update cards when trainer changes attendance

attendanceTable.addEventListener("change",updateSummary);



// =======================================
// Save Attendance
// =======================================

saveBtn.addEventListener("click",function(){

    let className = classSelect.value;

    if(className===""){

        alert("Please select a class.");

        return;

    }

    let date = attendanceDate.value;

    let classStudents = students.filter(s =>

    s.classId.trim().toLowerCase() ===
    className.trim().toLowerCase()

    &&

    !s.deleted

);



    classStudents.forEach(student=>{

        let status = document.querySelector(

            `input[name="${student.id}"]:checked`

        ).value;



        let oldRecord = attendance.find(a=>

            a.studentId===student.id &&
            a.className===className &&
            a.date===date

        );



        if(oldRecord){

            oldRecord.status = status;

        }

        else{

            attendance.push({

                studentId:student.id,

                studentName:student.name,

                className:className,

                date:date,

                status:status

            });

        }

    });



    localStorage.setItem(

        "attendance",

        JSON.stringify(attendance)

    );



    updateSummary();

    generateHistory();



    alert("Attendance saved successfully.");

});



// =======================================
// Auto Load First Time
// =======================================

loadStudents();

generateHistory();



// =======================================
// Remove Selected Class When Leaving
// =======================================

window.addEventListener("beforeunload",()=>{

    localStorage.removeItem("selectedClass");

});
// =======================================
// Monthly Attendance Register
// =======================================

historyMonth.addEventListener("change",()=>{

    generateHistory();

});





function generateHistory(){


    let className = classSelect.value;

    let month = historyMonth.value;



    if(!className || !month){

        historyHeader.innerHTML="";
        historyBody.innerHTML="";

        return;

    }




   let classStudents = students.filter(s =>

    s.classId.trim().toLowerCase() ===
    className.trim().toLowerCase()

    &&

    !s.deleted

);



    let records = attendance.filter(a =>

        a.className === className &&
        a.date.startsWith(month)

    );





    if(records.length===0){


        historyHeader.innerHTML="";


        historyBody.innerHTML=`

        <tr>

        <td colspan="10"
        class="p-8 text-gray-500">

        No attendance record found.

        </td>

        </tr>

        `;

        return;

    }





    let dates = [

        ...new Set(

            records.map(r=>r.date)

        )

    ];



    dates.sort();





    // HEADER

historyHeader.innerHTML = `
<tr>

<th class="border p-3 bg-sky-100">
ID
</th>

<th class="border p-3 bg-sky-100">
Student Name
</th>

${dates.map(date=>`

<th class="border p-3 bg-sky-100">
${date.split("-")[2]}
</th>

`).join("")}


<th class="border p-3 bg-green-100">
P
</th>

<th class="border p-3 bg-red-100">
A
</th>

<th class="border p-3 bg-yellow-100">
L
</th>

<th class="border p-3 bg-blue-100">
%
</th>


</tr>
`;



     




    historyBody.innerHTML="";





    classStudents.forEach(student=>{


        let present=0;

        let absent=0;

        let leave=0;




        let row = `

           <tr class="border-b hover:bg-slate-50">

            <td class="p-3 border">
           ${student.id}
           </td>

          <td class="p-3 border font-medium">
            ${student.name}
           </td>

            `;







        dates.forEach(date=>{


            let record = records.find(r =>

                r.studentId === student.id &&
                r.date === date

            );



            let value="-";

            let color="";




            if(record){


                if(record.status==="Present"){

                    value="P";

                    present++;

                    color="bg-green-100 text-green-700";

                }



                else if(record.status==="Absent"){

                    value="A";

                    absent++;

                    color="bg-red-100 text-red-700";

                }



                else if(record.status==="Leave"){

                    value="L";

                    leave++;

                    color="bg-yellow-100 text-yellow-700";

                }


            }






            row += `


            <td class="p-3 border">


            <span class="px-3 py-1 rounded ${color}">

            ${value}

            </span>


            </td>


            `;



        });







        let total = present + absent + leave;


        let percentage = total

        ? Math.round((present / total)*100)

        : 0;





        row += `


        <td class="p-3 border font-bold text-green-600">

        ${present}

        </td>



        <td class="p-3 border font-bold text-red-600">

        ${absent}

        </td>




        <td class="p-3 border font-bold text-yellow-600">

        ${leave}

        </td>




        <td class="p-3 border font-bold text-blue-600">

        ${percentage}%

        </td>



        </tr>


        `;


        console.log(row);
        historyBody.innerHTML += row;



    });



}