export interface Movie {
    id: number;
    vote_average: string;
    title: string;
    original_title: string;
    poster_path: string;
    backdrop_path: string;
    vote_count: number;
    overview: string;
    release_date: string;
    favorited: boolean;
    myListed: boolean;
    downloaded: boolean;
    timeDownloaded: number;
}
