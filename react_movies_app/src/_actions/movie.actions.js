import { movieConstants } from '../_constants';
import { movieService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const movieActions = {
    getAll,
    getCast,
};

function getAll(q) {
    console.log('action: '+q)
    return dispatch => {
        dispatch(request(q));

        movieService.getAll(q)
            .then(
                movies => dispatch(success(movies)),
                error => dispatch(failure(q,error.toString()))
            );
    };

    function request(q) { return { type: movieConstants.GETALL_REQUEST,q } }
    function success(movies) { return { type: movieConstants.GETALL_SUCCESS, movies } }
    function failure(error) { return { type: movieConstants.GETALL_FAILURE, q,error } }
}

function getCast(id) {
    return dispatch => {
        dispatch(request(id));

        movieService.getCast(id)
            .then(
                cast => dispatch(success(cast)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: movieConstants.GETCAST_REQUEST, id } }
    function success(cast) { return { type: movieConstants.GETCAST_SUCCESS, cast } }
    function failure(error) { return { type: movieConstants.GETCAST_FAILURE, error } }
}
