const products = [
    {
        productId: 1,
        name: "headphones",
        typeOfProduct: 1,
        price: 100,
    },
    {
        productId: 2,
        name: "Shoes Nike",
        typeOfProduct: 2,
        price: 300,
    },
    {
        productId: 3,
        name: "hamburger",
        typeOfProduct: 3,
        price: 10,
    },
    {
        productId: 4,
        name: "Fries",
        typeOfProduct: 3,
        price: 5,
    },
    {
        productId: 5,
        name: "Sandwich",
        typeOfProduct: 3,
        price: 10,
    },
    {
        productId: 6,
        name: "laptop",
        typeOfProduct: 1,
        price: 100,
    },
    {
        productId: 7,
        name: "keyboard",
        typeOfProduct: 1,
        price: 50,
    },
    {
        productId: 8,
        name: "t-shirt",
        typeOfProduct: 2,
        price: 16,
    },
];

const typeOfProducts = [
    { id: 1, name: "Electronic" },
    { id: 2, name: "Clothes" },
    { id: 3, name: "Food" }
];

const discountsHolyDays = [
    { typeOfProduct: 1, discountApply: true, value: 10 },
    { typeOfProduct: 2, discountApply: false, value: 0 },
    { typeOfProduct: 3, discountApply: true, value: 30 },
];

// Functions

const isAlready = (producto) => {
    const isAlready = products.find(prod => prod.productId === producto.productId)
    if (isAlready) throw new Error("Producto repetido")
}

const validateType = (producto) => {
    const type = typeOfProducts.find(tp => tp.name === producto.typeOfProcuct)
    if (!type) throw new Error("El tipo del producto no existe")
}

const añadirProducto = (newProduct) => {
    try {

        newProduct.productId = newProduct.id
        delete newProduct.id

        isAlready(newProduct)
        validateType(newProduct)

        products.push({ ...newProduct })

    } catch (error) {
        return {
            id: newProduct.productId,
            status: 'error',
            message: error.message
        }
    }

    return {
        id: newProduct.productId,
        status: 'succes',
        message: '¡Registro exitoso!'
    }
}


//// Activity

// cada solución debe de crearse con metodo que retorne el resultado esperado de cada punto
// y su llamda del metodo con un console.log donde muestre la información

/// 1 - ¿Cuál es el promedio de valor de cada tipo de producto?

let promedioTipoProducto = typeOfProducts.reduce((prev, current) => ({
    ...prev, [current.name]: {
        sumatoria: 0,
        contador: 0,
        promedio: 0
    }
}), {})

// promedioTipoProducto = {
//     Electronic: {
//         sumatoria: 0,
//         contador: 0,
//         promedio: 0
//     },
//     Clothes: {
//         sumatoria: 0,
//         contador: 0,
//         promedio: 0
//     },
//     Food: {
//         sumatoria: 5500,
//         contador: 2,
//         promedio: 3800
//     }
// }

products.forEach(producto => {
    const nameTypeProduct = typeOfProducts.find(tp => tp["id"] === producto["typeOfProduct"])?.name;
    if (nameTypeProduct) {
        promedioTipoProducto[nameTypeProduct].contador++;
        promedioTipoProducto[nameTypeProduct].sumatoria += producto.price;
        promedioTipoProducto[nameTypeProduct].promedio = promedioTipoProducto[nameTypeProduct].sumatoria / promedioTipoProducto[nameTypeProduct].contador;
    }
})

console.log("====================> PUNTO 1");

Object.keys(promedioTipoProducto).forEach(key => {
    console.log(`Promedio por tipo = ${promedioTipoProducto[key].promedio}`);
})


/// 2 - ¿Cuál es el producto más costoso de cada categoria?

const masCaroPorTypo = typeOfProducts.reduce((prev, current) => ({
    ...prev, [current.name]: {
        productId: 0,
        price: 0
    }
}), {})

products.forEach(producto => {
    const nameTypeProduct = typeOfProducts.find(tp => tp.id === producto.typeOfProduct)?.name;
    if (nameTypeProduct && producto.price > masCaroPorTypo[nameTypeProduct].price) {
        masCaroPorTypo[nameTypeProduct].productId = producto.productId;
        masCaroPorTypo[nameTypeProduct].price = producto.price;
    }
});

console.log("====================> PUNTO 2");

Object.keys(masCaroPorTypo).forEach(key => {
    console.log(`Más costoso ${key} = ${masCaroPorTypo[key].productId}`);
});

/// 3 - ¿Exite algún producto de tipo Electronico que cueste $100?

const existeProductoConValor100 = products.some(producto => producto.price === 100 && typeOfProducts.find(tp =>
    tp.id === producto.typeOfProduct).name.includes("Electronic")
);

console.log("====================> PUNTO 3");

console.log(existeProductoConValor100);

/// 4 - Obtener todos los productos que en nombre tengan las letra S.

const productosConLetraS = products.filter(producto => producto.name.includes("S"))

console.log("====================> PUNTO 4");
productosConLetraS.forEach(producto => {
    console.log(`${producto.name}`);
});

/// 5 - Crear un arreglo de objetos con la siguiente información: { productId: 7 ,nameProduct: 'keyboard', typeOfProduct: 'Electronic', discount: '10', applyDiscount: true}

const newProductList_1 = products.map(producto => {

    const { productId, name, typeOfProduct } = producto;

    const descuento = discountsHolyDays.find(descuento => descuento.typeOfProduct === typeOfProduct);

    return {
        productId,
        nameProduct: name,
        typeOfProduct: typeOfProducts.find(tipo => tipo.id === typeOfProduct).name,
        discount: descuento.value,
        applyDiscount: descuento.discountApply
    }
})

console.log("====================> PUNTO 5");
console.log(newProductList_1);


/// 6. Crear un arreglo de objetos con la siguiente información: { productId: 7, priceWithDiscount: 45}

const newProductList_2 = products.map(producto => {

    const { productId, price, typeOfProduct } = producto;

    const descuento = discountsHolyDays.find(descuento => descuento.typeOfProduct === typeOfProduct);

    return {
        productId,
        priceWithDiscount: descuento.discountApply ? (price * descuento.value) / 100 : price
    }
})

console.log("====================> PUNTO 6");
console.log(newProductList_2);


// 7. Agregar los siguientes productos, y crear un arreglo con el resultado, ejemplo: [{id: 9, status: 'succes', id:10: status: 'error': message: 'error message'}];

const newProducts = [
    {
        id: 9,
        name: 'Tucson',
        typeOfProcuct: 'Car',
        discount: 10,
    }, {
        id: 10,
        name: 'Jeep',
        typeOfProcuct: 'Car',
        discount: 10,
    }, {
        id: 10,
        name: 'Screen',
        typeOfProcuct: 'Electronic'
    }, {
        id: 1,
        name: 'Mouse',
        typeOfProcuct: 'Electronic'
    }
]

const respuestas = newProducts.map(producto => {
    return añadirProducto(producto)
})

console.log("====================> PUNTO 7");
respuestas.forEach(producto => {
    console.log("ESTADO = ", producto.status)
    console.log("MENSAJE = ", producto.message)
})



