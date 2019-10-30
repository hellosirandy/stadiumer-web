import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ListGroup from 'react-bootstrap/ListGroup';
import { search } from '../../store/actions/search';
import { getStadium } from '../../store/actions/stadium';

let timeout = null;

class NavBarSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      inputValue: '',
      searchType: 'stadium',
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
    const { searchType } = this.state;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (value) {
        onSearchStadium(searchType, value);
      }
    }, 500);
  }

  handleResultClicked = (id) => async () => {
    const { history, onGetStadium } = this.props;
    const { searchType } = this.state;
    if (searchType === 'stadium') {
      await onGetStadium(id);
      history.push(`/stadium/${id}`);
    } else if (searchType === 'user') {
      history.push(`/userprofile/${id}`);
    }
    this.setState({ searching: false });
  }

  handleDropdownSelect = (e) => {
    this.setState({ searchType: e });
  }

  render() {
    const { searching, inputValue, searchType } = this.state;
    const { searchResult } = this.props;
    return (
      <Form inline>
        <InputGroup>
          <Dropdown onSelect={this.handleDropdownSelect}>
            <DropdownButton
              size="sm"
              as={InputGroup.Prepend}
              variant="outline-dark"
              title={searchType}
            >
              <Dropdown.Item eventKey="stadium">stadium</Dropdown.Item>
              <Dropdown.Item eventKey="user">user</Dropdown.Item>
            </DropdownButton>
          </Dropdown>

          <div ref={this.setWrapperRef}>
            <FormControl
              onFocus={this.handleSearchFocus}
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
              {searchResult[searchType].map((result) => (
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
  searchResult: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onGetStadium: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  searchResult: state.search.results,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchStadium: (type, value) => dispatch(search(type, value)),
  onGetStadium: (id) => dispatch(getStadium(id)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(NavBarSearch);
