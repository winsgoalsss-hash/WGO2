<script>
const MIN_USERS = 504084;
const MAX_USERS = 850602;
const UPDATE_INTERVAL = 3000;   // ms
const ANIMATION_DURATION = 1200; // ms

// Shared state
window.globalOnlineUsers = Math.floor((MIN_USERS + MAX_USERS) / 2);
let currentUsers = window.globalOnlineUsers;
let isAnimating = false;

const counterEl_local = document.createElement('div'); // not used visually
const counterDisplay = document.getElementById('externalOnlineValue');

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
        // update shared state continuously so header can read same exact value
        window.globalOnlineUsers = currentUsers;
        counterDisplay.textContent = displayValue.toLocaleString();
        // also update the visible header count in sync
        const headerEl = document.getElementById('onlineCount');
        if(headerEl) headerEl.textContent = displayValue.toLocaleString();
        if(currentFrame >= totalFrames){
            clearInterval(timer);
            currentUsers = targetValue;
            window.globalOnlineUsers = targetValue;
            counterDisplay.textContent = targetValue.toLocaleString();
            if(headerEl) headerEl.textContent = targetValue.toLocaleString();
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

// Initialize display immediately (ensure header shows same)
document.addEventListener('DOMContentLoaded', function(){
    currentUsers = window.globalOnlineUsers;
    const headerEl = document.getElementById('onlineCount');
    if(headerEl) headerEl.textContent = currentUsers.toLocaleString();
    const ext = document.getElementById('externalOnlineValue');
    if(ext) ext.textContent = currentUsers.toLocaleString();
    // start updates
    setInterval(updateOnlineCounter, UPDATE_INTERVAL);
});

/* ===== Existing jackpot and coins scripts (preserved) ===== */

function formatNumber(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}
function animateNumber(id,tv,c=false,d=800){const e=document.getElementById(id),s=parseInt(e.textContent.replace(/[^\d]/g,''))||0,dif=tv-s,v=dif/20;let i=0;if(dif!==0){e.parentElement.classList.add('updated');if(id==='jackpotValue'||id==='todayPrize'){e.classList.add('updated');setTimeout(collectCoins,200)}const itv=setInterval(()=>{if(i<20){i++;const n=Math.floor(s+v*i);e.textContent=c?'฿'+formatNumber(n):formatNumber(n)}else{clearInterval(itv);e.textContent=c?'฿'+formatNumber(tv):formatNumber(tv);setTimeout(()=>{e.parentElement.classList.remove('updated');e.classList.remove('updated')},300)}},d/20)}else{setTimeout(()=>{e.parentElement.classList.remove('updated');e.classList.remove('updated')},300)}}
function createCoin(x,y,c,r,cl=false){const coin=document.createElement('div');coin.className='coin golden'+(cl?' collect':'');coin.innerHTML='฿';if(cl){let cx=r.width/2,cy=r.height/2;coin.style.cssText=`left:${x}px;top:${y}px;--sx:${x}px;--sy:${y}px;--tx:${cx-x}px;--ty:${cy-y}px`}else{let tx=(Math.random()-0.5)*300,ty=(Math.random()-0.5)*300;coin.style.cssText=`left:${x}px;top:${y}px;--tx:${tx}px;--ty:${ty}px`}c.appendChild(coin);setTimeout(()=>coin.remove(),2000)}
function burstCoins(e){const r=e.target.getBoundingClientRect(),c=e.target.querySelector('.coin-container');for(let i=0;i<40;i++)setTimeout(()=>createCoin(Math.random()*r.width,Math.random()*r.height,c,r),i*20)}
function collectCoins(){const b=document.querySelector('.jackpot-amount'),r=b.getBoundingClientRect(),c=b.querySelector('.coin-container');for(let i=0;i<12;i++)setTimeout(()=>{let a=Math.random()*2*Math.PI,m=Math.min(r.width,r.height)*0.7,x=Math.cos(a)*m+r.width/2,y=Math.sin(a)*m+r.height/2;createCoin(x,y,c,r,true)},i*100)}
function updateStats(){const o=parseInt(document.getElementById('onlineCount').textContent.replace(/[^\\d]/g,''))||0,w=parseInt(document.getElementById('todayWinners').textContent.replace(/[^\\d]/g,''))||3056,p=parseInt(document.getElementById('todayPrize').textContent.replace(/[^\\d]/g,''))||62587403;setInterval(()=>{if(Math.random()>0.3)animateNumber('onlineCount',Math.max(0,o+Math.floor(Math.random()*400-200)))},120000);setInterval(()=>{if(Math.random()>0.3)animateNumber('todayWinners',Math.max(3000,w+Math.floor(Math.random()*20-10)))},1000);setInterval(()=>{if(Math.random()>0.3)animateNumber('todayPrize',Math.max(60000000,p+Math.floor(Math.random()*153274-50000),true))},1000)}
function updateJackpot(){const j=parseInt(document.getElementById('jackpotValue').textContent.replace(/[^\\d]/g,''))||14420509,w=parseInt(document.getElementById('winnerCount').textContent.replace(/[^\\d]/g,''))||217,m=parseInt(document.getElementById('maxPrize').textContent.replace(/[^\\d]/g,''))||219435;setInterval(()=>{if(Math.random()>0.3)animateNumber('jackpotValue',Math.max(8888888,j+Math.floor(Math.random()*80000-40000),true))},1000);setInterval(()=>{if(Math.random()>0.3)animateNumber('winnerCount',Math.max(215,w+Math.floor(Math.random()*6-3)))},1000);setInterval(()=>{if(Math.random()>0.3)animateNumber('maxPrize',Math.max(200000,m+Math.floor(Math.random()*12000-6000),true))},1000)}
updateJackpot();updateStats();
</script>