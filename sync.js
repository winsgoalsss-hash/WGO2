/* === รวมฟังก์ชันทั้งหมดจากโค้ดเดิม === */
const MIN_USERS = 504084;
const MAX_USERS = 850602;
const UPDATE_INTERVAL = 3000;
const ANIMATION_DURATION = 1200;
window.globalOnlineUsers = Math.floor((MIN_USERS + MAX_USERS) / 2);
let currentUsers = window.globalOnlineUsers;
let isAnimating = false;

function animateCounter(targetValue){
  if(isAnimating) return;
  isAnimating = true;
  const startValue = currentUsers;
  const range = targetValue - startValue;
  const frameDuration = 20;
  const totalFrames = Math.ceil(ANIMATION_DURATION / frameDuration);
  let currentFrame = 0;
  const timer = setInterval(() => {
    currentFrame++;
    const progress = currentFrame / totalFrames;
    const calculatedValue = startValue + (range * progress);
    const displayValue = Math.round(calculatedValue);
    window.globalOnlineUsers = displayValue;
    const onlineEl = document.getElementById('onlineCount');
    if(onlineEl) onlineEl.textContent = displayValue.toLocaleString();
    if(currentFrame >= totalFrames){
      clearInterval(timer);
      currentUsers = targetValue;
      isAnimating = false;
    }
  }, frameDuration);
}

function updateOnlineCounter(){
  const randomChange = Math.floor(Math.random() * 12) - 6;
  let newTarget = currentUsers + randomChange;
  newTarget = Math.max(MIN_USERS, Math.min(MAX_USERS, newTarget));
  newTarget = Math.floor(newTarget);
  if(newTarget !== currentUsers){
    animateCounter(newTarget);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const headerEl = document.getElementById('onlineCount');
  if(headerEl) headerEl.textContent = currentUsers.toLocaleString();
  setInterval(updateOnlineCounter, UPDATE_INTERVAL);
});
