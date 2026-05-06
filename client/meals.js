// This function gets meals from the backend API
async function getMeals() {

    // Get values from input fields
    var search = document.getElementById("search").value;
    var restaurant = document.getElementById("restaurant").value;
    var sort = document.getElementById("sort").value;

    // Start API URL
    var url = "/api/meals?";

    // Add search if user typed something
    if (search !== "") {
        url = url + "search=" + search + "&";
    }

    // Add restaurant filter if user typed something
    if (restaurant !== "") {
        url = url + "restaurant=" + restaurant + "&";
    }

    // Add sort option if selected
    if (sort !== "") {
        url = url + "sort=" + sort + "&";
    }

    try {
        // Call backend API
        var response = await fetch(url);

        // Convert response to JSON
        var data = await response.json();

        // Show results on page
        showMeals(data);

    } catch (error) {
        document.getElementById("results").innerHTML =
            "Error loading data";
    }
}

// This function displays meals on the page
function showMeals(meals) {

    var results = document.getElementById("results");
    results.innerHTML = "";

    // If no results found
    if (meals.length === 0) {
        results.innerHTML = "No meals found";
        return;
    }

    // Loop through meals and display them
    for (var i = 0; i < meals.length; i++) {

        results.innerHTML +=
            "<h3>" + meals[i].meal + "</h3>" +
            "<p>Restaurant: " + meals[i].restName + "</p>" +
            "<p>Rating: " + meals[i].rating + "</p>" +
            "<hr>";
    }
}

// This function clears inputs and reloads all meals
function clearFilters() {

    document.getElementById("search").value = "";
    document.getElementById("restaurant").value = "";
    document.getElementById("sort").value = "";

    getMeals();
}
