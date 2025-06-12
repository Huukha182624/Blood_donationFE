import { useParams } from 'react-router-dom';
import { newsData } from '../components/news.js';


const NewsDetail = () => {
    const { id } = useParams();
    const news = newsData.find(item => item.id === id);

    if (!news) return <div className="p-8 text-center">Không tìm thấy bài viết.</div>;

    return (
        <div className="bg-[#f3f6fb] py-10">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1c5fa8] mb-6">
                    {news.title}
                </h1>

                {news.video && (
                    <div className="flex justify-center mb-6">
                        <iframe
                            width="100%"
                            height="400"
                            src={news.video}
                            title="YouTube video"
                            className="rounded-lg"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                <div
                    className="text-base leading-relaxed space-y-4 text-justify"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                ></div>
            </div>
        </div>
    );
};

export default NewsDetail;
