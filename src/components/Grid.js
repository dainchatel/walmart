import React, { Component, PropTypes } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';

// this is the grid component
// it gets two elements from the library, the table itself, and each column
// initial state is editing no element, with no new name to go in

//name, price, image, url, and rating formatters all just format the cell values as necessary
// editBrand chooses the product we're editing the brand of by 
//setting the editing state to that brand's id
// sendBrandChange does the PUT request that will update the API
// brandFormatter is a little more complicated than the others
// since it can have two formats, normal brand display
// or editing, which needs a form and a cancel button 
// the render function calls the bootstrap table with all the tableheadercolumns
// each has the API's attributes for filtering or sorting- it's easy to update
// it also links to each cell's formatting function

export default class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
          editing: 0,
          newName: '',
          confirmedBrands: []
        }
        this.editBrand = this.editBrand.bind(this);
        this.brandFormatter = this.brandFormatter.bind(this);
    }

    nameFormatter(cell, row) {
      return (
        <div>
          <div>{`${cell}`}</div>
          <a href={`${row.url}`}><i className="material-icons">launch</i></a>
        </div>
      )
    }

    priceFormatter(cell, row) {
      if (!cell) {
        return `(none)`
      } else {
      return `$${cell}`;
      }
    }

    imageFormatter(cell, row) {
      if (!cell) {
        return `(none)`
      } else {
      return (
        <img src={`${cell}`}/>
      )}
    }

    urlFormatter(cell, row) {
      return (
        <a href={`${cell}`}><i class="material-icons">launch</i></a>
      )
    }

    editBrand(cell, row) {
      this.setState({editing: row.id});
    }

    onNameChange(e) {
      e.preventDefault();
      this.setState({newName: e.target.value});
    }

    sendBrandChange(e) {
      console.log('doin this one!!');
      e.preventDefault();
      axios({
       method: 'put',
       url: '/products/' + this.state.editing,
       data: {
           brand: this.state.newName,
       }
      }).then(() => {
        console.log('this doesnot work');
        this.props.getProducts();
        this.setState({editing: 0});
      });
    }

    brandFormatter(cell, row) {
      if (this.state.editing !== row.id) {
        return (
          <div onClick={() => {this.editBrand(cell, row)}}>{`${cell}`}</div>
      )} else {
        return (
          <div>
          <form onSubmit={(e) => {this.sendBrandChange(e)}} className='edit-brand'>
            <input onChange={(e) => {this.onNameChange(e)}} type='text' name='brand' placeholder={`${cell}`}/>
            <input type='submit' value='save'/>
          </form>
          <button onClick={() => {this.setState({editing: 0})}}>cancel</button>
          </div>
      )}
    }

    ratingFormatter(cell, row) {
      if (!cell) {
        return (
          `(none)`
        )
      } else {
      return (
        <div>
          <img src={`${cell}`}/>
          <div>({`${row.reviews}`})</div>
        </div>
      )}
    }

    render() {
        return (
          <BootstrapTable data={this.props.products} striped hover>
            <TableHeaderColumn isKey={true} dataField='thumb' dataFormat={this.imageFormatter}></TableHeaderColumn>
            <TableHeaderColumn dataField='name' dataFormat={this.nameFormatter} filter={ { type: 'TextFilter', delay: 1000 } }>Product</TableHeaderColumn>
            <TableHeaderColumn dataField='brand' dataFormat={this.brandFormatter} filter={ { type: 'TextFilter', delay: 1000 } }>Brand Name</TableHeaderColumn>
            <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.priceFormatter} dataField='price' dataSort={ true }>Price</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.priceFormatter} dataField='msrp' dataSort={ true }>MSRP</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.ratingFormatter} dataField='rating' dataSort={ true }>Rating</TableHeaderColumn>
          </BootstrapTable>
        );
    }
}

