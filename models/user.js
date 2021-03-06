var mongooes = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;
var noop = function() {};

var userSchema = mongooes.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createat: { type: Date, default: Date.now },
  displayname: String,
  bio: String
});

userSchema.methods.name = function() {
  console.log('asd');
  return this.displayName || this.username;
};

userSchema.pre("save", function(done) {
  if (this.isModified("password")) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return done(err);
    }
    bcrypt.hash(this.password, salt, noop, (err, hashedPassword) => {
      if (err) {
        return done(err);
      }
      this.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = (guess, done) => {
  bcrypt.compare(guess, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

userSchema.methods.name = () => {
  return this.displayName || this.userName;
};

var User = mongooes.model("User", userSchema);

module.exports = User;
