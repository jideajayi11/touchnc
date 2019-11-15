export const zeroPad = (value) => value<10 ? `0${value}` : value;

export default (date) =>
`${zeroPad(date.getFullYear())}-${zeroPad(date.getMonth()+1)}-${zeroPad(date.getDate())} ${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(date.getSeconds())}`;