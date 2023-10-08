<!-- Map.svelte, This was an expation that we were testing but utimatley decided to scrap in the end-->

<script lang="ts">
    import L from 'leaflet';
    import { onMount } from 'svelte';
   
  
    /**
	 * @type {L.Map | L.LayerGroup<any>}
	 */
    let map: L.Map;
    /**
	 * @type {L.Popup}
	 */
    let popup: L.Popup;
  
    let query = "";
  
    onMount(() => {
      map = L.map("map").setView([38.889805, -77.009056], 4);
  
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
  
      popup = L.popup();
  
      map.on("click", onMapClick);
    });
  
 
    function onMapClick(e: { latlng: { lng: any; lat: any; }; }) {
      const xcord = e.latlng.lng;
      const ycord = e.latlng.lat;
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + xcord + " " + ycord)
        .openOn(map);
    }
  
    function search() {
      // Use the 'query' variable as needed in your Svelte component logic.
      console.log("Search query:", query);
    }
  </script>
  
  <style>
    #map {
      height: 600px;
    }
  </style>
  
  <div class="searchBar">
    <form id="form" role="search">
      <input type="search" id="query" bind:value="{query}" placeholder="Search..." aria-label="Search through site content">
      <button on:click={search}>Search</button>
    </form>
  </div>
  
  <div id="map"></div>
  