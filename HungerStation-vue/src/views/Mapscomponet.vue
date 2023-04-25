/* 
  Map componet to see location
*/
<template>
    <GoogleMap
        api-key="AIzaSyCfWog1YDUkKF-Jiy6w-38WWbbFJxmRWxc"
        style="width: 100%; height: 100%"
        :center="markerPosition"
        :zoom="15"
    >
        <Marker :options="{ position: markerPosition }" />
    </GoogleMap>
</template>

<script>
import { defineComponent,ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import {eventBus} from '../eventbus.js'

export default defineComponent({
    components: { GoogleMap, Marker },
    created() {
        eventBus.on('functionCall', (location) => {
        this.updateMarkerPosition(location)
        })
    },
    props: {
        myArrayProp: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const center = { lat: 13.7563309, lng: 100.5017651 };
        const markerPosition = ref(props.myArrayProp)||ref(center);
        function updateMarkerPosition(location) {
            markerPosition.value = location;
            
        }
        return { center,markerPosition, updateMarkerPosition};
    },
});
</script>
