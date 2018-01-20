import React from "react";
import TheSnake from "./TheSnake";
import * as ReactDOM from "react-dom";
import Food from "./Food";
export default class About extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            parts: [
                {x: 1, y: 1}],
            food: {x: 5, y:5},
            speed: 300,
            collision: false
        }
    }

    divElement = null;
    field = null;
    timerID = 0;
    lastKey = 'default';

    handleCollision = () => {
        let parts = this.state.parts;
        let last = parts[parts.length-1];
        for (let i = 0; i < parts.length-2; i++) {
            if (last.x == parts[i].x && last.y == parts[i].y) {
                return true;
            }
        }
        return (last.x < 1 || last.y < 1 || last.x > 40 || last.y > 25);
    }

    eat = () => {
        let x = Math.floor(Math.random() * 40) + 1;
        let y = Math.floor(Math.random() * 25) + 1;
        if (this.state.parts.some(p => {p.x === x && p.y === y})) {
            this.eat();
        } else {
            this.setState({
                food: {x:x, y:y}
            });
            if (this.state.parts.length < 5) this.setState({speed: 300});
            else if (this.state.parts.length < 10) this.setState({speed: 250});
            else if (this.state.parts.length < 20) this.setState({speed: 200});
            else if (this.state.parts.length < 30) this.setState({speed: 150});
            else if (this.state.parts.length < 50) this.setState({speed: 100});
            else if (this.state.parts.length < 70) this.setState({speed: 90});
            else if (this.state.parts.length < 100) this.setState({speed: 80});
            else if (this.state.parts.length < 130) this.setState({speed: 70});
            else this.setState({speed: 50});
            this.animate();
        }
    }

    gameOver = () => {
        clearInterval(this.timerID);
    }

    move = () => {
        if (this.state.collision) {
            this.gameOver();
            return;
        }
        let parts = this.state.parts;
        let last = parts[this.state.parts.length-1];
        let ln = {x:last.x+1, y:last.y};;
        switch (this.lastKey) {
            case 'ArrowUp':
                ln = {x:last.x, y:last.y-1};
                break;
            case 'ArrowDown':
                ln = {x:last.x, y:last.y+1};
                break;
            case 'ArrowLeft':
                ln = {x:last.x-1, y:last.y};
                break;
            case 'ArrowRight':
                ln = {x:last.x+1, y:last.y};
                break;
        }
        parts[this.state.parts.length] = ln;
        if (ln.y == this.state.food.y && ln.x == this.state.food.x) {
            this.eat();
        } else {
            parts.shift();
        }
        this.setState({
            parts: parts,
            collision: this.handleCollision()
        });
    }

    handleMove = (event) => {
        let keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        if (keys.some(i => i == event.key) ) {
            this.lastKey = event.key;
        }
    }

    animate = () => {
        clearInterval(this.timerID);
        this.timerID = setInterval(
            () => this.move(),
            this.state.speed
        );
    }

    componentDidMount() {
        this.focusDiv();
        this.animate();
    }

    componentDidUpdate() {
        this.focusDiv();
    }

    focusDiv() {
        ReactDOM.findDOMNode(this.divElement).focus();
    }

    restart = () => {
        this.lastKey = 'default';
        this.setState({
            parts: [
                {x: 1, y: 1}],
            food: {x: 5, y:5},
            speed: 300,
            collision: false
        });
        this.animate();
    }



    render () {


        let wW = window.innerWidth;
        let wH = window.innerHeight;
        let fieldH = wH*0.8;
        let fieldW = fieldH*1.6;
        let dim = fieldW / 40;


        let screenStyle = {
            backgroundColor: "darkgrey",
            height: (fieldH)+'px',
            width: wW+'px',
            borderColor: (this.state.collision) ? 'red' : 'grey',
            position: 'relative'
        }

        let scoreStyle = {
            fontFamily: 'Courier',
            fontWeight: 'bold',
            background: 'black',
            textAlign: 'center',
            color: (this.state.collision) ? 'red' : 'green',
            fontSize: '25px',
            width: wW+'px',
            height:(0.1*wH)+'px'
        }
        let headerStyle = {
            color: 'green',
            fontSize:'40px',
            fontFamily: 'Courier',
            fontWeight:'bold',
            backgroundColor:'black',
            textAlign:'center',
            width:wW+'px',
            height:(0.1*wH)+'px'
        }
        let score = 'SCORE: ' + this.state.parts.length*10;
        if (this.state.collision) {
            score = <div onClick={this.restart}>*** NEW GAME ***</div>
        }
        return (
            <div tabIndex="0" style={{outline: 0, width:'100vw'}} onKeyDown={(e) => this.handleMove(e)} ref={ divElement => this.divElement = divElement}>
                <div style={headerStyle}>React.Snake</div>
                <div style={scoreStyle}>
                    {score}
                </div>
                <div style={screenStyle} ref={ field => this.field = field}>
                    <div style={{margin:'auto',background:'lightgrey',width:fieldW+'px',height:fieldH+'px'}}>
                        <TheSnake dim={dim} parts={this.state.parts} collide={this.state.collision}>
                            <Food dim={dim} pos={this.state.food} />
                        </TheSnake>
                    </div>
                </div>
            </div>
        )
    }
}