import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useResultContext } from "../context/ResultContextProvider";
import Loading from "./Loading";

const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/video") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="mt-4 flex flex-wrap justify-between space-y-6 gap-y-6 lg:space-y-0 lg:px-56">
          {results?.map(({ link, title }, index) => (
            <div className="lg:w-2/5 w-full px-5" key={index}>
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/image":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ image, link: { href, title } }, index) => (
            <a
              href={href}
              className="sm:p-3 p-5"
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={image?.src}
                alt={title}
                className="h-60 w-60 object-contain"
                loading="lazy"
              />
              <p className="w-36 break-words text-lg dark:text-blue-300 text-blue-700 mt-2">
                {title}
              </p>
            </a>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="mt-4 flex flex-wrap justify-between space-y-6 gap-y-6 lg:space-y-0 lg:px-56 items-center">
          {results?.map(({ links, id, source, title }) => (
            <div className="lg:w-2/5  w-full px-5" key={id}>
              <a
                href={links?.[0].href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
              <div className="flex gap-4">
                <a href={source?.href} target="_blank" rel="noreferrer">
                  {source?.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    case "/video":
      return (
        <div className="flex flex-wrap justify-center lg:justify-start">
          {results.map((video, index) => {
            console.log("video", video.additional_links?.[0].href);
            return (
              <div className="p-2" key={index}>
                {video?.additional_links?.[0]?.href && (
                  <ReactPlayer
                    url={video.additional_links?.[0].href}
                    controls
                    width="355px"
                    height="200px"
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    default:
      return "ERROR";
  }
};

export default Results;
