import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class PageSelect extends Component {
	state = {
		currentPage: this.props.currentPage,
		totalPages: this.props.totalPages
	};

	/**
     * Fonction changerPage
     * @description Appelle la fonction changerPage du component de son parent et
     *      change le state de la page courante de ce component
     */
	changerPage = (page) => {
		let updatePage = this.props.updatePage;
		this.setState(
			{
				currentPage: page
			},
			() => {
				updatePage(this.state.currentPage);
			}
		);
	};

	afficherBtnPagesPrecedentes = () => {
		let currentPage = this.state.currentPage;
		let arrElements = [];

		for (let intCtr = currentPage; intCtr > currentPage - 6; intCtr--) {
			if (intCtr !== currentPage) {
				if (intCtr > 0) {
					arrElements.unshift(
						<Link
							key={intCtr}
							className="pageChangeBtn pageChangeBtn--prec"
							onClick={() => this.changerPage(intCtr)}
							to={'/movielist/page/' + intCtr}
						>
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

		for (let intCtr = currentPage + 1; intCtr < currentPage + 6; intCtr++) {
			arrElements.push(
				<Link
					key={intCtr}
					className="pageChangeBtn pageChangeBtn--suiv"
					onClick={() => this.changerPage(intCtr)}
					to={'/movielist/page/' + intCtr}
				>
					{intCtr}
				</Link>
			);
		}
		return arrElements;
	};

	afficherBtnPrecedent = () => {
		const currentPage = this.state.currentPage;
		if (currentPage > 1) {
			return (
				<Link
					className="pageChangeBtn pageChangeBtn--suiv"
					onClick={() => this.changerPage(currentPage - 1)}
					to={'/movielist/page/' + (currentPage - 1)}
				>
					Page précédente
				</Link>
			);
		} else return null;
	};

	afficherBtnSuivant = () => {
		const { currentPage, totalPages } = this.state;
		let newPage = currentPage;
		newPage++;
		if (currentPage < totalPages) {
			return (
				<Link
					className="pageChangeBtn pageChangeBtn--suiv"
					onClick={() => this.changerPage(newPage)}
					to={'/movielist/page/' + newPage}
				>
					Page suivante
				</Link>
			);
		} else return null;
	};

	render() {
		const currentPage = this.state.currentPage;
		return (
			<Fragment>
				{this.afficherBtnPrecedent()}

				{this.afficherBtnPagesPrecedentes()}
				<span className="pageChangeBtn--current">{currentPage}</span>
				{this.afficherBtnPagesSuivantes()}
				{this.afficherBtnSuivant()}
			</Fragment>
		);
	}
}

export default PageSelect;
