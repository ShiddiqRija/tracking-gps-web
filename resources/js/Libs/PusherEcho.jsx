import Echo from "laravel-echo";

const EchoLaravel = new Echo({
    broadcaster: "pusher",
    key: "15cbbc10a7f0efd50461",
    cluster: "api",
    // forceTLS: "https"
});

export default EchoLaravel;
