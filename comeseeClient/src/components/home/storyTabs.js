import React, { Component } from 'react';

import IS from '../../css/home/infoPage.module.css';

import axios from 'axios';

class StoryTabs extends Component {

    state = {
        trailerURL: '',
    }
    componentDidMount() {
        // Fetch the trailer URL when the component mounts
        this.fetchTrailerURL(this.props.id);  // Assuming you have an 'id' prop
    }

    fetchTrailerURL(id) {
        // Make a request to your API to fetch the trailer URL for the specified 'id'
        axios.get(`http://localhost:2407/filminfo/trailer/${id}`)
            .then((res) => {
                const trailerURL = res.data.trailerURL;  // Assuming your API returns an array with a trailerURL property
                this.setState({ trailerURL });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <>
                <article className={IS.text}>
                    {this.props.story}
                </article>
                <div className={IS.videobox}>
                    <iframe
                        src={this.state.trailerURL}
                        allowFullScreen={true}
                        title="Youtube Video Description"
                        className={IS.video}>

                    </iframe>
                </div>
            </>
        );
    }
}

export default StoryTabs;