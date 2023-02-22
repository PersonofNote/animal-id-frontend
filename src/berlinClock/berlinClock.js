const secondsLights = require('./secondsLights');

const berlinClock = (time) => {

    const [hours, minutes, seconds] = time.split(':').map(Number);
  
    const secondsLamp = secondsLights(seconds);
  
    const topHoursLamps = Array(4).fill('O');
    for (let i = 0; i < Math.floor(hours / 5); i++) {
      topHoursLamps[i] = 'R';
    }
  
    const topMinutesLamps = Array(11).fill('O');
  
    for (let i = 0; i < Math.floor(minutes / 5); i++) {
      if ((i + 1) % 3 === 0) {
        topMinutesLamps[i] = 'R';
      } else {
        topMinutesLamps[i] = 'Y';
      }
    }
    

    const bottomMinutesLamps = Array(4).fill('O');
    //
  
    return `${secondsLamp}\n${topHoursLamps.join('')}\n${bottomHoursLamps.join('')}\n${topMinutesLamps.join('')}\n${bottomMinutesLamps.join('')}`;
  }
  
  module.exports = berlinClock;
  
  
  
  
  
  