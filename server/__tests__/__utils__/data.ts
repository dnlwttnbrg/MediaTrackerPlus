import { AccessToken } from 'src/entity/accessToken';
import { Configuration } from 'src/entity/configuration';
import { List } from 'src/entity/list';
import { MediaItemBase, MediaType } from 'src/entity/mediaItem';
import { NotificationPlatformsCredentials } from 'src/entity/notificationPlatformsCredentials';
import { NotificationsHistory } from 'src/entity/notificationsHistory';
import { TvEpisode } from 'src/entity/tvepisode';
import { TvSeason } from 'src/entity/tvseason';
import { UserRating } from 'src/entity/userRating';

export class Data {
  static generateSeen = (
    count: number,
    start: number,
    hasYear = true,
    year: false | number = false
  ) => {
    const result = [];
    for (let i = start; i < count + start; i++) {
      const item = {
        id: i + 1,
        date: hasYear
          ? new Date(
              year !== false ? year : 2000 + i,
              i % 12,
              (i % 28) + 1
            ).getTime()
          : null,
        mediaItemId: i,
        userId: Data.user.id,
      };
      result.push(item);
    }
    return result;
  };

  static generateMovies = (count: number, start: number, inFuture = false) => {
    const result = [];
    for (let i = start; i < count + start; i++) {
      result.push(this.generateMovie(i, inFuture));
    }
    return result;
  };

  static generateMovie = (id: number, inFuture: boolean) => {
    const new_id = id;
    return {
      id: new_id,
      lastTimeUpdated: new Date().getTime(),
      mediaType: 'movie',
      source: 'tmdb',
      title: 'movie' + new_id,
      externalPosterUrl: 'posterUrl',
      externalBackdropUrl: 'backdropUrl',
      releaseDate: `${
        inFuture ? new Date().getFullYear() + new_id : 1971 + new_id
      }-04-12`,
      tmdbId: 123456 + new_id,
      runtime: 124 + new_id,
    };
  };

  static generateTVShows = (count: number, start: number) => {
    const result = [];
    for (let i = start; i < count + start; i++) {
      result.push(this.generateTVShow(i));
    }
    return result;
  };

  static generateTVShow = (id: number) => {
    const new_id = id;
    return {
      id: new_id,
      lastTimeUpdated: new Date().getTime(),
      mediaType: 'tv',
      source: 'tmdb',
      title: 'title',
      externalPosterUrl: 'posterUrl',
      externalBackdropUrl: 'backdropUrl',
      releaseDate: `${1971 + new_id}-04-12`,
      tmdbId: 654321 + new_id,
      runtime: 124 + new_id,
    };
  };

  static addSameMovieMultipleTimesToSeen = (
    movie: { id: number },
    count: number
  ) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      const item = {
        id: 200 + i,
        date: new Date(2000 + i, i % 12, (i % 28) + 1).getTime(),
        mediaItemId: movie.id,
        userId: Data.user.id,
      };
      result.push(item);
    }
    return result;
  };

  static tvShow = {
    id: 1,
    lastTimeUpdated: new Date().getTime(),
    mediaType: 'tv',
    source: 'tmdb',
    title: 'title',
    externalPosterUrl: 'posterUrl',
    externalBackdropUrl: 'backdropUrl',
    releaseDate: '2002-05-07',
    runtime: 51,
    tmdbId: 754234,
  };

  static season = {
    id: 1,
    seasonNumber: 1,
    title: 'Season 1',
    isSpecialSeason: false,
    tvShowId: this.tvShow.id,
    numberOfEpisodes: 3,
    tmdbId: 82146,
  };

  static episode = {
    episodeNumber: 1,
    id: 1,
    isSpecialEpisode: false,
    releaseDate: '2000-04-01',
    seasonAndEpisodeNumber: 1001,
    seasonId: this.season.id,
    seasonNumber: 1,
    title: 'Episode 1',
    tvShowId: this.tvShow.id,
    tmdbId: 74431,
  };

  static episode2 = {
    episodeNumber: 2,
    id: 2,
    isSpecialEpisode: false,
    releaseDate: '2000-04-02',
    seasonAndEpisodeNumber: 1002,
    seasonId: this.season.id,
    seasonNumber: 1,
    title: 'Episode 2',
    tvShowId: this.tvShow.id,
  };

  static episode3 = {
    episodeNumber: 3,
    id: 3,
    isSpecialEpisode: false,
    releaseDate: '2000-04-03',
    seasonAndEpisodeNumber: 1003,
    seasonId: this.season.id,
    seasonNumber: 1,
    title: 'Episode 3',
    tvShowId: this.tvShow.id,
  };

  static movie = {
    id: 2,
    lastTimeUpdated: new Date().getTime(),
    mediaType: 'movie',
    source: 'tmdb',
    title: 'movie',
    externalPosterUrl: 'posterUrl',
    externalBackdropUrl: 'backdropUrl',
    releaseDate: '2001-04-12',
    tmdbId: 123456,
    runtime: 124,
  };

  static user_rating = {
    id: 0,
    date: 1766831317642,
    mediaItemId: 100,
    rating: 2,
    review: '',
    userId: 0,
  };

  static movie_ranked = {
    id: 100,
    lastTimeUpdated: new Date().getTime(),
    mediaType: 'movie',
    source: 'tmdb',
    title: 'movie_ranked',
    externalPosterUrl: 'posterUrl',
    externalBackdropUrl: 'backdropUrl',
    releaseDate: '2001-04-12',
    tmdbId: 111111,
    runtime: 124,
  };

  static movie_ranked_seen = {
    id: 100,
    date: new Date(2000, 12, 28).getTime(),
    mediaItemId: 100,
    userId: 0,
  };

  static videoGame = {
    id: 3,
    lastTimeUpdated: new Date().getTime(),
    mediaType: 'video_game',
    source: 'imdb',
    title: 'video_game',
    externalPosterUrl: 'posterUrl',
    externalBackdropUrl: 'backdropUrl',
  };

  static book = {
    id: 4,
    lastTimeUpdated: new Date().getTime(),
    mediaType: 'book',
    source: 'openlibrary',
    title: 'book',
    externalPosterUrl: 'posterUrl',
    externalBackdropUrl: 'backdropUrl',
  };

  static user = {
    id: 0,
    name: 'admin',
    admin: true,
    password: 'password',
    publicReviews: false,
  };

  static user2 = {
    id: 1,
    name: 'user',
    admin: false,
    password: 'password',
    publicReviews: false,
  };

  static watchlist: List = {
    id: 0,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    isWatchlist: true,
    name: 'Watchlist',
    privacy: 'private',
    userId: this.user.id,
    allowComments: false,
    displayNumbers: false,
    sortBy: 'recently-added',
    sortOrder: 'asc',
  };

  static movie_for_watchlist = {
    id: 200,
    lastTimeUpdated: new Date().getTime(),
    mediaType: 'movie',
    source: 'tmdb',
    title: 'movie_ranked',
    externalPosterUrl: 'posterUrl',
    externalBackdropUrl: 'backdropUrl',
    releaseDate: '2001-04-12',
    tmdbId: 111111,
    runtime: 124,
  };

  static movie_watchlist = {
    id: 0,
    listId: Data.watchlist.id,
    mediaItemId: Data.movie_for_watchlist.id,
    addedAt: new Date().getTime(),
  };

  static addMoviesToWatchlist = (count: number, start: number) => {
    const result = [];
    for (let i = start; i < count + start; i++) {
      const item = {
        id: i + 1,
        listId: Data.watchlist.id,
        mediaItemId: i,
        addedAt: new Date().getTime(),
      };
      result.push(item);
    }
    return result;
  };

  static list: List = {
    id: 1,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    isWatchlist: false,
    name: 'list',
    privacy: 'private',
    userId: this.user.id,
    allowComments: false,
    displayNumbers: false,
    sortBy: 'recently-added',
    sortOrder: 'asc',
  };

  static seen = {
    id: 1,
    date: new Date().getTime(),
    mediaItemId: this.movie.id,
    episodeId: this.episode.id,
    userId: this.user.id,
  };

  static listUser2: List = {
    ...this.list,
    userId: this.user2.id,
    id: 2,
  };
}

export class InitialData {
  static user = {
    id: 1,
    name: 'admin',
    admin: true,
    password: 'password',
    publicReviews: false,
  };

  static accessToken: AccessToken = {
    id: 1,
    userId: this.user.id,
    description: 'token',
    token: 'token',
  };

  static mediaItem = {
    id: 1,
    lastTimeUpdated: new Date().getTime(),
    mediaType: 'tv',
    source: 'user',
    title: 'title',
    poster: 'posterUrl',
    backdrop: 'backdropUrl',
    runtime: 51,
  };

  static season = {
    id: 1,
    description: 'description',
    releaseDate: '2001-02-20',
    tvShowId: this.mediaItem.id,
    title: 'title',
    seasonNumber: 1,
    numberOfEpisodes: 1,
    poster: 'posterUrl',
    isSpecialSeason: false,
  };

  static episode: TvEpisode = {
    id: 1,
    episodeNumber: 1,
    seasonId: this.season.id,
    tvShowId: this.mediaItem.id,
    isSpecialEpisode: false,
    seasonNumber: 1,
    title: 'Episode 1',
    releaseDate: '2001-02-20',
    seasonAndEpisodeNumber: 1001,
    runtime: 41,
  };

  static watchlist = {
    id: 1,
    userId: this.user.id,
    mediaItemId: this.mediaItem.id,
  };

  static userRating: UserRating = {
    id: 1,
    mediaItemId: this.mediaItem.id,
    date: new Date().getTime(),
    userId: this.user.id,
    rating: 4,
    review: 'review',
  };

  static userRating2: UserRating = {
    id: 2,
    mediaItemId: this.mediaItem.id,
    date: new Date().getTime(),
    userId: this.user.id,
    rating: 3,
    review: 'review2',
    seasonId: this.season.id,
  };

  static userRating3: UserRating = {
    id: 3,
    mediaItemId: this.mediaItem.id,
    date: new Date().getTime(),
    userId: this.user.id,
    rating: 5,
    review: 'review3',
    episodeId: this.episode.id,
  };

  static seen = {
    id: 1,
    date: new Date().getTime(),
    mediaItemId: this.mediaItem.id,
    episodeId: this.episode.id,
    userId: this.user.id,
  };

  static notificationPlatformsCredentials: NotificationPlatformsCredentials = {
    id: 1,
    name: 'key',
    platformName: 'platform',
    userId: this.user.id,
    value: 'value',
  };

  static notificationsHistory: NotificationsHistory = {
    id: 1,
    mediaItemId: this.mediaItem.id,
    episodeId: this.episode.id,
    sendDate: new Date().getTime(),
  };

  static configuration = {
    id: 1,
    enableRegistration: true,
  };

  static metadataProviderCredentials = {
    id: 1,
    providerName: 'IGDB',
    name: 'CLIENT_ID',
    value: '123',
  };

  static metadataProviderCredentials2 = {
    id: 2,
    providerName: 'IGDB',
    name: 'CLIENT_SECRET',
    value: '456',
  };
}
