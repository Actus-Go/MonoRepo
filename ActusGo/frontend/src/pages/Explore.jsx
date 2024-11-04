/* eslint-disable react/prop-types */
import PostsGrid from "../components/ExploreMedia";
import { useUser } from "../customHooks/UserHook";
// import Post from "../components/post";

const Explore = ({ posts, loading }) => {
    const user = useUser();
    const samplePosts = [
 
        {
            id: 1,
            type: 'image',
            content: ['/low-poly-grid-haikei.png'],
            caption: 'A beautiful day at the beach.',
            likes: 150,
            comments: [
                {
                    commentBy: {
                        username: 'hahgdh',
                        first_name: 'sfsg',
                        last_name: 'Dogdgdge',
                        picture: '/low-poly-grid-haikei.png'
                    },
                    comment: 'This looks amazing!',
                    commentAt: '2024-10-30T14:30:00Z'
                },{
                    commentBy: {
                        username: 'while',
                        first_name: 'John',
                        last_name: 'Doe',
                        picture: '/low-poly-grid-haikei.png'
                    },
                    comment: 'This looks amazing!',
                    commentAt: '2024-10-30T14:30:00Z'
                },{
                    commentBy: {
                        username: 'for',
                        first_name: 'John',
                        last_name: 'Doe',
                        picture: '/low-poly-grid-haikei.png'
                    },
                    comment: 'This looks amazing!',
                    commentAt: '2024-10-30T14:30:00Z'
                },
            ]
        },

        {
            id: 2,
            type: 'image',
            content: ['/low-poly-grid-haikei.png'],
            caption: 'A beautiful day at the beach.',
            likes: 150,
            comments: [
                {
                    commentBy: {
                        username: 'JohnDoe',
                        first_name: 'John',
                        last_name: 'Doe',
                        picture: '/low-poly-grid-haikei.png'
                    },
                    comment: 'This looks amazing!',
                    commentAt: '2024-10-30T14:30:00Z'
                },
            ]
        },
        {
            id: 3,
            type: 'image',
            content: ['/low-poly-grid-haikei.png'],
            caption: 'A beautiful day at the beach.',
            likes: 150,
            comments: [
                {
                    commentBy: {
                        username: 'JohnDoe',
                        first_name: 'John',
                        last_name: 'Doe',
                        picture: '/low-poly-grid-haikei.png'
                    },
                    comment: 'This looks amazing!',
                    commentAt: '2024-10-30T14:30:00Z'
                },
            ]
        },
        {
            id: 4,
            type: 'image',
            content: ['/low-poly-grid-haikei.png'],
            caption: 'A beautiful day at the beach.',
            likes: 150,
            comments: [
                {
                    commentBy: {
                        username: 'JohnDoe',
                        first_name: 'John',
                        last_name: 'Doe',
                        picture: '/low-poly-grid-haikei.png'
                    },
                    comment: 'This looks amazing!',
                    commentAt: '2024-10-30T14:30:00Z'
                },
            ]
        },        {
            id: 5,
            type: 'image',
            content: ['/low-poly-grid-haikei.png'],
            caption: 'A beautiful day at the beach.',
            likes: 150,
            comments: [
                {
                    commentBy: {
                        username: 'JohnDoe',
                        first_name: 'John',
                        last_name: 'Doe',
                        picture: '/low-poly-grid-haikei.png'
                    },
                    comment: 'This looks amazing!',
                    commentAt: '2024-10-30T14:30:00Z'
                },
            ]
        },        {
            id: 6,
            type: 'image',
            content: ['/low-poly-grid-haikei.png'],
            caption: 'A beautiful day at the beach.',
            likes: 150,
            comments: [
                {
                    commentBy: {
                        username: 'JohnDoe',
                        first_name: 'John',
                        last_name: 'Doe',
                        picture: '/low-poly-grid-haikei.png'
                    },
                    comment: 'This looks amazing!',
                    commentAt: '2024-10-30T14:30:00Z'
                },
            ]
        },        {
            id: 7,
            type: 'image',
            content: ['/low-poly-grid-haikei.png'],
            caption: 'A beautiful day at the beach.',
            likes: 150,
            comments: [
                {
                    commentBy: {
                        username: 'JohnDoe',
                        first_name: 'John',
                        last_name: 'Doe',
                        picture: '/low-poly-grid-haikei.png'
                    },
                    comment: 'This looks amazing!',
                    commentAt: '2024-10-30T14:30:00Z'
                },
            ]
        },
    ];


    return (
        <div className="text-white container mx-auto pt-[62px] pl-[65px] ">

            {/* <div className="w-full h-screen grid grid-cols-3 gap-3">
                {posts.map((post, index) => (
                    <Post key={index} post={post} user={user} />
                ))}
            </div> */}
            <PostsGrid posts={samplePosts} user={user} />
        </div>
    );
}

export default Explore;