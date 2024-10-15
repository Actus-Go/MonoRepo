import Slider from '../../components/Slider';
import Categories from '../../components/CategorySlider';
import Offers from '../../components/OffersSlider';

export default function index() {
    let sliderProps = {
        slides: [
            <div className='w-full h-full overflow-hidden'>
                <img src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' className='min-h-full min-w-full object-cover' alt='' />
            </div>,
            <div className='w-full h-full overflow-hidden'>
                <img src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' className='min-h-full min-w-full object-cover' alt='' />
            </div>,
            <div className='w-full h-full overflow-hidden'>
                <img src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' className='min-h-full min-w-full object-cover' alt='' />
            </div>,
            <div className='w-full h-full overflow-hidden'>
                <img src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' className='min-h-full min-w-full object-cover' alt='' />
            </div>,
        ]
    };

    let categoriesProps = {
        categories: [
            {
                image: <img className='max-w-full max-h-full object-contain' src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' alt=''/>,
                url: '#',
                name: 'test'
            },
            {
                image: <img className='max-w-full max-h-full object-contain' src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' alt=''/>,
                url: '#',
                name: 'test'
            },
            {
                image: <img className='max-w-full max-h-full object-contain' src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' alt=''/>,
                url: '#',
                name: 'test'
            },
            {
                image: <img className='max-w-full max-h-full object-contain' src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' alt=''/>,
                url: '#',
                name: 'test'
            },
            {
                image: <img className='max-w-full max-h-full object-contain' src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' alt=''/>,
                url: '#',
                name: 'test'
            },
            {
                image: <img className='max-w-full max-h-full object-contain' src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' alt=''/>,
                url: '#',
                name: 'test'
            },
            {
                image: <img className='max-w-full max-h-full object-contain' src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' alt=''/>,
                url: '#',
                name: 'test'
            },
        ]
    };

    let offersProps = {
        offers: [
            {
                title: "test",
                content: [<div className='w-full group transition-all rounded-xl overflow-hidden'><img src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' className='min-h-full min-w-full object-cover group-hover:scale-105 transition-all' alt='' /></div>],
                buy: () => console.log("buy"),
                details: () => console.log("detials")
            },
            {
                title: "test",
                content: [<div className='w-full group transition-all rounded-xl overflow-hidden'><img src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' className='min-h-full min-w-full object-cover group-hover:scale-105 transition-all' alt='' /></div>],
                buy: () => console.log("buy"),
                details: () => console.log("detials")
            },
            {
                title: "test",
                content: [<div className='w-full group transition-all rounded-xl overflow-hidden'><img src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' className='min-h-full min-w-full object-cover group-hover:scale-105 transition-all' alt='' /></div>],
                buy: () => console.log("buy"),
                details: () => console.log("detials")
            },
            {
                title: "test",
                content: [<div className='w-full group transition-all rounded-xl overflow-hidden'><img src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' className='min-h-full min-w-full object-cover group-hover:scale-105 transition-all' alt='' /></div>],
                buy: () => console.log("buy"),
                details: () => console.log("detials")
            },
            {
                title: "test",
                content: [<div className='w-full group transition-all rounded-xl overflow-hidden'><img src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' className='min-h-full min-w-full object-cover group-hover:scale-105 transition-all' alt='' /></div>],
                buy: () => console.log("buy"),
                details: () => console.log("detials")
            },
            {
                title: "test",
                content: [<div className='w-full group transition-all rounded-xl overflow-hidden'><img src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' className='min-h-full min-w-full object-cover group-hover:scale-105 transition-all' alt='' /></div>],
                buy: () => console.log("buy"),
                details: () => console.log("detials")
            },
            {
                title: "test",
                content: [<div className='w-full group transition-all rounded-xl overflow-hidden'><img src='https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg' className='min-h-full min-w-full object-cover group-hover:scale-105 transition-all' alt='' /></div>],
                buy: () => console.log("buy"),
                details: () => console.log("detials")
            },
        ]
    };

    return (
        <div className='min-h-screen w-[calc(100%-86px)] ml-auto gap-24 flex flex-col p-12 pt-20 bg-black'>
            <div className='w-full rounded-3xl overflow-hidden'>
                <Slider {...sliderProps} />
            </div>

            <div className='flex gap-5 w-full box-border'>
                <div className='w-1/2 rounded-3xl overflow-hidden cursor-pointer group'>
                    <img src='/images/Rectangle 34625194.png' className='group-hover:scale-105 w-full transition-all' alt='' />
                </div>

                <div className='w-1/2 rounded-3xl overflow-hidden cursor-pointer group'>
                    <img src='/images/Rectangle 34625195.png' className='group-hover:scale-105 w-full transition-all' alt='' />
                </div>
            </div>

            <Categories {...categoriesProps} />
            <Offers {...offersProps} />
        </div>
    )
}
