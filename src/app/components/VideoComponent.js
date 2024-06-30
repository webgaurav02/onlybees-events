// components/VideoComponent.js

const VideoComponent = () => {
    return (
        <div className="video-container px-10 md:w-[60vh] md:ml-28">
            <video autoPlay loop muted className="video">
                <source src="./hero.mp4" type="video/mp4" />
                Your browser does not support the videos.
            </video>
        </div>
    );
};

export default VideoComponent;
