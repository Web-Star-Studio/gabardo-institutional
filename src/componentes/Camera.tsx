export default function Camera({ camId }: { camId: string }) {
    return (
        <iframe
            src={`http://localhost:8888/${camId}`}
            className=" aspect-[8/5.5] bg-black"
            allow="autoplay; fullscreen"
            scrolling="no"
        />
    );
}
