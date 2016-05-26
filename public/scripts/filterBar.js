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
      if(product.category != lastCategory){
        rows.push(<ProductCategoryRow category={product.category} key={product.category}/>)
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
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
  render: function() {
    return (
      <form action="#" className="searchBar">
        <input type="text" name="searchProduct" id="searchProduct" placeholder="Search..." />
        <input type="checkbox"/>{' '}
        Only show products in stock
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {product: []};
  },

  componentDidMount: function(){
    this.loadProductDataFromServer();
    setInterval(this.loadProductDataFromServer, 2000);
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

  render: function(){
    return (
      <div className="filterBar">
        <SearchBar />
        <ProductTable product={this.state.product}/>
      </div>
    );
  }
});

ReactDOM.render(<FilterableProductTable url="/api/products"/>, document.getElementById("filterBar"));















