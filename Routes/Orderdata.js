const express = require('express');
const router = express.Router();

const Order = require('../Models/Order');
router.post('/orderdata', async (req, res) => {
  console.log("hello");
 let data = req.body.order_data
 await data.splice(0, 0, { Order_date: req.body.order_date })


 //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ _id: req.body.itemId })
 console.log(eId)
 if (eId === null) {
  try {

   await Order.create({
    email: req.body.email,
    order_data: [data]
   }).then(() => {
    res.json({ success: true })
   })
  } catch (error) {
   console.log(error.message)
   res.send("Server Error", error.message)

  }
 }

 else {
  try {
   await Order.findOneAndUpdate({ 'email': req.body.email },
    { $push: { order_data: data } }).then(() => {
     res.json({ success: true })
    })
  } catch (error) {
   console.log(error.message)
   res.send("Server Error")
  }
 }
})



router.post('/myOrderData', async (req, res) => {
  try {
    let mydata = await Order.findOne({ 'email': req.body.email });
    console.log("manjunath");
    res.json({ orderData: mydata });
    
    
  } catch (error) {
    res.send("Error", error.message)
  }
});


module.exports = router;
