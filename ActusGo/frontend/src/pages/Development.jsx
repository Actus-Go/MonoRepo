import OffersSlider from "../components/OffersSlider";

export default function Development() {
    const offersSliderProps = {
        offers: [
            {
                title: "Offer 1",
                content: [<div />],
                buy: () => { console.log('buy 1') },
                details: () => { console.log('details 1') }
            },
            {
                title: "Offer 2",
                content: [<div />, <div />],
                buy: () => { console.log('buy 2') },
                details: () => { console.log('details 2') }
            },
            {
                title: "Offer 3",
                content: [<div />, <div />, <div />],
                buy: () => { console.log('buy 3') },
                details: () => { console.log('details 3') }
            },
            {
                title: "Offer 4",
                content: [<div />, <div />, <div />, <div />],
                buy: () => { console.log('buy 4') },
                details: () => { console.log('details 4') }
            }
        ]
    }

    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            <OffersSlider {...offersSliderProps} />
        </div>
    )
}
