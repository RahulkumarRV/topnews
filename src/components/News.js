import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
	const [articles, setArticles] = useState([]);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);
	// static defaultProps = {
	// 	country: "in",
	// 	pageSize: 8,
	// 	category: "health",
	// };

	// static propTypes = {
	// 	country: PropTypes.string,
	// 	pageSize: PropTypes.number,
	// 	category: PropTypes.string,
	// };

	// constructor() {
	// 	super();
	// 	this.state = {
	// 		articles: [],
	// 		loading: false,
	// 		page: 1,
	// 		totalResults: 0,
	// 	};
	// }
	const updateNews = async () => {
		props.setProgress(10);
		const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
		props.setProgress(30);
		let data = await fetch(url);
		props.setProgress(50);
		let parsedData = await data.json();
		props.setProgress(70);
		setArticles(parsedData.articles);
		setTotalResults(parsedData.totalResults);
		props.setProgress(100);
	};

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	useEffect(() => {
		document.title = `${capitalizeFirstLetter(props.category)} - TopNews`;
		updateNews();
		// eslint-disable-next-line
	}, []);

	const fetchMoreData = async () => {
		//props.setProgress(10);
		const url = `https://newsapi.org/v2/top-headlines?country=${
			props.country
		}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${
			props.pageSize
		}&category=${props.category}`;
		setPage(page + 1);
		//props.setProgress(30);
		let data = await fetch(url);
		//props.setProgress(50);
		let parsedData = await data.json();
		//props.setProgress(70);
		setArticles(articles.concat(parsedData.articles));
		setTotalResults(parsedData.totalResults);
		//props.setProgress(100);
	};

	return (
		<>
			<div className='container w-75'>
				<h1 style={{ marginTop: "80px" }}>
					Top {capitalizeFirstLetter(props.category)} HeadLines
				</h1>
			</div>
			<InfiniteScroll
				dataLength={articles.length}
				next={fetchMoreData}
				hasMore={articles.length !== totalResults}
				loader={<Loading />}>
				<div className='container w-75'>
					<div className='row'>
						{articles.map((element) => {
							return (
								<div className='col-md-4' key={element.url}>
									<NewsItem
										title={element.title ? element.title : ""}
										description={element.description ? element.description : ""}
										imageUrl={element.urlToImage}
										newsUrl={element.url}
										author={element.author}
										date={element.publishedAt}
										source={element.source.name}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</InfiniteScroll>
		</>
	);
};

export default News;
