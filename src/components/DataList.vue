<template>
  total items select : {{ selectIds.length }}

  <DynamicScroller
    :items="items"
    :min-item-size="54"
    :prerender="2"
    class="scroller"
    page-mode
  >
    <template #before>
      <div class="custom-header">
        <div
          v-for="(col, indexCol) in headers"
          :key="indexCol"
          :style="bindStyle(col.width)"
          class="custom-header-ceil"
        >
          <input
            v-if="col.type === 'checkbox'"
            class="form-check-input"
            type="checkbox"
            name="checkbox_items"
            :indeterminate="isIndeterminate"
            :checked="isCheckAll"
            @change.native="onChangeCheckItems()"
          />

          <span v-else class="custom-header-ceil">
            {{ col.label }}
          </span>
        </div>
      </div>
    </template>

    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem
        :active="active"
        :item="item"
        :data-index="index"
        :size-dependencies="[item.field1]"
      >
        <div class="custom-row">
          <div
            v-for="(col, indexCol) in headers"
            :key="indexCol"
            :style="bindStyle(col.width)"
            class="custom-cell"
          >
            <div v-if="col.type === 'checkbox'" class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :value="item.id"
                :checked="isCheckItem(item.id)"
                name="checkbox_item"
                @change.native="onChangeSelectItem(item.id)"
              />
            </div>

            <div v-else-if="col.type === 'action'">
              <button
                type="button"
                class="btn btn-danger"
                @click="onDelete(item)"
              >
                Delete
              </button>
            </div>

            <span v-else>
              {{ item[col.trackData] }}
            </span>
          </div>
        </div>
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
  import.meta.env.VITE_SUPAPAGE_API_KEY
);

const headers: Array<{
  key: string;
  label: string;
  width: string;

  trackData: string;
  type?: string;
}> = [
  {
    key: "index",
    label: "#",
    width: "80px",
    trackData: "id",
  },
  {
    key: "id",
    label: "#",
    width: "40px",
    trackData: "id",
    type: "checkbox",
  },
  {
    key: "image",
    label: "Image",
    width: "auto",
    trackData: "field1",
  },
  {
    key: "name",
    label: "Name",
    width: "auto",
    trackData: "field2",
  },
  {
    key: "sku",
    label: "SKU",
    width: "auto",
    trackData: "field3",
  },
  {
    key: "action",
    label: "Action",
    width: "100px",
    trackData: "field4",
    type: "action",
  },
];

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

const bindStyle = (width: string) => {
  if (width === "auto") {
    return { flex: 1 };
  }

  return {
    minWidth: width,
    maxWidth: width,
  };
};

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

const onDelete = async (item: IItem) => {
  console.log("item", item);
  // TODO
  // const deleteRes = await _supabase
  //   .from("my_table")
  //   .delete()
  //   .eq("field6", item.field6);

  // console.log("deleteRes", deleteRes);
};
</script>

<style scoped>
.scroller {
  width: 100%;
  height: 100%;
}

.custom-header {
  display: flex;
  border-bottom: 1px solid black;
}

.custom-header-ceil {
  padding: 8px;

  font-size: 20px;
  font-weight: bold;
  text-align: left;
}

.custom-row {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.custom-cell {
  padding: 8px;
  text-align: left;
}
</style>
