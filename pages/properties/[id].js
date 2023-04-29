import React, { useState } from "react";
import { useRouter } from "next/router";
import { getProperty } from "../../lib/helper";
import { useQuery } from "react-query";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function Property() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = router.query; // Access the ID of the product from the URL

  const { isLoading, isError, data, error } = useQuery(["property", id], () =>
    getProperty(id)
  );

  if (isLoading) return <div>Loading...!</div>;
  if (isError) return <div>Error</div>;

  const {
    images,
    price,
    city,
    location,
    area,
    bedRooms,
    bathRooms,
    diningRooms,
    kitchen,
    description,
    status,
  } = data;

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="flex mx-10 my-16 md:flex-row sm:flex-col">
      <div className="bg-white md:h-[500px] sm:h-[400px] sm:w-full md:w-2/4  px-4 relative group">
        <div
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {images.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white sm:w-full md:w-1/2">
        <h1 className="text-center text-bold text-3xl underline underline-offset-8">
          {" "}
          About the House
        </h1>
        <h1 className="m-2 text-center text-xl ">
          {" "}
          PKR <span className="text-2xl">{price}</span>
        </h1>
        <div className="flex">
          <div className="w-1/2">
            <h1 className="px-8 pt-8 text-xl ">Area : {area} sq. feet</h1>
            <h1 className="px-8 pt-8 text-xl ">Bedrooms : {bedRooms} </h1>
            <h1 className="px-8 pt-8 text-xl ">Bathrooms : {bathRooms}</h1>
            <h1 className="px-8 pt-8 text-xl u">Location : {location}</h1>
          </div>
          <div className="w-1/2">
            <h1 className="px-8 pt-8 text-xl ">City : {city}</h1>
            <h1 className="px-8 pt-8 text-xl ">Status : {status} </h1>
            <h1 className="px-8 pt-8 text-xl ">Dining Rooms : {diningRooms}</h1>
            <h1 className="px-8 pt-8 text-xl ">Kitchen :{kitchen} </h1>
          </div>
        </div>
        <div>
          <h1 className="px-8 pt-8 text-xl">Description: {description}</h1>
        </div>
      </div>
    </div>
  );
}
