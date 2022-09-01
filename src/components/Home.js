import React, { Component } from 'react';
import {AppConstants} from '../AppConstants';

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
            properties.map(property =>
                <div className="row" key={property.$id}>
                    <div className="col-md-3">
                        <img src={property.imageSource} />
                    </div>
                    <div className="col-md-4">
                    <span>{property.StreetAddress}</span>
                        <br />
                        <span>{property.City}, {property.StateCode}, {property.ZipCode}</span>
                        <p>
                        {property.Description}
                        </p>
                    </div>
                    <div className="col-md-1 text-center">
                        <i className="bi bi-postcard"></i><br /><span>Create Postcard</span>
                    </div>
                    <div className="col-md-1 text-center">
                        <i className="bi bi-facebook"></i><br /><span>Create Facebook Post</span>
                    </div>
                    <div className="col-md-1 text-center">
                        <i className="bi bi-instagram"></i><br /><span>Create Instagram Post</span>
                    </div>
                    <div className="col-md-1 text-center">
                        <i className="bi bi-twitter"></i><br /><span>Create Twitter Post</span>
                    </div>
                    <div className="col-md-1 text-center">
                        <i className="bi bi-envelope"></i><br /><span>Create Email</span>
                    </div>
                </div>
            )
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
        const subdomain = 'ttr';
        const response = await fetch(`${AppConstants.API_URL}/${subdomain}?agent=${AppConstants.AGENT_ID}&premium=0`);
        const data = await response.json();
        data.forEach(element => {
            element.imageSource = `${AppConstants.API_URL}/Pictures.aspx?agent=${AppConstants.AGENT_ID}&site=${subdomain}&mlsid=${element.MLSId}`
        });
        this.setState({ properties: data, loading: false });
    }
}
