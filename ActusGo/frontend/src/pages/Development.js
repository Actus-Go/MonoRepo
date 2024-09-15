import Stories from "../components/story/Stories";

export default function Development() {
    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            <Stories user={{name: "Faisal", avatar: `https://via.placeholder.com/200?text=F`}}/>
        </div>
    )
}
