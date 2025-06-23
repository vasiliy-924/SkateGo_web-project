import { cubicBezier } from 'framer-motion';

// Общие настройки анимации
export const transition = {
  duration: 0.3,
  ease: cubicBezier(0.4, 0, 0.2, 1)
};

// Анимация появления страницы
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition
  },
  exit: {
    opacity: 0,
    y: -20,
    transition
  }
};

// Анимация для модальных окон
export const modalVariants = {
  initial: {
    opacity: 0,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { ...transition, duration: 0.2 }
  }
};

// Анимация для карточек
export const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  hover: {
    y: -5,
    transition: { ...transition, duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { ...transition, duration: 0.1 }
  }
};

// Анимация для списков
export const listItemVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Анимация для кнопок
export const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { ...transition, duration: 0.2 }
  },
  tap: {
    scale: 0.95,
    transition: { ...transition, duration: 0.1 }
  }
};

// Анимация для скелетона загрузки
export const skeletonVariants = {
  initial: {
    opacity: 0.5,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export const filterVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}; 