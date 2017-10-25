import React, { Component } from 'react';
import axios from 'axios';
import Grid from './components/Grid.js';
import './react-styles/style.scss';
import moment from 'moment';


// In component did mount, getAllProducts is called
// It does a GET request for the whole products table, then divides up the data
// Each snapshot of 1000 is pushed as one array into the snapshots array
// The latest snapshot is selected as current
// The snapshot dates are formatted to be readable
// A new brands object is created
// This has the number of products of each brand in the current array
// Then a top 3 array of brands is created, so that that data can be 
//easily analyzed

// renderSnapshotOptions, renderbrandOptions, and renderResults 
//all do similar things
// if the state exists, then they iterate over it and create a series of UI elements
// in the first case, <option> elements, in the select checkbox <inputs> 
// and in the third <div> elements with the % and bar charts

// choose snapshot is called when the select box in top left is changed
// it looks to the snapshots array to find the new current array
// then it has to reset the current brands state as well
// it also has to reset the top3 state, since this changes from snap to snap

// the choose brand is called on change when a brand is checked/unchecked
// it pushes to a state array of selectedbrands, so that brand's 
// market share % can be rendered visually below

// take snap is called when the button is pressed
// it does a get request to the /snapshot route, 
// which really has nothing except the custom middleware
// that adds the current 1000 top products as another snapshot to our array
// there's a settimeout at the end because the route doesn't need
// to return a response, and it takes a while to do the middleware
// there's already a route for that, so the set timeout calls the first func

// fullyLoaded is the conditional rendering return 
// it checks to see if there's any API data then 
// it calls all the other elements

export default class App extends Component {

  constructor() {
    super();
    this.getAllProducts = this.getAllProducts.bind(this);
    this.state = {
      brandStats: []
    }
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts() {
    axios.get('/products')
      .then((res) => {
        let snapshots = [];
        let snapBrands = {};
        let allData = res.data.sort((a,b) => {return a.id - b.id});
        while (allData.length) {
          snapshots.push(allData.splice(0, 1000));
        }
        this.setState({snapshots: snapshots, current: snapshots[snapshots.length-1]});
        snapshots.forEach((d) => {
          let brandObj = {};
          let id = d[0].createdAt.split('');
          id.splice(19, 5);
          id.splice(10, 1);
          let newId = id.join('');
          let formattedId = moment(newId, 'YYYY-MM-DDHH:mm:ss').format('MMMM Do YYYY, h:mm:ss a');
          d.forEach((obj) => {
            if (!brandObj[obj.brand]) {
              brandObj[obj.brand] = 1;
            }
            else {
              brandObj[obj.brand]++;
            }
          })
          snapBrands[formattedId] = brandObj;
          if (this.state.current[0].createdAt === d[0].createdAt) {
            this.setState({currentBrands: brandObj});
          }
        });
        let top3 = {};
        for (let i = 0; i < 3; i++) {
          if (top3[this.state.current[i].brand]) {
            top3[this.state.current[i].brand]++;
          }
          else {
            top3[this.state.current[i].brand] = 1;
          }
        }
        console.log('doing this one')
        this.setState({top3: top3});
        this.setState({brandsBySnap: snapBrands});
    })
      .catch((error) => {
        console.log(error);
    });
  }

  renderSnapshotOptions() {
    if (this.state.brandsBySnap) {
      let snaps = Object.keys(this.state.brandsBySnap);
      return (snaps.map((key, i) =>  <option selected={i === (snaps.length - 1) ? 'selected' : 'not-selected'} value={i} key={key}>{key}</option>));
    }
  }

  renderBrandOptions() {
    if (this.state.currentBrands) {
      let brands = Object.keys(this.state.currentBrands).sort().filter((d) => {
        return d !== 'null';
      });
      return (brands.map((key, i) =>  <div key={key}><label name={key}>{key}: </label><input onChange={(e) => {this.chooseBrands(e)}} type='checkbox' value={key} name={key}/></div>));
    }
  }

  renderResults() {
    if (this.state.brandStats) {
      let { brandStats } = this.state;
      return (brandStats.map((key) =>
        <div className='both-markets' key={key}>
          <div className='total-market'>
            <p>{key} total market: {this.state.currentBrands[key]/10}%</p>
            <div className='whole-bar'>
              <div style={{width: this.state.currentBrands[key]/10 + '%'}} className='percent-bar'></div>
            </div>
          </div>
          <div className='top3-market'>
            <p>{key} top three: {this.state.top3[key] ? Math.round((this.state.top3[key]/3) * 100) : 0}%</p>
            <div className='whole-bar'>
              <div style={{width: this.state.top3[key] ? (this.state.top3[key]/3) * 100 + '%': 0 + '%'}} className='percent-bar'></div>
            </div>
          </div>
        </div>));
    }
  }



  chooseSnapshot(e) {
    e.preventDefault();
    let newSnap = this.state.snapshots[e.target.value];
    let new3 = {};
    for (let i = 0; i < 3; i++) {
      if (new3[newSnap[i].brand]) {
        new3[newSnap[i].brand]++;
      } else {
        new3[newSnap[i].brand] = 1;
      }
    };
    let newBrandObj = {};
    newSnap.forEach((d) => {
      if (newBrandObj[d.brand]) {
        newBrandObj[d.brand]++;
      } else {
        newBrandObj[d.brand] = 1;
      }
    });
    this.setState({currentBrands: newBrandObj});
    this.setState({current: newSnap});
    this.setState({top3: new3});
  }

  chooseBrands(e) {
    let { brandStats } = this.state;
    if (brandStats.indexOf(e.target.value) === -1) {
      brandStats.push(e.target.value);
    } else {
      brandStats.splice(brandStats.indexOf(e.target.value), 1);
    }
    this.setState({brandStats: brandStats});
    console.log(this.state.brandStats);
  }

  takeSnap(e) {
    if (e) {
      e.preventDefault();
    }
    axios.get('/snapshot')
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    })
    setTimeout(this.getAllProducts, 30*1000);
  }

  fullyLoaded() {
    if (!this.state.snapshots) {
      return (
        <div className='loading'>gimme a sec</div>
      )
    } else {
      return (
        <div>
          <div className='top-bar'>
            <select onChange={(e) => {this.chooseSnapshot(e)}}>
              {this.renderSnapshotOptions()}
            </select>
            <button onClick={(e) => {this.takeSnap(e)}}>Take Snapshot</button>
          </div>
          <Grid className='main-grid' getProducts={this.getAllProducts} products={this.state.current}/>
          <div className='bottom-bar'>
            <div>
              {this.renderBrandOptions()}
            </div>
            <div className='results'>
              {this.renderResults()}
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.fullyLoaded()}
      </div>
    );
  }
}
