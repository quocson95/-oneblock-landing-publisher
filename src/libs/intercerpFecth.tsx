const FectIntercerp = (    
        input: string | URL | globalThis.Request,
        init?: RequestInit,):  Promise<Response> => {
        const f = fetch(input, init);        
        f.then (resp => {
            if (resp.status == 401) {
                document.cookie = `session=;`;
                window.location.replace("/");                         
            }         
        });   
        return f;
}

export default FectIntercerp;