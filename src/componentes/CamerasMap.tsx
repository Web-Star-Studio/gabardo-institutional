import { motion } from 'motion/react';
import { useHeader } from '@/contextos/Header';
import TiltedCard from './CardCamera';

export default function CamerasMap() {
    const { darkMode } = useHeader();

    return (
        <motion.div
            className="
                relative
                min-h-dvh
                w-full
                box-border
                pt-[100px]
                px-[225px]
            "
            animate={{
                backgroundColor: darkMode ? '#181818' : '#fff',
                color: darkMode ? '#fff' : '#000',
            }}
        >
            <div className="grid grid-cols-3 gap-8">
                <TiltedCard
                    imageSrc="cctv.png"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="300px"
                    containerWidth="400px"
                    imageHeight="300px"
                    imageWidth="400px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={
                        <p className="font-extrabold text-6xl text-white [-webkit-text-stroke:2px_black]">
                            Escritórios
                        </p>
                    }
                />
                <TiltedCard
                    imageSrc="cctv.png"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="300px"
                    containerWidth="400px"
                    imageHeight="300px"
                    imageWidth="400px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={
                        <p className="font-extrabold text-6xl text-white [-webkit-text-stroke:2px_black]">
                            Escritórios
                        </p>
                    }
                />
                <TiltedCard
                    imageSrc="cctv.png"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="300px"
                    containerWidth="400px"
                    imageHeight="300px"
                    imageWidth="400px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={
                        <p className="font-extrabold text-6xl text-white [-webkit-text-stroke:2px_black]">
                            Escritórios
                        </p>
                    }
                />
                <TiltedCard
                    imageSrc="cctv.png"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="300px"
                    containerWidth="400px"
                    imageHeight="300px"
                    imageWidth="400px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={
                        <p className="font-extrabold text-6xl text-white [-webkit-text-stroke:2px_black]">
                            Escritórios
                        </p>
                    }
                />
                <TiltedCard
                    imageSrc="cctv.png"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="300px"
                    containerWidth="400px"
                    imageHeight="300px"
                    imageWidth="400px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={
                        <p className="font-extrabold text-6xl text-white [-webkit-text-stroke:2px_black]">
                            Escritórios
                        </p>
                    }
                />
                <TiltedCard
                    imageSrc="cctv.png"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="300px"
                    containerWidth="400px"
                    imageHeight="300px"
                    imageWidth="400px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={
                        <p className="font-extrabold text-6xl text-white [-webkit-text-stroke:2px_black]">
                            Escritórios
                        </p>
                    }
                />
                <TiltedCard
                    imageSrc="cctv.png"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="300px"
                    containerWidth="400px"
                    imageHeight="300px"
                    imageWidth="400px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={
                        <p className="font-extrabold text-6xl text-white [-webkit-text-stroke:2px_black]">
                            Escritórios
                        </p>
                    }
                />
                <TiltedCard
                    imageSrc="cctv.png"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="300px"
                    containerWidth="400px"
                    imageHeight="300px"
                    imageWidth="400px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={
                        <p className="font-extrabold text-6xl text-white [-webkit-text-stroke:2px_black]">
                            Escritórios
                        </p>
                    }
                />
                <TiltedCard
                    imageSrc="cctv.png"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="300px"
                    containerWidth="400px"
                    imageHeight="300px"
                    imageWidth="400px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={
                        <p className="font-extrabold text-6xl text-white [-webkit-text-stroke:2px_black]">
                            Escritórios
                        </p>
                    }
                />
            </div>
        </motion.div>
    );
}