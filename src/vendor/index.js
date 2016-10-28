export const React = require('react');
export const ReactDOM = require('react-dom');
export const ReactDOMServer = require('react-dom/server');
export const ReactRouter = require('react-router');
export const ReactRouterRedux = require('react-router-redux');
export const {Locations, Location, NotFound} = require('react-router-component');

export const Redux = require('redux');
export const {Provider, connect} = require('react-redux');

export const ReactToolbox = require('./react-toolbox');

export const cx = require('classnames/bind');

export const cloneDeep = require('lodash.clonedeep');
export const debounce = require('lodash.debounce');

export const {mixins} = require('core-decorators');
export const LinkedStateMixin = require('react-addons-linked-state-mixin');

export const ReStock = require("react-stockcharts").default;

export const Promise = require('bluebird');
export const request = Promise.promisifyAll(require('superagent-cache')());

export const moment = require('moment');

export const libD3 = {
    d3: require('d3'),
    format: require('d3-format'),
    timeFormat: require('d3-time-format')
};

export const CComponent = require('src/components').default;
