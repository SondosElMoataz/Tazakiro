const Reservation = require(`./../models/reservation.js`);
const ObjectId = require("mongodb").ObjectId;
const User = require(`./../models/user.js`);
const Match = require(`./../models/match.js`);





exports.createReservation= async (req, res) =>{
    
    try {
      
    const reservation = await Reservation.create(req.body);
    const ticketNumber = Math.floor(Math.random() * 1098123);

    
    await User.findByIdAndUpdate(req.body.userId, {
        $push: { reservations: reservation.id},
      });
      await Reservation.findByIdAndUpdate(reservation.id, {
        $set: { ticketNumber: ticketNumber},
      });

      await Match.findByIdAndUpdate(req.body.matchId,{
        $push: { seats: reservation.seats},
      });

      res.status(201).json({
        status: "success",
        data: {
            reservation: reservation,
        },
      });

     

    }catch (e) {
        res.status(400).send(e);
      }

};

exports.deleteReservation= async (req, res) =>{
    try {
        
    const user=  await User.findById(req.body.userId);
    console.log(req.body.userId);
    console.log(req.params.reservationId);
    const reservation = await  Reservation.findById(req.params.reservationId);
    if (reservation)
    {console.log("null");}
    var found = false;
    for (var i =0; i<user.reservations.length;i++){
        if(reservation.id==user.reservations[i])
           { found = true;
           }
    }
    if (found)
    {
        matchid = reservation.matchId;
        const match = await Match.findById(matchid);
        eventDate = match.Date;
        now = new Date();
        ydiff = eventDate.getFullYear()-now.getFullYear();
        mdiff = eventDate.getMonth()-now.getMonth();
        ddiff = eventDate.getDate()-now.getDate();
        console.log(ddiff)
        console.log(eventDate.getDate())
        console.log((ydiff*365) +(mdiff*30) +(ddiff))
        if ((ydiff*365) +(mdiff*30) +(ddiff)>3){
            
            await User.findByIdAndUpdate(req.body.userId, {
                $pull: { reservations: req.params.reservationId },
              });


            await Reservation.findByIdAndDelete(req.params.reservationId);
            res.status(204).json({
                status: "success",
                data: null  });
            
        }
        else{
        return res.status(204).json({

            message: "Too late you can't cancel this reservation now ",
              });
            }
    }
    else{
        return res.status(204).json({
            status: "",
            message: "You did not reserve this match ",
              });
    }
   
}catch (e) {
        res.status(400).send(e);
      }

};