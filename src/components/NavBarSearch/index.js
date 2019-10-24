import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import ListGroup from 'react-bootstrap/ListGroup';
import { searchStadium } from '../../store/actions/stadium';

let timeout = null;

class NavBarSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      inputValue: '',
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ searching: false });
    }
  }

  handleSearchFocus = () => {
    this.setState({ searching: true });
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({ inputValue: value });
    const { onSearchStadium } = this.props;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (value) {
        onSearchStadium(value);
      }
    }, 500);
  }

  handleResultClicked = (id) => () => {
    const { history } = this.props;
    history.push(`/stadium/${id}`);
    this.setState({ searching: false });
  }

  render() {
    const { searching, inputValue } = this.state;
    const { searchResult } = this.props;
    return (
      <Form inline>
        <InputGroup>
          {/* <DropdownButton
            size="sm"
            as={InputGroup.Prepend}
            variant="outline-dark"
            title="Name"
          >
            <Dropdown.Item href="#">Name</Dropdown.Item>
            <Dropdown.Item href="#">League</Dropdown.Item>
            <Dropdown.Item href="#">Tournament</Dropdown.Item>
            <Dropdown.Item href="#">Sport</Dropdown.Item>
          </DropdownButton> */}
          <div ref={this.setWrapperRef}>
            <FormControl
              onFocus={this.handleSearchFocus}
              // onBlur={this.handleSearchFocus(false)}
              onChange={this.handleInputChange}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              size="sm"
              value={inputValue}
              style={{ width: 250 }}
            />
            {searching && (
            <ListGroup style={{
              width: 250, position: 'absolute', top: 31, maxHeight: 350, overflowY: 'scroll',
            }}
            >
              {searchResult.map((result) => (
                <ListGroup.Item
                  key={result.id}
                  action
                  style={{ padding: '6px 10px' }}
                  onClick={this.handleResultClicked(result.id)}
                >
                  {result.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
            )}
          </div>
        </InputGroup>
      </Form>
    );
  }
}

NavBarSearch.propTypes = {
  onSearchStadium: PropTypes.func.isRequired,
  searchResult: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  searchResult: state.stadium.searchResult,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchStadium: (query) => dispatch(searchStadium(query)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(NavBarSearch);
