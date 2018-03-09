import IOTA from 'iota.lib.js';
import { IOTA_API_PROVIDER } from '../config';
import curl from 'curl.lib.js';

export const iota = new IOTA();

export const providerIota = new IOTA({
  provider: IOTA_API_PROVIDER
});

curl.init();
const MAX_TIMESTAMP_VALUE = (Math.pow(3,27) - 1) / 2;

export const prepareTransfers = (data) => {
  return new Promise((resolve, reject) => {
    providerIota.api.prepareTransfers(
      data.seed,
      [{
        'address': data.address,
        'value': data.value,
        'message': data.message,
        'tag': data.tag
      }],
      (error, prepareTransfers) => {
        if(error) {
          console.log('IOTA prepareTransfers error ', error);
        } else {
          console.log('IOTA prepareTransfers data ', prepareTransfers);
          resolve(prepareTransfers);
        }
      }
    )
  })
};

export const attachToTangleCurl = (trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) => {
  const curlHashing = (trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) => {
    if (!iota.valid.isHash(trunkTransaction)) {
      return callback(new Error('Invalid trunkTransaction'));
    }
    if (!iota.valid.isHash(branchTransaction)) {
      return callback(new Error('Invalid branchTransaction'));
    }
    if (!iota.valid.isValue(minWeightMagnitude)) {
      return callback(new Error('Invalid minWeightMagnitude'));
    }
    let finalBundleTrytes = [];
    let previousTxHash;
    let i = 0;
    function loopTrytes() {
      getBundleTrytes(trytes[i], function(error) {
        if (error) {
          return callback(error);
        } else {
          i++;
          if (i < trytes.length) {
            loopTrytes();
          } else {
            return callback(null, finalBundleTrytes.reverse());
          }
        }
      });
    }
    function getBundleTrytes(thisTrytes, callback) {
      let txObject = iota.utils.transactionObject(thisTrytes);
      txObject.tag = txObject.obsoleteTag;
      txObject.attachmentTimestamp = Date.now();
      txObject.attachmentTimestampLowerBound = 0;
      txObject.attachmentTimestampUpperBound = MAX_TIMESTAMP_VALUE;
      if (!previousTxHash) {
        if (txObject.lastIndex !== txObject.currentIndex) {
          return callback(new Error('Wrong bundle order. The bundle should be ordered in descending order from currentIndex'));
        }
        txObject.trunkTransaction = trunkTransaction;
        txObject.branchTransaction = branchTransaction;
      } else {
        txObject.trunkTransaction = previousTxHash;
        txObject.branchTransaction = trunkTransaction;
      }
      let newTrytes = iota.utils.transactionTrytes(txObject);
      curl.pow({trytes: newTrytes, minWeight: minWeightMagnitude}).then((nonce) => {
        let returnedTrytes = newTrytes.substr(0, 2673-81).concat(nonce);
        let newTxObject= iota.utils.transactionObject(returnedTrytes);
        let txHash = newTxObject.hash;
        previousTxHash = txHash;
        finalBundleTrytes.push(returnedTrytes);
        callback(null);
      }).catch(callback);
    }
    loopTrytes()
  }
  curlHashing(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, (error, success) => {
    if (callback) {
      return callback(error, success);
    } else {
      return success;
    }
  })
};

iota.api.attachToTangle = attachToTangleCurl;

export const attachToTangle = (data) => {
  return new Promise((resolve, reject) => {
    iota.api.attachToTangle(
      data.trunkTransaction,
      data.branchTransaction,
      data.minWeight,
      data.trytes,
      (error, attachToTangle) => {
        if(error) {
          console.log('IOTA attachToTangle error ', error);
        } else {
          console.log('IOTA attachToTangle data ', attachToTangle);
          resolve(attachToTangle);
        }
      }
    ).then((nonce) =>{
      console.log('attachToTangle nonce ', data.tryte.substr(0, 2187-81).concat(nonce));
    }).catch((error) => {
      console.log('attachToTangle error ', error);
    });
  })
};

export const attachToTangleOnTask = (data) => {
  return new Promise((resolve, reject) => {
    curl.pow({
      trunkTransaction: data.trunkTransaction,
      branchTransaction: data.branchTransaction,
      minWeight: data.minWeight,
      trytes: data.trytes
    }).then((nonce) =>{
      console.log('attachToTangle nonce ', data.tryte.substr(0, 2187-81).concat(nonce));
    }).catch((error) => {
      console.log('attachToTangle error ', error);
    });
  })
};
