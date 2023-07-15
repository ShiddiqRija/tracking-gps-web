import { Loader } from "@googlemaps/js-api-loader";

const gmapsLoader = new Loader({
    apiKey: 'AIzaSyCMuyTDQ4zd__ZPPja86kIefxTcK2fiqVE',
    version: "weekly",
    libraries: ['maps'],
});

export default gmapsLoader;