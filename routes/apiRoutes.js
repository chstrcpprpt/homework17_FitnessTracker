const db = require("../models");

module.exports = function(app) {

  // GET - last workout
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
  });

  // POST - new workout
  app.post("/api/workouts", async (req, res)=> {
    try{
      const response = await db.Workout.create({type: "workout"})
      res.json(response);
    }
    catch(err){
      console.log("error creating workout: ", err)
    };
  });

  // PUT Add exercise to workout
  app.put("/api/workouts/:id", ({body, params}, res) => {
    const workoutId = params.id;
    let savedExercises = [];

    // Find saved exercises in the current workout
    db.Workout.find({_id: workoutId})
      .then(dbWorkout => {
        savedExercises = dbWorkout[0].exercises;
        res.json(dbWorkout[0].exercises);
        let allExercises = [...savedExercises, body]
        console.log(allExercises)
        updateWorkout(allExercises)
      })
      .catch(err => {
        res.json(err);
      });

    function updateWorkout(exercises){
      db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, function(err, doc){
        if(err){
          console.log(err);
        }
      })
    };

  });

  app.get("/api/workouts/range", (req, res) => {
      db.Workout.find({})
      .then(workout => {
          res.json(workout);
      })
      .catch(err => {
          res.json(err);
      });
  }); 
};