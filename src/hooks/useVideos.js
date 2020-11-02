import React, {useEffect, useState} from "react";
import youtube from "../api/youtube";

const KEY = process.env.REACT_APP_API_KEY;
const useVideos = (defaultSearch) => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        search(defaultSearch);
    }, [defaultSearch]);

    const search = async (term) => {
        const response = await youtube.get('/search',
            {
                params: {
                    part: 'snippet',
                    maxResults: 5,
                    key: KEY,
                    type: 'video',
                    q: term
                }
            }
        );
        setVideos(response.data.items);

    }

return [videos, search]
}

export default useVideos;