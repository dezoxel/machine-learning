const bind_event_listeners = () => {
    document.getElementById("train").addEventListener("click", train_app);
    document.getElementById("predict").addEventListener("click", predict_app);
}

function main() {
    bind_event_listeners()
    init_app();
}

main();