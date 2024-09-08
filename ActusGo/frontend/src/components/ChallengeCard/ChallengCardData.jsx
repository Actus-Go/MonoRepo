import image1 from './Images/CardImage1.png';
import image2 from './Images/CardImage2.png';
import ChallengeCards from './ChallengeCards';
// Dummy Data
const Data = [
    {
        CardColor: "#EFFF55",
        image: image1,
        text: "Day With Joe Hattab",
        price: "400",
        coins: "49",
        stops: "12",
        level: "Beginner",
        textColor: "#1A1A1A"
    },
    {
        CardColor: "#6E56FC",
        image: image2,
        text: "Shopping Challenge",
        price: "800",
        coins: "47",
        stops: "14",
        level: "Advance",
        textColor: "#FFFFFF"
    },
    {
        CardColor: "#EFFF55",
        image: image1,
        text: "Day With Joe Hattab",
        price: "400",
        coins: "49",
        stops: "12",
        level: "Beginner",
        textColor: "#1A1A1A"
    }
];

function ChallengeCardData() {
    return <ChallengeCards Data={Data} />
}

export default ChallengeCardData;