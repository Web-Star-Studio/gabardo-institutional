import { motion } from 'motion/react';
import { useHeader } from '@/contextos/Header';

export default function CamerasMap() {
    const { darkMode } = useHeader();

    return (
        <motion.div
            className="
            relative
            min-h-screen w-full 
            pt-[75px]
            px-[40px]"

            animate={{
                backgroundColor: darkMode ? '#181818' : "#fff",
                color: darkMode ? "#fff" : "#000",
            }}
        >
            <motion.button
                className="
                    absolute
                    border
                    w-[50px]
                    h-[50px]
                    left-190
                    bottom-20
            "
                whileHover={{
                    backgroundColor: "#ff0000",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[150px]
                    h-[75px]
                    left-75
                    bottom-[121px]
                    border-t-0
                    "
                whileHover={{
                    backgroundColor: "#ff0000",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[150px]
                    h-[75px]
                    left-75
                    bottom-49
            "
                whileHover={{
                    backgroundColor: "#ff0000",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[50px]
                    h-[75px]
                    left-112
                    bottom-49
                    border-l-0
            "
                whileHover={{
                    backgroundColor: "#ff0000",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[50px]
                    h-[37.5px]
                    left-112
                    bottom-[333.7px]
                    border-l-0
            "
                whileHover={{
                    backgroundColor: "#daf705",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[50px]
                    h-[150px]
                    left-112
                    bottom-[370.5px]
                    border-l-0
                    border-b-0
            "
                whileHover={{
                    backgroundColor: "#daf705",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[109.5px]
                    h-[100px]
                    left-85
                    bottom-[271.5px]
                    border-b-0
                    border-t-0
            "
                whileHover={{
                    backgroundColor: "#0928f5",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[150px]
                    h-[50px]
                    left-75
                    bottom-[371.5px]
            "
                whileHover={{
                    backgroundColor: "#09f081",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[150px]
                    h-[50px]
                    left-75
                    bottom-[421.5px]
                    border-b-0
            "
                whileHover={{
                    backgroundColor: "#f709c0",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                  
                    w-[150px]
                    h-[50px]
                    left-75
                    bottom-[471.5px]
                    border-r
            "
                whileHover={{
                    backgroundColor: "#ff0000",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[150px]
                    h-[100px]
                    left-75
                    bottom-[520.5px]
                
            "
                whileHover={{
                    backgroundColor: "#f709c0",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[100px]
                    h-[100px]
                    right-175
                    bottom-[300px]
                
            "
                whileHover={{
                    backgroundColor: "#f709c0",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[250px]
                    h-[65px]
                    right-105
                    bottom-[370px]
                
            "
                whileHover={{
                    backgroundColor: "#f709c0",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[250px]
                    h-[45px]
                    right-[450px]
                    bottom-[300px]
                    border-l-0
            "
                whileHover={{
                    backgroundColor: "#f709c0",
                }}
            >
            </motion.button>

            <motion.button
                className="
                    absolute
                    border
                    w-[145px]
                    h-[100px]
                    right-30
                    bottom-[100px]
                
            "
                whileHover={{
                    backgroundColor: "#f709c0",
                }}
            >
            </motion.button>
            <motion.button
                className="
                    absolute
                    border
                    w-[100px]
                    h-[100px]
                    left-130
                    top-[100px]
                
            "
                whileHover={{
                    backgroundColor: "#f709c0",
                }}
            >
            </motion.button>


        </motion.div>
    );
}