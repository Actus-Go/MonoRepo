import { useUser } from "../customHooks/UserHook";
import { BeatLoader } from "react-spinners";
import Post from "../components/Post";

export default function Home({ loading, posts, setVisible, setActivePost }) {
    const user = useUser();

    return loading ? (
        <div className="h-dvh w-full flex justify-center">
            <BeatLoader color="#6e56fc" />
        </div>
    ) : (
        <div className="w-full h-full box-border relative bg-gradient-to-b from-gray-900 to-black">
            <div className="w-full h-dvh overflow-y-auto snap-y snap-mandatory">
                {posts.map((post, index) => (
                    <Post key={index} post={post} showComments={() => setActivePost(post)} user={user} />
                ))}
            </div>

            <button
                onClick={setVisible}
                className="group/exit max-md:hidden w-12 p-3 aspect-square rounded-full absolute bottom-8 right-12 bg-white bg-opacity-15 hover:bg-opacity-30"
            >
                <span className="w-[28px] h-[3.5px] rounded-full group-hover/exit:rotate-[180deg] rotate-0 bg-white/80 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                <span className="w-[28px] h-[3.5px] rounded-full group-hover/exit:rotate-[-270deg] rotate-90 bg-white/80 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
            </button>
        </div>
    );
}