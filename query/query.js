var services = require('../services/responseService')
const CryptoJS = require('crypto-js');

// /**
//  * ENCRYPT DATA FUNCTION
//  * @param {STRING} data 
//  * @returns STRING
//  */
// let encryptData = (data) => {
//     try {
//         var data = data;
//         var encrypt = cryptojs.AES.encrypt(JSON.stringify(data), 'id').toString();
//         var dataencode = encrypt;
//         var buff = new Buffer.alloc(dataencode);
//         return base64data = buff.toString('base64');
//     } catch (error) {
//         return base64data = false
//     }
// }

// /**
//  * DECRYPT DATA FUNCTION
//  * @param {STRING} data 
//  * @returns STRING
//  */
// let decryptData = (data) => {
//     try {
//         var text = data;
//         let daata = text;
//         let buuff = new Buffer.alloc(daata, 'base64');
//         let teext = buuff.toString('ascii');
//         var decrypted = cryptojs.AES.decrypt(teext, 'id');
//         return decryptRes = decrypted.toString(cryptojs.enc.Utf8);
//     } catch (error) {
//         var decryptRes = false
//     }
// }

/**
 * ENCRYPT DATA FUNCTION
 * @param {STRING} id 
 * @returns STRING
 */
const encryptData = async(id) => {
        return new Promise(resolve => {

            var data_id = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(id), process.env.secretKey).toString());
            return resolve(data_id);
        });
    }
    /**
     * DECRYPT DATA FUNCTION
     * @param {STRING} id 
     * @returns STRING
     */
const decryptData = async(id) => {
    return new Promise(resolve => {
        try {
            var data = CryptoJS.AES.decrypt(decodeURIComponent(id), process.env.secretKey).toString(CryptoJS.enc.Utf8);

            if (data.indexOf('"') > -1) {
                data_id = data.substring(1, data.length - 1);
            } else {
                data_id = data;
            }

            return resolve(data_id)
        } catch (e) {
            return resolve('')
        }

    });
}

/**
 * TO GET ERROR DETAILS
 * @param {STRING} key 
 * @returns STRING
 */
async function error(key) {
    var data = await services.successOrErrors(key)
    return data
}

/**
 * INSERT QUERY 
 */
let create = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.create(query).then(result => {
            return resolve(result);
        }).then(err => {
            return reject(err)

        })
    })
}

/**
 * FIND ALL QUERY
 */
let find = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.findAll(query).then(result => {

            return resolve(result);
        }).catch(err => {
            return reject({ message: "DB query Failed :" + err });
        })

    })
}

/**
 * FIND WHERE QUERY
 */
let findSome = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.findAll({ where: query }).then(result => {
            return resolve(result);
        }).catch(err => {
            return reject({ message: "DB query Failed :" + err });
        })

    })
}

/**
 * FIND QUERY IN PAGINATION
 */
let findOnePagination = (collection, query, limit, offset) => {
    return new Promise((resolve, reject) => {
        collection.findAll({
            limit,
            offset,
            where: query
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            return reject(err);
        })

    })
}

/**
 * FIND ONE QUERY
 */
let findOne = (collection, query, additionalParameter) => {
    return new Promise((resolve, reject) => {
        collection.findOne({ where: query }).then(result => {
            return resolve(result);
        }).catch(err => {
            return reject(err);
        })

    })
}

/**
 * UPDATE QUERY 
 */
let updateOne = (collection, findBy, query) => {
    return new Promise((resolve, reject) => {
        collection.update(query, { where: findBy }).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}

/**
 * UPDATE ONE QUERY
 */
let update = (collection, findBy, query) => {
    return new Promise((resolve, reject) => {
        collection.updateOne(findBy, query, (err, result) => {
            err ? reject(err) : resolve(result)
        });
    })
}

/**
 * REMOVE QUERY
 */
let remove = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.destroy({ where: query }).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}

/**
 * DELETE MANY
 */
let deleteMany = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.destroy(query).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}
module.exports = {
    error,
    create,
    find,
    findOne,
    updateOne,
    remove,
    update,
    findOnePagination,
    findSome,
    encryptData,
    decryptData,
    deleteMany
}