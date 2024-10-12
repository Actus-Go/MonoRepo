import Slider from '../../components/Slider';
import Categories from '../../components/'

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

    return (
        <div className='min-h-screen w-[calc(100%-86px)] ml-auto gap-24 flex flex-col p-12 pt-20'>
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

            <Categories />
        </div>
    )
}
