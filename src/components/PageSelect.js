import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class PageSelect extends Component {
	state = {
		currentPage: this.props.currentPage,
		totalPages: this.props.totalPages,
		changerPage: this.props.changerPage
	};

	/**
     * Fonction changerPage
     * @description Appelle la fonction changerPage du component de son parent et
     *      change le state de la page courante de ce component
     */
	changerPage = (page) => {
		this.setState({
			currentPage: page
		});
		this.state.changerPage(page);
	};

	afficherBtnPagesPrecedentes = () => {
		let currentPage = this.state.currentPage;
		let arrElements = [];

		for (let intCtr = currentPage; intCtr > currentPage - 6; intCtr--) {
			if (intCtr !== currentPage) {
				if (intCtr > 0) {
					arrElements.unshift(
						<Link className="pageChangeBtn pageChangeBtn--prec" to={'/page/' + intCtr}>
							{intCtr}
						</Link>
					);
				}
			}
		}

		return arrElements;
	};

	afficherBtnPagesSuivantes = () => {
		let currentPage = this.state.currentPage;
		let arrElements = [];

		for (let intCtr = currentPage; intCtr <= currentPage + 5; intCtr++) {
			if (intCtr > currentPage) {
				arrElements.push(
					<Link key={intCtr} className="pageChangeBtn pageChangeBtn--suiv" to={'/page/' + intCtr}>
						{intCtr}
					</Link>
				);
			}
		}
		return arrElements;
	};

	render() {
		const currentPage = this.state.currentPage;
		return (
			<Fragment>
				<Link className="pageChangeBtn pageChangeBtn--suiv" to={'/page/' + (currentPage - 1)}>
					Page précédente
				</Link>
				{this.afficherBtnPagesPrecedentes()}
				<span className="pageChangeBtn--current" onClick={() => this.changerPage(this.state.currentPage)}>
					{this.state.currentPage}
				</span>
				{this.afficherBtnPagesSuivantes()}
				<Link className="pageChangeBtn pageChangeBtn--suiv" to={'/page/' + currentPage + 1}>
					Page suivante
				</Link>
			</Fragment>
		);
	}
}

export default PageSelect;
