import { createExpressRoute } from 'typescript-routes-to-openapi-server';
import {
  GetItemsArgs,
  GetRandomItemsArgs,
  mediaItemRepository,
  Pagination,
} from 'src/repository/mediaItem';
import { MediaItemItemsResponse } from 'src/entity/mediaItem';

export type GetItemsRequest = Omit<
  GetItemsArgs,
  'userId' | 'mediaType' | 'mediaItemIds' | 'selectRandom'
> &
  Partial<Pick<GetItemsArgs, 'mediaType'>>;

export type GetRandomItemsRequest = Omit<
  GetRandomItemsArgs,
  'userId' | 'selectRandom'
>;

export class ItemsController {
  /**
   * @description Get items
   * @openapi_tags Items
   * @openapi_operationId paginated
   */
  getPaginated = createExpressRoute<{
    method: 'get';
    path: '/api/items/paginated';
    requestQuery: GetItemsRequest;
    responseBody: Pagination<MediaItemItemsResponse>;
  }>(async (req, res) => {
    const userId = Number(req.user);

    const {
      filter,
      mediaType,
      onlyWithNextAiring,
      onlyWithNextEpisodesToWatch,
      page,
      year,
      genre,
      onlySeenItems,
      onlyOnWatchlist,
      onlyWithUserRating,
      onlyWithoutUserRating,
      onlyWithProgress,
      showRepeated,
      onlyReleased,
    } = req.query;

    const orderBy = req.query.orderBy || 'title';
    const sortOrder = req.query.sortOrder || 'asc';

    if (page <= 0) {
      res.status(400);
      return;
    }

    const result = await mediaItemRepository.items({
      userId: userId,
      mediaType: mediaType,
      orderBy: orderBy,
      sortOrder: sortOrder,
      filter: filter,
      page: page,
      year: year,
      genre: genre,
      onlySeenItems: onlySeenItems,
      onlyOnWatchlist: onlyOnWatchlist,
      onlyWithNextEpisodesToWatch: onlyWithNextEpisodesToWatch,
      onlyWithNextAiring: onlyWithNextAiring,
      onlyWithUserRating: onlyWithUserRating,
      onlyWithoutUserRating: onlyWithoutUserRating,
      onlyWithProgress: onlyWithProgress,
      showRepeated: showRepeated,
      selectRandom: false,
      onlyReleased: onlyReleased,
    });

    res.send(result);
  });

  /**
   * @description Get items
   * @openapi_tags Items
   * @openapi_operationId get
   */
  get = createExpressRoute<{
    method: 'get';
    path: '/api/items';
    requestQuery: Omit<GetItemsRequest, 'page'>;
    responseBody: MediaItemItemsResponse[];
  }>(async (req, res) => {
    const userId = Number(req.user);

    const {
      filter,
      mediaType,
      onlyWithNextAiring,
      onlyWithNextEpisodesToWatch,
      onlySeenItems,
      onlyOnWatchlist,
      onlyWithUserRating,
      onlyWithoutUserRating,
      onlyWithProgress,
      onlyReleased,
    } = req.query;

    const orderBy = req.query.orderBy || 'title';
    const sortOrder = req.query.sortOrder || 'asc';

    const result = await mediaItemRepository.items({
      userId: userId,
      mediaType: mediaType,
      orderBy: orderBy,
      sortOrder: sortOrder,
      filter: filter,
      onlySeenItems: onlySeenItems,
      onlyOnWatchlist: onlyOnWatchlist,
      onlyWithNextEpisodesToWatch: onlyWithNextEpisodesToWatch,
      onlyWithNextAiring: onlyWithNextAiring,
      onlyWithUserRating: onlyWithUserRating,
      onlyWithoutUserRating: onlyWithoutUserRating,
      onlyWithProgress: onlyWithProgress,
      onlyReleased: onlyReleased,
      selectRandom: false,
    });

    res.send(result);
  });

  /**
   * @description Get items
   * @openapi_tags Items
   * @openapi_operationId random
   */
  getRandom = createExpressRoute<{
    method: 'get';
    path: '/api/items/random';
    requestQuery: GetRandomItemsRequest;
    responseBody: MediaItemItemsResponse[];
  }>(async (req, res) => {
    const userId = Number(req.user);

    const { mediaType, onlyOnWatchlist, onlyReleased } = req.query;

    const result = await mediaItemRepository.items({
      userId: userId,
      mediaType: mediaType,
      selectRandom: true,
      onlyOnWatchlist: onlyOnWatchlist,
      onlyReleased: onlyReleased,
    });

    res.send(result);
  });
}
