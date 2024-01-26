<template>
  total items select : {{ selectIds.length }}

  <DynamicScroller
    :items="items"
    :min-item-size="54"
    class="scroller table"
    :prerender="50"
    :listTag="'table'"
    :itemTag="'tr'"
    page-mode
  >
    <template v-slot="{ item, index, active }">
      <thead v-if="index === 0">
        <tr>
          <th scope="col">#</th>
          <th>
            <input
              class="form-check-input"
              type="checkbox"
              name="checkbox_items"
              :indeterminate="isIndeterminate"
              :checked="isCheckAll"
              @change.native="onChangeCheckItems()"
            />
          </th>
          <th scope="col">ID</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">SKU</th>
          <th scope="col">Action</th>
        </tr>
      </thead>

      <DynamicScrollerItem
        :item="item"
        :active="active"
        :data-index="index"
        :size-dependencies="[item.field1]"
        tag="tr"
      >
        <th scope="row">{{ index }} - {{ index % 2 === 0 ? "A" : "B" }}</th>

        <td>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :value="item.id"
              :checked="isCheckItem(item.id)"
              name="checkbox_item"
              @change.native="onChangeSelectItem(item.id)"
            />
          </div>
        </td>
        <td>{{ item.field1 }}</td>
        <td>{{ item.field2 }}</td>
        <td>{{ item.field3 }}</td>

        <td>{{ item.field4 }}</td>

        <!-- <td><button type="button" class="btn btn-danger">Delete</button></td> -->
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

// import DataListItem from "./DataListItem.vue";

import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

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

const items = ref<Array<IItem>>([]);

const selectIds = ref<Array<string>>([]);

const isCheckAll = computed<boolean>(() => {
  return totalItemSelected.value > 0 &&
    totalItemSelected.value <= totalItems.value
    ? true
    : false;
});

const isIndeterminate = computed<boolean>(() => {
  return totalItemSelected.value > 0 &&
    totalItemSelected.value < totalItems.value
    ? true
    : false;
});

const totalItems = computed<number>(() =>
  items.value ? items.value.length : 0
);

const totalItemSelected = computed<number>(() => selectIds.value.length);

onMounted(() => {
  getList();
});

onUnmounted(() => {});

const isCheckItem = (id: number): boolean => {
  const convertIdToString = id.toString();

  return selectIds.value.includes(convertIdToString);
};

const getList = async () => {
  const { data } = await _supabase.from("my_table").select("*");

  items.value = [];
  items.value.push(
    ...(data as Array<IItem>).map((item, index) => {
      return {
        ...item,
        id: index,
      };
    })
  );
};

const onChangeSelectItem = (id: number): void => {
  const convertIdToString = id.toString();
  const index = selectIds.value.findIndex((item) => item === convertIdToString);

  if (index !== -1) {
    selectIds.value.splice(index, 1);
  } else {
    selectIds.value.push(convertIdToString);
  }
};

const onChangeCheckItems = () => {
  if (isCheckAll.value) {
    selectIds.value = [];
  } else {
    selectIds.value = [];
    if (totalItems.value && items.value) {
      selectIds.value.push(...items.value.map((_, index) => index.toString()));
    }
  }
};
</script>

<style scoped>
.scroller {
  width: 100%;
  height: 100%;
}
</style>
