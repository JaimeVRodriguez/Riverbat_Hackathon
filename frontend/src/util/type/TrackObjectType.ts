import {ArtistObject} from "./ArtistObjectType.ts";
import {ImageObject} from "./ImageObjectType.ts";

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