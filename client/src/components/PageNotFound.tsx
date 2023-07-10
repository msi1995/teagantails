import { Navbar } from "./Navbar";
import questionMark from "../assets/questionmark.png"

export const PageNotFound = () => {
  return (
    <div className="flex flex-col h-screen w-full">
        <Navbar />
      <div className="flex justify-center pt-48 pb-4 px-4 sm:px-0 sm:pb-6 sm:pt-64">
        <span className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">We aren't sure what you're looking for, but its not here...</span>
      </div>
      <div className="flex flex-1 justify-center">
      <img className="h-56 w-56 sm:mt-36 mt-24" src={questionMark}/>
      </div>
    </div>
  );
};
