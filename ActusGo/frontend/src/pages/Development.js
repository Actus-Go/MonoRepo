import ChallengeCardSlider from "../components/ChallengeCard/ChallengeCardSlider";
import challengeData from "../components/ChallengeCard/ChallengCardData";

export default function Development() {
    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            <ChallengeCardSlider challenges={challengeData()} />
        </div>
    )
}
