const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { countryService } = require('../services');


// test = async () => {
//   const result = await countryService.getCountryById({_id: "614cc86264cd0437861bd097"});
//   console.log("result: ", result);
// }
// test();

const getCountries = catchAsync(async (req, res) => {
  const result = await countryService.getCountries();
  res.send(result);
});

const getCountry = catchAsync(async (req, res) => {
  const country = await countryService.getCountryById(req.params.countryId);
  if (!country) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country not found');
  }
  res.send(country);
});

module.exports = {
  getCountries,
  getCountry,
};