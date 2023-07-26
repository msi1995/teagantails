import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Review } from "./Review";
import { ReactComponent as TLogoBlack } from "../assets/tgwalk_black.svg";
import "../animations.css";
import { BASE_ROUTE } from "../App";
import Chevron from "../assets/chevron.png";
import { useSwipeable } from "react-swipeable";

interface Testimonial {
  reviewText: string;
  firstName: string;
  lastInitial: string;
  city: string;
  approved: boolean;
}

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonial, setTestimonial] = useState<Testimonial>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [animateOutReverse, setAnimateOutReverse] = useState(false);
  const [reviewScreen, setReviewScreen] = useState(false);

  const mod = (n: number, m: number) => {
    return ((n % m) + m) % m;
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => navTestimonial(false),
    onSwipedRight: () => navTestimonial(true),
    preventScrollOnSwipe: true,
  });

  useEffect(() => {
    getTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      setTestimonial(testimonials[0]);
    }
  }, [testimonials, reviewScreen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateOut(true); // Trigger the animate out effect
      setTimeout(() => {
        const currentIndex = testimonials.findIndex((t) => t === testimonial);
        const nextIndex = (currentIndex + 1) % testimonials.length;
        setTestimonial(testimonials[nextIndex]);
        setAnimateOut(false); // Reset the animate out flag
      }, 1500); // fade to left animation time
    }, 7500); // 7.5 sec

    return () => {
      clearInterval(interval);
    };
  }, [testimonial, testimonials, reviewScreen]);

  const navTestimonial = (forward: boolean) => {
    forward ? setAnimateOut(true) : setAnimateOutReverse(true);
    setTimeout(() => {
      const currentIndex = testimonials.findIndex((t) => t === testimonial);
      const nextIndex = forward
        ? mod(currentIndex + 1, testimonials.length)
        : mod(currentIndex - 1, testimonials.length);
      setTestimonial(testimonials[nextIndex]);
      setAnimateOut(false);
      setAnimateOutReverse(false);
    }, 1000); // Wait for 1s before updating (ease out time)
  };

  const getTestimonials = async () => {
    try {
      const res: Response = await fetch(BASE_ROUTE + "/reviews/approved");
      const data: Testimonial[] = await res.json();
      setTestimonials(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {!reviewScreen ? (
        <section className="flex flex-1 bg-[radial-gradient(150rem_15rem_at_top,theme(colors.fuchsia.200),white)] items-center relative isolate overflow-x-clip bg-white px-6 py-32 sm:py-22 lg:px-8 lg:py-64">
          {!isLoading && (
            <div
              {...handlers}
              className={`mx-auto max-w-2xl lg:max-w-4xl ${
                animateOutReverse
                  ? "animate-out-reverse"
                  : animateOut
                  ? "animate-out"
                  : "animate-in"
              }`}
            >
              <TLogoBlack className="mx-auto h-16 w-24" />
              <figure className="mt-10">
                <div className="flex flex-row items-center">
                  <img
                    src={Chevron}
                    onClick={() => navTestimonial(false)}
                    className="grow-0 w-4 h-4 sm:w-5 sm:h-5 rotate-180 cursor-pointer"
                  ></img>
                  <blockquote className="text-center sm:px-24 px-5 sm:text-2xl text-md font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                    <p>{testimonial?.reviewText}</p>
                  </blockquote>
                  <img
                    src={Chevron}
                    onClick={() => navTestimonial(true)}
                    className="grow-0 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                  ></img>
                </div>
                <figcaption className="mt-10">
                  <img
                    className="mx-auto h-16 w-16 rounded-full border-dotted border-4 border-yellow-400"
                    src="https://media.istockphoto.com/id/1030792294/vector/cute-simple-dog-face-vector.jpg?s=612x612&w=0&k=20&c=6ROQhjs2c2SuLxXCGo7s6flPd2zgH2vLLtS4Qxyfzl4="
                    alt=""
                  />
                  <div className="mt-4 flex items-center justify-center space-x-3 pb-4 text-base">
                    <div className="font-semibold text-gray-900">
                      {testimonial?.firstName}
                      {` ${testimonial?.lastInitial}`}
                    </div>
                    <svg
                      viewBox="0 0 2 2"
                      width={3}
                      height={3}
                      aria-hidden="true"
                      className="fill-gray-900"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className="text-gray-600">{testimonial?.city}</div>
                  </div>
                </figcaption>
                <button
                  onClick={() => setReviewScreen(true)}
                  className="mt-4 mx-auto flex justify-center w-48 rounded-md bg-pink-400 hover:bg-pink-500  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add your review
                </button>
              </figure>
            </div>
          )}
        </section>
      ) : (
        <Review setReviewScreen={setReviewScreen} />
      )}
    </div>
  );
};
