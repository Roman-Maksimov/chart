import {React, CComponent, connect} from 'src/vendor';
import Auth from 'src/components/auth';
import actions from 'src/actions';

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            const {isAuthenticated} = this.props;
            if (!isAuthenticated) {
                actions.user.checkAuth();
            }
        }

        render() {
            const {location, isAuthenticated} = this.props;
            const {pathname} = location;

            return isAuthenticated === true
                ? <Component {...this.props} />
                : <Auth backUrl={pathname} />;
        }
    }

    const mapStateToProps = (state) => ({
        isAuthenticated: state.user.user && !!state.user.user.id
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
}