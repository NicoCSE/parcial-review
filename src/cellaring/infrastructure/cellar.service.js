import { kessickApi } from '../../shared/infrastructure/base-api.js';

export class CellarService {

    getAllCellars() {
        return kessickApi.get('/cellars');
    }
}