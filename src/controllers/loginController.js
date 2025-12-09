import { login } from "../services/authService.js";
import { LoginUI } from "../views/login-ui.js";

export function inicializar(){

    const form = document.getElementById("login-form")
    if (!form) return;

    form.addEventListener("submit", async (event) =>{
        event.preventDefault()

        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        try{

            if(!username || !password){
                throw new Error("El usuario y la constraseña son obligatorios")
            }
            const correcto = await login(username,password)
            if(correcto){
            window.location.hash="#economato"
            window.location.reload();
            }else{
                throw new Error("El usuario y/o la constraseña son incorrectos")
            }
            

        }catch (error) {
            // Manejo de errores visual usando tu clase LoginUI
            if (LoginUI && typeof LoginUI.showMessage === 'function') {
                LoginUI.showMessage(error.message, "error");
            } else {
                console.error(error);
                alert(error.message);
            }
        }

    } 

    )
}