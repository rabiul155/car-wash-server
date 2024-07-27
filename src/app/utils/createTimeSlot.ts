import { SlotType } from '../modules/slot/slot.interface';

function timeStringToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

function timeNumberToString(timeNum: number) {
  const hour = String(timeNum / 60).padStart(2, '0');
  const min = String(timeNum % 60).padStart(2, '0');
  const time = `${hour}:${min}`;
  return time;
}

const createTimeSlot = (data: SlotType, duration: number) => {
  const slots: SlotType[] = [];
  const startTime = timeStringToMinutes(data.startTime);
  const endTime = timeStringToMinutes(data.endTime);
  const slot = (endTime - startTime) / duration;

  if (slot <= 0) {
    return [];
  }

  for (let i = 0; i < slot; i++) {
    const payload = { ...data };
    payload.startTime = timeNumberToString(startTime + i * duration);
    payload.endTime = timeNumberToString(startTime + i * duration + duration);
    slots.push(payload);
  }

  return slots;
};

export default createTimeSlot;
