import PropTypes from 'prop-types';
import React from 'react';
import {Modal} from 'react-bootstrap';

export const MovieModal = ({filterByGenre, movie, showModal, handleCloseModal}) => {

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div>{movie.title}</div>
                    <div>{movie.director}</div>
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <div className='imageHolder'>
                    <img src={movie.image} />                 
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='container-fluid'>
                    <h2>Similar Movies</h2>
                    {filterByGenre(movie)}
                </div>
            </Modal.Footer>

        </Modal>
    );
};

MovieModal.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        genre: PropTypes.string,
        director: PropTypes.string,
        image: PropTypes.string.isRequired
    }).isRequired,
    filterByGenre: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired
};