import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { updateBookmarkMethod } from '../../api/opportunity/OpportunitiesCollection.methods';
import { volunteerBookmarkDefineMethod } from '../../api/bookmarks/VolunteerBookmarkCollection.methods';

/** Renders an add Bookmark Button */
const BookmarkButton = ({ opportunity, username }) => {
  const bookmarkHandle = () => {
    const bookmarkOwner = username;
    const opportunityOwner = opportunity.owner;
    const opportunityID = opportunity._id;
    const updateData = opportunity;
    updateData.bookmarks = opportunity.bookmarks + 1;
    updateBookmarkMethod.call(updateData, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Data edited successfully', 'success')));
    volunteerBookmarkDefineMethod.call({
      bookmarkOwner, opportunityOwner, opportunityID },
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Opportunity Bookmarked Successfully', 'success');
      }
    });
  };
  return (
  /**
    (check ?
      <Button color='blue' onClick={bookmarkHandle} disabled>
        <Icon name='heart'/> Bookmark
      </Button> :
      <Button color='blue' onClick={bookmarkHandle}>
        <Icon name='heart'/> Bookmark
      </Button>
    )* */
    <Button color='blue' onClick={bookmarkHandle}>
      <Icon name='heart'/> Bookmark
    </Button>
  );
};

/** Require a document to be passed to this component. */
BookmarkButton.propTypes = {
  opportunity: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  // check: PropTypes.bool.isRequired,
};

/** export BookmarkButton */
export default BookmarkButton;
