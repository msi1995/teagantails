import { Navbar } from "./Navbar";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const formRef: any = useRef();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageSent, setMessageSent] = useState<boolean>(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !message) {
      alert("Please fill out all required fields.");
      return;
    }

    emailjs
      .sendForm(
        "service_njnh1t8",
        "template_9izfnzj",
        formRef.current,
        "jH27kSqIiUkbPafAF"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
    setMessageSent(true);
  };

  return (
    <>
      <Navbar />
      {messageSent ? (
        <div className="flex isolate bg-white px-6 py-60 sm:py-24 lg:px-8 sm:py-96">
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
          <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-2xl">
            Thanks! I'll get back to you soon.
          </h2>
          </div>
        </div>
      ) : (
        <div className="isolate bg-white px-6 pt-24 pb-8 sm:py-24 lg:px-8">
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
          <div className="py-6 mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Contact me
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              I offer walks, drop-ins, and extended visits/pet-sitting 7 days a week.
            </p>
            <p className="mt-0 text-lg leading-8 text-gray-600">
              Available primarily in Corvallis, Philomath, and Albany.
            </p>
            <p className="mt-12 text-lg leading-8 text-gray-600">
              Please fill out the form below and I'll get back to you!
            </p>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mx-auto mt-16 max-w-2xl sm:mt-20 mt-4"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
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
                  Last name<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    name="last_name"
                    id="last-name"
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
                  htmlFor="phone-number"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    name="phone_number"
                    id="phone-number"
                    maxLength={10}
                    minLength={10}
                    autoComplete="tel"
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Message (General or specific inquiries are welcome)<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-pink-400 hover:bg-pink-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Let's talk
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
