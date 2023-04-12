<script setup lang="ts">
import { onMounted } from "vue";
import { Session } from "@/repository/session";
import { useSessionStore } from "@/store/session";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const sessionStore = useSessionStore();
const { sessionList } = storeToRefs(sessionStore);

interface Props {
  user: {
    name: string;
    avatar: string;
    email: string;
  };
}
const props = defineProps<Props>();

const sessionActions = [{ title: "Edit" }, { title: "Delete" }];

const rail = ref(true);

const emits = defineEmits(["new-session", "select-session"]);
function newSession() {
  sessionStore.createSession("勇哥测试");
}
function selectSession(session: Session) {
  emits("select-session", session);
}

function handleSessionAction(actionType: string, session: Session) {
  if (actionType === "Edit") {
    sessionStore.editSession(session);
  } else if (actionType === "Delete") {
    sessionStore.deleteSession(session.id);
  }
}

onMounted(async () => {
  await sessionStore.fetchSessionList();
});

//触发全局store/session.ts加载session列表
</script>

<template>
  <v-navigation-drawer permanent :rail="rail" @click="rail = false">
    <v-list class="navigation-list-header">
      <v-list-item
        :prepend-avatar="user.avatar"
        :title="user.name"
        :subtitle="user.email"
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-list density="compact" nav style="flex-grow: 1; overflow-y: scroll">
      <v-list-subheader>Conversation List</v-list-subheader>
      <v-list-item
        v-for="item in sessionList"
        prepend-icon="mdi-chat"
        :value="item.id"
        :title="item.name"
        @click="selectSession(item)"
        ><template v-slot:append>
          <div class="text-center">
            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn
                  density="compact"
                  v-bind="props"
                  icon="mdi-information"
                ></v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(action, index) in sessionActions"
                  :key="index"
                >
                  <v-list-item-title
                    @click="handleSessionAction(action.title, item)"
                    >{{ action.title }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template></v-list-item
      >
    </v-list>
    <v-divider></v-divider>
    <v-list-item
      style="min-height: 64px"
      prepend-icon="mdi-plus"
      title="new conversation"
      @click="newSession"
    ></v-list-item>
  </v-navigation-drawer>
</template>

<style>
.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}

.navigation-list-header {
  min-height: 64px;
  flex-grow: 0;
}
</style>
