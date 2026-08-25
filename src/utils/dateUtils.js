export const formatToDateTimeLocal = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

export const formatToISO = (datetimeLocalString) => {
    if (!datetimeLocalString) return '';
    return new Date(datetimeLocalString).toISOString();
}

export const getExamStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return {label: 'A venir', badgeClass: 'badge-neutral'};
    if (now >= start && now <= end) return {label: 'En cours', badgeClass: 'badge-success'};
    return {label: 'Terminé', badgeClass:  'badge-danger'};
};