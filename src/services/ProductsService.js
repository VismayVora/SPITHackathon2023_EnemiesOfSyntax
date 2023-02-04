const PRODUCTS = [
    {
        id: 100,
        name: 'Lady',
        price: 51399,
        image: require('../assets/photo1.png'),
        description: 'This exquisite & original artwork is handmade by a disabled artist from Bengaluru. He has a Locomotor Disability. He is a filmmaker and art teacher. He lives with a cluster of dreams and hopes to turn them into reality..'
    },
    {
        id: 101,
        name: 'Black Paint in Vase',
        price: 8699,
        image: require('../assets/photo2.png'),
        description: 'The artist uses beautiful strokes of different colours to bring the elegant and unique black plant alive on canvas..'
    },
    {
        id: 102,
        name: 'Motherhood',
        price: 2999,
        image: require('../assets/photo3.png'),
        description: 'Even for a powerful creature such as this beautiful lioness, it is never simple raising young cubs. This painting tells us the struggles of motherhood and love of a mother for his child through beautiful work of art.'
    },
    {
        id: 103,
        name: 'Lost In Music',
        price: 1050,
        image: require('../assets/photo4.png'),
        description: 'We reveal something of our nature when we sing, something that can be disguised in our speaking voice..'
    },
    {
        id: 104,
        name: 'Magical Night',
        price: 2999,
        image: require('../assets/photo5.png'),
        description: 'Through a beautiful portrayal of firecrackers lighting up the night sky, the artist wants to capture the essence of joy, festivities, and togetherness.'
    },
    {
        id: 105,
        name: 'Beauty and Devotion',
        price: 2399,
        image: require('../assets/photo6.png'),
        description: 'Add vitality to your decor with this highly stylized, elaborate portrayal of Diya.'
    }
];

export function getProducts() {
    return PRODUCTS;
}

export function getProduct(id) {
    return PRODUCTS.find((product) => (product.id == id));
}

