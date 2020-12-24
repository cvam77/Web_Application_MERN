export default {
    getListUrlKeyword : ()=>{
            return fetch('/user/listurlkeyword')
                .then(response=>{
                    if(response.status !== 401){
                        
                        return response.json().then(data => data);
                    }
                    else    
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },
    postUrlKeyword : urlKeyword =>{
        return fetch('/user/urlkeyword',{
            method : "post",
            body : JSON.stringify(urlKeyword),
            headers:{
                'Content-type' : 'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data=>data);
            }
            else
                return {message : {msgBody : "UnAuthorized"},msgError : true};
        })
    }
}