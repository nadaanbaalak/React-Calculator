import React from 'react';

class DisplayComponent extends React.Component {


    render() {
        let {result} = this.props;
        return (
            <div className="result">
                <p>{result}</p>
            </div>
    );
    }
}
export default DisplayComponent;