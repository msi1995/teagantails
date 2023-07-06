import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Review } from "./Review";
import { ReactComponent as TLogoBlack } from "../assets/tgwalk_black.svg";
import "../animations.css";

// const BASE_ROUTE = "https://teagandfriends-5ef46929a672.herokuapp.com";
const BASE_ROUTE = "http://localhost:3001";

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
  const [reviewScreen, setReviewScreen] = useState(false);

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
      }, 2500); // Wait for 500ms before updating the testimonial
    }, 5500); // 5.5 sec

    return () => {
      clearInterval(interval);
    };
  }, [testimonial, testimonials, reviewScreen]);

  const getTestimonials = async () => {
    try {
      const res: Response = await fetch("/reviews/approved");
      const data: Testimonial[] = await res.json();
      setTestimonials(data);
      setIsLoading(false);
    } catch (error) {
      //setIsLoading(false); //uncomment for local testing
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
              className={`mx-auto max-w-2xl lg:max-w-4xl ${
                animateOut ? "animate-out" : "animate-in"
              }`}
            >
              <TLogoBlack className="mx-auto h-16 w-24" />
              <figure className="mt-10">
                <blockquote className="text-center sm:text-2xl text-md font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                  <p>{testimonial?.reviewText}</p>
                </blockquote>
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
