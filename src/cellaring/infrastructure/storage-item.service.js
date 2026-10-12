import { kessickApi } from '../../shared/infrastructure/base-api.js';

export class StorageItemService {
    getStorageItemsByCellarId(cellarId) {
        return kessickApi.get(`/storage-items?cellarId=${cellarId}`);
    }
}