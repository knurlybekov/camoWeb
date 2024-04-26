import React, { useEffect } from 'react';
import './Environment3D.css';

import * as THREE from 'three';
import SceneInit from '../../lib/SceneInit';

import { GUI } from 'dat.gui';

export const Environment3D = () => 
{
    useEffect(() =>
    {
        const test = new SceneInit('myThreeJsCanvas');
        test.initialize();
        test.animate();

        const forestTexture = new THREE.TextureLoader().load('./src/assets/textures/forest.jpg');
        test.scene.background = forestTexture;

        const camo1Texture = new THREE.TextureLoader().load('./src/assets/textures/camo.png');
        const camo2Texture = new THREE.TextureLoader().load('./src/assets/textures/camo2.png');

        const boxGeometry = new THREE.BoxGeometry(7, 7, 7);
        const boxMaterial = new THREE.MeshStandardMaterial(
        { 
            map: camo1Texture
        });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    
        test.scene.add(boxMesh);

        // Initialize dat.gui (for easily edition models)
        const gui = new GUI();

        // GUI: Changing Geometry (scale, rotation)
        gui.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
        gui.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
        gui.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
        gui.add(boxMesh.scale, 'x', 0, 2).name('Scale X Axis');
        gui.add(boxMesh.scale, 'y', 0, 2).name('Scale Y Axis');
        gui.add(boxMesh.scale, 'z', 0, 2).name('Scale Z Axis');

        // GUI: Updating Material (color, wireframe)
        const materialParams = 
        {
          boxMeshColor: boxMesh.material.color.getHex(),
        };
        gui.add(boxMesh.material, 'wireframe');
        gui
          .addColor(materialParams, 'boxMeshColor')
          .onChange((value) => boxMesh.material.color.set(value));

        // Custom Function
        const customFunctionFolder = gui.addFolder('Custom Function');
        customFunctionFolder.open();
        const customParams = 
        {
            switchTexture: () => 
            {
                if (boxMaterial.map === camo1Texture) 
                {
                    boxMaterial.map = camo2Texture;
                } 
                else 
                {
                    boxMaterial.map = camo1Texture;
                }
                boxMaterial.needsUpdate = true;
            }
        };
        customFunctionFolder.add(customParams, 'switchTexture').name('Switch Texture');


        return () => 
        {
            gui.destroy();
        };
    }, []);

    return (
        <div className='environment'>
            <canvas id="myThreeJsCanvas" />
        </div>
    )
}
