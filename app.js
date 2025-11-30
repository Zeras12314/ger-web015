import data from "./data.json" with { type: "json" };
const lis = document.querySelectorAll('.weekly li');
const cardText = document.querySelectorAll('.reg-card-text');

lis.forEach(li => {
  li.addEventListener('click', function() {
    lis.forEach(el => el.classList.remove('active'));
    this.classList.add('active');
    populateCardData(li.innerText.toLowerCase())
  });
});

cardText.forEach(card => {
  card.addEventListener('click', function() {
    cardText.forEach(el => el.classList.remove('card-active'));
    this.classList.add('card-active');
  });
});

function populateCardData(timeframes){
    const cards = document.querySelectorAll('.reg-card');
    for(let card of cards){
         const title = card.querySelector('.reg-card-text .top h2');
        const cardData = data.filter(item => item.title === title.innerText);
        for(let item of cardData){
            const time = item.timeframes[timeframes]
            const currentTime = card.querySelector('.reg-card-text .bottom h2');
            const previousTime = card.querySelector('.reg-card-text .bottom h3');
            const h3Text = textTransform(timeframes);
            currentTime.innerText =`${time.current}hrs` 
            previousTime.innerText =`${h3Text} ${time.previous}hrs` 
        }
    }
}

function textTransform(str) {
  const map = {
    daily: 'Yesterday -',
    weekly: 'Last Week -',
    monthly: 'Last Month -'
  };
  return map[str] || 'Last Month -';
}


// default on load
window.addEventListener('DOMContentLoaded', () => {
  lis.forEach(li => {
    if (li.innerText.toLowerCase() === 'weekly') {
         li.classList.add('active');
      populateCardData('weekly');
    }
  });
});
