import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ListGroup from 'react-bootstrap/ListGroup';
import { search } from '../../store/actions/search';
import { getStadium } from '../../store/actions/stadium';

let timeout = null;

const NavBarSearch = ({ history }) => {
  const [searching, setSearching] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState('stadium');

  const searchResult = useSelector((state) => state.search.results);
  const dispatch = useDispatch();

  const wrapperRef = useRef();

  const handleClickOutside = (event) => {
    if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSearching(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const setWrapperRef = (node) => {
    wrapperRef.current = node;
  };

  const handleSearchFocus = () => {
    setSearching(true);
  };

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (value) {
        dispatch(search(searchType, value));
      }
    }, 500);
  };

  const handleResultClicked = (id) => async (e) => {
    e.preventDefault();
    if (searchType === 'stadium') {
      await dispatch(getStadium(id));
      history.push(`/stadium/${id}`);
    } else if (searchType === 'user') {
      history.push(`/userprofile/${id}`);
    }
    setSearching(false);
  };

  const handleDropdownSelect = (e) => {
    setSearchType(e);
  };

  return (
    <Form inline onSubmit={(e) => e.preventDefault}>
      <InputGroup>
        <Dropdown onSelect={handleDropdownSelect}>
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

        <div ref={setWrapperRef}>
          <FormControl
            onFocus={handleSearchFocus}
            onChange={handleInputChange}
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
                onClick={handleResultClicked(result.id)}
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
};

NavBarSearch.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NavBarSearch);
