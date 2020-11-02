import React, {useState, useEffect} from 'react';
import SearchBar from "./SearchBar";
import useVideos from "../hooks/useVideos";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import './Main.css';


const App = () => {

    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, search] = useVideos('national parks');

    useEffect(() => {
        setSelectedVideo(videos[0]);
    },[videos])


    return (
        <div className="content">
            <SearchBar onFormSubmit={search}/>
            <div className="ui grid">
                <div className="ui row">
                    <div className="ten wide column">
                        <VideoDetail video={selectedVideo}/>
                    </div>
                    <div className="six wide column">
                        <VideoList onVideoSelect={(video) => selectedVideo(video)} videos={videos}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;