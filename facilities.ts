import type { LatLng } from "react-native-maps";
import type { ImageSourcePropType } from 'react-native';

interface DonationCentre {
    name: string,
    cardName: string,
    fullName: string,
    progress: number,
    thumbnail: ImageSourcePropType,
    coordinates: LatLng,
    pinType: 'food' | 'medicine' | 'emergency' | 'clothing',
    distance: string,
    travelTime: string,
    openTimes: string[],
    website: string,
    phoneNumber: string
    featured: boolean,
}

interface Database {
    category: string,
    locations: DonationCentre[]
}

const pins = {
    'food': require('./assets/food_pin.png'),
    'medicine': require('./assets/medicine_pin.png'),
    'emergency': require('./assets/emergency_pin.png'),
    'clothing': require('./assets/clothing_pin.png')
}

const categoryIcons = {
    'Food': require('./assets/food_gradient_icon.png'),
    'Medicine': require('./assets/medicine_gradient_icon.png'),
    'Emergency': require('./assets/emergency_gradient_icon.png'),
    'Clothing': require('./assets/clothing_gradient_icon.png')
}

const facilities:Database[] = [
    {
        category: "Food",
        locations: [
            {
                featured: true,
                name: "DB Food Bank",
                cardName: "DB Food Bank",
                fullName: "Daily Bread Food Bank",
                progress: 0.8,
                thumbnail: require("./assets/thumbnails/daily_bread_food_bank.png"),
                coordinates: { latitude: 43.658368, longitude: -79.386256 },
                pinType: 'food',
                distance: '450 m',
                travelTime: '5 min',
                openTimes: [
                    '10:00 am &ndash; 5:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 6:00 pm',
                    '10:00 am &ndash; 5:00 pm',
                ],
                website: 'https://www.dailybread.ca',
                phoneNumber: '(416) 203-0050'
            },
            {
                featured: false,
                name: "Toronto Food Bank",
                cardName: "Toronto Food Bank",
                fullName: "Toronto Food Bank",
                progress: 0.35,
                thumbnail: require("./assets/thumbnails/toronto_food_bank.png"),
                coordinates: { latitude: 43.648586, longitude: -79.376409 },
                pinType: 'food',
                distance: '8 km',
                travelTime: '1 hr 12 min',
                openTimes: [
                    '10:00 am &ndash; 5:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 6:00 pm',
                    '10:00 am &ndash; 5:00 pm',
                ],
                website: 'https://www.dailybread.ca',
                phoneNumber: '(416) 203-0050'
            },
            {
                featured: true,
                name: "UTSU Food Bank",
                cardName: "UTSU Food Bank",
                fullName: "UTSU Food Bank",
                progress: 0.5,
                thumbnail: require("./assets/thumbnails/utsu_food_bank.png"),
                coordinates: { latitude: 43.660607, longitude: -79.397443 },
                pinType: 'food',
                distance: '650 m',
                travelTime: '8 min',
                openTimes: [
                    '10:00 am &ndash; 5:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 6:00 pm',
                    '10:00 am &ndash; 5:00 pm',
                ],
                website: 'https://www.dailybread.ca',
                phoneNumber: '(416) 203-0050'
            }
        ],
    },
    {
        category: "Clothing",
        locations: [
            {
                featured: true,
                name: "Yorkville Clothing Bank",
                cardName: "Yorkville Clothing Bank",
                fullName: "Yorkville Clothing Bank",
                progress: 0.5,
                thumbnail: require("./assets/thumbnails/utsu_food_bank.png"),
                coordinates: { latitude: 43.671721, longitude: -79.394911 },
                pinType: 'clothing',
                distance: '1 km',
                travelTime: '20 min',
                openTimes: [
                    '10:00 am &ndash; 5:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 6:00 pm',
                    '10:00 am &ndash; 5:00 pm',
                ],
                website: 'https://www.dailybread.ca',
                phoneNumber: '(416) 203-0050'
            },
        ]
    },
    {
        category: "Emergency",
        locations: [
            {
                featured: true,
                name: "AGO E-Shelter",
                cardName: "AGO Emergency Shelter",
                fullName: "AGO Emergency Shelter",
                progress: 0.35,
                thumbnail: require("./assets/thumbnails/toronto_food_bank.png"),
                coordinates: { latitude: 43.654170, longitude: -79.392767 },
                pinType: 'emergency',
                distance: '2 km',
                travelTime: '45 min',
                openTimes: [
                    '10:00 am &ndash; 5:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 6:00 pm',
                    '10:00 am &ndash; 5:00 pm',
                ],
                website: 'https://www.mountsinai.on.ca/',
                phoneNumber: '(416) 596-4200'
            },
        ]
    },
    {
        category: "Medicine",
        locations: [
            {
                featured: true,
                name: "Mount Sinai Hospital",
                cardName: "Mount Sinai Hospital",
                fullName: "Mount Sinai Hospital",
                progress: 0.8,
                thumbnail: require("./assets/thumbnails/daily_bread_food_bank.png"),
                coordinates: { latitude: 43.65743253263098, longitude: -79.39033394377194 },
                pinType: 'medicine',
                distance: '4 km',
                travelTime: '1 hr 15 min',
                openTimes: [
                    '10:00 am &ndash; 5:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 7:00 pm',
                    '9:00 am &ndash; 6:00 pm',
                    '10:00 am &ndash; 5:00 pm',
                ],
                website: 'https://www.dailybread.ca',
                phoneNumber: '(416) 203-0050'
            },
        ]
    },
];

export { facilities, pins, categoryIcons, DonationCentre, Database };
