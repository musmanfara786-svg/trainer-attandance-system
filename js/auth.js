// Create Default Trainer

if (!localStorage.getItem("trainers")) {

    const trainers = [

        {
            id:1,
            name:"Farah Maqbool",
            email:"trainer@gmail.com",
            password:"123456"
        }

    ];

    localStorage.setItem("trainers", JSON.stringify(trainers));

}

// Show Password Checkbox

const password = document.getElementById("password");

document.getElementById("showPass").addEventListener("change", function(){

    password.type = this.checked ? "text" : "password";

});

// Eye Button

document.getElementById("togglePassword").addEventListener("click", function(){

    password.type =
        password.type === "password"
        ? "text"
        : "password";

});

// Login

document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const pass = password.value.trim();

    const trainers = JSON.parse(localStorage.getItem("trainers"));

    const trainer = trainers.find(t =>

        t.email === email &&
        t.password === pass

    );

    if(trainer){

        localStorage.setItem("currentTrainer", JSON.stringify(trainer));

        window.location.href="dashboard.html";

    }

    else{

        document.getElementById("error").innerHTML =
        "Invalid Email or Password";

    }

});