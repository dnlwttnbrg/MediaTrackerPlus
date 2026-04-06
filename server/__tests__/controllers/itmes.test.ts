import { Database } from 'src/dbconfig';
import { Data } from '__tests__/__utils__/data';
import { request } from '__tests__/__utils__/request';
import { clearDatabase, runMigrations } from '__tests__/__utils__/utils';
import { ItemsController, GetItemsRequest } from 'src/controllers/items';
import { Pagination } from 'src/repository/mediaItem';
import { MediaItemItemsResponse } from 'src/entity/mediaItem';

describe('listItemController', () => {
  beforeEach(async () => {
    await runMigrations();

    await Database.knex('user').insert(Data.user);

    await Database.knex('list').insert(Data.list);
  });

  afterEach(clearDatabase);

  test('should retrieve items', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(30, 0));
    await Database.knex('mediaItem').insert(Data.generateTVShows(20, 30));
    await Database.knex('seen').insert(Data.generateSeen(50, 0));

    const res = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        all: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect((res.data as Pagination<MediaItemItemsResponse>).data.length).toBe(
      30
    );

    const res_tv = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'tv',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        all: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect(
      (res_tv.data as Pagination<MediaItemItemsResponse>).data.length
    ).toBe(20);
  });

  test('should order items last_seen', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(30, 0));
    await Database.knex('seen').insert(Data.generateSeen(30, 0));

    //order by desc

    const res_desc = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        all: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect(
      (res_desc.data as Pagination<MediaItemItemsResponse>).data.every(
        (b, i, { [i - 1]: a }) => !a || a.lastSeenAt > b.lastSeenAt
      )
    ).toBe(true);

    //order by asc

    const res_asc = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'asc',
        all: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect(
      (res_asc.data as Pagination<MediaItemItemsResponse>).data.every(
        (b, i, { [i - 1]: a }) => !a || a.lastSeenAt < b.lastSeenAt
      )
    ).toBe(true);
  });

  test('should order items title', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(30, 0));
    await Database.knex('seen').insert(Data.generateSeen(30, 0));

    //order by desc

    const res_desc = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'title',
        sortOrder: 'desc',
        all: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect(
      (res_desc.data as Pagination<MediaItemItemsResponse>).data.every(
        (b, i, { [i - 1]: a }) => !a || a.title > b.title
      )
    ).toBe(true);

    //order by release asc

    const res_asc = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'title',
        sortOrder: 'asc',
        all: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect(
      (res_asc.data as Pagination<MediaItemItemsResponse>).data.every(
        (b, i, { [i - 1]: a }) => !a || a.title < b.title
      )
    ).toBe(true);
  });

  test('should order items release', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(30, 0));
    await Database.knex('seen').insert(Data.generateSeen(30, 0));

    //order by desc

    const res_desc = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'releaseDate',
        sortOrder: 'desc',
        all: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect(
      (res_desc.data as Pagination<MediaItemItemsResponse>).data.every(
        (b, i, { [i - 1]: a }) => !a || a.releaseDate > b.releaseDate
      )
    ).toBe(true);

    //order by release asc

    const res_asc = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'releaseDate',
        sortOrder: 'asc',
        all: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect(
      (res_asc.data as Pagination<MediaItemItemsResponse>).data.every(
        (b, i, { [i - 1]: a }) => !a || a.releaseDate < b.releaseDate
      )
    ).toBe(true);
  });

  test('should paginate movies', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(60, 0));
    await Database.knex('seen').insert(Data.generateSeen(60, 0));

    const res = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        all: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect((res.data as Pagination<MediaItemItemsResponse>).data.length).toBe(
      40
    );

    const res_nextpage = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        all: true,
        page: 2,
        showRepeated: false,
      },
    });

    expect(
      (res_nextpage.data as Pagination<MediaItemItemsResponse>).data.length
    ).toBe(20);
  });

  test('should filter items ranked', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(10, 0));
    await Database.knex('seen').insert(Data.generateSeen(10, 0));
    await Database.knex('mediaItem').insert(Data.movie_ranked);
    await Database.knex('userRating').insert(Data.user_rating);
    await Database.knex('seen').insert(Data.movie_ranked_seen);

    const res = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        onlyWithUserRating: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect((res.data as Pagination<MediaItemItemsResponse>).data.length).toBe(
      1
    );
    expect((res.data as Pagination<MediaItemItemsResponse>).data[0].title).toBe(
      Data.movie_ranked.title
    );
  });

  test('should filter items not ranked', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(10, 0));
    await Database.knex('seen').insert(Data.generateSeen(10, 0));
    await Database.knex('mediaItem').insert(Data.movie_ranked);
    await Database.knex('userRating').insert(Data.user_rating);
    await Database.knex('seen').insert(Data.movie_ranked_seen);

    const res = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        onlyWithoutUserRating: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect((res.data as Pagination<MediaItemItemsResponse>).data.length).toBe(
      10
    );
    expect(
      (res.data as Pagination<MediaItemItemsResponse>).data.some(
        (el) => el.title === Data.movie_ranked.title
      )
    ).toBe(false);
  });

  test('should filter items on watchlist', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(10, 0));
    await Database.knex('seen').insert(Data.generateSeen(10, 0));
    await Database.knex('mediaItem').insert(Data.movie_for_watchlist);
    await Database.knex('listItem').insert(Data.movie_watchlist);

    const res = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        onlyOnWatchlist: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect((res.data as Pagination<MediaItemItemsResponse>).data.length).toBe(
      1
    );
    expect((res.data as Pagination<MediaItemItemsResponse>).data[0].title).toBe(
      Data.movie_for_watchlist.title
    );
  });

  test('should filter items on watchlist', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(10, 0));
    await Database.knex('seen').insert(Data.generateSeen(10, 0));
    await Database.knex('mediaItem').insert(Data.movie_for_watchlist);
    await Database.knex('listItem').insert(Data.movie_watchlist);

    const res = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        onlySeenItems: true,
        page: 1,
        showRepeated: false,
      },
    });

    expect((res.data as Pagination<MediaItemItemsResponse>).data.length).toBe(
      10
    );
    expect(
      (res.data as Pagination<MediaItemItemsResponse>).data.some(
        (el) => el.title === Data.movie_for_watchlist.title
      )
    ).toBe(false);
  });

  test('should not show repeated items', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(10, 0));
    await Database.knex('seen').insert(Data.generateSeen(10, 0));
    await Database.knex('mediaItem').insert(Data.movie_for_watchlist);
    await Database.knex('seen').insert(
      Data.addSameMovieMultipleTimesToSeen(Data.movie_for_watchlist, 3)
    );

    const res = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        page: 1,
        showRepeated: false,
      },
    });

    expect((res.data as Pagination<MediaItemItemsResponse>).data.length).toBe(
      11
    );
    expect(
      (res.data as Pagination<MediaItemItemsResponse>).data.filter(
        (obj) => obj.id === Data.movie_for_watchlist.id
      ).length
    ).toBe(1);
  });

  test('should show repeated items', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(10, 0));
    await Database.knex('seen').insert(Data.generateSeen(10, 0));
    await Database.knex('mediaItem').insert(Data.movie_for_watchlist);
    await Database.knex('seen').insert(
      Data.addSameMovieMultipleTimesToSeen(Data.movie_for_watchlist, 3)
    );

    const res = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        page: 1,
        showRepeated: true,
      },
    });

    expect((res.data as Pagination<MediaItemItemsResponse>).data.length).toBe(
      13
    );
    expect(
      (res.data as Pagination<MediaItemItemsResponse>).data.filter(
        (obj) => obj.id === Data.movie_for_watchlist.id
      ).length
    ).toBe(3);
  });

  test('should show items with no year', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(10, 0));
    await Database.knex('seen').insert(Data.generateSeen(10, 0));
    await Database.knex('mediaItem').insert(Data.generateMovies(5, 10));
    await Database.knex('seen').insert(Data.generateSeen(5, 10, false));

    const res = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        page: 1,
        all: true,
        onlySeenItems: true,
        year: 'noyear',
        showRepeated: false,
      },
    });

    expect((res.data as Pagination<MediaItemItemsResponse>).data.length).toBe(
      5
    );
  });

  test('should show items seen 2015', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(10, 0));
    await Database.knex('seen').insert(Data.generateSeen(10, 0));
    await Database.knex('mediaItem').insert(Data.generateMovies(5, 10));
    await Database.knex('seen').insert(Data.generateSeen(5, 10, true, 2015));

    const res = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        page: 1,
        all: true,
        onlySeenItems: true,
        year: '2015',
        showRepeated: false,
      },
    });

    expect((res.data as Pagination<MediaItemItemsResponse>).data.length).toBe(
      5
    );
  });

  test('should show items before today', async () => {
    const itemsController = new ItemsController();
    await Database.knex('list').insert(Data.watchlist);
    await Database.knex('mediaItem').insert(Data.generateMovies(10, 0));
    await Database.knex('listItem').insert(Data.addMoviesToWatchlist(10, 0));
    await Database.knex('mediaItem').insert(Data.generateMovies(5, 10, true));
    await Database.knex('listItem').insert(Data.addMoviesToWatchlist(5, 10));

    const res = await request(itemsController.getPaginated, {
      userId: Data.user.id,
      requestQuery: {
        mediaType: 'movie',
        orderBy: 'lastSeen',
        sortOrder: 'desc',
        page: 1,
        onlyReleased: true,
        onlyOnWatchlist: true,
      },
    });

    expect((res.data as Pagination<MediaItemItemsResponse>).data.length).toBe(
      10
    );
  });
});
