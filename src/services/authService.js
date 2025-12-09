const API_URL = 'http://localhost:3000/usuarios'

export async function login(username, password){  
    
        
        try{
        const response = await fetch(`${API_URL}?username=${username}&password=${password}`)
        if(!response.ok) throw new Error("Error en la conxión al servidor")
        const data = await response.json()
    
        //Comprobamos si data trae valores
        if(data.length===0){
            //No nos viene info del usuario
            return false        
        }
            
        const user = data[0]
        localStorage.setItem('usario_economato',JSON.stringify(user))

        return true

        }catch(error){
            console.error("Error en el login:",error)
            return false
        }
}

export function logout(){
    localStorage.removeItem('usario_economato')
    window.location.href = '/templates/login.html'
}

export function isAuthenticated(){
    const user = localStorage.getItem('usario_economato')
    return user !== null
}