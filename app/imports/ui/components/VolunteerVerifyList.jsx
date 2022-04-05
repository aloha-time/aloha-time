import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid, Item, Label, Loader, Search } from 'semantic-ui-react';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import VolVerifyItem from './VolVerifyItem';

const initialState = { loading: false, results: [], value: '' };

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

const resultRenderer = ({ firstName }) => <Label content={firstName} />;

function VolunteerVerifyList({ ready, volunteer }) {

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
      const isMatch = (result) => re.test(result.firstName);

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(volunteer, isMatch),
      });
    }, 300);
  }, []);
  React.useEffect(() => () => {
    clearTimeout(timeoutRef.current);
  }, []);

  return ((ready) ? (
    <Grid container divided='vertically'>
      <Grid.Row>
        <Grid.Column width={6}>
          <Search
            loading={loading}
            onResultSelect={(e, data) => dispatch({ type: 'UPDATE_SELECTION', selection: data.result.firstName })
            }
            onSearchChange={handleSearchChange}
            resultRenderer={resultRenderer}
            results={results}
            value={value}
          />
        </Grid.Column>
      </Grid.Row>

      {/* <Grid.Column width={10}>
        <Segment>
          <Header>State</Header>
          <pre style={{ overflowX: 'auto' }}>
            {JSON.stringify({ loading, results, value }, null, 2)}
          </pre>
          <Header>Options</Header>
          <pre style={{ overflowX: 'auto' }}>
            {JSON.stringify(source, null, 2)}</pre>
        </Segment>
      </Grid.Column> */}
      <Grid.Row>
        <Grid.Column>
          <Item.Group divided>
            {results.map((vol) => <VolVerifyItem key={volunteer._id} volunteer={vol}/>)}
            {volunteer.map((vol) => <VolVerifyItem key={volunteer._id} volunteer={vol}/>)}
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : <Loader active>Getting data</Loader>);
}

VolunteerVerifyList.propTypes = {
  volunteer: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = VolunteerProfiles.subscribe();
  const ready = subscription.ready();
  const volunteer = VolunteerProfiles.find({}, { sort: { firstName: 1 } }).fetch();
  return {
    volunteer,
    ready,
  };
})(VolunteerVerifyList);
