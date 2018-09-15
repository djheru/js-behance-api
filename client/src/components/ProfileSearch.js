import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import { ApolloConsumer } from 'react-apollo';
import { PROFILES_QUERY } from '../queries';
import ProfileSearchResults from './ProfileSearchResults';

class ProfileSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      queryTerm: '',
      loading: false,
      results: []
    };
  }

  onSubmitHandler = (client) => async (e) => {
    e.preventDefault();
    const { data } = await client.query({
      query: PROFILES_QUERY,
      variables: {
        queryTerm: this.state.queryTerm
      }
    });
    this.resultsFetchedHandler(data.profiles);
  };

  searchChangeHandler = (evt, { value }) => {
    this.setState({ queryTerm: value });
  };

  resultSelectHandler = (history) => (evt, data) => {
    const pathname = `/profile/${data.result.username}`;
    history.push({ pathname });
  };

  resultsFetchedHandler = (results) => this.setState(() => ({ results, open: true }));

  render() {
    const { history } = this.props;
    const { results = [], loading, queryTerm, open } = this.state;
    // Format results for semantic-ui-react Search component - needs key and title
    const formattedResults = results
        .map((result) => ({
          key: result.id,
          title: result.display_name,
          ...result
        }));
    return (
        <ApolloConsumer>
          {
            (client) => (
                <form onSubmit={this.onSubmitHandler(client)}>
                  <Search
                  onSearchChange={this.searchChangeHandler}
                  onResultSelect={this.resultSelectHandler(history)}
                  resultRenderer={ProfileSearchResults}
                  minCharacters={2}
                  loading={loading}
                  results={formattedResults}
                  value={queryTerm}
                  open={open}
                  size="huge" fluid
                  className="search-input"/>
                </form>
            )
          }
        </ApolloConsumer>
    );
  }
}

export default ProfileSearch;
