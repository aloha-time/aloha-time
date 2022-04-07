import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid, Item, Label, Loader, Search } from 'semantic-ui-react';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import OppVerifyItem from './OppVerifyItem';

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

const resultRenderer = ({ title }) => <Label content={title} />;

function OppVerifyList({ ready, opportunities }) {

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
      const isMatch = (result) => re.test(result.title);

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(opportunities, isMatch),
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
            onResultSelect={(e, data) => dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
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
            {results.map((opp) => <OppVerifyItem key={opportunities._id} opportunity={opp}/>)}
            {opportunities.map((opp) => <OppVerifyItem key={opportunities._id} opportunity={opp}/>)}
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : <Loader active>Getting data</Loader>);
}

OppVerifyList.propTypes = {
  opportunities: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Opportunities.subscribeOpportunityAdmin();
  const ready = subscription.ready();
  const opportunities = Opportunities.find({ verification: 'Unverified' }, { sort: { title: 1 } }).fetch();
  return {
    opportunities,
    ready,
  };
})(OppVerifyList);
