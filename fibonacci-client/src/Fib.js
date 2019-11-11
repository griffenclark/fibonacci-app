import React, { Component } from 'react';
import ax from 'axios';

const axios = ax.create({ baseUrl: 'http://localhost:5000' })

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    }

    componentDidMount() {
        this.fetchValues();
        this.fetchIndeces();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        console.log("Values: " + values.data);
        this.setState({ values: values.data });
    }

    async fetchIndeces() {
        const indeces = await axios.get('/api/values/all');
        console.log("Indeces: " + indeces.data);
        this.setState({ seenIndexes: indeces.data });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index
        });

        this.setState({ index: '' });
    }

    renderSeenIndeces() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I Calculated {this.state.values[key]}
                </div>
            )
        }

        return entries;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index</label>
                    <input
                        value={this.state.index} 
                        onChange={event => this.setState({ index: event.target.value })} 
                    />
                    <button>Submit</button>
                </form>

                <h3>Indeces I have seen</h3>
                {this.renderSeenIndeces()}

                <h3>Calculated Values</h3>
                {this.renderValues()}
            </div>
        )
    }
}

export default Fib;