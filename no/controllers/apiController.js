const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

module.exports = {

  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username: username });
      if (!user) {
      res.status(400).json({ message: "User yang anda masukan tidak ada!!"});
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
      res.status(400).json({ message: "Password yang anda masukan tidak cocok!!"});
      }

      req.session.user = {
        id: user.id,
        username: user.username
      }
      res.status(200).json({ message: "Success Login"});

    } catch (error) {
      res.status(400).json({ message: "Gagal Login"});
    }
  },
}