import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setVisibilityFilter } from '../state/actions';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibility.filter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

const FilterLink = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Link));

export default FilterLink;
