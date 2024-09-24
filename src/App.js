import logo from './logo.svg';
import './App.css';
import Form from './components/form/form';
import { createGlobalStyle } from 'styled-components';


function App() {
  return (
    <>
      <GlobalStyle />
      <Form />
    </>
  );
}



const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Ubuntu';
        src: url('./assets/fonts/Ubuntu-Bold.ttf') format('truetype');
    }
`;

export default App;