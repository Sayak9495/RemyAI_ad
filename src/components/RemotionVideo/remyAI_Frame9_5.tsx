// Animation timing at 60fps
const INITIAL_DELAY = 0;
const MOVE_UP_DURATION = 24; // 0.4s
const CART_START_DELAY = INITIAL_DELAY + MOVE_UP_DURATION + 30; // Start moving cart after text moves up + 0.5s pause
const CART_DURATION = 60; // 1s
const CART_END_DELAY = CART_START_DELAY + CART_DURATION + 30; // Start fade after cart animation + 0.5s pause
const FADE_DURATION = 30; // 0.5s 