import React from "react";
import axios from "axios";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        // console.log('handleChange running!');
        // console.log("e.target.value: ", e.target.value); //e.target gives back whatever user is typing
        console.log("e.target.name: ", e.target.name); //any input name is added as a property of e.target, thats wey we love putting names on e.targets
        // we use this.setState to PUT information in state! //state its like data object
        this.setState(
            {
                [e.target.name]: e.target.value //this is NOT an array -> [e.target.name] <- this is a variable right now
            },
            () => console.log("this.state: ", this.state)
        );
    } //this function will work for as much input fields as we want
    render() {
        return (
            <div>
                <h1>welcome message</h1>
                <form>
                    <input
                        name="first"
                        placeholder="firstname"
                        onChange={this.handleChange}
                    />{" "}
                    <input
                        name="last"
                        placeholder="lastname"
                        onChange={this.handleChange}
                    />
                    <input
                        name="email"
                        placeholder="lastname"
                        onChange={this.handleChange}
                    />
                    <input
                        name="pasword"
                        placeholder="lastname"
                        onChange={this.handleChange}
                    />
                    <button>submit</button>
                </form>
            </div>
        );
    }
}

// onChange = {e => this.handleChange(e)} // then you don't need to to binding

// import React from 'react';
// import Greetee from './greetee';
// import GreeteeChanger from './greeteechanger';
//
// export default class Hello extends React.Component {
//     constructor(props) {
//         super(props); //boilerplate stuff you must always to do!
//         this.state = {}; //the only time you set state direclty is HERE
//             greetee: this.props.greetee
//         };
//     }
//     changeGreetee(greetee) {
//         this.setState({
//             greetee: greetee
//         });
//     }
//     render() {
//         const isGoddDay = false;
//         return (
//             <div style={{
//                 color: this.props.color,
//                 fontSize: '26px'
//             }}>
//                 Hello, <Greetee greetee={this.state.greetee} />!
//                 <ul>
//                     <li>Batman</li>
//                     <li>Hello Kitty</li>
//                     <li>{
//                         Math.random() >= .5 ?
//                         <span>Leonardo</span> :
//                         <span>NOT Leonardo</span>
//                     }</li>
//                 </ul>
//                 {isGoodDay && <div>Today is good</div>}
//                 <GreeteeChanger changeGreetee={greetee => this.changeGreetee(greetee)} />
//             </div>
//         );
//     }
// }

//you want to change the data on the scree you need to change the state
