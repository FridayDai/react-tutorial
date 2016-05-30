var React = require('react');


var TodoApp = React.createClass({
  getInitialState: function(){
    return ({todoList: []});
  },

  getTodoData: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data){
        this.setState({todoList: data});
      }.bind(this)
    });
  },

  componentDidMount: function(){
    this.getTodoData();
    setInterval(this.getTodoData, 30000);
  },

  handleTodoListSubmit: function(data){
    var msg = this.state.todoList;

    data.id = Date.now();
    var newMsg = msg.concat([data]);
    this.setState({todoList: newMsg});

    $.ajax({
      url: this.props.postUrl,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        this.setState({todoList: data});
      }.bind(this)
    });

  },

  render: function(){
    return (
      <div>
        <h2>ToDoBox</h2>
        <TodoList data={this.state.todoList}/>
        <TodoForm onTodoListSubmit={this.handleTodoListSubmit}/>
      </div>
    );
  }
});

var TodoList = React.createClass({

  render: function(){
    var list = this.props.data.map(function(msg){
      return (
        <li key={msg.id}>
          {msg.text}
        </li>
      );
    });

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
  getInitialState: function() {
    return {text: '', id: 0};
  },

  handleSubmit: function(e){
    e.preventDefault();

    var text = this.state.text;
    var id = this.state.id;
    if(!text){
      return
    }

    this.props.onTodoListSubmit({text: text, id: id});
    this.setState({text:''});
  },

  onChange: function(e){
    this.setState({text: e.target.value});
  },

  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.onChange} value={this.state.text} type="text" placeholder="to do something..."/>
        <input type="submit" value="post"/>
      </form>
    );
  }
});

ReactDOM.render(<TodoApp url="/api/toDoList" postUrl="/api/toDoForm"/>, document.getElementById("toDo"));
