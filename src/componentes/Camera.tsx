export default function Camera({ camId }: { camId: string }) {
    return (
        <iframe
            src={`http://10.1.3.132:8888/${camId}`}
            className=" aspect-[8/5.5] bg-black"
            allow="autoplay; fullscreen"
            scrolling="no"
        />
    );
}
