function TodoListService(ToDoListModel) {
    this.save = function SaveTodoList(name,description, callback) {
        var newToDoList = new ToDoListModel();
        newToDoList.name = name;
        newToDoList.description = description;
        newToDoList.save(function(err,savedTodoList){
            if(err){
            console.error(err);
            return callback(err);
            }
            return callback(undefined,savedTodoList);
        });
    };

    this.findAll = function FindAllTodoLists(callback) {
        return ToDoListModel.find({},callback);
    };

    this.findById = function FindTodoListsById(id, callback) {
        return ToDoListModel.findById(id,callback);
    };

    this.deleteById = function DeleteTodoListById(id,callback)
    {
        return ToDoListModel.findById(id,function(err,foundTodolist){
            if(err)
            {
                console.error(err);
                return callback(err);
            }

            return foundTodolist.remove(function(err){
                return callback(err);
            });
        });
    };
    return this;
}

module.exports = TodoListService;