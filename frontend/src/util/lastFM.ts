import axios from "axios";

export type ArtistObject = {
    mbid: string;
    name: string;
    url: string;
};

export type ImageObject = {
    '#text': string;
    size: string;
};

export type TrackObject =
    {
        artist: ArtistObject;
        duration: string;
        image: ImageObject[];
        mbid: string;
        name: string;
        streamable: {
            '#text'
                :
                string;
            fullTrack: string;
        };
        url: string;
        youtube: string;
    }

export const fetchYoutubeURL = async (track: TrackObject) => {
    const youtubeRegex = new RegExp("data-youtube-url=(.+)", "g");
    let res = '';
    try {
        //TODO: localhost should reflect prod backend
        //TODO: clean up string registration
        const response = await axios.get(`http://localhost:8080/music/track/${btoa(track.url)}`);
        let regexMatch = response.data.match(youtubeRegex)[0];
        regexMatch = regexMatch.slice(regexMatch.lastIndexOf('=') + 1, -1);
        res = 'https://www.youtube.com/embed/' + regexMatch + '?autoplay=1'
    } catch (error) {
        console.error('Error fetching music data:', error);
    }
    return res;
};
export const fetchTrackListForDecade = async (selectedDecade: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/music/${selectedDecade}`);
        return response.data.tracks.track;
    } catch (error) {
        console.error('Error fetching music data:', error);
    }
};


