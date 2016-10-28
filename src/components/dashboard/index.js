import {React, CComponent} from 'src/vendor';
import actions from 'src/actions';
import Chart from 'src/components/chart';


export default class extends CComponent {
    componentWillMount() {
        actions.symbols.get();
    }

    render() {
        return (
            <div>
                <Chart
                    symbol="US67021BAE92"
                />
            </div>
        );
    }
}