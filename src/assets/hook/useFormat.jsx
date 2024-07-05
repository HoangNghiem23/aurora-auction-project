export const formatMoney = (amount) => {
    return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}