import React, { Component } from "react";
import * as d3 from 'd3';



class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapSize: { width: 0, height: 0 },
    }
  }

  componentDidMount() {
    this.handleResize();

    window.addEventListener("load", this.handleResize.bind(this));
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleResize);
    window.removeEventListener("resize", this.handleResize);
  }



  handleResize() {
    this.setState({
      ...this.state,
      mapSize: {
        ...this.state.mapSize,
        width: this.mapSVG.parentNode.clientWidth,
        height: this.mapSVG.parentNode.clientHeight
      }
    })
  }

  drawMap() {
    const { height, width } = this.state.mapSize;
    const { geoData, ogData } = this.props
    
    const projection = d3.geoMercator()
      .fitSize([width, height], ogData);

    const pathGenerator = d3.geoPath().projection(projection);
    // Build color scale
    var myColor = d3.scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([1, 37])

    this.counties = geoData
      .map((d) => {
        const active = this.props.active && this.props.active.id === d.id
        return (
          <path
            key={"path" + d.id}
            id={"path" + d.id}
            d={pathGenerator(d)}
            fill={myColor(d.properties.total)}
            fillOpacity="0.3"
            stroke={active ? "blue" : "black"}
            strokeWidth={active ? 4 : 2}
            cursor="pointer"
            className="states"
            onMouseEnter={() => {
              this.props.setActive(d)
            }}
            onMouseLeave={() => {
              this.props.setActive(null)
            }}
          />)
      })
  }

  render() {
    this.drawMap();
    return (
      <div>
        <div style={{ height: '50vh' }} className='map'>
          <svg width={'100%'} height={'100%'} ref={(mapSVG) => this.mapSVG = mapSVG}>
            <g>{this.counties}</g>
          </svg>
        </div>
      </div>
    )
  }
}

export default Map;