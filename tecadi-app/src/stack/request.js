const BASE_URL = "https://tecadilabs.tecadi.com.br:8088/tecadi"
export default {

    login : async (username,password) => {
        
        const req = await fetch(`${BASE_URL}/api/oauth2/v1/token?grant_type=password&username=${username}&password=${password}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password})
        })
        const json = await req.json()
        return json
    },
    list: async (token) => {
        const req = await fetch(`${BASE_URL}/treinamento/produto?offset=&limit=5000000`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                tenantId: '01,103',
                Authorization: `Bearer ${token}`
            },
        });
        const json = await req.json();
        return json;
    },
    group: async (token) => {
        const req = await fetch(`${BASE_URL}/treinamento/produto/grupo`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        const json = await req.json();
        return json;
    },
    um: async (token) => {
        const req = await fetch(`${BASE_URL}/treinamento/produto/um`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        const json = await req.json();
        return json;
    },
    register: (token, data) => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/treinamento/produto`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'tenantId': '01,103',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }).then((resp) => { 
                resolve(resp.statusText)      
            })

        })
    },
    update: (token, data) => {
        
        return new Promise((resolve, reject) => {
             fetch(`${BASE_URL}/treinamento/produto`, {
                method: 'put',
                maxBodyLength: Infinity,
                headers: {
                    'tenantId': '01,103',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }).then((resp) => { 
                resolve(resp.statusText)
            }).catch((err) => {
                reject(err)
            })

        })
    },
    delete: (token, cod) => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/treinamento/produto?codigo=${cod}`, {
                method: 'delete',
                maxBodyLength: Infinity,
                headers: {
                    'tenantId': '01,103',
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                resolve(response.statusText)
            }).then((err) => {
                reject(err)
            })

        })
    }
};