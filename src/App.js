import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export class App extends Component {
	state = {
		progress: 0,
	};

	setProgress = (progress) => {
		this.setState({
			progress: progress,
		});
	};
	render() {
		var PageSize = 9;
		const apikey = process.env.REACT_APP_API_KEY;

		return (
			<div>
				<Router exactr>
					<LoadingBar
						color='#f11946'
						progress={this.state.progress}
						height={3}
						onLoaderFinished={() => this.setProgress(0)}
					/>
					<Navbar />

					<Routes>
						<Route
							exact
							path='/'
							element={
								<News
									apikey={apikey}
									setProgress={this.setProgress}
									key='general'
									country='in'
									pageSize={PageSize}
									category='general'
								/>
							}
						/>
						<Route
							exact
							path='/business'
							element={
								<News
									apikey={apikey}
									setProgress={this.setProgress}
									key='business'
									country='in'
									pageSize={PageSize}
									category='business'
								/>
							}
						/>
						<Route
							exact
							path='/entertainment'
							element={
								<News
									apikey={apikey}
									setProgress={this.setProgress}
									key='entertainment'
									country='in'
									pageSize={PageSize}
									category='entertainment'
								/>
							}
						/>
						<Route
							exact
							path='/health'
							element={
								<News
									apikey={apikey}
									setProgress={this.setProgress}
									key='health'
									country='in'
									pageSize={PageSize}
									category='health'
								/>
							}
						/>
						<Route
							exact
							path='/science'
							element={
								<News
									apikey={apikey}
									setProgress={this.setProgress}
									key='science'
									country='in'
									pageSize={PageSize}
									category='science'
								/>
							}
						/>
						<Route
							exact
							path='/sports'
							element={
								<News
									apikey={apikey}
									setProgress={this.setProgress}
									key='sports'
									country='in'
									pageSize={PageSize}
									category='sports'
								/>
							}
						/>
						<Route
							exact
							path='/technology'
							element={
								<News
									apikey={apikey}
									setProgress={this.setProgress}
									key='technology'
									country='in'
									pageSize={PageSize}
									category='technology'
								/>
							}
						/>
					</Routes>
				</Router>
			</div>
		);
	}
}

export default App;
