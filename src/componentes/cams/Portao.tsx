import { motion } from 'motion/react';
import { useHeader } from '@/contextos/Header';

export default function PortaoCam() {

    const { darkMode } = useHeader();

    return (
        <motion.div
            animate={{
                backgroundColor: darkMode ? '#181818' : '#fff',
            }}
            className='grid min-h-screen grid-cols-2 pt-20'
        >
            <iframe
                src={`http://10.1.3.132:8888/dvr1_cam1`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />
            <iframe
                src={`http://10.1.3.132:8888/dvr3_cam13`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />
            <iframe
                src={`http://10.1.3.132:8888/dvr2_cam12`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />
            <iframe
                src={`http://10.1.3.132:8888/dvr2_cam13`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen; autoplay"
            />

            <iframe
                src={`http://10.1.3.132:8888/dvr2_cam9`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />
            <iframe
                src={`http://10.1.3.132:8888/dvr2_cam11`}
                className="pointer-events-none aspect-[8/5.5] bg-black"
                allow="autoplay; fullscreen"
            />
        </motion.div>
    );
}