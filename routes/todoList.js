function TodoListRoute(express, todoListService) {
    var router = express.Router();

    router.post('/', function(req, res) {
        var name = req.body.name;
        var description = req.body.description;

        return todoListService.save(name, description, function(err, savedTodoList) {
            if(err) {
                console.error(err);
                return res.status(500).send();
            }

            return res.status(201).send(savedTodoList);
        });
    });

    router.get('/', function(req, res) {
        return todoListService.findAll(function(err, todoLists) {
            if(err) {
                console.error(err);
                return res.status(500).send();
            }

            return res.send({todoLists: todoLists});
        });
    });

    router.get('/id/:todoListId', function(req, res) {
        var todoListId = req.params.todoListId;
        return todoListService.findById(todoListId, function(err, todoList) {
            if(err) {
                console.error(err);
                return res.status(500).send();
            }

            return res.send(todoList);
        })
    });

    router.delete('/delete/:todoListId', function(req, res) {
         var todoListId = req.params.todoListId;
        return todoListService.deleteById(todoListId, function(err, todoList){
            if(err)
            {
                console.error(err);
                return res.status(500).send();
            }
            return res.status(204).send();
        })
    })

    return router;
}

module.exports = TodoListRoute;