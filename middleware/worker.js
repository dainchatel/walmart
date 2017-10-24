var axios = require('axios');
require('dotenv').config();
var models = require('../db/models/index');
var key = process.env.WALMART_KEY;
let snapshot = [];

const cerealCall = (num) => {
  for (let i = num; i < num + 4; i++) {
    axios.get('http://api.walmartlabs.com/v1/search?query=cereal&format=json&start='+((25*num)+1)+'&facet=on&numItems=25&responseGroup=full&apiKey='+key)
      .then((response) => {
        response.data.items.forEach((d, i) => {
          snapshot.push({
            itemId: d.itemId,
            thumb: d.thumbnailImage,
            name: d.name,
            url: d.productUrl,
            brand: d.brandName,
            category: d.categoryPath,
            price: d.salePrice,
            msrp: d.msrp,
            rating: d.customerRatingImage,
            reviews: d.numReviews
          });
        });
        if (snapshot.length === 1000) {
          models.Product.bulkCreate(
            snapshot
          ).then(() => {

          })
        }
        // let allPercent = response.data.facets[1].facetValues;
        // let topThree = response.data.items;
        // let topThreeObj = {};
        // for (let i = 0; i < topThree.length; i++) {
        //   topThreeObj[topThree[i].name] = topThree[i].itemId;
        // }
        // let topThreeStr = Object.values(topThreeObj).join(',');
        // axios.get('http://api.walmartlabs.com/v1/items?ids='+topThreeStr+'&format=json&apiKey=svnpsup2mrae4hcu43npn6rj')
        //   .then((response) => {
        //     let topThreeArr = [];
        //     response.data.items.forEach((d) => {
        //       topThreeArr.push(d.brandName);
        //     })
        //     console.log(topThreeArr);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

let start1 = () => {
  cerealCall(4);
}

let start2 = () => {
  cerealCall(8);
}

let start3 = () => {
  cerealCall(12);
}

let start4 = () => {
  cerealCall(16);
}

let start5 = () => {
  cerealCall(20);
}

let start6 = () => {
  cerealCall(24);
}

let start7 = () => {
  cerealCall(28);
}

let start8 = () => {
  cerealCall(32);
}

let start9 = () => {
  cerealCall(36);
}

let startUp = (req, res, next) => {
  console.log('booting up');
  cerealCall(0);
  setTimeout(start1, 1000 * 3)
  setTimeout(start2, 2000 * 3)
  setTimeout(start3, 3000 * 3)
  setTimeout(start4, 4000 * 3)
  setTimeout(start5, 5000 * 3)
  setTimeout(start6, 6000 * 3)
  setTimeout(start7, 7000 * 3)
  setTimeout(start8, 8000 * 3)
  setTimeout(start9, 9000 * 3);

  return next();
}




module.exports.startUp = startUp;
