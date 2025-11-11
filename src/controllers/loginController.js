import { AuthService } from "../services/authService";



document.addEventListener("DOMContentLoaded",() =>{


    const form = document.getElementById("login-form")

    form.addEventListener("submit",XXXX =>{

        
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value


        try{
            const user = AuthService.login(username,password)
            window.location.href="./templates/economato.html"

        }catch(error){
            //Vamos viendo que poner
        }

    } 

    )
} 



)