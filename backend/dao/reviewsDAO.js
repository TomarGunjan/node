// import mongodb from "mongodb"
// const ObjectId = mongodb.ObjectId

// let reviews

// export default class ReviewsDAO{
//     static async injectDB(conn) {
//         if(reviews){
//             return
//         }
//         try{
//             reviews = conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
//         }catch(e){
//             console.error(`caiught error : ${err}`)
//         }
//     }

//     static async createReview(restaurantId, review, user, date){
//         const reviewDoc = {
//             name : user.name,
//             user_id : user._id,
//             date:date,
//             text:review,
//             restaurant_id :ObjectId(restaurantId)
//         }
//         const resp=await reviews.insertOne(reviewDoc)
//         return resp
//     } catch(e){
//         console.error(`unable to post review`)
//         return {error:e}
//     }

//     static async updateReview(reviewId, user_id, review, date){
//         try{
//             const updateResponse = await reviews.updateOne({user_id:user_id, _id:ObjectId(reviewId)},
//             {$set:{text:review,date:date}})

//             return updateResponse
//         }catch(e){
//             console.error(`unable to update review`)
//             return {error:e}
//         }
//     }

//     static async deleteReview(reviewId,userId){
//         try{
//             const deleteResponse = await reviews.deleteOne({
//             _id:ObjectId(reviewId),
//             user_id:userId
//             })
//             return deleteResponse
//         }catch(e){
//             console.error(`unable to delete review`)
//             return {error:e}
//         }
//     }
// }


import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let reviews

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return
    }
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = { name: user.name,
          user_id: user._id,
          date: date,
          text: review,
          restaurant_id: ObjectId(restaurantId), }

      return await reviews.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId)},
        { $set: { text: text, date: date  } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewId, userId) {

    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

}