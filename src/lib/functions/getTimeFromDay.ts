export const getTimeFromDay = (dayString: string) => {
    const match = dayString.match(/:\s*(.+)/);
    return match ? match[1] : '';
};
