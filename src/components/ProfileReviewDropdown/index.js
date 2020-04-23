import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';
import { deleteReview } from '../../store/actions/review';

const ProfileReviewDropdown = ({ reviewId }) => {
  const [showModal, setShowModal] = useState(false);
  const iconRef = useRef();
  const overlayRef = useRef();
  const dispatch = useDispatch();

  const handleClickOutside = (event) => {
    if (iconRef && iconRef.current && !iconRef.current.contains(event.target)) {
      overlayRef.current.hide();
    }
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmClicked = async () => {
    await dispatch(deleteReview(reviewId));
    setShowModal(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const setIconRef = (node) => {
    iconRef.current = node;
  };

  const setOverlayRef = (node) => {
    overlayRef.current = node;
  };

  const listItemStyle = {
    border: 'none',
    padding: '8px 16px',
  };

  const popover = (
    <Popover id="popover-basic" style={{ width: 200 }}>
      <ListGroup>
        <ListGroup.Item action style={listItemStyle} onClick={handleDeleteClick}>
            Delete
        </ListGroup.Item>
      </ListGroup>
    </Popover>
  );
  return (
    <>
      <OverlayTrigger trigger="click" placement="left" overlay={popover} ref={setOverlayRef}>
        <i
          className="fa fa-ellipsis-v fa-lg"
          style={{
            color: 'slategray', float: 'right', cursor: 'pointer', padding: '0px 5px',
          }}
          ref={setIconRef}
        />
      </OverlayTrigger>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>Are you sure you want to delete this review?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
    Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmClicked}>
    Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ProfileReviewDropdown.propTypes = {
  reviewId: PropTypes.string.isRequired,
};

export default ProfileReviewDropdown;
