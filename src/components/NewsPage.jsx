import React from "react";
import { Link } from "react-router-dom";
import newsList from "./news";
// giả sử bạn có danh sách bài viết ở đây
import "./NewsPage.css"; // để styling dễ hơn

const NewsPage = () => {
    return (
        <div className="news-page">
            <h1 className="news-title">Tin tức</h1>
            <div className="news-grid">
                {newsList.map((news) => (
                    <Link key={news.id} to={`/news/${news.id}`} className="news-card">
                        <img src={news.image} alt={news.title} className="news-image" />
                        <h3 className="news-heading">{news.title}</h3>
                        <p className="news-summary">{news.summary}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
