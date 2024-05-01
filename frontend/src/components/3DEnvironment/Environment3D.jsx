import React, { useEffect, useState } from 'react';
import './Environment3D.css';

import * as THREE from 'three';
import SceneInit from '../../lib/SceneInit';

import { GUI } from 'dat.gui';

export const Environment3D = () =>
{
    const [dropOverlayisVisible, setDropOverlayisVisible] = useState(false);
    const [currentTexture, setCurrentTexture] = useState();
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    const camo1Texture = new THREE.TextureLoader().load('./src/assets/textures/camo.png');
    const camo2Texture = new THREE.TextureLoader().load('./src/assets/textures/camo2.png');

    const boxMaterial = new THREE.MeshStandardMaterial(
    { 
            map: camo1Texture
    });

    var texture = camo2Texture;
    console.log("Not herepls");

    useEffect(() =>
    {
        const test = new SceneInit('myThreeJsCanvas');
        test.initialize();
        test.animate();

        const forestTexture = new THREE.TextureLoader().load('./src/assets/textures/forest.jpg');
        test.scene.background = forestTexture;

        const boxGeometry = new THREE.BoxGeometry(7, 7, 7);

        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    
        test.scene.add(boxMesh);

        // //Initialize dat.gui (for easily edition models)
        // const gui = new GUI();

        // // GUI: Changing Geometry (scale, rotation)
        // gui.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
        // gui.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
        // gui.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
        // gui.add(boxMesh.scale, 'x', 0, 2).name('Scale X Axis');
        // gui.add(boxMesh.scale, 'y', 0, 2).name('Scale Y Axis');
        // gui.add(boxMesh.scale, 'z', 0, 2).name('Scale Z Axis');

        // // GUI: Updating Material (color, wireframe)
        // const materialParams = 
        // {
        //   boxMeshColor: boxMesh.material.color.getHex(),
        // };
        // gui.add(boxMesh.material, 'wireframe');
        // gui
        //   .addColor(materialParams, 'boxMeshColor')
        //   .onChange((value) => boxMesh.material.color.set(value));

        // //Custom Function
        // const customFunctionFolder = gui.addFolder('Custom Function');
        // customFunctionFolder.open();
        // const customParams = 
        // {
        //     switchTexture: () => 
        //     {
        //         if (boxMaterial.map === camo1Texture) 
        //         {
        //             boxMaterial.map = camo2Texture;
        //         } 
        //         else 
        //         {
        //             boxMaterial.map = camo1Texture;
        //         }
        //         boxMaterial.needsUpdate = true;
        //     }
        // };
        // customFunctionFolder.add(customParams, 'switchTexture').name('Switch Texture');


        // return () => 
        // {
        //     gui.destroy();
        // };
    }, [currentTexture]);

    const handleDragOver = (event) => 
    {
        event.preventDefault();
        setDropOverlayisVisible(true);
    };

    const handleDrop = (event) => 
    {
        event.preventDefault();
        setDropOverlayisVisible(false);

        // Access the dropped file
        const file = event.dataTransfer.files[0];
        console.log('Dropped file:', file);
        
        console.log(event.target.result);

        // Check if the dropped file is an image
        if (file.type.startsWith('image/')) 
        {
            const reader = new FileReader();
            reader.onload = function (event) 
            {
                const newTexture = new THREE.TextureLoader().load(event.target.result);
                setShowLoadingScreen(true);
                setCurrentTexture(newTexture);
                boxMaterial.map = newTexture;
                boxMaterial.needsUpdate = true;
            };
            reader.readAsDataURL(file);
        } 
        else 
        {
            console.log('File not supported');
        }
    };

    useEffect(() =>
    {
        boxMaterial.map = currentTexture;
        boxMaterial.needsUpdate = true;
    }, [currentTexture]);

    useEffect(() => 
    {
        // Hide the loading screan after 2 seconds
        const timeout = setTimeout(() =>
        {
            setShowLoadingScreen(false);
        }, 1000);
    
        // Clean up the timeout to avoid memory leaks
        return () => clearTimeout(timeout);
      }, [showLoadingScreen]);

    const handleDragLeave = (e) => 
    {
        e.preventDefault();
        setDropOverlayisVisible(false);
    };

    return (
        <div className={`environment ${dropOverlayisVisible ? '' : '' }`} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
            <canvas id="myThreeJsCanvas" />
            {dropOverlayisVisible && (
                <div className='drop-overlay'>
                    <div className="drop-here-text">
                        <h2>Drop image file here</h2>
                    </div>
                </div>
            )}

            <div className={`loading-overlay ${showLoadingScreen ? 'fade-in' : ''}`}>
                <div className="loading-text">
                    <h2>Loading</h2>
                </div>
            </div>
        </div>
    );
}
