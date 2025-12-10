import { login } from "../services/authService.js";
import { LoginUI } from "../views/login-ui.js";

export function inicializar(){
// Obtener el formulario de login
    const form = document.getElementById("login-form")
    if (!form) return;

    form.addEventListener("submit", async (event) =>{
        event.preventDefault()

        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        try{
// Validaciones básicas
            if(!username || !password){
                throw new Error("El usuario y la constraseña son obligatorios")
            }
            const correcto = await login(username,password)
            if(correcto){
            window.location.href="main.html"
            }else{
                throw new Error("El usuario y/o la constraseña son incorrectos")
            }
            
// Manejo de errores de login
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