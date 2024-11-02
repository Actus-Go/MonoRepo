import "./style.css";
import Sparkels from "./Sparkels";
export default function CreatePost({ user, setVisible, profile }) {
    const styles = {
        createPostContainer: {
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "16px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            margin: "4px",
        },
        profilePicture: {
            width: "40px",
            height: "40px",
            overflow: "hidden",
            borderRadius: "50%",
            marginRight: "12px",
        },
        profilePictureImg: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
        postInput: {
            cursor: "pointer",
        },
    };
    const premium = true;

    return (
        <div className="py-6 w-full max-w-2xl">
            <div className="flex relative">
                <h1 className="text-left text-2xl font-bold text-gray-200 ml-4">
                    Create Post
                </h1>
                <div className="absolute left-36 -top-2">
                    <Sparkels />
                </div>
            </div>

            {/* CreatePost Container */}
            <div
                style={styles.createPostContainer}
                className="my-4"
                onClick={() => setVisible(true)}
            >
                <div style={styles.profilePicture}>
                    <img
                        style={styles.profilePictureImg}
                        src={user?.picture}
                        alt={`${user?.first_name}'s profile`}
                    />
                </div>
                <p>What's on your mind, {user?.first_name}?</p>
            </div>

            {/* Additional content for the body of the post */}
            <div style={styles.createPostBody}>
                {/* Additional content for the body of the post */}
            </div>
        </div>
    );
}
