import React from "react";
export default class SnakeBodyPart extends React.Component {


    constructor(props) {
        super(props);
    }

    render () {
        let x = this.props.x;
        let y = this.props.y;
        let dim = this.props.dim;
        let color = this.props.color;
        let blockStyle = {
            backgroundColor: color,
            height: dim+'px',
            width: dim+'px',
            position: 'absolute',
            borderRadius: 5,
            top: ((y-1)*dim)+'px',
            left: ((x-1)*dim)+'px'
        }
        return (
            <div style={blockStyle}>

            </div>
        )
    }
}