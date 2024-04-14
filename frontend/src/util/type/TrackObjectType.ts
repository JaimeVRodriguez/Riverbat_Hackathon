import {ImageObject} from "./ImageObjectType.ts";

export type TrackObject =
    {
        artist: string;
        duration: string;
        image: ImageObject[];
        imagePath: string;
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