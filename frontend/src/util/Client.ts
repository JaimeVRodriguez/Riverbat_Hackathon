import axios from "axios";

import {TrackObject} from "./type/TrackObjectType.ts";

export const getTrackByName = async (track: TrackObject) => {
    const youtubeRegex = new RegExp("data-youtube-url=(.+)", "g");
    let res = '';
    try {
        const response = await axios.get(`http://localhost:8080/music/track/${btoa(track.url)}`);
        let regexMatch = response.data.match(youtubeRegex)[0];
        regexMatch = regexMatch.slice(regexMatch.lastIndexOf('=') + 1, -1);
        res = 'https://www.youtube.com/embed/' + regexMatch + '?autoplay=1'
    } catch (error) {
        console.error('Error fetching music data:', error);
    }
    return res;
};
export const getMusicByDecade = async (selectedDecade: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/music/${selectedDecade}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching music data:', error);
    }
};
export const getAlbumArt = async (mdid: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/music/track/album/${mdid}`);
        return response.data
    } catch (error) {
        console.error('Error fetching music data:', error);
    }
}