require('dotenv').config();

try {
  console.log("Loading authMiddleware...");
  const auth = require('./middleware/authMiddleware');
  console.log("Auth loaded:", !!auth);

  console.log("Loading certificateController...");
  const certController = require('./controllers/certificateController');
  console.log("Controller loaded:", !!certController);

  console.log("Loading certificateRoutes...");
  const certRoutes = require('./routes/certificateRoutes');
  console.log("Routes loaded:", !!certRoutes);

} catch (e) {
  console.error("CRASHED:", e);
}
