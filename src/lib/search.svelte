<script lang="ts">
  // import type { Client } from "@elastic/elasticsearch";
  // import { getContext } from "svelte";

  // let client: Client = getContext("client");

  let query = '';
  let results: any[] = [];

  // async function search() {
  //   console.log(query);
  //   try {
  //     const response = await client.search({
  //       index: 'nonprofits',
  //         query: {
  //           match: {
  //             ein: query,
  //           },
  //         },
  //     });

  //     results = response.hits.hits;
  //     console.log(results);
  //   } catch (error) {
  //     console.error('Error searching:', error);
  //   }
  // }
  function search() {
    console.log(query);
  }
</script>

<input bind:value={query} on:input={() => console.log(query)} />

<ul>
  {#each results as result (result._id)}
    <li>{result._source.content}</li>
  {/each}
</ul>
