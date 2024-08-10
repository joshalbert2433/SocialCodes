const User = require('../models/user');

// Fetch a user by ID
exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select('-password'); // Exclude password field
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send('Error fetching user');
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, profilePic, bio } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).send('User not found');

    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;
    user.updatedAt = Date.now();

    await user.save();
    res.send('User updated');
  } catch (error) {
    res.status(400).send('Error updating user');
  }
};
