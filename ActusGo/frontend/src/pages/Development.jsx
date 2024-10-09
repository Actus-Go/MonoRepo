import ProductsSlider from "../components/ProductsSlider";

export default function Development() {
    const productsSliderProps = {
        products: [
            {
                rating: 8,
                ratingCount: 572,
                title: "Product 1",
                salary: "$150",
                label: { text: "Best Seller", bgcolor: "#ffd700", textcolor: "#000" },
                buy: () => { console.log('buy 1') },
                love: () => { console.log('love 1') },
                see: () => { console.log('see 1') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 5,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                label: { text: "Limited Offer" },
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 7,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 5.2,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 8,
                ratingCount: 572,
                title: "Product 1",
                salary: "$150",
                label: { text: "Best Seller", bgcolor: "#ffd700", textcolor: "#000" },
                buy: () => { console.log('buy 1') },
                love: () => { console.log('love 1') },
                see: () => { console.log('see 1') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 5,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                label: { text: "Limited Offer" },
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 7,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 5.2,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 8,
                ratingCount: 572,
                title: "Product 1",
                salary: "$150",
                label: { text: "Best Seller", bgcolor: "#ffd700", textcolor: "#000" },
                buy: () => { console.log('buy 1') },
                love: () => { console.log('love 1') },
                see: () => { console.log('see 1') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 5,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                label: { text: "Limited Offer" },
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 7,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 5.2,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 8,
                ratingCount: 572,
                title: "Product 1",
                salary: "$150",
                label: { text: "Best Seller", bgcolor: "#ffd700", textcolor: "#000" },
                buy: () => { console.log('buy 1') },
                love: () => { console.log('love 1') },
                see: () => { console.log('see 1') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 5,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                label: { text: "Limited Offer" },
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 7,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 5.2,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 8,
                ratingCount: 572,
                title: "Product 1",
                salary: "$150",
                label: { text: "Best Seller", bgcolor: "#ffd700", textcolor: "#000" },
                buy: () => { console.log('buy 1') },
                love: () => { console.log('love 1') },
                see: () => { console.log('see 1') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 5,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                label: { text: "Limited Offer" },
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 7,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            },
            {
                rating: 5.2,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<img src="https://th.bing.com/th/id/R.e0fec2dba70529161e815eced0d453e1?rik=5Y0iCMZKR%2fbr7Q&pid=ImgRaw&r=0" className="min-w-full min-h-full object-cover" alt="product"/>)
            }
        ]
    }

    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            <ProductsSlider {...productsSliderProps} />
        </div>
    )
}
