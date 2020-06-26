import UserStore from "./store";
import { create, persist } from "mobx-persist";


const hydrate = create({
  storage: localForage, // or AsyncStorage in react-native.
  // default: localStorage
  jsonify: false, // if you use AsyncStorage, here shoud be true
  // default: true
});

hydrate("everchange-store", UserStore)
  // post hydration
  .then(() => console.log("everchange-store hydrated"));
