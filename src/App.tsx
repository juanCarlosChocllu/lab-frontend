import { ProviderAutenticaicon } from "./core/context/ProviderAutenticaicon";
import { RouterIndex } from "./core/router/RouterIndex";
import { ToastContainer } from "react-toastify";


function App() {
  return (
 
      
      <>
      <ProviderAutenticaicon>
        <RouterIndex />
      </ProviderAutenticaicon>
      <ToastContainer stacked />  
      </>


 
  );
}

export default App;
