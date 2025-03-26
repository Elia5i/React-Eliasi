import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {  
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.title}</Text>
                </View>
            )}
        />
    );
};

export default AllProducts;
