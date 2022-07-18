// import ReviewsDao from "../dao/ReviewsDAO.js"

// export default class ReviewsController {
//     static async apiCreateReview(req,res,next) {
//         try{
//             const restaurantId = req.body.restaurantId
//             const review = req.body.text
//             const user = {
//                 name : req.body.name,
//                 _id : req.body.user_id
//             }
//             const date = new Date()
//             const ReviewResponse = await ReviewsDao.createReview(
//                 restaurantId,
//                 review,
//                 user,
//                 date
//             )
//             res.status(200).json({status:"succcess"})
//         }catch(e){
//             res.status(500).json({err:e.err})
//         }
//     }

//     static async apiUpdateReview(req,res,next) {
//         try{
//             const reviewId = req.body.review_id
//             const review = req.body.text
//             const date = new Date()

//             const ReviewResponse = await ReviewsDao.updateReview(
//                 reviewId,
//                 req.body.user_id,
//                 review,
//                 date
//             )

//             var {err} = ReviewResponse
//             if(err){
//                 res.status(400).json({error:err})
//             }

//             if (ReviewResponse.modified_count===0){
//                 throw new error("unable to modify review ...user may not be original poster")
//             }

//             res.status(200).json({status:"succcess"})
//         }catch(e){
//             res.status(500).json({err:e.err})
//         }
//     }

//     static async apiDeleteReview(req,res,next){
//         try {
//             const review_id = req.query.review_id
//             const userid = req.body.user_id
//             console.log(review_id)
//             const ReviewResponse = await ReviewsDao.deleteReview(
//                 review_id,
//                 userid
//             )
//             res.status(200).json({status:"succcess"})
//         } catch(e){
//             console.log(e)
//             res.status(500).json({status:e})
//         }
        

//     }
// }

import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id
      const review = req.body.text
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date()

      const ReviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        userInfo,
        review,
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id
      const text = req.body.text
      const date = new Date()

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        text,
        date,
      )

      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id
      const userId = req.body.user_id
      console.log(reviewId)
      const reviewResponse = await ReviewsDAO.deleteReview(
        reviewId,
        userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}