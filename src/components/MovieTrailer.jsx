import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieTrailer = ({ movieTitle, movieYear }) => {
  const [trailerVideoId, setTrailerVideoId] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              key: "AIzaSyCrkC9P6qu8gzGjvOLe74fUEyQ8UHERIuQ",
              q: `${movieTitle} ${movieYear} Official Trailer`,
              part: "snippet",
              type: "video",
              maxResults: 1,
            },
          }
        );

        if (response.data.items.length > 0) {
          const videoId = response.data.items[0].id.videoId;
          setTrailerVideoId(videoId);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [movieTitle]);

  return (
    <div className="flex justify-center">
      {trailerVideoId ? (
        <iframe
          className="md:w-96 md:h-52"
          src={`https://www.youtube.com/embed/${trailerVideoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p className="text-center">YouTube Player N/A</p>
      )}
    </div>
  );
};

export default MovieTrailer;
