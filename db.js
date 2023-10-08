const mongoose = require("mongoose");
const mongouri = "mongodb+srv://gofood:gofood@cluster0.qdqposi.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongodb = async () => {
    await mongoose.connect(mongouri, { useNewUrlParser: true }, async (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("connected successfully");
            const fetcheddata = await mongoose.connection.db.collection("food_items");
            fetcheddata.find({}).toArray(async (err, data) => {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray((err, catdata) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        global.food_items = data;
                        global.foodCategory = catdata;


                    }
                })
                // if (err) {
                //     console.log(err);
                // }
                // else {
                //     global.food_items = data;

                // }
            })
        }
    });
}
module.exports = mongodb;