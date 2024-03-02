import PropTypes from 'prop-types';
import React from 'react';
import {Modal} from 'react-bootstrap';
import './movie-modal.scss';

export const MovieModal = ({filterByGenre, movie, showModal, handleCloseModal}) => {

    return (
        <Modal show={showModal} onHide={handleCloseModal} dialogClassName='movie-modal border-white' >
            <Modal.Header closeButton className='bg-mainview-primary'>
                <Modal.Title>
                    <div>{movie.title}</div>
                    <div>{movie.director}</div>
                </Modal.Title>

            </Modal.Header>
            <Modal.Body className='bg-mainview-primary'>
                <img src={movie.image} />                 
            </Modal.Body>
            <Modal.Footer className='bg-mainview-primary'>
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