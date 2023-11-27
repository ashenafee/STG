const facilities = [
    {
        category: "Food",
        locations: [
            {
                name: "DB Food Bank",
                progress: 0.8,
                thumbnail: require("./assets/thumbnails/daily_bread_food_bank.png")
            },
            {
                name: "Toronto Food Bank",
                progress: 0.35,
                thumbnail: require("./assets/thumbnails/toronto_food_bank.png")
            },
            {
                name: "UTSU Food Bank",
                progress: 0.5,
                thumbnail: require("./assets/thumbnails/utsu_food_bank.png")
            }
        ],
    },
    {
        category: "Clothing",
        locations: [
            {
                name: "UTSU Food Bank",
                progress: 0.5,
                thumbnail: require("./assets/thumbnails/utsu_food_bank.png")
            },
        ]
    },
    {
        category: "Emergency",
        locations: [
            {
                name: "Toronto Food Bank",
                progress: 0.35,
                thumbnail: require("./assets/thumbnails/toronto_food_bank.png")
            },
        ]
    },
    {
        category: "Medicine",
        locations: [
            {
                name: "Daily Bread Food Bank",
                progress: 0.8,
                thumbnail: require("./assets/thumbnails/daily_bread_food_bank.png")
            },
        ]
    },
];

export default facilities;
