// adicionar no HTML
<div id="map" style="width: 100%; height: 600px"></div>

//  FUNÇÃO ANTES DO HTML 
function initMap(stations = null) {
    // MOSTRAR OS PONTOS NO MAPA
        var origemLatitude = $('#origemLatitude').val();
        var origemLongitude = $('#origemLongitude').val();
        console.log('lat ', origemLatitude, 'Lon ', origemLongitude);

        const myLatLng = { lat: parseFloat(origemLatitude), lng: parseFloat(origemLongitude) };
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 10,
            center: myLatLng,
        });

        // ZOOM DINAMICO
        var bounds = new google.maps.LatLngBounds();

        const home = new google.maps.Marker({
                position: myLatLng,
                map,
                title: "Origem",
                icon: 'icon-home-map.png',
            });
        
        // ZOOM DINAMICO
        bounds.extend(home.getPosition());

        // Create an info window to share between markers.
        const infoWindow = new google.maps.InfoWindow();

        if (stations) {
            //console.log('acessou stations');
            for (var i = 0; i < stations.length; i++) {
                //console.log('show stations ', i, stations[i]);
                const marker = new google.maps.Marker({
                    //position: stations[i],
                    position: { lat: parseFloat(stations[i].enderecolatitude), lng: parseFloat(stations[i].enderecolongitude) },
                    map: map,
                    title: stations[i].clientenome + ' - ' + stations[i].clienterazaosocial,
                    //icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld='+ (i) +'|FF776B|000000',
                    icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld='+ (stations[i].Ordem) +'|FF776B|000000',
                });

                 // Add a click listener for each marker, and set up the info window.
                marker.addListener("click", () => {
                    infoWindow.close();
                    infoWindow.setContent(marker.getTitle());
                    infoWindow.open(marker.getMap(), marker);
                });
                
                // ZOOM DINAMICO
                bounds.extend(marker.getPosition());
            }

        // ZOOM VARIAVEL

        google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
        this.setZoom(map.getZoom()-1);

        if (this.getZoom() > 15) {
            this.setZoom(15);
        }
        });
            map.fitBounds(bounds);
        }

    }
<script
      src="https://maps.googleapis.com/maps/api/js?key=<?= $gmaps_key;?>&callback=initMap&libraries=&v=weekly"
      async
    >
</script>