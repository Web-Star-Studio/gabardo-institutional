import { motion } from 'motion/react';
import { useHeader } from '@/contextos/Header';

export default function FrenteCam() {

    const { darkMode } = useHeader();

    return (
        <motion.div
            animate={{
                backgroundColor: darkMode ? '#181818' : '#fff',
            }}
            className='grid grid-cols-3 pt-20'
        >

            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam2`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />
            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam27`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />
            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam1`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />
            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam19`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen; autoplay"
            />



            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam17`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />

            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam18`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />
            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam21`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />
            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam20`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam3`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />

            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam24`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />

            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam26`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen "
            />
            <iframe
                src={`http://10.1.3.132:8888/dvr7_cam23`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen col-span-1"
            />

        </motion.div>
    );
}