import mongoose from 'mongoose';

const userProfilesSchema = new mongoose.Schema({
  discordId: { type: String, required: true },
  robloxId: { type: String, required: true },
  activityArray: { type: Array, required: true },
  applicationHistory: { type: Array, required: true },
});

// Check if the model already exists
const User = mongoose.models.userProfiles || mongoose.model('userProfiles', userProfilesSchema);

export default User;
