const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { availabilityService } = require('../services');

const productsAvailability = catchAsync(async (req, res) => {
  // Data example
  /*
  [
  {
    "productId": "610eb9c5d4dd8130ec441540",
    "selectedIdType": "product",
    "selectedId": "610eb9c5d4dd8130ec441540",
    "dates": [
      "2021-08-07"
    ]
  }
]
  */
  const availability = await availabilityService.validateProducts(req.body);
  res.status(httpStatus.OK).send(availability);
});

module.exports = {
  productsAvailability,
};
