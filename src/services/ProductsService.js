const PRODUCTS = [
    {
        id: 100,
        name: 'NUDITY DETECTION',
        price: 'Detect raw and explicit nudity in images and videos',
        image: {uri:'https://sightengine.com/assets/img/examples/example-fac-1000.jpg'},
        description: 'Detect raw and explicit nudity in images and videos.'
    },
    {
        id: 101,
        name: 'Offensive Content Detection',
        price: 8699,
        image: {uri:'https://sightengine.com/assets/img/doc/offensive/offensive3.jpg'},
        description: 'The offensive model is useful to determine if an image or a video contains offensive content or hate content.'
    },
    {
        id: 102,
        name: 'Weapon Alcohol Drug Detection',
        price: 2999,
        image: {uri:'https://sightengine.com/assets/img/doc/wad/weapon/weapon3.jpg'},
        description: 'The Weapon Alcohol Drug detection model helps you determine if an image or video contains displays of weapons, alcoholic beverages, recreational drugs or medical drugs.'
    },
    {
        id: 103,
        name: 'Graphic Violence & Gore Detection',
        price: 1050,
        image: {uri:'https://sightengine.com/assets/img/examples/example-tt-1000.jpg'},
        description: 'We reveal something of our nature when we sing, something that can be disguised in our speaking voice..'
    },
    {
        id: 104,
        name: 'Text Moderation in Images/Videos',
        price: 2999,
        image: {uri:'https://sightengine.com/assets/img/examples/example-text-ocr-1.jpg'},
        description: 'The Visual Text Moderation API is useful to determine if an image or video contains unwanted text such as profanity or personally identifiable information.'
    },
    {
        id: 105,
        name: 'Scammer Detection',
        price: 2399,
        image: {uri:'https://sightengine.com/assets/img/doc/scammers/scammer1.jpg'},
        description: 'The Scammer Detection Model is useful to help detect and block common frauds on social networks and dating sites. The so-called scammers are romance scammers, military scammers or other types of scammers that trick people into sending them money.'
    }
];

export function getProducts() {
    return PRODUCTS;
}

export function getProduct(id) {
    return PRODUCTS.find((product) => (product.id == id));
}

