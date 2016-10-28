import {React, CComponent, ReStock, connect, moment, libD3, ReactToolbox} from 'src/vendor';
import actions from 'src/actions';
import store from 'src/store';

const {Tab, Tabs, Dropdown} = ReactToolbox;

const {d3, format, timeFormat} = libD3;

const { ChartCanvas, Chart, EventCapture } = ReStock;

const { LineSeries, ScatterSeries, CircleMarker, AreaSeries } = ReStock.series;
const { discontinuousTimeScaleProvider } = ReStock.scale;

const { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } = ReStock.coordinates;
const { TooltipContainer, OHLCTooltip } = ReStock.tooltip;

const { XAxis, YAxis } = ReStock.axes;


@connect((state, props) => {return {
    state: state.symbols[props.symbol] ? state.symbols[props.symbol] : {},
    frame: state.settings.symbols[props.symbol] && state.settings.symbols[props.symbol].frame || "month",
    type: state.settings.symbols[props.symbol] && state.settings.symbols[props.symbol].type || "price",
}})
class CChart extends CComponent {
    frames = [
        {
            value: "week",
            label: "Week"
        },
        {
            value: "month",
            label: "Month"
        },
        {
            value: "quarter",
            label: "Quarter"
        },
        {
            value: "year",
            label: "Year"
        },
        {
            value: "max",
            label: "Max"
        }
    ];

    types = [
        {
            value: 'yield',
            label: 'Yield',
            icon: 'show_chart'
        },
        {
            value: 'spread',
            label: 'Spread',
            icon: 'swap_vert'
        },
        {
            value: 'price',
            label: 'Price',
            icon: 'attach_money'
        },
    ];

    yExtention = {
        yield: [.1, .1],
        spread: [.1, -1],
        price: [.01, .01]
    };

    constructor(props, context) {
        super(props, context);

        const {symbol} = props;

        this.pendingActions.push(
            actions.symbols.get(symbol)
        );
    }

    /**
     * Setting chart frame
     *
     * @param value - one of the available frame names
     */
    setFrame = (value) => {
        const {symbol} = this.props;

        store.dispatch({
            type: "SETTINGS_SYMBOL_FIELD",
            field: 'frame',
            symbol,
            value
        });
    };

    /**
     * Setting chart type
     *
     * @param value - one of the available chart types
     */
    setType = (value) => {
        const {symbol} = this.props;

        store.dispatch({
            type: "SETTINGS_SYMBOL_FIELD",
            field: 'type',
            symbol,
            value
        });
    };

    typeTemplate = (item) => {
        return ( <div className="chart__types-item"><i className="material-icons">{item.icon}</i> {item.label}</div> );
    };

    render() {
        const {symbol, state, frame, type} = this.props;

        // determine tab index
        let tab = 0;
        for(let i in this.frames){
            if (this.frames[i].value === frame) {
                tab = +i;
                break;
            }
        }

        // define frame period
        const period = [
            frame === 'max'
                ? (state && state.data && state.data.length > 0 ? moment(state.data[0].date).toDate() : moment().subtract(1, 'month').toDate())
                : moment().subtract(1, frame).toDate(),
            moment().toDate()];

        const height = 400;
        const width = 800;

        const margin = {left: 70, right: 70, top:20, bottom: 30};

        const gridHeight = height - margin.top - margin.bottom;
        const gridWidth = width - margin.left - margin.right;

        const showGrid = true;
        const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
        const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

        return (
            <div className="chart">
                <div className="chart__title">
                    {state.name}&nbsp;
                    {state.coupon}&nbsp;
                    {state.data && state.data.length > 0 && (
                        <span>{state.data[state.data.length - 1].close} <span className="chart__title-currency">{state.currency}</span></span>
                    )}
                </div>
                <div className="chart__isin">
                    {symbol}
                </div>
                <div className="chart__description">
                    { [state.name, state.industry, state.market, moment(state.till).format('DD.MM.YYYY')].join(', ') }
                </div>

                <Tabs index={tab} className="chart__tabs" onChange={this.changeTab}>
                    { this.frames.map((item, i) => (
                        <Tab
                            key={i}
                            label={item.label}
                            onClick={this.setFrame.bind(this, item.value)} />
                    )) }
                </Tabs>

                {state && state.data && state.data.length > 0
                    ? (
                        <ChartCanvas width={width} height={height}
                                     margin={margin} type="hybrid"
                                     seriesName={symbol}
                                     data={state.data}
                                     xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
                                     xExtents={period}>
                            <Chart id={1} yExtents={[d => [
                                    d[type] + d[type] * this.yExtention[type][0],
                                    d[type] - d[type] * this.yExtention[type][1]
                                ]]} >
                                <XAxis axisAt="bottom" orient="bottom" {...xGrid} />
                                <YAxis axisAt="right" orient="right" ticks={5} {...yGrid} />

                                <MouseCoordinateX
                                    id={1}
                                    at="bottom"
                                    orient="bottom"
                                    displayFormat={timeFormat.timeFormat("%Y-%m-%d")} />
                                <MouseCoordinateY
                                    id={1}
                                    at="right"
                                    orient="right"
                                    displayFormat={format.format(".2f")} />

                                { type === 'spread'
                                    ? <AreaSeries yAccessor={d => d[type]} />
                                    : <LineSeries yAccessor={d => d[type]} />
                                }
                                <ScatterSeries yAccessor={d => d[type]} marker={CircleMarker} markerProps={{ r: 3 }} />
                            </Chart>
                            <CrossHairCursor />
                            <EventCapture mouseMove={true} zoom={true} pan={true} />
                            <TooltipContainer>
                                <OHLCTooltip forChart={1} origin={[-40, -10]}/>
                            </TooltipContainer>
                        </ChartCanvas>
                    ) : (
                        <div style={{minWidth: 600, minHeight: 300, lineHeight: '300px', textAlign: 'center'}}>loading...</div>
                )}

                <Dropdown
                    className="chart__types"
                    auto={true}
                    allowBlank={false}
                    source={this.types}
                    value={type}
                    onChange={this.setType}
                    template={this.typeTemplate}
                />
            </div>
        );
    }
}

CChart.propTypes = {
    symbol: React.PropTypes.string.isRequired,
    data: React.PropTypes.array,
    width: React.PropTypes.number
};

//CChart = fitWidth(CChart);

export default CChart;