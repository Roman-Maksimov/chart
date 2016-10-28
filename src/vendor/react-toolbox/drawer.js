import {React} from 'src/vendor';
import Drawer from 'react-toolbox/lib/drawer';
import theme from './drawer.scss';

export default (props) => (
    <Drawer theme={theme}  {...props} />
);
