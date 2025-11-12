import { AuthService } from "../services/authService.js";



document.addEventListener("DOMContentLoaded",() =>{


    const form =    document.getElementById("login-form")

    form.addEventListener("submit", async (event) =>{

        event.preventDefault()
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value


        try{
            const user = await AuthService.login(username,password)
            window.location.href="./templates/economato.html"

        }catch(error){
            //Vamos viendo que poner
        }

    } 

    )
} 



)