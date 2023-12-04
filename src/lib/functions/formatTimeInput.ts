export const formatTimeInput = (time: string) => {
    return time ? `${time.substring(0, 2)}:${time.substring(2, 4)}` : '';
};
