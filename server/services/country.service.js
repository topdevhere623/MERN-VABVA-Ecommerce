const httpStatus = require('http-status');
const { Country, Location } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Get country by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getCountryById = async (id) => {
  return Country.findById(id);
};

/**
 * Get all countries
 * @param 
 * @returns {Promise<User>}
 */
const getCountries = async () => {
  return Country.find();
};

module.exports = {
  getCountryById,
  getCountries,
};
