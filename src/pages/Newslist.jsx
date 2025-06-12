import { Link } from 'react-router-dom';
import { newsData } from '../components/news';

const NewsList = () => {
    return (
        <div className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-8">Tin tức</h1>
            <div className="flex justify-center gap-4 flex-wrap">
                {newsData.map(news => (
                    <Link to={`/tin-tuc/${news.id}`} key={news.id} className="w-[300px] shadow-md p-4 rounded-lg bg-white hover:shadow-xl">
                        <img src={news.image} alt={news.title} className="w-full h-40 object-cover rounded-md" />
                        <h2 className="font-bold text-lg mt-2">{news.title}</h2>
                        <p className="text-sm text-gray-600">{news.summary}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewsList;
