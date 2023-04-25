/* 
    these file are communicate to api in laravel
*/
import { ref } from "vue";
import axios from "axios";

//path back-end API
axios.defaults.baseURL = "http://127.0.0.1:8000/api/places/search/";

//function for communcate and fetch data from api will return listplaces and nextpage token
export default function searchPlaces() {
    let listPlaces = ref([]);
    let nextpagetoken = ref(null);
    const getlistPlaces = async (query,pageToken=null) => {
        let url = `${query}/`;
        if (pageToken!=null){
            url = `${query}/${pageToken}/`;
        }
        const response = await axios.get(url);
        console.log(query,pageToken)
        console.log(response)
        listPlaces.value = response.data.results;
        nextpagetoken.value = response.data.nextPagetoken || null;
        return response.data;
    };
    return { listPlaces, nextpagetoken, getlistPlaces };
}
