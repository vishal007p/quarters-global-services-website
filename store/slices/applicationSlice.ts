import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid4 from "uuid4";
export interface Application {
  id: string;
  type: string;
  name: string | null;
  package: string | null;
  platformServiceCategoryId: string | null;
  platformServiceCategoryPackageId: string | null;
  platformServiceId: string | null;
  addons: string[];
  form: Record<string, any>;

}

interface ApplicationState {
  applications: Application[];
  activeId: string | null; // which one user is working on
}
const STORAGE_KEY = "applications";
const saveState = (state: ApplicationState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state", e);
  }
};
const loadState = (): ApplicationState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Failed to load state", e);
  }
  return { applications: [], activeId: null };
};
const initialState = loadState() || { applications: [] };
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    startApplication(state, action: PayloadAction<{ type: string }>) {
      const id = uuid4();
      const newApp: Application = {
        id,
        type: action.payload.type,
        name: null,
        package: null,
        addons: [],
        form: {},
        platformServiceCategoryId: null,
        platformServiceCategoryPackageId: null,
        platformServiceId: null,

      };
      state.applications.push(newApp);
      state.activeId = id;
      saveState(state);
    },
    setCategory(state, action: PayloadAction<{ id: string; name: string, platformServiceCategoryId: string }>) {
      const app = state.applications.find((a) => a.id === action.payload.id);
      if (app) {
        app.name = action.payload.name;
       

      }

    },
    setPackage(state, action: PayloadAction<{ id: string;platformServiceCategoryId: string; package: string,platformServiceCategoryPackageId: string,platformServiceId: string }>) {
      const app = state.applications.find((a) => a.id === action.payload.id);
      if (app) {
        app.package = action.payload.package;
        app.platformServiceCategoryPackageId = action.payload.platformServiceCategoryPackageId;
        app.platformServiceId = action.payload.platformServiceId;
        app.platformServiceCategoryId = action.payload.platformServiceCategoryId;
       
      }
      saveState(state);
    },
    addAddon(state, action: PayloadAction<{ id: string; addon: string }>) {
      const app = state.applications.find((a) => a.id === action.payload.id);
      if (app && !app.addons.includes(action.payload.addon)) {
        app.addons.push(action.payload.addon);
      }
      saveState(state);
    },
    setFormData(state, action: PayloadAction<{ id: string; form: Record<string, any> }>) {
      const app = state.applications.find((a) => a.id === action.payload.id);
      if (app) {
        app.form = { ...app.form, ...action.payload.form };

      }
      saveState(state);
    },
  },
});
export const { startApplication, setCategory, setPackage, addAddon, setFormData } = applicationSlice.actions;
export default applicationSlice.reducer;
