import ReactOnRails from 'react-on-rails';

import StaticPostForm from './StaticPostFormRegistration';
import ExploreGrid from './ExploreGridRegistration';
import CityFilter from './CityFilterRegistration';
import StaticDesireForm from './StaticDesireFormRegistration';
import SocialInfo from './SocialInfoRegistration';
import SinglePost from './SinglePostRegistration';


ReactOnRails.register({
  StaticDesireForm,
  StaticPostForm,
  ExploreGrid,
  CityFilter,
  SocialInfo,
  SinglePost
});
