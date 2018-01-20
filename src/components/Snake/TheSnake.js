import React from "react";
import SnakeBodyPart from "./SnakeBodyPart";
export default class TheSnake extends React.Component {


    constructor(props) {
        super(props);
    }

    snakeLayerStyle= {
        width: '100%',
        height: '100%',
        position: 'relative'
    }



    render () {
        let monster = this.props.parts.map(p => <SnakeBodyPart dim={this.props.dim} x={p.x} y={p.y} color={this.props.collide ? 'red' : 'green'} ></SnakeBodyPart>);
        return (
            <div style={this.snakeLayerStyle}>
                {monster}
                {this.props.children}
            </div>
        )
    }
}