const API_URL = 'http://localhost:3000'

export const AuthService = {
    async login(username, password) {
        const response = await fetch('$(API_URL)/usuarios?username=${usernae}&password=${password}')
        const data = response.json()
        
        //Comprobamos si data trae valores
        if(data.lenght===0){}
            //No nos viene info del usuario
        const user = data[0]

        return user

    }
}