const httpStatus = require('http-status');
const { Location, Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a location
 * @param {Object} locationBody
 * @returns {Promise<Location>}
 */
const createLocation = async (locationBody) => {
    const location = await Location.create(locationBody);
    return location;
};

/**
 * Query for locations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLocations = async (filter, options) => {
    const location = await Location.paginate(filter, options);
    return location;
};

/**
 * Get location by id
 * @param {ObjectId} id
 * @returns {Promise<Location>}
 */
const getLocationById = async (id) => {
    return Location.findById(id);
};

const getLocationsByCoordinates = async (coordinates) => {
    const locations = await Location.find({ geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates } } } })
    return locations;
}

// const getProductsIdByCoordinates = async (coordinates) => {
//     // const products = await Location
//     //     .aggregate(
//     //         [
//     //             {
//     //                 $match: {
//     //                     geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates } } }
//     //                 }
//     //             },
//     //             {
//     //                 $group: {
//     //                     _id: "$products", //null
//     //                     // productsId: { $push: "$products" }
//     //                 }
//     //             },
//     //             // {
//     //             //     "$project": {
//     //             //         "productsId": {
//     //             //             "$reduce": {
//     //             //                 "input": "$productsId",
//     //             //                 "initialValue": [],
//     //             //                 "in": { "$setUnion": ["$$value", "$$this"] }
//     //             //             }
//     //             //         }
//     //             //     }
//     //             // }

//     //         ])

//     // let productIds = [];
//     // for (let index = 0; index < products.length; index++) {
//     //    productIds.push(...products[index]["_id"])
//     // }
//     // //this is to remove duplicate entries..
//     // productIds = Array.from(new Set(productIds));

//     // //we could use aggregation above for all of this without JS,
//     // //but this is to reduce the workload of the database, by ultilising for loops and Array.push
//     // return productIds;
// }

// const getProductBookingsByIds = async (productIds, dates) => {

// }
/**
 * Update location by id
 * @param {ObjectId} locationId
 * @param {Object} updateBody
 * @returns {Promise<Location>}
 */
const updateLocationById = async (locationId, updateBody) => {
    const location = await getLocationById(locationId);
    if (!location) { throw new ApiError(httpStatus.NOT_FOUND, 'Location not found'); }

    Object.assign(location, updateBody);
    await location.save();
    
    // If geometry is updated, update linked products
    if (updateBody.geometry) {
        const session = await Product.startSession();
        session.startTransaction();
        await Product.updateMany({ locationId: locationId }, { $set: { "summary.geometry": updateBody.geometry } }, { session: session })
        await session.commitTransaction();
        session.endSession();
    }
    return location;
};

// /**
//  * Update additonal fee by id
//  * @param {ObjectId} locationId
//  * @param {Object} additionalFeeId
//  * @param {Object} updateBody
//  * @returns {Promise<Location>}
//  */
// const updateAdditionalFeeById = async (locationId, additionalFeeId, updateBody) => {
//     const location = await getLocationById(locationId);
//     if (!location) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
//     }
//     let addtionalFee = location.additionalFee.find(value => value._id == additionalFeeId)
//     if (addtionalFee == undefined) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'Additional fee not found');
//     }

//     Object.assign(addtionalFee, updateBody);
//     await location.save();
//     return addtionalFee;
// };

/**
 * Delete location by id
 * @param {ObjectId} locationId
 * @returns {Promise<Location>}
 */
const deleteLocationById = async (locationId) => {
    const location = await getLocationById(locationId);
    if (!location) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
    }
    await location.remove();
    return location;
};

// /**
//  * Delete additional fee by id
//  * @param {ObjectId} locationId
//  * @param {ObjectId} additionalFeeId
//  * @returns {Promise<Location>}
//  */
// const deleteAdditionalFeeById = async (locationId, additionalFeeId) => {
//     const location = await getLocationById(locationId);
//     if (!location) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
//     }
//     location.additionalFee = location.additionalFee.filter(_additonalFee => {
//         return _additonalFee._id != additionalFeeId && _additonalFee._id !== undefined;
//     });

//     await location.save()
//     return location.additionalFee;
// };

module.exports = {
    createLocation,
    queryLocations,
    getLocationById,
    updateLocationById,
    deleteLocationById,
    // updateAdditionalFeeById,
    // deleteAdditionalFeeById,
    // getLocationsByCoordinates,
    // getProductsIdByCoordinates
};
