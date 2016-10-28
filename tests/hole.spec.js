import ReactTestUtils from 'react-addons-test-utils';
import {React} from 'src/vendor';
import routes from 'src/routes';

describe('Hole application', () => {
    const tree = ReactTestUtils.renderIntoDocument(
        routes
    );

    it('Should be rendered', () => {
        assert(ReactTestUtils.isDOMComponent(
            ReactTestUtils.findRenderedDOMComponentWithClass(tree, "chart")
        ), 'DOM exists');
    });
});