let classes =
JSON.parse(localStorage.getItem("classes")) || [];

let editIndex = -1;

display();

function saveClass(){

const subject=document.getElementById("subject").value.trim();

const batch=document.getElementById("batch").value.trim();

const day1=document.getElementById("day1").value;

const day2=document.getElementById("day2").value;

const start=document.getElementById("start").value;

const end=document.getElementById("end").value;

const room=document.getElementById("room").value.trim();

const capacity=document.getElementById("capacity").value;

if(subject===""||batch===""||start===""||end===""){

alert("Please fill all required fields");

return;

}

const startHour=parseInt(start.split(":")[0]);

const endHour=parseInt(end.split(":")[0]);

const dailyDuration=endHour-startHour;

const weeklyDuration=dailyDuration*2;

if(weeklyDuration!==4){

alert("Each class must total exactly 4 hours per week.");

return;

}

const trainer=
JSON.parse(localStorage.getItem("currentTrainer")) || {name:"Trainer"};

const obj={

subject,

batch,

day1,

day2,

start,

end,

duration:weeklyDuration,

room,

capacity,

trainer:trainer.name

};

if(editIndex==-1){

classes.push(obj);

}

else{

classes[editIndex]=obj;

editIndex=-1;

}

localStorage.setItem("classes",JSON.stringify(classes));

clearForm();

display();

}

function display(){

const tbody=document.getElementById("tableData");

tbody.innerHTML="";

classes.forEach((c,index)=>{

tbody.innerHTML+=`

<tr class="border-b text-center">

<td class="py-3">${c.subject}</td>

<td>${c.batch}</td>

<td>${c.day1}<br>${c.day2}</td>

<td>${c.start} - ${c.end}</td>

<td>${c.duration} Hours</td>

<td>${c.room}</td>

<td>${c.capacity}</td>

<td>

<button
onclick="editClass(${index})"
class="bg-blue-500 text-white px-3 py-1 rounded">

Edit

</button>

<button
onclick="deleteClass(${index})"
class="bg-red-500 text-white px-3 py-1 rounded">

Delete

</button>

</td>

</tr>

`;

});

}

function editClass(index){

editIndex=index;

const c=classes[index];

subject.value=c.subject;
batch.value=c.batch;
day1.value=c.day1;
day2.value=c.day2;
start.value=c.start;
end.value=c.end;
room.value=c.room;
capacity.value=c.capacity;

}

function deleteClass(index){

if(confirm("Delete this class?")){

classes.splice(index,1);

localStorage.setItem("classes",JSON.stringify(classes));

display();

}

}

function clearForm(){

subject.value="";
batch.value="";
start.value="";
end.value="";
room.value="";
capacity.value="";

}