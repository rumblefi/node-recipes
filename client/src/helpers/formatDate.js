export const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString('ru-RU')
    const newTime = new Date(date).toLocaleTimeString('ru-RU')
    return `${newDate} at ${newTime}`
}