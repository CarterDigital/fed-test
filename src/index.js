// let's go!
import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import './css/style.css'


import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];

/**
 * This layout syncs positions to localstorage
 */
class LocalStorageLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 80,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

//layout changes in state for sync and reset
    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout)),
      items: []
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);

  }

  componentDidMount() {
    // Fetch the data from JSON file passed in source
    var th = this;
    this.serverRequest =
      axios.get(this.props.source)
        .then(function(result) {
          console.log(result.data.items)
          th.setState({
            items: result.data.items
          });
        })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  resetLayout() {
    this.setState({
      layout: []
    });
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
  }

  render() {
    return (
      <div>
        <button onClick={this.resetLayout}>Reset Layout</button>
          <ReactGridLayout {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}>
        {this.state.items.map(function(item) {
          return (
              <div key={item.id} data-grid={{ w:2, h:3, x:0 , y:0 }}>
              <div className="item" id={item.featured}>
                <a className="item-link" href={item.link} target="_blank">
                <div className="title">{item.title}</div><br/>
                </a>
                <div className="description">{item.description}</div><br/>
                {item.documentSize}
              </div>
              </div>
          );
        })}
        </ReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("items-pos")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "items-pos",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

render(<LocalStorageLayout source="http://prototype.carter-dev.net/fed-test/items.json"/>, document.getElementById('main'))
