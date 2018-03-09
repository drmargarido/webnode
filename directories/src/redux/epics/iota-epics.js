import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {IOTA_PREPARE_TRANSFERS} from '../actions/action-types';
import {IOTA_POW} from '../actions/action-types';
import {fulfillPrepareTransfers} from '../actions/iota-actions';
import {fulfillRequestPoW} from '../actions/iota-actions';
import {prepareTransfers} from '../../services/iota';
import {attachToTangleCurl} from '../../services/iota';


const prepareTransfersEpics = (action$, store) => {
    return action$.ofType(IOTA_PREPARE_TRANSFERS).mergeMap(action => {
        const {data} = action.payload;
        return Observable
            .fromPromise(prepareTransfers(data))
            .map(prepareTransfers => fulfillPrepareTransfers({prepareTransfers}))
            .catch(error => Observable.empty())
    });
};

const powEpics = (action$, store) => {
    return action$.ofType(IOTA_POW).mergeMap(action => {
        const {data} = action.payload;
        return Observable
            .fromPromise(attachToTangleCurl(data))
            .map(powResult => fulfillRequestPoW({powResult}))
            .catch(error => Observable.empty())
    });
};

export default combineEpics(
    prepareTransfersEpics,
    powEpics
);