import React, { useRef, useState } from "react";
import {useLoader} from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { Quaternion } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';


const Viz = ({ quaternion }) => {

    // const [rocket, setRocket] = useState(undefined);
    const rocket = useRef();
    const geometry = useLoader(STLLoader, 'Rocket.stl');
    console.log('Geometry loaded:', geometry);

    if (rocket.current) {
        rocket.current.quaternion.set(quaternion.x, quaternion.y,  quaternion.z, quaternion.w);
    }

    if (rocket.current) {
        rocket.current.quaternion.set(quaternion.x?.slice(-1), quaternion.y?.slice(-1), quaternion.z?.slice(-1), quaternion.w?.slice(-1));
    }


    return(

        <div className="bg-gray-800 p-4 rounded shadow-md flex justify-center items-center h-96">
            
            <Canvas style={{height:'100%', width:'100%', background:'#050126'}} rotation={[30,0,0]}>
            <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <mesh ref={rocket} geometry={geometry} scale={[0.1, 0.1, 0.1]}>
                    <meshStandardMaterial color='red'/>
                </mesh>
            <OrbitControls />
            </Canvas>
        </div>
    )

}

export default Viz;