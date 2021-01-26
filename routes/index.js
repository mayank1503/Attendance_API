const router = require('express').Router();
const User = require('../models/user');
router.post("/user/:id/enter", async (req, res) => {
    try {
      const data = {
        entry: Date.now()
      };
      const user = await User.findById(req.params.id);
      if(user.attendance && user.attendance.length > 0){
          const lastCheckIn = user.attendance[user.attendance.length - 1];
          const lastCheckInTimestamp = lastCheckIn.date.getTime();
          if (Date.now() > lastCheckInTimestamp + 100) {
            user.attendance.push(data);
            await user.save();
            req.send({message:'You have been signed in for today'});
           
            
          } else {
            req.send({message: "You have signed in today already"});
           
          }
      }else{
          user.attendance.push(data);
          await user.save();
          req.send({message:'You have been signed in for today'});
         
      }
    
    } catch (error) {
      console.log("something went wrong");
      console.log(error);
    }
  });

  module.exports = router;