var TodoApp = React.createClass({
  getTodoData: function(){
    $.ajax({
      url
    })
  },

  render: function(){
    return (
      <div>
        <h2>ToDoBox</h2>
        <TodoList url={this.props.url}/>
        <TodoForm />
      </div>
    );
  }
});

var TodoList = React.createClass({
  getInitialState: function(){
    return ({todoList: []});
  },

  loadDataFormServer: function(){

  },



  render: function(){
    var list = [];
    var lastList = null;

    if(list!= lastList){
      list.push(<li key={this.state.todoList.id}>{this.state.todoList.text}</li>);
    }

    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
});

var TodoForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();

    var text = this.state.text.trim();
    if(!text){
      return
    }
    this.setState({text:''});
  },

  onChange: function(e){
    this.setState({text: e.target.value});
  },

  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.onChange} value={this.state.text} type="text"/>
        <input type="submit"/>
      </form>
    );
  }
});



ReactDOM.render(<TodoApp url="/api/toDoList"/>, document.getElementById("toDo"));
