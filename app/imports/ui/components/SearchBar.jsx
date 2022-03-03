import React from 'react';
import { escapeRegExp, map } from 'lodash';
import { Search } from 'semantic-ui-react';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';

/**
 * Renders a search bar to search content. /components/NavBar.jsx.
 */
const organizations = OrganizationProfiles.find({}, { sort: { organizationName: 1 } });
const initState = {
  loading: false,
  results: [],
  value: '',
};

function handleSubmit(state, action) {
  if (action.type === 'CLICK_SELECTION') {
    this.location = `/#/orginfo/${action.selection}`;
  }
  if (action.type === 'SEARCH') {
    this.location = `/#/search/${action.submit}`;
  }
}

function reducer(state, action) {
  switch (action.type) {
  case 'CLEAN_QUERY':
    return initState;
  case 'START_SEARCH':
    return { ...state, loading: true, value: action.query };
  case 'FINISH_SEARCH':
    return { ...state, loading: false, results: action.results };
  case 'CLICK_SELECTION':
    handleSubmit(state, action);
    return initState;
  case 'SEARCH':
    handleSubmit(state, action);
    return initState;
  default:
    throw new Error();
  }
}

function SearchBar() {
  const [state, dispatch] = React.useReducer(reducer, initState);
  const { loading, results, value } = state;
  const timeoutRef = React.useRef();

  const listenEnter = (e) => {
    if (e.keyCode === 13) {
      dispatch({ type: 'SEARCH', submit: value });
    }
  };

  const handleSearchChange = React.useCallback((e, data) => {
    const res = [];
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });
    timeoutRef.current = setTimeout(async () => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }

      const re = new RegExp(escapeRegExp(data.value), 'i');
      const isMatch = (result) => re.test(`${result.firstName} ${result.lastName}`);
      await organizations.forEach((organization) => {
        if (isMatch(organization)) {
          res.push(organization);
        }
      });
      dispatch({
        type: 'FINISH_SEARCH',
        results: map(res, (entry) => ({
          title: `${entry.organizationName}`,
          image: entry.avatar,
          id: entry._id,
        })),
      });
    }, 300);
  }, []);

  React.useEffect(() => () => {
    clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Search
      loading={loading}
      onResultSelect={(e, data) => dispatch({ type: 'CLICK_SELECTION', selection: data.result.id })}
      onSearchChange={handleSearchChange}
      onKeyDown={(e) => listenEnter(e)}
      results={results}
      value={value}
      fluid
    />
  );
}

export default SearchBar;
