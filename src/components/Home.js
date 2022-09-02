import React, { Component } from 'react';
import {AppConstants} from '../AppConstants';

export class Home extends Component {
   
    constructor(props) {
        super(props);
        this.state = { properties: [], loading: true };
    }

    componentDidMount() {
        this.populatePropertyData();
    }

    renderPropertiesView(properties) {
        return (
            properties.map(property =>
                <div className="row property-item" key={property.$id}>
                    <div className="col-md-2">
                        <img src={property.imageSource} />
                    </div>
                    <div className="col-md-5">
                        <h6 >{property.StreetAddress}</h6>
                        <h6>{property.City}, {property.StateCode}, {property.ZipCode}</h6>
                        <p className='text-secondary' >
                        {property.DescriptionExpanded ? property.Description : property.ShortDescription}
                        <a className='empty-link' href='javascript:void(0)'
                            onClick={() => {property.DescriptionExpanded = !property.DescriptionExpanded; this.setState({ properties: properties, loading: false });}}
                            style={property.DidCutoff ? {} : { display: 'none' }} 
                            >
                            {!property.DescriptionExpanded ? 'more...':' less'}
                        </a>
                        </p>
                    </div>
                    <div className="col-md-1 text-center">
                        <a href='javascript:void(0)' className='empty-link'><i className="bi bi-postcard"></i><br /><span className='small'>Create Postcard</span></a>
                    </div>
                    <div className="col-md-1 text-center">
                        <a href='javascript:void(0)' className='empty-link'><i className="bi bi-facebook"></i><br /><span className='small'>Create Facebook Post</span></a>
                    </div>
                    <div className="col-md-1 text-center">
                        <a href='javascript:void(0)' className='empty-link'><i className="bi bi-instagram"></i><br /><span className='small'>Create Instagram Post</span></a>
                    </div>
                    <div className="col-md-1 text-center">
                        <a href='javascript:void(0)' className='empty-link'><i className="bi bi-twitter"></i><br /><span className='small'>Create Twitter Post</span></a>
                    </div>
                    <div className="col-md-1 text-center">
                        <a href='javascript:void(0)' className='empty-link'><i className="bi bi-envelope"></i><br /><span className='small'>Create Email</span></a>
                    </div>
                </div>
            )
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderPropertiesView(this.state.properties);

        return (
            <div >
                <div className='p-3 mb-2 bg-info-light text-dark'>
                    <h4 className='text-info' >ACTIVE LISTING</h4>
                    <h2>MY PROPERTIES</h2>
                </div>
                {contents}
            </div>
        );
    }

    async populatePropertyData() {
        //TODO Get Subdomain from URL
        const subdomain = 'ttr';
        const response = await fetch(`${AppConstants.API_URL}/${subdomain}?agent=${AppConstants.AGENT_ID}&premium=0`);
        const data = await response.json();
        data.forEach(element => {
            const cutOffLength = 200;
            if(element.Description.length > cutOffLength){
                element.ShortDescription = element.Description.substring(0,cutOffLength) + ' ';
                element.DidCutoff = true;
                element.DescriptionExpanded = false; 
            }
            else{
                element.ShortDescription = element.Description + ' ';
                element.DidCutoff = false;
                element.DescriptionExpanded = true; 
            }
            
            element.imageSource = `${AppConstants.API_URL}/Pictures.aspx?agent=${AppConstants.AGENT_ID}&site=${subdomain}&mlsid=${element.MLSId}`
        });
        this.setState({ properties: data, loading: false });
    }
}
