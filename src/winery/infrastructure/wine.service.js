import { winesApi } from '../../shared/infrastructure/base-api.js';

export class WineService {

    getWinesByType(wineType) {
        return winesApi.get(`/${wineType}`);
    }
}