"use client";
import Image from "next/image";
import { FaSearch, FaUser, FaUpload } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [quality, setQuality] = useState(75);

  const getimages = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_AEC_KEY}`
    );

    //console.log(res.data.results);
    setImages(res.data.results);
  };

  return (
    <main className="flex p-1 h-screen w-full flex-row items-center bg-orange-600 justify-between">
      <nav className="h-screen min-w-24 bg-gray-900 rounded-tl-sm rounded-bl-sm flex flex-col items-center justify-between py-4">
        <Image
          src={"/logo.png"}
          width={60}
          height={60}
          alt="DG-logo"
          format="webp"
          className="mt-5"
        />
      </nav>
      <section className="  bg-gray-900 h-screen w-full rounded-sm p-4 overflow-y-scroll">
        <section className="w-full border-b border-gray-600 flex p-2">
          <input
            type="text"
            name="search"
            onChange={(e) => setQuery(e.target.value)}
            className=" bg-transparent  w-full text-slate-400 p-1 ring-none outline-none  sevillana-regular text-2xl md:text-5xl"
            placeholder="Search the gallery..."
          />
          <button
            type="submit"
            className="text-lg md:text-2xl text-gray-400"
            onClick={(e) => getimages(e)}
          >
            <FaSearch />
          </button>
        </section>

        <section>
          {images.length === 0 ? (
            <section className="flex flex-row flex-wrap gap-4 justify-center items-center shrink-0 mt-4">
              <p>
                Search for images using the search bar above(i.e. Nature etc.),
                and click on any image to view it in full resolution.
              </p>
              <Image src="/bgimg.png" height={400} width={400} alt="bg-img" />
            </section>
          ) : (
            <section className="flex flex-row flex-wrap gap-4 justify-center items-center shrink-0 mt-4">
              {images.map((image) => (
                <>
                  <button
                    key={image.id}
                    onClick={() =>
                      document.getElementById(image.id).showModal()
                    }
                    className="relative h-80 w-80 overflow-hidden rounded-sm"
                  >
                    <Image
                      src={image.urls.raw}
                      fill={true}
                      style={{ objectPosition: "center" }}
                      alt={image.alt_description}
                      className="rounded-sm"
                    />
                  </button>
                  <dialog id={image.id} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        {image.alt_description}
                      </h3>

                      <div className="relative w-96 h-96 border border-white overflow-hidden">
                        <Image
                          src={image.urls.raw}
                          width={width}
                          height={height}
                          alt={image.alt_description}
                          priority={true}
                          quality={quality}
                        />
                      </div>

                      <section className="flex flex-col gap-3 mt-2">
                        <label class="input input-bordered flex items-center gap-2">
                          Height
                          <input
                            type="number"
                            class="grow"
                            placeholder="400"
                            min={10}
                            onChange={(e) => {
                              !e.target.value
                                ? setHeight(400)
                                : setHeight(parseInt(e.target.value));
                            }}
                          />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                          width
                          <input
                            type="number"
                            class="grow"
                            placeholder="400"
                            min={10}
                            onChange={(e) => {
                              !e.target.value
                                ? setWidth(400)
                                : setWidth(parseInt(e.target.value));
                            }}
                          />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                          quality
                          <input
                            type="number"
                            class="grow"
                            placeholder="75"
                            max={100}
                            onChange={(e) => {
                              parseInt(e.target.value) > 100
                                ? setQuality(100)
                                : setQuality(parseInt(e.target.value));
                            }}
                          />
                        </label>
                      </section>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>{" "}
                </>
              ))}
            </section>
          )}
        </section>
      </section>
    </main>
  );
}
