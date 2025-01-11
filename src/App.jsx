import React, { useState } from 'react';

    function App() {
      const [videoUrl, setVideoUrl] = useState('');
      const [thumbnailUrl, setThumbnailUrl] = useState('');

      const getVideoId = (url) => {
        try {
          const urlObject = new URL(url);
          const videoId = urlObject.searchParams.get('v');
          if (videoId) {
            return videoId;
          }
          const pathname = urlObject.pathname;
          const videoIdFromPath = pathname.split('/').pop();
          if (videoIdFromPath) {
            return videoIdFromPath;
          }
        } catch (e) {
          return null;
        }
        return null;
      };

      const handleDownload = () => {
        const videoId = getVideoId(videoUrl);
        if (videoId) {
          const url = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          setThumbnailUrl(url);
        } else {
          setThumbnailUrl('');
          alert('Invalid YouTube URL');
        }
      };

      const downloadImage = () => {
        if (thumbnailUrl) {
          const link = document.createElement('a');
          link.href = thumbnailUrl;
          link.download = 'thumbnail.jpg';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };

      return (
        <div className="container">
          <h1>YouTube Thumbnail Downloader</h1>
          <input
            type="text"
            placeholder="Enter YouTube URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <button onClick={handleDownload}>Get Thumbnail</button>
          {thumbnailUrl && (
            <div>
              <img src={thumbnailUrl} alt="YouTube Thumbnail" />
              <button onClick={downloadImage}>Download Image</button>
            </div>
          )}
        </div>
      );
    }

    export default App;
