import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SplashLogoProps = {
  show: boolean;
  onFinish: () => void;
};

const FALLBACK_LOGOS = [
  '/logo%20per%20sito.gif',
  '/insert.png',
  '/daniele.jpeg',
];

const SplashLogo = ({ show, onFinish }: SplashLogoProps) => {
  const [logoSrc, setLogoSrc] = useState<string>('/logo.png');
  const [fbIdx, setFbIdx] = useState(0);
  const showRef = useRef<boolean>(show);
  const settledRef = useRef<boolean>(false);
  const onFinishRef = useRef<() => void>(onFinish);

  useEffect(() => {
    showRef.current = show;
  }, [show]);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const tryClose = () => {
      if (settledRef.current) return;
      if (!showRef.current) return;
      settledRef.current = true;
      try { onFinishRef.current(); } catch {}
    };
    const t1 = window.setTimeout(tryClose, 1800);
    const t2 = window.setTimeout(tryClose, 3200);
    const t3 = window.setTimeout(tryClose, 5000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (show) {
      settledRef.current = false;
      setLogoSrc('/logo.png');
      setFbIdx(0);
    }
  }, [show]);

  const handleImgError = () => {
    const next = FALLBACK_LOGOS[fbIdx] ?? FALLBACK_LOGOS[FALLBACK_LOGOS.length - 1];
    setLogoSrc(next);
    setFbIdx((i) => Math.min(i + 1, FALLBACK_LOGOS.length));
  };

  const close = () => {
    if (settledRef.current) return;
    if (!showRef.current) return;
    settledRef.current = true;
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
          transition={{ duration: 0.4 }}
          onClick={close}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -inset-32 bg-gradient-to-br from-brand-red/40 via-transparent to-brand-blue/40 blur-3xl" />
          </div>
          <motion.img
            src={logoSrc}
            alt="Lackierzentrum De Michele"
            className="w-[92vw] max-w-[980px] max-h-[55vh] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.65)] pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            onError={handleImgError}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[11px] tracking-[0.25em] uppercase whitespace-nowrap">
            Klicken zum Überspringen
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLogo;
