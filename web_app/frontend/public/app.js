
var map = L.map('map').setView([22.2973142 ,73.1942567], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var marker = L.marker([22.2973142 ,73.1942567]).addTo(map);
var circle = L.circle([22.2973142 ,73.1942567], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
coords = [[73.1841, 22.2988],[22.3147, 73.1601],[22.3018, 73.2064],[22.3298, 73.2241]]

let l = coords.length;

var icon = document.querySelector('#icon');

for (let i = 0; i < l; i++) {
    var pop = L.popup({
        closeOnClick:true

    }).setContent('latlang'+coords[i]);

    

	var markere = L.marker(coords[i]).addTo(map).bindPopup(pop).openPopup();
             
    var toollip = L.tooltip({
        permanent: false

    }).setContent(''+coords[i]);
    
    markere.bindTooltip(toollip);
    
}


map.on('click', function(e) {
    
    L.marker(e.latlng).addTo(map).bindPopup(popup).bindTooltip(toolip);  
    
    var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(''+e.latlng)
    .openOn(map);

    
    var toolip = L.tooltip({
        permanent: false

    })
    .setContent('dss'+e.latlng)
    .openOn(map);
    
    

    
});
icon.addEventListener("mouseover",()=>{
    map.flyTo([22.3147, 73.1601],14);
})
map.on('click', onClick);
map.off('click', onClick);

