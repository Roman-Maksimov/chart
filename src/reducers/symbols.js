import {moment} from 'src/vendor';
import {objectMap} from 'src/utils';

const def = {
};

export const symbols = function(state = def, action) {
    switch(action.type){
        case "SYMBOLS_SET":
            const data = objectMap(action.data, symbol => {
                symbol.data = symbol.data.map((row, i) => {
                    row.date = moment(row.date).toDate();

                    row.yield = row.close - (i === 0 ? 0 : symbol.data[i - 1].close);
                    row.spread = Math.abs(row.open - row.close);
                    row.price = row.close;
                    return row;
                });
                return symbol;
            });

            return Object.assign({}, state, data);
    }
    return state;
};