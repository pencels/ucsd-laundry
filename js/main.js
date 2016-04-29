//======= Load database information into elements for each page ========
const BASE_REF_URL = 'https://dazzling-heat-5084.firebaseio.com/';
const COLLEGES = ['revelle', 'muir', 'marshall', 'warren', 'erc', 'sixth'];

$('.navbar-header .navbar-brand').on('click', function (event) {
    $('.nav li.active').removeClass('active');
});

//=============================================================================
// Parses the JSON of a college's laundry location, returning a string of
// the HTML skeleton for displaying on page.
//=============================================================================
function parseLocations(college, locations) {
    $('div#' + college + '-tab').html('');
    Object.keys(locations).forEach(function (name) {
        var box = document.createElement('div');
        var header = document.createElement('h2');
        header.appendChild(document.createTextNode(name));
        box.appendChild(header);
        console.log('finding: ' + college);
        $('div#' + college + '-tab').append(box);
    });
}

function loadDB(college) {
    var college_ref = new Firebase(BASE_REF_URL + 'colleges/' + college);
    var college_tab = $('div#' + college + '-tab');

    // attach async callback to update data
    college_ref.on('value', function (snap) {
        var locations = snap.val();
        parseLocations(college, locations);
        //college_tab.text(JSON.stringify(locations));
    });
}

COLLEGES.forEach(function (college) {
    var tab = $('li.' + college + '-nav');
    tab.on('click', {college: college}, function (event) {
        loadDB(event.data.college);
    });
});
