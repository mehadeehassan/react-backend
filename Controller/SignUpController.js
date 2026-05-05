const SignUpService = require("../Service/SignUpService");

const signUpController = {
  signUp: (req, res) => {
    SignUpService.signUp(req);
    //   const IsSuccess = true;
    //   if (IsSuccess) {
    //     res.status(200).send({
    //       success: true,
    //       message: "Signup successfully",
    //       data: req.body,
    //       metadata: {
    //         timestamps: new Date(),
    //       },
    //     });
    //   } else {
    //     res.status(500).send({
    //       success: false,
    //       message: "Signup failed",
    //       data: req.body,
    //       metadata: {
    //         timestamps: new Date(),
    //       },
    //     });
    //   }
    // },
  },
};

module.exports = signUpController;

// routes.get("/", (req, res) => {
//   res.send("Hello World! I am a backend developer!");
// });

// routes.get("/random.text", (req, res) => {
//   console.log(req.body);

//   res.send();
// });

// routes.get("/users/:userId/books/:bookId", (req, res) => {
//   console.log(req.body);

//   res.send();
// });

// routes.get("/profile/:username", (req, res) => {
//   console.log(req.body.email);
//   res.send();
// });

// routes.post("/test", (req, res) => {
//   console.log(req.body.email);
//   res.send();
// });
