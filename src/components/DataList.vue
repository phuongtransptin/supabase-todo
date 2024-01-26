<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th>checkbox</th>
        <th scope="col">ID</th>
        <th scope="col">Image</th>
        <th scope="col">Name</th>
        <th scope="col">SKU</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <th scope="row">{{ index }}</th>
        <td>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              {{ item.field1 }}
            </label>
          </div>
        </td>
        <td>{{ item.field1 }}</td>
        <td>{{ item.field2 }}</td>
        <td>{{ item.field3 }}</td>

        <td>{{ item.field4 }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

import { createClient } from "@supabase/supabase-js";

interface IItem {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
}

const _supabase = createClient(
  "https://xxxlxrtxsdclcbujdxcq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eGx4cnR4c2RjbGNidWpkeGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwODY4MzMsImV4cCI6MjAyMTY2MjgzM30.lNfwkThtnyZUmmPGD2lQAdx5mpX4ZkuFns7239WqsFA"
);

const items = ref<Array<IItem>>();

onMounted(() => {
  getList();
});

onUnmounted(() => {});

const getList = async () => {
  const { data } = await _supabase.from("my_table").select("*");

  items.value = [];
  items.value.push(...(data as Array<IItem>));
};

console.log("testing");
</script>
