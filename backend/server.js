const express = require('express');
const cors = require('cors');
const sequelize = require('./db.js');

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes.js');
const journeyPlanRoutes = require('./routes/journeyPlanRoutes.js');
const travelLogRoutes = require('./routes/travelLogRoutes.js');

app.use('/user', userRoutes);
app.use('/journeyPlan', journeyPlanRoutes);
app.use('/travelLog', travelLogRoutes);

// // Synchronize the Model into SQL
// sequelize.sync()
//   .then(() => {
//     console.log('Database connected');
//     app.listen(5000, () => console.log('Server started on port 5000'));
//   })
//   .catch(error => console.error(error));

// Test the Vercel
app.get("/", (request, response) => {
	response.send("You succeeded to deploy backend to Vercel!");
});
