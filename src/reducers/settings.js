const def = {
    symbols: {}
};

export const settings = function(state = def, action) {
    switch(action.type){
        case "SETTINGS_SYMBOL_FIELD":
            const symbols = Object.assign({}, state.symbols);
            symbols[action.symbol] = Object.assign({}, symbols[action.symbol], {
                [action.field]: action.value
            });
            return Object.assign({}, state, {symbols});
    }
    return state;
};