
function User(mongoose,bcrypt){
    SALT_WORK_FACTOR = 10;
var userSchema = new mongoose.Schema({
    username:{type: String,unique:true},
    password:{type: String},
    firstname: String,
    lastname: String
});

userSchema.pre('save',function(next){
var user = this;

if(!user.isModified('password'))
return next;

bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
if(err) return next(err);

bcrypt.hash(user.password,salt,function(err,hash){
if(err) return next(err);

user.password = hash;
next();

});
});
});

userSchema.methods.comparePassword = function(candidatePassword,callback)   {
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
       if(err) return callback(err);
       callback(undefined,isMatch);
    });
};

return mongoose.model('myuser',userSchema);
}
module.exports = User;