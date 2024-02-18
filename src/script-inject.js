const locationPath = window.location.href;

const isPhucLoiPath = locationPath.includes('phuc-loi');
const isThiLuyenPath = locationPath.includes('thi-luyen-tong-mon');
const isTruyenThua = locationPath.includes('mo-ra-truyen-thua');

const main = () => {
  if (!isPhucLoiPath && !isThiLuyenPath && !isTruyenThua) {
    return;
  }
  
  const counter = document.querySelector('.mycred-tbr-reward-counter');

  if (!counter) {
    return;
  }

  let [hour, minute, second] = counter.textContent.toUpperCase().split(' ');
  hour = parseInt(hour.replace('H', ''));
  minute = parseInt(minute.replace('M', ''));
  second = parseInt(second.replace('S', ''));

  const minutePlusOptional = 1;
  const timeout = (hour * 60 * 60 + minute * 60 + second + minutePlusOptional) * 1000;

  setTimeout(() => {
    document.querySelector('.mycred-tbr-claim-button').click()
  }, timeout);
}

setTimeout(main, 2000);

setTimeout(() => {
  window.location.reload()
}, 30000);
