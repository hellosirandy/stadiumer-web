import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { resetPassword } from '../../store/actions/auth';

class PasswordSetting extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleShowModal = (show) => () => {
    this.setState({ showModal: show });
  }

  handleConfirmClicked = () => {
    const { onResetPassword } = this.props;
    this.handleShowModal(false)();
    onResetPassword();
  }

  render() {
    const { showModal } = this.state;
    return (
      <>
        <Button onClick={this.handleShowModal(true)}>Send Password Reset Request</Button>
        <Modal show={showModal} onHide={this.handleShowModal(false)}>
          <Modal.Body>An email with a reset password link will be sent to you.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleConfirmClicked}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

PasswordSetting.propTypes = {
  onResetPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onResetPassword: () => dispatch(resetPassword()),
});

export default connect(null, mapDispatchToProps)(PasswordSetting);
