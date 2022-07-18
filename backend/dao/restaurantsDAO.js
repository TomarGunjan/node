// import mongodb from "mongodb"
// let restaurants
// const ObjectId = mongodb.ObjectId

// export default class RestaurantsDAO{
//     static async injectDB(conn){
//         if(restaurants){
//             return restaurants
//         }
//         try{
//             restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
//         }
//         catch(err){
//             console.error(`caiught error : ${err}`)
//         }
//     }

//     static async getRestaurants({
//         filters=null,
//         page=0,
//         restaurantPerPage=20
//     }={}){
//         let query
//         if(filters){
//             if("name" in filters) {
//                 query = {$text : {$search : filters["name"]}}
//             } else if ("cuisine" in filters) {
//                 query = {"cuisine" : {$eq : filters["cuisine"]}}
//             } else if ("zipcode" in filters) {
//                 query = {"address.zipcode" :{$eq : filters["zipcode"]}}
//             }
//         }

//         let cursor
//         try{
//             cursor = await restaurants.find(query)
//         }catch(e) {
//             console.log(`error while fetching data ${e}`)
//             return {restaurantList :{},totalRestaurants:0}
//         } 

//         let displayCursor = cursor.limit(restaurantPerPage).skip(restaurantPerPage*page)
//         try{
//             const restaurantList = await displayCursor.toArray()
//             const totalRestaurants = await restaurants.countDocuments()
//             return {restaurantList,totalRestaurants}
//         }catch(e) {
//             console.log(`error while fetching data ${e}`)
//             return {restaurantList :{},totalRestaurants:0}
//         } 

//     }

//     static async getRestaurantById(id){
//         try{
//             const pipeline = [
//                 {
//                     $match :{
//                         _id: new ObjectId(id),
//                     },
//                 },
//                 {
//                     $lookup : {
//                         from :"reviews",
//                         let :{
//                             id:"$_id",
//                         },
//                         pipeline : [
//                             {
//                                 $match :{
//                                     $expr : {
//                                         $eq : ["$restaurant_id","$$id"],
//                                     },
//                                 },
//                             },
//                             {
//                                 $sort:{
//                                     date:-1,
//                                 },
//                             },
//                         ],
//                         as:"reviews",
//                     },
                
//                 },
//                 {
//                     $addFields:{
//                         reviews:"$reviews",
//                     },
//                 },
//             ]
//             console.log("hee")
//             return await restaurants.aggregate(pipeline).next()
//         }catch(e){
//             console.log(`something went wront wgile fetching rest details : ${e}`)
//             throw e
//         }

//     }

//     static async getCuisines(){
//         let cuisines = []
//         try{
//             cuisines = await restaurants.distinct("cuisine")
//             console.log(cuisines)
//             return cuisines
//         }catch(e){
//             console.log(`something went wront wgile fetching cuisine details : ${e}`)   
//             return cuisines
//         }
        
//     }
// }


import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let restaurants

export default class RestaurantsDAO {
  static async injectDB(conn) {
    if (restaurants) {
      return
    }
    try {
      restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`,
      )
    }
  }

  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } }
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }

    let cursor
    
    try {
      cursor = await restaurants
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }

    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

    try {
      const restaurantsList = await displayCursor.toArray()
      const totalNumRestaurants = await restaurants.countDocuments(query)

      return { restaurantsList, totalNumRestaurants }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }
  }
  
  static async getRestaurantByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$restaurant_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await restaurants.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }

  static async getCuisines() {
    let cuisines = []
    try {
      cuisines = await restaurants.distinct("cuisine")
      return cuisines
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`)
      return cuisines
    }
  }
}


