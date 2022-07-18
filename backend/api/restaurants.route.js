// import express from "express"
// import RestaurantController from "./restaurant.controller.js"
// import ReviewCntrl from "./reviews.controller.js"

// const router=express.Router()

// router.route("/").get(RestaurantController.getRestaurants)
// router.route("/id/:id").get(RestaurantController.getRestaurantById)
// router.route("/cuisines").get(RestaurantController.getCuisines)

// router.route("/reviews")
// .post(ReviewCntrl.apiCreateReview)
// .put(ReviewCntrl.apiUpdateReview)
// .delete(ReviewCntrl.apiDeleteReview)

// export default router

import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router