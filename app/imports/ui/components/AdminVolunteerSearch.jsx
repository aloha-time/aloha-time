import React from 'react';
import _ from 'lodash';
import { Label, Grid, Search } from 'semantic-ui-react';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';

const initialState = { loading: false, results: [], value: '' };

// const count = organization;
//
// const source = count.forEach((org) => {
//   organizationName: org.organization;
// });

const source = OrganizationProfiles.find().fetch();

function reducer(state, action) {
  switch (action.type) {
  case 'CLEAN_QUERY':
    return initialState;
  case 'START_SEARCH':
    return { ...state, loading: true, value: action.query };
  case 'FINISH_SEARCH':
    return { ...state, loading: false, results: action.results };
  case 'UPDATE_SELECTION':
    return { ...state, value: action.selection };

  default:
    throw new Error();
  }
}

const resultRenderer = ({ organizationName }) => <Label content={organizationName} />;

function AdminVolunteerSearch() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const isMatch = (result) => re.organizationName(result.organizationName);

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch),
      });
    }, 300);
  }, []);
  React.useEffect(() => () => {
    clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={loading}
          onResultSelect={(e, data) => dispatch({ type: 'UPDATE_SELECTION', selection: data.result.organizationName })
          }
          onSearchChange={handleSearchChange}
          resultRenderer={resultRenderer}
          results={results}
          value={value}
        />
      </Grid.Column>

      {/* <Grid.Column width={10}> */}
      {/*  <Segment> */}
      {/*    <Header>State</Header> */}
      {/*    <pre style={{ overflowX: 'auto' }}> */}
      {/*    {JSON.stringify({ loading, results, value }, null, 2)} */}
      {/*  </pre> */}
      {/*    <Header>Options</Header> */}
      {/*    <pre style={{ overflowX: 'auto' }}> */}
      {/*    {JSON.stringify(source, null, 2)} */}
      {/*  </pre> */}
      {/*  </Segment> */}
      {/* </Grid.Column> */}
    </Grid>
  );
}

export default AdminVolunteerSearch;
