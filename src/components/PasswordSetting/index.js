import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { resetPassword } from '../../store/actions/auth';

const PasswordSetting = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleConfirmClicked = () => {
    setShowModal(false);
    dispatch(resetPassword());
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Send Password Reset Request</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>An email with a reset password link will be sent to you.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmClicked}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PasswordSetting;
