import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {MoviesHeader} from '../../_components';
import { movieActions } from '../../_actions';

class MoviesPage extends React.PureComponent {
    componentDidMount() {
        this.props.getMovies();
    }

    render() {
        const { movies } = this.props;
        const handleSearch = (q)=>{
            console.log(q)
            return (e) => this.props.getMovies(q);
        }
        return (
            <div className="col-md-6 col-md-offset-3">
                <MoviesHeader getMovies={handleSearch}/>
                <h3>All movies:</h3>
                {movies.loading && <em>Loading movies...</em>}
                {movies.error && <span className="text-danger">ERROR: {movies.error}</span>}
                {movies.items &&
                    <ul>
                        {movies.items.map((movie, index) =>
                            <li key={movie._id}>
                                <Link to={{
                                pathname: "/movie",
                                state: movie}}>
                                    <strong>{movie.title + ' Gender: ' + movie.gender}</strong><br/>
                                </Link>
                            </li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

function mapState(state) {
    const { movies } = state;
    return { movies };
}

const actionCreators = {
     getMovies: movieActions.getAll
}

const connectedMoviesPage = connect(mapState, actionCreators)(MoviesPage);
export { connectedMoviesPage as MoviesPage };