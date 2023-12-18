export const URL_API = 'http://localhost:3001';

export const backgroundList = ['#F4D799', '#F9F3E5', '#FFF0EE', '#F6A89E', '#D0F4F0'];

interface ColorMapLabel {
    [key: string]: { color: string; label: string };
}

export const colorMapLabel: ColorMapLabel = {
    '0': {
        color: '#00000000',
        label: 'Thong thả'
    },
    '1': {
        color: '#4bce97',
        label: 'Khẩn trương'
    },
    '2': {
        color: '#FAA53D',
        label: 'Gấp'
    },
    '3': {
        color: '#f87462',
        label: 'Nước sôi'
    }
};