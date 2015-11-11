/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = require('react/addons');
var HelpWrapper = require('../HelpWrapper');
var expect = require('expect');

describe('Test for HelpWrapper', () => {
    afterEach((done) => {
        React.unmountComponentAtNode(document.body);
        document.body.innerHTML = '';
        setTimeout(done);
    });

    // test DEFAULTS
    it('wraps child component properly', () => {
        const helpWrapper = React.render(<HelpWrapper><div id="child-div" key="child-key"></div></HelpWrapper>, document.body);
        expect(helpWrapper).toExist();

        const helpWrapperDom = React.findDOMNode(helpWrapper);
        expect(helpWrapperDom).toExist();

        // creates a help badge
        const badge = helpWrapperDom.getElementsByTagName('span').item(0);
        expect(badge).toExist();
        expect(badge.id).toExist();
        expect(badge.id).toBe("helpbadge-child-key");
        expect(badge.className.indexOf('badge') >= 0).toBe(true);
        expect(badge.className.indexOf('hidden') >= 0).toBe(true);
        expect(badge.innerHTML).toBe("?");

        // the wrapped child from outside
        const child = helpWrapperDom.getElementsByTagName('div').item(0);
        expect(child).toExist();
        expect(child.id).toExist();
        expect(child.id).toBe("child-div");
    });

});
