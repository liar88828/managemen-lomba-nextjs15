export const formatDate = (date: Date | string | number) => new Date(date).toLocaleDateString("id-ID")





export const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}