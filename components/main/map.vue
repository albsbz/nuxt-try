<template>
  <div>
      <GMap
        ref="gMap"
        :cluster="{options: {styles: clusterStyle}}"
        :center="{lat: locations[0].lat, lng: locations[0].lng}"
        :options="{fullscreenControl: false, styles: mapStyle}"
        :zoom="6"
        >
            <GMapMarker
                v-for="location in locations"
                :key="location.id"
                :position="{lat: location.lat, lng: location.lng}"
                :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
                @click="currentLocation = location"
            >
                <GMapInfoWindow>
                <code>
                    lat: {{ location.lat }},
                    lng: {{ location.lng }}
                </code>
                </GMapInfoWindow>
            </GMapMarker>
        </GMap>
  </div>
</template>

<script>
export default {
    data() {
    return {
        currentLocation: {},
        locations: [
            {
                lat: 44.933076,
                lng: 15.629058
            },
            {
                lat: 45.815,
                lng: "15.9819"
            },
            {
                lat: "45.12",
                lng: "16.21"
            }
        ],
        pins: {
            selected: "data:image/png;base64,iVBORw0KGgo...",
            notSelected: "data:image/png;base64,iVBORw0KGgo..."
        },
        mapStyle: [
            {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [
                {
                color: "#ffffff"
                }
            ]
            },
            {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [
                {
                visibility: "on"
                },
                {
                color: "#3e606f"
                },
                {
                weight: 2
                },
                {
                gamma: 0.84
                }
            ]
            },
            {
            featureType: "all",
            elementType: "labels.icon",
            stylers: [
                {
                visibility: "off"
                }
            ]
            },
            {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
                {
                weight: 0.6
                },
                {
                color: "#313536"
                }
            ]
            },
            {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [
                {
                color: "#44a688"
                }
            ]
            },
            {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
                {
                color: "#13876c"
                }
            ]
            },
            {
            featureType: "poi.attraction",
            elementType: "geometry.stroke",
            stylers: [
                {
                color: "#f5e4e4"
                },
                {
                visibility: "off"
                }
            ]
            },
            {
            featureType: "poi.attraction",
            elementType: "labels",
            stylers: [
                {
                visibility: "on"
                },
                {
                lightness: "14"
                }
            ]
            },
            {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
                {
                color: "#13876c"
                },
                {
                visibility: "simplified"
                }
            ]
            },
            {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {
                color: "#067372"
                },
                {
                lightness: "-20"
                }
            ]
            },
            {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
                {
                color: "#357374"
                }
            ]
            },
            {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                {
                color: "#004757"
                }
            ]
            }
        ],
        clusterStyle: [
        {
            url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
            width: 56,
            height: 56,
            textColor: "#fff"
        }
        ]
    }
    }
}
</script>

<style>

</style>