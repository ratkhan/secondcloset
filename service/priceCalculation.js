
const calculatePrice = (items, pricing ) => {
    let price;
    let itemsNumber;
    let discount;
    let flatFee = pricing.flat_fee;
    let pricePerValue;
    let pricePerVolume;
    let totalValue;
    let totalVolume;
    let step_size;
    let discount_step_per_step;
    let max_discount;

    switch (pricing.type) {
    case 'PLAIN':
        itemsNumber = items.length;
        discount = pricing.discount;
        flatFee = pricing.flat_fee;
        price = itemsNumber * flatFee * (1 - discount);
        break;
    case 'VALUE':
        totalValue = getValue(items);
        flatFee = pricing.flat_fee;
        pricePerValue = pricing.price_per_value;
        itemsNumber = items.length;
        price = itemsNumber * flatFee + pricePerValue * totalValue;
        break;
    case 'VOLUME':
        totalVolume = getVolume(items);
        flatFee = pricing.flat_fee;
        pricePerVolume = pricing.price_per_volume;
        itemsNumber = items.length;
        price = itemsNumber * flatFee + pricePerVolume * totalVolume;
        break;
    case 'NUMBER_VOLUME':
        totalVolume = getVolume(items);
        flatFee = pricing.flat_fee;
        pricePerVolume = pricing.price_per_volume;
        itemsNumber = items.length;
        discount = pricing.discount;
        step_size = pricing.step_size;
        discount_step_per_step = pricing.discount_step_per_step;
        max_discount = pricing.max_discount;
        let totalPricePerNumber = 0;
        let totalPricePerVolume = 0;
        let numberOfSteps = Math.floor(itemsNumber/step_size);
        let i;
        let currentDiscount = 0;
        for (i = 0; i < numberOfSteps; i++){
            if (currentDiscount < max_discount){
                currentDiscount = (discount + i * discount_step_per_step) <= max_discount?
                    discount + i * discount_step_per_step : max_discount;
            }
            totalPricePerNumber += step_size * flatFee * (1 - currentDiscount);
        }
        totalPricePerNumber += (itemsNumber % 100) * flatFee * (1 - currentDiscount);
        totalPricePerVolume = totalVolume * pricePerVolume;

        price = totalPricePerNumber + totalPricePerVolume;
        break;
    default:
        break;
    }

    return price;
};


const getVolume = (items) => {
    let volume = 0;
    items.forEach(item => {
        volume += Number(item.length) *
            Number(item.height) *
            Number(item.width);
    });

    return volume;
};

const getValue = (items) => {
    let totalValue = 0;
    items.forEach(item => {
        totalValue += Number(item.value);
    }
    );

    return totalValue;
};

module.exports = {
    calculatePrice,
    getVolume,
    getValue
};