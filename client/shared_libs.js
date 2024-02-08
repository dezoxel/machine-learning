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

function get_number_input_value(id) {
    const input_element = document.getElementById(id);
    if (input_element && input_element.value) {
        return parseFloat(input_element.value);
    } else {
        throw new Error(`get_number_input_value: Unable to find element with id: ${id}`);
    }
}

function set_number_to_html(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.innerText = value;
    } else {
        throw new Error(`set_number_to_html: Unable to find element with id: ${id}`);
    }
}

function get_number_from_html(id) {
    const el = document.getElementById(id);
    if (el) {
        return parseFloat(el.innerText);
    } else {
        throw new Error(`get_number_from_html: Unable to find element with id: ${id}`);
    }
}

// TODO: throw an error if not found
function get_string_input_value(id) {
    const input_element = document.getElementById(id);
    if (input_element && input_element.value) {
        return input_element.value;
    }
    return null;
}

function get_matrix_col(matrix, col_index) {
    return matrix.map((row) => row[col_index]);
}

function get_matrix_row(matrix, row_index) {
    return matrix[row_index];
}

function get_env_var(key) {
    const value = window.__env[key];

    if (value === undefined) {
        throw new Error(`env.js: Env var is undefined: ${key}`);
    }

    return value;
}

function create_w_inputs(containerId, w_vector) {
    const container = document.getElementById(containerId);

    w_vector.forEach((w, j) => {
        const label = document.createElement('label');
        label.setAttribute('for', `w_input_${j}`);
        label.innerHTML = `w<sub>(${j})</sub>:`;

        const input = document.createElement('input');
        input.type = 'number';
        input.id = `w_input_${j}`;
        input.value = w;
        input.placeholder = `w${j}`;
        input.step = '10';

        container.appendChild(label);
        container.appendChild(input);
    });
}

function create_training_set_to_prediction_charts(containerId, n) {
    const container = document.getElementById(containerId);

    for (let j = 0; j < n; j++) {
        const chart = document.createElement('div');
        chart.id = `training_set_to_prediction_chart_${j}`;

        container.appendChild(chart);
    }
}

function get_w_vector_from_html(containerId) {
    const w_vector_html = document.getElementById(containerId).children;

    const w_vector = Array.from(w_vector_html)
        .filter((input) => input.tagName === 'INPUT')
        .map((input) => parseFloat(input.value));

    return w_vector;
}

function update_w_inputs(w_vector) {
    w_vector.forEach((w, j) => {
        const input = document.getElementById(`w_input_${j}`);
        input.value = w;
    });
}