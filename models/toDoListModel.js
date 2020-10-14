function ToDoListModel(mongoose){
    var schema = mongoose.Schema({
    name: String,
    description: String,
    createdOn: {type: Date, default: function(){return new Date()}}
    });

    return mongoose.model('todolist',schema,'todolist');
}
module.exports = ToDoListModel;