import { Navbar } from "./Navbar";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { BASE_ROUTE } from "../App";

export const Intake = () => {
  const formRef: any = useRef();
  const [intakeSubmitted, setIntakeSubmitted] = useState<boolean>(false);
  const [canSubmitIntake, setCanSubmitIntake] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastInitial, setLastInitial] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [animalTypeOther, setAnimalTypeOther] = useState<string>("");
  const [petNames, setPetNames] = useState<string>("");
  const [notDogOrCat, setNotDogOrCat] = useState<boolean>(false);
  const [specialInstructions, setSpecialInstructions] = useState<string>("");
  const [specialInstructionsRequired, setSpecialInstructionsRequired] =
    useState<boolean>(false);
  const [triggersOrAggressions, setTriggersOrAggressions] =
    useState<string>("");
  const [hasTriggersOrAggressions, setHasTriggersOrAggressions] =
    useState<boolean>(false);
  const [intakeBody, setIntakeBody] = useState<string>("");
  const [hasDogs, setHasDogs] = useState<boolean>(false);
  const [hasCats, setHasCats] = useState<boolean>(false);
  const [hasOther, setHasOther] = useState<boolean>(false);
  const [numDogs, setNumDogs] = useState<string>("0");
  const [numCats, setNumCats] = useState<string>("0");
  const [numOthers, setNumOthers] = useState<string>("0");

  const handleIntakeSubmit = async (event: any) => {
    event.preventDefault();

    if (!canSubmitIntake) {
      alert(
        "The intake form should only be completed after initial correspondence. Please use the contact form unless you have been asked to complete intake."
      );
      return;
    }

    if (
      !firstName ||
      !lastInitial ||
      !email ||
      !phoneNumber ||
      !petNames ||
      !address ||
      (notDogOrCat && !animalTypeOther) ||
      (specialInstructionsRequired && !specialInstructions) ||
      (hasTriggersOrAggressions && !triggersOrAggressions) ||
      !intakeBody
    ) {
      alert("Please fill out all required fields, or check for blank fields.");
      return;
    }

    const animalTypes: string[] = [];

    if (parseInt(numDogs) > 0) {
      animalTypes.push(`Dogs: ${numDogs}`);
    }
    if (parseInt(numCats) > 0) {
      animalTypes.push(`Cats: ${numCats}`);
    }
    if (parseInt(numOthers) > 0) {
      animalTypes.push(`Others: ${numOthers} -- ${animalTypeOther}`);
    }
    if (animalTypes.length === 0) {
      alert("Please specify number of animals");
      return;
    }

    await fetch(BASE_ROUTE + "/intakes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastInitial: lastInitial,
        email: email,
        contactNumber: phoneNumber,
        address: address,
        animalType: animalTypes,
        petNames: petNames,
        specialInstructions: specialInstructions,
        triggersOrAggressions: triggersOrAggressions,
        intakeBody: intakeBody,
      }),
    });

    emailjs
      .sendForm(
        "service_njnh1t8",
        "template_1174msd",
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

    setIntakeSubmitted(true);
  };

  return (
    <>
      <Navbar />
      {intakeSubmitted ? (
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
              Thanks! We've received your intake information.
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
              Intake Form
            </h2>
            <p className="mt-12 text-lg leading-8 text-gray-600">
              Please fill out the intake form below so I can best take care of
              your animals!
            </p>
          </div>
          <form
            ref={formRef}
            onSubmit={handleIntakeSubmit}
            className="mx-auto mt-16 max-w-2xl sm:mt-12 mt-4"
          >
            <div className="grid grid-cols-1 gap-x-8 sm:gap-y-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="canSubmitIntake"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  I have been instructed to complete the Intake Form after
                  initial correspondence via email or phone.
                  <span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <select
                    value={canSubmitIntake === true ? "Yes" : "No"}
                    onChange={(e) =>
                      setCanSubmitIntake(
                        e.target.value === "Yes" ? true : false
                      )
                    }
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="No">
                      No, I haven't been asked to complete the intake form.
                    </option>
                    <option value="Yes">
                      Yes, I have been asked to complete the intake form.
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  First name<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <input
                    disabled={!canSubmitIntake}
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
                    disabled={!canSubmitIntake}
                    type="text"
                    maxLength={1}
                    value={lastInitial}
                    onChange={(e) => setLastInitial(e.target.value)}
                    name="last_initial"
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
                    disabled={!canSubmitIntake}
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
                  Phone Number<span className="text-red-600"> *</span>
                  <div className="sm:pr-16 pr-6 text-left">
                    <span className="px-0 text-xs text-gray-400 px-2 italic">
                      {" "}
                      I need this so I can provide updates regarding your pet.{" "}
                    </span>
                  </div>
                </label>
                <div className="mt-2.5">
                  <input
                    disabled={!canSubmitIntake}
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    name="phone_number"
                    id="phone-number"
                    autoComplete="tel"
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Address<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <input
                    disabled={!canSubmitIntake}
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    name="address"
                    id="address"
                    autoComplete="street-address"
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="animalType"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Animal Type<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5 flex flex-col w-full gap-y-2">
                  <div className="flex flex-row items-center">
                    <div className="w-24">
                      <input
                        disabled={!canSubmitIntake}
                        onChange={() => setHasDogs(!hasDogs)}
                        className="align-middle h-4 w-4 mr-1"
                        type="checkbox"
                      />
                      <label className="align-middle">Dogs</label>
                    </div>
                    {hasDogs && (
                      <div className="flex flex-row items-center gap-x-2 w-64">
                        <label
                          htmlFor="last-name"
                          className="w-20 text-sm font-semibold leading-6 text-gray-900"
                        >
                          # of Dogs:<span className="text-red-600"></span>
                        </label>
                        <input
                          disabled={!canSubmitIntake}
                          type="text"
                          maxLength={1}
                          value={numDogs}
                          onChange={(e) => setNumDogs(e.target.value)}
                          name="num_dogs"
                            id="num_dogs"
                          className="block w-8 sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 sm:pl-3 pl-2 py-0.75 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row items-center">
                    <div className="w-24">
                      <input
                        disabled={!canSubmitIntake}
                        onChange={() => setHasCats(!hasCats)}
                        className="align-middle h-4 w-4 mr-1"
                        type="checkbox"
                      />
                      <label className="align-middle">Cats</label>
                    </div>
                    {hasCats && (
                      <div className="flex flex-row items-center gap-x-2 w-64">
                        <label
                          htmlFor="last-name"
                          className="text-sm w-20 font-semibold leading-6 text-gray-900"
                        >
                          # of Cats
                        </label>
                        <input
                          disabled={!canSubmitIntake}
                          type="text"
                          maxLength={1}
                          value={numCats}
                          onChange={(e) => setNumCats(e.target.value)}
                          name="num_cats"
                          id="num_cats"
                          className="block w-8 sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 sm:pl-3 pl-2 py-0.75 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-row items-center">
                      <div className="w-24">
                        <input
                          disabled={!canSubmitIntake}
                          onChange={() => {
                            setHasOther(!hasOther);
                            setNotDogOrCat(!notDogOrCat);
                          }}
                          className="align-middle h-4 w-4 mr-1"
                          type="checkbox"
                        />
                        <label className="align-middle">Other</label>
                      </div>
                      {hasOther && (
                        <div className="flex flex-row items-center gap-x-2 w-64">
                          <label
                            htmlFor="last-name"
                            className="text-sm w-20 font-semibold leading-6 text-gray-900"
                          >
                            # of Other<span className="text-red-600"></span>
                          </label>
                          <input
                            disabled={!canSubmitIntake}
                            type="text"
                            maxLength={1}
                            value={numOthers}
                            onChange={(e) => setNumOthers(e.target.value)}
                            name="num_others"
                            id="num_others"
                            className="block w-8 sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 sm:pl-3 pl-2 py-0.75 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* <select
                  disabled={!canSubmitIntake}
                    value={animalType}
                    onChange={(e) => {
                      setAnimalType(e.target.value);
                      setAnimalTypeOther("");
                      setNotDogOrCat(e.target.value === "Other" ? true : false);
                    }}
                    name="animalType"
                    id="animalType"
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Other">Other</option>
                  </select> */}
                </div>
              </div>
              {notDogOrCat && (
                <div className="sm:col-span-2">
                  <label
                    htmlFor="animalType"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    You selected 'Other'. Please specify the type(s) of animals
                    you are seeking care for.
                    <span className="text-red-600"> *</span>
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      disabled={!canSubmitIntake}
                      value={animalTypeOther}
                      onChange={(e) => setAnimalTypeOther(e.target.value)}
                      rows={1}
                      name="animalTypeOther"
                      className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}
              <div className="sm:col-span-2">
                <label
                  htmlFor="pet_names"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Pet Name(s)<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <input
                    disabled={!canSubmitIntake}
                    type="text"
                    value={petNames}
                    onChange={(e) => setPetNames(e.target.value)}
                    name="pet_names"
                    id="pet_names"
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="animalType"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Do any of the animals require medication or some type of
                  special care?<span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <select
                    disabled={!canSubmitIntake}
                    value={specialInstructionsRequired === true ? "Yes" : "No"}
                    onChange={(e) => {
                      setSpecialInstructionsRequired(
                        e.target.value === "Yes" ? true : false
                      );
                      setSpecialInstructions("");
                    }}
                    name="specialInstructionsRequired"
                    id="specialInstructionsRequired"
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
              {specialInstructionsRequired && (
                <div className="sm:col-span-2">
                  <label
                    htmlFor="animalType"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Please explain what medication or specialized care is
                    required, and how it is administered, if applicable.
                    <span className="text-red-600"> *</span>
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      disabled={!canSubmitIntake}
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      name="specialInstructions"
                      id="specialInstructions"
                      rows={3}
                      className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}
              <div className="sm:col-span-2">
                <label
                  htmlFor="triggersOrAggressions"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Do any of the animals have triggers, aggressive behaviors, or
                  anything else I should know about?
                  <span className="text-red-600"> *</span>
                  <div className="sm:pr-16 pr-6 text-left">
                    <span className="px-0 text-xs text-gray-400 px-2 italic">
                      {" "}
                      — Triggers or aggression will not get your animal
                      rejected. This question is asked so that I can best take
                      care of your animal and avoid any situations that might
                      cause them stress. Please answer honestly!{" "}
                    </span>
                  </div>
                </label>
                <div className="mt-2.5">
                  <select
                    disabled={!canSubmitIntake}
                    value={hasTriggersOrAggressions === true ? "Yes" : "No"}
                    onChange={(e) => {
                      setHasTriggersOrAggressions(
                        e.target.value === "Yes" ? true : false
                      );
                      setTriggersOrAggressions("");
                    }}
                    name="hasTriggersOrAggressions"
                    id="hasTriggersOrAggressions"
                    className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
              {hasTriggersOrAggressions && (
                <div className="sm:col-span-2">
                  <label
                    htmlFor="animalType"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Please explain the triggers or aggressions.
                    <span className="text-red-600"> *</span>
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      disabled={!canSubmitIntake}
                      value={triggersOrAggressions}
                      onChange={(e) => setTriggersOrAggressions(e.target.value)}
                      name="triggersOrAggressions"
                      id="triggersOrAggressions"
                      rows={3}
                      className="block w-full sm:border-0 border-solid border-2 border-slate-500 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Please explain the type of care you are seeking, and specify
                  the dates or times care is needed.
                  <span className="text-red-600"> *</span>
                </label>
                <div className="mt-2.5">
                  <textarea
                    disabled={!canSubmitIntake}
                    value={intakeBody}
                    onChange={(e) => setIntakeBody(e.target.value)}
                    name="intakeBody"
                    id="intakeBody"
                    rows={3}
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
                Submit Intake
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
