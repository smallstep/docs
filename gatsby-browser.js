exports.shouldUpdateScroll = ({ prevRouterProps, routerProps }) =>
  // only scroll if the pathname changes (not query string)
  !prevRouterProps ||
  prevRouterProps.location.pathname !== routerProps.location.pathname;
