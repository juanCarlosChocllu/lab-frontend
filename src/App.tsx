import { ProviderAutenticaicon } from "./core/context/ProviderAutenticaicon";
import { RouterIndex } from "./core/router/RouterIndex";
import { ToastContainer } from "react-toastify";
import {Provider} from 'react-redux'
import { store } from "./core/configRedux/store";

function App() {
  return (
    <Provider store={store}>
      <ProviderAutenticaicon>
        <RouterIndex />
      </ProviderAutenticaicon>
      <ToastContainer stacked />
    </Provider>
  );
}

export default App;
