const SignUpRepository = require("../Repository/SignUpRepository")

const SignUpService = {
    signUp: (req) => {
        SignUpRepository.createSignUp();
    }
}

module.exports = SignUpService