import { useEffect, useState } from "react";
import PostsGrid from "../components/ExploreMedia";
import { useUser } from "../customHooks/UserHook";
import axios from "axios";

export default function Explore() {
    const user = useUser();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users/posts?limit=200', { headers: { Authorization: `Bearer ${user.token}` } });
                console.log('First fetched post:', response?.data?.posts[0]);
                setPosts(response?.data?.posts);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="text-white container mx-auto pt-[62px] pl-[65px] ">
            <PostsGrid posts={posts} user={user} />
        </div>
    );
}