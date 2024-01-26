<template>
  <tr>
    <th scope="row">{{ item.index }}</th>

    <td>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          :value="item.index"
          name="checkbox_item"
        />
      </div>
    </td>
    <td>{{ item.field1 }}</td>
    <td>{{ item.field2 }}</td>
    <td>{{ item.field3 }}</td>

    <td>{{ item.field4 }}</td>

    <td><button type="button" class="btn btn-danger">Delete</button></td>
  </tr>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface IItem {
  index: number;

  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
}

withDefaults(defineProps<{ item: IItem }>(), {});

onMounted(() => {});

onUnmounted(() => {});
</script>
