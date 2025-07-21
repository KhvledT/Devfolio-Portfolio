import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const PreloaderWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
`;

const DecorativeCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  opacity: 0.18;
  pointer-events: none;
`;

const DecorativeWave = styled(motion.div)`
  position: absolute;
  width: 320px;
  height: 60px;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
`;

const LoaderContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const Dots = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 24px;
`;

const Dot = styled(motion.div)`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2196f3 0%, #1565c0 100%);
`;

const LoaderText = styled(motion.div)`
  color: #fff;
  font-size: 1.3rem;
  letter-spacing: 1.5px;
  font-weight: 500;
  margin-top: 8px;
`;

const preloaderVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.7 } },
};

const dotVariants = {
  animate: (custom: number) => ({
    y: [0, -18, 0],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      delay: custom * 0.18,
    },
  }),
};

const circleVariants = {
  animate: (custom: { scale: number; delay: number }) => ({
    scale: [1, custom.scale, 1],
    opacity: [0.18, 0.28, 0.18],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      delay: custom.delay,
    },
  }),
};

const waveVariants = {
  animate: {
    x: [0, 20, -20, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
    },
  },
};

interface PreloaderProps {
  show: boolean;
  onStartExit?: () => void;
  onExitComplete?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ show, onStartExit, onExitComplete }) => {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {show && (
        <PreloaderWrapper
          variants={preloaderVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationStart={onStartExit}
        >
          {/* زخارف دوائر شفافة */}
          <DecorativeCircle
            style={{ width: 220, height: 220, left: '10%', top: '18%', background: 'linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)' }}
            custom={{ scale: 1.1, delay: 0 }}
            variants={circleVariants}
            animate="animate"
            initial={false}
          />
          <DecorativeCircle
            style={{ width: 140, height: 140, right: '12%', bottom: '20%', background: 'linear-gradient(135deg, #1565c0 0%, #2196f3 100%)' }}
            custom={{ scale: 1.15, delay: 0.7 }}
            variants={circleVariants}
            animate="animate"
            initial={false}
          />
          {/* زخرفة موجة */}
          <DecorativeWave
            as={motion.svg}
            viewBox="0 0 320 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={waveVariants}
            animate="animate"
            initial={false}
          >
            <motion.path
              d="M0 30 Q80 0 160 30 T320 30"
              stroke="#2196f3"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.18"
              fill="none"
            />
          </DecorativeWave>
          {/* الأنيميشن الأساسي */}
          <LoaderContainer>
            <Dots>
              {[0, 1, 2].map((i) => (
                <Dot
                  key={i}
                  custom={i}
                  variants={dotVariants}
                  animate="animate"
                />
              ))}
            </Dots>
            <LoaderText
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Loading Portfolio...
            </LoaderText>
          </LoaderContainer>
        </PreloaderWrapper>
      )}
    </AnimatePresence>
  );
};

export default Preloader; 