// require("dotenv").config({ path: __dirname + "/../.variables.env" });
// const fs = require("fs");

// const mongoose = require("mongoose");
// const User = require('../models/User.model')
// mongoose.connect(process.env.DATABASE);
// mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once

// const patients = JSON.parse(
//   fs.readFileSync(__dirname + "/patients.json", "utf-8")
// );

// async function deleteData() {
//   console.log("š¢š¢ Goodbye Data...");
//   await Patient.remove();
//   console.log(
//     "Data Deleted. To load sample data, run\n\n\t npm run sample\n\n"
//   );
//   process.exit();
// }

// async function loadData() {
//   try {
//     await Item.insertMany(patients);
//     console.log("šššššššš Done!");
//     process.exit();
//   } catch (e) {
//     console.log(
//       "\nšššššššš Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n"
//     );
//     console.log(e);
//     process.exit();
//   }
// }

// async function createAdmin() {
//   try {
//     const Admin = User;
//     var newAdmin = new Admin();
//     const passwordHash = newAdmin.generateHash("123456");

//     await new Admin({
//       email: "admin@demo.com",
//       password: passwordHash,
//       name: "admin",
//       surname: "demo",
//       is_admin: true
//     }).save();
//     console.log("šššššššš Admin created : Done!");
//     // process.exit();
//   } catch (e) {
//     console.log("\nšššššššš Error! The Error info is below");
//     console.log(e);
//     // process.exit();
//   }
// }

// createAdmin()
