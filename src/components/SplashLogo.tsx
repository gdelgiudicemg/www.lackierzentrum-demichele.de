import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SplashLogoProps = {
  show: boolean;
  onFinish: () => void;
};

const SplashLogo = ({ show, onFinish }: SplashLogoProps) => {
  const preferredLogoSrc = '/logo.png';
  const fallbackLogoSrc1 = '/logo per sito.gif';
  const fallbackLogoSrc2 = '/insert.png';
  const fallbackLogoSrc3 = '/daniele.jpeg';
  const [logoSrc, setLogoSrc] = useState(preferredLogoSrc);
  const [fallbackIdx, setFallbackIdx] = useState(0);
  const onFinishRef = useRef(onFinish);
  const doneRef = useRef(false);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    if (show) {
      setLogoSrc(preferredLogoSrc);
      setFallbackIdx(0);
      doneRef.current = false;
    }
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      try { onFinishRef.current(); } catch {}
    };
    const t = setTimeout(finish, 2200);
    const hard = setTimeout(finish, 3500);
    return () => {
      clearTimeout(t);
      clearTimeout(hard);
    };
  }, [show]);

  const handleImgError = () => {
    const fallbacks = [fallbackLogoSrc1, fallbackLogoSrc2, fallbackLogoSrc3];
    const next = Math.min(fallbackIdx, fallbacks.length - 1);
    setLogoSrc(fallbacks[next]);
    setFallbackIdx((i) => i + 1);
  };

  const skip = () => {
    if (!show || doneRef.current) return;
    doneRef.current = true;
    try { onFinishRef.current(); } catch {}
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-dark cursor-pointer select-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={skip}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -inset-32 bg-gradient-to-br from-brand-red/40 via-transparent to-brand-blue/40 blur-3xl" />
          </div>
          <motion.img
            src={logoSrc}
            alt="Lackierzentrum De Michele"
            className="w-[92vw] max-w-[980px] max-h-[55vh] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.65)] pointer-events-none"
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onError={handleImgError}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase">
            Click per saltare
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLogo;
