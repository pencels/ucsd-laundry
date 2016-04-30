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
    var college_tab = $('div#' + college + '-tab');
    college_tab.html('');

    Object.keys(locations).forEach(function (name) {
        var box = document.createElement('div');
        box.setAttribute('class',  college + ' location');

        // HEADER
        var header = document.createElement('h2');
        header.appendChild(document.createTextNode(name));
        box.appendChild(header);

        // ROOMS
        Object.keys(locations[name]).forEach(function (room) {
            var room_box = document.createElement('div');
            room_box.setAttribute('class', college + ' room');

            var room_header = document.createElement('h4');
            room_header.appendChild(document.createTextNode(room));
            room_box.appendChild(room_header);

            Object.keys(locations[name][room]).forEach(function (machine) {
                console.log(machine + ':' + typeof machine);
                room_box.appendChild(document.createTextNode(locations[name][room][machine]));
            });

            box.appendChild(room_box);
        });

        console.log('finding: ' + college + ' at ' + college_tab.selector);
        college_tab.append(box);
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
    loadDB(college);
});
