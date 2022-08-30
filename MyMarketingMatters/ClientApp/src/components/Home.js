import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { properties: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderPropertiesTable(properties) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(forecast =>
                        <tr key={forecast.id}>
                            <td>{forecast.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderPropertiesTable(this.state.properties);

        return (
            <div>
                <h4 id="tabelLabel" >ACTIVE LISTING</h4>
                <h2>MY PROPERTIES</h2>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('myproperties');
        const data = await response.json();
        this.setState({ properties: data, loading: false });
    }
}
