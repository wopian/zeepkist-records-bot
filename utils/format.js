import { formatDistanceToNowStrict } from 'date-fns';
import { bold, hyperlink, italic } from 'discord.js';
import { ZEEPKIST_URL } from '../constants.js';
import { numberToMonospace } from './index.js';
export const formatRank = (rank) => bold(`${numberToMonospace(rank)}`.padStart(3, ' '));
export const formatLevel = (level) => `${hyperlink(level.name, `${ZEEPKIST_URL}/level/${level.id}`)} by ${italic(level.author)}`;
export const formatUser = (user) => hyperlink(user.steamName, `${ZEEPKIST_URL}/user/${user.steamId}`);
export const formatRelativeDate = (date) => {
    return formatDistanceToNowStrict(new Date(date), {
        addSuffix: true
    })
        .replaceAll('second', 'sec')
        .replaceAll('minute', 'min');
};
const pad = (number, size) => ('00000' + number).slice(size * -1);
export const formatResultTime = (input, precision = 4) => {
    const time = Number.parseFloat(input.toFixed(precision));
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time - minutes * 60);
    const milliseconds = Number.parseInt(input.toFixed(precision).split('.')[1]);
    let string = '';
    if (hours)
        string += `${pad(hours, 2)}:`;
    return (string += `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, precision)}`);
};
export const formatOrdinal = (number) => {
    const ordinals = ['th', 'st', 'nd', 'rd'];
    const modulo = number % 100;
    return (number + (ordinals[(modulo - 20) % 10] || ordinals[modulo] || ordinals[0]));
};
export const formatFlagEmoji = (countryCode) => {
    if (!countryCode)
        return '';
    const codePoints = [...countryCode.toUpperCase()].map(char => 127_397 + (char.codePointAt(0) ?? 0));
    return String.fromCodePoint(...codePoints);
};
