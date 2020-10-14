function StubTodoListModel(name, description) {
    this.name = name;
    this.description = description;
    this.createdOn = new Date();
    return this;
}

module.exports = StubTodoListModel;