import './App.css';
import Messanger from './Components/Messanger';
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from './Context/AccountProvider';

function App() {

  const clientId =//here we provide client google id 
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider client={clientId}>
          <Messanger/>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
