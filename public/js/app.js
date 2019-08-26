console.log("Client side JS Loaded");


const form =  document.querySelector("form");
const input = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(input.value);
    message2.textContent = "Loading";
    message2.textContent = "";
    fetch("/weather?address="+input.value).then((response) => {
        response.json().then((data) =>{
            if (data.error) {
                console.log(data.error);
                message2.textContent = data.error;
                return
            }
            message1.textContent = data.address;
            message2.textContent = data.forecast;
            console.log(data.forecast)
        })

    });

})