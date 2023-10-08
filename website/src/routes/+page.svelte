<script lang="ts">  
   
    import { onMount } from 'svelte';
 
  
    let query = "";
 
    function search() {
      // Use the 'query' variable as needed in your Svelte component logic.
      console.log("Search query:", query);
    }
  </script>
  
  <style>
 
  
  </style>
  
  <!-- This is the set up for the search bar -->

  <div class="searchBar">
    <form id="form" role="search">
      <input type="search" id="query" bind:value="{query}" placeholder="Search..." aria-label="Search through site content">
      <button on:click={search}>Search</button>
    </form>
  </div>
  

     


  