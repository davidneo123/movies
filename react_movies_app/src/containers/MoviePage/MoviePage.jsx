import React from 'react';
import { connect } from 'react-redux';
import { movieActions } from '../../_actions';
import { Link } from 'react-router-dom';


class MoviePage extends React.PureComponent {
    constructor(props) {
        super(props);}
    
        componentDidMount() {
        // this.props.getCast(this.props.location.state.id);
    }

    componentWillUnmount(){
        this.setState({
            cast:null,
        })
      }

    render() {
        const { location, cast } = this.props;
        return (            
            <div className="container">
                <Link to="/movies">Return to movies </Link>
                <div className="col-md-12 col-md-offset-1">
                    <h1>This page is under construction</h1>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { cast } = state;
    return { cast };
}

const actionCreators = {
    getCast: movieActions.getCast,
}

const connectedMoviePage = connect(mapState, actionCreators)(MoviePage);
export { connectedMoviePage as MoviePage };