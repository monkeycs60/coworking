export const formatTimeInput = (time: string | undefined | null) => {
    if (!time || time.length < 4) {
        return '';
    }
    return `${time.substring(0, 2)}:${time.substring(2, 4)}`;
};