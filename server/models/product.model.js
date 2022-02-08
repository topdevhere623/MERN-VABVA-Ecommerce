const mongoose = require('mongoose');

const ObjectID = mongoose.Types.ObjectId;

const { toJSON, paginate } = require('./plugins');
const { services, costTypes } = require('../config/services');

const imagesSchema = mongoose.Schema({
  image: {
    type: String,
  },
});
const descriptionSchema = mongoose.Schema({
  text: {
    type: String,
    trim: true,
  },
  facts: [
    {
      type: String,
      trim: true,
    },
  ],
  images: [imagesSchema],
});

const costSchema = mongoose.Schema({
  type: {
    type: String,
    enum: costTypes,
  },
  amount: {
    type: Number,
  },
  minimum: {
    days: {
      type: Number,
    },
    hours: {
      type: Number,
    },
  },
  discount: {
    type: {
      type: String,
      enum: costTypes,
    },
    amount: {
      type: Number,
    },
  },
  additional: [
    {
      name: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      type: {
        type: String,
        enum: costTypes,
      },
      amount: {
        type: Number,
      },
      mandatory: {
        type: Boolean,
      },
    },
  ],
  sample: {
    type: Number,
  },
});

const variationSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  items: [
    {
      colour: {
        type: String,
      },
      quantity: {
        type: Number,
        defualt: 0,
      },
      cost: {
        type: Number,
      },
      images: {
        type: [imagesSchema],
      },
    },
  ],
});

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    trim: true,
  },
  answer: {
    type: String,
    trim: true,
  },
  statistics: {
    likes: {
      total: {
        type: Number,
        defualt: 0,
      },
      userId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  },
});

const geometrySchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Polygon'],
    default: 'Polygon',
  },
  coordinates: {
    type: [[[Number]]],
    required: true,
  },
});

// add product reference
const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      trim: true,
      default: 'Untitled',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    service: {
      type: String,
      enum: services,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
    delivery: {
      estimateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryEstimate',
      },
    },
    description: {
      type: descriptionSchema,
    },
    cost: {
      type: costSchema,
    },
    variation: [variationSchema],
    stock: {
      quantity: {
        type: Number,
        defualt: 0,
      },
    },
    questions: [questionSchema],
    summary: {
      price: {
        type: Number,
        default: 0,
      },
      priceAdditions: {
        type: Number,
        defualt: 0,
      },
      purchaseCount: {
        type: Number,
        defualt: 0,
      },
      totalReviewRating: {
        type: Number,
        defualt: 0,
      },
      geometry: {
        type: geometrySchema,
        index: '2dsphere',
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const checkProductQuantity = (productFromDb, currProduct) => {
  if (
    currProduct.service.type === 'hire' ||
    (currProduct.service.type === 'purchase' && currProduct.selectedIdType === 'product')
  ) {
    if (productFromDb.stock.quantity - currProduct.quantity < 0) {
      return null;
    }
  } else if (currProduct.service.type === 'purchase' && currProduct.selectedIdType === 'product_variation') {
    if (productFromDb.variation[0] && productFromDb.variation[0].items) {
      let variantProduct = null;
      variantProduct = productFromDb.variation[0].items.find((itemProduct) => {
        return itemProduct._id.toString() === currProduct.selectedId.toString();
      });
      if (!variantProduct) return null;

      if (variantProduct.quantity - currProduct.quantity < 0) {
        return null;
      }
    } else {
      return null;
    }
  }
  return true;
};
productSchema.statics.findArrayOfProducts = async function (productIds) {
  const products = await this.find({ _id: { $in: productIds }, isPublic: true })
    .select('_id stock variation service')
    .lean();

  if (products.length == 0) return null;

  return products;
};
productSchema.statics.validateBasketProducts = async function (basketData) {
  const { location, products } = basketData;

  const queryOrArray = products.map((product) => ({
    _id: ObjectID(product.productId),
    service: product.service.type,
  }));
  const queryObj = {
    $or: queryOrArray,
  };

  if (location) {
    queryObj['summary.geometry'] = {
      $geoIntersects: {
        $geometry: { type: 'Point', coordinates: location.coordinates },
      },
    };
  }
  const listOfProducts = await this.find(queryObj).lean();
  if (listOfProducts.length === 0) {
    return null;
  }
  const productsObj = {};
  listOfProducts.forEach((product) => {
    productsObj[product._id.toString()] = product;
  });
  // this for if user order same product with different variant
  for (let i = 0; i < products.length; i += 1) {
    const currProduct = products[i];
    const idString = currProduct.productId.toString();
    const productFromDb = productsObj[idString];
    if (!productFromDb || !checkProductQuantity(productFromDb, currProduct)) {
      return null;
    }
  }
  return productsObj;
};
/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
