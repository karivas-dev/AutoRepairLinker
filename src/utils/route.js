import route from 'ziggy-js';
import axios from "axios";
import {getAuthToken} from "../context/AuthContext";

const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/ziggy`);
const Ziggy = await response.data;

export function ziggyRoute(routeName = null, routeParameters = undefined) {
    return route(routeName, routeParameters, undefined, Ziggy);
}

const defaultAxios = axios.create({
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
    }
});

class axios_routed {
    constructor() {
        this.refreshToken();
    }

    async refreshToken() {
        defaultAxios.defaults.headers.common['Authorization'] = `Bearer ${await getAuthToken()}`;
    }

    get(routeName, routeParameters = null, config = undefined) {
        return defaultAxios.get(ziggyRoute(routeName, routeParameters), config);
    }

    delete(routeName, routeParameters = null, config = undefined) {
        return defaultAxios.delete(ziggyRoute(routeName, routeParameters), config)
    }

    post(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.post(ziggyRoute(routeName, routeParameters), data, config);
    }

    put(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.put(ziggyRoute(routeName, routeParameters), data, config);
    }

    patch(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.patch(ziggyRoute(routeName, routeParameters), data, config);
    }

    postForm(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.postForm(ziggyRoute(routeName, routeParameters), data, config)
    }

    putForm(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.putForm(ziggyRoute(routeName, routeParameters), data, config)
    }

    patchForm(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.patchForm(ziggyRoute(routeName, routeParameters), data, config)
    }
}

const axiosRoute = Object.freeze(new axios_routed());
export default axiosRoute;