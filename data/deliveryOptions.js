// normalizzazione =  [mettiamo queste informazioni di spedzione relative ai prodotti in un altro object, che si unira in una intersezione tra tabelle grazie all id che verrà inserito anche nell'altro object (cart)]

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; // default export

export default function isWeekend(oggi) {
  const day = oggi.format('dddd');
  return (day === 'Saturday' || day === 'Sunday') 
  ? true
  : false;
}

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function  getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    })

    return deliveryOption ||  deliveryOptions[0];  // valore di default (per sicurezza)
}

export function calculateDeliveryDate(deliveryOption) {
      let deliveryDate = dayjs();
      let i = 0;
      while (i < deliveryOption.deliveryDays) {
        deliveryDate = deliveryDate.add(1, 'days');
        if (isWeekend(deliveryDate)) {
          continue
        }
        i++;
      }
      return deliveryDate.format ('dddd MMMM D');
}

export function convertDate(date) {
  return dayjs(date).format("MMMM D");
}

export function getDay(date) {
  return dayjs(date).format("dddd");
}