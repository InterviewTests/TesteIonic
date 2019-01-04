export class Movie {
  adult: boolean;
  poster_path: string;
  overview: string;
  genre_ids: string[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  release_date: string;
  runtime: number;

  public fakeData() {
    this.adult = false;
    this.poster_path = 'https://s-i.huffpost.com/gen/2165154/images/o-PULP-FICTION-facebook.jpg';
    this.overview = 'Um filme por Quentin Tarantino';
    this.genre_ids = [];
    this.id = 1;
    this.original_title = 'Pulp Fiction';
    this.original_language = 'Inglês';
    this.title = 'Pulp Fiction';
    this.backdrop_path = '';
    this.popularity = 4.5;
    this.vote_count = 5189;
    this.vote_average = 4.7;
    this.release_date = '01-01-2005';
    this.runtime = 143;
  }

}
