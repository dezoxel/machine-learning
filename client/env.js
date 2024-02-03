const default_api_host = "http://localhost:3000";

window.__env = window.__env || {
    api_host: null ?? default_api_host,
};
