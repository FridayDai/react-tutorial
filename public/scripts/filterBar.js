/**
 * Created by daiyi on 5/26/16.
 */
var ProductCategoryRow = React.createClass({
  render: function(){
    return (
      <tr><th colspan="2">{this.props.category}</th></tr>
    );
  }
});

var ProductRow = React.createClass({
  render: function(){
    var name = this.props.product.stocked ? this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;

    return (
      <tr><td>{name}</td><td>{this.props.product.price}</td></tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function(){
    var rows = [];
    var lastCategory = null;
    this.props.product.forEach(function(product){
      if((product.name.indexOf(this.props.filterText) === -1 && product.price.indexOf(this.props.filterText) === -1) || (!product.stocked && this.props.inStockOnly)) {
        return;
      }

      if(product.category != lastCategory){
        rows.push(<ProductCategoryRow category={product.category} key={product.category}/>)
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));
    return (
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});


var SearchBar = React.createClass({
  onChange: function(){
    this.props.onUserInput(this.refs.text.value, this.refs.check.checked);
  },

  render: function() {
    return (
      <form>
        <input onChange={this.onChange} ref="text" type="text" placeholder="Search..." value={this.props.filterText}/>
        <input onChange={this.onChange} ref="check" type="checkbox" checked={this.props.inStockOnly}/>{' '}
        Only show products in stock
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {product: [], filterText:'', inStockOnly: false};
  },

  componentDidMount: function(){
    this.loadProductDataFromServer();
    setInterval(this.loadProductDataFromServer, 30000);
  },

  loadProductDataFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      success: function(data){
        this.setState({product: data});
      }.bind(this)
    });
  },

  handleInput: function(filterText, inStockOnly){
    this.setState({filterText: filterText, inStockOnly: inStockOnly});
  },

  render: function(){
    return (
      <div>
        <SearchBar  onUserInput={this.handleInput} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
        <ProductTable product={this.state.product} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
});

ReactDOM.render(<FilterableProductTable url="/api/products"/>, document.getElementById("filterBar"));















