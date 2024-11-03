/* eslint-disable react/prop-types */
import PostsGrid from "../components/ExploreMedia";
// import Post from "../components/post";

const Explore = () => {
    const samplePosts = [
        {
            id: 1,
            type: 'image',
            content: '/images/Rectangle 34625194.png',
            caption: 'A beautiful day at the beach.',
            likes: 150,
            comments: 20
        },
        {
            id: 2,
            type: 'video',
            content: 'https://example.com/video1.mp4',
            thumbnail: 'https://example.com/video1-thumbnail.jpg',
            caption: 'Exploring the mountains with friends!',
            likes: 230,
            comments: 45
        },
        {
            id: 3,
            type: 'image',
            content: '/images/Rectangle 34625194.png',
            caption: 'Sunset over the city skyline.',
            likes: 320,
            comments: 60
        },
        {
            id: 4,
            type: 'video',
            content: 'https://example.com/video2.mp4',
            thumbnail: 'https://example.com/video2-thumbnail.jpg',
            caption: 'Quick tutorial on making a perfect cup of coffee.',
            likes: 540,
            comments: 112
        }  ,     {
            id: 5,
            type: 'video',
            content: 'https://example.com/video1.mp4',
            thumbnail: 'https://example.com/video1-thumbnail.jpg',
            caption: 'Exploring the mountains with friends!',
            likes: 230,
            comments: 45
        },
        {
            id: 6,
            type: 'image',
            content: '/images/Rectangle 34625194.png',
            caption: 'Sunset over the city skyline.',
            likes: 320,
            comments: 60
        },
        {
            id: 7,
            type: 'video',
            content: 'https://example.com/video2.mp4',
            thumbnail: 'https://example.com/video2-thumbnail.jpg',
            caption: 'Quick tutorial on making a perfect cup of coffee.',
            likes: 540,
            comments: 112
        } ,      {
            id: 8,
            type: 'video',
            content: 'https://example.com/video1.mp4',
            thumbnail: 'https://example.com/video1-thumbnail.jpg',
            caption: 'Exploring the mountains with friends!',
            likes: 230,
            comments: 45
        },
        {
            id: 9,
            type: 'image',
            content: '/images/Rectangle 34625194.png',
            caption: 'Sunset over the city skyline.',
            likes: 320,
            comments: 60
        },
        {
            id: 10,
            type: 'video',
            content: 'https://example.com/video2.mp4',
            thumbnail: 'https://example.com/video2-thumbnail.jpg',
            caption: 'Quick tutorial on making a perfect cup of coffee.',
            likes: 540,
            comments: 112
        }
    ];

    return (
        <div className="text-white container mx-auto pt-[62px] pl-[65px] ">
            
            {/* <div className="w-full h-screen grid grid-cols-3 gap-3">
                {posts.map((post, index) => (
                    <Post key={index} post={post} user={user} />
                ))}
            </div> */}
            <PostsGrid posts={samplePosts} />
        </div>
    );
}

export default Explore;