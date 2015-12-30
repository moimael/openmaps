jest.dontMock('../js/components/ActionMenu');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const ActionMenu = require('../js/components/ActionMenu');


describe('ActionMenu', () => {
  it('verify title', () => {

    // Render a checkbox with label in the document
    let actionMenu = TestUtils.renderIntoDocument(
      <ActionMenu title="Layers" />
    );

    let actionMenuNode = ReactDOM.findDOMNode(actionMenu);
    let header = TestUtils.findRenderedDOMComponentWithTag(actionMenu, 'header');

    expect(header.textContent).toEqual('Layers');

    // Verify that it's Off by default
    // expect(actionMenuNode.textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    // TestUtils.Simulate.change(
    //   TestUtils.findRenderedDOMComponentWithTag(actionMenu, 'input')
    // );
    // expect(actionMenuNode.textContent).toEqual('On');
  });
});
