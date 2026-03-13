'use client';

interface Props {
  videoId: string;
  title: string;
}

export default function VideoPlayer({ videoId, title }: Props) {
  return (
    <div className="video-wrapper shadow-xl">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
