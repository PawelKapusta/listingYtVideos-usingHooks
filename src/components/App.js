import React from 'react';
import SearchBar from "./SearchBar";
import youtube from "../api/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import './Main.css';

const KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
    state = {videos: [], selectedVideo: null};

    componentDidMount() {
        this.onTermSubmit('buildings');
    }


    onTermSubmit = async (term) => {
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
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });
    }
    onVideoSelect = video => {
        this.setState({selectedVideo: video});
    }

    render() {
        return (
            <div className="content">
                <SearchBar onFormSubmit={this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="ten wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="six wide column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;