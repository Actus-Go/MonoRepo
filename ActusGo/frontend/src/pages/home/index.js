import React, {
  useEffect,
  useRef,
  useState,
  Suspense,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/home/sendVerification";
import Post from "../../components/post-1";
import "./style.css";
const MobileOnlyComponent = React.lazy(() => import("./MobileOnlyComponent"));

export default function Home({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [showComponent, setShowComponent] = useState(true);
  const [initialScroll, setInitialScroll] = useState(false);

  const timeoutIdRef = useRef(null);

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  const handleScroll = useCallback(() => {
    const currentPosition = window.scrollY;

    // Update the scroll position
    setScrollPosition(currentPosition);

    // If initial scroll hasn't occurred, set it to true and return
    if (!initialScroll) {
      setInitialScroll(true);
      return;
    }

    // Detect if scrolling up or down
    const isScrollingDown = currentPosition > scrollPosition;

    // Log the direction to the console
    console.log(isScrollingDown ? "Scrolling down" : "Scrolling up");

    // Update opacity based on scrolling
    const maxOpacity = 1;
    const minOpacity = 0.4;
    const scrollRange = 200; // Adjust this value based on your requirements

    let calculatedOpacity = Math.min(
      maxOpacity,
      Math.max(minOpacity, 1 - currentPosition / scrollRange)
    );

    // If scrolling up, set opacity to maxOpacity after a delay
    if (!isScrollingDown) {
      calculatedOpacity = maxOpacity;

      // Clear the previous timeout
      clearTimeout(timeoutIdRef.current);

      // Set the new timeout to show the component after scrolling stops
      timeoutIdRef.current = setTimeout(() => {
        setShowComponent(true);
      }, 100); // Adjust the delay based on your requirements
    }

    setOpacity(calculatedOpacity);
  }, [scrollPosition, initialScroll]); // Include scrollPosition and initialScroll in the dependency array

  // Effect to add and remove event listeners on mount and unmount
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Include handleScroll in the dependency array

  return (
    <div className=" relative h-full w-full  ">

      <div className='home_middle pt-12 sm:pt-20 lg:pt-0 h-full w-full flex flex-col items-center  lg:items-start m-auto' ref={middle}>
        <div className="absolute top-12 w-full  lg:mx-auto sm:px-0 h-full">


          {loading ? (<>

            <div className='sekelton_loader'>
              <BeatLoader color='#6e56fc' />
            </div>
          </>

          ) : (
            <>
              <div
                className="max-w-5xl w-full flex flex-col  items-center justify-center relative   m-auto"
              >
                {user.verified === false && <SendVerification user={user} />}
                <CreatePost user={user} setVisible={setVisible} />
              </div>
              <div className='posts w-full px-1 sm:px-0 lg:w-1/2 flex flex-col justify-center lg:mx-auto'>
                {posts.map((post, i) => (
                  <Post key={i} id={i} post={post} user={user} />
                ))}
              </div></>

          )}
        </div>
      </div>


      <div
        style={{
          opacity: opacity,
          transition: "opacity 0.5s ease", // Adjust the duration and easing as needed
        }}
        className='lg:hidden'>
        {/* Content only visible on mobile view */}
        <Suspense fallback={<div>Loading...</div>}>
          {isMobileView && showComponent && (
            <MobileOnlyComponent
              user={user}
              posts={posts}
              loading={loading}
              setVisible={setVisible}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}
