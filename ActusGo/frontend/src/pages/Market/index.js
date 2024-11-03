import Slider from "../../components/Slider";
import Categories from "../../components/CategorySlider";
import Offers from "../../components/OffersSlider";

export default function index() {
  let sliderProps = {
    slides: [
      <div key={1} className="w-full h-full overflow-hidden">
        <img
          src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
          className="min-h-full min-w-full object-cover"
          alt=""
        />
      </div>,
      <div key={2} className="w-full h-full overflow-hidden">
        <img
          src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
          className="min-h-full min-w-full object-cover"
          alt=""
        />
      </div>,
      <div key={3} className="w-full h-full overflow-hidden">
        <img
          src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
          className="min-h-full min-w-full object-cover"
          alt=""
        />
      </div>,
      <div key={4} className="w-full h-full overflow-hidden">
        <img
          src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
          className="min-h-full min-w-full object-cover"
          alt=""
        />
      </div>,
    ],
  };

  let categoriesProps = {
    categories: [
      {
        image: (
          <img
            key={1}
            className="max-w-full max-h-full object-contain"
            src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
            alt=""
          />
        ),
        url: "#",
        name: "test",
      },
      {
        image: (
          <img
            key={2}
            className="max-w-full max-h-full object-contain"
            src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
            alt=""
          />
        ),
        url: "#",
        name: "test",
      },
      {
        image: (
          <img
            key={3}
            className="max-w-full max-h-full object-contain"
            src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
            alt=""
          />
        ),
        url: "#",
        name: "test",
      },
      {
        image: (
          <img
            key={4}
            className="max-w-full max-h-full object-contain"
            src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
            alt=""
          />
        ),
        url: "#",
        name: "test",
      },
      {
        image: (
          <img
            key={5}
            className="max-w-full max-h-full object-contain"
            src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
            alt=""
          />
        ),
        url: "#",
        name: "test",
      },
      {
        image: (
          <img
            key={6}
            className="max-w-full max-h-full object-contain"
            src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
            alt=""
          />
        ),
        url: "#",
        name: "test",
      },
      {
        image: (
          <img
            key={7}
            className="max-w-full max-h-full object-contain"
            src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
            alt=""
          />
        ),
        url: "#",
        name: "test",
      },
    ],
  };

  let offersProps = {
    offers: [
      {
        title: "test",
        content: [
          <div key={1} className="w-full h-full group transition-all rounded-xl overflow-hidden">
            <img
              src="/images/insta.png"
              className="min-h-full min-w-full object-cover group-hover:scale-105 transition-all"
              alt=""
            />
          </div>,
          <div key={2} className="w-full h-full group transition-all rounded-xl overflow-hidden">
          <img
            src="/images/stok_2.png"
            className="min-h-full min-w-full object-cover group-hover:scale-105 transition-all"
            alt=""
          />
          </div>,
          <div key={3} className="w-full h-full group transition-all rounded-xl overflow-hidden">
          <img
            src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
            className="min-h-full min-w-full object-cover group-hover:scale-105 transition-all"
            alt=""
          />
          </div>,
        ],
        buy: () => console.log("buy"),
        details: () => console.log("details"),
      },
      {
        title: "test",
        content: [
          <div key={2} className="w-full group transition-all rounded-xl overflow-hidden">
            <img
              src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
              className="min-h-full min-w-full object-cover group-hover:scale-105 transition-all"
              alt=""
            />
          </div>,
                    <div key={4} className="w-full h-full group transition-all rounded-xl overflow-hidden">
                    <img
                      src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
                      className="min-h-full min-w-full object-cover group-hover:scale-105 transition-all"
                      alt=""
                    />
                    </div>,
        ],
        buy: () => console.log("buy"),
        details: () => console.log("details"),
      },
      {
        title: "test",
        content: [
          <div key={3} className="w-full group transition-all rounded-xl overflow-hidden">
            <img
              src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
              className="min-h-full min-w-full object-cover group-hover:scale-105 transition-all"
              alt=""
            />
          </div>,
        ],
        buy: () => console.log("buy"),
        details: () => console.log("details"),
      },
      {
        title: "test",
        content: [
          <div key={4} className="w-full group transition-all rounded-xl overflow-hidden">
            <img
              src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
              className="min-h-full min-w-full object-cover group-hover:scale-105 transition-all"
              alt=""
            />
          </div>,
        ],
        buy: () => console.log("buy"),
        details: () => console.log("details"),
      },
      {
        title: "test",
        content: [
          <div key={5} className="w-full group transition-all rounded-xl overflow-hidden">
            <img
              src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
              className="min-h-full min-w-full object-cover group-hover:scale-105 transition-all"
              alt=""
            />
          </div>,
        ],
        buy: () => console.log("buy"),
        details: () => console.log("details"),
      },
      {
        title: "test",
        content: [
          <div key={6} className="w-full group transition-all rounded-xl overflow-hidden">
            <img
              src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
              className="min-h-full min-w-full object-cover group-hover:scale-105 transition-all"
              alt=""
            />
          </div>,
        ],
        buy: () => console.log("buy"),
        details: () => console.log("details"),
      },
      {
        title: "test",
        content: [
          <div key={7} className="w-full group transition-all rounded-xl overflow-hidden">
            <img
              src="https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg"
              className="min-h-full min-w-full object-cover group-hover:scale-105 transition-all"
              alt=""
            />
          </div>,
        ],
        buy: () => console.log("buy"),
        details: () => console.log("details"),
      },
    ],
  };

  return (
    <div className="w-full md:w-[calc(100%-86px)] md:ml-auto gap-6 mt-10 md:gap-24 flex flex-col p-6 md:p-12 pt-20 bg-black">
      <div className="w-full rounded-2xl overflow-hidden">
        <Slider {...sliderProps} />
      </div>

      <div className="flex flex-col sm:flex-row gap-5 w-full box-border">
        <div className="flex-1 rounded-2xl overflow-hidden cursor-pointer group">
          <img
            src="/images/stok_1.png"
            className="group-hover:scale-105 w-full transition-all"
            alt=""
          />
        </div>

        <div className="flex-1 rounded-2xl overflow-hidden cursor-pointer group">
          <img
            src="/images/stok_2.png"
            className="group-hover:scale-105 w-full transition-all"
            alt=""
          />
        </div>
      </div>

      <Categories {...categoriesProps} />
      <Offers {...offersProps} />
    </div>
  );
}
