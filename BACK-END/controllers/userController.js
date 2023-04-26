const User = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res) => {
  try {
    User.find()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((error) => res.status(404).json({ error: "Bad request query." }));
  } catch {
    res.status(500).json({ error: "Get request failed." });
  }
};

//SIGN UP

exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;
  const passwordRegex =
    /(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z]*([0-9#$-/:-?{-~!"^_`\[\]]))(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]*[a-zA-Z])[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]{6,}/;

  if (!passwordRegex.test(password))
    return res
      .status(422)
      .json({
        error:
          "Password must be at least 6 characters long and contain at least one letter and one special character or number.",
      });
  else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, passwordHash) => {
        try {
          User.findOne({ email: email }).then((existingUser) => {
            if (existingUser) {
              res
                .status(422)
                .json({ error: "User already exists. Please log in." });
            } else {
              const createdUser = new User({
                name,
                email,
                password: passwordHash,
                role,
              });
              createdUser
                .save()
                .then((doc) => {
                  const token = jwt.sign(
                    {
                      user: createdUser._id,
                      name: createdUser.name,
                      email: createdUser.email,
                      role: createdUser.role,
                    },
                    "TokenPassword"
                  );

                  //send the token in the cookie

                  res
                    .cookie("token", token, {
                      httpOnly: true,
                    })
                    .send(doc);
                })
                .catch((error) =>
                  res.status(404).json({ error: error.message })
                );
            }
          });
        } catch {
          res.status(500).json({ error: "Sign up failed." });
        }
      });
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ error: "Wrong email or password" });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect)
      return res.status(401).json({ error: "Wrong email or password" });

    const token = jwt.sign(
      {
        user: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      "TokenPassword"
    );

    //send the token in the cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch {
    res.status(500).json({ error: "Login failed." });
  }
};

exports.logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

exports.loggedIn = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    jwt.verify(token, "TokenPassword");

    res.send(true);
  } catch (err) {
    res.json(false);
  }
};

exports.getName = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    const verified = jwt.verify(token, "TokenPassword");

    // Assuming the user's name is stored in the decoded token
    const userName = verified.name;
    res.send(userName);
  } catch (err) {
    res.json(err);
  }
};
