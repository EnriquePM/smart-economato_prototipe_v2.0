import { AuthService } from "../services/authService.js";
import { LoginUI } from "../views/login-ui.js";


document.addEventListener("DOMContentLoaded",() =>{


    const form = document.getElementById("login-form")

    form.addEventListener("submit", async (event) =>{

        event.preventDefault()
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        try{

            if(!username || !password){
                throw new Error("El usuario y la constraseña son obligatorios")
            }
            const user = await AuthService.login(username,password)
            if(user){
            window.location.href="./templates/main.html"
            }else{
                throw new Error("El usuario y/o la constraseña son incorrectos")
            }
            

        }catch(error){
            //Algo para modificar la interfaz y mostrar el error
            LoginUI.showMessage(error.message, "error")
        }

    } 

    )
} 



)