import React from "react";
export default class Food extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        let x = this.props.pos.x;
        let y = this.props.pos.y;
        let dim = this.props.dim;
        let blockStyle = {
            background: "url(http://www.latimes.com/projects/la-na-pol-presidential-debate-primer/static/img/trump-head.png)",
            height: dim+'px',
            width: dim+'px',
            position:'absolute',
            top: ((y-1)*dim)+'px',
            left: ((x-1)*dim)+'px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }
        return (
            <div style={blockStyle}>
            </div>
        )
    }
}