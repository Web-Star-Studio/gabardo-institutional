import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AlertModal(){
    const [mostrarAlerta, setMostrarAlerta] = useState(true);

    const fecharAlerta = () => {
        setMostrarAlerta(false);
    }

    return(
        <AnimatePresence>
            {mostrarAlerta && (
                <motion.div 
                key="container"
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}

                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                }}
                className='w-full h-full'>
                    <motion.div
                    style={{
                        position: "relative",
                        height: "900px",
                        width: "650px",
                    }}
                    >
                        <motion.button
                        onClick={() => fecharAlerta()}
                        style={{
                            position: "absolute",
                            right: 20,
                            top: 13,
                        }}
                        whileHover={{
                            scale: 1.3,
                        }}
                        animate={{
                            backgroundColor: "#ff0000",
                            color: "white"
                        }}
                        className="h-[60px] w-[60px] rounded-full"
                        >
                            <span className='text-5xl font-black'>
                                X
                            </span>
                        </motion.button>
                        <img src="alerta.jpg" className='h-full w-full'/>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}