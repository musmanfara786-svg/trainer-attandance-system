// ===== Elements =====

const modal = document.getElementById("studentModal");
const studentTable = document.getElementById("studentTable");
const showDeletedCheckbox = document.getElementById("showDeleted");

const studentId = document.getElementById("studentId");
const studentName = document.getElementById("studentName");
const studentPhone = document.getElementById("studentPhone");
const studentEmail = document.getElementById("studentEmail");
const studentGender = document.getElementById("studentGender");
const studentClass = document.getElementById("studentClass");
const studentStatus = document.getElementById("studentStatus");


// ===== Load Data =====

let students =
JSON.parse(localStorage.getItem("students")) || [];

let classes =
JSON.parse(localStorage.getItem("classes")) || [];


// ===== Populate Class Dropdown =====

function loadClasses(){

    studentClass.innerHTML =
    `<option value="">Select Class</option>`;

    classes.forEach(c=>{

        studentClass.innerHTML +=

        `<option value="${c.subject}">
            ${c.subject} (${c.batch})
        </option>`;

    });

}


// ===== Open Modal =====

document.getElementById("addStudentBtn").onclick = ()=>{

    editId = null;
    clearForm();
    document.getElementById("modalTitle").innerHTML = "Register Student";
    document.getElementById("saveStudent").innerHTML = "Save Student";
    modal.classList.remove("hidden");

};


// ===== Close Modal =====

document.getElementById("closeModal").onclick=closeModal;

document.getElementById("cancelBtn").onclick=closeModal;


function closeModal(){

    modal.classList.add("hidden");

}


// ===== Save Student =====

document.getElementById("saveStudent").onclick=function(){

    saveStudent();

};


function saveStudent(){

    const id = studentId.value.trim();

    const name = studentName.value.trim();

    const phone = studentPhone.value.trim();

    const email = studentEmail.value.trim();

    const gender = studentGender.value;

    const className = studentClass.value;

    const status = studentStatus.value;



    // Validation

    if(

        id==="" ||

        name==="" ||

        phone==="" ||

        email==="" ||

        className===""

    ){

        alert("Please fill all required fields.");

        return;

    }



    // Duplicate ID

    const duplicate = students.find(s=>s.id===id);

    if(duplicate){

        alert("Student ID already exists.");

        return;

    }



    const student={

        id:id,

        name:name,

        phone:phone,

        email:email,

        gender:gender,

        classId:className,

        status:status,

        deleted:false

    };


    students.push(student);


    localStorage.setItem(

        "students",

        JSON.stringify(students)

    );


    displayStudents();

    closeModal();

    clearForm();

}


// ===== Display Students =====

function displayStudents(){

    let list = students;
    if(!showDeletedCheckbox.checked){
        list = students.filter(s => !s.deleted);
    }

    if(list.length===0){

        studentTable.innerHTML=

        `<tr>

        <td colspan="7"

        class="text-center p-8 text-gray-500">

        No students found.

        </td>

        </tr>`;

        return;

    }


    studentTable.innerHTML="";


    list.forEach(student=>{

        let isDeleted = student.deleted;
        let statusColor = isDeleted ? "text-red-400" : "text-green-600";

        studentTable.innerHTML+=`

        <tr class="border-b hover:bg-gray-50 ${isDeleted ? 'bg-red-50 line-through text-gray-400' : ''}">

            <td class="px-4 py-3">

                ${student.id}

            </td>

            <td class="px-4 py-3">

                ${student.name}

            </td>

            <td class="px-4 py-3">

                ${student.phone}

            </td>

            <td class="px-4 py-3">

                ${student.classId}

            </td>

            <td class="px-4 py-3">

                <span class="${statusColor}">

                ${isDeleted ? "Deleted" : student.status}

                </span>

            </td>

            <td class="px-4 py-3">

                <button
                data-action="view"
                data-id="${student.id}"
                class="text-blue-500 ${isDeleted ? 'opacity-50' : ''}">

                <i class="fa-solid fa-eye"></i>

                </button>

                ${isDeleted ? `
                <button
                data-action="restore"
                data-id="${student.id}"
                class="text-green-500 ml-3 font-bold">
                <i class="fa-solid fa-rotate-left"></i> Restore
                </button>
                ` : `
                <button
                data-action="edit"
                data-id="${student.id}"
                class="text-green-500 ml-3">

                <i class="fa-solid fa-pen"></i>

                </button>

                <button
                data-action="delete"
                data-id="${student.id}"
                class="text-red-500 ml-3">

                <i class="fa-solid fa-trash"></i>

                </button>
                `}

            </td>

        </tr>

        `;

    });

}



// ===== Clear Form =====

function clearForm(){

    studentId.value="";

    studentName.value="";

    studentPhone.value="";

    studentEmail.value="";

    studentGender.value="Male";

    studentClass.value="";

    studentStatus.value="Active";

}



// ===== View Student =====

function viewStudent(id){
    localStorage.setItem("selectedStudent", id);
    window.location.href = "student-details.html";
}

// ===== Edit Student =====

let editId = null;

function editStudent(id){
    let student = students.find(s => s.id === id);
    if(!student) return;

    editId = id;
    document.getElementById("modalTitle").innerHTML = "Edit Student";
    document.getElementById("saveStudent").innerHTML = "Update Student";

    studentId.value = student.id;
    studentName.value = student.name;
    studentPhone.value = student.phone;
    studentEmail.value = student.email;
    studentGender.value = student.gender;
    studentClass.value = student.classId;
    studentStatus.value = student.status;

    modal.classList.remove("hidden");
}

// ===== Delete Student =====

function deleteStudent(id){
    if(!confirm("Delete this student?")) return;

    let student = students.find(s => s.id === id);
    if(student){
        student.deleted = true;
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}

// ===== Restore Student =====

function restoreStudent(id){
    if(!confirm("Restore this student?")) return;
    let student = students.find(s => s.id === id);
    if(student){
        student.deleted = false;
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}

// Override save to handle edit
saveStudent = function(){
    const id = studentId.value.trim();
    const name = studentName.value.trim();
    const phone = studentPhone.value.trim();
    const email = studentEmail.value.trim();
    const gender = studentGender.value;
    const className = studentClass.value;
    const status = studentStatus.value;

    if(id==="" || name==="" || phone==="" || email==="" || className===""){
        alert("Please fill all required fields.");
        return;
    }

    if(editId){
        let student = students.find(s => s.id === editId);
        if(student){
            student.id = id;
            student.name = name;
            student.phone = phone;
            student.email = email;
            student.gender = gender;
            student.classId = className;
            student.status = status;
        }
        editId = null;
    }
    else{
        const duplicate = students.find(s => s.id === id);
        if(duplicate){
            alert("Student ID already exists.");
            return;
        }
        students.push({
            id, name, phone, email, gender,
            classId: className, status, deleted: false
        });
    }

    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
    closeModal();
    clearForm();
    document.getElementById("modalTitle").innerHTML = "Register Student";
    document.getElementById("saveStudent").innerHTML = "Save Student";
};

// ===== Search =====

function renderStudentRow(student){
    let isDeleted = student.deleted;
    let statusColor = isDeleted ? "text-red-400" : "text-green-600";
    return `
    <tr class="border-b hover:bg-gray-50 ${isDeleted ? 'bg-red-50 line-through text-gray-400' : ''}">
        <td class="px-4 py-3">${student.id}</td>
        <td class="px-4 py-3">${student.name}</td>
        <td class="px-4 py-3">${student.phone}</td>
        <td class="px-4 py-3">${student.classId}</td>
        <td class="px-4 py-3"><span class="${statusColor}">${isDeleted ? "Deleted" : student.status}</span></td>
        <td class="px-4 py-3">
            <button data-action="view" data-id="${student.id}" class="text-blue-500 ${isDeleted ? 'opacity-50' : ''}"><i class="fa-solid fa-eye"></i></button>
            ${isDeleted ? `
            <button data-action="restore" data-id="${student.id}" class="text-green-500 ml-3 font-bold"><i class="fa-solid fa-rotate-left"></i> Restore</button>
            ` : `
            <button data-action="edit" data-id="${student.id}" class="text-green-500 ml-3"><i class="fa-solid fa-pen"></i></button>
            <button data-action="delete" data-id="${student.id}" class="text-red-500 ml-3"><i class="fa-solid fa-trash"></i></button>
            `}
        </td>
    </tr>`;
}

document.getElementById("searchInput").addEventListener("input", function(){
    let value = this.value.trim().toLowerCase();
    let list = students;
    if(!showDeletedCheckbox.checked){
        list = students.filter(s => !s.deleted);
    }
    if(!value){
        displayStudents();
        return;
    }
    let filtered = list.filter(s =>
        s.id.toLowerCase().includes(value) ||
        s.name.toLowerCase().includes(value)
    );
    studentTable.innerHTML="";
    if(filtered.length===0){
        studentTable.innerHTML=`<tr><td colspan="6" class="text-center p-8 text-gray-500">No students found.</td></tr>`;
        return;
    }
    filtered.forEach(s => {
        studentTable.innerHTML += renderStudentRow(s);
    });
});

// ===== Show Deleted Toggle =====

showDeletedCheckbox.addEventListener("change", function(){
    displayStudents();
});

// ===== Event Delegation for Table Buttons =====

studentTable.addEventListener("click", function(e){
    let btn = e.target.closest("[data-action]");
    if(!btn) return;
    let action = btn.dataset.action;
    let id = btn.dataset.id;
    if(action === "view") viewStudent(id);
    else if(action === "edit") editStudent(id);
    else if(action === "delete") deleteStudent(id);
    else if(action === "restore") restoreStudent(id);
});

// ===== Auto-open edit modal from student-details page =====

let editStudentId = localStorage.getItem("editStudent");
if(editStudentId){
    editStudent(editStudentId);
    localStorage.removeItem("editStudent");
}

// ===== Initialize =====

loadClasses();

displayStudents();