export const motionEase = [0.22, 1, 0.36, 1];

export const pageTransitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: motionEase,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export const sectionStaggerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 28, x:0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: motionEase,
    },
  },
};

export const fadeLeftVariants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: motionEase,
    },
  },
};

export const fadeRightVariants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: motionEase,
    },
  },
};

export const revealViewport = {
  once: true,
  amount: 0.18,
};
