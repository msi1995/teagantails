import { useState } from "react";
import emailjs from "@emailjs/browser";
import { BASE_ROUTE } from "../App";

export const Review = ({ setReviewScreen }: any) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastInitial, setLastInitial] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [reviewBody, setReviewBody] = useState<string>("");
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  const handleReviewSubmit = async (event: any) => {
    event.preventDefault();
    if (!firstName || !lastInitial || !email || !reviewBody) {
      alert("Please fill out all required fields.");
      return;
    }

    const data = await fetch(BASE_ROUTE + "/reviews/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewText: reviewBody,
        firstName: firstName,
        lastInitial: lastInitial,
        city: city || "Corvallis, OR",
        email: email,
      }),
    });
    // emailjs.send(
    //   "service_njnh1t8",
    //   "template_1174msd",
    //   undefined,
    //   "jH27kSqIiUkbPafAF"
    // );

    setReviewSubmitted(true);
  };

  return (
    <div className="isolate bg-white px-6 pt-32 pb-8 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[5rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-15rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-60 sm:opacity-30 sm:left-[calc(50%-5rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      {reviewSubmitted ? (
        <div className="flex flex-col text-center isolate px-6 py-60 sm:py-24 lg:px-8 sm:py-96">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-2xl">
            Got it! Your review has been received.
          </h2>
          <button
            onClick={() => setReviewScreen(false)}
            className="mt-4 mx-auto flex justify-center w-48 rounded-md bg-pink-400 hover:bg-pink-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Back to Testimonials
          </button>
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Add your review
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Fill out your review below!
            </p>
          </div>
          <form
            onSubmit={handleReviewSubmit}
            className="mx-auto z-20 mt-16 max-w-2xl sm:mt-20 mt-8"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  First name<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    name="first_name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Last Initial<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={lastInitial}
                    onChange={(e) => setLastInitial(e.target.value)}
                    name="last_name"
                    id="last-name"
                    maxLength={1}
                    autoComplete="family-name"
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  City<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    name="city"
                    id="city"
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Corvallis, OR">Corvallis</option>
                    <option value="Philomath, OR">Philomath</option>
                    <option value="Albany, OR">Albany</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  What did you think?<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <textarea
                    maxLength={350}
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-12 flex flex-row space-x-12">
              <button
                type="submit"
                className="block w-full rounded-md bg-pink-400 hover:bg-pink-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit Review
              </button>
              <button
                onClick={() => setReviewScreen(false)}
                className="block w-full rounded-md bg-slate-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Nevermind
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
