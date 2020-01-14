import React from 'react';
//import ReactDOM from 'react-dom';
import './App.css';
import DisplayComponent from './components/displayComponent';
import KeypadComponent from "./components/keypadComponent";

class App extends React.Component {
    constructor(){
        super();

        this.state = {
            result: "",
            prevKey:"",
            //prevRes: ""
        }
    }

    onPress = button => {

        if(button === "="){
            this.calculate()
            this.setState({prevKey:"="})
        }
        else if(button === "C"){
            this.reset()
        }
        else if(button === "CE"){
            this.backspace()
        }

        else {
            if(this.state.prevKey==="=" && (button!=="+" && button!=="-" && button!=="*" && button!=="/"))
            {
                this.reset()
                if(button==="0")
                    this.setState({result:""})
                else
                    this.setState({prevKey:button,result:button})          
            }
            else if((this.state.prevKey==="+" || this.state.prevKey==="*" || this.state.prevKey==="-" || this.state.prevKey==="/"|| this.state.prevKey==="") && button==="0"){
                this.setState({result: this.state.result});
            }
            else {
                this.setState({
                    prevKey:button,
                    result: this.state.result + button
                });
            }
            
        }
    };


    calculate = () => {
        var checkResult = ''
        if(this.state.result.includes('--')){
            checkResult = this.state.result.replace('--','+')
        }

        else {
            checkResult = this.state.result
        }

        try {
            this.setState({
                result: (eval(checkResult) || "0" ) + ""
            })
        } catch (e) {
            this.setState({
                result: "error"
            })

        }
    };

    reset = () => {
        this.setState({
            result: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        });
    };

    render() {
        return (
            <div>
                <h1> Calculator </h1>
                <div className="calculator-body">
                    
                    <DisplayComponent result={this.state.result}/>
                    <KeypadComponent onPress={this.onPress}/>
                </div>
            </div>
        );
    }
}

export default App