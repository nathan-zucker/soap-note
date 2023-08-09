import { useState, useEffect } from "react";
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";

const NUM_ITEMS = 10;

const initialData = [...Array(NUM_ITEMS)].map((item, index) => {
    
    function getColor (i, numItems) {
        const multiplier = 255 / (numItems - 1);
        const colorVal = i * multiplier;
        return `rgb(${colorVal}, ${128 - colorVal}, ${255 - colorVal})`;
    }

    return {
        text: `${index}`,
        key: `${index}`,
        backgroundColor: getColor(index, NUM_ITEMS),
    }
})

export function DemoDraglist () {
    const [data, setData] = useState(initialData);

    useEffect(()=>{
        //  UPDATING...
        return;
    },[data])

    const renderItem = ({item, drag, isActive}) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                        styles.rowItem,
                        { backgroundColor: isActive ? "orangered" : item.backgroundColor },
                    ]}
                >
                    <Text style={styles.text}>{item.text}</Text>
                </TouchableOpacity>
            </ScaleDecorator>
        )
    }

    return (
        <DraggableFlatList
            data={data}
            onDragEnd={({data}) => setData(data)}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
        />
    )

}

const styles = StyleSheet.create({
    rowItem: {
      height: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
  });