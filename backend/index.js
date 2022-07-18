// import app from "./server.js"
// import mongodb from "mongodb"
// import dotenv from "dotenv"
// import restaurantDao from "./dao/RestaurantDAO.js"
// import ReviewsDAO from "./dao/ReviewsDAO.js"

// dotenv.config()

// const port = process.env.PORT||5001
// const MongoClient = mongodb.MongoClient

// MongoClient.connect(process.env.RESTREVIEWS_DB_URI,
//     {
//         maxPoolSize : 50,
//         wtimeoutMS:2500
//     })
//     .catch(err=>{
//         console.error(err.stack)
//         process.exit(1)
//     })
//     .then(async client=>{
//         console.log("point1")
//         await restaurantDao.injectDB(client)
//         console.log("point2")
//         await ReviewsDAO.injectDB(client)
//         app.listen(port,()=>{
//             console.log(`listening on ${port}`)
//         })
//     })


import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()

const port = process.env.PORT||5001
const MongoClient = mongodb.MongoClient

MongoClient.connect(process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize : 50,
        wtimeoutMS:2500
    })
    .catch(err=>{
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client=>{
        console.log("point1")
        await RestaurantsDAO.injectDB(client)
        console.log("point2")
        await ReviewsDAO.injectDB(client)
        app.listen(port,()=>{
            console.log(`listening on ${port}`)
        })
    })
