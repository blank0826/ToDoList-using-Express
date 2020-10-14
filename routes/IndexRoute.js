function IndexRoute(express,User) {
    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', {title: 'Express'});
    });

    router.post('/login',function(req,res){
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({username: username},function(err,user){
            if(err)
            {
                console.error(err);
                return res.status(500).send();
            }

            if(!user){
                return res.status(404).send();
            }

            user.comparePassword(password,function(err,isMatch){
                if(isMatch&&isMatch == true)
                {
                    req.session.user = user;
                    return res.status(200).send();
                }
                else{
                return res.status(401).send();
                }
            });

        })
    });

    router.get('/logout',function(req,res){
        req.session.destroy();
        return status.status(200).send();
    })
    router.post('/register',function(req,res){
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;

        var newuser = new User();
        newuser.username = username;
        newuser.password = password;
        newuser.firstname = firstname;
        newuser.lastname = lastname;
        newuser.save(function(err,savedUser){
            if(err)
            {
                console.error(err);
                return res.status(500).send();
            }
            return res.status(200).send();
        })
    });

    router.get('/dashboard',function(req,res){
        if(!req.session.user)
        {
           return res.status(401).send();
        }
        else
            return res.status(200).send("Welcome to the To-doList");
    });


    return router;
}

module.exports = IndexRoute;