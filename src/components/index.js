import {React} from 'src/vendor';


export default class extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.pendingActions = [];
    }

    componentWillUnmount() {
        this.cancelPendingActions();
    }

    cancelPendingActions = () => {
        this.pendingActions.forEach((action) => {
            action.isPending() && action.cancel();
        });
    };
}