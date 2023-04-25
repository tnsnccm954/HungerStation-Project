

<template>
    <div class="d-flex " style="height: 100vh ;">
        <div
            class="d-flex flex-column align-items-stretch flex-shrink-0 p-2 bg-body-tertiary"
            style="width: 380px; height: auto ;"
        >
        <a class="text-center text-hunger fs-1 pt-2" style="text-decoration: none;" href="/">HungerStation </a>
            <div
                class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom"
            >
                <input class="form-control mx-1" type="text" v-model="searchTerm" placeholder="Search..." />
                <button class="btn btn-danger mx-1" @click="searchStation">Search</button>
            </div>
            <div
                class="list-group list-group-flush scrollarea px-2"
                style="min-height: auto !important;"
            >
                <a  :href="place.icon_mask_base_url"
                    class="list-group-item list-group-item-action py-3  lh-sm mt-3 rounded station"
                    v-for="place in listPlaces.slice(start,end)"
                    :key="place.id"
                    style="height: fit-content ;"
                    @click="changeposition(place.geometry.location)"
                >
                    <div
                        class="d-flex w-100 align-items-center justify-content-between"
                    >
                        <!--<img :src="place.photos" width="30" />-->
                        <strong class="mb-1">{{ place.name }}</strong>
                    </div>
                    <div class="col-10 mb-1 small">
                        Location: {{ place.formatted_address }}
                    </div>
                </a>
                <!-- :disabled="pageToken.value == null" -->
                <button class="btn btn-danger my-2 mx-1 mt-3 " @click="loadMore" >Next</button>
            </div>
        </div>
        
        <mapcomponet :my-array-prop="myArray" />
        
    </div>
    <!-- :disabled="nextpagetoken==null" -->
</template>

<script>
import { onMounted, ref, defineEmits } from "vue";
import searchPlaces from "../composables/searchPlace";
import mapcomponet from './Mapscomponet.vue'
import {eventBus} from '../eventbus.js'
export default {
    name:'App',
    components:{
        mapcomponet
    },
    data(){
        return{
            start:0,
            end:5,
            myArray: {
                lat:13.7563309,
                lng:100.5017651
            },
        }
    },
    props: {
        query: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const { listPlaces, nextpagetoken, getlistPlaces } = searchPlaces();
        let searchTerm = ref(props.query);
        let pageToken = ref(null);
        const start = ref(0);
        const end = ref(5);
        /*
            call function and sent value for arg
        */
        const searchStation = async () => {
            const result = await getlistPlaces(
                searchTerm.value,
                null
            );
            listPlaces.value = result.results;
            pageToken.value = result.nextPagetoken || null;
            props.myArray= listPlaces.value[0].geometry.location
            
        };
        const loadMore = async () => {
            if (end.value<20){
                start.value+=5
                end.value += 5
            }
            else{
                const changeresult = await getlistPlaces(
                    searchTerm.value,
                    pageToken.value
                );
                listPlaces.value = changeresult.results;
                if (listPlaces.value.length!=0){
                    pageToken.value = changeresult.nextPagetoken || null;
                }else{
                    await getlistPlaces(searchTerm.value,null)
                }
                start.value=0
                end.value = 5
            }
        };
        onMounted(() => {
            searchStation();
        });
        return {
            listPlaces,
            searchTerm,
            nextpagetoken,
            searchStation,
            loadMore,
            start,
            end,
        };
    },
    methods:{
        changeposition(location){
            this.myArray=location;
            console.log(location)
            eventBus.emit('functionCall',location);
        }
    }
};
</script>
