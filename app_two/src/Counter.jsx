import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 42 }
}

// create increment method to update the count by 1
increment = () => {
    this.state((prevState) => ({ count: prevState.count + 1 }));
}


render() {
    return (
        <>
            <div>
                <h2>{this.state.count}</h2>
                <button
                    className="counter-button"
                    onClick={this.increment}
                >
                    Click
                </button>
            </div>
            <style>{`
                .counter-button {
                    font-size: 1rem;
                    padding: 5px 10px;
                    color:  #585858;
                }
            `}</style>
        </>
    );
}
}

export default Counter;
