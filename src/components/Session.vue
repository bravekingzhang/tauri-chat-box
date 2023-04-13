<script setup lang="ts">
import userImage from "@/assets/user.jpg";
import { onMounted } from "vue";
import { Session } from "@/repository/session";
import { useSessionStore } from "@/store/session";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const sessionStore = useSessionStore();
const { sessionList } = storeToRefs(sessionStore);

const user = {
  name: "hzzh",
  avatar: userImage,
  email: "hz@tencent.com",
};

const dialog = ref(false);

const sessionActions = [{ title: "Edit" }, { title: "Delete" }];

const rail = ref(true);

const emits = defineEmits(["new-session", "select-session", "open-setting"]);
function openSetting() {
  emits("open-setting");
}
function selectSession(session: Session) {
  emits("select-session", session);
}

let editSession: Session | null = null;
const editName = ref("");

function handleSessionAction(actionType: string, session: Session) {
  if (actionType === "Edit") {
    dialog.value = true;
    editSession = session;
  } else if (actionType === "Delete") {
    sessionStore.deleteSession(session.id);
  }
}

const changeName = async () => {
  if (editSession) {
    editSession.name = editName.value;
    await sessionStore.editSession(editSession);
    dialog.value = false;
  }
};

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
          <v-dialog v-model="dialog" width="50%">
            <v-card>
              <template v-slot:title> edit session name </template>

              <template v-slot:subtitle>
                <v-text-field v-model="editName"></v-text-field>
              </template>
              <v-card-actions>
                <v-btn color="orange" @click="dialog = false"> Cancel </v-btn>

                <v-btn color="orange" @click="changeName"> Ok </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template></v-list-item
      >
    </v-list>
    <v-divider></v-divider>
    <v-list-item
      style="min-height: 64px"
      prepend-icon="mdi-cog"
      title="settings"
      @click="openSetting"
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
