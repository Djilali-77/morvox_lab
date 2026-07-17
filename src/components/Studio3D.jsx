import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center, Html, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';

const KeychainModel = ({ text, color }) => {
  const { scene } = useGLTF('/keychain.glb'); 
  const fontUrl = "https://unpkg.com/three@0.150.1/examples/fonts/helvetiker_regular.typeface.json";

  return (
    <group>

        {/* postion (x, y, z) : x->droit ,y->gouf ta7t ,z->godam arrier */}
        {/* rotation (x, y, z) : x->godam ,y->droit ta7t ,z->bel janb */}
        <primitive 
          object={scene} 
          scale={50} 
          position={[0, 0, 0.1]} 
          rotation={[Math.PI + 1.6, 0, 0]}
        />

        <group 
            position={[0.3, 0, 0.25]}
            rotation={[0, 0, 0]}
        >         
            <Center key={text}>
                <Text3D
                font={fontUrl}
                size={text.length > 7 ? 0.3 : 0.4}
                height={0.1}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.01}
                bevelSize={0.01}
                bevelOffset={0}
                bevelSegments={5}
                >
                {text || '-'}
                <meshStandardMaterial 
                    color={color} 
                    roughness={0.4} 
                    metalness={0.1} 
                />
                </Text3D>
            </Center>

        </group>
    </group>
  );
};

const Studio3D = () => {
  const [text, setText] = useState('MORVOX');
  const [color, setColor] = useState('#cd7f32');

  const handleOrder = () => {
    const randomCode = 'MRV-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const phoneNumber = "213561119298"; 
    
    const message = `Salam, je veux commander un Porte-clé 3D personnalisé :
    - Texte : ${text}
    - Couleur : ${color}
    - Prix estimé : 1500 DA
    - Code de suivi : ${randomCode}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    alert(`Commande préparée ! Votre code de suivi est : ${randomCode}.\n\nVous allez être redirigé vers WhatsApp pour confirmer...`);
  
    window.location.href = whatsappUrl;    
};


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-navy dark:text-white mb-4">
            Personnalisez votre Porte-clé 3D
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Tapez votre nom, choisissez votre couleur et visualisez le résultat en temps réel !
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-white dark:bg-navy-dark rounded-2xl shadow-xl border border-gray-100 dark:border-white/10">
          
          <div className="w-full lg:w-1/3 p-8 flex flex-col gap-6 z-10">
            <div>
              <label className="block text-sm font-medium text-navy dark:text-white mb-2">
                Texte à imprimer
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
                maxLength={10}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-navy text-navy dark:text-white focus:ring-2 focus:ring-bronze focus:border-transparent transition-colors outline-none"
                placeholder="Votre nom..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy dark:text-white mb-3">
                Couleur du texte
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setColor('#cd7f32')}
                  className={`w-12 h-12 rounded-full shadow-md transition-transform hover:scale-110 ${color === '#cd7f32' ? 'ring-4 ring-offset-2 ring-bronze dark:ring-offset-navy-dark' : ''}`}
                  style={{ backgroundColor: '#cd7f32' }}
                  title="Bronze"
                />
                <button
                  onClick={() => setColor('#1a202c')}
                  className={`w-12 h-12 rounded-full shadow-md transition-transform hover:scale-110 ${color === '#1a202c' ? 'ring-4 ring-offset-2 ring-navy dark:ring-offset-navy-dark' : ''}`}
                  style={{ backgroundColor: '#1a202c' }}
                  title="Navy"
                />
                <button
                  onClick={() => setColor('#ffffff')}
                  className={`w-12 h-12 rounded-full shadow-md transition-transform hover:scale-110 border border-gray-200 ${color === '#ffffff' ? 'ring-4 ring-offset-2 ring-gray-400 dark:ring-offset-navy-dark' : ''}`}
                  style={{ backgroundColor: '#ffffff' }}
                  title="Blanc"
                />
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100 dark:border-white/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600 dark:text-gray-400">Prix estimé</span>
                <span className="text-2xl font-bold text-navy dark:text-white">1500 DA</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOrder}
                className="w-full bg-bronze hover:bg-bronze-light text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-colors"
              >
                Commander Maintenant
              </motion.button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 min-h-[500px] lg:min-h-[600px] bg-gray-100 dark:bg-[#0f172a] relative cursor-grab active:cursor-grabbing rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl overflow-hidden">
            <div className="absolute top-4 left-4 bg-white/80 dark:bg-black/50 px-3 py-1 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 backdrop-blur-sm z-10 pointer-events-none">
              🖱️ Faites glisser pour tourner
            </div>
            
            <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
              <Suspense fallback={
                <Html center>
                  <div className="text-lg font-bold text-navy dark:text-white whitespace-nowrap bg-white/80 dark:bg-black/50 px-4 py-2 rounded-lg backdrop-blur-md">
                    Chargement 3D... ⏳
                  </div>
                </Html>
              }>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-10, -10, -10]} intensity={0.5} />

                <OrbitControls enableZoom={true} />

                <KeychainModel text={text} color={color} />
                
              </Suspense>
            </Canvas>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Studio3D;