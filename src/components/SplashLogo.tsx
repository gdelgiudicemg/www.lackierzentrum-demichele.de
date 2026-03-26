import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SplashLogoProps = {
  show: boolean;
  onFinish: () => void;
};

const SplashLogo = ({ show, onFinish }: SplashLogoProps) => {
  const preferredLogoSrc = '/logo.png';
  const fallbackLogoSrc = '/daniele.jpeg';
  const [logoSrc, setLogoSrc] = useState(preferredLogoSrc);

  useEffect(() => {
    if (show) setLogoSrc(preferredLogoSrc);
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onFinish, 2200);
    return () => clearTimeout(t);
  }, [show, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-dark"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -inset-32 bg-gradient-to-br from-brand-red/40 via-transparent to-brand-blue/40 blur-3xl" />
          </div>
          <motion.img
            src={logoSrc}
            alt="Lackierzentrum De Michele"
            className="w-[92vw] max-w-[980px] max-h-[55vh] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onError={() => setLogoSrc(fallbackLogoSrc)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLogo;
