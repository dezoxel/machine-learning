function build_url(path, host) {
    const url = new URL(path, host);

    return url;
}

function build_url_with_query_string(path, host, params) {
    const search_params = new URLSearchParams(params);

    const url = build_url(path, host);

    url.search = search_params.toString();

    return url;
}

const handle_non_ok_response = (response) => {
    if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
};

const handle_error = (error) => {
    console.error(
        "There has been a problem with your fetch operation:",
        error
    );
};

function get_input_value(id) {
    const input_element = document.getElementById(id);
    if (input_element && input_element.value) {
        return parseFloat(input_element.value);
    }
    return null;
}

function get_matrix_col(matrix, col_index) {
    return matrix.map((row) => row[col_index]);
}

function get_matrix_row(matrix, row_index) {
    return matrix[row_index];
}