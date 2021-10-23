import { useState, useEffect } from 'react';
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        //abortCont is used to abort the fetching of the blogs in homepage when we are not on homepage
        const abortCont = new AbortController();

        setTimeout(() => {
            // fetch the data from the link 
            fetch(url, { signal: abortCont.signal })
                //  parse the json file to a js object and then return the respond
                .then(res => {
                    if (!res.ok) {
                        throw Error("could not fetch the data for that resource")
                    }
                    return res.json();
                })
                //then use the data to set the blogs to show at the homepage
                .then(data => {
                    setData(data);
                    setIsLoaded(true);
                    setError(null);
                })
                .catch(err => {
                    // if the error catched is an AbortError that we created then do not update the state
                    if(err.name === 'AbortError') {
                        console.log('fetch aborted')
                    }
                    else {
                        setIsLoaded(true);
                        setError(err.message);
                    }
                })
        }, 1000);

        return ()=> abortCont.abort();
    }, [url]);

    return { data, isLoaded, error }
}

export default useFetch;