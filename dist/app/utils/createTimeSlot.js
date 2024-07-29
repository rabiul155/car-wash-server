"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timeStringToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}
function timeNumberToString(timeNum) {
    const hour = String(timeNum / 60).padStart(2, '0');
    const min = String(timeNum % 60).padStart(2, '0');
    const time = `${hour}:${min}`;
    return time;
}
const createTimeSlot = (data, duration) => {
    const slots = [];
    const startTime = timeStringToMinutes(data.startTime);
    const endTime = timeStringToMinutes(data.endTime);
    const slot = (endTime - startTime) / duration;
    if (slot <= 0) {
        return [];
    }
    for (let i = 0; i < slot; i++) {
        const payload = Object.assign({}, data);
        payload.startTime = timeNumberToString(startTime + i * duration);
        payload.endTime = timeNumberToString(startTime + i * duration + duration);
        slots.push(payload);
    }
    return slots;
};
exports.default = createTimeSlot;
