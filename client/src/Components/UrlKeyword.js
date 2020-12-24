import React, {useState, useContext, useEffect} from 'react';
import UrlItem from './UrlItem';
import UrlService from '../Services/UrlService';
import Message from './Message';
import { AuthContext } from '../Context/AuthContext';

const UrlKeyword = props => {
    const [urlKeyword, setUrlKeyword] = useState({url : ""});
    const [listUrlKeyword, setListUrlKeyword] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(()=>{
        UrlService.getListUrlKeyword().then(data=>{
            setListUrlKeyword(data.urls);
        });
    },[]);

    
 
    const onSubmit = e =>{
        e.preventDefault();
        UrlService.postUrlKeyword(urlKeyword).then(data =>{
            const { message } = data;
            resetForm();
            if(!message.msgError){
                UrlService.getListUrlKeyword().then(getData=>{
                    setListUrlKeyword(getData.urls);
                    setMessage(message);
                });
            }
            else if(message.msgBody === "UnAuthorized"){
                setMessage(message);
                authContext.setUser({username : ""});
                authContext.setIsAuthenticated(false);
            }
            else{
                setMessage(message);
            }
        })
    }

    const onChange = e =>{
        setUrlKeyword({url : e.target.value});
    }

    const resetForm = ()=>{
        setUrlKeyword({url : ""});
    }

    return(
        <div>
            <ul className="list-group">
                {
                    listUrlKeyword && listUrlKeyword.map(urlKeyword =>{
                        return <UrlItem key={urlKeyword._id} urlKeyword={urlKeyword}/>
                    })
                }
            </ul>
            <br/>
            <form onSubmit={onSubmit}>
                <label htmlFor="urlKeyword">Enter UrlKeyword</label>
                <input type="text"
                    name = "urlKeyword"
                    value={urlKeyword.url}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Please Enter Anything You Like"
                    />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )

}

export default UrlKeyword;