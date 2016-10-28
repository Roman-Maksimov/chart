import {React} from 'src/vendor';
import Header from './header';
import Footer from './footer';
import style from 'src/styles/main';


export default class extends React.Component {
	render() {
		const {children} = this.props;

		return (
			<div className="content">
				<Header />
				<div role="main" className="content">
					{children}
				</div>
				<Footer />
			</div>
		);
	}
};
