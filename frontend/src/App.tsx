import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls, Box, Html } from '@react-three/drei';
import MediaPanel from './components/MediaPanel';
import CalendarPanel from './components/CalendarPanel';
import './App.css';

function App() {
  return (
    <div id="scene-container">
            <Canvas>
        <OrthographicCamera makeDefault position={[20, 20, 20]} zoom={50} />
        <OrbitControls />
                <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#444" />
                </mesh>
        <Box position={[-5, 0, 0]} args={[4, 6, 0.5]}>
                    <meshStandardMaterial color="royalblue" />
          <Html
            transform
            occlude
            position={[0, 0, 0.26]}
            style={{
              width: '380px',
              height: '580px',
            }}
          >
            <MediaPanel />
          </Html>
        </Box>
        <Box position={[5, 0, 0]} args={[4, 6, 0.5]}>
                    <meshStandardMaterial color="hotpink" />
          <Html
            transform
            occlude
            position={[0, 0, 0.26]}
            style={{
              width: '380px',
              height: '580px',
            }}
          >
            <CalendarPanel />
          </Html>
        </Box>
      </Canvas>
    </div>
  );
}

export default App;
